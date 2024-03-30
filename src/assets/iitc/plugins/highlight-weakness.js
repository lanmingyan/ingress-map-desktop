// @author         vita10gy
// @name           IITC plugin: Highlight portal weakness
// @category       Highlighter
// @version        0.8.1.20240330.064928
// @description    Use the fill color of the portals to denote if the portal is weak. Stronger red indicates recharge required, missing resonators, or both.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.8.1',
    name: 'Highlight portal weakness',
    description: 'Use the fill color of the portals to denote if the portal is weak. Stronger red indicates recharge required, missing resonators, or both.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'highlight-weakness';

/* exported setup, changelog --eslint */
/* global TEAM_NONE */

var changelog = [
  {
    version: '0.8.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

function weaknessHighlight (data) {

  if (data.portal.options.data.resCount !== undefined
      && data.portal.options.data.health !== undefined
      && data.portal.options.team !== TEAM_NONE) {
    var res_count = data.portal.options.data.resCount;
    var portal_health = data.portal.options.data.health;

    var strength = (res_count/8) * (portal_health/100);
    if (strength < 1) {
      var fill_opacity = (1-strength)*.85 + .15;
      var color = 'red';
      var params = {fillColor: color, fillOpacity: fill_opacity};

      // Hole per missing resonator
      if (res_count < 8) {
        var dash = new Array((8 - res_count) + 1).join('1,4,') + '100,0';
        params.dashArray = dash;
      }

      data.portal.setStyle(params);
    }
  }

}

function setup () {
  window.addPortalHighlighter('Portal Weakness', weaknessHighlight);
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

