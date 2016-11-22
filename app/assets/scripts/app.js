window.onload = function() {
    if (window.location.href.indexOf("index.html") > -1) {
      console.log('index loaded');
      introStory();
    };
    if (window.location.href.indexOf("map.html") > -1) {
      console.log('map loaded');
      menu();
      regionNav();
      hideContinent();
      smallMap();
    }
    backgroundMusic();
};

function smallMap() {
  $('.SmallMap-carousel').slick({
    infinite: true,
    slidesToShow: 1,
    vertical: true,
    verticalSwiping: true,
    adaptiveHeight: true,
    arrows: true,
    nextArrow: '<span class="icon-arrow SmallMap-arrow SmallMap-arrow--next"></span>',
    prevArrow: '<span class="icon-arrow SmallMap-arrow SmallMap-arrow--prev"></span>'
  })
}

function backgroundMusic() {
  var audio = document.querySelector('.Audio-music');
  audio.volume = 0.5;
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

map();
var mapId;
function map(){
  $('.Map #world_map g, .Map #countries g, .SmallMap #world_map g, .SmallMap #countries g').click(function(){
    mapId = $(this).attr('id').split('-');
    console.log(mapId[0]+','+mapId[1]);
    if (mapId[0] !== "groenland_no_data") {
      initRegion();
    }
  });
  $('.Map #world_map g').hover(
    function(){
      $id = $(this).attr('id').split('-');
      $('.Map-location').html('[ '+$id[0]+' ]');
    }, function(){
      $('.Map-location').html('[ ]');
    });
    $('.Map #countries g').hover(
      function(e) {
        $id = $(this).attr('id').split('-');
        $('.Map-location').html('[ '+$id[1]+' ]');
        /*$('.Map-popup').css('left',e.pageX);
        $('.Map-popup').css('top',e.pageY);
        setTimeout(function(){
          $('.Map-popup').addClass('Map-popup--open');
        },200)*/
      }, function(){
        $('.Map-location').html('[ ]');
        //$('.Map-popup').removeClass('Map-popup--open');
      }
    )
};

// initialize region page with data
function initRegion() {
  $('.Region').addClass('Region--open');
  $('.Map').hide();

  console.log(mapId[1]);

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
      continentId.classList.add('Region-container-continent');
    continentId.innerHTML = data.continent[0].name_continent;
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

      // SECTIONS
      var country = document.createElement('section');
      //country.setAttribute('id', 'section'+i+' '+data.continent[i].id);
      country.setAttribute('id', data.continent[i].id);
      country.classList.add('Region-container-section');
      container.appendChild(country);

      // ID SECTIONS
      var countryId = document.createElement('h2');
      countryId.classList.add('Region-container-country');
      countryId.innerHTML = data.continent[i].name_country;
      country.appendChild(countryId);

      // SUBTITLE SECTIONS
      var countrySubtitle = document.createElement('h4');
      countrySubtitle.classList.add('Region-container-subtitle');
      countrySubtitle.innerHTML = data.continent[i].subtitle;
      country.appendChild(countrySubtitle);

      // TEXT CONTENT SECTIONS
      var countryText = document.createElement('p');
      countryText.classList.add('Region-container-text');
      countryText.innerHTML = data.continent[i].content;
      country.appendChild(countryText);

      // KEY DATA SECTIONS
      var countryData = document.createElement('div');
      countryData.classList.add('Region-container-keyData');
      country.appendChild(countryData);

      var countryData1 = document.createElement('div'),
          countryData2 = document.createElement('div');
      countryData1.classList.add('Region-container-keyData-firstData');
      countryData2.classList.add('Region-container-keyData-secondData');
      countryData.appendChild(countryData1);
      countryData.appendChild(countryData2);

      var dataNumber1 = document.createElement('span'),
          dataText1 = document.createElement('p'),
          dataNumber2 = document.createElement('span'),
          dataText2 = document.createElement('p');
      dataNumber1.classList.add('Region-container-keyData-firstData-number');
      dataNumber1.innerHTML = data.continent[i].keydata[0].number;
      dataText1.classList.add('Region-container-keyData-firstData-details');
      dataText1.innerHTML = data.continent[i].keydata[0].text;
      countryData1.appendChild(dataNumber1);
      countryData1.appendChild(dataText1);

      dataNumber2.classList.add('Region-container-keyData-secondData-number');
      dataNumber2.innerHTML = data.continent[i].keydata[1].number;
      dataText1.classList.add('Region-container-keyData-secondData-details');
      dataText2.innerHTML = data.continent[i].keydata[1].text;
      countryData2.appendChild(dataNumber2);
      countryData2.appendChild(dataText2);

    }
  });
  setTimeout(function(){
    goTo();
  }, 100)
};

function goTo() {
  console.log($(".Region #"+mapId[1]));

  $('html, body').animate({
     scrollTop: $(".Region #"+mapId[1]).offset().top
   }, 600);
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
    } else {
        $("section:last-child").css("margin-bottom","100px");
    }
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
