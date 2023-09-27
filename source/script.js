function scrollLoco() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        smoothMobile: true,
        multiplier: 1.5
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
scrollLoco();

var heroTL = gsap.timeline();
heroTL
.from("#hero",{
    width: "100vw",
    height: "100vh",
    duration: 2,
    marginTop: 0,
    ease: Expo.easeInOut
}, "img")
.from("#hero>img", {
    scale: 2,
    duration: 2,
    ease: Expo.easeInOut
}, "img")
.from(".main-txt>h1",{
    y: 50,
    opacity: 0,
    duration: 2,
    ease: Expo.easeInOut,
}, "img1")
.from(".header-btn",{
    y: 50,
    opacity: 0,
    duration: 2,
    ease: Power3.easeInOut
}, "img1")

var tlSlidingCards = gsap.timeline({
    scrollTrigger: {
        trigger: "#five",
        start: "-10% bottom",
        end: "90% 20%",
        scrub: true,
        scroller: '#main'
    }
});
tlSlidingCards
.to(".top-card", {
    left: 0,
    ease: Power1.easeInOut,
    duration: 3,
    stagger: 2,
}, "card")
.to(".bot-card", {
    right: 0,
    ease: Power1.easeInOut,
    duration: 3,
    stagger: 2,
}, "card")


document.querySelectorAll(".sixl h1").forEach(function (link) {
    link.addEventListener("mouseover", function (dets) {
        gsap.to(".imgbox", {
            x: dets.target.dataset.index * -100 + "%",
            duration: 1,
            ease: "expo"
        })
    })
})



const hidden = document.querySelector(".hidden");
const menu = document.querySelector("#nav>.menu");
const nav = document.querySelector("#nav");
const hero = document.querySelector("#hero");
const main = document.querySelector("#main");
var flag = 0;
menu.addEventListener("click", function(){
    if(flag === 0){
        nav.style.color = "#fff";
        main.style.marginTop = "5%";
        main.style.marginLeft = "50%";
        nav.style.marginTop = "-5%";
        nav.style.marginLeft = "-100%";
        document.querySelector(".menu>i").classList.remove("ri-menu-line");
        document.querySelector(".menu>i").classList.add("ri-close-line");
        flag=1;
    }   
    else if(flag === 1){
        nav.style.color = "initial";
        main.style.marginTop = "initial";
        main.style.marginLeft = "initial";
        nav.style.marginTop = "initial";
        nav.style.marginLeft = "initial";
        document.querySelector(".menu>i").classList.add("ri-menu-line");
        document.querySelector(".menu>i").classList.remove("ri-close-line");
        flag = 0;
    }
});