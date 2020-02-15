'use strict';
(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var wizardCoatsColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var wizardEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
  var wizardFireBallsColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var numberWizard = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open-icon');
  var setupClose = userDialog.querySelector('.setup-close');
  var userCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var userEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var userFireBall = userDialog.querySelector('.setup-fireball-wrap');
  var inputCoatCollor = userDialog.querySelector('.setup-wizard-appearance input[name = coat-color]');
  var inputEyeCollor = userDialog.querySelector('.setup-wizard-appearance input[name = eyes-color]');
  var inputFireballCollor = userDialog.querySelector('.setup-fireball-wrap input[name = fireball-color]');
  var dialogHandler = userDialog.querySelector('.upload');
  var topStartCoord;
  var leftStartCoord;
  var form = userDialog.querySelector('.setup-wizard-form');

  // Открытие и закрытие формы

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY && !evt.target.classList.contains('setup-user-name')) {
      closePopup();
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    topStartCoord = userDialog.offsetTop;
    leftStartCoord = userDialog.offsetLeft;
    return [topStartCoord, leftStartCoord];
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);

    userDialog.style.top = topStartCoord + 'px';
    userDialog.style.left = leftStartCoord + 'px';
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });

  // Создание похожих магов в форме

  var renderWizardsObj = function (arg) {
    return Math.floor(Math.random() * arg.length);
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < numberWizard; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
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

  window.backend.load(successHandler, errorHandler);

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
    changeCoatCollor();
  });

  userEyes.addEventListener('click', function () {
    changeEyesCollor();
  });

  userFireBall.addEventListener('click', function () {
    changeFireBallCollor();
  });

  // Передвижение формы по нажатию

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      function getCoordStyle(x, y) {
        return y ? (userDialog.offsetTop - shift.y) + 'px' : (userDialog.offsetLeft - shift.x) + 'px';
      }

      userDialog.style.top = getCoordStyle(false, true);
      userDialog.style.left = getCoordStyle(true, false);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
