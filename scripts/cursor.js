$(function() {
    var prefix = function() {
      var a = window.getComputedStyle(document.documentElement, ""),
        b = (Array.prototype.slice.call(a).join("").match(/-(moz|webkit|ms)-/) || "" === a.OLink && ["", "o"])[1];
      return "WebKit|Moz|MS|O".match(new RegExp("(" + b + ")", "i"))[1], "-" + b + "-"
    }();
    $(document).mousemove(function(e) {
      mouseX = e.pageX + 15;
      mouseY = e.pageY - $(window).scrollTop() + 15;
      $('.theBall-outer').attr('style', prefix + 'transform:translate(' + mouseX + 'px,' + mouseY + 'px)');
    });
  
    $(document).on('mouseenter', 'a', function() {
      $('.theBall').addClass('zooming');
    }).on('mouseleave', 'a', function() {
      $(".theBall").removeClass("zooming")
    });
  })


  let scroll;

function initLocomotiveScroll() {
    if (scroll) {
        scroll.destroy(); // Destroy the existing instance
    }

    scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        mobile: {
            smooth: true,
            breakpoint: 0
        },
        tablet: {
            smooth: true,
            breakpoint: 0
        }
    });

    new ResizeObserver(() => scroll.update()).observe(
        document.querySelector("[data-scroll-container]")
    );
}

window.addEventListener("load", (event) => {
    initLocomotiveScroll();
});