/* eslint-disable @typescript-eslint/no-require-imports */
// ...existing code...
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const viewsDir = path.join(__dirname, '../src/views');
const mainFile = path.join(__dirname, '../src/main.ts');
const original = fs.readFileSync(mainFile, 'utf-8');

const dirs = fs.readdirSync(viewsDir);
for (const dir of dirs) {
    const fullPath = path.join(viewsDir, dir);
    if (fs.lstatSync(fullPath).isDirectory()) {
        // 每次循环前先恢复原始内容
        fs.writeFileSync(mainFile, original);

        // 再进行替换
        const replaced = original.replace(
            "import App from './App.vue'",
            `import App from './views/${dir}/App.vue'`
        );
        fs.writeFileSync(mainFile, replaced);

        // 执行构建
        execSync(`npx vite build --outDir dist/${dir}`, { stdio: 'inherit' });
    }
}

// 最后恢复原始内容
fs.writeFileSync(mainFile, original);
// ...existing code...