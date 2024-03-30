const { app, dialog } = require('electron');

const VERSION = '0.1.0'

const windowConfig = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
  title: 'Ingress Map Desktop'
};

const menuTemplateConfig = [
  ...(process.platform === 'darwin' ? [{
    label: app.name,
    submenu: [
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Plugins',
    submenu: []
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About',
        click: () => {
          dialog.showMessageBox({
            type: 'info',
            title: 'About',
            message: 'Ingress Map Desktop',
            detail: `Version: ${VERSION}`
          });
        },
      }
    ]
  }
];

const initialScripts = [
  'assets/js/jquery-3.6.0.min.js',
  'assets/iitc/total-conversion-build.js'
];

module.exports = { windowConfig, menuTemplateConfig, initialScripts };