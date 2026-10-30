// Switches between the Lesson, Quiz and Simulator tabs on the same page.
// The URL hash picks the tab: #quiz, #simulator, or a lesson id (e.g. #icao) for the Lesson tab.
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var lessonIds = Array.prototype.map.call(document.querySelectorAll('.lesson'), function (l) {
    return l.id;
  });
  var lastLesson = lessonIds[0];

  function show(name) {
    tabs.forEach(function (tab) {
      var on = tab.getAttribute('data-tab') === name;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !on;
    });
  }

  function fromHash() {
    var id = window.location.hash.slice(1);
    if (lessonIds.indexOf(id) !== -1) {
      lastLesson = id;
    }
    show(id === 'quiz' || id === 'simulator' ? id : 'lesson');
  }

  function choose(name) {
    var target = name === 'lesson' ? lastLesson : name;
    if (window.location.hash === '#' + target) {
      show(name);
    } else {
      window.location.hash = target;
    }
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      choose(tab.getAttribute('data-tab'));
    });
    tab.addEventListener('keydown', function (event) {
      var step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (step) {
        var other = tabs[(i + step + tabs.length) % tabs.length];
        other.focus();
        choose(other.getAttribute('data-tab'));
      }
    });
  });

  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
