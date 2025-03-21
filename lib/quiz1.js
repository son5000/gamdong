$(document).ready(function(){

    var totalChecked = 0;
    let score = 0;

    $('body').css('overflow','hidden')

    $('.start').click(function(){
        $('.cover').addClass('active');
        $('body').css('overflow','auto');
    })

    $('.resultBtn').click(function(){
        totalChecked++;
        // 클릭된 요소에 부모 선택
        var quizBox = $(this).closest('.quizBox'); 
        var activeItem = quizBox.find('.list.active');  

        if (activeItem.length < 1) {
            return alert('답을 선택해 주세요!');
        }

        if (activeItem.hasClass('O')) {
            quizBox.find('.result.correct').addClass('active'); 
            score++; 
        } else {
            quizBox.find('.result.wrong').addClass('active');    
        }
    });


    $('.A .list').click(function(){
        // 클릭된 요소가 active 클래스를 가지고 있으면 제거하고, 아니면 추가
        $(this).toggleClass('active').siblings().removeClass('active');
    });

    $('.finalBtn').click(function(){
        var uncheckedQuiz  = null;

        $('.quizBox').each(function(){
            var quizBox = $(this);
            var activeResult = quizBox.find('.result.active');

            if(activeResult.length < 1){
                uncheckedQuiz = quizBox;
                return false;
            }
        })

        if(uncheckedQuiz){
            $('html, body').animate({
                scrollTop: uncheckedQuiz.offset().top-20
            },500);
            alert("풀지 않은 문제가 있습니다! 해당 문제로 이동합니다.")
        }else{
            $('.finish').addClass('active');
            $('.score').text(`${score * 10} 점`)
            if(score == 10){
                $('.finishTitle').text('대단해요!!')
                $('.finishText').text('당신은 혹시 감동이의 가족??!!!')
            } else if(score >= 5) {
                $('.finishTitle').text('아까워요!!')
                $('.finishText').text('만점에 도전해봅시다!!')
            } else{
                $('.finishTitle').text('매우 실망스러워요!')
                $('.finishText').text('뭐..그럴수도 있죠...')
            }
        }
    })

    $('.close').click(function(){
        $('.finish').removeClass('active');
    })

    $('.reset').click(function(){
        $('.list').removeClass('active');
        $('.result').removeClass('active');
        totalChecked = 0;
        score = 0;
        $('html, body').animate({
            scrollTop: 0,
        },500);
    })
});