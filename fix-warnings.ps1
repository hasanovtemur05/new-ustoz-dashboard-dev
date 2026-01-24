# Script to fix common ESLint warnings

$files = @(
    "src\pages\PremiumPlans\CustomForm.tsx",
    "src\pages\Teachers\CustomForm.tsx",
    "src\pages\Category\CustomForm.tsx",
    "src\pages\Certificate\CustomForm.tsx",
    "src\pages\CourseAssistant\CustomForm.tsx",
    "src\pages\Info\InfoForm.tsx",
    "src\pages\Banner\CustomForm.tsx",
    "src\pages\CourseReward\CustomForm.tsx",
    "src\pages\FortunaProduct\CustomForm.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        # Remove unused isInfoCreatePending
        $content = $content -replace ', isPending: isInfoCreatePending', ''
        Set-Content $file -Value $content -NoNewline
        Write-Host "Fixed: $file"
    }
}

Write-Host "Done fixing unused isPending variables"
