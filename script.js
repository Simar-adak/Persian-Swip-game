// =========================================================
// Persian Word Swipe – تمام منطق بازی
// =========================================================
const MASTER_WORDS = [
  { word: 'آش',          hint: 'یک سوپ سنتی ایرانی با سبزی و حبوبات' },
  { word: 'نان',         hint: 'خوراک اصلی هر سفره‌ی ایرانی' },
  { word: 'کباب',        hint: 'گوشت مزه‌دار شده روی سیخ و کبابی‌شده' },
  { word: 'دیزی',        hint: 'خورش گوشت و نخود در دیگ سنگی' },
  { word: 'حلیم',        hint: 'آشی از گندم و گوشت، کوبیده و نرم' },
  { word: 'سمنو',        hint: 'شیرینی سنتی نوروز از جوانه‌ی گندم' },
  { word: 'قیمه',        hint: 'خورشی با گوشت چرخ‌کرده، لپه و سیب‌زمینی سرخ‌کرده' },
  { word: 'جوجه',        hint: 'مرغ مزه‌دار شده و کبابی‌شده روی سیخ' },
  { word: 'رشته',        hint: 'خمیر باریک، پایه‌ی اصلی آش رشته' },
  { word: 'ماست',        hint: 'لبنیات ترش و سفید، از تخمیر شیر' },
  { word: 'خرما',        hint: 'میوه‌ی شیرین نخل، خوراک افطار' },
  { word: 'پنیر',        hint: 'لبنیات سفید، همراه نان و گردو در صبحانه' },
  { word: 'برنج',        hint: 'غله‌ای که پخته و به‌صورت چلو و پلو سرو می‌شود' },
  { word: 'گوشت',        hint: 'ماده‌ی اصلی بسیاری از خورش‌ها و کباب‌ها' },
  { word: 'خیار',        hint: 'سبزی خنک و آبدار، همیشه روی سفره' },
  { word: 'قورمه',       hint: 'خورشی سبز با سبزی معطر و لوبیا قرمز' },
  { word: 'آبگوشت',      hint: 'خورش گوشت و نخود، به دیزی هم معروف است' },
  { word: 'بریانی',      hint: 'غذایی از گوشت کوبیده و برنج، مخصوص اصفهان' },
  { word: 'فسنجون',      hint: 'خورش گردو و رب انار با مرغ یا گوشت' },
  { word: 'باقلوا',      hint: 'شیرینی لایه‌ای با پسته یا گردو و شربت' },
  { word: 'باقالاقاتق',  hint: 'یک غذای محلی شمال کشور' },
  { word: 'چای',         hint: 'نوشیدنی داغ و همیشگی مهمانی‌ها' },
  { word: 'سیب',         hint: 'میوه‌ای ترد، سرخ یا سبز' },
  { word: 'کته',         hint: 'برنج ساده‌ی آبکش‌نشده' },
  { word: 'کوکو',        hint: 'نوعی املت سبزی، سرخ‌شده در تابه' },
  { word: 'عدسی',        hint: 'سوپ گرم با عدس و سبزی' },
  { word: 'دلمه',        hint: 'برگ مو یا سبزی، پر از برنج و گوشت' },
  { word: 'آجیل',        hint: 'تنقلات مغزدار شب یلدا' },
  { word: 'کشمش',        hint: 'انگور خشک‌شده و شیرین' },
  { word: 'ترشی',        hint: 'همراه ترش و تند هر غذا' },
  { word: 'تخم‌مرغ',      hint: 'خوراک اصلی صبحانه، از مرغ' },
  { word: 'زعفران',      hint: 'گران‌بهاترین ادویه‌ی ایرانی' },
  { word: 'گلاب',        hint: 'عرق خوشبو از گلبرگ محمدی' },
  { word: 'شربت',        hint: 'نوشیدنی خنک و شیرین تابستانی' },
  { word: 'دوغ',         hint: 'نوشیدنی ترش از ماست و آب' },
  { word: 'کوفته',       hint: 'گلوله‌ی گرد از گوشت چرخ‌کرده' },
  { word: 'ته‌چین',       hint: 'برنج و مرغ، لایه‌لایه در قابلمه' },
  { word: 'زولبیا',      hint: 'شیرینی حلقه‌ای ماه رمضان' },
  { word: 'مربا',        hint: 'میوه‌ی پخته‌شده در شربت شیرین' },
  { word: 'حریره',       hint: 'آش شیرین و نرم، خوراک افطار' },
  { word: 'کشک',         hint: 'ماده‌ی لبنی ترش، همراه بادمجان' },
  { word: 'سوپ',         hint: 'خوراک گرم و رقیق، پیش‌غذا' },
  { word: 'کلوچه',       hint: 'شیرینی پرشده، مخصوص فومن' },
  { word: 'گز',          hint: 'سوغات سفید و پسته‌ای اصفهان' },
  { word: 'سوهان',       hint: 'سوغات طلایی و ترد قم' },
  { word: 'پلو',         hint: 'برنج همراه با گوشت یا سبزی' },
  { word: 'چلو',         hint: 'برنج ساده، همراه همیشگی کباب' },
  { word: 'کدو',         hint: 'سبزی نارنجی خورشتی' },
  { word: 'بادمجان',     hint: 'سبزی بنفش، پایه‌ی کشک‌بادمجان' },
  { word: 'زرشک',        hint: 'دانه‌ی ترش و قرمز روی پلو' }
];

