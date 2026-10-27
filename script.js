const supabaseUrl = 'https://mcrnounholgieznvniav.supabase.co';
const supabasePublishableKey = 'sb_publishable_kDIWNlTtmjn2D1bjKjjZAg_9LDNtgmM';
const supabaseConfigured = !supabaseUrl.includes('YOUR_PROJECT_ID')
    && !supabasePublishableKey.includes('YOUR_SUPABASE_PUBLISHABLE_KEY');
const authClient = supabaseConfigured
    ? window.supabase.createClient(supabaseUrl, supabasePublishableKey)
    : null;
const loginPageEl = document.querySelector('.login-page');
const appEl = document.querySelector('.container');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginMessage = document.getElementById('loginMessage');
const authSubmit = document.getElementById('authSubmit');
const authModeToggle = document.getElementById('authModeToggle');
const authIntro = document.getElementById('authIntro');
const themeToggles = [
    document.getElementById('loginThemeToggle'),
    document.getElementById('appThemeToggle')
];
const accountMenus = Array.from(document.querySelectorAll('.account-menu'));
const languageToggles = Array.from(document.querySelectorAll('.language-toggle'));
const translations = {
    no: {
        settings: 'Åpne innstillinger',
        darkMode: 'Mørk modus',
        lightMode: 'Lys modus',
        loginTitle: 'Logg inn',
        loginIntro: 'Logg inn for å åpne brann-alarm check.',
        signupIntro: 'Opprett en konto for å åpne brann-alarm check.',
        email: 'E-postadresse',
        emailPlaceholder: 'navn@eksempel.no',
        password: 'Passord',
        passwordPlaceholder: 'Skriv inn passord',
        login: 'Logg inn',
        createAccount: 'Opprett konto',
        createAccountPrompt: 'Har du ikke konto? Opprett konto',
        existingAccountPrompt: 'Har du allerede konto? Logg inn',
        appSubtitle: 'Registrering av klasser under brannøvelse',
        logout: 'Logg ut',
        school: 'Skole',
        schoolDescription: 'Velg skole for å vise skolens godkjente utganger',
        chooseSchool: 'Velg skole',
        alarmType: 'Type Alarm',
        alarmDescription: 'Velg om dette er en test eller ekte alarm',
        testAlarm: 'Test / Øvelse',
        realAlarm: 'Ekte Alarm',
        newClass: 'Legg til ny klasse',
        className: 'Klassenavn',
        add: 'Legg til',
        classList: 'Klasseliste',
        export: 'Eksporter til ekte Excel-fil (.xlsx)',
        confirmExport: 'Bekreft eksport',
        confirmExportText: 'Er du sikker på at du er ferdig og vil eksportere registreringen til Excel?',
        cancelExport: 'Nei, gå tilbake',
        confirmExportButton: 'Ja, eksporter',
        emptyClassList: 'Ingen klasser lagt til ennå.',
        exit: 'Utgang',
        chooseExit: 'Velg utgang',
        students: 'Elever',
        present: 'På plass (Ja)',
        absent: 'Ikke på plass (Nei)',
        contactTeacher: 'Kontaktlærer',
        teacherPresent: 'Ja (På plass)',
        teacherAbsent: 'Nei (Ikke på plass)',
        changeToNo: 'Endre til Nei',
        markYes: 'Kryss av (Ja)',
        teacherOnSite: 'Lærer på plass',
        deleteClass: 'Slett klasse',
        loginUnavailable: 'Innlogging er ikke tilgjengelig akkurat nå. Prøv igjen senere.',
        creatingAccount: 'Oppretter konto ...',
        signingIn: 'Logger inn ...',
        accountCreated: 'Kontoen er opprettet. Sjekk e-posten din for å bekrefte kontoen før du logger inn.',
        loginSuccess: 'Innlogging vellykket.',
        loginFailed: 'Innloggingen mislyktes. Kontroller opplysningene og prøv igjen.',
        loginStatusFailed: 'Kunne ikke hente innloggingsstatus',
        logoutFailed: 'Kunne ikke logge ut',
        unknownError: 'En ukjent feil oppstod.',
        exportUnavailable: 'Excel-eksport er ikke tilgjengelig. Kontroller internettilkoblingen og prøv igjen.',
        date: 'Dato',
        time: 'Tidspunkt',
        alarmTypeColumn: 'Alarmtype',
        classColumn: 'Klasse',
        exitColumn: 'Utgang',
        studentsPresent: 'Elever til stede',
        teacherColumn: 'Kontaktlærer',
        yesOnSite: 'Ja (På plass)',
        noNotOnSite: 'Nei (Ikke på plass)',
        workbookSheet: 'Brannøvelse',
        drillFilename: 'brannøvelse_rapport',
        realAlarmFilename: 'brann_rapport'
    },
    en: {
        settings: 'Open settings',
        darkMode: 'Dark mode',
        lightMode: 'Light mode',
        loginTitle: 'Log in',
        loginIntro: 'Log in to open Fire Drill Check.',
        signupIntro: 'Create an account to open Fire Drill Check.',
        email: 'Email address',
        emailPlaceholder: 'name@example.com',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        login: 'Log in',
        createAccount: 'Create account',
        createAccountPrompt: "Don't have an account? Create one",
        existingAccountPrompt: 'Already have an account? Log in',
        appSubtitle: 'Class registration for fire drills',
        logout: 'Log out',
        school: 'School',
        schoolDescription: "Choose a school to show its approved exits",
        chooseSchool: 'Choose school',
        alarmType: 'Alarm type',
        alarmDescription: 'Choose whether this is a drill or a real alarm',
        testAlarm: 'Test / Drill',
        realAlarm: 'Real Alarm',
        newClass: 'Add a new class',
        className: 'Class name',
        add: 'Add',
        classList: 'Class list',
        export: 'Export to Excel (.xlsx)',
        confirmExport: 'Confirm export',
        confirmExportText: 'Are you sure you are finished and want to export the registration to Excel?',
        cancelExport: 'No, go back',
        confirmExportButton: 'Yes, export',
        emptyClassList: 'No classes added yet.',
        exit: 'Exit',
        chooseExit: 'Choose exit',
        students: 'Students',
        present: 'Present (Yes)',
        absent: 'Not present (No)',
        contactTeacher: 'Teacher',
        teacherPresent: 'Yes (Present)',
        teacherAbsent: 'No (Not present)',
        changeToNo: 'Change to No',
        markYes: 'Mark present (Yes)',
        teacherOnSite: 'Teacher present',
        deleteClass: 'Delete class',
        loginUnavailable: 'Login is unavailable right now. Please try again later.',
        creatingAccount: 'Creating account ...',
        signingIn: 'Logging in ...',
        accountCreated: 'Your account has been created. Check your email to confirm it before logging in.',
        loginSuccess: 'Login successful.',
        loginFailed: 'Login failed. Check your details and try again.',
        loginStatusFailed: 'Could not retrieve login status',
        logoutFailed: 'Could not log out',
        unknownError: 'An unknown error occurred.',
        exportUnavailable: 'Excel export is unavailable. Check your internet connection and try again.',
        date: 'Date',
        time: 'Time',
        alarmTypeColumn: 'Alarm type',
        classColumn: 'Class',
        exitColumn: 'Exit',
        studentsPresent: 'Students present',
        teacherColumn: 'Teacher',
        yesOnSite: 'Yes (Present)',
        noNotOnSite: 'No (Not present)',
        workbookSheet: 'Fire Drill',
        drillFilename: 'fire_drill_report',
        realAlarmFilename: 'fire_report'
    }
};
let language = 'no';
let isDarkMode = false;
let isSignUpMode = false;
let themeTransitionTimer;

