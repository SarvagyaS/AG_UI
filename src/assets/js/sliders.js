$(document).ready(function(){   
    const bannerSlider = new Swiper('.banner_slider', {
        spaceBetween: 30,
        loop: false,
        autoplay: {
            delay: 5000
        },
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        allowTouchMove: false,
        pagination: {
          el: '.banner-pagination',
          clickable: true,
        },
        navigation: {
            nextEl: '.banner-next',
            prevEl: '.banner-prev',
          },
        breakpoints: {
            360: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }            
        }
    });

    const auctionSlider = new Swiper('.auction_slider', {
        spaceBetween: 30,
        loop: false,
        autoplay: {
            delay: 3000
        },
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
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
                slidesPerView: 1.2,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 20
            }            
        }
    });

    const highlightSlider = new Swiper('.highlight_slider', {
        spaceBetween: 15,
        loop: false,
        autoplay: false,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
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
                slidesPerView: 3.5
            },                
        }
    });

    const modernSlider = new Swiper('.modern_slider', {
        spaceBetween: 30,
        loop: false,
        autoplay: {
            delay: 4000
        },
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
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
                slidesPerView: 2.5
            },
            1200: {
                slidesPerView: 4
            }
        }
    });    

    const recentSlider = new Swiper('.recent_slider', {
        spaceBetween: 20,
        loop: false,
        autoplay: false,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        navigation: {
          nextEl: '.recent-next',
          prevEl: '.recent-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1.4
            },
            640: {
                slidesPerView: 2.5
            },
            1200: {
                slidesPerView: 4.4
            }
        }
    });

    const servicesSlider = new Swiper('.services_slider', {
        spaceBetween: 70,
        loop: true,
        autoplay: {
            delay: 3000
        },
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        navigation: {
          nextEl: '.services-next',
          prevEl: '.services-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1.3,
                spaceBetween: 50
            },
            640: {
                slidesPerView: 2.5
            },
            1200: {
                slidesPerView: 4.3
            }
        }
    });    

    const ourCollectorSlider = new Swiper('.ourCollector_slider', {
        spaceBetween:20,              
        loop: false,
        autoplay: {
            delay: 4000
        },
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        navigation: {
          nextEl: '.ourCollector-next',
          prevEl: '.ourCollector-prev',
        },
        
        breakpoints: {
            360: {
                slidesPerView: 1,
                pagination: {
                    el: '.ourCollector-pagination',
                    clickable: true,
                },
            },
            640: {
                slidesPerView: 2.2
            },
            1200: {
                slidesPerView: 3.4
            }
        }
    }); 
    
    const highlightDashSlider = new Swiper('.highlight_sliderInner', {
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
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            }
        }
    }); 
    
    const cultureSlider = new Swiper('.culture_slider', {
        spaceBetween:0,
        loop: false,
        navigation: {
          nextEl: '.culture-next',
          prevEl: '.culture-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 1
            },
            1200: {
                slidesPerView: 1
            }
        }
    }); 

    const valueSlider = new Swiper('.value_slider', {
        spaceBetween:0,
        loop: false,
        pagination: {
            el: '.global-pagination',
            clickable: true,
          },
        navigation: {
          nextEl: '.culture-next',
          prevEl: '.culture-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 1
            },
            1200: {
                slidesPerView: 1
            }
        }
    }); 

    const latestjobsSlider = new Swiper('.latestjobs_slider', {
        spaceBetween: 15,
        loop: false,
        navigation: {
          nextEl: '.latestjobs-next',
          prevEl: '.latestjobs-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1.1
            },
            640: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            }
        }
    }); 

    const employeeSlider = new Swiper('.employee_slider', {
        spaceBetween: 50,
        autoplay: {
            delay: 3000
        },
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        loop: false,
        navigation: {
          nextEl: '.employee-next',
          prevEl: '.employee-prev',
        },
        breakpoints: {
            360: {
                spaceBetween: 10,
                slidesPerView: 1.1
            },
            640: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            }
        }
    }); 

    const pastlotSlider = new Swiper('.pastlot_slider', {
        spaceBetween: 15,
        loop: false,
        autoplay: false,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        navigation: {
        nextEl: '.pastlot-next',
        prevEl: '.pastlot-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            },                
        }
    });

    const storySlider = new Swiper('.story_slider', {
        spaceBetween: 35,
        loop: false,
        autoplay: false,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        navigation: {
        nextEl: '.story-next',
        prevEl: '.story-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            },                
        }
    });    
});