const SESSION_SIZE = 10;
let LEVELS = [];
let TOTAL_LEVELS = SESSION_SIZE;

const PERSIAN_ALPHABET = [
  'ا','ب','پ','ت','ث','ج','چ','ح','خ','د','ذ','ر','ز','ژ','س','ش',
  'ص','ض','ط','ظ','ع','غ','ف','ق','ک','گ','ل','م','ن','و','ه','ی'
];

const PERSIAN_DIGITS = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
function toPersianDigits(num) {
  return String(num).replace(/[0-9]/g, d => PERSIAN_DIGITS[d]);
}

const HINT_LIMIT = 2;
const STORAGE_KEY = 'persian_word_swipe_progress';
let progress = { maxUnlocked: 1, completed: [], sessionWords: [], sessionFinished: false, hintUnlockedLevels: [] };

function pickNewSessionWords() {
  const idx = MASTER_WORDS.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, SESSION_SIZE);
}

function startFreshRound() {
  progress.sessionWords = pickNewSessionWords();
  progress.maxUnlocked = 1;
  progress.completed = [];
  progress.sessionFinished = false;
  progress.hintUnlockedLevels = [];
  LEVELS = progress.sessionWords.map(i => MASTER_WORDS[i]);
  TOTAL_LEVELS = LEVELS.length;
  saveProgress();
}

function restartSameRound() {
  progress.maxUnlocked = 1;
  progress.completed = [];
  progress.hintUnlockedLevels = [];
  progress.sessionFinished = false;
  saveProgress();
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      progress.maxUnlocked = parsed.maxUnlocked || 1;
      progress.completed = parsed.completed || [];
      progress.sessionWords = Array.isArray(parsed.sessionWords) ? parsed.sessionWords : [];
      progress.sessionFinished = !!parsed.sessionFinished;
      progress.hintUnlockedLevels = Array.isArray(parsed.hintUnlockedLevels) ? parsed.hintUnlockedLevels : [];
    }
  } catch (e) {}

  const validSession = progress.sessionWords.length === SESSION_SIZE &&
    progress.sessionWords.every(i => Number.isInteger(i) && i >= 0 && i < MASTER_WORDS.length);

  if (!validSession || progress.sessionFinished) {
    startFreshRound();
  } else {
    LEVELS = progress.sessionWords.map(i => MASTER_WORDS[i]);
    TOTAL_LEVELS = LEVELS.length;
  }
}
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// DOM refs
const homeScreen = document.getElementById('home-screen');
const levelsScreen = document.getElementById('levels-screen');
const gameScreen = document.getElementById('game-screen');
const winOverlay = document.getElementById('win-overlay');
const discountOverlay = document.getElementById('discount-overlay');
const playBtn = document.getElementById('play-btn');
const levelsBtn = document.getElementById('levels-btn');
const resetBtn = document.getElementById('reset-btn');
const backToHomeBtn = document.getElementById('back-to-home-btn');
const restartBtn = document.getElementById('restart-btn');
const backToLevelsBtn = document.getElementById('back-to-levels-btn');
const nextLevelBtn = document.getElementById('next-level-btn');
const winBackToLevelsBtn = document.getElementById('win-back-to-levels-btn');
const closeDiscountBtn = document.getElementById('close-discount-btn');
const hintBtn = document.getElementById('hint-btn');
const hintText = document.getElementById('hint-text');
const levelsGrid = document.getElementById('levels-grid');
const levelIndicator = document.getElementById('level-indicator');
const selectionDisplay = document.getElementById('selection-display');
const feedbackEl = document.getElementById('feedback');
const wheelEl = document.getElementById('wheel');
const traceLine = document.getElementById('trace-line');
const winWordEl = document.getElementById('win-word');
const winCopyEl = document.getElementById('win-copy');
const musicBtn = document.getElementById('music-btn');

