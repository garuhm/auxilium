const hotlines = [

{country:"Australia",info:"Lifeline — 13 11 14"},
{country:"Australia",info:"Kids Helpline — 1800 55 1800"},
{country:"Australia",info:"Beyond Blue — 1300 22 4636"},

{country:"Austria",info:"TelefonSeelsorge — 142"},
{country:"Austria",info:"Rat auf Draht (Youth) — 147"},

{country:"Belgium",info:"Suicide Prevention — 0800 32 123"},
{country:"Belgium",info:"Tele-Onthaal — 106"},

{country:"Brazil",info:"CVV — 188"},
{country:"Brazil",info:"Centro de Valorização da Vida (Chat) — cvv.org.br"},

{country:"Canada",info:"Talk Suicide — 1-833-456-4566"},
{country:"Canada",info:"Kids Help Phone — 1-800-668-6868"},
{country:"Canada",info:"Text CONNECT to 686868"},

{country:"China",info:"Beijing Hotline — 800-810-1117"},
{country:"China",info:"Shanghai Hotline — 021-6438-7250"},

{country:"Denmark",info:"Livslinien — 70 201 201"},
{country:"Denmark",info:"Børns Vilkår (Youth) — 116 111"},

{country:"Finland",info:"MIELI — 09 2525 0111"},
{country:"Finland",info:"Crisis Helpline (Swedish) — 09 2525 0112"},

{country:"France",info:"Suicide Écoute — 01 45 39 40 00"},
{country:"France",info:"3114 National Crisis Line — 3114"},

{country:"Germany",info:"TelefonSeelsorge — 0800 111 0 111"},
{country:"Germany",info:"TelefonSeelsorge — 0800 111 0 222"},
{country:"Germany",info:"Youth Counseling — 116 111"},

{country:"India",info:"AASRA — +91 9820466726"},
{country:"India",info:"iCALL — 9152987821"},
{country:"India",info:"Kiran Mental Health Helpline — 1800-599-0019"},

{country:"Ireland",info:"Pieta — 1800 247 247"},
{country:"Ireland",info:"Samaritans — 116 123"},

{country:"Israel",info:"Eran — 1201"},
{country:"Israel",info:"Eran (Arabic) — 04-7702643"},

{country:"Italy",info:"Telefono Amico — 02 2327 2327"},
{country:"Italy",info:"Samaritans Italia — 800 860 022"},

{country:"Japan",info:"Yorisoi Hotline — 0120-279-338"},
{country:"Japan",info:"Inochi no Denwa — 0570-783-556"},

{country:"Kenya",info:"Befrienders Nairobi — +254 722 178 177"},
{country:"Kenya",info:"Suicide Prevention Kenya — 0800 720 677"},

{country:"Mexico",info:"Línea de la Vida — 800 911 2000"},
{country:"Mexico",info:"Locatel — 55 5658 1111"},

{country:"Netherlands",info:"113 Suicide Prevention — 0800-0113"},
{country:"Netherlands",info:"113 Suicide Prevention (Chat) — 113.nl"},

{country:"New Zealand",info:"Lifeline — 0800 543 354"},
{country:"New Zealand",info:"1737 (Call or Text) — 1737"},

{country:"Nigeria",info:"MANI — +234 703 173 5662"},
{country:"Nigeria",info:"Lagos Suicide Prevention — 0809 111 6264"},

{country:"Norway",info:"Mental Helse — 116 123"},
{country:"Norway",info:"Kirkens SOS — 22 40 00 40"},

{country:"Philippines",info:"NCMH — 1553"},
{country:"Philippines",info:"Hopeline PH — 0917 558 4673"},

{country:"South Africa",info:"Lifeline — 0861 322 322"},
{country:"South Africa",info:"SADAG — 0800 567 567"},

{country:"Spain",info:"Teléfono de la Esperanza — 717 003 717"},
{country:"Spain",info:"024 Línea 024 (National Suicide Prevention) — 024"},

{country:"Sweden",info:"Mind — 90101"},
{country:"Sweden",info:"BRIS (Youth) — 116 111"},

{country:"Switzerland",info:"Die Dargebotene Hand — 143"},
{country:"Switzerland",info:"La Main Tendue — 143"},

{country:"United Kingdom",info:"Samaritans — 116 123"},
{country:"United Kingdom",info:"Shout (Text) — Text 85258"},
{country:"United Kingdom",info:"Papyrus HOPELINE — 0800 068 4141"},

{country:"United States",info:"988 Suicide & Crisis Lifeline — 988"},
{country:"United States",info:"Crisis Text Line — Text HOME to 741741"},
{country:"United States",info:"Trevor Project (LGBTQ+) — 1-866-488-7386"}
];

