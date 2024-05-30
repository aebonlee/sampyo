// header - menu, section - main slide
$(function(){
  //var
  var $language = $('header>nav>.lnb>li>a.language');

  var $mainMnu = $('header>nav>.gnb>li');
  var $subMnu = $('.sub');

  var $container = $('section>.slide-container>.slide');
  var $indicator = $('section>.slide-container>.slide-pagination>li>a');
  var $play = $('section>.slide-container>.play');
  var $prev = $('section>.slide-container>.prev');
  var $next = $('section>.slide-container>.next');
  var intervalKey = null;

  var nowIdx = 0;
  
  //function
  function slideMove(){
    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    $container.stop().animate({left:-(nowIdx*940)});
  }

  function nextIdx(){
    if(nowIdx<2){
      nowIdx++;
    }else{
      nowIdx = 0;
    }
  }

  function autoPlay(){
    intervalKey = setInterval(function(){
      nextIdx();
      slideMove();
    },2000);
  }

  function autoStop(){
    clearInterval(intervalKey);
  }

  //header menu
  $language.on('click',function(event){
    event.preventDefault();
    alert('현재 지원하지 않는 기능입니다.');
  });

  $mainMnu.on('mouseenter',function(){
    nowIdx = $mainMnu.index(this);

    $mainMnu.eq(nowIdx).find('.sub').show();
  });

  $mainMnu.on('mouseleave',function(){
    $subMnu.hide();
  });

  $('header>nav>.gnb>li>a').focus(function(){
    $('.sub').stop().slideUp();
    $(this).parent().find('.sub').stop().slideDown();
  });

  $('.last>a').blur(function(){
    $('.sub').stop().slideUp();
  });//end of header menu

  //slide
  $indicator.on('click',function(event){
    event.preventDefault();
    nowIdx = $indicator.index(this);

    autoStop();
    slideMove();
    $play.removeClass('on');
  });//end of slide indicator

  $('.slide-container').on('mouseover',function(){
    $prev.stop().animate({left:0}).show();
    $next.stop().animate({right:0}).show();
  });

  $('.slide-container').on('mouseout',function(){
    $prev.stop().animate({left:-42}).hide();
    $next.stop().animate({right:-42}).hide();
  });
  
  $prev.on('click',function(){
    autoStop();

    if(nowIdx>0){
      nowIdx--;
    }else{
      nowIdx = 2;
    }

    slideMove();
    $play.removeClass('on');
  });

  $next.on('click',function(){
    autoStop();

    nextIdx();
    slideMove();
    $play.removeClass('on');
  });//end of slide next/prev

  $play.on('click',function(){ //on == pause
    if($play.hasClass('on')==true){
      autoStop();
      $play.removeClass('on');
    }else{
      autoPlay();
      $play.addClass('on');
    }
  });//end of slide play;

  autoPlay();
});

//section - people slide
$(function(){
  var $container = $('section>.content2>.story-container>.storys>li');
  var $indicator = $('section>.content2>.story-container>.storys>li>h2>a');
  var $play = $('section>.content2>.story-container>.play');
  var $pause = $('section>.content2>.story-container>.pause');
  var nowIdx = 0;
  var intervalkey = null;

  //function
  function slideMove(){
    $container.filter('.on').stop().fadeOut().removeClass('on');
    $container.eq(nowIdx).stop().fadeIn().addClass('on');
  }

  function nextIdx(){
    if(nowIdx<1){
      nowIdx++;
    }else{
      nowIdx = 0;
    }
  }

  function autoPlay(){
    intervalkey = setInterval(function(){
      nextIdx();

      slideMove();
    },2000);
  }

  function autoStop(){
    clearInterval(intervalkey);
  }

  //event
  $indicator.on('click',function(event){
    event.preventDefault();
    autoStop();

    if($indicator.parent().hasClass('on') == false){
      nextIdx();
      slideMove();
    }
  });//end of indicator 

  $play.on('click',function(){
    autoStop();
    autoPlay();
  });//end of play

  $pause.on('click',function(){
    autoStop();
  });//end of pause

  autoPlay();
});

//footer - famOpen, top button
$(function(){
  var $famOpen = $('.famOpen');
  var $top = $('.top');

  $famOpen.on('click',function(event){
    event.preventDefault();
    $(this).parent().find('ul').fadeToggle();
  });//end of famOpen

  $top.on('click',function(event){
    event.preventDefault();
    $('html, body').stop().animate({scrollTop:0},1000);
  });
  //end of top
});