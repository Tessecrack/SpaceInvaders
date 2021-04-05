// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/sprite_map/sprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function Sprite(x, y, w, h) {
  _classCallCheck(this, Sprite);

  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};

exports.default = Sprite;
},{}],"src/sprite_map/sprite_map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sprite = _interopRequireDefault(require("./sprite.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SpriteMap = /*#__PURE__*/function () {
  function SpriteMap(sourceImage, countOfPositionsWidth, countOfPositionsHeight, scaleX, scaleY) {
    _classCallCheck(this, SpriteMap);

    this.sourceImage = sourceImage;
    this.countOfPositionsWidth = countOfPositionsWidth;
    this.countOfPositionsHeight = countOfPositionsHeight;
    this.widthOneSprite = sourceImage.width / countOfPositionsWidth;
    this.heightOneSprite = sourceImage.height / countOfPositionsHeight;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.w = this.widthOneSprite * this.scaleX;
    this.h = this.heightOneSprite * this.scaleY;
    this.positions = this._positions();
  }

  _createClass(SpriteMap, [{
    key: "_positions",
    value: function _positions() {
      var listOfSprites = [];

      for (var y = 0; y < this.sourceImage.height; y += this.heightOneSprite) {
        for (var x = 0; x < this.sourceImage.width; x += this.widthOneSprite) {
          listOfSprites.push(new _sprite.default(x, y, this.widthOneSprite, this.heightOneSprite));
        }
      }

      return listOfSprites;
    }
  }, {
    key: "draw",
    value: function draw(context, numberPosition, x, y) {
      context.drawImage(this.sourceImage, this.positions[numberPosition].x, this.positions[numberPosition].y, this.widthOneSprite, this.heightOneSprite, x, y, this.widthOneSprite * this.scaleX, this.heightOneSprite * this.scaleY);
    }
  }]);

  return SpriteMap;
}();

exports.default = SpriteMap;
},{"./sprite.js":"src/sprite_map/sprite.js"}],"src/collision_manager/collisionManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collisionFunction = collisionFunction;

function collisionFunction(firstObject, secondObject) {
  //формула Хари
  return objectIntersectsObject(firstObject, secondObject) || objectIntersectsObject(secondObject, firstObject);
}

function objectIntersectsObject(firstObject, secondObject) {
  var vertexThis = firstObject.vertexes;
  var vertexOther = secondObject.vertexes;

  for (var i = 0; i < vertexThis.length; i++) {
    var x0 = vertexThis[i].x;
    var y0 = vertexThis[i].y;

    for (var j = 0; j < vertexOther.length; j++) {
      if (dist(vertexThis[i].x, vertexThis[i].y, vertexOther[j].x, vertexOther[j].y) <= 5) return true;
      var xA = vertexOther[j].x;
      var yA = vertexOther[j].y;
      var xB = vertexOther[j + 1 == vertexOther.length ? 0 : j + 1].x;
      var yB = vertexOther[j + 1 == vertexOther.length ? 0 : j + 1].y;
      var t = ((x0 - xA) * (xB - xA) + (y0 - yA) * (yB - yA)) / (Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
      if (t < 0) t = 0;
      if (t > 1) t = 1;
      var l = Math.sqrt(Math.pow(xA - x0 + (xB - xA) * t, 2) + Math.pow(yA - y0 + (yB - yA) * t, 2));
      if (l <= 2) return true;
    }
  }

  return false;
}

function dist(x1, y1, x2, y2) {
  var o1 = y1 - y2;
  var o2 = x1 - x2;
  return Math.sqrt(o1 * o1 + o2 * o2);
}
},{}],"src/collision_manager/vertex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vertex = function Vertex(x, y) {
  _classCallCheck(this, Vertex);

  this.x = x;
  this.y = y;
};

exports.default = Vertex;
},{}],"src/player/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var collision_manager = _interopRequireWildcard(require("../collision_manager/collisionManager.js"));

