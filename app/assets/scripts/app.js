$(window).load(function(){
  console.log('window loaded');
  backgroundMusic();
  homeGuidelines();
});

function backgroundMusic() {
  $audio = $('.Audio-music')[0];
  $audio.volume = 0.2;
  $audio.play();
  $('.Audio-controls').click(function(){
    $(this).toggleClass('Audio-controls--paused');
    if ($audio.paused==true) $audio.play();
    else if ($audio.paused==false) $audio.pause();
  })
}

function homeGuidelines() {
  console.log('homeGuidelines');

  $('.Logo-wave--back').bind('webkitAnimationEnd', function(){
    $('.Popup').addClass('Popup--open');
    setTimeout(function(){
      $(".Popup-content").typed({
        strings: [
          "init h2o_project.sh", 
          "In 2010, NASA developed and launched satellites based artificially intelligent named H2O Project that would analyse Earth. ^1000", 
          "The studies reported terrible predictions for Mankind. ^1000",
          "NASA warned the world’s leaders. ^1000",
          "^750 But Men did nothing to prevent these ravishing prospects ^500 and the most vital resource to life disappeared: clean drinking water. ^1000",
          "Indeed, humans can survive 30 days without eating but only 3 days without drinking. ^1000",
          "Yet, on Earth, every human being did not have access to clean drinking water. ^1000",
          "In 2084, mankind among many species vanished off the face of the Earth."],
        typeSpeed: 10
      });
    }, 500);
  });
}

window.onkeydown = function(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    console.log('hihi');
    document.querySelector('.spacebar').classList.add('filling');
  }
};

/*$.getJSON( "../datas/home_guidelines.json", function( json ) {
  console.log( "JSON Data: " + json[0] );
 });


$.getJSON( "../datas/home_guidelines.json", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});

$.getJSON( "test.js")
  .done(function( json ) {
    console.log( "JSON Data: " + json.users[ 3 ].name );
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
});
*/


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

*/
