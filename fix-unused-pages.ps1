# Fix more unused variables in pages

# Fix Donation Page - remove all unused vars
$file = "src\pages\Donation\Page.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  const \[isDialogOpen, setDialogOpen\] = useState\(false\);[\r\n]+', ''
    $content = $content -replace '  const \[isSheetOpen, setSheetOpen\] = useState\(false\);[\r\n]+', ''
    $content = $content -replace '  const \[data, setData\] = useState<[^>]+>\(\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix UsersCertificates Page
$file = "src\pages\UsersCertificates\Page.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  const \[isDialogOpen, setDialogOpen\] = useState\(false\);[\r\n]+', ''
    $content = $content -replace '  const \[isSheetOpen, setSheetOpen\] = useState\(false\);[\r\n]+', ''
    $content = $content -replace '  const \[isPanding, setPanding\] = useState\(false\);[\r\n]+', ''
    $content = $content -replace '  const \[data, setData\] = useState<[^>]+>\(\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix StatisticsHalfCompleteCourse Page
$file = "src\pages\StatisticsHalfCompleteCourse\Page.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    # Remove unused imports
    $content = $content -replace "import \{ useUserCertificateList \} from 'modules/certificate/hooks/useList';[\r\n]+", ''
    $content = $content -replace "import \{ IUserCertificate \} from 'modules/certificate/types';[\r\n]+", ''
    $content = $content -replace "import http from 'services/api';[\r\n]+", ''
    $content = $content -replace "import \{ Button \} from 'components/ui/button';[\r\n]+", ''
    # Remove unused state variables
    $content = $content -replace '  const \[isDialogOpen, setDialogOpen\] = useState\(false\);[\r\n]+', ''
    $content = $content -replace '  const \[isSheetOpen, setSheetOpen\] = useState\(false\);[\r\n]+', ''
    $content = $content -replace '  const \[isPanding, setPanding\] = useState\(false\);[\r\n]+', ''
    $content = $content -replace '  const \[data, setData\] = useState<[^>]+>\(\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix StatisticsHalfCompleteCourse Columns
$file = "src\pages\StatisticsHalfCompleteCourse\Columns.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', IUserHalfCompleteCourse', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix FortunaPromocode Page
$file = "src\pages\FortunaPromocode\Page.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  const \[loading, setIsLoading\] = useState\(false\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix CourseRewardPromocode CustomForm
$file = "src\pages\CourseRewardPromocode\CustomForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  const \{ generatePromocode \} = useAutoGeneratePromocode\(\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix FortunaPromocode CustomForm
$file = "src\pages\FortunaPromocode\CustomForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  const \{ generatePromocode \} = useAutoGenerateFortunaPromocode\(\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

Write-Host "Done fixing more pages!"