var _vertex = _interopRequireDefault(require("../collision_manager/vertex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = /*#__PURE__*/function () {
  function Player(spriteMap, beginPositionX, beginPositionY) {
    _classCallCheck(this, Player);

    this.x = beginPositionX;
    this.y = beginPositionY;
    this.vx = 5;
    this.vy = 3;
    this.spriteMap = spriteMap;
    this.scaleX = this.spriteMap.scaleX;
    this.scaleY = this.spriteMap.scaleY;
    this.w = this.spriteMap.widthOneSprite * this.scaleX;
    this.h = this.spriteMap.heightOneSprite * this.scaleY;
    this.isWalks = false;
    this.direction = 1; //1 - down, 4 - left, 7 - right, 10 - up

    this.health = 100;
    this.underBunker = true;
  }

  _createClass(Player, [{
    key: "moveUp",
    value: function moveUp(time) {
      this.y -= this.vy;
      if (!this.isWalks) this.direction = 10;else this.direction = Math.ceil(time / 100) % 2 === 0 ? 9 : 11;
    }
  }, {
    key: "moveDown",
    value: function moveDown(time) {
      this.y += this.vy;
      if (!this.isWalks) this.direction = 1;else this.direction = Math.ceil(time / 100) % 2 === 0 ? 2 : 0;
    }
  }, {
    key: "moveRight",
    value: function moveRight(time) {
      this.x += this.vx;
      if (!this.isWalks) this.direction = 7;else this.direction = Math.ceil(time / 100) % 2 === 0 ? 8 : 6;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft(time) {
      this.x -= this.vx;
      if (!this.isWalks) this.direction = 4;else this.direction = Math.ceil(time / 100) % 2 === 0 ? 5 : 3;
    }
  }, {
    key: "draw",
    value: function draw(context) {
      this.spriteMap.draw(context, this.direction, this.x, this.y, this.scaleX, this.scaleY);
    }
  }, {
    key: "intersectsWithBunkers",
    value: function intersectsWithBunkers(objects) {
      for (var i = 0; i < objects.length; i++) {
        if (this.x + this.w > objects[i].x && this.x < objects[i].x + objects[i].w && this.y <= objects[i].y + objects[i].h / 2) {
          return "top";
        }
      }

      return "none";
    }
  }, {
    key: "intersects",
    value: function intersects(object) {
      return collision_manager.collisionFunction(this, object);
    }
  }, {
    key: "vertexes",
    get: function get() {
      var vertexes = [new _vertex.default(this.x, this.y), new _vertex.default(this.x + this.w, this.y), new _vertex.default(this.x + this.w, this.y + this.h), new _vertex.default(this.x, this.y + this.h)];
      return vertexes;
    }
  }]);

  return Player;
}();

exports.default = Player;
},{"../collision_manager/collisionManager.js":"src/collision_manager/collisionManager.js","../collision_manager/vertex.js":"src/collision_manager/vertex.js"}],"src/aliens/alien.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var collision_manager = _interopRequireWildcard(require("../collision_manager/collisionManager.js"));

var _vertex = _interopRequireDefault(require("../collision_manager/vertex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Alien = /*#__PURE__*/function () {
  function Alien() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var spriteMap = arguments.length > 2 ? arguments[2] : undefined;
    var vx = arguments.length > 3 ? arguments[3] : undefined;
    var vy = arguments.length > 4 ? arguments[4] : undefined;
    var health = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, Alien);

    this.x = x;
    this.y = y;
    this.spriteMap = spriteMap;
    this.vx = vx;
    this.vy = vy;
    this.scaleX = this.spriteMap.scaleX;
    this.scaleY = this.spriteMap.scaleY;
    this.direction = 1;
    this.w = this.spriteMap.widthOneSprite * this.scaleX;
    this.h = this.spriteMap.heightOneSprite * this.scaleY;
    this.bullet;
    this.health = health;
    this._timeAnimation = 0;
    this.isDamage = false;
  }

  _createClass(Alien, [{
    key: "move",
    value: function move(vx, vy) {
      this.x += vx;
      this.y += vy;
    }
  }, {
    key: "draw",
    value: function draw(context, time) {
      var roundTime = Math.ceil(time / 1000);

      if (roundTime > this._timeAnimation) {
        var countOfDirections = this.spriteMap.countOfPositionsHeight * this.spriteMap.countOfPositionsWidth - 1;
        this.direction = this.direction >= countOfDirections ? 0 : this.direction + 1;
        this._timeAnimation = roundTime;
      }

      this.spriteMap.draw(context, this.direction, this.x, this.y);
      if (this.isDamage) this.drawDamage(context);
      this.isDamage = false;
    }
  }, {
    key: "drawDamage",
    value: function drawDamage(context) {
      context.beginPath();
      context.lineWidth = "5";
      context.strokeStyle = "#ff3333";
      context.strokeRect(this.x, this.y, this.w, this.h);
      context.stroke();
      context.closePath();
    }
  }, {
    key: "intersects",
    value: function intersects(object) {
      return collision_manager.collisionFunction(this, object);
    }
  }, {
    key: "vertexes",
    get: function get() {
      var vertexes = [new _vertex.default(this.x, this.y), new _vertex.default(this.x + this.w, this.y), new _vertex.default(this.x + this.w, this.y + this.h), new _vertex.default(this.x, this.y + this.h)];
      return vertexes;
    }
  }]);

  return Alien;
}();

