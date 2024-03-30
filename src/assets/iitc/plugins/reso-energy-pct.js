// @author         xelio
// @name           IITC plugin: Reso energy % in portal details
// @category       Portal Info
// @version        0.1.3.20240330.064928
// @description    Show resonator energy percentage on resonator energy bar in portal details panel.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.1.3',
    name: 'Reso energy % in portal details',
    description: 'Show resonator energy percentage on resonator energy bar in portal details panel.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'reso-energy-pct';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.1.3',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
window.plugin.resoEnergyPctInPortalDetail = function() {};

window.plugin.resoEnergyPctInPortalDetail.updateMeter = function(data) {
  $("span.meter-level")
    .css({
      "word-spacing": "-1px",
      "text-align": "left",
      "font-size": "90%",
      "padding-left": "2px",
    })
    .each(function() {
      var matchResult = $(this).parent().attr('title').match(/\((\d*\%)\)/);
      if(matchResult) {
        var html = $(this).html() + '<div style="position:absolute;right:0;top:0">' + matchResult[1] + '</div>';
        $(this).html(html);
      }
    });
}

var setup =  function() {
  window.addHook('portalDetailsUpdated', window.plugin.resoEnergyPctInPortalDetail.updateMeter);
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

