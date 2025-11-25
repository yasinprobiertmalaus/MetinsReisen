// 1. Datenmodell: Eine Liste von Erlebnissen
const erlebnisDaten = [
    {
        id: 1,
        titel: "Ümre (Pilgerreise)",
        beschreibung: "Die verpflichtende, organisierte Pilgerreise nach Mekka und Medina. Inklusive Flug, Unterkunft und Begleitung.",
        preis: "ab 1.500 €",
        bildText: "🕌",
        // Detail-Fakten (werden auf detail.html genutzt)
        dauer: "5 Tage / 4 Nächte",
        lage: "Mekka & Medina, Saudi-Arabien",
        reiseart: "Pilgerreise",
        highlights: [
            "Flug ab/bis Deutschland",
            "Premium-Hotelunterkunft nahe der Moschee",
            "Visum-Organisation und Einreisehilfe",
            "Erfahrener Reisebegleiter (Deutsch/Arabisch)",
            "Transfers vor Ort"
        ],
        hinweise: "Bitte beachten Sie, dass für die Ümre besondere Einreisebestimmungen gelten. Die Buchung sollte mindestens 6 Monate im Voraus erfolgen."
    },
    {
        id: 2,
        titel: "Kulturelle Städtereise Istanbul",
        beschreibung: "Entdecken Sie die Hagia Sophia, den Großen Basar und die besten kulinarischen Spots.",
        preis: "ab 799 €",
        bildText: "🏙️",
        // Detail-Fakten
        dauer: "4 Tage / 3 Nächte",
        lage: "Istanbul, Türkei",
        reiseart: "Kultur & Städtetrip",
        highlights: [
            "Flug ab/bis Deutschland",
            "Boutique-Hotel im Zentrum",
            "Geführte Tour durch Sultanahmet",
            "Besuch des Großen Basars",
            "Ein kulinarischer Abend mit lokalen Spezialitäten"
        ],
        hinweise: "Die beste Reisezeit ist Frühling oder Herbst. Ein gültiger Reisepass ist erforderlich."
    },
    {
        id: 3,
        titel: "Wellness-Wochenende in den Alpen",
        beschreibung: "Entspannung und Erholung in einem 4-Sterne-Resort inklusive Massagen und Gourmet-Verpflegung.",
        preis: "ab 450 €",
        bildText: "🏞️",
        // Detail-Fakten
        dauer: "3 Tage / 2 Nächte",
        lage: "Bayerische Alpen, Deutschland",
        reiseart: "Wellness & Erholung",
        highlights: [
            "Luxus-Unterkunft im 4-Sterne-Resort",
            "Täglich Halbpension (Gourmet-Küche)",
            "Zugang zum Spa-Bereich (Sauna, Pool, Dampfbad)",
            "Eine kostenlose Massage pro Person",
            "Wanderwege direkt vom Hotel"
        ],
        hinweise: "Anreise erfolgt auf eigene Faust. Bademäntel und Handtücher werden vom Hotel gestellt."
    }
];

// 2. Simulierte Daten: Vergangene Buchungen
const buchungsDaten = [
    { reise: "Ümre (Pilgerreise)", datum: "01.03.2024", status: "Abgeschlossen" },
    { reise: "Kulturelle Städtereise Istanbul", datum: "15.10.2023", status: "Abgeschlossen" },
    { reise: "Wellness-Wochenende in den Alpen", datum: "10.08.2024", status: "Storniert" }
];

// --- Logik für Katalog und Detailseite ---

// Funktion zum Erstellen einer einzelnen Erlebnis-Karte (Katalogseite)
function erstelleErlebnisKarte(erlebnis) {
    const card = document.createElement('div');
    card.classList.add('erlebnis-card');

    card.innerHTML = `
        <div class="card-image">${erlebnis.bildText}</div>
        <div class="card-content">
            <h3>${erlebnis.titel}</h3>
            <p>${erlebnis.beschreibung}</p>
            <div class="card-footer">
                <span class="card-price">${erlebnis.preis}</span>
                <button class="details-button" data-id="${erlebnis.id}">Details ansehen</button>
            </div>
        </div>
    `;

    // Navigation zur Detailseite beim Klick
    const detailButton = card.querySelector('.details-button');
    detailButton.addEventListener('click', () => {
        window.location.href = `detail.html?id=${erlebnis.id}`; 
    });

    return card;
}

// Funktion zum Laden aller Erlebnisse (Katalogseite)
function ladeErlebnisse() {
    const container = document.querySelector('.erlebnis-container');
    
    if (!container) {
        return;
    }

    erlebnisDaten.forEach(erlebnis => {
        const karte = erstelleErlebnisKarte(erlebnis);
        container.appendChild(karte);
    });
}

