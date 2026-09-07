$ErrorActionPreference = "Stop"

# 這支檔案必須存成「UTF-8 with BOM」。
# Windows PowerShell 5.1 讀不到 BOM 就會把整個檔案當成系統 ANSI（正體中文是
# cp950）解碼，下面 commit -m 的中文會變成亂碼才傳給 git —— gh-pages 上
# 「deploy: ?湔 Storybook GitHub Pages」就是這樣來的。編輯器另存時請留意。

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$deployDir = Join-Path $repoRoot "storybook-static"
$remoteUrl = "git@github.com:seanhong1215/StoryBook_Demo.git"

Set-Location $repoRoot
npm.cmd run build-storybook

New-Item -ItemType File -Path (Join-Path $deployDir ".nojekyll") -Force | Out-Null

$deployGitDir = Join-Path $deployDir ".git"
if (Test-Path $deployGitDir) {
  Remove-Item -LiteralPath $deployGitDir -Recurse -Force
}

Set-Location $deployDir
git init
git -c "safe.directory=$deployDir" checkout -b gh-pages
git -c "safe.directory=$deployDir" add .
git -c "safe.directory=$deployDir" commit -m "deploy: 更新 Storybook GitHub Pages"
git -c "safe.directory=$deployDir" remote add origin $remoteUrl
git -c "safe.directory=$deployDir" push -f origin gh-pages

Set-Location $repoRoot
Remove-Item -LiteralPath $deployGitDir -Recurse -Force

Write-Host "Storybook deployed to GitHub Pages."
