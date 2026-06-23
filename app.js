const diasGrid = document.getElementById('calendario-dias');
const mesTitulo = document.getElementById('mes-titulo');
const dayDetail = document.getElementById('day-detail');
const detailTitle = document.getElementById('detail-title');
const detailNote = document.getElementById('detail-note');
const loginBtn = document.getElementById('login-btn');
let fechaActual = new Date();
let selectedDay = null;
let usuario = localStorage.getItem('trycalendar_user') || null;

const today = new Date();
const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

function getNotes() {
  try {
    return JSON.parse(localStorage.getItem('trycalendar_notes') || '{}');
  } catch { return {}; }
}

function saveNote(key, text) {
  const notes = getNotes();
  if (text.trim()) {
    notes[key] = text.trim();
  } else {
    delete notes[key];
  }
  localStorage.setItem('trycalendar_notes', JSON.stringify(notes));
}

function openDetail(day, month, year) {
  const key = `${year}-${month}-${day}`;
  selectedDay = { day, month, year, key };
  detailTitle.textContent = `${day} de ${new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date(year, month))}`;
  detailNote.value = getNotes()[key] || '';
  dayDetail.classList.add('open');
  detailNote.focus();
}

function cerrarDetalle() {
  dayDetail.classList.remove('open');
  selectedDay = null;
}

function renderizar() {
  diasGrid.innerHTML = '';
  const year = fechaActual.getFullYear();
  const month = fechaActual.getMonth();
  mesTitulo.textContent = `${new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fechaActual)} ${year}`;

  const primerDia = new Date(year, month, 1).getDay();
  const totalDias = new Date(year, month + 1, 0).getDate();
  const notes = getNotes();

  for (let i = 0; i < primerDia; i++) {
    const div = document.createElement('div');
    div.className = 'dia empty';
    diasGrid.appendChild(div);
  }

  for (let i = 1; i <= totalDias; i++) {
    const div = document.createElement('div');
    div.className = 'dia';
    div.textContent = i;

    const key = `${year}-${month}-${i}`;
    if (key === todayStr) div.classList.add('today');
    if (notes[key]) {
      const dot = document.createElement('span');
      dot.style.cssText = 'position:absolute;bottom:4px;left:50%;transform:translateX(-50%);width:5px;height:5px;border-radius:50%;background:var(--accent);';
      div.appendChild(dot);
    }

    div.style.animationDelay = `${(primerDia + i) * 20}ms`;
    div.addEventListener('click', () => openDetail(i, month, year));
    diasGrid.appendChild(div);
  }
}

document.getElementById('prev').addEventListener('click', () => {
  fechaActual.setMonth(fechaActual.getMonth() - 1);
  renderizar();
});

document.getElementById('next').addEventListener('click', () => {
  fechaActual.setMonth(fechaActual.getMonth() + 1);
  renderizar();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarDetalle();
  if (e.key === 'ArrowLeft') { fechaActual.setMonth(fechaActual.getMonth() - 1); renderizar(); }
  if (e.key === 'ArrowRight') { fechaActual.setMonth(fechaActual.getMonth() + 1); renderizar(); }
});

document.getElementById('btn-save-note').addEventListener('click', () => {
  if (selectedDay) {
    saveNote(selectedDay.key, detailNote.value);
    renderizar();
    cerrarDetalle();
  }
});

document.getElementById('btn-close-detail').addEventListener('click', cerrarDetalle);

function actualizarUI() {
  usuario = localStorage.getItem('trycalendar_user');
  const token = localStorage.getItem('trycalendar_jwt');
  if (usuario && token) {
    loginBtn.textContent = `👤 ${usuario}`;
    loginBtn.style.borderColor = '#4caf50';
    loginBtn.style.color = '#4caf50';
  } else {
    loginBtn.textContent = 'Iniciar Sesión';
    loginBtn.style.borderColor = '';
    loginBtn.style.color = '';
  }
}

loginBtn.addEventListener('click', () => {
  const token = localStorage.getItem('trycalendar_jwt');
  if (token) {
    localStorage.removeItem('trycalendar_jwt');
    localStorage.removeItem('trycalendar_user');
    actualizarUI();
    renderizar();
    return;
  }
  window.open('auth.html', 'TryCalendar Auth', 'width=380,height=500,resizable=yes');
});

window.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'auth-success') {
    actualizarUI();
  }
});

window.addEventListener('storage', (e) => {
  if (e.key && e.key.startsWith('trycalendar_')) {
    actualizarUI();
  }
});

actualizarUI();
renderizar();