try {
    language = localStorage.getItem('fireDrillLanguage') === 'en' ? 'en' : 'no';
} catch (error) {
    console.warn('Kunne ikke lese lagret språk:', error);
}

function t(key) {
    return translations[language][key] || translations.no[key] || key;
}

function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
        element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
    });
    themeToggles.forEach(toggle => {
        toggle.textContent = t(isDarkMode ? 'lightMode' : 'darkMode');
        toggle.setAttribute('aria-pressed', String(isDarkMode));
    });
    languageToggles.forEach(toggle => {
        toggle.textContent = language === 'no' ? 'English' : 'Norsk';
        toggle.setAttribute('aria-label', language === 'no' ? 'Bytt språk til engelsk' : 'Switch language to Norwegian');
    });
    document.querySelector('.login-card h1').textContent = t(isSignUpMode ? 'createAccount' : 'loginTitle');
    authIntro.textContent = t(isSignUpMode ? 'signupIntro' : 'loginIntro');
    authSubmit.textContent = t(isSignUpMode ? 'createAccount' : 'login');
    authModeToggle.textContent = t(isSignUpMode ? 'existingAccountPrompt' : 'createAccountPrompt');
    if (loginMessage.dataset.translationKey) {
        loginMessage.textContent = t(loginMessage.dataset.translationKey);
    }
    renderClasses();
    updateAlarmStyle();
}

languageToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        language = language === 'no' ? 'en' : 'no';
        try {
            localStorage.setItem('fireDrillLanguage', language);
        } catch (error) {
            console.warn('Kunne ikke lagre valgt språk:', error);
        }
        applyLanguage();
        accountMenus.forEach(menu => {
            menu.open = false;
        });
    });
});

try {
    isDarkMode = localStorage.getItem('fireDrillTheme') === 'dark';
} catch (error) {
    console.warn('Kunne ikke lese lagret tema:', error);
}

function setDarkMode(enabled, animate = false) {
    if (themeTransitionTimer) {
        clearTimeout(themeTransitionTimer);
        themeTransitionTimer = null;
    }
    document.body.classList.remove('theme-transitioning');

    const applyTheme = () => {
        document.body.classList.toggle('dark-mode', enabled);
        document.querySelectorAll('[data-light-href][data-dark-href]').forEach(link => {
            link.href = enabled ? link.dataset.darkHref : link.dataset.lightHref;
        });
        const themeColor = document.querySelector('meta[name="theme-color"]');
        themeColor.content = enabled ? themeColor.dataset.darkContent : themeColor.dataset.lightContent;
        themeToggles.forEach(toggle => {
            toggle.setAttribute('aria-pressed', String(enabled));
            toggle.textContent = t(enabled ? 'lightMode' : 'darkMode');
        });
        try {
            localStorage.setItem('fireDrillTheme', enabled ? 'dark' : 'light');
        } catch (error) {
            console.warn('Kunne ikke lagre valgt tema:', error);
        }
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimate = animate && !reduceMotion && document.body.classList.contains('dark-mode') !== enabled;
    isDarkMode = enabled;
    if (shouldAnimate) {
        document.body.classList.add('theme-transitioning');
        themeTransitionTimer = setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
            themeTransitionTimer = null;
        }, 550);
    }
    applyTheme();
}

themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        setDarkMode(!isDarkMode, true);
        toggle.closest('.account-menu').open = false;
    });
});
setDarkMode(isDarkMode);

document.addEventListener('click', event => {
    accountMenus.forEach(menu => {
        if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        const openMenu = accountMenus.find(menu => menu.open);
        if (!openMenu) return;
        accountMenus.forEach(menu => {
            menu.open = false;
        });
        openMenu.querySelector('summary').focus();
    }
});

function showApp(isAuthenticated) {
    loginPageEl.hidden = isAuthenticated;
    appEl.hidden = !isAuthenticated;
}

function showAuthMessage(message, isError = false, translationKey = '') {
    loginMessage.textContent = message;
    loginMessage.classList.toggle('error', isError);
    if (translationKey) {
        loginMessage.dataset.translationKey = translationKey;
    } else {
        delete loginMessage.dataset.translationKey;
    }
}

authModeToggle.addEventListener('click', () => {
    isSignUpMode = !isSignUpMode;
    passwordInput.autocomplete = isSignUpMode ? 'new-password' : 'current-password';
    applyLanguage();
    showAuthMessage('');
});

loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!authClient) {
        showAuthMessage(t('loginUnavailable'), true, 'loginUnavailable');
        return;
    }

    authSubmit.disabled = true;
    const progressKey = isSignUpMode ? 'creatingAccount' : 'signingIn';
    showAuthMessage(t(progressKey), false, progressKey);
    try {
        const { data, error } = isSignUpMode
            ? await authClient.auth.signUp({
                email: emailInput.value.trim(),
                password: passwordInput.value
            })
            : await authClient.auth.signInWithPassword({
                email: emailInput.value.trim(),
                password: passwordInput.value
            });
        if (error) throw error;

        if (isSignUpMode && !data.session) {
            showAuthMessage(t('accountCreated'), false, 'accountCreated');
        } else {
            showAuthMessage(t('loginSuccess'), false, 'loginSuccess');
        }
    } catch (error) {
        showAuthMessage(error.message || t('loginFailed'), true, error.message ? '' : 'loginFailed');
    } finally {
        authSubmit.disabled = false;
    }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
    document.getElementById('accountMenu').open = false;
    try {
        const { error } = await authClient.auth.signOut();
        if (error) throw error;
    } catch (error) {
        alert(`${t('logoutFailed')}: ${error.message || t('unknownError')}`);
    }
});

if (authClient) {
    authClient.auth.onAuthStateChange((_event, session) => showApp(Boolean(session)));
    authClient.auth.getSession().then(({ data, error }) => {
        if (error) {
            showAuthMessage(`${t('loginStatusFailed')}: ${error.message}`, true);
            return;
        }
        showApp(Boolean(data.session));
        if (data.session) showAuthMessage(t('loginSuccess'), false, 'loginSuccess');
    }).catch(error => {
        showAuthMessage(`${t('loginStatusFailed')}: ${error.message || t('unknownError')}`, true);
    });
}

