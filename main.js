const path = require('path')
const fs = require('fs')

const cli = () => {
    require('yargs')
        .scriptName('fivemdev')
        .command('resource:create [name] [-u | -r]', 'Create a resource with the name of your choice in current directory', (yargs) => {
            yargs
                .positional('name', {
                    describe: 'name of resource',
                    default: 'myresource'
                })
                .describe('ui', 'add folder for HUD')
        }, (argv) => {
            if(argv.u && argv.r) return console.log('only one tag can be chosen')
            console.log(`Create discord app with name ${argv.name} at ${process.cwd()}`);
            const targetDir = path.resolve(process.cwd(), argv.name);
            if(fs.existsSync(targetDir)) return new Error(`Directory ${argv.name} already exist at ${process.cwd()}`);
            fs.mkdirSync(targetDir)
            let dirs = ['client', 'locals', 'server'];
            if(argv.u) dirs.push('nui')
            if(argv.r) {
                dirs.push('src')
                dirs.push('build')
            }
            for(const dir of dirs) {
                fs.mkdirSync(path.resolve(targetDir, dir))
            }
            if(argv.u) {
                dirs = ['css', 'js', 'lib'];
                for(const dir of dirs) {
                    fs.mkdirSync(path.resolve(targetDir, `./nui/${dir}`))
                }
                fs.appendFile(path.resolve(targetDir, './nui/css/style.css'), '', (err) => {if(err) return  console.log(err)});
                fs.appendFile(path.resolve(targetDir, './nui/js/main.js'), '', (err) => {if(err) return  console.log(err)});
                fs.copyFileSync(path.resolve(path.resolve(__dirname, `./templates/resource/nui`), `ui.html`), path.resolve(targetDir, './nui/ui.html'))
            } else if(argv.r) {
                fs.copyFileSync(path.resolve(path.resolve(__dirname, `./templates/resource/react`), `App.js`), path.resolve(targetDir, './src/App.js'))
                fs.copyFileSync(path.resolve(path.resolve(__dirname, `./templates/resource/react`), `index.js`), path.resolve(targetDir, './src/index.js'))
                fs.appendFile(path.resolve(targetDir, './src/style.css'), '', (err) => {if(err) return  console.log(err)});
                fs.copyFileSync(path.resolve(path.resolve(__dirname, `./templates/resource/react`), `index.html`), path.resolve(targetDir, './build/index.html'))
                fs.copyFileSync(path.resolve(path.resolve(__dirname, `./templates/resource/react`), `.babelrc`), path.resolve(targetDir, '.babelrc'))
                fs.copyFileSync(path.resolve(path.resolve(__dirname, `./templates/resource/react`), `package.json`), path.resolve(targetDir, 'package.json'))
                fs.copyFileSync(path.resolve(path.resolve(__dirname, `./templates/resource/react`), `webpack.config.js`), path.resolve(targetDir, 'webpack.config.js'))
            }
            fs.appendFile(path.resolve(targetDir, './client/main.lua'), '', (err) => {if(err) return  console.log(err)});
            fs.appendFile(path.resolve(targetDir, './server/main.lua'), '', (err) => {if(err) return  console.log(err)});
            fs.appendFile(path.resolve(targetDir, './locals/fr.lua'), `Locales['fr'] = {\n\n}`, (err) => {if(err) return  console.log(err)});
            fs.appendFile(path.resolve(targetDir, 'config.lua'), `Config = {}`, (err) => {if(err) return  console.log(err)});
            if(argv.u) {
                fs.copyFileSync(path.resolve(path.resolve(__dirname, `./templates/resource`), `fxmanifestUI.lua`), path.resolve(targetDir, 'fxmanifest.lua'))
            } else if(argv.r) {
                fs.copyFileSync(path.resolve(path.resolve(__dirname, `./templates/resource/react`), `fxmanifestUIr.lua`), path.resolve(targetDir, 'fxmanifest.lua'))
            } else {
                fs.copyFileSync(path.resolve(path.resolve(__dirname, `./templates/resource`), `fxmanifest.lua`), path.resolve(targetDir, 'fxmanifest.lua'))
            }
            console.log('Your resource is ready to edit !')
        })
        .help('h')
        .alias('h', 'help')
        .argv

}
exports.cli = cli;