# build_twa.ps1
# Coopex Hub -> APK (Trusted Web Activity) via Bubblewrap
# Requisitos:
# - Node.js LTS
# - Java JDK 17
# - Android Studio (ou Android SDK + build-tools) configurado
#
# 1) Publique este Hub em um domínio HTTPS (GitHub Pages, Render, etc.)
# 2) Atualize a URL do manifest abaixo e rode o script.

$manifestUrl = "https://SEU-DOMINIO/manifest.webmanifest"

# Instala Bubblewrap CLI globalmente
npm i -g @bubblewrap/cli

# Cria pasta de build (TWA)
$buildDir = "twa-build"
if (Test-Path $buildDir) { Remove-Item $buildDir -Recurse -Force }
New-Item -ItemType Directory -Path $buildDir | Out-Null
Set-Location $buildDir

# Inicializa projeto (vai perguntar sobre keystore/assinatura se necessário)
bubblewrap init --manifest=$manifestUrl --packageId=br.com.coopex.hub --name="Coopex Hub" --launcherName="Coopex Hub"

# Compila APK
bubblewrap build

Write-Host "Se tudo deu certo, o APK assinado costuma sair em: app-release-signed.apk"
