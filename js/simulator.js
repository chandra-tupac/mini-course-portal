// Registration simulator: turns the five answers into a list of problems or a to-do list.
(function () {
  var form = document.getElementById('sim-form');
  var result = document.getElementById('sim-result');
  var qualified = { 'sg-citizen': true, 'cw-citizen': true, 'sg-company': true };

  function answers() {
    var data = new FormData(form);
    return {
      owner: data.get('owner'),
      history: data.get('history'),
      type: data.get('type'),
      use: data.get('use'),
      later: data.get('later')
    };
  }

  function heading(text) {
    var h = document.createElement('h3');
    h.textContent = text;
    return h;
  }

  function list(items) {
    var ul = document.createElement('ul');
    items.forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
    return ul;
  }

  function blockers(a) {
    var found = [];
    if (!qualified[a.owner]) {
      found.push('This owner is not a qualified person. Only the Government, citizens of Singapore, citizens of any Commonwealth country, and bodies incorporated in Singapore or the Commonwealth with their principal place of business in the Commonwealth can own a Singapore-registered aircraft (ANO paragraph 4). This course covers only that main rule.');
    }
    if (a.history === 'active') {
      found.push('An aircraft shall not be registered in Singapore if it is registered outside Singapore and that registration does not end by operation of law (ANO paragraph 4). The applicant must first show proof that the foreign registration has been cancelled (SAR Chapter 1.3).');
    }
    return found;
  }

  function steps(a) {
    var registration = [
      'The Chief Executive (the DGCA/CEO of CAAS) is the authority that registers the aircraft.',
      'Apply on Form CAAS(AW) 39 and submit it to CAAS. The fee is in the ANO\'s Twelfth Schedule.'
    ];
    if (a.history === 'new') {
      registration.push('Proof needed: show that the aircraft has never been registered elsewhere.');
    } else {
      registration.push('Proof needed: show that the foreign registration has been cancelled.');
    }
    if (a.owner === 'sg-company') {
      registration.push('As a company, the Managing Director, Company Secretary or an official authorised to sign under the company seal must sign.');
    }
    registration.push('You will receive a Certificate of Registration (CoR), which is normally kept on board the aircraft. Registration is a one-off exercise unless ownership changes.');

    var marks = [
      'The nationality mark is 9V. The DGCA/CEO assigns three letters, giving a registration such as 9V-XXX.',
      'The marks must be painted or affixed before the aircraft flies. A fixed-wing aircraft carries them on the lower surface of the port wing and on each side of the fuselage between the wing and the tail.',
      'The nationality and registration marks, with the owner\'s name and address, are also inscribed on a fireproof plate fixed to the aircraft.'
    ];

    var noise;
    if (a.use === 'testing') {
      noise = ['Because the flights are only for the purposes allowed under the A or B conditions, the aircraft can fly without a noise certificate. If it will ever be flown in normal operation, a noise certificate is needed first (ANO Part VI).'];
    } else {
      noise = [
        'A Singapore-registered aircraft shall not operate without a noise certificate (ANO Part VI).',
        'Apply on Form CAAS(AW) 143, together with the registration. Your application must show that ' + a.type + ' complies with the matching chapters of Part II of ICAO Annex 16, Volume 1.',
        'Supporting documents can include a noise certificate from the State of Design, or a statement in the Flight Manual or Type Certificate.',
        'Carry the noise certificate on board the aircraft.'
      ];
    }

    var later;
    if (a.later === 'sold') {
      later = [
        'A new CoR must be issued. The new owner applies on Form CAAS(AW) 39.',
        'The former owner completes Section I or II on the back of the original CoR and returns it to the DGCA.',
        'The aircraft must not be flown until the new CoR has been issued.'
      ];
    } else if (a.later === 'destroyed') {
      later = [
        'The registered owner must promptly tell the Chief Executive in writing.',
        'To cancel the registration, the owner completes Section III (aircraft destroyed or permanently withdrawn from use) on the back of the original CoR and returns it to the DGCA.',
        'Only the owner can ask for a registration to be cancelled.'
      ];
    } else {
      later = ['Nothing more is needed. The registration stays in force until something changes.'];
    }

    return [
      ['Registering the aircraft', registration],
      ['Marking the aircraft', marks],
      ['Noise certificate', noise],
      ['Later on', later]
    ];
  }

  function render() {
    var a = answers();
    result.textContent = '';
    if (!a.owner || !a.history || !a.type || !a.use || !a.later) {
      var hint = document.createElement('p');
      hint.textContent = 'Answer all five questions to see the result.';
      result.appendChild(hint);
      return;
    }
    var problems = blockers(a);
    if (problems.length) {
      result.appendChild(heading('Result: this aircraft cannot be registered'));
      result.appendChild(list(problems));
      var tip = document.createElement('p');
      tip.textContent = 'Try changing your answers to see what would make registration possible.';
      result.appendChild(tip);
      return;
    }
    result.appendChild(heading('Result: this aircraft can be registered in Singapore'));
    steps(a).forEach(function (step) {
      result.appendChild(heading(step[0]));
      result.appendChild(list(step[1]));
    });
  }

  form.addEventListener('change', render);
  form.addEventListener('reset', function () {
    // Reset clears the inputs after this event, so render on the next tick.
    setTimeout(render, 0);
  });
  render();
})();