exports.default = Alien;
},{"../collision_manager/collisionManager.js":"src/collision_manager/collisionManager.js","../collision_manager/vertex.js":"src/collision_manager/vertex.js"}],"src/aliens/alien_squad.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _alien = _interopRequireDefault(require("./alien.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SquadAliens = /*#__PURE__*/function () {
  function SquadAliens(enemyTypes, countOfMonsters, colorBullet, zoneX, zoneY, zoneWidth, zoneHeight) {
    _classCallCheck(this, SquadAliens);

    this.enemyTypes = enemyTypes;
    this.countOfTypes = enemyTypes.length;
    this.countOfMonsters = countOfMonsters;
    this.colorBullet = colorBullet;
    this.zoneX = zoneX;
    this.zoneY = zoneY;
    this.zoneWidth = zoneWidth;
    this.zoneHeight = zoneHeight;
    this.listOfMonsters = this._setListOfMonster();
    this.isWin = false;
    this.directionRight = true;
  }

  _createClass(SquadAliens, [{
    key: "_setListOfMonster",
    value: function _setListOfMonster() {
      var list = [];
      var beginPositionY = 0;

      for (var typeMonster = 0; typeMonster < this.countOfTypes; typeMonster++) {
        var beginPositionX = this.zoneWidth / 2 - this.enemyTypes[typeMonster].w / 2 * this.countOfMonsters;

        for (var numberMoster = 0; numberMoster < this.countOfMonsters; numberMoster++) {
          var enemy = new _alien.default(beginPositionX + this.enemyTypes[typeMonster].w * numberMoster, beginPositionY, this.enemyTypes[typeMonster].spriteMap, this.enemyTypes[typeMonster].vx, this.enemyTypes[typeMonster].vy, this.enemyTypes[typeMonster].health);
          list.push(enemy);
        }

        beginPositionY += this.enemyTypes[typeMonster].h;
      }

      return list;
    }
  }, {
    key: "move",
    value: function move(time) {
      var vx = 1;
      var vy = 0.01;

      if (Math.ceil(time / 1000) % 2 == 0) {
        for (var i = this.listOfMonsters.length - 1; i >= 0; i--) {
          if (this.listOfMonsters[i].x + this.listOfMonsters[i].w >= this.zoneWidth) {
            this.directionRight = false;
          }

          if (this.listOfMonsters[i].x <= 0) {
            this.directionRight = true;
          }

          if (this.listOfMonsters[i].y + this.listOfMonsters[i].h >= this.zoneHeight) {
            this.isWin = true;
          }
        }

        vx = this.directionRight ? vx : -vx;

        for (var _i = 0; _i < this.listOfMonsters.length; _i++) {
          this.listOfMonsters[_i].move(vx, vy);
        }
      } else {
        for (var _i2 = 0; _i2 < this.listOfMonsters.length; _i2++) {
          this.listOfMonsters[_i2].move(0, 0);
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(context, time) {
      for (var i = 0; i < this.listOfMonsters.length; i++) {
        this.listOfMonsters[i].draw(context, time);
      }
    }
  }]);

  return SquadAliens;
}();

exports.default = SquadAliens;
},{"./alien.js":"src/aliens/alien.js"}],"src/areas/area_itembar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ItemBar = /*#__PURE__*/function () {
  function ItemBar(x, y, w, h, faceRobot) {
    _classCallCheck(this, ItemBar);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.faceRobot = faceRobot;
    this.health = 0;
    this.countOfKill = 0;
    this.countOfBunkers = 0;
    this.time = 0;
  }

  _createClass(ItemBar, [{
    key: "update",
    value: function update(health, countOfKill, countOfBunkers, time) {
      this.health = health;
      this.countOfKill = countOfKill;
      this.countOfBunkers = countOfBunkers;
      this.time = time;
    }
  }, {
    key: "draw",
    value: function draw(context) {
      context.beginPath();
      context.strokeStyle = "red";
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.w, this.h);
      context.strokeRect(this.x, this.y, this.w, this.h);
      context.stroke();
      context.fill();
      context.closePath();
      context.beginPath();
      context.font = "32pt Impact";
      context.lineWidth = "1";
      context.fillStyle = "green";
      context.fillText("Bunkers: " + this.countOfBunkers, 0, this.y + this.h / 2 + 20, 1500);
      context.fillStyle = "#00cccc";
      context.fillText("Health: " + this.health, this.w / 4, this.y + this.h / 2 + 20, 1500);
      context.fillStyle = "red";
      context.fillText("Killed: " + this.countOfKill, this.w / 2 + this.w / 8, this.y + this.h / 2 + 20, 1500);
      context.fillStyle = "darkmagenta";
      context.fillText("Time: " + this.time, this.w - this.w / 6, this.y + this.h / 2 + 20, 1500);
      context.closePath();
      this.faceRobot.draw(context, 0, this.w / 2 - this.faceRobot.w / 2, this.y);
    }
  }]);

  return ItemBar;
}();

exports.default = ItemBar;
},{}],"src/bunkers/bunker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var collision_manager = _interopRequireWildcard(require("../collision_manager/collisionManager.js"));

var _vertex = _interopRequireDefault(require("../collision_manager/vertex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bunker = /*#__PURE__*/function () {
  function Bunker(spriteMap, beginPositionX, beginPositionY) {
    _classCallCheck(this, Bunker);

    this.spriteMap = spriteMap;
    this.x = beginPositionX;
    this.y = beginPositionY;
    this.w = this.spriteMap.w;
    this.h = this.spriteMap.h;
  }

  _createClass(Bunker, [{
    key: "draw",
    value: function draw(context) {
      this.spriteMap.draw(context, 0, this.x, this.y, this.spriteMap.scaleX, this.spriteMap.scaleY);
    }
  }, {
    key: "intersects",
    value: function intersects(object) {
      return collision_manager.collisionFunction(this, object);
    }
  }, {
    key: "vertexes",
    get: function get() {
      var vertexes = [new _vertex.default(this.x, this.y), new _vertex.default(this.x + this.w, this.y), new _vertex.default(this.x + this.w, this.y + this.h), new _vertex.default(this.x, this.y + this.h)];
      return vertexes;
    }
  }]);

  return Bunker;
}();

exports.default = Bunker;
},{"../collision_manager/collisionManager.js":"src/collision_manager/collisionManager.js","../collision_manager/vertex.js":"src/collision_manager/vertex.js"}],"src/aim/aim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Aim = /*#__PURE__*/function () {
  function Aim() {
    _classCallCheck(this, Aim);

    this.x = 0;
    this.y = 0;
  }

  _createClass(Aim, [{
    key: "draw",
    value: function draw(context) {
      context.beginPath();
      context.strokeStyle = "white";
      context.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
      context.stroke();
      context.closePath();
    }
  }]);

  return Aim;
}();

