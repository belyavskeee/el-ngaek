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

    $('.arrow-back-error-page').on('click', function () {
      parent.history.back(); return false;
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


  const fileInput = document.getElementById('fileToUpload');
  const customFileUpload = document.getElementById('customFileUpload');
  
  if (fileInput && customFileUpload) {
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
      applyStyles();
      handleFiles(files);
    });
  
    customFileUpload.addEventListener('change', function(e) {
      // Получаем список выбранных файлов
      const files = e.target.files;
      applyStyles();
      handleFiles(files);
    });
  }
  
  // Функция для применения стилей
  function applyStyles() {
    if (!$('.custom-file-upload').hasClass('custom-file-upload-smaller')) {
      $('.custom-file-upload').addClass('custom-file-upload-smaller');
    $('.custom-file-upload').html('<input type="file" name="fileToUpload" id="fileToUpload" accept="image/*">Добавить еще файлы');
    }
  }
  
  // Функция для обработки выбранных файлов
  var allFiles = [];

// Функция для обработки выбранных файлов
function handleFiles(files) {
    // Преобразование files в массив, если он еще не является таковым
    files = Array.from(files);
    // Проверяем общее количество файлов
    if (allFiles.length + files.length > 5) {
      $('.custom-file-upload').html('<input type="file" name="fileToUpload" id="fileToUpload" accept="image/*">Общее число файлов достигнуто максимума');
      
      return;
    }

    allFiles.push(...files);

    files.forEach(function(file) {
      var newItem = $('<div class="item-screenshot" style="animation: fadeIn 0.5s ease-in-out;"><a href="uploads-errors/' + file.name + '" target="_blank"><img src="images/dock-image.svg" alt="Скриншот"></a><p>' + file.name + '</p></div>');
      newItem.attr('id', file.name);
      $('.lits-with-screenshots').append(newItem);
  });
}
  

const textarea = document.getElementById("myTextarea");
const charCount = document.getElementById("charCount");

if (textarea && charCount) {
  // Устанавливаем максимальное количество символов
  const maxChars = 400;

  // Слушаем событие ввода в textarea
  textarea.addEventListener("input", function() {
    // Получаем количество оставшихся символов
    const remainingChars = maxChars - textarea.value.length;
    
    // Обновляем текст в счетчике символов
    charCount.textContent = remainingChars;
    
    // Ограничиваем количество введенных символов
    if (remainingChars < 0) {
      textarea.value = textarea.value.slice(0, maxChars);
      charCount.textContent = 0;
    }
  });
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