let currentLevel = 1;
let dragging = false;
let selectedTiles = [];
let currentWordLetters = [];
let hintVisible = false;
const WHEEL_SIZE = 300;
const WHEEL_CENTER = WHEEL_SIZE / 2;

// ---------- Audio ----------
const MUSIC_KEY = 'persian_word_swipe_music';
let audioCtx = null, musicGain = null, sfxGain = null;
let musicOn = true;
let musicTimer = null, nextNoteTime = 0, musicPatternIndex = 0;

const TEMPO = 108;
const MUSIC_NOTES = [
  { note: 261.63, dur: 0.25 },
  { note: 293.66, dur: 0.25 },
  { note: 329.63, dur: 0.25 },
  { note: 349.23, dur: 0.25 },
  { note: 392.00, dur: 0.25 },
  { note: 349.23, dur: 0.25 },
  { note: 329.63, dur: 0.25 },
  { note: 293.66, dur: 0.25 },
  { note: 392.00, dur: 0.35 },
  { note: 440.00, dur: 0.25 },
  { note: 493.88, dur: 0.25 },
  { note: 523.25, dur: 0.35 },
  { note: 493.88, dur: 0.25 },
  { note: 440.00, dur: 0.25 },
  { note: 392.00, dur: 0.35 },
  { note: 349.23, dur: 0.25 }
];
const MUSIC_PATTERN = [0, 1, 2, 3, 4, 3, 2, 1, 4, 5, 6, 7, 6, 5, 4, 3];

function ensureAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioCtx = new AC();
    musicGain = audioCtx.createGain(); musicGain.gain.value = 0.15; musicGain.connect(audioCtx.destination);
    sfxGain = audioCtx.createGain(); sfxGain.gain.value = 0.5; sfxGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTone(f, t, dur, type, vol, dest) {
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(dest);
  o.start(t); o.stop(t + dur + 0.05);
}

function scheduleMusicNote(time, noteObj) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(noteObj.note, time);
  gain.gain.setValueAtTime(0.15, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + noteObj.dur * 0.9);
  osc.connect(gain); gain.connect(musicGain);
  osc.start(time); osc.stop(time + noteObj.dur);

  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(noteObj.note * 2.01, time);
  gain2.gain.setValueAtTime(0.03, time);
  gain2.gain.exponentialRampToValueAtTime(0.001, time + noteObj.dur * 0.6);
  osc2.connect(gain2); gain2.connect(musicGain);
  osc2.start(time); osc2.stop(time + noteObj.dur);
}

function musicScheduler() {
  if (!audioCtx || !musicOn) return;
  const now = audioCtx.currentTime;
  while (nextNoteTime < now + 0.2) {
    const idx = MUSIC_PATTERN[musicPatternIndex % MUSIC_PATTERN.length];
    const noteObj = MUSIC_NOTES[idx];
    scheduleMusicNote(nextNoteTime, noteObj);
    musicPatternIndex++;
    const beatDuration = 60 / TEMPO;
    nextNoteTime += beatDuration * 0.45;
  }
  musicTimer = requestAnimationFrame(musicScheduler);
}

function startMusic() {
  ensureAudio();
  if (!audioCtx || musicTimer) return;
  nextNoteTime = audioCtx.currentTime + 0.1;
  musicPatternIndex = 0;
  musicScheduler();
}

function stopMusic() {
  if (musicTimer) {
    cancelAnimationFrame(musicTimer);
    musicTimer = null;
  }
}

