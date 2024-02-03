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
      location.href = "timetable.html";
    });

    $('.block-timetable-subject').on('click', function () {
      location.href = "subject.html";
    });

    $('.list-subject input').on('click', function () {
      location.href = "detail-subject.html";
    });

    $('.img-header-set').on('click', function () {
      location.href = "settings.html";
      $(this).css({'transform': 'rotate(180deg)'});
    });

    $('.btn-calendar').on('click', function () {
      var currentDate = selectedDate;
      updateDateInputs(todayDateInput, currentDate);
    
      // Следующий день
      var tomorrowDate = new Date(currentDate);
      tomorrowDate.setDate(currentDate.getDate() + 1);
      updateDateInputs(tomorrowDateInput, tomorrowDate);
    });

    $('.timetable-btn').on('click', function () {
        var image = $(this).find('img');

        // Меняем атрибут src на новый путь к изображению
        image.attr('src', 'images/note2.svg');
        $(this).addClass('active-timetable-btn');
        location.href = "timetable.html";
    });

    var todayDateInput, tomorrowDateInput, selectedDate;
    var todayDateInput = $("#today-date-timetable");
    var tomorrowDateInput = $("#tomorrow-date-timetable");
    function updateDateInputs(inputElement, date) {
      // Получаем месяц (возвращает число от 0 до 11)
      var month = date.getMonth();
      var dayOfMonth = date.getDate();
      // Получаем день недели (возвращает число от 0 до 6)
      var dayOfWeek = date.getDay();
    
      // Преобразуем числа в текстовые значения
      var monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      var dayOfWeekNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    
      var monthName = monthNames[month];
      var dayOfWeekName = dayOfWeekNames[dayOfWeek];
    
      // Обновляем значения элементов
      (inputElement).val(dayOfWeekName + ', ' + dayOfMonth + ' ' + monthName);
    }

  function initializeCalendar() {
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

        datesSet: function (info) {
          var currentDate = calendar.getDate();
          updateDateInputs(todayDateInput, currentDate);
    
          // Следующий день
          var tomorrowDate = new Date(currentDate);
          tomorrowDate.setDate(currentDate.getDate() + 1);
          updateDateInputs(tomorrowDateInput, tomorrowDate);
        },

        dateClick: function (info) {
          var prevSelectedDay = document.querySelector('.selected-day');
          if (prevSelectedDay) {
              prevSelectedDay.classList.remove('selected-day');
          }
          info.dayEl.classList.add('selected-day');
          
          selectedDate = info.date;

      }
      });
      calendar.render();
    });
  }

  //обработка файлов для страницы отправки ошибок
  const customFileUpload = document.getElementById('customFileUpload');

  customFileUpload.addEventListener('dragover', function (e) {
      e.preventDefault();
      this.classList.add('drag-over');
  });
  
  customFileUpload.addEventListener('dragleave', function () {
      this.classList.remove('drag-over');
  });
  
  customFileUpload.addEventListener('drop', function (e) {
      e.preventDefault();
      this.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      const fileInput = document.getElementById('fileToUpload');
      fileInput.files = files;
  });
  
  function updateLabel(input) {
      // Ваша логика для обновления метки
  }
  
  


  // Проверяем, находимся ли мы на нужной странице
  if (document.body.classList.contains('calendar-page')) {
    initializeCalendar();
  }
    
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