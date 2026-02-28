document.getElementById("year").textContent = new Date().getFullYear();

const card = document.getElementById("affirmationCard");
const showFormBtn = document.getElementById("showFormBtn");
const formContainer = document.getElementById("affirmationFormContainer");
const form = document.getElementById("affirmationForm");
const input = document.getElementById("affirmationInput");

const STORAGE_KEY = "affirmations";

let affirmations = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    "You are capable of more than you think.",
    "Progress, not perfection.",
    "You matter.",
    "It’s okay to take breaks."
];

let currentIndex = 0;

function saveAffirmations() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(affirmations));
}

function showCurrentCard() {
    if (affirmations.length === 0) {
        card.textContent = "No affirmations yet. Add one below.";
        return;
    }

    card.textContent = affirmations[currentIndex];
}

function nextCard() {
    card.classList.add("swipe-out");

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % affirmations.length;
        card.classList.remove("swipe-out");
        showCurrentCard();
    }, 400);
}

card.addEventListener("click", nextCard);

showFormBtn.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();

    if (!value) return;

    affirmations.unshift(value);
    saveAffirmations();

    currentIndex = 0;
    showCurrentCard();

    input.value = "";
    formContainer.classList.add("hidden");
});

showCurrentCard();