const menu=document.querySelector('.mobile-menu');
const nav=document.querySelector('#public-nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav?.addEventListener('click',event=>{if(event.target.closest('a')){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.focus();}});
const address=document.querySelector('#onion-address');
let statusKey='notAnnounced';
function renderOnion(){
 const status=document.querySelector('#onion-status');if(!status)return;
 status.removeAttribute('data-i18n');status.textContent=KTM_UI.t(statusKey);
}
if(address){
 const configured=window.KRYPTOS_CONFIG?.onionUrl?.trim()||'';
 if(configured){try{const url=new URL(configured);if(!/^https?:$/.test(url.protocol)||!/^[a-z2-7]{56}\.onion$/.test(url.hostname)||url.username||url.password||url.port||url.pathname!=='/'||url.search||url.hash)throw Error();address.value=url.origin;document.querySelector('#open-onion').href=url.origin;document.querySelector('#onion-ready').hidden=false;document.querySelector('#onion-heading').dataset.i18n='openTor';statusKey='torNote';}catch{statusKey='invalidOnion';}}
 document.querySelector('#copy-onion').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(address.value);statusKey='copyOk';}catch{address.focus();address.select();statusKey='copyFail';}renderOnion();});
 window.addEventListener('ktm-preferences',renderOnion);renderOnion();
}
