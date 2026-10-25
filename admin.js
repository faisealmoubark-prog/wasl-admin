(function(){
  const PASS_KEY = 'wasl_admin_pass';
  const DEFAULT = 'wasl2026';
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  function toast(m){ const t=$('#toast'); t.textContent=m; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2500); }
  function getPass(){ return localStorage.getItem(PASS_KEY) || DEFAULT; }
  $('#loginBtn').onclick = () => {
    if($('#loginPass').value === getPass()){
      $('#loginScreen').classList.add('hidden');
      $('#appLayout').classList.remove('hidden');
      sessionStorage.setItem('ok','1');
    } else toast('كلمة المرور خاطئة');
  };
  $('#loginPass').onkeydown = e => { if(e.key==='Enter') $('#loginBtn').click(); };
  $('#logoutBtn').onclick = () => {
    $('#appLayout').classList.add('hidden');
    $('#loginScreen').classList.remove('hidden');
    sessionStorage.removeItem('ok');
  };
  $$('.nav-item').forEach(b => {
    b.onclick = () => {
      $$('.nav-item').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      $$('main > section').forEach(s=>s.classList.add('hidden'));
      $('#page-'+b.dataset.page).classList.remove('hidden');
    };
  });
  if(sessionStorage.getItem('ok')==='1'){
    $('#loginScreen').classList.add('hidden');
    $('#appLayout').classList.remove('hidden');
  }
  $('#btnSaveUrl') && ($('#btnSaveUrl').onclick = () => { localStorage.setItem('waslUrl', $('#waslUrl').value); toast('تم الحفظ'); });
  $('#btnChangePass') && ($('#btnChangePass').onclick = () => {
    const p = $('#newPass').value;
    if(p.length < 4) return toast('قصيرة');
    localStorage.setItem(PASS_KEY, p);
    toast('تم التغيير');
  });
  $('#btnCreateShare') && ($('#btnCreateShare').onclick = () => {
    const name = $('#shareName').value || 'مشارك';
    const link = location.href + '?share=' + Math.random().toString(36).slice(2);
    $('#shareResult').textContent = link;
    toast('تم إنشاء الرابط');
  });
  $('#btnExport') && ($('#btnExport').onclick = () => toast('تم التصدير (محلي)'));
  // features list
  const feats = ['المكالمات','الإشعارات','البقاء نشط','حفظ الأسماء','السجل','الحلول'];
  const fl = $('#featuresList');
  if(fl) fl.innerHTML = feats.map(f => `<div style="padding:0.5rem 0;border-bottom:1px solid var(--line)">${f} ✓</div>`).join('');
})();