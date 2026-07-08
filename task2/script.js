const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

let intervalId = null;
let startTime = 0;
let elapsed = 0;
let running = false;
let lapCount = 0;

function formatTime(ms) {
  const totalMilliseconds = Math.floor(ms % 1000);
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(totalMilliseconds).padStart(3, '0')}`;
}

function updateDisplay(value) {
  timeDisplay.textContent = formatTime(value);
}

function tick() {
  const now = performance.now();
  elapsed = now - startTime;
  updateDisplay(elapsed);
}

function startStopwatch() {
  startTime = performance.now() - elapsed;
  intervalId = setInterval(tick, 16);
  running = true;
  startStopBtn.textContent = 'Pause';
  startStopBtn.classList.add('primary');
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function pauseStopwatch() {
  clearInterval(intervalId);
  intervalId = null;
  running = false;
  startStopBtn.textContent = 'Resume';
  startStopBtn.classList.remove('primary');
}

function resetStopwatch() {
  clearInterval(intervalId);
  intervalId = null;
  startTime = 0;
  elapsed = 0;
  running = false;
  lapCount = 0;
  updateDisplay(0);
  startStopBtn.textContent = 'Start';
  startStopBtn.classList.remove('primary');
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  lapsList.innerHTML = '';
}

function addLap() {
  lapCount += 1;
  const li = document.createElement('li');
  const lapLabel = document.createElement('span');
  lapLabel.textContent = `Lap ${lapCount}`;
  const lapTime = document.createElement('strong');
  lapTime.textContent = formatTime(elapsed);
  li.appendChild(lapLabel);
  li.appendChild(lapTime);
  lapsList.prepend(li);
}

startStopBtn.addEventListener('click', () => {
  if (running) {
    pauseStopwatch();
  } else {
    startStopwatch();
  }
});

lapBtn.addEventListener('click', addLap);
resetBtn.addEventListener('click', resetStopwatch);

resetStopwatch();
