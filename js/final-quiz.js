// The scored quiz: one attempt per question, feedback straight away, score after the last answer.
(function () {
  var questions = Array.prototype.slice.call(document.querySelectorAll('.quiz-q'));
  var scoreBox = document.getElementById('quiz-score');
  var scoreText = document.getElementById('quiz-score-text');
  var scoreNote = document.getElementById('quiz-score-note');
  var retake = document.getElementById('quiz-retake');
  var answered = 0;
  var correct = 0;

  function note(score, total) {
    if (score === total) {
      return 'Perfect. You know this material well.';
    }
    if (score >= total * 0.75) {
      return 'Good work. Review the explanations above for the ones you missed.';
    }
    return 'Go back through the Lesson tab, then retake the quiz.';
  }

  questions.forEach(function (question) {
    var buttons = Array.prototype.slice.call(question.querySelectorAll('button'));
    var result = question.querySelector('.result');
    var explanation = question.querySelector('.explanation');

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var right = button.hasAttribute('data-correct');
        var rightButton = question.querySelector('[data-correct]');
        buttons.forEach(function (b) {
          b.disabled = true;
        });
        rightButton.classList.add('right');
        if (right) {
          correct += 1;
          result.textContent = 'Correct.';
        } else {
          button.classList.add('wrong');
          result.textContent = 'Incorrect. The right answer is: ' + rightButton.textContent;
        }
        explanation.hidden = false;
        answered += 1;
        if (answered === questions.length) {
          scoreText.textContent = 'Your score: ' + correct + ' out of ' + questions.length;
          scoreNote.textContent = note(correct, questions.length);
          scoreBox.hidden = false;
        }
      });
    });
  });

  retake.addEventListener('click', function () {
    answered = 0;
    correct = 0;
    scoreBox.hidden = true;
    questions.forEach(function (question) {
      question.querySelector('.result').textContent = '';
      question.querySelector('.explanation').hidden = true;
      Array.prototype.forEach.call(question.querySelectorAll('button'), function (b) {
        b.disabled = false;
        b.classList.remove('right', 'wrong');
      });
    });
    questions[0].scrollIntoView();
  });
})();
