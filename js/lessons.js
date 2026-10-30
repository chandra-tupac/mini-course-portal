// Shows one lesson at a time. The URL hash (e.g. #icao) tracks the current lesson.
(function () {
  var lessons = Array.prototype.slice.call(document.querySelectorAll('.lesson'));
  var menu = document.getElementById('lesson-menu');
  var menuToggle = document.getElementById('menu-toggle');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var wide = window.matchMedia('(min-width: 48rem)');
  var current = 0;

  var links = lessons.map(function (lesson, i) {
    var item = document.createElement('li');
    var link = document.createElement('a');
    link.href = '#' + lesson.id;
    link.textContent = lesson.querySelector('h2').textContent;
    item.appendChild(link);
    menu.appendChild(item);
    return link;
  });

  function setMenuOpen(open) {
    menu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
  }

  function show(index, scroll) {
    current = index;
    lessons.forEach(function (lesson, i) {
      lesson.hidden = i !== index;
    });
    links.forEach(function (link, i) {
      if (i === index) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    prev.disabled = index === 0;
    next.disabled = index === lessons.length - 1;
    if (scroll) {
      window.scrollTo(0, 0);
    }
  }

  function fromHash() {
    var id = window.location.hash.slice(1);
    var index = lessons.findIndex(function (lesson) {
      return lesson.id === id;
    });
    show(index === -1 ? 0 : index, false);
  }

  function go(index) {
    window.location.hash = lessons[index].id;
    if (!wide.matches) {
      setMenuOpen(false);
    }
  }

  prev.addEventListener('click', function () {
    go(current - 1);
  });
  next.addEventListener('click', function () {
    go(current + 1);
  });
  menuToggle.addEventListener('click', function () {
    setMenuOpen(menu.hidden);
  });
  menu.addEventListener('click', function () {
    if (!wide.matches) {
      setMenuOpen(false);
    }
  });
  window.addEventListener('hashchange', function () {
    fromHash();
    window.scrollTo(0, 0);
  });
  wide.addEventListener('change', function () {
    setMenuOpen(wide.matches);
  });

  setMenuOpen(wide.matches);
  fromHash();
})();