function sfxClick() {
  if (!audioCtx) return;
  playTone(700, audioCtx.currentTime, 0.07, 'triangle', 0.4, sfxGain);
}
function sfxPop(n) {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const f = 420 + n * 35;
  const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(f, t);
  o.frequency.exponentialRampToValueAtTime(f * 1.7, t + 0.09);
  g.gain.setValueAtTime(0.5, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
  o.connect(g); g.connect(sfxGain);
  o.start(t); o.stop(t + 0.14);
}
function sfxWin() {
  if (!audioCtx) return;
  const t0 = audioCtx.currentTime;
  [523, 659, 784, 1047].forEach((f, i) => {
    playTone(f, t0 + i * 0.08, 0.2, 'sine', 0.12, sfxGain);
  });
}
function sfxFail() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
  o.type = 'square';
  o.frequency.setValueAtTime(170, t);
  o.frequency.exponentialRampToValueAtTime(90, t + 0.22);
  g.gain.setValueAtTime(0.22, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
  o.connect(g); g.connect(sfxGain);
  o.start(t); o.stop(t + 0.3);
}

// ---------- Confetti ----------
function burstConfetti(host) {
  const items = ['🎉','🎊','⭐','✨','🌿','❤️','🍽️'];
  for (let i = 0; i < 26; i++) {
    const s = document.createElement('span');
    s.className = 'confetti';
    s.textContent = items[Math.floor(Math.random() * items.length)];
    s.style.left = (Math.random() * 96) + '%';
    s.style.fontSize = (14 + Math.random() * 20) + 'px';
    s.style.animationDelay = (Math.random() * 0.35) + 's';
    host.appendChild(s);
    setTimeout(() => s.remove(), 2400);
  }
}

// ---------- Floating Emojis ----------
const FLOAT_EMOJIS = ['🍢','','🫓','🍇','🍅','🧅','🍗','🍰','🌿','🍉'];
function initFloaties() {
  const wrap = document.getElementById('floaties');
  if (!wrap) return;
  for (let i = 0; i < 14; i++) {
    const f = document.createElement('span');
    f.className = 'floaty';
    f.textContent = FLOAT_EMOJIS[i % FLOAT_EMOJIS.length];
    f.style.left = (Math.random() * 94) + '%';
    f.style.fontSize = (16 + Math.random() * 24) + 'px';
    f.style.animationDuration = (16 + Math.random() * 16) + 's';
    f.style.animationDelay = (-Math.random() * 24) + 's';
    wrap.appendChild(f);
  }
}

// ---------- Screen navigation ----------
function showScreen(screen) {
  [homeScreen, levelsScreen, gameScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

// ---------- Levels Grid ----------
function renderLevelsGrid() {
  levelsGrid.innerHTML = '';
  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.textContent = toPersianDigits(i);
    btn.disabled = i > progress.maxUnlocked;
    if (progress.completed.includes(i)) btn.classList.add('completed');
    btn.addEventListener('click', () => {
      if (i <= progress.maxUnlocked) startLevel(i);
    });
    levelsGrid.appendChild(btn);
  }
}

// ---------- Start Level ----------
function startLevel(level) {
  currentLevel = level;
  hideWinOverlay();
  hideDiscountOverlay();
  feedbackEl.textContent = '\u00A0';
  feedbackEl.classList.remove('correct');
  clearSelectionState();
  resetHint();
  levelIndicator.textContent = `مرحله ${toPersianDigits(level)}`;
  buildWheel(level);
  showScreen(gameScreen);
}

// ---------- Difficulty ----------
function getDecoyCount(level) {
  return Math.min(6, Math.floor((level - 1) / 3));
}
function getTileMetrics(count) {
  if (count <= 4)  return { diameter: 66, radius: 100 };
  if (count <= 6)  return { diameter: 62, radius: 105 };
  if (count <= 8)  return { diameter: 56, radius: 108 };
  if (count <= 10) return { diameter: 50, radius: 112 };
  if (count <= 13) return { diameter: 44, radius: 116 };
  return { diameter: 38, radius: 120 };
}

// ---------- Wheel Build ----------
function seededRandom(seed) {
  let s = seed >>> 0;
  return function () {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffleArray(arr, rng) {
  const rand = rng || Math.random;
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickDecoyLetters(word, count, rng) {
  const wordLetters = new Set(Array.from(word));
  const pool = PERSIAN_ALPHABET.filter(ch => !wordLetters.has(ch));
  return shuffleArray(pool, rng).slice(0, count);
}
function buildWheel(level) {
  wheelEl.querySelectorAll('.tile').forEach(t => t.remove());
  const word = LEVELS[level - 1].word;
  currentWordLetters = Array.from(word);
  const seedRng = seededRandom(level * 104729 + 7);
  const decoyCount = getDecoyCount(level);
  const decoyLetters = pickDecoyLetters(word, decoyCount, seedRng);
  const tileData = currentWordLetters
    .map(ch => ({ char: ch }))
    .concat(decoyLetters.map(ch => ({ char: ch })));
  const order = shuffleArray(tileData.map((_, i) => i));
  const count = order.length;
  const { diameter, radius } = getTileMetrics(count);
  const fontSize = Math.max(15, Math.round(diameter * 0.44));
  order.forEach((dataIndex, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const data = tileData[dataIndex];
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.dataset.char = data.char;
    tile.setAttribute('lang', 'fa');
    tile.setAttribute('role', 'button');
    tile.style.width = `${diameter}px`;
    tile.style.height = `${diameter}px`;
    tile.style.fontSize = `${fontSize}px`;
    tile.style.left = `${WHEEL_CENTER + x}px`;
    tile.style.top = `${WHEEL_CENTER + y}px`;
    tile.textContent = data.char;
    tile._x = x;
    tile._y = y;
    tile.classList.add('pop-in');
    tile.style.animationDelay = (i * 45) + 'ms';
    tile.addEventListener('animationend', () => {
      tile.classList.remove('pop-in');
      tile.style.animationDelay = '';
    }, { once: true });
    tile.addEventListener('pointerdown', onTileDown);
    wheelEl.appendChild(tile);
  });
}

// ---------- Drag interaction ----------
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
  sfxPop(selectedTiles.length);
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

// ---------- Evaluation ----------
function evaluateSelection() {
  const attempt = selectedTiles.map(t => t.dataset.char).join('');
  const target = LEVELS[currentLevel - 1].word;
  if (attempt === target) {
    feedbackEl.textContent = 'درست است!';
    feedbackEl.classList.add('correct');
    sfxWin();
    if (!progress.completed.includes(currentLevel)) {
      progress.completed.push(currentLevel);
      if (currentLevel + 1 > progress.maxUnlocked && currentLevel < TOTAL_LEVELS) {
        progress.maxUnlocked = currentLevel + 1;
      }
    }
    const isLastOfSession = currentLevel === TOTAL_LEVELS;
    if (isLastOfSession) {
      progress.sessionFinished = true;
      updateResetButtonLabel();
    }
    saveProgress();
    if (isLastOfSession) {
      showDiscountOverlay();
    } else {
      showWinOverlay();
    }
  } else {
    feedbackEl.textContent = attempt ? 'دوباره تلاش کن.' : '\u00A0';
    feedbackEl.classList.remove('correct');
    if (attempt) sfxFail();
    clearSelectionState();
  }
}

// ---------- Hint ----------
function updateHintButtonLabel() {
  const unlockedHere = progress.hintUnlockedLevels.includes(currentLevel);
  const remaining = HINT_LIMIT - progress.hintUnlockedLevels.length;
  if (unlockedHere) {
    hintBtn.disabled = false;
    hintBtn.textContent = hintVisible ? 'پنهان‌کردن راهنمایی' : 'راهنمایی 💡';
  } else if (remaining > 0) {
    hintBtn.disabled = false;
    hintBtn.textContent = `راهنمایی 💡 (${toPersianDigits(remaining)} بار مونده)`;
  } else {
    hintBtn.disabled = true;
    hintBtn.textContent = 'راهنمایی‌هات تمام شد 🚫';
  }
}
function resetHint() {
  hintVisible = false;
  hintText.classList.remove('visible');
  hintText.textContent = '';
  updateHintButtonLabel();
}
function toggleHint() {
  const unlockedHere = progress.hintUnlockedLevels.includes(currentLevel);
  if (!unlockedHere) {
    if (progress.hintUnlockedLevels.length >= HINT_LIMIT) return;
    progress.hintUnlockedLevels.push(currentLevel);
    saveProgress();
  }
  hintVisible = !hintVisible;
  if (hintVisible) {
    hintText.textContent = LEVELS[currentLevel - 1].hint;
    hintText.classList.add('visible');
  } else {
    hintText.classList.remove('visible');
  }
  updateHintButtonLabel();
}
hintBtn.addEventListener('click', toggleHint);

// ---------- Overlays ----------
function showWinOverlay() {
  winWordEl.textContent = LEVELS[currentLevel - 1].word;
  const isLastOfSession = currentLevel === TOTAL_LEVELS;
  winCopyEl.textContent = isLastOfSession
    ? 'همه‌ی ۱۰ مرحله‌ی این دوره رو بردی! دفعه‌ی بعد که بازی رو باز کنی، ۱۰ مرحله‌ی تازه منتظرته.'
    : 'شما این غذای خوشمزه را پیدا کردید.';
  winBackToLevelsBtn.textContent = isLastOfSession ? 'بازگشت به صفحه اصلی' : 'بازگشت به مراحل';
  winOverlay.classList.remove('hidden');
  burstConfetti(winOverlay);
  nextLevelBtn.style.display = (currentLevel < TOTAL_LEVELS && currentLevel + 1 <= progress.maxUnlocked)
    ? 'block' : 'none';
}
function hideWinOverlay() { winOverlay.classList.add('hidden'); }
function showDiscountOverlay() {
  discountOverlay.classList.remove('hidden');
  burstConfetti(discountOverlay);
}
function hideDiscountOverlay() { discountOverlay.classList.add('hidden'); }

// ---------- Buttons ----------
playBtn.addEventListener('click', () => {
  let startLvl = progress.maxUnlocked;
  if (progress.completed.length === TOTAL_LEVELS) startLvl = TOTAL_LEVELS;
  startLevel(startLvl);
});
levelsBtn.addEventListener('click', () => { renderLevelsGrid(); showScreen(levelsScreen); });
resetBtn.addEventListener('click', () => {
  if (progress.sessionFinished) {
    startFreshRound();
  } else {
    if (!confirm('مطمئنی؟ پیشرفتت توی این دوره و راهنمایی‌های استفاده‌شده پاک می‌شه.')) return;
    restartSameRound();
  }
  updateResetButtonLabel();
  renderLevelsGrid();
  startLevel(1);
});
backToHomeBtn.addEventListener('click', () => { showScreen(homeScreen); });
restartBtn.addEventListener('click', () => {
  clearSelectionState();
  feedbackEl.textContent = '\u00A0';
  feedbackEl.classList.remove('correct');
  resetHint();
  buildWheel(currentLevel);
});
backToLevelsBtn.addEventListener('click', () => { renderLevelsGrid(); showScreen(levelsScreen); });
nextLevelBtn.addEventListener('click', () => {
  hideWinOverlay();
  if (currentLevel < TOTAL_LEVELS && currentLevel + 1 <= progress.maxUnlocked) {
    startLevel(currentLevel + 1);
  }
});
winBackToLevelsBtn.addEventListener('click', () => {
  hideWinOverlay();
  if (currentLevel === TOTAL_LEVELS) {
    showScreen(homeScreen);
  } else {
    renderLevelsGrid();
    showScreen(levelsScreen);
  }
});
closeDiscountBtn.addEventListener('click', () => {
  hideDiscountOverlay();
  showWinOverlay();
});

// ---------- Music toggle ----------
try { musicOn = localStorage.getItem(MUSIC_KEY) !== 'off'; } catch (e) {}
function refreshMusicBtn() {
  musicBtn.textContent = musicOn ? '🎵' : '🔇';
  musicBtn.classList.toggle('off', !musicOn);
  musicBtn.title = musicOn ? 'توقف موسیقی' : 'پخش موسیقی';
}
musicBtn.addEventListener('click', () => {
  musicOn = !musicOn;
  try { localStorage.setItem(MUSIC_KEY, musicOn ? 'on' : 'off'); } catch (e) {}
  refreshMusicBtn();
  if (musicOn) startMusic(); else stopMusic();
});
document.addEventListener('pointerdown', () => {
  ensureAudio();
  if (musicOn) startMusic();
});

// ---------- Reset button label ----------
function updateResetButtonLabel() {
  resetBtn.textContent = progress.sessionFinished ? 'کد تخفیف جدید می‌خوام' : 'تسلیم شدم از اول امتحان می‌کنم';
}

// ---------- Init ----------
function init() {
  loadProgress();
  if (progress.maxUnlocked < 1) progress.maxUnlocked = 1;
  if (progress.maxUnlocked > TOTAL_LEVELS) progress.maxUnlocked = TOTAL_LEVELS;
  renderLevelsGrid();
  updateResetButtonLabel();
  initFloaties();
  refreshMusicBtn();
  showScreen(homeScreen);
}
init();