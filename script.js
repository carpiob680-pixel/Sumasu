// --- DATOS DEL JUEGO ---
const database = {
  math: [
    { q: "En un triángulo con catetos 3 y 4, ¿cuánto mide la hipotenusa?", a: ["5", "6", "7"], correct: "5" },
    { q: "Si la hipotenusa es 10 y un cateto es 6, ¿el otro cateto es?", a: ["8", "4", "12"], correct: "8" },
    { q: "Hipotenusa: 10, Cateto: 6. ¿Otro cateto?", a: ["8", "7", "9"], correct: "8" },
    {q: "Catetos: 5 y 12. ¿Hipotenusa?", a: ["13", "15", "17"], correct: "13" },
    {q: "Catetos: 8 y 15. ¿Hipotenusa?", a: ["17", "20", "19"], correct: "17" },
    {q: "Si los catetos son iguales (1 y 1), ¿la hipotenusa es?", a: ["√2", "2", "1"], correct: "√2" }
  ],
  history:[
    { q: "¿En qué año fue la Batalla del Pichincha?", a: ["1822", "1830", "1810"], correct: "1822" },
    { q: "¿Quién fue el primer presidente del Ecuador?", a: ["Juan José Flores", "Eloy Alfaro", "Gabriel García Moreno"], correct: "Juan José Flores" },
    { q: "¿En qué año fue la Batalla del Pichincha?", a: ["1822", "1830", "1809"], correct: "1822" },
    { q: "¿Quién fue el líder de la Revolución Liberal?", a: ["Eloy Alfaro", "Vicente Rocafuerte", "Gabriel García Moreno"], correct: "Eloy Alfaro" },
    { q: "¿En qué ciudad se dio el Primer Grito de Independencia?", a: ["Quito", "Guayaquil", "Cuenca"], correct: "Quito" },
    { q: "¿Quién escribió el Himno Nacional del Ecuador?", a: ["Juan León Mera", "Antonio Neumane", "José Joaquín de Olmedo"], correct: "Juan León Mera" },
    { q: "¿Qué presidente separó la Iglesia del Estado?", a: ["Eloy Alfaro", "Juan José Flores", "Jaime Roldós"], correct: "Eloy Alfaro" },
    { q: "¿En qué año regresó el Ecuador a la democracia?", a: ["1979", "1985", "1970"], correct: "1979" }
  ],
  philosophy: [
    { q: "La disciplina que estudia la belleza se llama:", a: ["Estética", "Ética", "Lógica"], correct: "Estética" },
    { q: "¿Qué estudia la Ética?", a: ["El comportamiento moral", "Los astros", "Las leyes físicas"], correct: "El comportamiento moral" }
  ]
};

// --- ESTADO GLOBAL ---
let streak = 0;
let points = 0;
let totalAttempts = 0;
let correctAttempts = 0;

function startLevel(subject) {
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('game-board').classList.remove('hidden');
  loadQuestion(subject);
}

function loadQuestion(subject) {
  const container = document.getElementById('options-container');
  const questionData = database[subject][Math.floor(Math.random() * database[subject].length)];
  
  document.getElementById('subject-title').innerText = subject.toUpperCase();
  document.getElementById('question-text').innerText = questionData.q;
  container.innerHTML = "";

  questionData.a.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option, questionData.correct, subject);
    container.appendChild(btn);
  });
}

function checkAnswer(selected, correct, subject) {
  totalAttempts++;
  if (selected === correct) {
    streak++;
    points += 100 * streak; // Los puntos valen más con racha
    correctAttempts++;
    alert("¡Correcto! 🔥 Racha: " + streak);
  } else {
    alert("¡MUERTE DE RACHA! 💀 Volviendo a cero.");
    streak = 0;
  }
  updateStats();
  loadQuestion(subject);
}

function updateStats() {
  document.getElementById('streak').innerText = streak;
  document.getElementById('points').innerText = points;
  let avg = (correctAttempts / totalAttempts) * 100;
  document.getElementById('average').innerText = Math.round(avg) + "%";
}

function showMenu() {
  document.getElementById('menu').classList.remove('hidden');
  document.getElementById('game-board').classList.add('hidden');
}