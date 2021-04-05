import { preload, init, update, draw} from './game.js';
import faceRobot from '../assets/faceRobot.png'
import evilEyes from '../assets/evilEyes.jpg'
const canvas = document.getElementById("cnvs");
const context = canvas.getContext('2d');
const audioGame = document.getElementById("song");

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;

const sourceImageFaceRobot = new Image();
const sourceImageEvilEyes = new Image();

const tickLength = 15; //ms
let lastTick;
let lastRender;
let stopCycle;

buttonStart.addEventListener("click", function() {
    audioGame.loop = true;
    audioGame.play();
    preload(onPreloadComplete);
    buttonStart.style.display = "none";
  });

sourceImageFaceRobot.onload = function() {
    context.drawImage(sourceImageFaceRobot, 0, 0, 
        sourceImageFaceRobot.width,
        sourceImageFaceRobot.height,
        0, 0, sourceImageFaceRobot.width, sourceImageFaceRobot.height);
}

sourceImageEvilEyes.onload = function() {
    let pattern = context.createPattern(sourceImageEvilEyes, "repeat");
    context.fillStyle = pattern;
    context.strokeStyle = "yellowgreen";
    context.fillRect(0, canvas.height/4, sourceImageEvilEyes.width, sourceImageEvilEyes.height);
    context.strokeRect(0, canvas.height/4, sourceImageEvilEyes.width, sourceImageEvilEyes.height);
}
window.onload = function() {
    sourceImageFaceRobot.src = faceRobot;
    sourceImageEvilEyes.src = evilEyes;
    noteWindow(context);
}

function run(tFrame) {
    stopCycle = window.requestAnimationFrame(run);

    const nextTick = lastTick + tickLength;
    let numTicks = 0;

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - lastTick;
        numTicks = Math.floor(timeSinceTick / tickLength);
    }

    for (let i = 0; i < numTicks; i++) {
        lastTick = lastTick + tickLength;
        update(lastTick, stopGame);
    }

    draw(canvas, tFrame);
    lastRender = tFrame;
}

function stopGame() {
    sourceImageEvilEyes.src = evilEyes;
    audioGame.pause();
    window.cancelAnimationFrame(stopCycle);
}

function onPreloadComplete() {
  lastTick = performance.now();
  lastRender = lastTick;
  stopCycle = null;
  init(canvas);
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