const skoler = {
    'haugaland-vgs': { navn: 'Haugaland VGS', utganger: ['C', 'B', 'F', 'D', 'A', 'J'] }
};
let valgtSkole = '';
let klasser = [];
let alarmType = 'Test / Øvelse';

const classListEl = document.getElementById('classList');
const addClassForm = document.getElementById('addClassForm');
const classNameInput = document.getElementById('classNameInput');
const exportBtn = document.getElementById('exportBtn');
const exportConfirmDialog = document.getElementById('exportConfirmDialog');
const cancelExportBtn = document.getElementById('cancelExportBtn');
const confirmExportBtn = document.getElementById('confirmExportBtn');
const testAlarmBtn = document.getElementById('testAlarmBtn');
const realAlarmBtn = document.getElementById('realAlarmBtn');
const schoolSelect = document.getElementById('schoolSelect');
const containerEl = document.querySelector('.container');
const alarmBoxEl = document.querySelector('.alarm-box');

function renderClasses() {
    classListEl.innerHTML = '';
    if (klasser.length === 0) {
        classListEl.innerHTML = `<div class="empty-state">${t('emptyClassList')}</div>`;
        return;
    }

    klasser.forEach(kl => {
        const item = document.createElement('div');
        item.className = `class-item ${kl.tilstede ? 'present' : ''}`;
        const exitOptions = (skoler[valgtSkole]?.utganger || [])
            .map(utgang => `<option value="${utgang}" ${kl.utgang === utgang ? 'selected' : ''}>${t('exit')} ${utgang}</option>`)
            .join('');
        item.innerHTML = `
            <div class="class-info">
                <span class="class-name">${kl.navn}</span>
                <span class="status-badge ${kl.tilstede ? 'present' : 'absent'}">
                    ${t('students')}: ${kl.tilstede ? t('present') : t('absent')}
                </span>
                <span class="status-badge ${kl.kontaktTilstede ? 'present' : 'absent'}">
                    ${t('contactTeacher')}: ${kl.kontaktTilstede ? t('teacherPresent') : t('teacherAbsent')}
                </span>
                ${valgtSkole ? `<label class="exit-label">${t('exit')}
                    <select aria-label="${t('exit')} ${kl.navn}" onchange="endreUtgang(${kl.id}, this.value)">
                        <option value="">${t('chooseExit')}</option>${exitOptions}
                    </select>
                </label>` : ''}
            </div>
            <div class="class-actions">
                <button type="button" onclick="toggleTilstede(${kl.id})" class="btn-toggle ${kl.tilstede ? 'make-absent' : 'make-present'}">
                    ${t('students')}: ${kl.tilstede ? t('changeToNo') : t('markYes')}
                </button>
                <button type="button" onclick="toggleKontaktTilstede(${kl.id})" class="btn-toggle ${kl.kontaktTilstede ? 'make-absent' : 'make-present'}" aria-label="${t('teacherOnSite')} ${kl.navn}">
                    ${t('teacherOnSite')}: ${kl.kontaktTilstede ? t('changeToNo') : t('markYes')}
                </button>
                <button type="button" onclick="slettKlasse(${kl.id})" class="btn-delete" title="${t('deleteClass')}" aria-label="${t('deleteClass')} ${kl.navn}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 01-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>`;
        classListEl.appendChild(item);
    });
}

function updateAlarmStyle() {
    const isEmergency = alarmType === 'Ekte Alarm';
    testAlarmBtn.querySelector('span').textContent = t('testAlarm');
    realAlarmBtn.querySelector('span').textContent = t('realAlarm');
    containerEl.classList.toggle('emergency-mode', isEmergency);
    alarmBoxEl.classList.toggle('emergency-box', isEmergency);
    testAlarmBtn.classList.toggle('active', !isEmergency);
    realAlarmBtn.classList.toggle('active', isEmergency);
    testAlarmBtn.setAttribute('aria-pressed', String(!isEmergency));
    realAlarmBtn.setAttribute('aria-pressed', String(isEmergency));
}

window.toggleTilstede = id => {
    klasser = klasser.map(k => k.id === id ? { ...k, tilstede: !k.tilstede } : k);
    renderClasses();
};
window.toggleKontaktTilstede = id => {
    klasser = klasser.map(k => k.id === id ? { ...k, kontaktTilstede: !k.kontaktTilstede } : k);
    renderClasses();
};
window.slettKlasse = id => {
    klasser = klasser.filter(k => k.id !== id);
    renderClasses();
};
window.endreUtgang = (id, utgang) => {
    klasser = klasser.map(k => k.id === id ? { ...k, utgang } : k);
};

schoolSelect.addEventListener('change', () => {
    valgtSkole = schoolSelect.value;
    klasser = klasser.map(k => ({ ...k, utgang: '' }));
    renderClasses();
});

addClassForm.addEventListener('submit', e => {
    e.preventDefault();
    const navn = classNameInput.value.trim();
    if (!navn) return;
    klasser.push({ id: Date.now(), navn: navn.toUpperCase(), tilstede: false, kontaktTilstede: false, utgang: '' });
    classNameInput.value = '';
    renderClasses();
    classNameInput.focus();
});

testAlarmBtn.addEventListener('click', () => {
    alarmType = 'Test / Øvelse';
    updateAlarmStyle();
});
realAlarmBtn.addEventListener('click', () => {
    alarmType = 'Ekte Alarm';
    updateAlarmStyle();
});

exportBtn.addEventListener('click', () => {
    exportConfirmDialog.showModal();
});
cancelExportBtn.addEventListener('click', () => {
    exportConfirmDialog.close();
});
confirmExportBtn.addEventListener('click', () => {
    exportConfirmDialog.close();
    exportToExcel();
});

function exportToExcel() {
    if (!window.XLSX) {
        alert(t('exportUnavailable'));
        return;
    }
    const now = new Date();
    const dato = now.toISOString().split('T')[0];
    const tidspunkt = now.toTimeString().split(' ')[0];
    const headers = [
        t('date'),
        t('time'),
        t('school'),
        t('alarmTypeColumn'),
        t('classColumn'),
        t('exitColumn'),
        t('studentsPresent'),
        t('teacherColumn')
    ];
    const excelData = klasser.map(kl => ({
        [t('date')]: dato,
        [t('time')]: tidspunkt,
        [t('school')]: skoler[valgtSkole]?.navn || '',
        [t('alarmTypeColumn')]: t(alarmType === 'Ekte Alarm' ? 'realAlarm' : 'testAlarm'),
        [t('classColumn')]: kl.navn,
        [t('exitColumn')]: kl.utgang ? `${t('exit')} ${kl.utgang}` : '',
        [t('studentsPresent')]: kl.tilstede ? t('yesOnSite') : t('noNotOnSite'),
        [t('teacherColumn')]: kl.kontaktTilstede ? t('yesOnSite') : t('noNotOnSite')
    }));
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...excelData.map(row => headers.map(header => row[header] ?? ''))]);
    const lastRow = Math.max(excelData.length, 1);
    const lastColumn = headers.length - 1;
    worksheet['!cols'] = [
        { wch: 13 },
        { wch: 12 },
        { wch: 24 },
        { wch: 18 },
        { wch: 14 },
        { wch: 16 },
        { wch: 26 },
        { wch: 26 }
    ];
    worksheet['!autofilter'] = { ref: `A1:H${lastRow + 1}` };
    worksheet['!freeze'] = { xSplit: 0, ySplit: 1, topLeftCell: 'A2', activePane: 'bottomLeft', state: 'frozen' };

    const headerStyle = {
        fill: { patternType: 'solid', fgColor: { rgb: '217346' } },
        font: { bold: true, color: { rgb: 'FFFFFF' } },
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
        border: {
            bottom: { style: 'medium', color: { rgb: '155D38' } }
        }
    };
    for (let column = 0; column < headers.length; column++) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: column })];
        if (cell) cell.s = headerStyle;
    }
    const thinBorder = { style: 'thin', color: { rgb: 'B7C9C2' } };
    const cellBorder = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };
    for (let row = 0; row <= excelData.length; row++) {
        for (let column = 0; column < headers.length; column++) {
            const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: column })];
            if (!cell) continue;
            cell.s = { ...(cell.s || {}), border: cellBorder };
            if (row > 0 && cell.v === t('noNotOnSite')) {
                cell.s = { ...cell.s, font: { ...(cell.s.font || {}), color: { rgb: 'FF0000' } } };
            }
        }
    }
    worksheet['!rows'] = [{ hpt: 28 }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, t('workbookSheet'));
    const alarmFilename = t(alarmType === 'Ekte Alarm' ? 'realAlarmFilename' : 'drillFilename');
    XLSX.writeFile(workbook, `${alarmFilename}_${dato}.xlsx`);
}

applyLanguage();