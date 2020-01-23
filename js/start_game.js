var fireballSize = 22;
var wizardSpeed  = 3;
var wizardWidth  = 70;
var wizardWidthFactor = 1.337;

var getFireballSpeed = function (left) {
  return left ? 5 : 2;
}

var getWizardHeight = function () {
  return wizardWidth * wizardWidthFactor;
}

function getWizardX (width) {
  return 0.5 * (width - wizardWidth);
}

function getWizardY (height) {
  return (height *  1 / 3);
}
