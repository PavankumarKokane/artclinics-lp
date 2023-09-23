$(document).ready(function () {
    var d = new Date();
    $(".copyrightYear").html(d.getFullYear());

    var winHT = $(window).height();
    var winWD = $(window).width();
    var navHt = $("header").outerHeight();
    var bannerHt = winHT - navHt;
    isFloorplan = 0;
    isBrochure = 0;

    $(".banner_ht").css("height", bannerHt);
    $(".section-first").css("margin-top", navHt);

    $(".goto-home").on("click", function () {
        $("html,body").animate(
            {
                scrollTop: 0,
            },
            1000
        );
    });

    $(".scroll-next").click(function () {
        var cls = $(this).closest("section").next().offset().top - 50;
        $("html, body").animate({ scrollTop: cls }, 1000);
    });

    $(".enq_click").click(function () {
        if ($(".form-container").is(":visible")) {
            $(".form-container").slideUp();
        } else {
            $(".form-container").slideToggle();
        }
    });

    $(".menu-icon-mobile").on("click", function () {
        $(".nav-links").slideToggle();
    });

    if (winWD <= 768) {
        $(".nav-links a").on("click", function () {
            $(".menu-icon-mobile").trigger("click");
        });

        $(".mob_enq_click, .frmclose").on("click", function () {
            isBrochure = 0;
            isFloorplan = 0;
            $(".form-container").toggleClass("show");
        });
    }

    var childrenSelector = $(".nav-links a");
    var aChildren = $(".nav-links a"); // find the a children of the list items
    if (winWD <= 700) var gap = 55;
    // $(".header-wrapper").outerHeight(); //Navigation height
    else var gap = 100;
    var aArray = []; // create the empty aArray
    for (var i = 0; i < childrenSelector.length; i++) {
        var aChild = aChildren[i];
        if (!$(aChild).hasClass("extLink")) {
            if ($(aChild).attr("rel")) {
                var ahref = $(aChild).attr("rel");
                aArray.push(ahref);
            }
        }
    }

    //On Scroll - Add class active to active tab
    $(window).scroll(function () {
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();
        for (i = 0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $("#" + theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $("#" + theID).outerHeight(); // get the height of the div in question
            if (windowPos >= divPos - gap && windowPos < divPos - gap + divHeight) {
                if (!$("a[rel='" + theID + "']").hasClass("active")) {
                    // ga('set', 'page', '/'+theID);
                    // ga('send', 'pageview');
                    $("a[rel='" + theID + "']").addClass("active");
                }
            } else {
                $("a[rel='" + theID + "']").removeClass("active");
            }
        }

        //If document has scrolled to the end. Add active class to the last navigation menu
        if (windowPos + windowHeight == docHeight) {
            if (!$(".nav-links a:not(.extLink):last-child").hasClass("active")) {
                var navActiveCurrent = $(".active").attr("rel");
                $("a[rel='" + navActiveCurrent + "']").removeClass("active");
                $(".nav-links a:not(.extLink):last-child").addClass("active");
            }
        }
    });

    //On Click
    $(".nav-links a").on("click", function () {
        if (!$(this).hasClass("extLink")) {
            var href = $(this).attr("rel");
            if (winWD <= 700) var gap = 45;
            // $(".header-wrapper").outerHeight(); //Navigation height
            else var gap = 96;

            $("html,body").animate(
                {
                    scrollTop: $("#" + href).offset().top - gap,
                },
                1000
            );
        }
    });
});

var winWD = $(window).width();
//console.log(winWD);
if (winWD < 768) {
    $(".points-div1").remove();

    $(".main-sucess").slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
}

$(".customers-slider").slick({
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $(".button-prev"),
    nextArrow: $(".button-next"),
    adaptiveHeight: true,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
            },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ],
});

$(".accordion_faq .set > .panel").on("click", function () {
    // alert("test");
    if ($(this).hasClass("active")) {
        // $(this).removeClass("active");
        // $(this).siblings(".accordion_faq .content").slideUp(200);
    } else {
        $(".accordion-image").css("display", "none");
        var img_id = $(this).attr("rel");
        $("#" + img_id).css("display", "block");
        $(".accordion_faq .set > .panel").removeClass("active");
        $(this).addClass("active");
        $(this).parent(".accordion_faq .set").parent(".accordion_faq").children(".accordion_faq .set").children(".content").slideUp(200);
        $(this).siblings(".accordion_faq .content").slideDown(200);
    }
});

//Code For only Alphabet allowed
$(document).ready(function () {
    const alphaOnly = document.querySelectorAll(".alpha-only");
    alphaOnly.forEach(function (element) {
        element.addEventListener("beforeinput", function (event) {
            if (event.inputType === "deleteContentBackward") {
                return;
            }
            var value = this.value;
            if (!/^[a-zA-Z ]$/.test(event.data) || (event.data === " " && value.length === 0)) {
                event.preventDefault();
            }
        });
    });
    // only number with 10 digits allowed
    const numericOnly = document.querySelectorAll(".contact_no");
    numericOnly.forEach(function (element) {
        element.addEventListener("beforeinput", function (event) {
            // Check if the input is the backspace key
            if (event.inputType === "deleteContentBackward") {
                // If it is, allow the input
                return;
            }

            // Check if the input is not a number or if there are already 10 digits
            if (!/^\d$/.test(event.data) || this.value.length >= 10) {
                // If it's not allowed, cancel the input event
                event.preventDefault();
            }
        });
    });
});

$(".goto-form").click(function () {
    var winWd = $(window).width();
    if (winWD > 767) {
        var sec_top = $(".banner-sec .contact-from-banner").offset().top - 200;
    } else {
        var sec_top = $(".contact-from-banner.visible-xs").offset().top - 50;
    }
    var scrollto = sec_top;
    $("html, body").animate({ scrollTop: scrollto }, 1000);
});


$(".form-banner").submit(function (e) {
    e.preventDefault();
    $(this).find(".loader").css("display", "block");
    var settings = {
        "url": "https://pavankokane.tech/artclinics.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "Name": $("input[name='Name']").val(),
            "Mobile": $("input[name='Contact']").val(),
            "Email": $("input[name='Email']").val(),
            "ConsultationType": $("select").val(),
        }),
      };
      
    $.ajax(settings).done(function (response) {
        //console.log(response);
        //console.log(response.success);
        if (response.success == true) {
            $(".form-banner").trigger("reset");
            $(".loader").css("display", "none");
            $(".form-sub").css("display", "block");
        }
    });

});