// Funktion zur dynamischen Generierung der Detailseite
function ladeErlebnisDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const erlebnisId = parseInt(urlParams.get('id'));
    const erlebnis = erlebnisDaten.find(e => e.id === erlebnisId);
    const detailContent = document.getElementById('erlebnis-detail-content');

    if (!erlebnis || !detailContent) {
        if (detailContent) {
            detailContent.innerHTML = '<h2 class="section-title">Dieses Erlebnis wurde leider nicht gefunden.</h2>';
        }
        return;
    }

    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
        pageTitle.textContent = `${erlebnis.titel} Details`;
    }
    
    const highlightItems = erlebnis.highlights.map(item => `<li>${item}</li>`).join('');

    detailContent.innerHTML = `
        <div class="detail-header">
            <a href="katalog.html" style="font-size:0.9em; color:#008080; text-decoration:none;">&larr; Zurück zum Katalog</a>
            <h2>${erlebnis.titel}</h2>
            <p>${erlebnis.beschreibung}</p>
        </div>

        <div class="detail-content-wrapper">
            
            <div class="detail-info-col">
                <div class="detail-image-placeholder">${erlebnis.bildText} (Großansicht)</div>
                
                <div class="detail-facts">
                    <div class="fact-item">
                        <strong>Dauer</strong>
                        <span>${erlebnis.dauer}</span>
                    </div>
                    <div class="fact-item">
                        <strong>Lage</strong>
                        <span>${erlebnis.lage}</span>
                    </div>
                    <div class="fact-item">
                        <strong>Reiseart</strong>
                        <span>${erlebnis.reiseart}</span>
                    </div>
                </div>

                <h3>Inklusivleistungen & Highlights</h3>
                <ul>
                    ${highlightItems}
                </ul>

                <h3>Wichtige Hinweise</h3>
                <p>${erlebnis.hinweise}</p>
            </div>

            <div class="detail-booking-col">
                <h3>Reise buchen</h3>
                <div class="price-box">
                    <small>Preis ab</small>
                    <p class="main-price">${erlebnis.preis}</p>
                </div>
                
                <form class="booking-form">
                    <label for="travel-date">Reisedatum</label>
                    <input type="date" id="travel-date" required>
                    
                    <label for="person-count">Anzahl Personen</label>
                    <select id="person-count" required>
                        <option value="1">1 Person</option>
                        <option value="2">2 Personen</option>
                        <option value="3">3 Personen</option>
                        <option value="4+">4+ Personen</option>
                    </select>

                    <button type="submit" class="booking-button">Jetzt unverbindlich anfragen</button>
                    <p style="font-size:0.8em; text-align:center; margin-top:10px; color:#666;">Ihre Daten werden vertraulich behandelt.</p>
                </form>
            </div>

        </div>
    `;
    
    // Kleiner Alert für das Formular (wird bei Submit ausgelöst)
    detailContent.querySelector('.booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert(`Anfrage für "${erlebnis.titel}" am ${document.getElementById('travel-date').value} für ${document.getElementById('person-count').value} Personen wurde simuliert!`);
    });
}


// --- JavaScript für die Dynamische Authentifizierung (Login/Mein Konto) ---

function getAuthStatus() {
    // Liest den Status aus dem lokalen Speicher
    return localStorage.getItem('isLoggedIn') === 'true';
}

function setAuthStatus(status) {
    // Speichert den Status im lokalen Speicher
    localStorage.setItem('isLoggedIn', status);
}

// Aktualisiert den Link im Menü (Text und Ziel-URL)
function updateAuthLink() {
    const authLink = document.getElementById('auth-link');
    
    if (!authLink) return;

    if (getAuthStatus()) {
        authLink.textContent = 'Mein Konto (Logout)';
        authLink.href = 'mein_konto.html'; // Führt zur Konto-Seite
        
    } else {
        authLink.textContent = 'Registrierung / Login';
        authLink.href = 'auth.html'; // Führt zur Login/Registrierungsseite
    }
}

