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

/* Certificates showcase */
const certificatesSection = document.querySelector('#certifications');
if (certificatesSection) {
  certificatesSection.innerHTML = `
    <h2>دوره‌ها و گواهینامه‌ها</h2>
    <div class="certificates-grid">
      <article class="certificate-card">
        <button class="certificate-image-button" type="button" data-certificate="assets/linux-essentials.jpg" data-title="Linux Essentials" aria-label="مشاهده گواهینامه Linux Essentials">
          <img src="assets/linux-essentials.jpg" alt="گواهینامه Linux Essentials" loading="lazy">
          <span class="certificate-view">مشاهده گواهینامه <b>↗</b></span>
        </button>
        <div class="certificate-info">
          <span class="certificate-kicker">CERTIFICATE</span>
          <h3>Linux Essentials</h3>
          <p>Networking Development Group (NDG)</p>
          <time datetime="2026-07">July 2026</time>
        </div>
      </article>

      <article class="certificate-card">
        <button class="certificate-image-button" type="button" data-certificate="assets/introduction-to-cybersecurity.jpg" data-title="Introduction To Cybersecurity" aria-label="مشاهده گواهینامه Introduction To Cybersecurity">
          <img src="assets/introduction-to-cybersecurity.jpg" alt="گواهینامه Introduction To Cybersecurity" loading="lazy">
          <span class="certificate-view">مشاهده گواهینامه <b>↗</b></span>
        </button>
        <div class="certificate-info">
          <span class="certificate-kicker">CERTIFICATE</span>
          <h3>Introduction To Cybersecurity</h3>
          <p>Cisco Networking Academy</p>
          <time datetime="2026-07">July 2026</time>
        </div>
      </article>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #certifications .certificates-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;margin-top:32px}
    #certifications .certificate-card{overflow:hidden;background:var(--panel2);border:1px solid var(--line);border-radius:22px;box-shadow:0 12px 35px rgba(0,0,0,.055);transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}
    #certifications .certificate-card:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--accent) 55%,var(--line));box-shadow:0 18px 42px rgba(0,0,0,.09)}
    #certifications .certificate-image-button{position:relative;display:block;width:100%;padding:0;border:0;background:var(--panel);cursor:pointer;overflow:hidden;aspect-ratio:1.48}
    #certifications .certificate-image-button{background:linear-gradient(145deg,var(--soft),var(--panel2))}\n    #certifications .certificate-placeholder{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;padding:25px;color:var(--muted);text-align:center}\n    #certifications .certificate-placeholder b{font-size:.58rem;letter-spacing:.16em;color:var(--accent)}\n    #certifications .certificate-placeholder strong{font-size:1.15rem;color:var(--text)}\n    #certifications .certificate-placeholder small{font-size:.65rem}\n    #certifications .certificate-image-button img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s ease,filter .35s ease}
    #certifications .certificate-card:hover .certificate-image-button img{transform:scale(1.025);filter:brightness(.92)}
    #certifications .certificate-view{position:absolute;left:50%;bottom:18px;transform:translate(-50%,10px);opacity:0;display:inline-flex;align-items:center;gap:9px;padding:9px 14px;border:1px solid rgba(255,255,255,.22);border-radius:11px;background:rgba(9,10,13,.82);backdrop-filter:blur(10px);color:#fff;font:800 .72rem/1.2 'Vazirmatn','Segoe UI',sans-serif;white-space:nowrap;transition:.25s ease}
    #certifications .certificate-card:hover .certificate-view{opacity:1;transform:translate(-50%,0)}
    #certifications .certificate-view b{color:var(--accent);font-size:1rem}
    #certifications .certificate-info{padding:21px 22px 23px;text-align:right}
    #certifications .certificate-kicker{display:inline-block;color:var(--accent);font-size:.58rem;font-weight:950;letter-spacing:.16em;margin-bottom:6px}
    #certifications .certificate-info h3{font-size:1.05rem;line-height:1.65;margin:0 0 5px;font-weight:900}
    #certifications .certificate-info p{margin:0 0 8px;color:var(--muted);font-size:.74rem}
    #certifications .certificate-info time{display:inline-block;color:var(--accent);font-size:.68rem;font-weight:850}
    .certificate-modal{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.78);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:22px;opacity:0;pointer-events:none;transition:opacity .2s ease}
    .certificate-modal.open{opacity:1;pointer-events:auto}
    .certificate-modal-inner{position:relative;width:min(1050px,100%);max-height:92vh;padding:12px;background:var(--panel);border:1px solid var(--line);border-radius:18px;box-shadow:0 30px 90px rgba(0,0,0,.35);transform:scale(.97);transition:transform .2s ease}
    .certificate-modal.open .certificate-modal-inner{transform:scale(1)}
    .certificate-modal img{display:block;width:100%;max-height:calc(92vh - 24px);object-fit:contain;border-radius:10px}
    .certificate-modal-close{position:absolute;top:-13px;left:-13px;width:36px;height:36px;border:1px solid var(--line);border-radius:50%;background:var(--panel);color:var(--text);font:900 1.2rem/1 'Segoe UI';cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,.2)}
    .certificate-modal-close:hover{color:var(--accent);border-color:var(--accent)}
    @media(max-width:700px){
      #certifications .certificates-grid{grid-template-columns:1fr;gap:18px;margin-top:24px}
      #certifications .certificate-card:hover{transform:none}
      #certifications .certificate-view{opacity:1;transform:translate(-50%,0);bottom:12px;font-size:.64rem;padding:8px 11px}
      #certifications .certificate-info{padding:17px 16px 19px}
      #certifications .certificate-info h3{font-size:.92rem}
      #certifications .certificate-info p{font-size:.68rem}
      .certificate-modal{padding:10px}
      .certificate-modal-inner{padding:7px;border-radius:12px}
      .certificate-modal-close{top:-8px;left:-8px;width:32px;height:32px}
    }
  `;
  document.head.appendChild(style);

  const modal = document.createElement('div');
  modal.className = 'certificate-modal';
  modal.innerHTML = '<div class="certificate-modal-inner"><button class="certificate-modal-close" type="button" aria-label="بستن">×</button><img alt=""></div>';
  document.body.appendChild(modal);
  const modalImg = modal.querySelector('img');
  const closeModal = () => { modal.classList.remove('open'); document.body.style.overflow=''; };
  document.querySelectorAll('.certificate-image-button img').forEach(img => {
    img.addEventListener('error', () => {
      const wrap = img.parentElement;
      img.remove();
      wrap.classList.add('certificate-image-missing');
      const title = wrap.dataset.title || 'Certificate';
      wrap.insertAdjacentHTML('afterbegin', '<span class="certificate-placeholder"><b>Certificate</b><strong>'+title+'</strong><small>تصویر گواهینامه در پوشه assets قرار می‌گیرد</small></span>');
    });
  });
  document.querySelectorAll('.certificate-image-button').forEach(button => {
    button.addEventListener('click', () => {
      modalImg.src = button.dataset.certificate;
      modalImg.alt = button.dataset.title || 'Certificate';
      modal.classList.add('open');
      document.body.style.overflow='hidden';
    });
  });
  modal.querySelector('.certificate-modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}
