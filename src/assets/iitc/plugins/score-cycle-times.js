// @author         jonatkins
// @name           IITC plugin: Scoring cycle / checkpoint times
// @category       Info
// @version        0.2.1.20240330.064928
// @description    Show the times used for the septicycle and checkpoints for regional scoreboards.

(function () {
  plugin_info = {}
  plugin_info.script = {
    version: '0.2.1',
    name: 'Scoring cycle / checkpoint times',
    description: 'Show the times used for the septicycle and checkpoints for regional scoreboards.'
  }
  plugin_info.buildName = 'dev';
  plugin_info.dateTimeVersion = '2024-03-30-064928';
  plugin_info.pluginId = 'score-cycle-times';

/* exported setup, changelog --eslint */

var changelog = [
  {
    version: '0.2.1',
    changes: ['Version upgrade due to a change in the wrapper: added plugin icon'],
  },
];

// use own namespace for plugin
var scoreCycleTimes = {};
window.plugin.scoreCycleTimes = scoreCycleTimes;

scoreCycleTimes.CHECKPOINT = 5 * 60 * 60 * 1000; // 5 hours per checkpoint
scoreCycleTimes.CYCLE = 7 * 5 * scoreCycleTimes.CHECKPOINT; // 7 25-hour 'days' per cycle
scoreCycleTimes.locale = navigator.languages;
scoreCycleTimes.dateTimeFormat = {
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit'
};

scoreCycleTimes.formatRow = function (label, time) {
  var dateTime = new Date(time).toLocaleString(scoreCycleTimes.locale, scoreCycleTimes.dateTimeFormat);
  return '<tr><td>' + label + '</td><td>' + dateTime + '</td></tr>';
};

scoreCycleTimes.update = function () {
  // checkpoint and cycle start times are based on a simple modulus of the timestamp
  // no special epoch (other than the unix timestamp/javascript's 1970-01-01 00:00 UTC) is required

  // when regional scoreboards were introduced, the first cycle would have started at 2014-01-15 10:00 UTC - but it was
  // a few checkpoints in when scores were first added

  var now = Date.now();

  var cycleStart = Math.floor(now / scoreCycleTimes.CYCLE) * scoreCycleTimes.CYCLE;
  var cycleEnd = cycleStart + scoreCycleTimes.CYCLE;

  var checkpointStart = Math.floor(now / scoreCycleTimes.CHECKPOINT) * scoreCycleTimes.CHECKPOINT;
  var checkpointEnd = checkpointStart + scoreCycleTimes.CHECKPOINT;

  var html = '<table>'
    + scoreCycleTimes.formatRow('Cycle start', cycleStart)
    + scoreCycleTimes.formatRow('Previous checkpoint', checkpointStart)
    + scoreCycleTimes.formatRow('Next checkpoint', checkpointEnd)
    + scoreCycleTimes.formatRow('Cycle end', cycleEnd)
    + '</table>';

  $('#score_cycle_times_display').html(html);

  setTimeout(scoreCycleTimes.update, checkpointEnd-now);
};

function setup () {
  $('#sidebar').append('<div id="score_cycle_times_display"></div>');
  $('<style>')
    .html('#score_cycle_times_display { color: #ffce00; }')
    .appendTo('head');

  scoreCycleTimes.update();
}

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
})();

