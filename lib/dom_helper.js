"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

NodeList.prototype.__proto__ = Array.prototype;
HTMLCollection.prototype.__proto__ = Array.prototype;

Node.prototype.on = function(name, fn) {
  this.addEventListener(name, fn);
  return this;
};

NodeList.prototype.on = NodeList.prototype.addEventListener = function(name, fn) {
  this.forEach(elem => elem.on(name, fn));
  return this;
};
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}
if(!("previousElementSibling" in document.documentElement)){
  Object.defineProperty(Element.prototype, "previousElementSibling", {
    get: function(){
      var e = this.previousSibling;
      while(e && 1 !== e.nodeType)
        e = e.previousSibling;
      return e;
    }
  });
};
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('previousElementSibling')) {
      return;
    }
    Object.defineProperty(item, 'previousElementSibling', {
      configurable: true,
      enumerable: true,
      get: function () {
        let el = this;
        while (el = el.previousSibling) {
          if (el.nodeType === 1) {
            return el;
          }
        }
        return null;
      },
      set: undefined
    });
  });
})([Element.prototype, CharacterData.prototype]);
if(!("nextElementSibling" in document.documentElement)){
  Object.defineProperty(Element.prototype, "nextElementSibling", {
      get: function(){
          var e = this.nextSibling;
          while(e && 1 !== e.nodeType)
              e = e.nextSibling;
          return e;
      }
  });
};
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('nextElementSibling')) {
      return;
    }
    Object.defineProperty(item, 'nextElementSibling', {
      configurable: true,
      enumerable: true,
      get: function () {
        var el = this;
        while (el = el.nextSibling) {
          if (el.nodeType === 1) {
              return el;
          }
        }
        return null;
      },
      set: undefined
    });
  });
})([Element.prototype, CharacterData.prototype]);
