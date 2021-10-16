$(document).ready(function() {

    AOS.init();
    headerHt();
    historyTabs();    
    

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
            $(this).toggleClass('open');
            $("body").toggleClass('pos_relative').toggleClass("overflow-hide");            
            $("header .nav").toggleClass("show");            
            $(".sub_header").show().insertAfter(".nav > ul");
            $(".sub_nav_container, .sub_nav").slideUp();
            
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
        });

        if($(window).width() < 640){
            $(".nav_list > li > a").click(function(){
                if($(this).parent().find(".sub_nav_container").length){
                    $(this).parent().toggleClass("active");
                    $(this).parent().find(".sub_nav_container").slideToggle();
                    $(this).parent().siblings().find(".sub_nav_container").slideUp();
                    $(this).parent().siblings().removeClass("active");
                    $(".sub_nav").slideUp();
                }
                else{
                    $(".sub_nav_container").slideUp();
                }
            });
            
            $(".sub_header ul li a").click(function(){
                if($(this).parent().find(".sub_nav").length){
                    $(this).parent().toggleClass("active");
                    $(this).parent().find(".sub_nav").slideToggle();
                    $(this).parent().siblings().find(".sub_nav").slideUp();
                    $(this).parent().siblings().removeClass("active");
                    $(".sub_nav_container").slideUp();
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
            $('.commonPopup').fadeIn('show');
            $('.overlay').show();
        });       

        $('.commonPopup .closeBtn').click(function() {
            $('.overlay, .commonPopup').fadeOut('show');
            $('.commonPopup iframe').attr('src', "");
            $("body").removeClass("overflow-hide");
        });

        $('.auction_img a').click(function() {
            if($(".commonPopup").length){
                let imgsrc = $(this).find("img").attr('src');                
                $('.commonPopup img').attr('src', imgsrc);
                $('.commonPopup').fadeIn('show');
                $('.overlay').show();
            }
        }); 
        
        $('.album_img').click(function() {
            let albumSrc = $(this).find("img").attr('src');
            $('.commonPopup').fadeIn('show');
            $('.collection_popup .content .left_sec img').attr('src', albumSrc);
            $('.overlay').show();
        });      
    /*---Video Section ends---*/

    /*---Login Button starts---*/
        $(document).on('click', '.login_btn, .login_icon_btn, .user_password a', function(e){
            $('.overlay, .login_reg_sec, .login_form_sec').fadeIn('show');
            $(".forgot_form_sec, .reg_form_sec").hide();
            e.stopPropagation();
        });        

        $(document).on('click', '.login_reg_sec .closeBtn', function(){
            $('.overlay, .login_reg_sec').fadeOut('show');
            $("body").removeClass("overflow-hide");
        });

        $(document).on('click', '.create_acc_btn', function(){        
            $(".login_form_sec").fadeOut('show');
            setTimeout(function(){
                $('.reg_form_sec').fadeIn('show');
            }, 500);
        });

        $(document).on('click', '.user_acc_btn', function(){         
            $(".reg_form_sec").fadeOut('show');
            setTimeout(function(){
                $('.login_form_sec').fadeIn('show');
            }, 500);
        });
        
        var login_elem = $('.login_reg_sec')[0];        
                        
        $(document).on('keydown', function (e) {
            if (e.keyCode === 27 ) {
                $(login_elem).fadeOut();
                $(".overlay, .commonPopup").fadeOut();
                $("body").removeClass("overflow-hide");
                if($(".profile_box").length){
                    $(".profile_box").fadeOut();
                }

                if($(".notification_box").length){
                    $(".notification_box").fadeOut();
                }                
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
        $(document).on('click', '.price_tabs ul li a', function(){
            var price_tab_id = $(this).attr('data-tab');        
            $(".price_tabs ul li").siblings().find("a").removeClass('active');
            $(this).addClass('active');
            $('.tab-content').removeClass('active');
            $("#" + price_tab_id).addClass('active');
        });

        $(document).on('click', '.profile_links ul li a', function(){
            var profile_tab_id = $(this).attr('data-tab');
            $(".profile_links ul li").siblings().find("a").removeClass('active');
            $(this).addClass('active');        
            $('.tab-inner-content').removeClass('active');
            $("#" + profile_tab_id).addClass('active');        
        });

        $(document).on('click', '.news_tabs ul li a', function(){
            var news_tab_id = $(this).attr('data-tab');        
            $(".news_tabs ul li").siblings().find("a").removeClass('active');
            $(this).addClass('active');
            $('.news_container .tab-content').removeClass('active');
            $("#" + news_tab_id).addClass('active');
        });
        
        $(document).on('click', '.mainTabsWrap .tabsNavLinks ul li a', function(){
            var index = $(this).parent().index();        
            $(this).parent().addClass('active').siblings().removeClass('active');
            $(this).closest('.mainTabsWrap').find('.tabsContentBox').eq(index).show().siblings().hide();
        });

        $('.mainTabsWrap .tabsNavLinks ul li a').eq(0).click();

        $(document).on('click', '.inner_tabs_wrap .inner_tabs_nav ul li a', function(){
            var index = $(this).parent().index();        
            $(this).parent().addClass('active').siblings().removeClass('active');
            $(this).closest('.inner_tabs_wrap').find('.inner_tab_content').eq(index).show().siblings().hide();
        });

        $('.inner_tabs_wrap').each(function(){
            $(this).find('.inner_tabs_nav ul li').eq(0).children('a').click();
        });

        $(document).on('click', '.auction_main_tabs ul li a', function(){
            var auction_live = $(this).attr('data-tab');        
            $(".auction_main_tabs ul li").siblings().find("a").removeClass('active');
            $(this).addClass('active');
            $('.auctions_main_tabcontent').removeClass('active');
            $("#" + auction_live).addClass('active');
        });

        $(document).on('click', '.profile_tabs .left_sec ul li a', function(){
            var profile_tab = $(this).attr('data-tab');            
            $(this).addClass('active');            
            $('.profile_content').removeClass('active');
            $("#" + profile_tab).addClass('active');
        });

        $(document).on('click', '.small_tabs ul li a', function(){
            var gallery_tab = $(this).attr('data-tab');        
            $(".small_tabs ul li").siblings().find("a").removeClass('active');
            $(this).addClass('active');
            $('.gallery_tab_inner').removeClass('active');
            $("#" + gallery_tab).addClass('active');
        });

    /*---Tabbing ends---*/

    /* Filter - Starts */
        $(document).on('click', '.filter_icon a', function(){
            $(".auction_main_content .container .left_sec").fadeIn();
        });        

        $(document).on('click', '.filter_head a.close', function(){
            if($(this).length){
                $(".auction_main_content .container .left_sec").fadeOut();
            }            
        });

        $(document).on('click', '.tag_sec ul li a img', function(){
            $(this).parent().fadeOut();
        });
    /* Filter - Ends */   

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

    /*---List and Grid View JS Start---*/ 
        $(document).on('click', '.listview_btn', function(){
            if($(".gridview").length){
                $(this).addClass("active");
                $(".gridview_btn").removeClass("active");
                $(".gridview").addClass("listview");            
            }

            $("#all_auction ul li").each(function(){
                if($(this).find(".auction_bid").length){
                    $(this).addClass("bid_yes");
                }                
            });
        });

        $(document).on('click', '.gridview_btn', function(){
            if($(".gridview").length){
                $(this).addClass("active");
                $(".listview_btn").removeClass("active");
                $(".gridview").removeClass("listview");
            }                        
        });
    /*---List and Grid View JS Ends---*/            

    /*---Accordion starts---*/
        $('.toggle').click(function(e) {
            e.preventDefault();

            var $this = $(this);  
            $this.addClass('active');
            $this.parent().siblings().find('.toggle').removeClass('active');

            
            if ($this.next().hasClass('show')) {
                $this.next().removeClass('show');            
                $this.next().slideUp(350); 
                $this.removeClass('active');
            } 
            else {
                $this.parent().parent().find('li .toggle_inner').removeClass('show');
                $this.parent().parent().find('li .toggle_inner').slideUp(350);            
                $this.next().toggleClass('show');            
                $this.next().slideToggle(350);            
            }
        });
    /*---Accordion ends---*/


    /*---Scrolling starts---*/
        $('.art_tabs ul li a[data-scroll]').click(function(e) {
            e.preventDefault();            
            var offset = 10;
            var target = ( '#' + $(this).data('scroll') );
            var $target = $(target);            
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - offset
            }, 800, 'swing');
        });        
    /*---Scrolling ends---*/


    /*---Profile Header starts---*/
        $(document).on('click', '.profile_img', function(e){
            e.stopPropagation();
            $(".profile_box").fadeToggle();
            $(".notification_box").fadeOut();
        });
        
        $(document).on('click',function(e){
            if($(e.target) != $(".profile_img")){
                $(".profile_box").fadeOut();
            }
        });

        $(document).on('click', '.notification_btn', function(e){
            e.stopPropagation();
            $(".notification_box").fadeToggle();
            $(".profile_box").fadeOut();
        });

        $(document).on('click',function(e){
            if($(e.target) != $(".notification_btn")){
                $(".notification_box").fadeOut();
            }
        });

        $(document).on('click', '.setting_btn', function(){
            $('.setting_popup').fadeIn('show');            
            $(".profile_box, .notification_box").fadeOut();
            $('.overlay').show();
        });  
        
        var dashheader = $(".dash_header");
        var headht = $("header").outerHeight();
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();            
            if (scroll >= headht) {
                dashheader.addClass("fixed");
            } 
            else{
                dashheader.removeClass("fixed");
            }
        });
    /*---Profile Header ends---*/

    /*---Login Form Starts---*/
        $(document).on('click', '.username_radio', function(){
            $(".username_form").show();
            $(".mobile_form").hide();
        });

        $(document).on('click', '.mobile_radio', function(){
            $(".username_form").hide();
            $(".mobile_form").show();
        });

        $(document).on('click', '.get_otp', function(){
            setTimeout(function(){
                var errorCount = $(".mobile_form ul li").find(".error:visible").length;                 
                if(errorCount > 0){
                    $(".enter_otp, .verify_btn").hide();                    
                }
                else{                                        
                    $(".get_otp").hide();                
                    $(".enter_otp, .verify_btn").show();                    
                }
            },500);                    
        });

        $(document).on('click', '.forgot_pass', function(){
            $(".login_form_sec").hide();
            $(".forgot_form_sec").fadeIn();
        });        
    /*---Login Form ends---*/
    
    /*---Registration Form Starts---*/
        $(document).on('click', '#personal_detail .save_btn button', function(){
            setTimeout(function(){
                var errorCount = $("#personal_detail ul li").find(".error:visible").length; 
                console.log(errorCount);
                if(errorCount <= 0){
                    $(".personal_tab").find(".done_image").show();
                    $(".address_tab").click();
                    var nationality = $(".nationality_dropdown").find(":selected").text();                
                    if(nationality == "Indian"){                
                        $(".indian").show();
                    }
                    else{                
                        $(".non_indian").show();
                        $(".indian").hide();
                    }
                }
            },500);
        });

        $(document).on('click', '#postal_address .save_btn .next_btn', function(){            
            $(".banking_tab").click();
            $(".address_tab").find(".done_image").show();
        });

        $(document).on('click', '#postal_address .prev_btn', function(){
            $(".reg_form_sec .profile_tabs ul li:first-child").find("a").click();        
        });        
    /*---Registration Form ends---*/

    /*---Multiselect starts---*/
        $(".multiselect_dropdown dt a").on('click', function(e) {
            $(".multiselect_dropdown dd ul").slideToggle('fast');
            e.stopPropagation();
        });
      
        // $(".multiselect_dropdown dd ul li a").on('click', function() {
        //     $(".multiselect_dropdown dd ul").hide();
        // });
      
        function getSelectedValue(id) {
            return $("#" + id).find("dt a span.value").html();
        }
      
        $(document).bind('click', function(e) {
            var $clicked = $(e.target);            
            if (!$clicked.parents().hasClass("dropdown")) {
                $(".multiselect_dropdown dd ul").hide();
            }
        });
      
        $('.mutliSelect input[type="checkbox"]').on('click', function() {      
            var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),
            title = $(this).val() + ",";
      
            if ($(this).is(':checked')) {
                var html = '<span title="' + title + '">' + title + '</span>';
                $('.multiSel').append(html);
                // $(".hida").hide();
                $(".user_interested .note").hide();
            } 
            else {
                $('span[title="' + title + '"]').remove();
                var ret = $(".hida");
                $('.multiselect_dropdown dt a').append(ret);
            }
        });
    /*---Multiselect ends---*/

    if($("#bid-range").length){
        $("#bid-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function( event, ui ) {
            $( "#bid_amount" ).val( "₹" + ui.values[ 0 ] + " - ₹" + ui.values[ 1 ] );
            }
        });

        $( "#bid_amount" ).val("₹" + $( "#bid-range").slider("values", 0) + " - ₹" + $("#bid-range").slider("values", 1));    
    }
});

function headerHt(){
    var header_ht = $("header").height(); 
    $("header .nav").css("top", header_ht);
}

function historyTabs(){
    if($(".history_tabs").length){
        var yearTxt = $(".history_tabs ul li a.active").text();
        $(".historyYear_slider span").text(yearTxt);
    }

    $(document).on('click', '.history_tabs ul li a', function(){
        if($(".history_tabs").length){
            var yearTxt = $(this).text();
            $(".historyYear_slider span").text(yearTxt);
        }

        var history_tab_id = $(this).attr('data-tab');        
        $(".history_tabs ul li").siblings().find("a").removeClass('active');
        $(this).addClass('active');
        $('.tab-content').removeClass('active');
        $("#" + history_tab_id).addClass('active');
    });
       
    
    $(document).on('click', '.historyYear-next', function(){        
        if ($(".history_tabs ul li a.active").parent().next().length != 0){            
            $(".history_tabs ul li a.active").parent().next().find("a").click();
        }        
        return false;
    });

    $(document).on('click', '.historyYear-prev', function(){
        
        if ($(".history_tabs ul li a.active").parent().prev().length != 0){
            $(".history_tabs ul li a.active").parent().prev().find("a").click();
        }
        return false;
    });

}
