# ============================================================
# make-logo.ps1 — Prepara a logo da Moces Doces para o header
# ============================================================
# A logo original (logo-moces.jpg) tem fundo creme sólido — o que
# criaria um "retângulo" branco sobre o vídeo do hero. Este script:
#
#   1. Detecta automaticamente o lockup central (pixels escuros);
#   2. Recorta com margem mínima (os enfeites rosas dos cantos ficam fora);
#   3. Remove o fundo creme criando alfa por distância de cor (anti-aliasing suave);
#   4. Gera DUAS versões transparentes em PNG:
#        - logo-moces-header.png        → cores originais (header claro, após rolar)
#        - logo-moces-header-light.png  → silhueta clara (sobre o vídeo escuro)
#   5. Gera uma imagem de conferência visual (claro + escuro lado a lado).
#
# Uso:
#   powershell -File scripts\make-logo.ps1
#   powershell -File scripts\make-logo.ps1 -MarginPct 0 -T0 12 -T1 45

param(
  [string]$Source = "img\logo-moces.jpg",
  [string]$OutDark = "public\img\logo-moces-header.png",
  [string]$OutLight = "public\img\logo-moces-header-light.png",
  [string]$PreviewPath = "$env:TEMP\moces-logo-preview.jpg",
  [int]$MarginPct = 1,      # margem (%) ao redor do lockup (evita os enfeites rosas dos cantos)
  [int]$OutHeight = 180,    # altura final (3x um header de ~60px, para telas retina)
  [int]$T0 = 15,            # distância do fundo até começar a ficar visível
  [int]$T1 = 50,            # distância do fundo para ficar 100% opaco
  [string]$LightHex = "F7EEE0"  # cor da variante clara (creme do site)
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$cs = @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class MocesLogo
{
    public static string Build(string srcPath, string outDark, string outLight, string previewPath,
                               int marginPct, int outHeight, int t0, int t1, string lightHex)
    {
        Bitmap src = new Bitmap(srcPath);
        try
        {
            int W = src.Width;
            int H = src.Height;

            // ---------- 1. bounding box do conteúdo (pixels escuros) ----------
            int minX = W, maxX = -1, minY = H, maxY = -1;
            for (int y = 0; y < H; y += 2)
            {
                for (int x = 0; x < W; x += 2)
                {
                    Color c = src.GetPixel(x, y);
                    double lum = 0.2126 * (double)c.R + 0.7152 * (double)c.G + 0.0722 * (double)c.B;
                    if (lum < 205.0)
                    {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }
            if (maxX < 0) throw new Exception("Nenhum conteudo encontrado com o limite de luminancia.");

            // ---------- 2. cor de fundo (média de um patch limpo abaixo do lockup) ----------
            int sx = W / 2;
            int sy = Math.Min(H - 30, maxY + 200);
            long sr = 0, sg = 0, sb = 0; int sn = 0;
            for (int y = sy - 12; y <= sy + 12; y++)
            {
                for (int x = sx - 12; x <= sx + 12; x++)
                {
                    int xx = Math.Min(W - 1, Math.Max(0, x));
                    int yy = Math.Min(H - 1, Math.Max(0, y));
                    Color c = src.GetPixel(xx, yy);
                    sr += c.R; sg += c.G; sb += c.B; sn++;
                }
            }
            int bgR = (int)(sr / sn), bgG = (int)(sg / sn), bgB = (int)(sb / sn);

            // ---------- 3. recorte com margem ----------
            int mw = (int)Math.Round((maxX - minX) * marginPct / 100.0);
            int mh = (int)Math.Round((maxY - minY) * marginPct / 100.0);
            int x0 = Math.Max(0, minX - mw);
            int y0 = Math.Max(0, minY - mh);
            int x1 = Math.Min(W - 1, maxX + mw);
            int y1 = Math.Min(H - 1, maxY + mh);
            int cw = x1 - x0 + 1;
            int ch = y1 - y0 + 1;

            Color light = ColorTranslator.FromHtml("#" + lightHex);

            // ---------- 4. monta as duas versões RGBA (alfa = distância do fundo) ----------
            Bitmap cropDark = new Bitmap(cw, ch, PixelFormat.Format32bppArgb);
            Bitmap cropLight = new Bitmap(cw, ch, PixelFormat.Format32bppArgb);
            Rectangle rect = new Rectangle(0, 0, cw, ch);
            BitmapData dData = cropDark.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
            BitmapData lData = cropLight.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
            try
            {
                byte[] dBuf = new byte[dData.Stride * ch];
                byte[] lBuf = new byte[lData.Stride * ch];
                for (int y = 0; y < ch; y++)
                {
                    for (int x = 0; x < cw; x++)
                    {
                        Color c = src.GetPixel(x0 + x, y0 + y);
                        int d = Math.Max(Math.Abs(c.R - bgR), Math.Max(Math.Abs(c.G - bgG), Math.Abs(c.B - bgB)));
                        double a = (d - t0) / (double)(t1 - t0);
                        if (a < 0.0) a = 0.0;
                        if (a > 1.0) a = 1.0;
                        byte A = (byte)Math.Round(a * 255.0);
                        int dof = y * dData.Stride + x * 4;
                        dBuf[dof + 0] = c.B; dBuf[dof + 1] = c.G; dBuf[dof + 2] = c.R; dBuf[dof + 3] = A;
                        int lof = y * lData.Stride + x * 4;
                        lBuf[lof + 0] = light.B; lBuf[lof + 1] = light.G; lBuf[lof + 2] = light.R; lBuf[lof + 3] = A;
                    }
                }
                Marshal.Copy(dBuf, 0, dData.Scan0, dBuf.Length);
                Marshal.Copy(lBuf, 0, lData.Scan0, lBuf.Length);
            }
            finally
            {
                cropDark.UnlockBits(dData);
                cropLight.UnlockBits(lData);
            }

            // ---------- 5. redimensiona em alta qualidade e salva ----------
            int fh = outHeight;
            int fw = (int)Math.Round(cw * (double)fh / (double)ch);
            SavePng(cropDark, fw, fh, outDark);
            SavePng(cropLight, fw, fh, outLight);
            SavePreview(cropDark, cropLight, previewPath, fw, fh);

            cropDark.Dispose();
            cropLight.Dispose();

            return "Conteudo " + (maxX - minX + 1) + "x" + (maxY - minY + 1) +
                   " | fundo RGB(" + bgR + "," + bgG + "," + bgB + ")" +
                   " | recorte " + cw + "x" + ch +
                   " | saida " + fw + "x" + fh;
        }
        finally
        {
            src.Dispose();
        }
    }

    static void SavePng(Bitmap bmp, int w, int h, string path)
    {
        using (Bitmap outp = new Bitmap(w, h, PixelFormat.Format32bppArgb))
        {
            using (Graphics g = Graphics.FromImage(outp))
            {
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                g.CompositingMode = CompositingMode.SourceCopy;
                g.DrawImage(bmp, new Rectangle(0, 0, w, h));
            }
            string dir = Path.GetDirectoryName(Path.GetFullPath(path));
            if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
            outp.Save(path, ImageFormat.Png);
        }
    }

    // Conferência visual: versão colorida sobre creme + versão clara sobre chocolate.
    static void SavePreview(Bitmap dark, Bitmap light, string path, int w, int h)
    {
        int scale = 2;
        int pad = 36;
        int cellW = w * scale + pad * 2;
        int bgH = h * scale + pad * 2;
        using (Bitmap canvas = new Bitmap(cellW, bgH * 2, PixelFormat.Format24bppRgb))
        {
            using (Graphics g = Graphics.FromImage(canvas))
            {
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                // metade de cima: fundo creme do header sólido
                g.SetClip(new Rectangle(0, 0, cellW, bgH));
                g.Clear(ColorTranslator.FromHtml("#F8F2E9"));
                g.ResetClip();
                // metade de baixo: fundo do hero (chocolate escuro)
                g.SetClip(new Rectangle(0, bgH, cellW, bgH));
                g.Clear(ColorTranslator.FromHtml("#2C1D13"));
                g.ResetClip();
                // logos por cima
                g.DrawImage(dark, new Rectangle(pad, pad, w * scale, h * scale));
                g.DrawImage(light, new Rectangle(pad, bgH + pad, w * scale, h * scale));
            }
            string dir = Path.GetDirectoryName(Path.GetFullPath(path));
            if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
            canvas.Save(path, ImageFormat.Jpeg);
        }
    }
}
'@

Add-Type -TypeDefinition $cs -ReferencedAssemblies "System.Drawing"

function Resolve-FullPath([string]$path) {
  if ([System.IO.Path]::IsPathRooted($path)) { return $path }
  return [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $path))
}

$srcFull = Resolve-FullPath $Source
if (-not (Test-Path $srcFull)) { Write-Error "Arquivo não encontrado: $srcFull"; exit 1 }

$result = [MocesLogo]::Build(
  $srcFull,
  (Resolve-FullPath $OutDark),
  (Resolve-FullPath $OutLight),
  (Resolve-FullPath $PreviewPath),
  $MarginPct, $OutHeight, $T0, $T1, $LightHex
)

Write-Output "Mascara/recorte : $result"
Write-Output "PNG colorido    : $(Resolve-FullPath $OutDark)"
Write-Output "PNG claro       : $(Resolve-FullPath $OutLight)"
Write-Output "Preview         : $(Resolve-FullPath $PreviewPath)"
