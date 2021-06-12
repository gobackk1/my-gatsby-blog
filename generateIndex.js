const fs = require("fs")

/**
 * 配下の module をまとめて export する index ファイルを生成する
 *
 * 使い方
 * /TargetDir/ChildDir/XXX.ts
 * export const XXX = () => {}
 *
 * /TargetDir/index.ts
 * export { XXX } from './ChildDir/XXX'
 *
 * Other.ts
 * import { XXX } from '/TargetDir'
 *
 * package.json
 * "watch": {
    "gen": {
      "patterns": [
        "src"
      ],
      "extensions": "js,ts,tsx",
      "ignore": "src/components/index.ts",
      "runOnChangeOnly": true
    }
  },
 */

console.log("generateIndex start")
const targetDirs = ["./src/components"]

targetDirs.forEach(targetDir => {
  let result = ""
  const listWithoutIndex = fs
    .readdirSync(targetDir)
    .filter(l => !/\.(ts|js)/.test(l))

  listWithoutIndex.forEach(childDir => {
    const files = fs.readdirSync(`${targetDir}/${childDir}`)
    files.forEach(file => {
      const name = file.replace(/\.(tsx|ts|js)/, "")
      result += `export { ${name} } from "./${childDir}/${name}"\n`
    })
  })

  fs.writeFileSync(`${targetDir}/index.ts`, result)
})

console.log("generateIndex done")
