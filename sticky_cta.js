var sticky_timer;
var sticky_scrollAmount = 0;
var sticky_activated = false;
var sticky_closed = false;



let sticky_mm = gsap.matchMedia();
sticky_mm.add("(max-width: 1024px)", () => {
    gsap.set(".sticky_cta_container", {
        bottom: gsap.getProperty(".overlay_menu", "height") + gsap.getProperty(".overlay_menu", "padding-top") + gsap.getProperty(".overlay_menu", "padding-bottom") + 10
    });
});

ScrollTrigger.create({
    onUpdate: (self) => {
        if (sticky_timer) {
            sticky_timer.kill()
        };
        if (sticky_activated == false) {
            sticky_timer = gsap.timeline({
                repeat: 0
            });
            sticky_timer.set(".sticky_cta_container", {
                onComplete: function() {
                    if (sticky_scrollAmount > 0) {
                        if (sticky_activated == false && sticky_closed == false) {
                            sticky_activated = true;
                            gsap.set(".sticky_cta_container", {
                                display: "flex"
                            });
                            var cta = new gsap.timeline({
                                repeat: -1,
                                delay: 0.0
                            });
                            cta.to('.sticky_cta_btn', 0.2, {
                                scale: 0.9,
                                ease: "power1.out"
                            }, "+=2.0")
                            cta.to('.sticky_cta_btn', 0.4, {
                                scale: 1.0,
                                ease: "power1.out"
                            }, "+=0.0")
                        }
                    } else {
                        sticky_scrollAmount++
                    }
                }
            }, "+=0.2");
        }
    },
});


/*
sticky_mm.add("(min-width: 768px)", () => {
  gsap.set(".sticky_cta", {display: "none"});
});
*/
document.querySelector(".sticky_cta_close_btn").onclick = function() {
    sticky_closed = true;
    gsap.set(".sticky_cta_container", {
        display: "none"
    });
}


gsap.set(".sticky_cta_container", {
    autoAlpha: 0
});
gsap.to(".sticky_cta_container", {
    scrollTrigger: {
        //markers:true,
        trigger: ".promo-hero", // start the animation when ".box" enters the viewport (once)
        start: "75% top top",
        //endTrigger: ".carousel_wrapper",
        end: "75% top top",
        scrub: 1,
    },
    autoAlpha: 1
});