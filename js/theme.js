// Light is the default; the saved choice is only a convenience, so storage errors are ignored.
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    button.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme';
  }

  var saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (e) {}
  apply(saved === 'dark' ? 'dark' : 'light');

  button.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  });
})();
