'use strict';
(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open-icon');
  var setupClose = userDialog.querySelector('.setup-close');
  var dialogHandler = userDialog.querySelector('.upload');
  var topStartCoord;
  var leftStartCoord;

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
