# Fix broken hook files by restoring IHook and CreateData

# Fix fortuna-promocode useCreate
$file = "src\modules\fortuna-promocode\hooks\useCreate.ts"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace "import \{ useMutation \} from '@tanstack/react-query';", "import { useMutation } from '@tanstack/react-query';`r`nimport { CreateData } from '../api';"
    $content = $content -replace "import \{ showErrorToast \} from 'utils/showErrorToast';", "import { showErrorToast } from 'utils/showErrorToast';`r`n`r`ninterface IHook {`r`n  setSheetOpen: (state: boolean) => void;`r`n}"
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix fortuna-promocode useEdit
$file = "src\modules\fortuna-promocode\hooks\useEdit.ts"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    if ($content -notmatch "interface IHook") {
        $content = $content -replace "import \{ showErrorToast \} from 'utils/showErrorToast';", "import { showErrorToast } from 'utils/showErrorToast';`r`n`r`ninterface IHook {`r`n  id?: string;`r`n  setSheetOpen: (state: boolean) => void;`r`n}"
        Set-Content $file -Value $content -NoNewline
        Write-Host "Fixed: $file"
    }
}

# Fix market-promocode useCreate
$file = "src\modules\market-promocode\hooks\useCreate.ts"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace "import \{ useMutation \} from '@tanstack/react-query';", "import { useMutation } from '@tanstack/react-query';`r`nimport { CreateData } from '../api';"
    $content = $content -replace "import \{ showErrorToast \} from 'utils/showErrorToast';", "import { showErrorToast } from 'utils/showErrorToast';`r`n`r`ninterface IHook {`r`n  setSheetOpen: (state: boolean) => void;`r`n}"
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

# Fix market-promocode useEdit
$file = "src\modules\market-promocode\hooks\useEdit.ts"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    if ($content -notmatch "interface IHook") {
        $content = $content -replace "import \{ showErrorToast \} from 'utils/showErrorToast';", "import { showErrorToast } from 'utils/showErrorToast';`r`n`r`ninterface IHook {`r`n  id?: string;`r`n  setSheetOpen: (state: boolean) => void;`r`n}"
        Set-Content $file -Value $content -NoNewline
        Write-Host "Fixed: $file"
    }
}

# Fix market-promocode useAutoGenerate
$file = "src\modules\market-promocode\hooks\useAutoGenerate.ts"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $content = $content -replace "import \{ useMutation \} from '@tanstack/react-query';", "import { useMutation } from '@tanstack/react-query';`r`nimport { AutoGenerate } from '../api';"
    Set-Content $file -Value $content -NoNewline
    Write-Host "Fixed: $file"
}

Write-Host "Done fixing broken hooks!"
