// Quick check questions: instant feedback, no score. A wrong answer can be retried.
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('.question'), function (question) {
    var buttons = Array.prototype.slice.call(question.querySelectorAll('button'));
    var result = question.querySelector('.result');
    var explanation = question.querySelector('.explanation');

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        if (button.hasAttribute('data-correct')) {
          button.classList.add('right');
          result.textContent = 'Correct.';
          explanation.hidden = false;
          buttons.forEach(function (b) {
            b.disabled = true;
          });
        } else {
          button.classList.add('wrong');
          button.disabled = true;
          result.textContent = 'Not quite. Try another answer.';
        }
      });
    });
  });
})();
