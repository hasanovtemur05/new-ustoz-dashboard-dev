# Fix modules and remaining files

# Modules - remove unused imports
$modulesFiles = @(
    @{Path="src\modules\battle-question\adapters.ts"; Pattern="export const getQuestionsList"},
    @{Path="src\modules\lastexam\adapters.ts"; Pattern="export const getQuestionsList"},
    @{Path="src\modules\product\adapters.ts"; Pattern="import \{ count \}"},
    @{Path="src\modules\quizzes\adapters.ts"; Pattern=", Question"},
    @{Path="src\modules\statistic-half-complete-course\adapters.ts"; Pattern="import \{ first \}"},
    @{Path="src\modules\story-v2\api.ts"; Pattern="import http"},
    @{Path="src\modules\orders\api.ts"; Pattern=", OrderType"},
    @{Path="src\modules\orders\hooks\useList.ts"; Pattern="import \{ OrderType \}"}
)

foreach ($item in $modulesFiles) {
    $file = $item.Path
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($item.Pattern -like "export*") {
            $content = $content -replace "$($item.Pattern)[^\r\n]+[\r\n]+", "// $($item.Pattern) - commented out (unused)`r`n"
        } elseif ($item.Pattern -like "import*") {
            $content = $content -replace "$($item.Pattern)[^\r\n]+[\r\n]+", ''
        } else {
            $content = $content -replace $item.Pattern, ''
        }
        Set-Content $file -Value $content -NoNewline
        Write-Host "Fixed: $file"
    }
}

# Fix Home pages
$file = "src\pages\Home\Home.tsx"
if (Test-Path $file) {
    (Get-Content $file) -replace "import StatisticHalfCompliteCourse from 'components/StatisticHalfCompliteCourse';", "// import StatisticHalfCompliteCourse from 'components/StatisticHalfCompliteCourse';" | Set-Content $file
    Write-Host "Fixed: $file"
}

$file = "src\pages\Home\MonthlyOverview.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', Calendar', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix News NewsForm
$file = "src\pages\News\NewsForm.tsx"
if (Test-Path $file) {
    (Get-Content $file) -replace "import \{ useCreateNotification \} from 'modules/notification/hooks/useCreate';", "// import { useCreateNotification } from 'modules/notification/hooks/useCreate';" | Set-Content $file
    Write-Host "Fixed: $file"
}

# Fix Notifications
$file = "src\pages\Notifications\Notifications.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', isLoading: isLoadingStat', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

$file = "src\pages\Notifications\StatisticsColumn.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace "import \{ convertDate \} from 'utils/convertDate';[\r\n]+", ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix Modules - modules folder
$file = "src\pages\Modules\Columns.tsx"
if (Test-Path $file) {
    (Get-Content $file) -replace "import \{ timeConverter \} from 'utils/timeConverter';", "// import { timeConverter } from 'utils/timeConverter';" | Set-Content $file
    Write-Host "Fixed: $file"
}

$file = "src\pages\Modules\ModulesForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', TextAreaField', ''
    $content = $content -replace "import \{ useEffect \} from 'react';[\r\n]+", ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

Write-Host "Done fixing modules and more!"
