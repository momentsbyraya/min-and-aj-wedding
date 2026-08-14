Add-Type -AssemblyName System.Drawing

$dir = "C:\Users\UNCLE\projects\New folder\althea-turns-18\assets\images\openingscreen"
$backup = Join-Path $dir "_original_backup"
New-Item -ItemType Directory -Force -Path $backup | Out-Null

$threshold = 236
$canvas = 2000

function Test-Bg([byte]$r, [byte]$g, [byte]$b, [int]$th) {
  return ($r -ge $th -and $g -ge $th -and $b -ge $th -and
    [Math]::Abs([int]$r - [int]$g) -le 20 -and
    [Math]::Abs([int]$g - [int]$b) -le 20 -and
    [Math]::Abs([int]$r - [int]$b) -le 20)
}

foreach ($n in 4..17) {
  $path = Join-Path $dir "$n.png"
  $name = "$n.png"
  Write-Host "Processing $name ..."

  $bakPath = Join-Path $backup $name
  if (-not (Test-Path -LiteralPath $bakPath)) {
    Copy-Item -LiteralPath $path -Destination $bakPath -Force
  }

  # Always process from original backup so script is re-runnable
  $sourcePath = $bakPath

  $src = [System.Drawing.Bitmap]::FromFile($sourcePath)
  $w = $src.Width
  $h = $src.Height

  $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.Clear([System.Drawing.Color]::Transparent)
  $gfx.DrawImage($src, 0, 0, $w, $h)
  $gfx.Dispose()
  $src.Dispose()

  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $stride = $data.Stride
  $len = $stride * $h
  $bytes = New-Object byte[] $len
  [Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $len)

  $visited = New-Object bool[] ($w * $h)
  $queueX = New-Object 'System.Collections.Generic.Queue[int]'
  $queueY = New-Object 'System.Collections.Generic.Queue[int]'

  function TryEnqueue([int]$x, [int]$y) {
    if ($x -lt 0 -or $y -lt 0 -or $x -ge $w -or $y -ge $h) { return }
    $i = $y * $w + $x
    if ($visited[$i]) { return }
    $o = $y * $stride + $x * 4
    $bb = $bytes[$o]; $gg = $bytes[$o + 1]; $rr = $bytes[$o + 2]
    if (Test-Bg $rr $gg $bb $threshold) {
      $visited[$i] = $true
      $queueX.Enqueue($x)
      $queueY.Enqueue($y)
    }
  }

  for ($x = 0; $x -lt $w; $x++) {
    TryEnqueue $x 0
    TryEnqueue $x ($h - 1)
  }
  for ($y = 0; $y -lt $h; $y++) {
    TryEnqueue 0 $y
    TryEnqueue ($w - 1) $y
  }

  while ($queueX.Count -gt 0) {
    $x = $queueX.Dequeue()
    $y = $queueY.Dequeue()
    $o = $y * $stride + $x * 4
    $bytes[$o + 3] = 0

    TryEnqueue ($x + 1) $y
    TryEnqueue ($x - 1) $y
    TryEnqueue $x ($y + 1)
    TryEnqueue $x ($y - 1)
  }

  # Clean leftover near-white fringe
  for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
      $o = $y * $stride + $x * 4
      if ($bytes[$o + 3] -eq 0) { continue }
      $bb = $bytes[$o]; $gg = $bytes[$o + 1]; $rr = $bytes[$o + 2]
      if ($rr -ge 250 -and $gg -ge 250 -and $bb -ge 250 -and
          [Math]::Abs([int]$rr - [int]$gg) -le 8 -and
          [Math]::Abs([int]$gg - [int]$bb) -le 8) {
        $bytes[$o + 3] = 0
      } elseif ($rr -ge 246 -and $gg -ge 246 -and $bb -ge 246 -and
          [Math]::Abs([int]$rr - [int]$gg) -le 10 -and
          [Math]::Abs([int]$gg - [int]$bb) -le 10) {
        $bytes[$o + 3] = [byte]([Math]::Min([int]$bytes[$o + 3], 100))
      }
    }
  }

  $minX = $w; $minY = $h; $maxX = -1; $maxY = -1
  for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
      $o = $y * $stride + $x * 4
      if ($bytes[$o + 3] -lt 16) { continue }
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }

  [Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $len)
  $bmp.UnlockBits($data)

  if ($maxX -lt 0) {
    Write-Host "  WARN: no content found in $name"
    $bmp.Dispose()
    continue
  }

  $cw = $maxX - $minX + 1
  $ch = $maxY - $minY + 1
  $cropRect = New-Object System.Drawing.Rectangle $minX, $minY, $cw, $ch
  $cropped = $bmp.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $bmp.Dispose()

  # Fit content into a consistent box inside the canvas (same visual footprint)
  $fit = 1680
  $scale = [Math]::Min([double]$fit / $cw, [double]$fit / $ch)
  $nw = [Math]::Max(1, [int][Math]::Round($cw * $scale))
  $nh = [Math]::Max(1, [int][Math]::Round($ch * $scale))

  $scaled = New-Object System.Drawing.Bitmap $nw, $nh, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $sg = [System.Drawing.Graphics]::FromImage($scaled)
  $sg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $sg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $sg.Clear([System.Drawing.Color]::Transparent)
  $sg.DrawImage($cropped, 0, 0, $nw, $nh)
  $sg.Dispose()
  $cropped.Dispose()

  $out = New-Object System.Drawing.Bitmap $canvas, $canvas, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $og = [System.Drawing.Graphics]::FromImage($out)
  $og.Clear([System.Drawing.Color]::Transparent)
  $dx = [int](($canvas - $nw) / 2)
  $dy = [int](($canvas - $nh) / 2)
  $og.DrawImage($scaled, $dx, $dy, $nw, $nh)
  $og.Dispose()
  $scaled.Dispose()

  $tmp = Join-Path $dir "$n.__tmp.png"
  $out.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
  $out.Dispose()

  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
  Move-Item -LiteralPath $tmp -Destination $path -Force

  Write-Host ("  OK {0}: {1}x{2} -> {3}x{4} centered on {5}x{5}" -f $name, $cw, $ch, $nw, $nh, $canvas)
}

Write-Host "Done."
