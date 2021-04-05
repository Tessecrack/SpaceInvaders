import {default as SpriteMap}  from './sprite_map/sprite_map.js'
import {default as Player}     from './player/player.js'
import {default as Alien}      from './aliens/alien.js'
import {default as SquadAliens} from './aliens/alien_squad.js'
import {default as ItemBar}    from './areas/area_itembar.js'
import {default as Bunker}     from './bunkers/bunker.js'
import {default as Aim}        from './aim/aim.js'
import {default as Bullet}     from './bullet/bullet.js'
import AreaPlayer              from './areas/area_player.js'
import AreaAlien               from './areas/area_alien.js'
import InputHandler            from './input-handler.js'

import assetPathPlayer         from '../assets/spriteRobot.png'
import assetPathAlienTypeOne   from '../assets/EnemyMonsterType1.png'
import assetPathAlienTypeTwo   from '../assets/EnemyMonsterType2.png'
import assetPathAlienTypeThree from '../assets/EnemyMonsterType3.png'
import assetPathBunkerType     from '../assets/greenbunker.png'
import assetPathItemBarType    from '../assets/faceRobot.png'
import assetPathEvilEyes       from '../assets/evilEyes.jpg'


const heightAreaPlayer = 110;
const countOfBunkers = 3;
let countOfMonstersInRow = 2;
let countOfKill = 0;
let previousTime = 0;

let sourceImagePlayer = new Image();
sourceImagePlayer.src = assetPathPlayer;
let sourceImageAlienTypeOne = new Image();
sourceImageAlienTypeOne.src = assetPathAlienTypeOne;
let sourceImageAlienTypeTwo = new Image();
sourceImageAlienTypeTwo.src = assetPathAlienTypeTwo;
let sourceImageAlienTypeThree = new Image();
sourceImageAlienTypeThree.src = assetPathAlienTypeThree;
let sourceImageBunkerType = new Image();
sourceImageBunkerType.src = assetPathBunkerType;
let sourceImageItemBar = new Image();
sourceImageItemBar.src = assetPathItemBarType;

const spriteMaps = {
  itembar: null,
  aliens: [],
  player: null,
  bunker: null,
};

const gameState = {
  area_player: null,
  area_alien: null, 
  area_itembar: null,
  bullets: [],
  aliens: null,
  bunkers: [],
  player: null,
  aim: null
};

const inputHandler = new InputHandler();

export function preload(onPreloadComplete) {
  if (spriteMaps.player != null 
      && spriteMaps.itembar != null
      && spriteMaps.bunker != null
      && spriteMaps.aliens.length == 3) onPreloadComplete();
  else alert("Something wrong 0_0");
}


sourceImagePlayer.addEventListener("load", () => {
    spriteMaps.player = new SpriteMap(sourceImagePlayer, 3, 4, 1, 1);
  });
sourceImageAlienTypeOne.addEventListener("load", () => {
    spriteMaps.aliens.push(new SpriteMap(sourceImageAlienTypeOne, 3, 1, 1, 1));
  });

sourceImageAlienTypeTwo.addEventListener("load", () => {
    spriteMaps.aliens.push(new SpriteMap(sourceImageAlienTypeTwo, 6, 1, 1, 0.5));
  });

 sourceImageAlienTypeThree.addEventListener("load", () => {
    spriteMaps.aliens.push(new SpriteMap(sourceImageAlienTypeThree, 3, 1, 0.5, 0.5));
  });
  
sourceImageBunkerType.addEventListener("load", () => {
    spriteMaps.bunker = new SpriteMap(sourceImageBunkerType, 1, 1, 0.8, 0.8);
  });
  
sourceImageItemBar.addEventListener("load", () => {
    spriteMaps.itembar = new SpriteMap(sourceImageItemBar, 1, 1, 0.5, 0.5);
  });

export function init(canvas) {
  gameState.aim = new Aim();
  generateAreas(canvas);
  generatePlayer(gameState.area_player.x + gameState.area_player.w / 2, gameState.area_player.y + gameState.area_player.h / 2);
  generateBunkers(canvas);
  generateAliens();
}

export function update(time, stopGame) {
  if (!checkStateOfGame() || gameState.aliens.isWin) stopGame();
  gameState.aliens.move(time);
  moveController(time, stopGame);
  fireAliens(time);
  updateBullets(time);
  gameState.area_itembar.update(gameState.player.health, countOfKill, gameState.bunkers.length, Math.ceil(time / 1000));
  updateAliens();
}

export function draw(canvas, time) {
  const context = canvas.getContext('2d');
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
  let aliens = gameState.aliens.listOfMonsters;
  for (let i = 0; i < aliens.length; i++) {
    if (aliens[i].health <= 0) {
      delete gameState.aliens.listOfMonsters[i];
      gameState.aliens.listOfMonsters.splice(i, 1);
      countOfKill++;
      gameState.player.health += 5;
    }
  }
}
function fireAliens(time) {
  let timeFire = Math.ceil(time / 500);
  let isTimeFire = timeFire % 2 === 0;
  if (timeFire > previousTime && isTimeFire) {
    previousTime = timeFire;
    let aliens = gameState.aliens.listOfMonsters;
    for (let i = 0; i < aliens.length; i++) {
      let beginPositionX = aliens[i].x + aliens[i].w/2; 
      let beginPositionY = aliens[i].y + aliens[i].h;
      let endPositionX; 
      let endPositionY;
      if (i < countOfMonstersInRow) {
        endPositionX = gameState.player.x + gameState.player.w/2;
        endPositionY = gameState.player.y + gameState.player.h/2;
      } else {
        endPositionX = getRandom(0, gameState.area_alien.w);
        endPositionY = getRandom(gameState.area_alien.h, gameState.area_alien.h + gameState.area_player.h);
      }
      activateFireAliens(beginPositionX, beginPositionY, endPositionX, endPositionY);
    }
  }
}

