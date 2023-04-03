jQuery.validator.addMethod("lettersonly", function (value, element) {
  let chunks = value.split(' ')

  if (chunks.length === 3 && chunks.indexOf('') === -1) {
    return true
  } else {
    return false
  }
}, "Введите корректное ФИО");

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

let swiperProgram = new Swiper(".slider-program", {
  autoHeight: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: '.swiper-pagination',
    spaceBetween: 20
  },
});

let swiperPagination = new Swiper(".swiper.program-pagination", {
  slidesPerView: 4,
  navigation: false,

  breakpoints: {
    576: {
      spaceBetween: 20,
    },

    300: {
      spaceBetween: 0,
    }
  }
});

let pagination = document.querySelectorAll('.program-pagination-bullet');

pagination.forEach((item, index) => {
  let parent = item.closest('.program-pagination')

  parent.addEventListener('click', () => {
    swiperProgram.slideTo(index)

    if (index === 2) {
      swiperPagination.slideTo(index)
    }
  })
})

swiperProgram.on('slideChange', function () {
  let index = swiperProgram.activeIndex


  swiperPagination.slideTo(index)

  pagination.forEach(item => {
    item.classList.remove('active')
  })

  pagination[index].classList.add('active')
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

      let arr = e.target.classList;
      let id = Array.from(arr).filter(word => word == className)

      if (id.length) {
        document.getElementById(id[0]).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
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

let btnShow = document.querySelectorAll('.ui-more')

if(btnShow.length) {
  btnShow.forEach(btn => {
    btn.addEventListener('click', (e) => {
      let parent = btn.closest('.program-content')
      let list = parent.querySelector('.program-content-more')

      list.classList.toggle('hidden')

      swiperProgram.update()

      if (btn.innerHTML === 'Подробнее') {
        btn.textContent = 'Скрыть'
      } else {
        btn.textContent = 'Подробнее'
      }
    })
  })
}
