$(window).load(function() {
  console.log('window loaded');
  backgroundMusic();
  introStory();
});

function backgroundMusic() {
  $audio = $('.Audio-music')[0];
  $audio.volume = 0.2;
  $audio.play();
  $('.Audio-controls').click(function() {
    $(this).toggleClass('Audio-controls--paused');
    if ($audio.paused == true) $audio.play();
    else if ($audio.paused == false) $audio.pause();
  })
}

function introStory() {
  $('.Logo-wave--back').bind('webkitAnimationEnd', function() {

    console.log('start introStory');
    $('.Popup-skip').addClass('fadeIn');
    $('.Popup').addClass('Popup--open');

    $(".Popup-content").typed({
      stringsElement: $('.intro-story'),
      typeSpeed: 0, // typing speed
      startDelay: 0, // time before typing starts
      backSpeed: 0, // backspacing speed
      backDelay: 1000, // time before backspacing
      cursorChar: "|",
      callback: function() {
        introCountdown();
      }
    });

    $('.Popup-skip').click(function(e) {
      e.preventDefault();
      // TO-DO : break countdown
      introCountdown();
    });

  });
};

function introCountdown() {
  var run_once = false;
  if (run_once == false) {
    $('.Popup-countdown').addClass('fadeIn');
    $('.Popup-content, .typed-cursor').addClass('fadeOut');

    var countdownOptions = {  
      useEasing: true,
        useGrouping: false,
        separator: '',
        decimal: '',
        prefix: '',
        suffix: ''
    };
    var countdown = new CountUp("countdown", 2084, 2016, 0, 7, countdownOptions);
    setTimeout(function() {
      countdown.start(function() {
        console.log('countdown complete');
        introBegin();
      });
    }, 1000)
    run_once = true;
  }
};

function introBegin() {
  $('.Popup-skip').addClass('fadeOut');
  $('.Popup').removeClass('Popup--open');
  setTimeout(function(){
    $('.Home-begin').addClass('fadeIn')
    spaceBar();
  },800);
};

function spaceBar() {
  var space = 0;
  $(document).keyup(function(evt) {
    if (evt.keyCode == 32) {
      space = space - space;
      console.log(space);
      $('.Home-spacebar').removeClass('Home-spacebar--filling');
    }
  }).keydown(function(evt) {
    if (evt.keyCode == 32) {
      space++;
      console.log(space);
      $('.Home-spacebar').addClass('Home-spacebar--filling');
      if (space >= 25) {
        console.log('boom');
        $('.Home-spacebar').addClass('Home-spacebar--filled');
      }
    }
  });
};









/*$.getJSON( "../datas/intro_guidelines.json", function( json ) {
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
