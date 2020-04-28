import * as msi from 'electron-wix-msi';
// import MSICreator from 'electron-wix-msi';
import * as path from 'path';

const appDir = path.resolve("make-it-secret-win32-x64")
const outDir = path.resolve("installer")

const msiCreator = new msi.default.MSICreator({
// const msiCreator = new MSICreator({
  appDirectory: appDir,
  outputDirectory: outDir,
  description: 'Encrypt any files.',
  exe: 'Make It Secret',
  name: 'Make It Secret',
  manufacturer: 'Satshree Shrestha',
  programFilesFolderName:"Make It Secret",
  shortcutFolderName:"Make It Secret",
  shortcutName:"Make It Secret",
  version: '1.0.0',
  ui: {
    chooseDirectory: true
  },
});

msiCreator.create().then(() => msiCreator.compile());