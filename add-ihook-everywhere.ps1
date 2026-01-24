# Add IHook interface to all hook files that need it

$files = Get-ChildItem -Path "src\modules" -Filter "*.ts" -Recurse | Where-Object {
    $content = Get-Content $_.FullName -Raw
    ($content -match "}: IHook\)") -and ($content -notmatch "interface IHook")
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Find the last import statement
    $lines = Get-Content $file.FullName
    $lastImportIndex = -1
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match "^import ") {
            $lastImportIndex = $i
        }
    }

    if ($lastImportIndex -ge 0) {
        # Insert IHook interface after the last import
        $newLines = $lines[0..$lastImportIndex]
        $newLines += ""
        $newLines += "interface IHook {"
        $newLines += "  id?: string;"
        $newLines += "  setSheetOpen: (state: boolean) => void;"
        $newLines += "}"
        $newLines += $lines[($lastImportIndex + 1)..($lines.Count - 1)]

        Set-Content $file.FullName -Value ($newLines -join "`r`n")
        Write-Host "Added IHook to: $($file.FullName)"
    }
}

Write-Host "Done adding IHook interfaces!"
