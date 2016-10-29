console.log('hi');

window.onkeydown = function(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    console.log('hihi');
    document.querySelector('.spacebar').classList.add('filling');
  }
};

$("button").mousedown(function() {
  $(".partybar").addClass("animate");
  $("#theparty").removeClass("party");
  $(".enabled").removeClass("visible");
  audio.pause();
  if (this.innerHTML == 'HOLD TO PARTY') {
    this.innerHTML = 'LOADING PARTY...';
  } else {
    this.innerHTML = 'HOLD TO PARTY';
  }
  $timeout = setTimeout(function() {
    $("#theparty").addClass("party");
    audio.play();
    $(".enabled").addClass("visible");
  }, 2000);
}).bind("mouseup mouseleave", function() {
  clearTimeout($timeout);
  this.innerHTML = 'HOLD TO PARTY';
  $(".partybar").removeClass("animate");
});




/*
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

window.onload = function () {
    var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
    console.log('Page load time is '+ loadTime);
}
*/
