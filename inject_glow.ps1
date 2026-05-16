$path = 'c:\Users\rodxg\Developer\apocalypsetheater\production-hub.html'
$content = Get-Content $path -Raw

# Inject card-glow after every opening card div (only if not already present)
$content = $content -replace '(<div class="card[^"]*">)(\r?\n)(?!\s*<div class="card-glow")', '$1$2            <div class="card-glow"></div>$2'

# Add reveal class to every section-head div
$content = $content -replace '<div class="section-head">', '<div class="section-head reveal">'

# Add reveal class to hero-content
$content = $content -replace '<div class="hero-content">', '<div class="hero-content reveal">'

Set-Content $path $content -NoNewline -Encoding UTF8
Write-Host "Done."
