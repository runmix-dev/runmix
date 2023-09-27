#!/usr/bin/env node

// borrow from https://github.com/lhz516/webpack-react-express-ssr/blob/main/bin/generate-app.js

// Use CLI to generate a runmix app: runmix create my-app

const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.')
  console.log('For example: npx runmix my-app')
  process.exit(1)
}

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName)
const gitRepo = 'https://github.com/runmix-dev/runmix.git'

try {
  fs.mkdirSync(projectPath)
} catch(err) {
  if (err.code === 'EEXIST') {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`
    )
  } else {
    console.log(err)
  }
  process.exit(1)
}

async function main() {
  try {
    console.log(`Generating the project ${projectName}...`)
    console.log(`[1]Downloading the boilerplate...`)
    execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`)

    process.chdir(projectPath)

    console.log(`[2]Removing useless files`)
    execSync(`npx rimraf ./.git`)
    execSync(`npx rimraf ./bin`)

    console.log(`[3] Initializing git...`)
    execSync(`git init`)

    console.log(
      `[4] Installing dependencies (takes some time based on your network)...`
    )
    execSync('npm install')

    console.log('✨ The installation is done, now ready to use!')
  } catch(err) {
    console.log(err)
    console.log('\nGenerating boilerplate failed due to the error above.')
  }
}

main()