exports.default = Aim;
},{}],"src/bullet/bullet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var collision_manager = _interopRequireWildcard(require("../collision_manager/collisionManager.js"));

var _vertex = _interopRequireDefault(require("../collision_manager/vertex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bullet = /*#__PURE__*/function () {
  function Bullet(xBegin, yBegin, caliber, color, type) {
    _classCallCheck(this, Bullet);

    this.x = xBegin;
    this.y = yBegin;
    this.xBegin = xBegin;
    this.yBegin = yBegin;
    this.vx = 0;
    this.vy = 0;
    this.caliber = caliber;
    this.zoomBullet = caliber;
    this.isFire = false;
    this.color = color;
    this.type = type;
    this.coefSpeed = 30;
    this.r = caliber;
    this.damage = 5;
  }

  _createClass(Bullet, [{
    key: "fire",
    value: function fire(xEnd, yEnd) {
      if (this.isFire) return;
      this.vx = (xEnd - this.x) / this.coefSpeed;
      this.vy = (yEnd - this.y) / this.coefSpeed;
      this.isFire = true;
    }
  }, {
    key: "update",
    value: function update(x, y) {
      if (!this.isFire) {
        this.x = x;
        this.y = y;
      }

      this.x += this.vx;
      this.y += this.vy;
    }
  }, {
    key: "draw",
    value: function draw(context) {
      if (!this.isFire) return;
      context.beginPath();
      var grad = context.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.caliber);
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, "white");
      context.fillStyle = grad;
      context.arc(this.x, this.y, this.zoomBullet, 0, 2 * Math.PI, false);
      context.fill();
      context.closePath();
    }
  }, {
    key: "intersects",
    value: function intersects(object) {
      return collision_manager.collisionFunction(this, object);
    }
  }, {
    key: "dist",
    value: function dist(x1, y1, x2, y2) {
      var o1 = y1 - y2;
      var o2 = x1 - x2;
      return Math.sqrt(o1 * o1 + o2 * o2);
    }
  }, {
    key: "left",
    get: function get() {
      return this.x - this.r;
    }
  }, {
    key: "right",
    get: function get() {
      return this.x + this.r;
    }
  }, {
    key: "top",
    get: function get() {
      return this.y - this.r;
    }
  }, {
    key: "bottom",
    get: function get() {
      return this.y + this.r;
    }
  }, {
    key: "vertexes",
    get: function get() {
      var vertexes = [new _vertex.default(this.left, this.y), new _vertex.default(this.x, this.top), new _vertex.default(this.right, this.y), new _vertex.default(this.x, this.bottom), new _vertex.default(this.x, this.y)];
      return vertexes;
    }
  }]);

  return Bullet;
}();

exports.default = Bullet;
},{"../collision_manager/collisionManager.js":"src/collision_manager/collisionManager.js","../collision_manager/vertex.js":"src/collision_manager/vertex.js"}],"src/areas/area_player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AreaPlayer = /*#__PURE__*/function () {
  function AreaPlayer(x, y, width, height) {
    _classCallCheck(this, AreaPlayer);

    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
  }

  _createClass(AreaPlayer, [{
    key: "draw",
    value: function draw(context) {
      context.beginPath();
      context.strokeStyle = "green";
      context.lineWidth = "2";
      context.strokeRect(this.x, this.y, this.w, this.h);
      context.stroke();
      context.closePath();
    }
  }]);

  return AreaPlayer;
}();

exports.default = AreaPlayer;
},{}],"src/areas/area_alien.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AreaAlien = /*#__PURE__*/function () {
  function AreaAlien(x, y, width, height) {
    _classCallCheck(this, AreaAlien);

    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
  }

  _createClass(AreaAlien, [{
    key: "draw",
    value: function draw(context) {
      context.beginPath();
      context.lineWidth = "1";
      context.strokeStyle = "yellow";
      context.strokeRect(this.x, this.y, this.w, this.h);
      context.stroke();
      context.closePath();
    }
  }]);

  return AreaAlien;
}();

