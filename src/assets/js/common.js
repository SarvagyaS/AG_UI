$(document).ready(function() {

    /*---Search Section starts---*/
        $('.search_btn').click(function(e) {
            $('.search_box').addClass('show');
        });

        $('.search_box a').click(function() {            
            $(this).parent().removeClass('show');
        });
    /*---Search Section ends---*/

    /*---Hamburger starts---*/
        $('.hamburger').click(function(){
            var header_ht = $("header").height();
            $(this).toggleClass('open');
            $("body").toggleClass('pos_relative').toggleClass("overflow-hide");            
            $("header .nav").slideToggle();
            $("header .nav").css("top", header_ht);            
            
            $(".nav_list > li").each(function(){
                if($(this).find(".sub_nav_container").length){
                    $(this).find("a").addClass("subnav_link");
                }
            });

            $(".sub_header > .container > ul > li").each(function(){
                if($(this).find(".sub_nav").length){
                    $(this).find("a").addClass("subnav_link");
                    $(this).find(".sub_nav ul li a").removeClass("subnav_link");
                }
            });

            $(".sub_header").show().insertAfter(".nav > ul");
        });

        if($(window).width() < 640){
            $(".nav_list > li > a").click(function(){
                if($(this).parent().find(".sub_nav_container").length){
                    $(this).parent().find(".sub_nav_container").slideToggle();
                    $(this).parent().siblings().find(".sub_nav_container").slideUp();   
                }
                else{
                    $(".sub_nav_container").slideUp();
                }
            });

            $(".sub_header > .container > ul > li > a").click(function(){
                if($(this).parent().find(".sub_nav").length){
                    $(this).parent().find(".sub_nav").slideDown();
                    $(this).parent().siblings().find(".sub_nav").slideUp();   
                }
                else{
                    $(".sub_nav").slideUp();
                }
            });
        }
    /*---Hamburger ends---*/

    /*---Video Section starts---*/
        $('.playBtn').click(function() {
            let videoSrc = $(this).attr('data-url')
            $('.commonPopup iframe').attr('src', videoSrc);
            $('.overlay, .commonPopup').fadeIn('show');
            $("body").addClass("overflow-hide");
        });

        $('.playBtn').click(function() {
            let videoSrc = $(this).attr('data-url')
            $('.commonPopup iframe').attr('src', videoSrc);
            $('.overlay, .commonPopup').fadeIn('show');
            $("body").removeClass("overflow-hide");
        });

        $('.commonPopup .closeBtn').click(function() {
            $('.overlay, .commonPopup').fadeOut('show');
            $('.commonPopup iframe').attr('src', "");
        });
    /*---Video Section ends---*/

    /*---Login Button starts---*/
        $(document).on('click', '.login_btn, .login_icon_btn', function(e){
            $('.overlay, .login_reg_sec').fadeIn('show');
            $("body").addClass("overflow-hide");
            e.stopPropagation();
        });        

        $('.login_reg_sec .closeBtn').click(function() {
            $('.overlay, .login_reg_sec').fadeOut('show');
            $("body").removeClass("overflow-hide");
        });

        $('.create_acc_btn').click(function() {
            $(".login_form_sec").fadeOut('show');
            setTimeout(function(){
                $('.reg_form_sec').fadeIn('show');
            }, 500);
        });

        $('.user_acc_btn').click(function() {
            $(".reg_form_sec").fadeOut('show');
            setTimeout(function(){
                $('.login_form_sec').fadeIn('show');
            }, 500);
        });
        
        var login_elem = $('.login_reg_sec')[0];
        $(document).on( 'click', function (e) {
            if ($(e.target).closest(login_elem).length === 0) {
                $(login_elem).fadeOut();
                $(".overlay").fadeOut();
            }
        });
                        
        $(document).on('keydown', function (e) {
            if (e.keyCode === 27 ) {
                $(login_elem).fadeOut();
                $(".overlay").fadeOut();
            }
        });
    /*---Login Button ends---*/

    /*---Password starts---*/
        $(".password_sec a").click(function(){
            var input = $(this).parent().find("input");
            if (input.attr("type") === "password") {
                input.attr("type", "text");
            } 
            else {
                input.attr("type", "password");
            }
        });
    /*---Password ends---*/

    /*---Tabbing starts---*/

    $('.price_tabs ul li a').click(function(){
		var tab_id = $(this).attr('data-tab');        
        $(".price_tabs ul li").siblings().find("a").removeClass('active');
        $(this).addClass('active');
		$('.tab-content').removeClass('active');
		$("#" + tab_id).addClass('active');
	});

    $('.profile_links ul li a').click(function(){
		var dash_id = $(this).attr('data-tab');
        $(".profile_links ul li").siblings().find("a").removeClass('active');
        $(this).addClass('active');        
		$('.tab-content').removeClass('active');
		$("#" + dash_id).addClass('active');
        console.log($("#" + dash_id));
	});

    /*---Tabbing ends---*/   

    /*---Footer starts---*/
        if($(window).width() < 640){
            $(".footer_list h5").click(function(){
                if($(this).parent().find("ul").length){
                    $(this).parent().find("ul").slideToggle();
                    $(this).parent().siblings().find("ul").slideUp();   
                }
            });
        }
    /*---Footer ends---*/    
});