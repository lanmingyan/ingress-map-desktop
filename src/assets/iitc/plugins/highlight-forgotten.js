// @author         jonatkins
// @name           IITC plugin: Highlight inactive portals
// @category       Highlighter
// @version        0.2.1.20240330.064928
// @description    Use the portal fill color to denote if the portal is unclaimed with no recent activity. Shades of red from one week to one month, then tinted to purple for longer. May also highlight captured portals that are stuck and fail to decay every 24 hours.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.2.1',
    name: 'Highlight inactive portals',
    description: 'Use the portal fill color to denote if the portal is unclaimed with no recent activity.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'highlight-forgotten';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.2.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

function highlightInactivePortals (data) {

  if (data.portal.options.timestamp > 0) {
    var daysUnmodified = (new Date().getTime() - data.portal.options.timestamp) / (24*60*60*1000);
    if (daysUnmodified >= 7) {
      var fill_opacity = Math.min(1,((daysUnmodified-7)/24)*.85 + .15);
      var blue = Math.max(0,Math.min(255,Math.round((daysUnmodified-31)/62*255)));
      var colour = 'rgb(255,0,'+blue+')';
      var params = {fillColor: colour, fillOpacity: fill_opacity};
      data.portal.setStyle(params);
    }
  }

}

function setup () {
  window.addPortalHighlighter('Inactive Portals', highlightInactivePortals);
}


setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