function activateFireAliens(beginPositionX, beginPositionY, endPositionX, endPositionY) {
  let bullet = new Bullet(beginPositionX, beginPositionY, 10, "red", "alien", 5); 
  bullet.coefSpeed = getRandom(30, 90);
  gameState.bullets.push(bullet);
  gameState.bullets[gameState.bullets.length - 1].fire(endPositionX, endPositionY);
}

function moveController(time, stopGame) {
  gameState.player.isWalks = true;
  let obstacle = gameState.player.intersectsWithBunkers(gameState.bunkers);
  gameState.player.underBunker = obstacle != "none";
  if (inputHandler.isDown(87) 
      && gameState.player.y > gameState.area_player.y
      && obstacle != "top")  { //Up
        gameState.player.moveUp(time);
  }
  if (inputHandler.isDown(83)
      && gameState.player.y + gameState.player.h < gameState.area_player.y + gameState.area_player.h) { // Down
        gameState.player.moveDown(time);
  }
  if (inputHandler.isDown(65) && gameState.player.x > 0 ) { // Left
    gameState.player.moveLeft(time); 
  }
  if (inputHandler.isDown(68) && gameState.player.x + gameState.player.w < gameState.area_player.w) { // Right
    gameState.player.moveRight(time); 
	}
}
function updateBullets(time) {
  if (gameState.bullets.length == 0) return;
  for (let i = 0; i < gameState.bullets.length; i++) {
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

    if (gameState.bullets[i] != null 
      && (gameState.bullets[i].x > gameState.area_alien.width
      || gameState.bullets[i].x < 0 
      || gameState.bullets[i].y > gameState.area_alien.h + gameState.area_player.h
      || gameState.bullets[i].y < 0))
      {
        delete gameState.bullets[i];
        gameState.bullets.splice(i, 1);
        continue;
      }
    else gameState.bullets[i].update();
  }
}

function setAim(canvas, context) {
  canvas.onclick = function(event) {
    if (gameState.player.underBunker) return;
    gameState.player.direction = 10;   
    gameState.bullets.push(new Bullet(gameState.player.x, 
      gameState.player.y + gameState.player.h/2, 10,"cyan", "player", 10));
    gameState.bullets[gameState.bullets.length - 1].fire(event.offsetX, event.offsetY);
  }

  canvas.onmousemove = function(event) {
    gameState.aim.x = event.offsetX;
    gameState.aim.y = event.offsetY;
  }
}

function drawBullets(context) {
  if (gameState.bullets.length == 0) return;
  for (let i = 0; i < gameState.bullets.length; i++) {
    if (gameState.bullets[i] != null) gameState.bullets[i].draw(context);
  }
}

function drawBunkers(context) {
  for (let i = 0; i < gameState.bunkers.length; i++) {
    gameState.bunkers[i].draw(context);
  }
}
function drawLose(context, canvas) {
  if (gameState.player.health <=0) {
    context.beginPath();
    context.strokeStyle = "cyan";
    context.lineWidth = "2";
    context.font = "30pt Impact";
    context.shadowColor = "8b00ff";
    context.shadowOffsetX = 5; 
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;
    context.strokeText("ИГРА ЗАКОНЧЕНА", canvas.width/2 - 100, canvas.height/2, 1500);
    context.closePath();
  }
}
function generateBunkers(canvas) {
    for (let i = 0; i < countOfBunkers; i++) {
      gameState.bunkers.push(new Bunker(spriteMaps.bunker, 100 + gameState.area_player.x + i * (canvas.width / 3), 
          gameState.area_player.y - spriteMaps.bunker.h / 2));
  }
}

function generateAliens() {
  let typeAliens = [];
  for (let i = 0; i < spriteMaps.aliens.length; i++) {
    typeAliens.push(new Alien(0, 0, spriteMaps.aliens[i], 0, 0, 100));
  }
  gameState.aliens = new SquadAliens(typeAliens, countOfMonstersInRow, "red",
  gameState.area_alien.x, 
  gameState.area_alien.y, 
  gameState.area_alien.w,
  gameState.area_alien.h);
}

function generateAreas(canvas) {
  gameState.area_itembar = new ItemBar(0, canvas.height - sourceImageItemBar.height / 2, canvas.width,  
    sourceImageItemBar.height / 2,
    spriteMaps.itembar);
 gameState.area_player = new AreaPlayer(0, gameState.area_itembar.y - heightAreaPlayer, canvas.width, heightAreaPlayer);
 gameState.area_alien = new AreaAlien(0, 0, canvas.width, gameState.area_player.y);
}

function generatePlayer(xBegin, yBegin) {
  gameState.player = new Player(spriteMaps.player, xBegin - spriteMaps.player.w/2, yBegin - spriteMaps.player.h/2);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function intersectBulletBunker(bullet) {
  for (let i = 0; i < gameState.bunkers.length; i++) {
    if (bullet.intersects(gameState.bunkers[i])) 
      return true;
  }
  return false;
}

function intersectBulletAlien(bullet) {
  let aliens = gameState.aliens.listOfMonsters;
  for(let i = 0; i < aliens.length; i++) {
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