# Fix final warnings - MarketPromocode and other remaining pages

# Fix MarketPromocode Page - remove all unused imports and vars
$file = "src\pages\MarketPromocode\Page.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace "import MediaUploadField from 'components/MediaUploadField';[\r\n]+", ''
    $content = $content -replace "import \{ Form \} from 'components/ui/form';[\r\n]+", ''
    $content = $content -replace "import \{ useForm \} from 'react-hook-form';[\r\n]+", ''
    $content = $content -replace "import \{ zodResolver \} from '@hookform/resolvers/zod';[\r\n]+", ''
    $content = $content -replace "import \{ checkFileSchema, useCheckFileSchemaType \} from './checkFileSchema';[\r\n]+", ''
    $content = $content -replace '  const \[loading, setIsLoading\] = useState\(false\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix MarketPromocode CustomForm
$file = "src\pages\MarketPromocode\CustomForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  const createMethods = useForm[^\r\n]+[\r\n]+', ''
    $content = $content -replace ', setCurrentPage', ''
    $content = $content -replace '  const \{ generatePromocode \} = useAutoGeneratePromocode\(\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix AddRewardToLessons files
$file = "src\pages\AddRewardToLessons\Columns.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace "import \{ Link \} from 'react-router-dom';[\r\n]+", ''
    $content = $content -replace "import normalizeImgUrl from 'utils/normalizeImgUrl';[\r\n]+", ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

$file = "src\pages\AddRewardToLessons\CustomForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', TextField', ''
    $content = $content -replace ', ICourseRewardInput', ''
    $content = $content -replace "import VideoUploadField from 'components/VideoUploadField';[\r\n]+", ''
    $content = $content -replace ', setSearchParams', ''
    $content = $content -replace '  const \{ uploadFile \} = useFileUploader\(\);[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

$file = "src\pages\AddRewardToLessons\Page.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '  const \[searchParams\] = useSearchParams\(\);[\r\n]+', ''
    $content = $content -replace ', isLoading: loadingCourses', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix BattleQuestion QuizForm
$file = "src\pages\BattleQuestion\QuizForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', useFieldArray', ''
    $content = $content -replace '    const \{ control \} = form;[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix LastExam QuizForm
$file = "src\pages\LastExam\QuizForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace '    const \{ getValues \} = form;[\r\n]+', ''
    $content = $content -replace '    const \{ fields: questionFields, [^\r\n]+[\r\n]+', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix Product CustomForm
$file = "src\pages\Product\CustomForm.tsx"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace ', isPending', ''
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix modules hooks - unused type imports
$hookFiles = @(
    "src\modules\fortuna-promocode\hooks\useCreate.ts",
    "src\modules\fortuna-promocode\hooks\useEdit.ts",
    "src\modules\market-promocode\hooks\useAutoGenerate.ts",
    "src\modules\market-promocode\hooks\useCreate.ts",
    "src\modules\market-promocode\hooks\useEdit.ts",
    "src\modules\quizzes\hooks\useCreateQuiz.ts",
    "src\modules\quizzes\hooks\useEditQuiz.ts",
    "src\modules\statistics\hooks\useDailyPuzzleSubmission.ts",
    "src\modules\statistics\hooks\useLessonStatistics.ts",
    "src\modules\orders\hooks\useEdit.ts"
)

foreach ($file in $hookFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace "import \{ IMarketPromocodeInput \} from '../types';[\r\n]+", ''
        $content = $content -replace "import \{ CreateData \} from '../api';[\r\n]+", ''
        $content = $content -replace "import \{ QuizInput \} from '../types';[\r\n]+", ''
        $content = $content -replace "import \{ PuzzleDifficulty \} from '../types';[\r\n]+", ''
        $content = $content -replace "import \{ DateRange, AuthType \} from '../types';[\r\n]+", ''
        $content = $content -replace "interface IHook \{[\r\n]+[^\}]+\}[\r\n]+[\r\n]+", ''
        Set-Content $file -Value $content -NoNewline
        Write-Host "Fixed: $file"
    }
}

Write-Host "Done fixing final warnings!"
