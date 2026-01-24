# Fix target="_blank" security issues and == to ===

$files = Get-ChildItem -Path "src\pages" -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $changed = $false

    # Fix target="_blank" without rel="noreferrer"
    if ($content -match 'target="_blank"(?!\s+rel=)') {
        $content = $content -replace 'target="_blank"', 'target="_blank" rel="noreferrer noopener"'
        $changed = $true
    }

    # Fix == to === (only for simple cases, avoid complex expressions)
    if ($content -match '(?<![=!<>])==(?!=)') {
        # Be careful to only replace == and not !== or ===
        $content = $content -replace '(\s)==(\s)', '$1===$2'
        $content = $content -replace '(\))==(\s)', '$1===$2'
        $content = $content -replace '(\s)==(\()', '$1===$2'
        $changed = $true
    }

    if ($changed) {
        Set-Content $file.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($file.FullName)"
    }
}

Write-Host "Done!"
