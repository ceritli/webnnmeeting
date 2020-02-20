(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.Stats = factory())
}(this, (function() {
  'use strict';
  var fps = document.querySelector('#fps');
  var Stats = function() {
      var beginTime = (performance || Date).now(),
          prevTime = beginTime,
          frames = 0;
      var fpsPanel = new Stats.Panel();
      return {
          begin: function() {
              beginTime = (performance || Date).now()
          },
          end: function() {
              frames++;
              var time = (performance || Date).now();
              if (time > prevTime + 1000) {
                  fpsPanel.update((frames * 1000) / (time - prevTime), 100);
                  prevTime = time;
                  frames = 0
              }
              return time
          },
          update: function() {
              beginTime = this.end()
          }
      }
  };
  Stats.Panel = function() {
      var min = Infinity,
          max = 0,
          round = Math.round;
      return {
          update: function(value, maxValue) {
              min = Math.min(min, value);
              max = Math.max(max, value);
              var fpsnow = round(value);
              fps.innerHTML = fpsnow + ' FPS'
          }
      }
  };
  return Stats
})));