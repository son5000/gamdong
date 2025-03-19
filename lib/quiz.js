$(document).ready(function(){
  
  var slider = $('.bxslider').bxSlider({
     captions: true,
     mode: 'fade',
     pager: false,
     nextSelector: '.custom-next',
     prevSelector: '.custom-prev',
     controls: true, 
     nextText: '다음 문제',
     prevText: '이전 문제'
   });

  var slideIndex = 1;  
  var totalSlidesIndex = slider.getSlideCount();
  var scoreValue = 0;
  
    $('.submit').click(function(){
  
      $('.custom-next').removeClass('active');

        currentSlide = $('.slideItem:visible').first(); 

        console.log(slideIndex , totalSlidesIndex)
  
        if (currentSlide.find('.list').hasClass('active') === false) {
            alert('보기중에 답을 선택해주세요!')
            $('.custom-next').addClass('active');
            return; 
        }

        if(slideIndex === totalSlidesIndex){
          $('.controlBox .end').addClass('active');
          $('.custom-prev').addClass('active');
          $('.custom-next').addClass('active');
          $('.submit').addClass('active');
        }else{
          $('.custom-next').removeClass('active');
        }
  
        if(currentSlide.find('.O').hasClass('active')) {
            currentSlide.find('.correct').addClass('active');
            scoreValue++;
        } else {
            currentSlide.find('.wrong').addClass('active');
        } 
    })

  $('.custom-next').click(function(){

    slideIndex++;

    $('.custom-next').addClass('active');scrollBy
    
    if(slideIndex == totalSlidesIndex){
      $('.custom-next').addClass('active');
    }

    $('.custom-prev').removeClass('active');
  })


  $('.custom-prev').click(function(){

    slideIndex--;
    
    if(slideIndex == 1){
      $('.custom-prev').addClass('active');
    }else {
      $('.custom-prev').removeClass('active');
      $('.custom-next').removeClass('active');
    }
  })


  $('.start').click(function(){
      $('.cover').addClass('active');
      $('.custom-prev').addClass('active');
      $('.custom-next').addClass('active');
  })

  $('.list').click(function(){
      $('.list').removeClass('active');
      $(this).addClass('active');
  })


  $('.controlBox .end').click(function(){

    $('.finishTitle').text('당신의 점수는!!!!!🤣')

    if(scoreValue == 10){
      $('.finishText').text('🎉대단해요!!! 당신은 감동력 MASTER 입니다!🎉')
    }else if(scoreValue >= 5){
      $('.finishText').text('조금 더 노력해서 만점에 도전합시다!☜(ﾟヮﾟ☜)')
    }else {
      $('.finishText').text('반성하세요.')
    }

    $('.score').text(`${scoreValue * 10} / 100 점 입니다!`)
    
    $('.finish').addClass('active');
  })
});