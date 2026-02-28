document.getElementById("year").textContent = new Date().getFullYear();

const selection = document.getElementById("exerciseSelection");
const screen = document.getElementById("exerciseScreen");
const exerciseName = document.getElementById("exerciseName");
const timerDisplay = document.getElementById("timer");
const phaseText = document.getElementById("phaseText");
const circle = document.getElementById("breathingCircle");
const endButtons = document.getElementById("endButtons");

const restartBtn = document.getElementById("restartBtn");
const backBtn = document.getElementById("backBtn");

let currentExercise = null;
let interval = null;
let phases = [];
let currentPhaseIndex = 0;
let timeLeft = 0;
let reps = 4;
let currentRep = 0;

const exercises = {
    box: {
        name: "Box Breathing",
        phases: [
            { name: "Inhale", time: 4 },
            { name: "Hold", time: 4 },
            { name: "Exhale", time: 4 },
            { name: "Hold", time: 4 }
        ]
    },
    "478": {
        name: "4-7-8 Breathing",
        phases: [
            { name: "Inhale", time: 4 },
            { name: "Hold", time: 7 },
            { name: "Exhale", time: 8 }
        ]
    },
    calm: {
        name: "Calm Breathing",
        phases: [
            { name: "Inhale", time: 5 },
            { name: "Exhale", time: 5 }
        ]
    }
};

document.querySelectorAll(".exercise-card").forEach(card => {
    card.addEventListener("click", () => {
        const type = card.dataset.type;
        startExercise(type);
    });
});

function startExercise(type) {
    currentExercise = exercises[type];
    phases = currentExercise.phases;
    currentPhaseIndex = 0;
    currentRep = 0;

    exerciseName.textContent = currentExercise.name;
    selection.classList.add("hidden");
    screen.classList.remove("hidden");
    endButtons.classList.add("hidden");

    nextPhase();
}

function nextPhase() {
    if (currentRep >= reps) {
        finishExercise();
        return;
    }

    const phase = phases[currentPhaseIndex];
    phaseText.textContent = phase.name;
    timeLeft = phase.time;
    timerDisplay.textContent = timeLeft;

    animateCircle(phase.name);

    interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            currentPhaseIndex++;

            if (currentPhaseIndex >= phases.length) {
                currentPhaseIndex = 0;
                currentRep++;
            }

            nextPhase();
        }
    }, 1000);
}

function animateCircle(phase) {
    if (phase === "Inhale") {
        circle.style.transform = "scale(1.3)";
    } else if (phase === "Exhale") {
        circle.style.transform = "scale(1)";
    }
}

function finishExercise() {
    phaseText.textContent = "Well done 💛";
    timerDisplay.textContent = "0";
    endButtons.classList.remove("hidden");
}

restartBtn.addEventListener("click", () => {
    startExercise(Object.keys(exercises).find(key => exercises[key] === currentExercise));
});

backBtn.addEventListener("click", () => {
    screen.classList.add("hidden");
    selection.classList.remove("hidden");
    clearInterval(interval);
});