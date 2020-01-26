'use strict';
var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг', 'Вашингтон'];
var wizardCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColor = ['black', 'red', 'blue', 'yellow'];

var renderWizardsObj = function (arg) {
  return Math.floor(Math.random() * arg.length);
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var closeButton = document.querySelector('.setup-close');
closeButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  userDialog.classList.add('hidden');
});

var wizards = [
  {
    name: wizardNames[renderWizardsObj(wizardNames)],
    lastNames: wizardLastNames[renderWizardsObj(wizardLastNames)],
    coatColor: wizardCoatColor[renderWizardsObj(wizardCoatColor)],
    eyesColor: wizardEyesColor[renderWizardsObj(wizardEyesColor)],
  },
  {
    name: wizardNames[renderWizardsObj(wizardNames)],
    lastNames: wizardLastNames[renderWizardsObj(wizardLastNames)],
    coatColor: wizardCoatColor[renderWizardsObj(wizardCoatColor)],
    eyesColor: wizardEyesColor[renderWizardsObj(wizardEyesColor)],
  },
  {
    name: wizardNames[renderWizardsObj(wizardNames)],
    lastNames: wizardLastNames[renderWizardsObj(wizardLastNames)],
    coatColor: wizardCoatColor[renderWizardsObj(wizardCoatColor)],
    eyesColor: wizardEyesColor[renderWizardsObj(wizardEyesColor)],
  },
  {
    name: wizardNames[renderWizardsObj(wizardNames)],
    lastNames: wizardLastNames[renderWizardsObj(wizardLastNames)],
    coatColor: wizardCoatColor[renderWizardsObj(wizardCoatColor)],
    eyesColor: wizardEyesColor[renderWizardsObj(wizardEyesColor)],
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name + ' ' + wizards[i].lastNames;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
