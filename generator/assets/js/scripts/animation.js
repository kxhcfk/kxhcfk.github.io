"use strict";

var title = document.querySelector('.generator__title'),
    titleArr = title.textContent.split(''),
    tlTitle = gsap.timeline();
title.innerHTML = '';
titleArr.forEach(function (_char) {
  title.innerHTML += "<div>".concat(_char, "</div>");
});
var newTitleArr = document.querySelectorAll('.generator__title div');
newTitleArr.forEach(function (el) {
  tlTitle.fromTo(el, {
    y: -100,
    opacity: 0,
    scale: 0.5,
    x: 30
  }, {
    duration: 0.3,
    ease: "back.out",
    y: 0,
    x: 0,
    scale: 1,
    opacity: 1,
    rotateY: 360
  });
});
//# sourceMappingURL=animation.js.map
