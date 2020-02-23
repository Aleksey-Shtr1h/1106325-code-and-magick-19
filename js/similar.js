'use strict';

(function () {
  var wizardCoatsColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var wizardEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
  var wizardFireBallsColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var userDialog = document.querySelector('.setup');
  var userCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var userEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var userFireBall = userDialog.querySelector('.setup-fireball-wrap');
  var inputCoatCollor = userDialog.querySelector('.setup-wizard-appearance input[name = coat-color]');
  var inputEyeCollor = userDialog.querySelector('.setup-wizard-appearance input[name = eyes-color]');
  var inputFireballCollor = userDialog.querySelector('.setup-fireball-wrap input[name = fireball-color]');
  var form = userDialog.querySelector('.setup-wizard-form');

  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {

    window.render.renderWizard(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  // Изменение мага пользователя в форме

  var changeCollor = function (changeListener, changeArray, changeInput) {
    changeListener.style.fill = changeArray[renderWizardsObj(changeArray)];
    changeInput.value = changeListener.style.fill;
    return changeListener;
  };

  var changeCoatCollor = function () {
    return changeCollor(userCoat, wizardCoatsColor, inputCoatCollor);
  };

  var changeEyesCollor = function () {
    return changeCollor(userEyes, wizardEyesColor, inputEyeCollor);
  };

  var changeFireBallCollor = function () {
    var hexValue = wizardFireBallsColor[renderWizardsObj(wizardFireBallsColor)];
    userFireBall.style.backgroundColor = hexValue;
    inputFireballCollor.value = hexValue;
    return userFireBall;
  };

  userCoat.addEventListener('click', function () {
    var elementClick = changeCoatCollor();
    coatColor = elementClick.style.fill;
    window.debounce(updateWizards);
  });

  userEyes.addEventListener('click', function () {
    var elementClick = changeEyesCollor();
    eyesColor = elementClick.style.fill;
    window.debounce(updateWizards);
  });

  userFireBall.addEventListener('click', function () {
    changeFireBallCollor();
  });

  var renderWizardsObj = function (arg) {
    return Math.floor(Math.random() * arg.length);
  };

  // HTTP

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var formHandler = function (evt) {
    var formDataPost = new FormData(form);
    var buttonSubmit = document.querySelector('.setup-submit');
    buttonSubmit.textContent = 'Отправка данных...';
    buttonSubmit.disabled = true;
    window.backend.save(formDataPost, function () {
      userDialog.classList.add('hidden');
      buttonSubmit.textContent = 'Сохранить';
      buttonSubmit.disabled = false;
    }, errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', formHandler);
  window.backend.load(successHandler, errorHandler);

})();
