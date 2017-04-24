$(document).ready(function() {
  /* Make global navbar stick to top while scrolling */
  var $header = $('#main-header');
  var $dummy = $('#dummy-header');

  if (TunnelBear && TunnelBear.isLoggedIn) {
    $('#main-header').addClass('logged-in');
  }

  $(window).on('scroll', function(e) {
    if ($(this).scrollTop() > $header.outerHeight() && !$header.hasClass('fixed')) {
      // fills the void left by the static header
      $dummy.height($header.outerHeight());
      $header.hide(); $header.fadeIn(200); // hide the header so we can fade it in
      $header.addClass('fixed');
      $dummy.show();
    } else if ($(this).scrollTop() <= $dummy.outerHeight() && $header.hasClass('fixed')) {
      $header.removeClass('fixed');
      $dummy.hide();
    }
  });

  $('#menu-toggle').on('click', function() {
    $('#main-header .static .menu').slideToggle();
  });

  $('.logout').on('click', function() {
    var csrfToken = $.cookie('XSRF-TOKEN');
    $.ajax({
      url: TunnelBear.apiBaseUrl + 'core/api/logout',
      type: 'post',
      headers: {
        'TB-CSRF-Token': csrfToken
      },
      success: function(data) {
        if (data.result === 'PASS') {
          $.cookie('tb_user', true, { expires: 7 });
          window.location.reload();
        }
      },
      error: function() {
        window.location.reload();
      }
    });

    return false;
  });
});

function net() {
  var bod = document.body.innerHTML;
  document.body.innerHTML = "<img id='net' src='https://s3.amazonaws.com/tunnelbear/images/pi3.gif'>";
  setTimeout(function() {
    document.body.innerHTML = bod;
  }, 7000);
}

function pi(e) {
  var evtobj = window.event ? event : e;

  if (evtobj.ctrlKey && evtobj.shiftKey) {
    net();
  }
}

document.addEventListener('contextmenu', function(e){
  var targ;
  var evtobj = window.event ? event : e;

  if (e.target) {
    targ = e.target;
  } else if (e.srcElement) {
    targ = e.srcElement;
  }

  if (targ.nodeType === 3) { // defeat Safari bug
    targ = targ.parentNode;
  }

  if (evtobj.ctrlKey && evtobj.shiftKey && targ.id === 'pi') {
    e.preventDefault();
    net();
    return false;
  }
  return true;
});
