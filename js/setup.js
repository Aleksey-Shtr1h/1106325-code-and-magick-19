'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг', 'Вашингтон'];
var wizardCoatsColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardFireBallsColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var numberWizard = 4;

var userDialog = document.querySelector('.setup');

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Массив похожих магов

var wizards = [];

var renderWizardsObj = function (arg) {
  return Math.floor(Math.random() * arg.length);
};

var renderNumberWizard = function (arg) {
  for (var i = 0; i < arg; i++) {
    wizards.push({
      name: wizardNames[renderWizardsObj(wizardNames)],
      lastNames: wizardLastNames[renderWizardsObj(wizardLastNames)],
      coatColor: wizardCoatsColor[renderWizardsObj(wizardCoatsColor)],
      eyesColor: wizardEyesColor[renderWizardsObj(wizardEyesColor)],
    });
  }
  return wizards;
};

renderNumberWizard(numberWizard);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.lastNames;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Обработчик событий

var setupOpen = document.querySelector('.setup-open-icon');
var setupClose = userDialog.querySelector('.setup-close');
var userCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var userEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
var userFireBall = userDialog.querySelector('.setup-fireball-wrap');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY &&
      !evt.target.classList.contains('setup-user-name')) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var changeCollor = function (changeListener, changeArray) {
  changeListener.style.fill = changeArray[renderWizardsObj(changeArray)];
  return changeListener;
};

var changeCoatCollor = function () {
  return changeCollor(userCoat, wizardCoatsColor);
};

var changeEyesCollor = function () {
  return changeCollor(userEyes, wizardEyesColor);
};

var changeFireBallCollor = function () {
  userFireBall.style.backgroundColor = wizardFireBallsColor[renderWizardsObj(wizardFireBallsColor)];
  return userFireBall;
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

userCoat.addEventListener('click', function () {
  changeCoatCollor();
});

userEyes.addEventListener('click', function () {
  changeEyesCollor();
});

userFireBall.addEventListener('click', function () {
  changeFireBallCollor();
});
