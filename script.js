// =========================================================
// Persian Word Swipe — MVP
// One hidden word: کباب (kabab)
// =========================================================

const TARGET_WORD = 'کباب';
const LETTERS = Array.from(TARGET_WORD); // ['ک', 'ب', 'ا', 'ب']

const WHEEL_SIZE = 300;       // must match the SVG viewBox / wheel box in CSS
const WHEEL_CENTER = WHEEL_SIZE / 2;
const TILE_RADIUS = 105;      // distance of each tile from the wheel center

// DOM references
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const playBtn = document.getElementById('play-btn');
const restartBtn = document.getElementById('restart-btn');
const playAgainBtn = document.getElementById('play-again-btn');

const wheelEl = document.getElementById('wheel');
const traceLine = document.getElementById('trace-line');
const selectionDisplay = document.getElementById('selection-display');
const feedbackEl = document.getElementById('feedback');
const winOverlay = document.getElementById('win-overlay');

// Drag state
let dragging = false;
let selectedTiles = [];

// =========================================================
// Wheel setup
// =========================================================
function shuffledIndexes(n) {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildWheel() {
  // remove any existing tiles
  wheelEl.querySelectorAll('.tile').forEach((t) => t.remove());

  const order = shuffledIndexes(LETTERS.length);
  const count = order.length;

  order.forEach((letterIndex, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2; // start at top, go clockwise
    const x = Math.cos(angle) * TILE_RADIUS;
    const y = Math.sin(angle) * TILE_RADIUS;

    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.dataset.char = LETTERS[letterIndex];
    tile.setAttribute('lang', 'fa');
    tile.setAttribute('role', 'button');
    tile.style.left = `${WHEEL_CENTER + x}px`;
    tile.style.top = `${WHEEL_CENTER + y}px`;
    tile.textContent = LETTERS[letterIndex];

    // store center-relative coordinates for drawing the trace line
    tile._x = x;
    tile._y = y;

    tile.addEventListener('pointerdown', onTileDown);

    wheelEl.appendChild(tile);
  });
}

// =========================================================
// Drag / swipe selection
// =========================================================
function onTileDown(e) {
  e.preventDefault();
  dragging = true;
  clearSelectionState();
  addTile(e.currentTarget);
}

function onPointerMove(e) {
  if (!dragging) return;
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (el && el.classList && el.classList.contains('tile') && !selectedTiles.includes(el)) {
    addTile(el);
  }
}

function onPointerUp() {
  if (!dragging) return;
  dragging = false;
  evaluateSelection();
}

function onPointerCancel() {
  if (!dragging) return;
  dragging = false;
  clearSelectionState();
}

document.addEventListener('pointermove', onPointerMove);
document.addEventListener('pointerup', onPointerUp);
document.addEventListener('pointercancel', onPointerCancel);

function addTile(tile) {
  tile.classList.add('selected');
  selectedTiles.push(tile);
  updateSelectionDisplay();
  updateTraceLine();
}

function updateSelectionDisplay() {
  selectionDisplay.textContent = selectedTiles.length
    ? selectedTiles.map((t) => t.dataset.char).join(' ')
    : '\u00A0';
}

function updateTraceLine() {
  const points = selectedTiles
    .map((t) => `${WHEEL_CENTER + t._x},${WHEEL_CENTER + t._y}`)
    .join(' ');
  traceLine.setAttribute('points', points);
}

function clearSelectionState() {
  selectedTiles.forEach((t) => t.classList.remove('selected'));
  selectedTiles = [];
  updateSelectionDisplay();
  traceLine.setAttribute('points', '');
}

// =========================================================
// Win checking
// =========================================================
function evaluateSelection() {
  const attempt = selectedTiles.map((t) => t.dataset.char).join('');

  if (attempt === TARGET_WORD) {
    feedbackEl.textContent = 'Correct!';
    feedbackEl.classList.add('correct');
    showWin();
  } else {
    feedbackEl.textContent = attempt ? 'Try again.' : '\u00A0';
    feedbackEl.classList.remove('correct');
    clearSelectionState();
  }
}

function showWin() {
  winOverlay.classList.remove('hidden');
}

function hideWin() {
  winOverlay.classList.add('hidden');
}

// =========================================================
// Screen / game flow
// =========================================================
function startNewGame() {
  hideWin();
  feedbackEl.textContent = '\u00A0';
  feedbackEl.classList.remove('correct');
  clearSelectionState();
  buildWheel();
}

function goToGameScreen() {
  homeScreen.classList.remove('active');
  gameScreen.classList.add('active');
  startNewGame();
}

playBtn.addEventListener('click', goToGameScreen);
restartBtn.addEventListener('click', startNewGame);
playAgainBtn.addEventListener('click', startNewGame);
