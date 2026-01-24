# Fix more unused variables

# Fix Teachers CustomForm - remove unused switchState
$file = "src\pages\Teachers\CustomForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  const \[switchState, setSwitchState\] = useState\(false\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed switchState in $file"
}

# Fix CourseAssistant CustomForm - remove isNotificationEditPending
$file = "src\pages\CourseAssistant\CustomForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', isPending: isNotificationEditPending', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed isNotificationEditPending in $file"
}

# Fix Certificate CustomForm - remove TextField import
$file = "src\pages\Certificate\CustomForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', TextField', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed TextField import in $file"
}

# Fix CourseAssistant Columns - remove Course import
$file = "src\pages\CourseAssistant\Columns.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace "import \{ Course \} from 'modules/courses/types';[\r\n]+", ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed Course import in $file"
}

Write-Host "Done!"
