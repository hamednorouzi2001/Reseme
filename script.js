const menuToggle=document.querySelector('.menu-toggle');
const navMenu=document.querySelector('.nav-menu');

menuToggle?.addEventListener('click',()=>{
  const open=navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',open);
  menuToggle.textContent=open?'×':'☰';
});

document.querySelectorAll('.nav-menu a').forEach(a=>{
  a.addEventListener('click',()=>navMenu.classList.remove('open'));
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-menu a')];

window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(section=>{
    if(window.scrollY >= section.offsetTop-160) current=section.id;
  });
  links.forEach(link=>{
    link.style.color=link.getAttribute('href')===`#${current}`?'#ff9d1c':'';
  });
},{passive:true});
