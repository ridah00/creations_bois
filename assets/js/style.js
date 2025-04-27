 document.addEventListener('DOMContentLoaded', function () {
    var myCarousel = document.getElementById('myCarousel');
    var carousel = new bootstrap.Carousel(myCarousel, {
      interval: 2000,
      touch: true
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    gsap.from("header h1", {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".section").forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out"
    });
  });

  gsap.from(".card", {
    scrollTrigger: {
      trigger: "#creations",
      start: "top 80%",
      toggleActions: "play reverse play reverse",
    },
    opacity: 0,
    y: 30,
    x: (i) => i % 3 === 0 ? 100 : -100,
    duration: 1,
    ease: "power2.out",
    stagger: 0.4
  });

  gsap.utils.toArray('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      });
    });
  
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: 'none'
      });
    });
  });
  
