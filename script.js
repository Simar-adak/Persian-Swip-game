// =========================================================
// Persian Word Swipe – Level System
// =========================================================

// ----- کلمات مراحل (غذاهای ایرانی) -----
const LEVELS = [
  { word: 'کباب' },     // 1
  { word: 'آش' },       // 2
  { word: 'دیزی' },     // 3
  { word: 'حلیم' },     // 4
  { word: 'سمنو' },     // 5
  { word: 'قیمه' },     // 6
  { word: 'آبگوشت' },   // 7
  { word: 'جوجه' },     // 8
  { word: 'بریانی' },   // 9
  { word: 'فسنجون' },   // 10
  { word: 'قورمه' },    // 11
  { word: 'باقلوا' },   // 12
  { word: 'رشته' },     // 13
  { word: 'ماست' },     // 14
  { word: 'خرما' },     // 15
  { word: 'پنیر' },     // 16
  { word: 'نان' },      // 17
  { word: 'برنج' },     // 18
  { word: 'گوشت' },     // 19
  { word: 'خیار' }      // 20
];

const TOTAL_LEVELS = LEVELS.length;

// ----- وضعیت ذخیره‌شده -----
const STORAGE_KEY = 'persian_word_swipe_progress';

let progress = {
  maxUnlocked: 1,          // اولین مرحله‌ای که هنوز باز نشده (بیشترین بازشده + 1)
  completed: []            // اندیس‌های مراحل کامل‌شده (۱-based)
};

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      progress.maxUnlocked = parsed.maxUnlocked || 1;
      progress.completed = parsed.completed || [];
    }
  } catch (e) {
    // ignore
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ----- DOM references -----
const homeScreen = document.getElementById('home-screen');
const levelsScreen = document.getElementById('levels-screen');
const gameScreen = document.getElementById('game-screen');
const winOverlay = document.getElementById('win-overlay');
const discountOverlay = document.getElementById('discount-overlay');

const playBtn = document.getElementById('play-btn');
const levelsBtn = document.getElementById('levels-btn');
const backToHomeBtn = document.getElementById('back-to-home-btn');
const restartBtn = document.getElementById('restart-btn');
const backToLevelsBtn = document.getElementById('back-to-levels-btn');
const nextLevelBtn = document.getElementById('next-level-btn');
const winBackToLevelsBtn = document.getElementById('win-back-to-levels-btn');
const closeDiscountBtn = document.getElementById('close-discount-btn');

const levelsGrid = document.getElementById('levels-grid');
const levelIndicator = document.getElementById('level-indicator');
const selectionDisplay = document.getElementById('selection-display');
const feedbackEl = document.getElementById('feedback');
const wheelEl = document.getElementById('wheel');
const traceLine = document.getElementById('trace-line');
const winWordEl = document.getElementById('win-word');

// ----- متغیرهای بازی -----
let currentLevel = 1;            // 1‑based
let dragging = false;
let selectedTiles = [];
let currentWordLetters = [];

const WHEEL_SIZE = 300;
const WHEEL_CENTER = WHEEL_SIZE / 2;
const TILE_RADIUS = 105;

// ----- مدیریت صفحات -----
function showScreen(screen) {
  [homeScreen, levelsScreen, gameScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

// ----- ساخت شبکه مراحل -----
function renderLevelsGrid() {
  levelsGrid.innerHTML = '';
  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.textContent = i;
    btn.disabled = i > progress.maxUnlocked;
    if (progress.completed.includes(i)) {
      btn.classList.add('completed');
    }
    btn.addEventListener('click', () => {
      if (i <= progress.maxUnlocked) {
        startLevel(i);
      }
    });
    levelsGrid.appendChild(btn);
  }
}

// ----- شروع یک مرحله -----
function startLevel(level) {
  currentLevel = level;
  hideWinOverlay();
  hideDiscountOverlay();
  feedbackEl.textContent = '\u00A0';
  feedbackEl.classList.remove('correct');
  clearSelectionState();
  levelIndicator.textContent = `مرحله ${level}`;
  buildWheel(LEVELS[level - 1].word);
  showScreen(gameScreen);
}

// ----- ساخت چرخ حروف -----
function shuffledIndexes(n) {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildWheel(word) {
  wheelEl.querySelectorAll('.tile').forEach(t => t.remove());
  currentWordLetters = Array.from(word);
  const order = shuffledIndexes(currentWordLetters.length);
  const count = order.length;

  order.forEach((letterIndex, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const x = Math.cos(angle) * TILE_RADIUS;
    const y = Math.sin(angle) * TILE_RADIUS;

    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.dataset.char = currentWordLetters[letterIndex];
    tile.setAttribute('lang', 'fa');
    tile.setAttribute('role', 'button');
    tile.style.left = `${WHEEL_CENTER + x}px`;
    tile.style.top = `${WHEEL_CENTER + y}px`;
    tile.textContent = currentWordLetters[letterIndex];
    tile._x = x;
    tile._y = y;

    tile.addEventListener('pointerdown', onTileDown);
    wheelEl.appendChild(tile);
  });
}

// ----- کشیدن / انتخاب -----
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
    ? selectedTiles.map(t => t.dataset.char).join(' ')
    : '\u00A0';
}

function updateTraceLine() {
  const points = selectedTiles
    .map(t => `${WHEEL_CENTER + t._x},${WHEEL_CENTER + t._y}`)
    .join(' ');
  traceLine.setAttribute('points', points);
}

function clearSelectionState() {
  selectedTiles.forEach(t => t.classList.remove('selected'));
  selectedTiles = [];
  updateSelectionDisplay();
  traceLine.setAttribute('points', '');
}

// ----- بررسی برنده شدن -----
function evaluateSelection() {
  const attempt = selectedTiles.map(t => t.dataset.char).join('');
  const target = LEVELS[currentLevel - 1].word;

  if (attempt === target) {
    feedbackEl.textContent = 'درست است!';
    feedbackEl.classList.add('correct');

    // ثبت کامل شدن مرحله
    if (!progress.completed.includes(currentLevel)) {
      progress.completed.push(currentLevel);
      if (currentLevel + 1 > progress.maxUnlocked && currentLevel < TOTAL_LEVELS) {
        progress.maxUnlocked = currentLevel + 1;
      }
      saveProgress();
    }

    // اگر مرحله مضربی از ۱۰ باشد، اول تخفیف نشان بده
    if (currentLevel % 10 === 0) {
      showDiscountOverlay();
    } else {
      showWinOverlay();
    }
  } else {
    feedbackEl.textContent = attempt ? 'دوباره تلاش کن.' : '\u00A0';
    feedbackEl.classList.remove('correct');
    clearSelectionState();
  }
}

// ----- پوشش‌ها -----
function showWinOverlay() {
  winWordEl.textContent = LEVELS[currentLevel - 1].word;
  winOverlay.classList.remove('hidden');
  // دکمه مرحله بعد فقط اگر مرحله بعدی باز باشد
  nextLevelBtn.style.display = (currentLevel < TOTAL_LEVELS && currentLevel + 1 <= progress.maxUnlocked)
    ? 'block' : 'none';
}

function hideWinOverlay() {
  winOverlay.classList.add('hidden');
}

function showDiscountOverlay() {
  discountOverlay.classList.remove('hidden');
}

function hideDiscountOverlay() {
  discountOverlay.classList.add('hidden');
}

// ----- رخدادهای دکمه‌ها -----
playBtn.addEventListener('click', () => {
  // شروع از آخرین مرحله‌ای که باز است (اگر کامل شده باشد، باز هم همان را بازی کند)
  let startLvl = progress.maxUnlocked;
  // اگر همه کامل شده‌اند، از مرحله آخر شروع کن
  if (progress.completed.length === TOTAL_LEVELS) {
    startLvl = TOTAL_LEVELS;
  }
  startLevel(startLvl);
});

levelsBtn.addEventListener('click', () => {
  renderLevelsGrid();
  showScreen(levelsScreen);
});

backToHomeBtn.addEventListener('click', () => {
  showScreen(homeScreen);
});

restartBtn.addEventListener('click', () => {
  clearSelectionState();
  feedbackEl.textContent = '\u00A0';
  feedbackEl.classList.remove('correct');
  buildWheel(LEVELS[currentLevel - 1].word);
});

backToLevelsBtn.addEventListener('click', () => {
  renderLevelsGrid();
  showScreen(levelsScreen);
});

// دکمه‌های داخل overlay برنده شدن
nextLevelBtn.addEventListener('click', () => {
  hideWinOverlay();
  if (currentLevel < TOTAL_LEVELS && currentLevel + 1 <= progress.maxUnlocked) {
    startLevel(currentLevel + 1);
  }
});

winBackToLevelsBtn.addEventListener('click', () => {
  hideWinOverlay();
  renderLevelsGrid();
  showScreen(levelsScreen);
});

closeDiscountBtn.addEventListener('click', () => {
  hideDiscountOverlay();
  // بعد از بستن تخفیف، پیام برنده شدن را نشان بده
  showWinOverlay();
});

// ----- راه‌اندازی اولیه -----
function init() {
  loadProgress();
  // اطمینان از اینکه maxUnlocked حداقل ۱ باشد
  if (progress.maxUnlocked < 1) progress.maxUnlocked = 1;
  if (progress.maxUnlocked > TOTAL_LEVELS) progress.maxUnlocked = TOTAL_LEVELS;
  renderLevelsGrid(); // یک بار آماده کن
  showScreen(homeScreen);
}

init();