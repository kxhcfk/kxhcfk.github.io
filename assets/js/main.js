const generator = () => {
    const passGenerateButton = document.querySelector('.js-generate-button'),
        resultWindow = document.querySelector('.js-result'),
        checkboxInputs = document.querySelectorAll('[type="checkbox"]'),
        rangeSlider = document.querySelector('.js-renge');

    checkboxInputs.forEach(input => {
        input.addEventListener('click', () => {
            const chekedInputs = Array.from(checkboxInputs).filter(item => item.checked);

            if (chekedInputs.length === 1) {
                console.log(chekedInputs)
                chekedInputs[0].setAttribute("disabled", '');
            } else if (chekedInputs.length > 1) {
                if (document.querySelector('[disabled]')) {
                    document.querySelector('[disabled]').removeAttribute('disabled');
                }
            }
        })
    });

    const getRandomUppercase = () => {
        return String.fromCharCode(Math.floor((Math.random() * 26) + 65));
    };

    const getRandomLovercase = () => {
        return String.fromCharCode(Math.floor((Math.random() * 26) + 97));
    };

    const getRandomNumber = () => {
        return `${Math.floor(Math.random() * 10)}`;
    };

    const getRandomSymbol = () => {
        const symbols = '~#$%^&*()_+=-;:{}[]';
        return symbols[Math.floor((Math.random() * symbols.length))];
    };

    const props = {
        lover: getRandomLovercase,
        upper: getRandomUppercase,
        number: getRandomNumber,
        symbol: getRandomSymbol
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function generatePassword(length, lover, upper, number, symbol) {
        let _pass = '';

        const typesArr = [{
            lover
        }, {
            upper
        }, {
            number
        }, {
            symbol
        }].filter(item => Object.values(item)[0]);

        for (let i = 0; i < length; i++) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                _pass += props[funcName]();
            });
        }

        let result = _pass.slice(0, length).split('')

        return shuffle(result).join('');
    }

    function render() {
        const length = +document.querySelector('.js-length').textContent,
            hasLower = document.querySelector('#lovercase').checked,
            hasUpper = document.querySelector('#uppercase').checked,
            hasNumber = document.querySelector('#numbers').checked,
            hasSymbol = document.querySelector('#symbols').checked;
        
        resultWindow.style.fontSize = '2.5rem';   
        if (length > 17 && length <= 22){
            resultWindow.style.fontSize = '1.8rem';
        } else if (length > 22) {
            resultWindow.style.fontSize = '1.2rem';
        }

        const password = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);

        resultWindow.textContent = password;
    }

    let generatedPassword = false;
    passGenerateButton.addEventListener('click', () => {
        generatedPassword = true;
        render();
    })

    document.querySelector('.js-length').textContent = rangeSlider.value;

    rangeSlider.addEventListener('input', () => {
        if (generatedPassword) {
            setTimeout(() => {
                render();
            }, 100)            
        }
        document.querySelector('.js-length').textContent = rangeSlider.value;
    })

    resultWindow.addEventListener("click", () => {
        const textarea = document.createElement("textarea"),
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
    
        setTimeout(() => {
            copyStatus.classList.remove('appear');
        }, 1000)
    });
};

generator();

const title = document.querySelector('.generator__title'),
      titleArr = title.textContent.split(''),
      tlTitle = gsap.timeline();

title.innerHTML = '';

titleArr.forEach(char => {
    title.innerHTML += `<div>${char}</div>`;
});

const newTitleArr = document.querySelectorAll('.generator__title div');

newTitleArr.forEach(el => {
    tlTitle.fromTo(el, {
        y: -100, opacity: 0, scale: 0.5, x: 30
    }, {
        duration: 0.3, ease: "back.out", y: 0, x: 0, scale: 1, opacity: 1, rotateY: 360
    })
})
"use strict";
//# sourceMappingURL=main.js.map
