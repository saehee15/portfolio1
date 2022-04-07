$(function () {
    // header

    //서브메뉴 다운
    $('.main_menu > li').hover(function () {

        h = $(this).find('.sub_menu').outerHeight();
        $('.header_bg').addClass('on').css({
            height: h
        });
        $(this).find('.sub_menu').show();

        var positionLeft = $(this).position().left;
        var w = $(this).outerWidth();

        $('.curr_bar').addClass('on').css({
            left: positionLeft,
            width: w
        })

    }, function () {
        $('.sub_menu').hide()
        $('.header_bg').addClass('on').css({
            height: 0
        });
        $('.curr_bar').removeClass('on')
    })

    // lang 후버
    $('.lang_container').hover(function () {
        $('.lang_menu_wrap').removeClass('hide');
    }, function () {
        $('.lang_menu_wrap').addClass('hide');
    })



    // main
    // cursor
    $('body').mousemove(function (e) {

        xVal = e.pageX;
        yVal = e.pageY;

        gsap.to('.cursor', {
            x: e.pageX - $('.cursor').width() / 2,
            y: e.pageY - $('.cursor').height() / 2,
        })
        // gsap.to('.cursor_txt',0.7,{
        //     x:xVal - $('.cursor_txt').width()/2,
        //     y:yVal - $('.cursor_txt').height()/2
        // })
    })

    $('.content').mouseover(function () {
        gsap.to('.cursor', 0.2, {
            scale: 1,
        })
        gsap.to('.cursor_txt', 0.2, {
            opacity: 1,
        })
    })
    $('.content').mouseleave(function () {
        gsap.to('.cursor', 0.2, {
            scale: 0,
        })
        gsap.to('.cursor_txt', 0.2, {
            opacity: 0,
        })
    })



    // page down
    $('.scroll_down').click(function (e) {
        e.preventDefault();
        target = $('.sc_projects').offset().top

        gsap.to('body, html', {
            'scrollTop': target
        })

    });



    // slide
    var firstSlide = new Swiper(".firstSlide", {

        // effect:'fade',
        loop: true,
    });

    var gauge = gsap.to('.gauge_curr', 5, {
        width: '100%',
        onComplete: function () {
            firstSlide.slideNext();
            gsap.set('.gauge_curr', {
                width: 0
            })
        }
    })

    //txt
    var txtMotion = gsap.fromTo('.swiper-slide .title span', {
        yPercent: 100,
    }, {
        yPercent: 0,
        stagger: 0.2
    })

    firstSlide.on('slideChange', function () {
        gauge.restart()
        txtMotion.restart()
    })

    $('.btn_state').click(function () {
        if ($('.pause').hasClass('on')) {
            gauge.pause();
            $('.pause').removeClass('on');
            $('.play').addClass('on')
        } else {
            gauge.resume();
            $('.pause').addClass('on');
            $('.play').removeClass('on')
        }
    })

    function changeFraction(swiperName, area) {
        firstSlide.on('slideChange', function () {
            fraction(swiperName, area);
        })
    }

    function fraction(swiperName, area) {
        var curr = swiperName.realIndex + 1;
        var total = swiperName.slides.length - 2;
        $(area).find('.curr').text(curr);
        $(area).find('.total').text(total);
    }

    fraction(firstSlide, '.sc_visual');
    changeFraction(firstSlide, '.sc_visual')



    var secondSlide = new Swiper(".secondSlide", {

        loop: true,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            formatFractionCurrent: function (number) {
                return ('0' + number).slice(-2);
            },
            formatFractionTotal: function (number) {
                return ('0' + number).slice(-2);
            },
            renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span>' +
                    ' / ' +
                    '<span class="' + totalClass + '"></span>';
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    var thirdSlide = new Swiper(".thirdSlide", {

        loop: true,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        pagination: {
            el: ".pagination",
            type: "fraction",
            formatFractionCurrent: function (number) {
                return ('0' + number).slice(-2);
            },
            formatFractionTotal: function (number) {
                return ('0' + number).slice(-2);
            },
            renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span>' +
                    ' / ' +
                    '<span class="' + totalClass + '"></span>';
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    // scrollTrigger
    ScrollTrigger.create({
        trigger: ".sc_contact",
        start: "top 60%",

        onEnter: function () {
            $('.contact a').hide();
            $('.sc_contact .contact').animate({
                width: 100 + '%'
            }, 500, () => {
                $('.contact h2').removeClass('hide'), $('.contact a').fadeIn(1000);
            });
        }
    })


    // $('.contact a').hide();
    // $('.sc_contact .contact').animate({
    //     width: 100 + '%'
    // }, 500, () => {
    //     $('.contact h2').removeClass('hide'), $('.contact a').fadeIn(1000);
    // });




    // footer
    $('.select button').click(function () {

        if ($(this).hasClass('on')) {
            $('.select button').removeClass('on');
            $('.select_box').addClass('hide')
        } else {
            $('.select button').removeClass('on');
            $('.select_box').addClass('hide')
            $(this).addClass('on');
            $(this).siblings('.select_box').removeClass('hide');
        }
    })
})