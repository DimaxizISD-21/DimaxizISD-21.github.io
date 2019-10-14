// CAROUSEL
$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        prevArrow: '<button type = "button" class = "slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type = "button" class = "slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    arrows: false,
                    centerMode: false,
                    adaptiveHeight: true,
                    autoplay: true,
                    autoplaySpeed: 2500,
                    slidesToShow: 1,
                    dots: true
                }
            },
                
            // {
            //     breakpoint: 480,
            //     settings: {
            //         arrows: false,
            //         centerMode: true,
            //         centerPadding: '40px',
            //         slidesToShow: 1
            //     }
            // }
        ]
    });

    // TABS
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
        
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // MODAL
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #feed-back').fadeOut();
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    // FORM VALIDATE
    
    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Ващ email не соответсвует формату name@domain.com"
                }
            }
        });
    };

    validateForm('#consultation-form');
    validateForm('#order form');
    validateForm('#consultation form');

    $('input[name=phone]').mask("(999) 999-9999");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #feed-back').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //SCROLL-UP
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.arrow-up').fadeIn();
        } else {
            $('.arrow-up').fadeOut();
        }
        
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    //ANIMATE WOW
    new WOW().init();
    
});
      