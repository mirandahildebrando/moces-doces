# ============================================================
# crop-logo.ps1 — Recorta o lockup central da logo da Moces Doces
# ============================================================
# A logo original (logo-moces.jpg) é quadrada, com muito espaço
# vazio e texturas rosas decorativas nos cantos. Este script:
#   1. Detecta automaticamente a área com o conteúdo (pixels escuros);
#   2. Recorta com uma pequena margem;
#   3. Redimensiona em alta qualidade e salva como PNG.
#
# Uso:
#   powershell -File scripts\crop-logo.ps1
#   powershell -File scripts\crop-logo.ps1 -Threshold 210 -MarginPct 4 -OutHeight 200

param(
  [string]$Source = "img\logo-moces.jpg",
  [string]$Out = "public\img\logo-moces-header.png",
  [int]$Threshold = 205,   # luminância abaixo disso = conteúdo (fundo creme ~246, texturas rosas ~235)
  [int]$MarginPct = 6,     # margem (%) ao redor do conteúdo detectado
  [int]$OutHeight = 180    # altura final (3x um header de ~60px, para telas retina)
)

Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path (Get-Location) $Source
if (-not (Test-Path $sourcePath)) { Write-Error "Arquivo não encontrado: $sourcePath"; exit 1 }

$src = [System.Drawing.Bitmap]::FromFile($sourcePath)

# --- 1. Detecta o bounding box dos pixels de conteúdo ---
$minX = $src.Width; $maxX = 0; $minY = $src.Height; $maxY = 0; $found = $false
for ($y = 0; $y -lt $src.Height; $y += 2) {
  for ($x = 0; $x -lt $src.Width; $x += 2) {
    $c = $src.GetPixel($x, $y)
    $lum = 0.2126 * $c.R + 0.7152 * $c.G + 0.0722 * $c.B
    if ($lum -lt $Threshold) {
      $found = $true
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
if (-not $found) { Write-Error "Nenhum pixel de conteúdo encontrado com threshold $Threshold"; exit 1 }

# --- 2. Recorta com margem proporcional ---
$mw = [int](($maxX - $minX) * $MarginPct / 100)
$mh = [int](($maxY - $minY) * $MarginPct / 100)
$x0 = [Math]::Max(0, $minX - $mw)
$y0 = [Math]::Max(0, $minY - $mh)
$x1 = [Math]::Min($src.Width - 1, $maxX + $mw)
$y1 = [Math]::Min($src.Height - 1, $maxY + $mh)
$cw = $x1 - $x0 + 1
$ch = $y1 - $y0 + 1

Write-Output "Imagem original : $($src.Width) x $($src.Height)"
Write-Output "Conteúdo        : x=$minX..$maxX  y=$minY..$maxY"
Write-Output "Recorte + margem: x=$x0 y=$y0  w=$cw h=$ch"

$rect = New-Object System.Drawing.Rectangle -ArgumentList $x0, $y0, $cw, $ch
$crop = $src.Clone($rect, $src.PixelFormat)

# --- 3. Redimensiona em alta qualidade e salva como PNG ---
$finalH = $OutHeight
$finalW = [int][Math]::Round($cw * $finalH / $ch)
$bmp = New-Object System.Drawing.Bitmap -ArgumentList $finalW, $finalH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($crop, 0, 0, $finalW, $finalH)
$g.Dispose()

if ([System.IO.Path]::IsPathRooted($Out)) {
  $outPath = $Out
} else {
  $outPath = Join-Path (Get-Location) $Out
}
New-Item -ItemType Directory -Force -Path (Split-Path $outPath) | Out-Null
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose(); $crop.Dispose(); $src.Dispose()
Write-Output "Salvo           : $outPath ($finalW x $finalH)"
