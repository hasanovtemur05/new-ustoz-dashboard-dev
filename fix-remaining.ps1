# Fix remaining specific warnings

# Fix CourseReward Page - remove categoryId
$file = "src\pages\CourseReward\Page.tsx"
if (Test-Path $file) {
    (Get-Content $file) -replace 'const \{ categoryId \}', '// const { categoryId }' | Set-Content $file
    Write-Host "Fixed: $file"
}

# Fix FortunaProduct Page - remove categoryId
$file = "src\pages\FortunaProduct\Page.tsx"
if (Test-Path $file) {
    (Get-Content $file) -replace 'const \{ categoryId \}', '// const { categoryId }' | Set-Content $file
    Write-Host "Fixed: $file"
}

# Fix FortunaProduct CustomForm - remove useParams
$file = "src\pages\FortunaProduct\CustomForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace "import \{ useParams \} from 'react-router-dom';[\r\n]+", ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix Courses Courses.tsx - remove isCourseEditPending
$file = "src\pages\Courses\Courses.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', isPending: isCourseEditPending', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix Meeting CourseForm - remove both isPending
$file = "src\pages\Meeting\CourseForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', isPending: isCourseCreatePending', ''
    $content = $content -replace ', isPending: isCourseEditPending', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix News - remove setCurrentPage
$file = "src\pages\News\News.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', setCurrentPage', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix Orders Page - remove isSheetOpen
$file = "src\pages\Orders\Page.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  const \[isSheetOpen, setSheetOpen\] = useState\(false\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

Write-Host "Done fixing specific files!"
