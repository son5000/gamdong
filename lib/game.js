$(document).ready(function(){

    var baseSrc = '/public/images/game/';

    var images = [
        baseSrc + 'game1.png', baseSrc + 'game1.png',
        baseSrc + 'game2.png', baseSrc + 'game2.png',
        baseSrc + 'game3.png', baseSrc + 'game3.png',
        baseSrc + 'game4.png', baseSrc + 'game4.png',
        baseSrc + 'game5.png', baseSrc + 'game5.png',
        baseSrc + 'game6.png', baseSrc + 'game6.png',
        baseSrc + 'game7.png', baseSrc + 'game7.png',
        baseSrc + 'game8.png', baseSrc + 'game8.png',
        baseSrc + 'game9.png', baseSrc + 'game9.png',
        baseSrc + 'game10.png', baseSrc + 'game10.png',
    ];
    
    var board = $('.board');
    var flipped = [];  // 뒤집힌 카드들
    var flippedElements = [];  // 뒤집힌 카드들의 요소

    // 이미지를 랜덤하게 섞기
    images = shuffleArray(images);

    // 게임 시작 전에 이미지를 3초간 보여줌
    for (var i = 0; i < 20; i++) {
        var item = $('<div>').addClass('item');
        var card = $('<div>').addClass('card');  // 카드 요소
        var front = $('<div>').addClass('front');
        var back = $('<div>').addClass('back');

        // 앞면에 이미지 추가
        var image = $('<img>').attr('src', images[i]);
        front.append(image);

        card.append(front).append(back);
        item.append(card);
        board.append(item);
    }

    var startTime, endTime = null;

    $('.start').click(function(){
        $('.main').addClass('active')
        $('.cover').addClass('active')
        // 3초 후에 모든 이미지를 숨기기 시작
        setTimeout(function () {
            $('.card').addClass('flipped');  // 3초 후에 모든 이미지를 숨김
            startTime = new Date();
        }, 5500);  // 3초 후
        setTimeout(function(){
            if(endTime == null){
                $('.lost').addClass('active');
            }
        },65500)
    })

    var currentScore = 0;

    // 클릭 이벤트 설정
    $('.item').click(function () {
        var $this = $(this);
        var $card = $this.find('.card');

        // 이미 뒤집힌 카드는 처리하지 않도록
        if ($card.hasClass('active')) {
            return;  // 이미 뒤집힌 카드는 클릭하지 않도록
        }

        // 카드 뒤집기
        $card.addClass('active');

        // 두 장을 클릭했으면 비교
        flipped.push($card.find('.front img').attr('src'));  // 클릭된 이미지의 src를 기록
        flippedElements.push($card);  // 클릭된 카드 요소를 기록

        // 두 장을 클릭했으면 비교
        if (flipped.length === 2) {
            if (flipped[0] === flipped[1]) {
                // 맞은 경우: 클릭된 두 이미지를 유지
                currentScore++;
                flipped = [];
                flippedElements[0].css({'background-color' : '#b8f4f7'})
                flippedElements[1].css({'background-color' : '#b8f4f7'})
                
                flippedElements = [];
                console.log(currentScore)
                
                if(currentScore == 10){
                    endTime = new Date();
                    var timeDifference = (endTime - startTime) / 1000;
                    $('.score').text(`${timeDifference}초`);
                    $('.win').addClass('active');
                }
            } else {
                // 틀린 경우: 1초 뒤에 이미지를 다시 뒤집기
                setTimeout(function () {
                    flippedElements[0].removeClass('active');  // 첫 번째 카드 뒤집기
                    flippedElements[1].removeClass('active');  // 두 번째 카드 뒤집기
                    flipped = [];
                    flippedElements = [];
                }, 500);
            }
        }
    });

    // 배열을 랜덤하게 섞는 함수
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];  // 배열 항목을 교환
        }
        return array;
    }

});
