'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GAP_X = 50;
var GAP_Y = 20;
var FONT_HEIGHT = 15;
var GAP_BAR_Y = CLOUD_HEIGHT - CLOUD_Y;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var FONT_STYLE = 'sans-serif 16px PT Mono';
var TEXT_BASELINE = 'hanging';
var TEXT_WIN = 'Ура вы победили!';
var TEXT_RESULT = 'Список результов:';
var MAX_PERCENT = 80;
var MIN_PERCENT = 0.1;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, font, baseLine, text, x, y) {
  ctx.font = font;
  ctx.textBaseline = baseLine;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomSaturation = function (min, max) {
  return Math.round(Math.random() * (max - min));
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, FONT_STYLE, TEXT_BASELINE, TEXT_WIN, CLOUD_X + GAP_X, CLOUD_Y + GAP);
  renderText(ctx, FONT_STYLE, TEXT_BASELINE, TEXT_RESULT, CLOUD_X + GAP_X, CLOUD_Y + GAP + GAP_Y);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsla(225, 100%,' + getRandomSaturation(MIN_PERCENT, MAX_PERCENT) + '%, 1)';
    }
    ctx.fillRect(CLOUD_X + GAP_X + (BAR_WIDTH + GAP_X) * i, GAP_BAR_Y, BAR_WIDTH, -(BAR_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = '#000';

    ctx.fillText(players[i], CLOUD_X + GAP_X + (BAR_WIDTH + GAP_X) * i, CLOUD_HEIGHT + CLOUD_Y - FONT_HEIGHT);

    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP_X + (BAR_WIDTH + GAP_X) * i, (CLOUD_Y + CLOUD_HEIGHT - GAP_Y - GAP_Y) - (BAR_HEIGHT * times[i]) / maxTime);
  }
};
