$ErrorActionPreference = "Stop"

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
