$(window).load(function(){
  console.log('window loaded');
  backgroundMusic();
  introGuidelines();
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

function introGuidelines() {
  console.log('start introGuidelines');

  $('.Logo-wave--back').bind('webkitAnimationEnd', function(){

    $('.Popup-skip').addClass('fadeIn');
    $('.Popup').addClass('Popup--open');

    $(".Popup-content").typed({
        stringsElement: $('.intro-guidelines'),
        typeSpeed: 10,
        cursorChar: "_",
        callback: function(){
          introCountdown();
        }
    });
  });
}

function introCountdown(){
  $('.Popup-countdown').addClass('fadeIn');
  $('.Popup-content, .typed-cursor').addClass('fadeOut');

  var countdownOptions = {
    useEasing : true,
    useGrouping : false,
    separator : '',
    decimal : '',
    prefix : '',
    suffix : ''
  };
  var countdown = new CountUp("myTargetElement", 2084, 2016, 0, 7, countdownOptions);
  countdown.start();
};

window.onkeydown = function(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    console.log('hihi');
    document.querySelector('.spacebar').classList.add('filling');
  }
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