// Behandelt den Klick auf den Auth-Link (simuliert Login/Logout)
function handleAuthClick(event) {
    const authLink = document.getElementById('auth-link');
    
    // Stoppt nur, wenn es ein Klick auf den Mein Konto Link der Side-Bar war
    if (!authLink || event.target !== authLink) {
        return;
    }
    
    // Auf der mein_konto Seite wird der Logout über den extra Button behandelt.
    // Hier ist nur der Logout über den Menüpunkt gemeint, wenn eingeloggt und nicht auf der mein_konto-Seite:
    if (getAuthStatus() && !window.location.pathname.endsWith('mein_konto.html')) {
        event.preventDefault(); 
        setAuthStatus(false);
        alert('Sie wurden erfolgreich ausgeloggt. Status: Registrierung / Login');
        window.location.href = 'auth.html'; // Zurück zur Login-Seite
    }
    
    // Der Klick auf den Menülink wird nun durch die href-Änderung in updateAuthLink() gesteuert,
    // sofern nicht gerade ein Logout-Versuch stattfindet.
}


// --- Logik für auth.html (Login/Registrierung) ---

function showLogin(event) {
    if (event) event.preventDefault();
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
}

function showRegister(event) {
    if (event) event.preventDefault();
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.remove('hidden');
}

function setupAuthForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutButton = document.querySelector('.logout-button');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simuliere erfolgreichen Login
            setAuthStatus(true);
            alert('Anmeldung erfolgreich! Sie werden zu Ihrem Konto weitergeleitet.');
            window.location.href = 'mein_konto.html';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simuliere erfolgreiche Registrierung und sofortigen Login
            setAuthStatus(true);
            alert('Registrierung erfolgreich! Sie sind jetzt angemeldet.');
            window.location.href = 'mein_konto.html';
        });
    }
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            setAuthStatus(false);
            alert('Sie wurden erfolgreich ausgeloggt.');
            window.location.href = 'auth.html'; // Zurück zur Login-Seite
        });
    }
}


// --- Logik für mein_konto.html (Dashboard) ---

function ladeMeinKonto() {
    const accountPage = document.querySelector('.account-page');
    
    if (!accountPage) return;

    // Schutz vor direktem Aufruf: Wenn nicht eingeloggt, zur Login-Seite umleiten
    if (!getAuthStatus()) {
        alert('Bitte melden Sie sich an, um diesen Bereich zu sehen.');
        window.location.href = 'auth.html';
        return;
    }
    
    // Simulierte Benutzerdaten
    const userData = {
        name: 'Max Mustermann',
        email: 'max.mustermann@web.de'
    };

    // 1. Kontoinformationen füllen
    document.getElementById('user-name').textContent = userData.name.split(' ')[0]; // Nur Vorname im Titel
    document.getElementById('display-name').textContent = userData.name;
    document.getElementById('display-email').textContent = userData.email;

    // 2. Buchungstabelle füllen
    const bookingTableBody = document.querySelector('#booking-table tbody');
    const noBookings = document.getElementById('no-bookings');
    
    if (buchungsDaten.length === 0) {
        noBookings.classList.remove('hidden');
        document.getElementById('booking-table').style.display = 'none';
        return;
    }

    buchungsDaten.forEach(buchung => {
        const row = bookingTableBody.insertRow();
        row.innerHTML = `
            <td>${buchung.reise}</td>
            <td>${buchung.datum}</td>
            <td><span class="status-${buchung.status.toLowerCase()}">${buchung.status}</span></td>
        `;
    });
}


// --- JavaScript für das Hamburger-Menü ---

function setupMenuToggle() {
    const menu = document.getElementById('side-menu');
    const toggleButton = document.getElementById('menu-toggle');
    const closeButton = menu ? menu.querySelector('.close-btn') : null;

    if (!menu || !toggleButton) return;

    toggleButton.addEventListener('click', () => {
        menu.classList.add('open');
    });

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            menu.classList.remove('open');
        });
    }

    document.addEventListener('click', (event) => {
        if (menu.classList.contains('open') && 
            !menu.contains(event.target) && 
            !toggleButton.contains(event.target)) {
            menu.classList.remove('open');
        }
    });

    menu.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            setTimeout(() => {
                menu.classList.remove('open');
            }, 300); 
        });
    });
}

// --- Startpunkt: Führt alle Setup-Funktionen aus ---
document.addEventListener('DOMContentLoaded', () => {
    // Globale Logik:
    setupMenuToggle();
    updateAuthLink();
    document.addEventListener('click', handleAuthClick); // Klick-Handler für Login/Logout

    // Seitenspezifische Logik:
    const path = window.location.pathname;
    
    if (path.endsWith('katalog.html')) {
        ladeErlebnisse();
    } else if (path.endsWith('detail.html')) {
        ladeErlebnisDetail();
    } else if (path.endsWith('auth.html')) {
        setupAuthForms(); // Login/Register Formular-Logik
    } else if (path.endsWith('mein_konto.html')) {
        setupAuthForms(); // Logout-Button-Logik
        ladeMeinKonto(); // Kontoinformationen laden
    }
});