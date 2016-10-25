console.log('hi');

$(window).load(function(temp) {
	console.log(temp);
	// Animate loader off screen
	$(".se-pre-con").fadeOut("slow");
	console.log('loading finished');
});

// Wait for window load
$(window).load(function() {
	// Animate loader off screen
	$("#loader").animate({
		top: -200
	}, 1500);
});




ow.c.Loader = (function() {
  'use strict';

  var _$el = $('.Loader'),
      _$bar = $('.Loader-bar'),
      _$counter = $('.Loader-text');

  var timer = null;

  var handleLoadingProgress = function(p) {

    if (p >= 100) {
      p = 100;
      clearInterval(timer);

      setTimeout(function() {
        $('body').addClass('loader-state2');

        setTimeout(function(){
          _$el.remove();
          $('body').removeClass('loader-state1 loader-state2');

          setTimeout(function(){
            $('body').removeClass('loader-state0');

          }, 1250);
        }, 1100);
      }, 1000);
    }

    _$counter.text(p + "%");
    _$bar.css('width', p + '%');

  };

  var init = function() {

    setTimeout(function() {
      $('body').waitForImages(function() {
        handleLoadingProgress(100);
      }, function(loaded, count, success) {
        var p = Math.round(loaded / count * 100);
        handleLoadingProgress(p);
      });
    }, 1000);

  };

  var isModule = function() {
    return _$el.length > 0 ? true : false;
  };

  return {
    init: init,
    handleLoadingProgress: handleLoadingProgress,
    isModule: isModule
  };

})();
