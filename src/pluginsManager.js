const { Menu, MenuItem } = require('electron');
const path = require('path');
const fs = require('fs').promises;

const pluginsDir = path.join(__dirname, 'assets', 'iitc', 'plugins');
global.activePlugins = [];

async function loadPlugin(win, plugin) {
  const pluginPath = path.join(pluginsDir, plugin);
  const data = await fs.readFile(pluginPath, 'utf8');
  await win.webContents.executeJavaScript(data);
  console.log(`${plugin} loaded.`);
}

async function createPluginsMenu(win) {
  let activePlugins = await win.webContents.executeJavaScript('localStorage.getItem("activePlugins")');
  activePlugins = activePlugins ? JSON.parse(activePlugins) : [];

  const files = await fs.readdir(pluginsDir);
  const plugins = await Promise.all(files.filter(file => file.endsWith('.js')).map(async (plugin) => {
    const pluginPath = path.join(pluginsDir, plugin);
    const data = await fs.readFile(pluginPath, 'utf8');
    const nameMatch = data.match(/\/\/\s*@name\s+(.+)/);
    const categoryMatch = data.match(/\/\/\s*@category\s+(.+)/);
    return {
      filename: plugin,
      name: nameMatch ? nameMatch[1].trim() : plugin,
      category: categoryMatch ? categoryMatch[1].trim() : 'Other',
    };
  }));

  const pluginsByCategory = plugins.reduce((acc, plugin) => {
    if (!acc[plugin.category]) {
      acc[plugin.category] = [];
    }
    acc[plugin.category].push(plugin);
    return acc;
  }, {});

  const categoryMenus = Object.entries(pluginsByCategory).map(([category, plugins]) => {
    const submenu = new Menu();
    plugins.forEach(plugin => {
      const isChecked = activePlugins.includes(plugin.filename);
      submenu.append(new MenuItem({
        label: plugin.name,
        type: 'checkbox',
        checked: isChecked,
        click: async (menuItem) => {
          const pluginPath = path.join(pluginsDir, plugin.filename);
          const data = await fs.readFile(pluginPath, 'utf8');
          if (menuItem.checked) {
            activePlugins.push(plugin.filename);
            await loadPlugin(win, plugin.filename);
            win.webContents.executeJavaScript(`localStorage.setItem('activePlugins', JSON.stringify(${JSON.stringify(activePlugins)}));`);
          } else {
            const index = activePlugins.indexOf(plugin.filename);
            if (index > -1) {
              activePlugins.splice(index, 1);
            }
            win.webContents.executeJavaScript(`localStorage.setItem('activePlugins', JSON.stringify(${JSON.stringify(activePlugins)}));`);
            win.reload();
          }
        }
      }));
    });
    return { label: category, submenu };
  });

  return {
    label: 'Plugins',
    submenu: categoryMenus,
  };
}

module.exports = { createPluginsMenu, loadPlugin };