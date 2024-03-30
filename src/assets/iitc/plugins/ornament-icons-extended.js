// @author         johtata
// @name           IITC plugin: Ornament icons extended
// @category       Layer
// @version        0.1.1.20240330.064928
// @description    Additonal icons and names for beacons

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.1.1',
    name: 'Ornament icons extended',
    description: 'Additonal icons and names for beacons'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'ornament-icons-extended';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.1.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];


// peNIA, peNEMESIS, peVIALUX, peVIANOIR, peAEIGSNOVA, etc.

// use own namespace for plugin
window.plugin.ornamentIconsExt = function () {};

window.plugin.ornamentIconsExt.jsonUrl = 'https://iitc.app/extras/ornaments/definitions_ext.json';

// append or overwrite external definitions
window.plugin.ornamentIconsExt.setIcons = function(externalIconDefinitions) {
  const localIconDefinitions = {
    // no local definitions here
  };
  window.ornaments.icon = {...window.ornaments.icon, ...externalIconDefinitions, ...localIconDefinitions};
}

function setup () {
  fetch(window.plugin.ornamentIconsExt.jsonUrl).then(response => {
    response.json().then(data => {
      window.plugin.ornamentIconsExt.setIcons(data.ornaments);
    })
  });
}
/* exported setup */

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

