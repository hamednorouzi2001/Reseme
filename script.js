document.documentElement.classList.add('js-enabled');
const menuToggle=document.querySelector('.menu-toggle'),navMenu=document.querySelector('.nav-menu');
const themeToggle=document.querySelector('.theme-toggle'),themeIcon=document.querySelector('.theme-icon'),themeLabel=document.querySelector('.theme-label');
const langToggle=document.querySelector('.lang-toggle');

menuToggle?.addEventListener('click',()=>{const open=navMenu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'بستن منو':'باز کردن منو');menuToggle.textContent=open?'×':'☰';});
document.querySelectorAll('.nav-menu a').forEach(a=>a.addEventListener('click',()=>{navMenu.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');if(menuToggle)menuToggle.textContent='☰';}));

const applyTheme=(dark,save=true)=>{document.body.classList.toggle('dark',dark);if(themeToggle){themeToggle.setAttribute('aria-pressed',String(dark));themeToggle.setAttribute('aria-label',dark?'فعال‌سازی حالت روشن':'فعال‌سازی حالت تاریک');}if(themeIcon)themeIcon.textContent=dark?'🌙':'☀️';if(themeLabel)themeLabel.textContent=dark?'حالت تاریک':'حالت روشن';if(save)localStorage.setItem('portfolio-theme',dark?'dark':'light');};
const savedTheme=localStorage.getItem('portfolio-theme'),preferredDark=window.matchMedia?.('(prefers-color-scheme: dark)').matches;applyTheme(savedTheme?savedTheme==='dark':preferredDark,false);themeToggle?.addEventListener('click',()=>applyTheme(!document.body.classList.contains('dark')));

const setLanguage=(lang,save=true)=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';document.querySelectorAll('[data-fa][data-en]').forEach(el=>{el.textContent=el.dataset[lang];});document.querySelector('.lang-fa')?.classList.toggle('active',lang==='fa');document.querySelector('.lang-en')?.classList.toggle('active',lang==='en');if(langToggle)langToggle.setAttribute('aria-label',lang==='fa'?'Switch to English':'تغییر به فارسی');document.title=lang==='fa'?'حامد نوروزی | مهندسی کامپیوتر':'Hamed Norouzi | Computer Engineering';if(save)localStorage.setItem('portfolio-language',lang);};
const savedLang=localStorage.getItem('portfolio-language')||'fa';setLanguage(savedLang,false);langToggle?.addEventListener('click',()=>setLanguage(document.documentElement.lang==='fa'?'en':'fa'));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const sections=[...document.querySelectorAll('main section[id]')],links=[...document.querySelectorAll('.nav-menu a')];
const updateActiveLink=()=>{let current='';sections.forEach(section=>{if(window.scrollY>=section.offsetTop-180)current=section.id;});links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));};
window.addEventListener('scroll',updateActiveLink,{passive:true});updateActiveLink();