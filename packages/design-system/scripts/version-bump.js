#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')

const versionType = process.argv[2]
const tag = process.argv[3] || 'latest'

if (!versionType) {
  console.log(
    'Uso: node scripts/version-bump.js <patch|minor|major|version> [tag]',
  )
  process.exit(1)
}

const exec = (command) => execSync(command, { stdio: 'inherit' })

function bumpVersion(type) {
  try {
    console.log(`Atualizando versão: ${type}`)
    exec(`npm version ${type} --no-git-tag-version`)

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const newVersion = packageJson.version

    console.log('Buildando projeto...')
    exec('npm run build')

    console.log('Fazendo commit da nova versão...')
    exec('git add package.json')
    exec(`git commit -m "chore: bump version to ${newVersion}"`)

    console.log(`Criando tag v${newVersion}...`)
    exec(`git tag v${newVersion}`)

    console.log(`Publicando versão ${newVersion} com tag ${tag}...`)
    exec(`npm publish --tag ${tag}`)

    console.log('Enviando mudanças para o repositório...')
    exec('git push origin main --follow-tags')

    console.log(`Versão ${newVersion} publicada com sucesso!`)
  } catch (error) {
    console.error('Erro durante o processo:', error.message)
    process.exit(1)
  }
}

bumpVersion(versionType)
