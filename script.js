document.documentElement.classList.add('js-enabled');

const menuToggle=document.querySelector('.menu-toggle');
const navMenu=document.querySelector('.nav-menu');
const themeToggle=document.querySelector('.theme-toggle');
const themeIcon=document.querySelector('.theme-icon');
const themeLabel=document.querySelector('.theme-label');

menuToggle?.addEventListener('click',()=>{
  const open=navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open?'بستن منو':'باز کردن منو');
  menuToggle.textContent=open?'×':'☰';
});

document.querySelectorAll('.nav-menu a').forEach(a=>a.addEventListener('click',()=>{
  navMenu.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded','false');
  if(menuToggle) { menuToggle.textContent='☰'; menuToggle.setAttribute('aria-label','باز کردن منو'); }
}));

const applyTheme=(dark,save=true)=>{
  document.body.classList.toggle('dark',dark);
  if(themeToggle){
    themeToggle.setAttribute('aria-pressed',String(dark));
    themeToggle.setAttribute('aria-label',dark?'فعال‌سازی حالت روشن':'فعال‌سازی حالت تاریک');
  }
  if(themeIcon) themeIcon.textContent=dark?'🌙':'☀️';
  if(themeLabel) themeLabel.textContent=dark?'حالت تاریک':'حالت روشن';
  if(save) localStorage.setItem('portfolio-theme',dark?'dark':'light');
};

const savedTheme=localStorage.getItem('portfolio-theme');
const preferredDark=window.matchMedia?.('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme?savedTheme==='dark':preferredDark,false);
themeToggle?.addEventListener('click',()=>applyTheme(!document.body.classList.contains('dark')));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-menu a')];
const updateActiveLink=()=>{
  let current='';
  sections.forEach(section=>{if(window.scrollY>=section.offsetTop-180) current=section.id;});
  links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));
};
window.addEventListener('scroll',updateActiveLink,{passive:true});
updateActiveLink();