exports.default = AreaAlien;
},{}],"src/input-handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputHandler = /*#__PURE__*/function () {
  function InputHandler() {
    var _this = this;

    _classCallCheck(this, InputHandler);

    this.down = {};
    this.pressed = {};
    document.addEventListener("keydown", function (e) {
      _this.down[e.keyCode] = true;
    });
    document.addEventListener("keyup", function (e) {
      delete _this.down[e.keyCode];
      delete _this.pressed[e.keyCode];
    });
  }
  /**
   * Returns whether a key is pressod down
   * @param  {number} code the keycode to check
   * @return {bool} the result from check
   */


  _createClass(InputHandler, [{
    key: "isDown",
    value: function isDown(code) {
      return this.down[code];
    }
    /**
     * Return wheter a key has been pressed
     * @param  {number} code the keycode to check
     * @return {bool} the result from check
     */

  }, {
    key: "isPressed",
    value: function isPressed(code) {
      // if key is registred as pressed return false else if
      // key down for first time return true else return false
      if (this.pressed[code]) {
        return false;
      } else if (this.down[code]) {
        return this.pressed[code] = true;
      }

      return false;
    }
  }]);

  return InputHandler;
}();

exports.default = InputHandler;
},{}],"assets/spriteRobot.png":[function(require,module,exports) {
module.exports = "/SpaceInvaders/spriteRobot.ed34e793.png";
},{}],"assets/EnemyMonsterType1.png":[function(require,module,exports) {
module.exports = "/SpaceInvaders/EnemyMonsterType1.7f531ef9.png";
},{}],"assets/EnemyMonsterType2.png":[function(require,module,exports) {
module.exports = "/SpaceInvaders/EnemyMonsterType2.7b4074f7.png";
},{}],"assets/EnemyMonsterType3.png":[function(require,module,exports) {
module.exports = "/SpaceInvaders/EnemyMonsterType3.f39e0da8.png";
},{}],"assets/greenbunker.png":[function(require,module,exports) {
module.exports = "/SpaceInvaders/greenbunker.bbf233f8.png";
},{}],"assets/faceRobot.png":[function(require,module,exports) {
module.exports = "/SpaceInvaders/faceRobot.56f7e165.png";
},{}],"assets/evilEyes.jpg":[function(require,module,exports) {
module.exports = "/SpaceInvaders/evilEyes.1de2fa57.jpg";
},{}],"src/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preload = preload;
exports.init = init;
exports.update = update;
exports.draw = draw;

var _sprite_map = _interopRequireDefault(require("./sprite_map/sprite_map.js"));

var _player = _interopRequireDefault(require("./player/player.js"));

var _alien = _interopRequireDefault(require("./aliens/alien.js"));

var _alien_squad = _interopRequireDefault(require("./aliens/alien_squad.js"));

var _area_itembar = _interopRequireDefault(require("./areas/area_itembar.js"));

var _bunker = _interopRequireDefault(require("./bunkers/bunker.js"));

var _aim = _interopRequireDefault(require("./aim/aim.js"));

var _bullet = _interopRequireDefault(require("./bullet/bullet.js"));

var _area_player = _interopRequireDefault(require("./areas/area_player.js"));

var _area_alien = _interopRequireDefault(require("./areas/area_alien.js"));

var _inputHandler = _interopRequireDefault(require("./input-handler.js"));

var _spriteRobot = _interopRequireDefault(require("../assets/spriteRobot.png"));

var _EnemyMonsterType = _interopRequireDefault(require("../assets/EnemyMonsterType1.png"));

var _EnemyMonsterType2 = _interopRequireDefault(require("../assets/EnemyMonsterType2.png"));

var _EnemyMonsterType3 = _interopRequireDefault(require("../assets/EnemyMonsterType3.png"));

var _greenbunker = _interopRequireDefault(require("../assets/greenbunker.png"));

var _faceRobot = _interopRequireDefault(require("../assets/faceRobot.png"));

