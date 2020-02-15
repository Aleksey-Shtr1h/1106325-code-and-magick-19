'use strict';

(function () {

  window.fireballSize = 22;
  window.wizardSpeed = 3;
  window.wizardWidth = 70;
  var wizardWidthFactor = 1.337;

  window.getFireballSpeed = function (left) {
    return left ? 5 : 2;
  };

  window.getWizardHeight = function () {
    return window.wizardWidth * wizardWidthFactor;
  };

  window.getWizardX = function (width) {
    return 0.5 * (width - window.wizardWidth);
  };

  window.getWizardY = function (height) {
    return (height / 3);
  };
})();
