const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const { createPluginsMenu, loadPlugin } = require('./pluginsManager');
const { windowConfig, menuTemplateConfig, initialScripts } = require('./config');

async function createWindow() {
  const win = new BrowserWindow(windowConfig);

  let menu = Menu.buildFromTemplate(menuTemplateConfig);
  Menu.setApplicationMenu(menu);

  win.maximize();
  win.loadURL('https://intel.ingress.com/');

  win.on('page-title-updated', (event) => {
    event.preventDefault();
    win.setTitle('Ingress Map Desktop');
  });

  win.webContents.on('did-finish-load', async () => {
    await loadInitialScripts(win);

    win.webContents.executeJavaScript(`localStorage.getItem('activePlugins')`).then(async (activePluginsJSON) => {
      const activePlugins = JSON.parse(activePluginsJSON || '[]');
      for (const pluginFilename of activePlugins) {
        await loadPlugin(win, pluginFilename);
      }

      const pluginsSubmenus = await createPluginsMenu(win);

      let menuTemplate = menuTemplateConfig.map(item => {
        if (item.label === 'Plugins') {
          return pluginsSubmenus;
        }
        return item;
      });

      menu = Menu.buildFromTemplate(menuTemplate);
      Menu.setApplicationMenu(menu);
    });
  });

  return win;
}

async function loadInitialScripts(win) {
  for (const script of initialScripts) {
    try {
      const scriptPath = path.join(__dirname, script);
      const data = await fs.readFile(scriptPath, 'utf8');
      await win.webContents.executeJavaScript(data);
      console.log(`${script} injected successfully.`);
    } catch (err) {
      console.error(`Failed to load ${script}`, err);
    }
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});