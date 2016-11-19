$(window).load(function() {
  console.log('window loaded');
  //backgroundMusic();
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


// Remember XHMLHTTP requests are asynchronous!!
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
    xhr.send(null);
} // End of getJSON function


var apiURL = "http://localhost:3000/datas/asia.json";

getJSON(apiURL, function(asia) {
    console.log(asia);
}); // End of request

// -> You should now see an object that contains info
// about my github account profile.



// var httpRequest = new XMLHttpRequest()
// httpRequest.onreadystatechange = function (asia) {
//   // code
// }
// httpRequest.open('GET', '../datas/asia.json')
// httpRequest.send()

// // Vanilla
// function success(asia) {
//   console.log(asia)
// }
// var asia = document.createElement('script')
// asia.src = '../datas/asia.json'
// document.body.appendChild(asia)



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