var _evilEyes = _interopRequireDefault(require("../assets/evilEyes.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var heightAreaPlayer = 110;
var countOfBunkers = 3;
var countOfMonstersInRow = 2;
var countOfKill = 0;
var previousTime = 0;
var sourceImagePlayer = new Image();
sourceImagePlayer.src = _spriteRobot.default;
var sourceImageAlienTypeOne = new Image();
sourceImageAlienTypeOne.src = _EnemyMonsterType.default;
var sourceImageAlienTypeTwo = new Image();
sourceImageAlienTypeTwo.src = _EnemyMonsterType2.default;
var sourceImageAlienTypeThree = new Image();
sourceImageAlienTypeThree.src = _EnemyMonsterType3.default;
var sourceImageBunkerType = new Image();
sourceImageBunkerType.src = _greenbunker.default;
var sourceImageItemBar = new Image();
sourceImageItemBar.src = _faceRobot.default;
var spriteMaps = {
  itembar: null,
  aliens: [],
  player: null,
  bunker: null
};
var gameState = {
  area_player: null,
  area_alien: null,
  area_itembar: null,
  bullets: [],
  aliens: null,
  bunkers: [],
  player: null,
  aim: null
};
var inputHandler = new _inputHandler.default();

function preload(onPreloadComplete) {
  if (spriteMaps.player != null && spriteMaps.itembar != null && spriteMaps.bunker != null && spriteMaps.aliens.length == 3) onPreloadComplete();else alert("Something wrong 0_0");
}

sourceImagePlayer.addEventListener("load", function () {
  spriteMaps.player = new _sprite_map.default(sourceImagePlayer, 3, 4, 1, 1);
});
sourceImageAlienTypeOne.addEventListener("load", function () {
  spriteMaps.aliens.push(new _sprite_map.default(sourceImageAlienTypeOne, 3, 1, 1, 1));
});
sourceImageAlienTypeTwo.addEventListener("load", function () {
  spriteMaps.aliens.push(new _sprite_map.default(sourceImageAlienTypeTwo, 6, 1, 1, 0.5));
});
sourceImageAlienTypeThree.addEventListener("load", function () {
  spriteMaps.aliens.push(new _sprite_map.default(sourceImageAlienTypeThree, 3, 1, 0.5, 0.5));
});
sourceImageBunkerType.addEventListener("load", function () {
  spriteMaps.bunker = new _sprite_map.default(sourceImageBunkerType, 1, 1, 0.8, 0.8);
});
sourceImageItemBar.addEventListener("load", function () {
  spriteMaps.itembar = new _sprite_map.default(sourceImageItemBar, 1, 1, 0.5, 0.5);
});

function init(canvas) {
  gameState.aim = new _aim.default();
  generateAreas(canvas);
  generatePlayer(gameState.area_player.x + gameState.area_player.w / 2, gameState.area_player.y + gameState.area_player.h / 2);
  generateBunkers(canvas);
  generateAliens();
}

function update(time, stopGame) {
  if (!checkStateOfGame() || gameState.aliens.isWin) stopGame();
  gameState.aliens.move(time);
  moveController(time, stopGame);
  fireAliens(time);
  updateBullets(time);
  gameState.area_itembar.update(gameState.player.health, countOfKill, gameState.bunkers.length, Math.ceil(time / 1000));
  updateAliens();
}

function draw(canvas, time) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawLose(context, canvas);
  setAim(canvas);
  drawBullets(context);
  gameState.area_alien.draw(context);
  gameState.area_player.draw(context);
  gameState.area_itembar.draw(context);
  gameState.aliens.draw(context, time);
  drawBunkers(context);
  gameState.player.draw(context);
  gameState.aim.draw(context);
}

function checkStateOfGame() {
  if (gameState.player.health <= 0) return false;

  if (gameState.aliens.listOfMonsters.length == 0) {
    countOfMonstersInRow++;
    gameState.player.health = 100;
    generateAliens();
  }

  return true;
}

function updateAliens() {
  var aliens = gameState.aliens.listOfMonsters;

  for (var i = 0; i < aliens.length; i++) {
    if (aliens[i].health <= 0) {
      delete gameState.aliens.listOfMonsters[i];
      gameState.aliens.listOfMonsters.splice(i, 1);
      countOfKill++;
      gameState.player.health += 5;
    }
  }
}

function fireAliens(time) {
  var timeFire = Math.ceil(time / 500);
  var isTimeFire = timeFire % 2 === 0;

  if (timeFire > previousTime && isTimeFire) {
    previousTime = timeFire;
    var aliens = gameState.aliens.listOfMonsters;

    for (var i = 0; i < aliens.length; i++) {
      var beginPositionX = aliens[i].x + aliens[i].w / 2;
      var beginPositionY = aliens[i].y + aliens[i].h;
      var endPositionX = void 0;
      var endPositionY = void 0;

      if (i < countOfMonstersInRow) {
        endPositionX = gameState.player.x + gameState.player.w / 2;
        endPositionY = gameState.player.y + gameState.player.h / 2;
      } else {
        endPositionX = getRandom(0, gameState.area_alien.w);
        endPositionY = getRandom(gameState.area_alien.h, gameState.area_alien.h + gameState.area_player.h);
      }

      activateFireAliens(beginPositionX, beginPositionY, endPositionX, endPositionY);
    }
  }
}

function activateFireAliens(beginPositionX, beginPositionY, endPositionX, endPositionY) {
  var bullet = new _bullet.default(beginPositionX, beginPositionY, 10, "red", "alien", 5);
  bullet.coefSpeed = getRandom(30, 90);
  gameState.bullets.push(bullet);
  gameState.bullets[gameState.bullets.length - 1].fire(endPositionX, endPositionY);
}

function moveController(time, stopGame) {
  gameState.player.isWalks = true;
  var obstacle = gameState.player.intersectsWithBunkers(gameState.bunkers);
  gameState.player.underBunker = obstacle != "none";

  if (inputHandler.isDown(87) && gameState.player.y > gameState.area_player.y && obstacle != "top") {
    //Up
    gameState.player.moveUp(time);
  }

  if (inputHandler.isDown(83) && gameState.player.y + gameState.player.h < gameState.area_player.y + gameState.area_player.h) {
    // Down
    gameState.player.moveDown(time);
  }

  if (inputHandler.isDown(65) && gameState.player.x > 0) {
    // Left
    gameState.player.moveLeft(time);
  }

  if (inputHandler.isDown(68) && gameState.player.x + gameState.player.w < gameState.area_player.w) {
    // Right
    gameState.player.moveRight(time);
  }
}

function updateBullets(time) {
  if (gameState.bullets.length == 0) return;

  for (var i = 0; i < gameState.bullets.length; i++) {
    if (gameState.bullets[i].type == "alien" && intersectBulletPlayer(gameState.bullets[i])) {
      delete gameState.bullets[i];
      gameState.bullets.splice(i, 1);
      continue;
    }

    if (gameState.bullets[i].type == "player" && intersectBulletAlien(gameState.bullets[i])) {
      delete gameState.bullets[i];
      gameState.bullets.splice(i, 1);
      continue;
    }

    if (intersectBulletBunker(gameState.bullets[i])) {
      delete gameState.bullets[i];
      gameState.bullets.splice(i, 1);
      continue;
    }

    if (gameState.bullets[i] != null && (gameState.bullets[i].x > gameState.area_alien.width || gameState.bullets[i].x < 0 || gameState.bullets[i].y > gameState.area_alien.h + gameState.area_player.h || gameState.bullets[i].y < 0)) {
      delete gameState.bullets[i];
      gameState.bullets.splice(i, 1);
      continue;
    } else gameState.bullets[i].update();
  }
}

function setAim(canvas, context) {
  canvas.onclick = function (event) {
    if (gameState.player.underBunker) return;
    gameState.player.direction = 10;
    gameState.bullets.push(new _bullet.default(gameState.player.x, gameState.player.y + gameState.player.h / 2, 10, "cyan", "player", 10));
    gameState.bullets[gameState.bullets.length - 1].fire(event.offsetX, event.offsetY);
  };

  canvas.onmousemove = function (event) {
    gameState.aim.x = event.offsetX;
    gameState.aim.y = event.offsetY;
  };
}

function drawBullets(context) {
  if (gameState.bullets.length == 0) return;

  for (var i = 0; i < gameState.bullets.length; i++) {
    if (gameState.bullets[i] != null) gameState.bullets[i].draw(context);
  }
}

function drawBunkers(context) {
  for (var i = 0; i < gameState.bunkers.length; i++) {
    gameState.bunkers[i].draw(context);
  }
}

function drawLose(context, canvas) {
  if (gameState.player.health <= 0) {
    context.beginPath();
    context.strokeStyle = "cyan";
    context.lineWidth = "2";
    context.font = "30pt Impact";
    context.shadowColor = "8b00ff";
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;
    context.strokeText("ИГРА ЗАКОНЧЕНА", canvas.width / 2 - 100, canvas.height / 2, 1500);
    context.closePath();
  }
}

function generateBunkers(canvas) {
  for (var i = 0; i < countOfBunkers; i++) {
    gameState.bunkers.push(new _bunker.default(spriteMaps.bunker, 100 + gameState.area_player.x + i * (canvas.width / 3), gameState.area_player.y - spriteMaps.bunker.h / 2));
  }
}

function generateAliens() {
  var typeAliens = [];

  for (var i = 0; i < spriteMaps.aliens.length; i++) {
    typeAliens.push(new _alien.default(0, 0, spriteMaps.aliens[i], 0, 0, 100));
  }

  gameState.aliens = new _alien_squad.default(typeAliens, countOfMonstersInRow, "red", gameState.area_alien.x, gameState.area_alien.y, gameState.area_alien.w, gameState.area_alien.h);
}

function generateAreas(canvas) {
  gameState.area_itembar = new _area_itembar.default(0, canvas.height - sourceImageItemBar.height / 2, canvas.width, sourceImageItemBar.height / 2, spriteMaps.itembar);
  gameState.area_player = new _area_player.default(0, gameState.area_itembar.y - heightAreaPlayer, canvas.width, heightAreaPlayer);
  gameState.area_alien = new _area_alien.default(0, 0, canvas.width, gameState.area_player.y);
}

function generatePlayer(xBegin, yBegin) {
  gameState.player = new _player.default(spriteMaps.player, xBegin - spriteMaps.player.w / 2, yBegin - spriteMaps.player.h / 2);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function intersectBulletBunker(bullet) {
  for (var i = 0; i < gameState.bunkers.length; i++) {
    if (bullet.intersects(gameState.bunkers[i])) return true;
  }

  return false;
}

function intersectBulletAlien(bullet) {
  var aliens = gameState.aliens.listOfMonsters;

  for (var i = 0; i < aliens.length; i++) {
    if (bullet.intersects(aliens[i])) {
      gameState.aliens.listOfMonsters[i].health -= bullet.damage;
      gameState.aliens.listOfMonsters[i].isDamage = true;
      return true;
    }
  }

  return false;
}

function intersectBulletPlayer(bullet) {
  if (bullet.intersects(gameState.player)) {
    gameState.player.health -= bullet.damage;
    return true;
  }

  return false;
}
},{"./sprite_map/sprite_map.js":"src/sprite_map/sprite_map.js","./player/player.js":"src/player/player.js","./aliens/alien.js":"src/aliens/alien.js","./aliens/alien_squad.js":"src/aliens/alien_squad.js","./areas/area_itembar.js":"src/areas/area_itembar.js","./bunkers/bunker.js":"src/bunkers/bunker.js","./aim/aim.js":"src/aim/aim.js","./bullet/bullet.js":"src/bullet/bullet.js","./areas/area_player.js":"src/areas/area_player.js","./areas/area_alien.js":"src/areas/area_alien.js","./input-handler.js":"src/input-handler.js","../assets/spriteRobot.png":"assets/spriteRobot.png","../assets/EnemyMonsterType1.png":"assets/EnemyMonsterType1.png","../assets/EnemyMonsterType2.png":"assets/EnemyMonsterType2.png","../assets/EnemyMonsterType3.png":"assets/EnemyMonsterType3.png","../assets/greenbunker.png":"assets/greenbunker.png","../assets/faceRobot.png":"assets/faceRobot.png","../assets/evilEyes.jpg":"assets/evilEyes.jpg"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _game = require("./game.js");

var _faceRobot = _interopRequireDefault(require("../assets/faceRobot.png"));

var _evilEyes = _interopRequireDefault(require("../assets/evilEyes.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("cnvs");
var context = canvas.getContext('2d');
var audioGame = document.getElementById("song");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var sourceImageFaceRobot = new Image();
var sourceImageEvilEyes = new Image();
var tickLength = 15; //ms

var lastTick;
var lastRender;
var stopCycle;
buttonStart.addEventListener("click", function () {
  audioGame.loop = true;
  audioGame.play();
  (0, _game.preload)(onPreloadComplete);
  buttonStart.style.display = "none";
});

sourceImageFaceRobot.onload = function () {
  context.drawImage(sourceImageFaceRobot, 0, 0, sourceImageFaceRobot.width, sourceImageFaceRobot.height, 0, 0, sourceImageFaceRobot.width, sourceImageFaceRobot.height);
};

sourceImageEvilEyes.onload = function () {
  var pattern = context.createPattern(sourceImageEvilEyes, "repeat");
  context.fillStyle = pattern;
  context.strokeStyle = "yellowgreen";
  context.fillRect(0, canvas.height / 4, sourceImageEvilEyes.width, sourceImageEvilEyes.height);
  context.strokeRect(0, canvas.height / 4, sourceImageEvilEyes.width, sourceImageEvilEyes.height);
};

window.onload = function () {
  sourceImageFaceRobot.src = _faceRobot.default;
  sourceImageEvilEyes.src = _evilEyes.default;
  noteWindow(context);
};

function run(tFrame) {
  stopCycle = window.requestAnimationFrame(run);
  var nextTick = lastTick + tickLength;
  var numTicks = 0;

  if (tFrame > nextTick) {
    var timeSinceTick = tFrame - lastTick;
    numTicks = Math.floor(timeSinceTick / tickLength);
  }

  for (var i = 0; i < numTicks; i++) {
    lastTick = lastTick + tickLength;
    (0, _game.update)(lastTick, stopGame);
  }

  (0, _game.draw)(canvas, tFrame);
  lastRender = tFrame;
}

function stopGame() {
  sourceImageEvilEyes.src = _evilEyes.default;
  audioGame.pause();
  window.cancelAnimationFrame(stopCycle);
}

function onPreloadComplete() {
  lastTick = performance.now();
  lastRender = lastTick;
  stopCycle = null;
  (0, _game.init)(canvas);
  run();
}

function noteWindow(context) {
  context.beginPath();
  context.strokeStyle = "aqua";
  context.lineWidth = "2";
  context.font = "30pt Impact";
  context.shadowColor = "8b00ff";
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 10;
  context.strokeText("ЧЕЛОВЕЧЕСТВО УНИЧТОЖЕНО ИНОПЛАНЕТНЫМИ ЗАХВАТЧИКАМИ", 150, 50, 1500);
  context.strokeText("ТЫ - БЕЗДУШНАЯ МАШИНА", 150, 100, 1500);
  context.strokeStyle = "#ff3333";
  context.strokeText("ИХ КРОВЬ - ТВОЁ ТОПЛИВО", 150, 150, 1500);
  context.closePath();
  context.beginPath();
  context.fillStyle = "yellow";
  context.font = "15pt Impact";
  context.lineWidth = "1";
  context.fillText("Жёлтая зона - зона боевых действий", 1000, 200, 1500);
  context.fillStyle = "#19ff19";
  context.fillText("Зеленая зона - активная зона для перемещения", 1000, 220, 1500);
  context.fillStyle = "#ff3333";
  context.fillText("Красная зона - ваша статистика", 1000, 240, 1500);
  context.fillStyle = "aqua";
  context.fillText("Ваша задача: не подпускать их к зеленой линии!", 1000, 280, 1500);
  context.fillText("WASD - перемещение", 1000, 320, 1500);
  context.fillText("Прицеливание мышью ", 1000, 340, 1500);
  context.fillText("Стрельба - левая кнопка мыши", 1000, 360, 1500);
  context.fillText("Клавиша C - включить/выключить музыку", 1000, 380, 1500);
  context.closePath();
}
},{"./game.js":"src/game.js","../assets/faceRobot.png":"assets/faceRobot.png","../assets/evilEyes.jpg":"assets/evilEyes.jpg"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56973" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map