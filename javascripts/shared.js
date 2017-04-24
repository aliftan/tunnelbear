var TunnelBear = {};

TunnelBear.apiBaseUrl = (function() {
  var origin = window.location.origin;

  if (!origin) {
    origin = window.location.protocol + '//' + window.location.host;
  }

  return origin + '/';
})();

TunnelBear.isLoggedIn = (function() {
  var tbSession = $.cookie('TB_SESSION');
  var playSession = $.cookie('PLAY_SESSION');

  if (tbSession) {
    return true;
  }

  if (playSession) {
    return playSession.indexOf('sessionid') > -1;
  }

  return false;
})();

$(document).ready(function() {
  window.isDesktop = $('body').hasClass('desktop');
  window.isRetina = isRetina();

  function isRetina() {
    var query = '(-webkit-min-device-pixel-ratio: 1.5),' +
                '(min--moz-device-pixel-ratio: 1.5),' +
                '(-o-min-device-pixel-ratio: 3/2),' +
                '(min-device-pixel-ratio: 1.5),' +
                '(min-resolution: 144dpi),' +
                '(min-resolution: 1.5dppx)';

    if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
      return true;
    }
    return false;
  }
});