$(document).ready(function(){   
    const auctionSlider = new Swiper('.auction_slider', {
        spaceBetween: 30,              
        loop: false,            
        pagination: {
          el: '.auction-pagination',
          clickable: true,
        },              
        navigation: {
          nextEl: '.auction-next',
          prevEl: '.auction-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 2.2
            },
            1200: {
                slidesPerView: 2.3
            }
        }
    });

    const highlightSlider = new Swiper('.highlight_slider', {
        spaceBetween: 30,              
        loop: false,
        navigation: {
          nextEl: '.highlight-next',
          prevEl: '.highlight-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 2.2
            },
            1200: {
                slidesPerView: 3.3
            }
        }
    });

    const recentSlider = new Swiper('.recent_slider', {
        spaceBetween: 30,              
        loop: false,
        navigation: {
          nextEl: '.recent-next',
          prevEl: '.recent-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1.2
            },
            640: {
                slidesPerView: 2.2
            },
            1200: {
                slidesPerView: 4
            }
        }
    });

    const servicesSlider = new Swiper('.services_slider', {
        spaceBetween: 70,
        loop: false,
        navigation: {
          nextEl: '.services-next',
          prevEl: '.services-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1.2
            },
            640: {
                slidesPerView: 2.2
            },
            1200: {
                slidesPerView: 4
            }
        }
    });

    const modernSlider = new Swiper('.modern_slider', {
        spaceBetween: 70,
        loop: false,
        navigation: {
          nextEl: '.modern-next',
          prevEl: '.modern-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            }
        }
    });

    const ourCollectorSlider = new Swiper('.ourCollector_slider', {
        spaceBetween:20,              
        loop: false,
        navigation: {
          nextEl: '.ourCollector-next',
          prevEl: '.ourCollector-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1.2
            },
            640: {
                slidesPerView: 2.2
            },
            1200: {
                slidesPerView: 3.5
            }
        }
    });    
});