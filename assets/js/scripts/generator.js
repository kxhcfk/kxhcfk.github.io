"use strict";

var generator = function generator() {
  var passGenerateButton = document.querySelector('.js-generate-button'),
      resultWindow = document.querySelector('.js-result'),
      checkboxInputs = document.querySelectorAll('[type="checkbox"]'),
      rangeSlider = document.querySelector('.js-renge');
  checkboxInputs.forEach(function (input) {
    input.addEventListener('click', function () {
      var chekedInputs = Array.from(checkboxInputs).filter(function (item) {
        return item.checked;
      });

      if (chekedInputs.length === 1) {
        console.log(chekedInputs);
        chekedInputs[0].setAttribute("disabled", '');
      } else if (chekedInputs.length > 1) {
        if (document.querySelector('[disabled]')) {
          document.querySelector('[disabled]').removeAttribute('disabled');
        }
      }
    });
  });

  var getRandomUppercase = function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
  };

  var getRandomLovercase = function getRandomLovercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
  };

  var getRandomNumber = function getRandomNumber() {
    return "".concat(Math.floor(Math.random() * 10));
  };

  var getRandomSymbol = function getRandomSymbol() {
    var symbols = '~#$%^&*()_+=-;:{}[]';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  var props = {
    lover: getRandomLovercase,
    upper: getRandomUppercase,
    number: getRandomNumber,
    symbol: getRandomSymbol
  };

  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var _ref = [array[j], array[i]];
      array[i] = _ref[0];
      array[j] = _ref[1];
    }

    return array;
  }

  function generatePassword(length, lover, upper, number, symbol) {
    var _pass = '';
    var typesArr = [{
      lover: lover
    }, {
      upper: upper
    }, {
      number: number
    }, {
      symbol: symbol
    }].filter(function (item) {
      return Object.values(item)[0];
    });

    for (var i = 0; i < length; i++) {
      typesArr.forEach(function (type) {
        var funcName = Object.keys(type)[0];
        _pass += props[funcName]();
      });
    }

    var result = _pass.slice(0, length).split('');

    return shuffle(result).join('');
  }

  function render() {
    var length = +document.querySelector('.js-length').textContent,
        hasLower = document.querySelector('#lovercase').checked,
        hasUpper = document.querySelector('#uppercase').checked,
        hasNumber = document.querySelector('#numbers').checked,
        hasSymbol = document.querySelector('#symbols').checked;
    resultWindow.style.fontSize = '2.5rem';

    if (length > 17 && length <= 22) {
      resultWindow.style.fontSize = '1.8rem';
    } else if (length > 22) {
      resultWindow.style.fontSize = '1.2rem';
    }

    var password = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
    resultWindow.textContent = password;
  }

  var generatedPassword = false;
  passGenerateButton.addEventListener('click', function () {
    generatedPassword = true;
    render();
  });
  document.querySelector('.js-length').textContent = rangeSlider.value;
  rangeSlider.addEventListener('input', function () {
    if (generatedPassword) {
      setTimeout(function () {
        render();
      }, 100);
    }

    document.querySelector('.js-length').textContent = rangeSlider.value;
  });
  resultWindow.addEventListener("click", function () {
    var textarea = document.createElement("textarea"),
        password = resultWindow.textContent,
        copyStatus = document.querySelector('.generator__copy-info');

    if (!password || password == "Generate a password") {
      return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    copyStatus.classList.add('appear');
    setTimeout(function () {
      copyStatus.classList.remove('appear');
    }, 1000);
  });
};

generator();
//# sourceMappingURL=generator.js.map
