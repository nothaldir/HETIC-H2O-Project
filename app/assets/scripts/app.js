window.onload = function() {
    console.log('window loaded');
    backgroundMusic();
    introStory();
    menu();
    regionNav();
    hideContinent();
};

function backgroundMusic() {
  var audio = document.querySelector('.Audio-music');
  audio.volume = 0.2;
  audio.play();
  document.querySelector('.Audio-controls').addEventListener('click', function() {
    this.classList.toggle('Audio-controls--paused');
    if (audio.paused == true) audio.play();
    else if (audio.paused == false) audio.pause();
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
      backDelay: 1000, // time before backspacing-
      showCursor: false,
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
    $('.Home-begin .icon-fingerprint').click(function(){
      window.location.href = 'map.html';
    })
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
        console.log('spaceBar filled');
        $('.Home-spacebar').addClass('Home-spacebar--filled');
        window.location.href = 'map.html';
      }
    }
  });
};

map();
var mapId;
function map(){
  $('.Map #world_map g, .Map #countries g').click(function(){
    mapId = $(this).attr('id').split('-');
    console.log(mapId[0]+','+mapId[1]);
      initRegion();
    getJSON("/datas/"+mapId[0]+".json", function(data) {
      console.log(data.continent[0].id_continent);
      for (var i=1; i <= (data.continent.length - 1); i++) {
        console.log(data.continent[i].id_country);
      }
    });
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

// initialize region page with data
function initRegion() {
        $('.Region').addClass('Region--open');
        $('.Map').hide();
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

// Displays menu and surrounding elements
function menu() {
    $('.Toolbar-backButton').on("click touchstart",function(){
        if($('.Region').hasClass('Region--open')){
            $('.Map').show();
            $('.Region').removeClass('Region--open');
        } else {
        }
    });

    $('.Toolbar-menuIcon').on("click touchstart",function(){
      $('.Toolbar-menu').removeClass('Toolbar-menu--closed');
      $('.Toolbar-buttons').hide();
      $('.Quick-navigation').hide();
    });

    $('.Toolbar-menu-closeButton').on("click touchstart",function(){
      $('.Toolbar-menu').addClass('Toolbar-menu--closed');
      $('.Toolbar-buttons').show();
      $('.Quick-navigation').show();
    });

    if(!$('.Toolbar-menu').hasClass('Toolbar-menu--closed')) {
        $('html,body').on("click",function () {
            $('.Toolbar-menu').addClass('Toolbar-menu--closed');
            $('.Toolbar-buttons').show();
            $('.Quick-navigation').show();
        })
        $('.Toolbar-menu').click(function(event){
            event.stopPropagation();
        });
    }
};

// Highlights the position on navigation bar
function regionNav(){
    $('.Quick-navigation-item').on("click",function(){
        $(this).addClass('Quick-navigation-item-active').siblings().removeClass('Quick-navigation-item-active')
    })
};

// Modifies features' display on smaller devices
function hideContinent() {
    if($(window).width() < 768)
    {
        // stick continent name on top
        $("#section1 .Region-container-continent").addClass('Region-container-continent--fixed');
        // adapt page
        $("#section1 .Region-container-info").css("padding-top","90px");
        $("section:last-child").css("margin-bottom","100px");
    } else {}
};


function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var res = xhr.responseText;
              // Executes your callback with the
              // response already parsed into JSON
                callback(JSON.parse(res));
            } else { // Server responded with some error
                console.error(xhr.statusText);
            } // End of verifying response status
        }
    }; // End of what to do when the response is answered
    // What to do if there's an error with the request
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    }; // End of error handling
    // Send the request to the server
    xhr.send();
    console.log(mapId);
} // End of getJSON function



$(window).on('mousemove', function(e) {
    var w = $(window).width();
    var h = $(window).height();
    var offsetX = 0.5 - e.pageX / w;
    var offsetY = 0.5 - e.pageY / h;

    $(".parallax").each(function(i, el) {
        var offset = parseInt($(el).data('offset'));
        var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0px)";

        $(el).css({
            '-webkit-transform': translate,
            'transform': translate,
            'moz-transform': translate
        });
    });
});