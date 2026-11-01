(() => {
  const $ = selector => document.querySelector(selector);
  const t = key => KTM_UI.t(key);
  const node = (tag, text, className) => {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const repositories=[
    {name:'forge-core',language:'Rust',description:'Infrastructure / Git',files:{'README.md':'# Forge Core\n\nFictional repository.\nPrivate Git infrastructure.','Cargo.toml':'[package]\nname = "forge-core"\nversion = "0.0.0"','src/lib.rs':'// Fictional example, never executed.\npub fn project_name() -> &\'static str { "forge-core" }'}},
    {name:'atlas-api',language:'Python',description:'API / Data',files:{'README.md':'# Atlas API\n\nFictional Python repository.','src/app.py':'# Fictional example\ndef project():\n    return {"name": "Atlas", "language": "Python"}\n'}},
    {name:'jardin-web',language:'JavaScript',description:'Web / Community',files:{'README.md':'# Jardin\n\nFictional web project.','index.html':'<!doctype html>\n<html lang="en">\n<body><h1>Jardin</h1></body>\n</html>','src/app.js':'const project = { name: "Jardin" };'}},
    {name:'platform-ui',language:'TypeScript',description:'Interface / Components',files:{'README.md':'# Platform UI\n\nFictional interface repository.','src/app.ts':'type Project = { name: string };\nconst project: Project = { name: "Kryptos" };'}},
    {name:'sentinel',language:'Rust',description:'Supervision / Policies',files:{'README.md':'# Sentinel\n\nFictional repository. No supervision is running.','POLICY.md':'# Independent supervision\n\nAI recommendations do not grant permission to execute actions.'}}
  ].map((repo,index)=>({...repo,id:'demo-'+index,created:1793491200-index*86400,commits:[{hash:('a'+index+'b3c4d5e6f7').padEnd(40,'0'),message:'Initial project documentation',author:'Demo',time:'1793491200'},{hash:('b'+index+'c4d5e6f7a8').padEnd(40,'0'),message:'Define project boundaries',author:'Demo',time:'1793404800'}]}));

  let selected = repositories[0];
  let activeFile = '';
  function renderRepositories() {
    const list = $('#repo-list');
    list.replaceChildren();
    $('#repo-total').textContent = String(repositories.length);
    const query = $('#repo-search').value.trim().toLocaleLowerCase(KTM_UI.language);
    const visible = repositories.filter(repo => (repo.name + ' ' + repo.description).toLocaleLowerCase(KTM_UI.language).includes(query));
    visible.sort((a,b) => $('#repo-sort').value === 'name' ? a.name.localeCompare(b.name, KTM_UI.language) : b.created-a.created);
    if (!visible.length) { list.append(node('p', t('noResults'), 'notice')); return; }
    visible.forEach(repo => {
      const button = node('button', '', 'repo-card');
      button.type = 'button';
      button.setAttribute('aria-pressed', String(repo === selected));
      const top = node('div', '', 'repo-card-top');
      top.append(node('span', '⌘'), node('h3', repo.name), node('span', t('private'), 'badge'));
      const foot = node('div', '', 'repo-card-foot');
      foot.append(node('span', repo.language), node('span', new Date(repo.created*1000).toLocaleDateString(KTM_UI.language)));
      button.append(top, node('p', repo.description), foot);
      button.addEventListener('click', () => selectRepository(repo));
      list.append(button);
    });
  }
  function setTab(index) {
    ['files','commits'].forEach((key,i) => {
      const tab = $('#'+key+'-tab');
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      $('#'+key+'-panel').hidden = i !== index;
    });
  }
  function showFile(path) {
    activeFile = path;
    $('#file-name').textContent = path;
    $('#file-content').textContent = selected.files[path];
    [...$('#file-list').children].forEach(button => button.setAttribute('aria-pressed', String(button.textContent === path)));
  }
  function selectRepository(repo, preserveFile = false) {
    selected = repo;
    $('#repo-title').textContent = repo.name;
    $('#repo-description').textContent = repo.description;
    $('#repo-workspace').hidden = false;
    const files = Object.keys(repo.files);
    $('#file-total').textContent = files.length + ' · ' + t('files');
    $('#file-list').replaceChildren();
    files.forEach(path => { const button = node('button', path); button.type = 'button'; button.addEventListener('click', () => showFile(path)); $('#file-list').append(button); });
    $('#commits-list').replaceChildren();
    repo.commits.forEach(commit => {
      const item = node('li', ''); const detail = node('div', '');
      detail.append(node('h3', commit.message), node('p', commit.author + ' · ' + new Date(Number(commit.time)*1000).toLocaleDateString(KTM_UI.language)));
      item.append(detail, node('code', commit.hash.slice(0,8))); $('#commits-list').append(item);
    });
    showFile(preserveFile && files.includes(activeFile) ? activeFile : files[0]);
    renderRepositories();
    if (!preserveFile) setTab(0);
  }
  ['files','commits'].forEach((key,index) => {
    const tab = $('#'+key+'-tab');
    tab.addEventListener('click', () => setTab(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = 1-index;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = 1;
      if (next !== undefined) { event.preventDefault(); setTab(next); $('#'+['files','commits'][next]+'-tab').focus(); }
    });
  });
  $('#repo-search').addEventListener('input', renderRepositories);
  $('#repo-sort').addEventListener('change', renderRepositories);
  $('#demo-banner').hidden = false;
  $('#workspace-view').hidden = false;
  $('#sidebar-user').textContent = 'Demo';
  $('#user-display').textContent = 'Demo';
  $('#user-initials').textContent = 'KT';
  window.addEventListener('ktm-preferences', () => selectRepository(selected, true));
  selectRepository(selected);
})();
