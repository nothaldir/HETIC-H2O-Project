$(window).load(function() {
<<<<<<< HEAD
    console.log('window loaded');
    // backgroundMusic();
    introStory();
    checkMenu();
    scrollRegionSection();
=======
  console.log('window loaded');
  //backgroundMusic();
  introStory();
>>>>>>> 5dc92af2d11b1163f13ca7b4e7c4bd3a8daac002
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
};

function introStory() {
  $('.Logo-wave--back').bind('webkitAnimationEnd', function() {

    console.log('start introStory');
    $('.Home-popup-skip').addClass('fadeIn');
    $('.Home-popup').addClass('Home-popup--open');

    $(".Home-popup-content").typed({
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

    $('.Home-popup-skip').click(function(e) {
      e.preventDefault();
      // TO-DO : break countdown
      introCountdown();
    });

  });
};

function introCountdown() {
  var run_once = false;
  if (run_once == false) {
    $('.Home-popup-countdown').addClass('fadeIn');
    $('.Home-popup-content, .typed-cursor').addClass('fadeOut');

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
  $('.Home-popup-skip').addClass('fadeOut');
  $('.Home-popup').removeClass('Home-popup--open');
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

map();
function map(){
  $('.Map #world_map g, .Map #countries g').click(function(){
    $id = $(this).attr('id');
  });
  $('.Map #world_map g').hover(
    function(){
      $id = $(this).attr('id');
      $('.Map-location').html('[ '+$id+' ]');
    }, function(){
      $('.Map-location').html('[ ]');
    });
    $('.Map #countries g').hover(
      function(e) {
        $('.Map-popup').css('left',e.pageX);
        $('.Map-popup').css('top',e.pageY);
        setTimeout(function(){
          $('.Map-popup').addClass('Map-popup--open');
        },200)
      }, function(){
        $('.Map-popup').removeClass('Map-popup--open');
      }
    )
};

/*move();
function move(){
  $("#world_map").mousemove(function ( e ) {
      var pos   = $(this).offset();
      var elPos = { X:pos.left , Y:pos.top };
      var mPos  = { X:e.clientX-elPos.X, Y:e.clientY-elPos.Y };
      var mapX = $(this).get(0).getBBox().width;
      var mapY = $(this).get(0).getBBox().height;
      console.log(mapX + ' ' + mapY),

      console.log("Mouse position x:"+ mPos.X +" y:"+ mPos.Y);
  });
}*/

function checkMenu() {
  $('.Toolbar-menuIcon').on("click touchstart",function(){
      $('.Toolbar-menu').removeClass('Toolbar-menu--closed');
      $('.Toolbar-buttons').hide();
      $('.Quick-navigation').hide();
  })

    $('.Toolbar-menu-closeButton').on("click touchstart",function(){
        $('.Toolbar-menu').addClass('Toolbar-menu--closed');
        $('.Toolbar-buttons').show();
        $('.Quick-navigation').show();
    })

    if(!$('.Toolbar-menu').hasClass('Toolbar-menu--closed')) {
        $('html,body').on("click",function () {
            console.log('YOURE IN');
            $('.Toolbar-menu').addClass('Toolbar-menu--closed');
            $('.Toolbar-buttons').show();
            $('.Quick-navigation').show();
        })
        $('.Toolbar-menu').click(function(event){
            event.stopPropagation();
        });
    }
};


function scrollRegionSection() {
    var hashTagActive = "";
    $(".scroll").on("click touchstart", function (event) {
        if(hashTagActive != this.hash) {
            event.preventDefault();
            $('.Quick-navigation-bubble').css("opacity","1");

            var dest = 0;
            if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
                dest = $(document).height() - $(window).height();
            } else {
                dest = $(this.hash).offset().top;
            }

            $('html,body').animate({
                scrollTop: dest
            }, 2000, 'swing');
            hashTagActive = this.hash;
        }
    });
};





var httpRequest = new XMLHttpRequest()
httpRequest.onreadystatechange = function (asia) {
  // code
}
httpRequest.open('GET', '../datas/asia.json')
httpRequest.send()

// Vanilla
function success(data) {
  // code
}
var asia = document.createElement('script')
asia.src = '../datas/asia.json'
document.body.appendChild(asia)
console.log(asia)



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
