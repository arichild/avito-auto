jQuery.validator.addMethod("lettersonly", function (value, element) {
  return this.optional(element) || /^([а-яё ]+|[a-z ]+)$/i.test(value);
}, "Поле может состоять из букв и пробелов, без цифр");

jQuery.validator.addMethod("phone", function (value, element) {
  if (value.startsWith('+375')) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/i.test(value);
  } else if (value.startsWith('+7')) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/i.test(value);
  } else {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(value);
  }
}, "Введите полный номер");

$.validator.messages.required = 'Пожалуйста, введите данные';

if (document.getElementById('phone')) {
  let phone = document.getElementById('phone')

  let phoneMask = IMask(phone, {
    mask: [
      {
        mask: '+{375} (00) 000 00 00',
        startsWith: '375',
        overwrite: true,
        lazy: false,
        placeholderChar: '_',
      },
      {
        mask: '+{7} (000) 000 00 00',
        startsWith: '7',
        overwrite: true,
        lazy: false,
        placeholderChar: '_',
      },
      {
        mask: '0000000000000',
        startsWith: '',
        country: 'unknown'
      }
    ],

    dispatch: function (appended, dynamicMasked) {
      var number = (dynamicMasked.value + appended).replace(/\D/g, '');

      return dynamicMasked.compiledMasks.find(function (m) {
        return number.indexOf(m.startsWith) === 0;
      });
    }
  })
}

let swiper = new Swiper(".swiper-program", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let pagination = document.querySelectorAll('.program-pagination');

if (pagination.length) {
  pagination.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      let parent = item.closest('.program-control')
      let bulletActive = parent.querySelector('.program-pagination-bullet.active')
      let bullet = item.querySelector('.program-pagination-bullet')

      swiper.slideTo(index)

      bulletActive.classList.remove('active')
      bullet.classList.add('active')
    })
  })
}

swiper.on('slideChange', function () {
  let index = swiper.activeIndex
  let previousIndex = swiper.previousIndex

  let parent = pagination[index]
  let bullet = parent.querySelector('.program-pagination-bullet')
  let parentPrevious = pagination[previousIndex]
  let bulletPrevious = parentPrevious.querySelector('.program-pagination-bullet.active')

  bulletPrevious.classList.remove('active')
  bullet.classList.add('active')
});

const tabs = document.querySelector('.ui-tab');
const content = document.querySelectorAll('.ui-tabcontent');

if(tabs || content.length) {
  tabs.addEventListener('click', (e) => {
    const currTab = e.target.dataset.tab;
    const tab = e.target;
    const tabContent = content[currTab - 1]

    if (!currTab) {
      return;
    }

    tab.classList.toggle('active')
    tabContent.classList.toggle('active')
  })
}

const anchors = document.querySelectorAll('a.ui-btn')

function blockTo(className) {
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      let arr = anchor.classList;
      let id = Array.from(arr).filter(word => word == className)

      document.getElementById(id[0]).scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    })
  }
}

if (anchors.length) {
  blockTo("avito-form")
  blockTo("avito-program")
  blockTo("avito-description")
}

function showPopup() {
  $.magnificPopup.open({
    items: { src: './popup/success.html' },
    type: 'ajax',
    overflowY: 'scroll',
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    ajax: {
      tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
    },
    callbacks: {
      open: function () {
        setTimeout(function () {
          $('.mfp-wrap').addClass('not_delay');
          $('.white-popup').addClass('not_delay');
        }, 700);
      }
    }
  });
}