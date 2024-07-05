import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    const contentHolder = document.querySelector(".content-holder");
    if (contentHolder) {
        const contentHolderHeight = contentHolder.offsetHeight;
        const imgHolderHeight = window.innerHeight;
        const additionalScrollHeight = window.innerHeight;

        const totalBodyHeight = contentHolderHeight + imgHolderHeight + additionalScrollHeight;
        document.body.style.height = `${totalBodyHeight}px`;
    }
});

ScrollTrigger.create({
    trigger: ".website-content",
    start: "-0.1% top",
    end: "bottom bottom",
    onEnter: () => gsap.set(".website-content", { position: 'absolute', top: '195%' }),
    onLeaveBack: () => gsap.set(".website-content", { position: 'fixed', top: '0' })
});

const animations = [
    {
        target: ".header .letters:nth-child(1) div:nth-child(-n+4)",
        config: { x: () => -innerWidth * 3, scale: 10, ease: "power2.inOut" }
    },
    {
        target: ".header .letters:nth-child(1) div:nth-child(n+5)",
        config: { x: () => innerWidth * 3, scale: 10, ease: "power2.inOut" }
    },
    {
        target: ".header .comerciales:nth-child(1) div:nth-child(-n+5)",
        config: { x: () => -innerWidth * 3, scale: 10, ease: "power2.inOut" }
    },
    {
        target: ".header .comerciales:nth-child(1) div:nth-child(n+6)",
        config: { x: () => innerWidth * 3, scale: 10, ease: "power2.inOut" }
    },
    {
        target: ".img-holder",
        config: { rotation: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: "power2.inOut" }
    },
    {
        target: ".img-holder img",
        config: { scale: 1, ease: "power2.inOut" }
    }
];

animations.forEach(({ target, config }) => {
    gsap.to(target, {
        ...config,
        scrollTrigger: {
            start: "top top",
            end: `+=200%`,
            scrub: 1
        }
    });
});

// Animaciones de entrada para los textos
gsap.from(".animate-text", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".animate-text",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animaciones de entrada para las imágenes
gsap.to(".animate-image", {
    scale: 0.8,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".animate-image",
        start: "top 80%",
    }
});
