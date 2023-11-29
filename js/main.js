const swiper = new Swiper('.swiper', {
    allowTouchMove: false,
    spacebetween: 150,
  });

    $('.btn-next').on('click', function () {
      swiper.slideNext();
    });

    $('.btn-prev').on('click', function () {
      swiper.slidePrev();
    });

    $('.form-button-go').on('click', function () {
      location.href = "home.html";
    });

    $('.timetable input').on('click', function () {
      location.href = "subject.html";
    });


    document.addEventListener('DOMContentLoaded', function() {
      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ru', // Добавлено свойство для установки локали
        firstDay: 1, // Установка начала недели на понедельник
        headerToolbar: {
          start: 'prev', // Удалите 'today', чтобы убрать кнопку "Today"
          center: 'title',
          end: 'next'
        },
        dateClick: function (info) {
          var prevSelectedDay = document.querySelector('.selected-day');
          if (prevSelectedDay) {
              prevSelectedDay.classList.remove('selected-day');
          }
          info.dayEl.classList.add('selected-day');
          
          var selectedDate = info.date;
          var year = selectedDate.getFullYear();
          var month = selectedDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
          var day = selectedDate.getDate();
          var formattedDate = year + '-' + month + '-' + day;

          console.log('Выбранная дата:', formattedDate);
      }
      });
      calendar.render();
    });
    
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });