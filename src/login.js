import { 
  createIcons, 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  CheckCircle,
  Wifi,
  Signal,
  BatteryCharging,
  Loader
} from 'lucide';

import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  updateProfile 
} from './firebase.js';

const appIcons = { 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  CheckCircle,
  Wifi,
  Signal,
  BatteryCharging,
  Loader
};

function renderIcons() {
  createIcons({ icons: appIcons });
}

const LOGIN_TRANSLATIONS = {
  en: {
    title: 'USISA Mobile AI',
    subtitle: '360° Citrus Health & Agronomy Portal',
    email: 'Farmer Email Address',
    pass: 'Password',
    btnSignin: 'Sign In to Account',
    noAccount: "Don't have an account?",
    regLink: 'Create Account',
    regName: 'Full Name',
    regEmail: 'Farmer Email Address',
    regPass: 'Password (Min 6 characters)',
    btnCreate: 'Create Farmer Account',
    haveAccount: 'Already registered?',
    loginLink: 'Sign In',
    loggingIn: 'Signing In...',
    creating: 'Creating Account...'
  },
  fil: {
    title: 'USISA Mobile AI',
    subtitle: '360° Pagsusuri sa Kalusugan ng Calamansi',
    email: 'Email ng Magsasaka',
    pass: 'Password',
    btnSignin: 'Mag-Sign In sa Account',
    noAccount: 'Wala pang account?',
    regLink: 'Gumawa ng Account',
    regName: 'Buong Pangalan',
    regEmail: 'Email ng Magsasaka',
    regPass: 'Password (Di bababa sa 6 na letra)',
    btnCreate: 'Irehistro ang Bagong Account',
    haveAccount: 'May account ka na?',
    loginLink: 'Mag-Sign In',
    loggingIn: 'Pumapasok sa Account...',
    creating: 'Inirehistro ang Account...'
  }
};

let currentLang = localStorage.getItem('calamansi_android_lang') || 'en';

document.addEventListener('DOMContentLoaded', () => {
  renderIcons();
  initClock();
  initLanguage();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.replace('/index.html');
    }
  });

  const formLogin = document.getElementById('auth-form-login');
  const formRegister = document.getElementById('auth-form-register');
  const linkToRegister = document.getElementById('link-to-register');
  const linkToLogin = document.getElementById('link-to-login');
  const alertBox = document.getElementById('auth-alert');

  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  const regEmail = document.getElementById('reg-email');
  const regPass = document.getElementById('reg-password');
  const regName = document.getElementById('reg-fullname');

  // Ensure login fields start completely empty
  if (emailInput) {
    emailInput.value = '';
    emailInput.addEventListener('focus', () => {
      if (emailInput.value === 'farmer@usisa.com' || emailInput.value === 'farmer@example.com') {
        emailInput.value = '';
      } else {
        emailInput.select();
      }
    });
    emailInput.addEventListener('click', () => {
      if (emailInput.value === 'farmer@usisa.com' || emailInput.value === 'farmer@example.com') {
        emailInput.value = '';
      }
    });
  }

  if (passInput) {
    passInput.value = '';
    passInput.addEventListener('focus', () => {
      if (passInput.value === 'password123' || passInput.value === '••••••••') {
        passInput.value = '';
      } else {
        passInput.select();
      }
    });
    passInput.addEventListener('click', () => {
      if (passInput.value === 'password123' || passInput.value === '••••••••') {
        passInput.value = '';
      }
    });
  }

  [regEmail, regPass, regName].forEach(input => {
    if (input) {
      input.addEventListener('focus', () => input.select());
    }
  });

  function showAlert(msg, isError = true) {
    if (!alertBox) return;
    alertBox.style.display = 'block';
    alertBox.style.background = isError ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)';
    alertBox.style.border = isError ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(16,185,129,0.4)';
    alertBox.style.color = isError ? '#fca5a5' : '#6ee7b7';
    alertBox.textContent = msg;
  }

  if (linkToRegister) {
    linkToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      formLogin.style.display = 'none';
      formRegister.style.display = 'block';
      if (alertBox) alertBox.style.display = 'none';
      renderIcons();
    });
  }

  if (linkToLogin) {
    linkToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      formRegister.style.display = 'none';
      formLogin.style.display = 'block';
      if (alertBox) alertBox.style.display = 'none';
      renderIcons();
    });
  }

  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const pass = document.getElementById('login-password').value;
      const submitBtn = document.getElementById('btn-submit-login');
      const t = LOGIN_TRANSLATIONS[currentLang];

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> ${t.loggingIn}`;
      renderIcons();

      try {
        await signInWithEmailAndPassword(auth, email, pass);
        window.location.replace('/index.html');
      } catch (err) {
        console.warn('[Android Auth Notice]', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="log-in"></i> ${t.btnSignin}`;
        renderIcons();
        showAlert(formatAuthErrorMessage(err, currentLang), true);
      }
    });
  }

  if (formRegister) {
    formRegister.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-fullname').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const pass = document.getElementById('reg-password').value;
      const submitBtn = document.getElementById('btn-submit-register');
      const t = LOGIN_TRANSLATIONS[currentLang];

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> ${t.creating}`;
      renderIcons();

      try {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        if (name && cred.user) {
          await updateProfile(cred.user, { displayName: name });
        }
        window.location.replace('/index.html');
      } catch (err) {
        console.warn('[Android Auth Register Notice]', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="user-plus"></i> ${t.btnCreate}`;
        renderIcons();
        showAlert(formatAuthErrorMessage(err, currentLang), true);
      }
    });
  }
});

function formatAuthErrorMessage(err, lang = 'en') {
  if (!err) return '';
  const code = (err.code || '').toLowerCase();
  const rawMsg = (err.message || '').toLowerCase();
  const isFil = lang === 'fil';

  if (
    code.includes('invalid-credential') ||
    code.includes('wrong-password') ||
    code.includes('user-not-found') ||
    rawMsg.includes('invalid-credential') ||
    rawMsg.includes('wrong-password') ||
    rawMsg.includes('user-not-found') ||
    rawMsg.includes('invalid credential')
  ) {
    return isFil 
      ? 'Maling email o password. Pakisuri at subukang muli.' 
      : 'Incorrect email or password. Please check your credentials and try again.';
  }

  if (code.includes('invalid-email') || rawMsg.includes('invalid-email') || rawMsg.includes('invalid email')) {
    return isFil 
      ? 'Hindi wastong format ng email address.' 
      : 'Invalid email address format. Please enter a valid email.';
  }

  if (code.includes('email-already-in-use') || rawMsg.includes('email-already-in-use') || rawMsg.includes('email already in use')) {
    return isFil 
      ? 'Narehistro na ang email na ito. Pakipili ang Mag-Sign In.' 
      : 'This email is already registered. Please sign in instead.';
  }

  if (code.includes('weak-password') || rawMsg.includes('weak-password') || rawMsg.includes('weak password')) {
    return isFil 
      ? 'Masyadong mahina ang password. Dapat ay mayroong hindi bababa sa 6 na karakter.' 
      : 'Password is too weak. Must be at least 6 characters long.';
  }

  if (code.includes('too-many-requests') || rawMsg.includes('too-many-requests') || rawMsg.includes('too many requests')) {
    return isFil 
      ? 'Masyadong maraming maling pagsubok. Pakihintay at subukang muli mamaya.' 
      : 'Too many unsuccessful attempts. Access temporarily restricted. Please try again later.';
  }

  if (code.includes('network-request-failed') || rawMsg.includes('network-request-failed') || rawMsg.includes('network')) {
    return isFil 
      ? 'Problema sa koneksyon sa internet. Pakisuri ang iyong wifi o data connection.' 
      : 'Network connection failed. Please check your internet connection and try again.';
  }

  if (code.includes('user-disabled') || rawMsg.includes('user-disabled')) {
    return isFil 
      ? 'Na-disable ang account na ito. Makipag-ugnayan sa administrator.' 
      : 'This user account has been disabled. Please contact the administrator.';
  }

  if (code.includes('missing-password') || rawMsg.includes('missing-password')) {
    return isFil 
      ? 'Pakilagay ang iyong password.' 
      : 'Please enter your account password.';
  }

  if (code.includes('missing-email') || rawMsg.includes('missing-email')) {
    return isFil 
      ? 'Pakilagay ang iyong email address.' 
      : 'Please enter your email address.';
  }

  return isFil 
    ? 'Hindi makapag-login. Pakisuri ang iyong email at password.' 
    : 'Unable to sign in. Please verify your email and password.';
}

function initClock() {
  const clockEl = document.getElementById('status-clock');
  const updateTime = () => {
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  updateTime();
  setInterval(updateTime, 30000);
}

function initLanguage() {
  const btnEn = document.getElementById('btn-lang-en');
  const btnFil = document.getElementById('btn-lang-fil');

  if (btnEn) {
    btnEn.addEventListener('click', () => {
      currentLang = 'en';
      localStorage.setItem('calamansi_android_lang', 'en');
      btnEn.classList.add('active');
      btnFil.classList.remove('active');
      applyLanguage(currentLang);
    });
  }

  if (btnFil) {
    btnFil.addEventListener('click', () => {
      currentLang = 'fil';
      localStorage.setItem('calamansi_android_lang', 'fil');
      btnFil.classList.add('active');
      btnEn.classList.remove('active');
      applyLanguage(currentLang);
    });
  }

  if (currentLang === 'fil') {
    if (btnFil) btnFil.classList.add('active');
    if (btnEn) btnEn.classList.remove('active');
  }
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  const t = LOGIN_TRANSLATIONS[lang] || LOGIN_TRANSLATIONS.en;
  
  const setTxt = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setTxt('lbl-title', t.title);
  setTxt('lbl-subtitle', t.subtitle);
  setTxt('lbl-btn-signin', t.btnSignin);
  setTxt('lbl-no-account', t.noAccount);
  setTxt('lbl-register-link', t.regLink);
  setTxt('lbl-reg-name', t.regName);
  setTxt('lbl-reg-email', t.regEmail);
  setTxt('lbl-reg-pass', t.regPass);
  setTxt('lbl-btn-create', t.btnCreate);
  setTxt('lbl-have-account', t.haveAccount);
  setTxt('lbl-login-link', t.loginLink);
}
