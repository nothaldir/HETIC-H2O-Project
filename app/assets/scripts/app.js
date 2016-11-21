$(window).load(function() {
    console.log('window loaded');
    // backgroundMusic();
    introStory();
    menu();
    regionNav();
    hideContinent();
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
var mapId;
function map(){
  $('.Map #world_map g, .Map #countries g').click(function(){
    mapId = $(this).attr('id').split('-');
    console.log(mapId[0]+','+mapId[1]);
      initRegion();
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

  getJSON("datas/"+mapId[0]+".json", function(data) {

    // grab container
    var container = document.querySelector('.Region-container');
    // remove all
    container.innerHTML = "";

    // creation of section for continent
    continent = document.createElement('section');
    continent.setAttribute('id', 'section');
    continent.classList.add('Region-container-section');
    container.appendChild(continent);

    // ID
    var continentId = document.createElement('h2');
    continentId.innerHTML = data.continent[0].id_continent;
    continent.appendChild(continentId);

    //INFO
    var continentInfo = document.createElement('div');
    continentInfo.classList.add('Region-container-info');
    continent.appendChild(continentInfo);

    //TITLE
    var continentTitle = document.createElement('h3');
    continentTitle.classList.add('Region-container-title');
    continentTitle.innerHTML = data.continent[0].title;
    continentInfo.appendChild(continentTitle);

    //SUBTITLE
    var continentSubtitle = document.createElement('h4');
    continentSubtitle.classList.add('Region-container-subtitle');
    continentSubtitle.innerHTML = data.continent[0].subtitle;
    continentInfo.appendChild(continentSubtitle);

    //TEXT CONTENT
    var continentText = document.createElement('p');
    continentText.classList.add('Region-container-text');
    continentText.innerHTML = data.continent[0].content;
    continentInfo.appendChild(continentText);

    //BUTTON
    var continentButton = document.createElement('button');
    continentButton.classList.add('Region-container-watchButton');
    continentButton.innerHTML = "Watch";
    continentInfo.appendChild(continentButton);

    // QUICK NAVIGATION
      var region = document.querySelector('.Region');
      var quickNav = document.createElement('nav');
      quickNav.classList.add('Quick-navigation');
      region.insertBefore(quickNav, container);
      var scrollIndicator = document.createElement('div');
      scrollIndicator.classList.add('Scroll-progress-indicator');
      quickNav.appendChild(scrollIndicator);


    for (var i=1; i <= (data.continent.length - 1); i++) {

      // QUICK NAVIGATION ELEMENTS
      var anchor = document.createElement('a');
      anchor.setAttribute('href', '#section'+i);
      anchor.classList.add('Quick-navigation-item');
      quickNav.appendChild(anchor);

      //SECTIONS
      var country = document.createElement('section');
      country.setAttribute('id', 'section'+i);
      country.classList.add('Region-container-section');
      container.appendChild(country);

      //ID SECTIONS
      var countryId = document.createElement('h2');
      countryId.classList.add('Region-container-country');
      countryId.innerHTML = data.continent[i].id_country;
      country.appendChild(countryId);

      //SUBTITLE SECTIONS
      var countrySubtitle = document.createElement('h4');
      countrySubtitle.classList.add('Region-container-subtitle');
      countrySubtitle.innerHTML = data.continent[i].subtitle;
      country.appendChild(countrySubtitle);

      // TEXT CONTENT SECTIONS
      var countryText = document.createElement('p');
      countryText.classList.add('Region-container-text');
      countryText.innerHTML = data.continent[i].content;
      country.appendChild(countryText);


      // document.getElementByClassName('Region-container').insertBefore(nav);
      // var nav = document.createElement("nav").classList.add('Quick-navigation');
    }
  });
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
        $("#section .Region-container-continent").addClass('Region-container-continent--fixed');
        // adapt page
        $("#section .Region-container-info").css("padding-top","90px");
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


/* 


boucle for

document.createElement("section").classList.add('Region-container-section');
p.appendChild(document.)
document.getElementById("container").appendChild(p);

var continent = document.getElementsByClassName(Region-container-continent);
continent.innerHTML = data.continent[0].id_continent;

document.getElementByClassName('Region-container').insertBefore(nav);
var nav = document.createElement("nav").classList.add('Quick-navigation');

<!-- <section id="section2" class="Region-container-section">
            <h2 class="Region-container-continent">Europe</h2>
            <div class="Region-container-info">
                <h2 class="Region-container-country">France</h2>
                <h3 class="Region-container-title">A great potential</h3>
                <h4 class="Region-container-subtitle">Europe is running out of fresh water and overexploit water supplies</h4>
                <p class="Region-container-text">Europeans are extracting too much from rivers, lakes and underground water sources, which can take millennia to be replenished, according to an EEA report published at the World Water Forum in Istanbul. This has so far disguised the continent’s water shortage, but it is only a stop-gap as supplies will run out.</p>
                <button class="Region-container-watchButton"><a></a>Watch</button>
            </div>
        </section>

        <section id="section3" class="Region-container-section">
            <h2 class="Region-container-continent">Europe</h2>
            <div class="Region-container-info">
                <h2 class="Region-container-country">UK</h2>
                <h3 class="Region-container-title">A drinking water mess</h3>
                <h4 class="Region-container-subtitle">Europe is running out of fresh water and overexploit water supplies</h4>
                <p class="Region-container-text">Europeans are extracting too much from rivers, lakes and underground water sources, which can take millennia to be replenished, according to an EEA report published at the World Water Forum in Istanbul. This has so far disguised the continent’s water shortage, but it is only a stop-gap as supplies will run out.</p>
                <button class="Region-container-watchButton"><a></a>Watch</button>
            </div>
        </section> -->
*/