const modal = document.getElementById('hotlineModal');
const list = document.getElementById('hotlineList');
const searchInput = document.getElementById('searchInput');

/* REGION CODE → COUNTRY MAP */
const regionMap = {
  US:"United States",
  GB:"United Kingdom",
  CA:"Canada",
  AU:"Australia",
  NZ:"New Zealand",
  IE:"Ireland",
  IN:"India",
  JP:"Japan",
  DE:"Germany",
  FR:"France",
  IT:"Italy",
  ES:"Spain",
  NL:"Netherlands",
  SE:"Sweden",
  CH:"Switzerland",
  BR:"Brazil",
  MX:"Mexico",
  ZA:"South Africa"
};

const filterChips = document.querySelectorAll('.filter-chip');
let activeFilter = "all";
let detectedCountryGlobal = null;

/* Render List */

/* Enhanced Render */
function renderList(filterText = "") {
    list.innerHTML = "";

    let results = hotlines.filter(h =>
        h.country.toLowerCase().includes(filterText.toLowerCase()) ||
        h.info.toLowerCase().includes(filterText.toLowerCase())
    );

    // Apply chip filtering
    if (activeFilter === "my" && detectedCountryGlobal) {
        results = results.filter(h => h.country === detectedCountryGlobal);
    }

    if (activeFilter === "am") {
        results = results.filter(h => {
            const first = h.country.charAt(0).toUpperCase();
            return first >= "A" && first <= "M";
        });
    }

    if (activeFilter === "nz") {
        results = results.filter(h => {
            const first = h.country.charAt(0).toUpperCase();
            return first >= "N" && first <= "Z";
        });
    }

    results.sort((a, b) => a.country.localeCompare(b.country));

    if (results.length === 0) {
        list.innerHTML = "<p style='padding:10px;'>No results found.</p>";
        return;
    }

    results.forEach(h => {
        const div = document.createElement('div');
        div.className = 'hotline-country';
        div.dataset.country = h.country;
        div.innerHTML = `<h3>${h.country}</h3><p>${h.info}</p>`;
        list.appendChild(div);
    });

    highlightUserCountry();
}

/* Filter Chip Click Handling */
filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
        filterChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        activeFilter = chip.dataset.filter;
        renderList(searchInput.value);
    });
});

/* Improved Auto Detect */

function highlightUserCountry() {
  const locale = navigator.language || "";
  const regionCode = locale.split('-')[1];

  if (!regionCode) return;

  const detectedCountry = regionMap[regionCode.toUpperCase()];
  if (!detectedCountry) return;

  const matches = [...document.querySelectorAll('.hotline-country')]
    .filter(div => div.dataset.country === detectedCountry);

    matches.forEach((match) => {
        match.classList.add('highlight');
    })
}

function detectUserCountry() {
    const locale = navigator.language || "";
    const regionCode = locale.split('-')[1];

    if (!regionCode) return null;

    const detected = regionMap[regionCode.toUpperCase()];
    detectedCountryGlobal = detected || null;

    const badge = document.getElementById("detectedCountry");
    const badgeName = document.getElementById("detectedCountryName");

    if (detectedCountryGlobal) {
        badge.style.display = "block";
        badgeName.textContent = detectedCountryGlobal;
    }
}

/* Search */

searchInput.addEventListener('input', e => {
  renderList(e.target.value);
});

/* Open Modal */

document.getElementById('openHotlines').onclick = () => {
    modal.style.display = 'flex';
    detectUserCountry();
    renderList();
};

/* Close Modal */

document.getElementById('closeHotlines').onclick = () => {
  modal.style.display = 'none';
};

window.onclick = e => {
  if (e.target === modal) modal.style.display = 'none';
};

/* Close on Escape */

document.addEventListener('keydown', e => {
  if (e.key === "Escape") modal.style.display = 'none';
});

document.getElementById("year").textContent = new Date().getFullYear();