$(document).ready(function() {
  var isDesktop = $('body').hasClass('desktop');
  $('.learn-more').on('click', function() {
    var $this = $(this);

    if ($this.hasClass('default')) {
      $this.removeClass('default');
      $this.addClass('open');
    } else if ($this.hasClass('open')) {
      $this.removeClass('open');
      $this.addClass('closed');
    } else {
      $this.removeClass('closed');
      $this.addClass('open');
    }

    $this.parents('.container').find('.detail').slideToggle(function() {
      $(this).find('.feature').each(function(index) {
        var $feature = $(this);
        setTimeout(function() {
          $feature.toggleClass('popin');
        }, 100 * index);
      });
    });
  });

  $('#show-more a').on('click', function() {
    $('body').animate({
      scrollTop: $('#top-ribbon').innerHeight()
    }, 500);
  });
});
