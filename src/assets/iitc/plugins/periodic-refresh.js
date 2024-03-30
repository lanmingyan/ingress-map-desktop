// @author         jonatkins
// @name           IITC plugin: Periodic refresh
// @category       Tweaks
// @version        0.1.1.20240330.064928
// @description    For use for unattended display screens only, this plugin causes idle mode to be left once per hour.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.1.1',
    name: 'Periodic refresh',
    description: 'For use for unattended display screens only, this plugin causes idle mode to be left once per hour.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'periodic-refresh';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.1.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

window.plugin.periodicRefresh = function() {};

window.plugin.periodicRefresh.wakeup = function() {
  console.log('periodicRefresh: timer fired - leaving idle mode');
  idleReset();
}


window.plugin.periodicRefresh.setup = function() {

  var refreshMinutes = 60;

  setInterval ( window.plugin.periodicRefresh.wakeup, refreshMinutes*60*1000 );

};

var setup = window.plugin.periodicRefresh.setup;

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

