(() => {
  const $=selector=>document.querySelector(selector);
  const demo=document.body.dataset.demo==='true';
  const t=key=>KTM_UI.t(key);
  const node=(tag,text,className)=>{const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;return el;};
  let user=null,repos=[],selected=null,fileName='',authMode='login',selectionVersion=0;
  const demoData=[
    {name:'forge-core',language:'Rust',description:'Infrastructure / Git',files:{'README.md':'# Forge Core\n\nFictional repository / Dépôt fictif.\nPrivate Git infrastructure.','Cargo.toml':'[package]\nname = "forge-core"\nversion = "0.0.0"','src/lib.rs':'// Fictional example, never executed.\npub fn project_name() -> &\'static str { "forge-core" }'}},
    {name:'atlas-api',language:'Python',description:'API / Data',files:{'README.md':'# Atlas API\n\nFictional Python repository.','src/app.py':'# Fictional example\ndef project():\n    return {"name": "Atlas", "language": "Python"}\n'}},
    {name:'jardin-web',language:'JavaScript',description:'Web / Community',files:{'README.md':'# Jardin\n\nFictional web project.','index.html':'<!doctype html>\n<html lang="fr">\n<body><h1>Jardin</h1></body>\n</html>','src/app.js':'const project = { name: "Jardin" };'}},
    {name:'platform-ui',language:'TypeScript',description:'Interface / Components',files:{'README.md':'# Platform UI\n\nFictional interface repository.','src/app.ts':'type Project = { name: string };\nconst project: Project = { name: "Kryptos" };'}},
    {name:'sentinel',language:'Rust',description:'Supervision / Policies',files:{'README.md':'# Sentinel\n\nFictional repository. No supervision is running.','POLICY.md':'# Independent supervision\n\nAI recommendations do not grant permission to execute actions.'}}
  ].map((repo,index)=>({...repo,id:'demo-'+index,created:1793491200-index*86400,commits:[{hash:('a'+index+'b3c4d5e6f7').padEnd(40,'0'),message:'Initial project documentation',author:'Demo',time:'1793491200'},{hash:('b'+index+'c4d5e6f7a8').padEnd(40,'0'),message:'Define project boundaries',author:'Demo',time:'1793404800'}]}));
  const errorKeys={invalid_credentials:'errorAuth',invalid_credentials_format:'errorFormat',username_unavailable:'errorUser',invalid_repository:'errorRepo',repository_exists:'errorExists',invalid_path:'errorPath',repository_limit:'errorLimit',origin_rejected:'errorOrigin',try_later:'errorLater',invalid_file:'errorFile',authentication_required:'sessionExpired'};
  function report(selector,error){const el=$(selector);el.dataset.i18n=errorKeys[error.code]||error.key||'error';el.textContent=t(el.dataset.i18n);el.hidden=false;}
  async function api(path,body){
    let response;try{response=await fetch('/api'+path,{method:body===undefined?'GET':'POST',credentials:'same-origin',headers:body===undefined?{}:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});}catch{throw {key:'errorOffline'};}
    if(response.status===413)throw {key:'errorFile'};
    let data;try{data=await response.json();}catch{throw {key:'errorOffline'};}
    if(!response.ok){if(response.status===401&&user){user=null;showAuth();}throw {code:data.error};}return data;
  }
  function showAuth(){selected=null;selectionVersion++;$('#workspace-view').hidden=true;$('#auth-view').hidden=false;$('#logout').hidden=true;$('#password').value='';}
  function showWorkspace(){
    if($('#auth-view'))$('#auth-view').hidden=true;$('#workspace-view').hidden=false;$('#logout').hidden=demo;
    $('#sidebar-user').textContent=user.username;$('#user-display').textContent=user.username;$('#user-initials').textContent=user.username.slice(0,2).toUpperCase();renderRepos();
  }
  function renderRepos(){
    const list=$('#repo-list');list.replaceChildren();$('#repo-total').textContent=String(repos.length);
    const query=$('#repo-search').value.trim().toLocaleLowerCase(KTM_UI.language);
    const visible=repos.filter(repo=>(repo.name+' '+repo.description).toLocaleLowerCase(KTM_UI.language).includes(query)).sort((a,b)=>$('#repo-sort').value==='name'?a.name.localeCompare(b.name,KTM_UI.language):b.created-a.created);
    if(!visible.length){const empty=node('div','','empty-state');empty.append(node('span','⌘'),node('h3',t(repos.length?'noResults':'empty')),node('p',repos.length?'':t('emptyText')));list.append(empty);return;}
    visible.forEach(repo=>{
      const button=node('button','','repo-card');button.type='button';button.setAttribute('aria-pressed',String(repo.id===selected?.id));
      const top=node('div','','repo-card-top');const icon=node('span','⌘');icon.setAttribute('aria-hidden','true');top.append(icon,node('h3',repo.name),node('span',t('private'),'badge'));
      const foot=node('div','','repo-card-foot');foot.append(node('span',repo.language||'Git'),node('span',new Date(repo.created*1000).toLocaleDateString(KTM_UI.language,{day:'numeric',month:'short',year:'numeric'})));
      button.append(top,node('p',repo.description),foot);button.addEventListener('click',()=>selectRepo(repo));list.append(button);
    });
  }
  function setTab(index){
    ['files','commits'].forEach((key,i)=>{const tab=$('#'+key+'-tab');tab.setAttribute('aria-selected',String(index===i));tab.tabIndex=index===i?0:-1;$('#'+key+'-panel').hidden=index!==i;});
  }
  async function selectRepo(repo){
    selected=repo;const version=++selectionVersion;fileName='';renderRepos();$('#workspace-status').hidden=true;
    $('#repo-title').textContent=repo.name;$('#repo-description').textContent=repo.description;$('#repo-workspace').hidden=false;$('#file-list').replaceChildren();$('#file-content').textContent='';$('#file-name').textContent='';setTab(0);
    try{
      const files=demo?Object.keys(repo.files):(await api('/repos/'+repo.id+'/files')).files;
      const commits=demo?repo.commits:(await api('/repos/'+repo.id+'/commits')).commits;
      if(version!==selectionVersion)return;
      $('#file-total').textContent=String(files.length)+' · '+t('files');
      files.forEach(path=>{const button=node('button',path);button.type='button';button.addEventListener('click',()=>showFile(path));$('#file-list').append(button);});
      $('#commits-list').replaceChildren();commits.forEach(commit=>{const li=node('li','');const text=node('div','');text.append(node('h3',commit.message),node('p',commit.author+' · '+new Date(Number(commit.time)*1000).toLocaleDateString(KTM_UI.language)));li.append(text,node('code',commit.hash.slice(0,8)));$('#commits-list').append(li);});
      if(files.length)await showFile(files[0]);
    }catch(error){report('#workspace-status',error);}
  }
  let fileRequest=0;
  async function showFile(path){
    const repo=selected,version=++fileRequest;
    try{const content=demo?repo.files[path]:(await api('/repos/'+repo.id+'/file',{path,read:true})).content;
      if(repo!==selected||version!==fileRequest)return;
      fileName=path;$('#file-name').textContent=path;$('#file-content').textContent=content;
      [...$('#file-list').children].forEach(button=>button.setAttribute('aria-pressed',String(button.textContent===path)));
    }catch(error){report('#workspace-status',error);}
  }
  function changeAuth(mode){authMode=mode;['signin','signup'].forEach((key,index)=>{const tab=$('#'+key+'-tab');tab.setAttribute('aria-selected',String((mode==='login'?0:1)===index));tab.tabIndex=tab.getAttribute('aria-selected')==='true'?0:-1;});$('#auth-form').setAttribute('aria-labelledby',mode==='login'?'signin-tab':'signup-tab');$('#auth-submit').dataset.i18n=mode==='login'?'submitLogin':'submitSignup';$('#auth-submit').textContent=t($('#auth-submit').dataset.i18n);$('#password').autocomplete=mode==='login'?'current-password':'new-password';$('#auth-error').hidden=true;}
  $('#signin-tab')?.addEventListener('click',()=>changeAuth('login'));$('#signup-tab')?.addEventListener('click',()=>changeAuth('register'));
  function keyboardTabs(ids,select){ids.forEach((id,index)=>{$('#'+id)?.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%ids.length;if(event.key==='ArrowLeft')next=(index+ids.length-1)%ids.length;if(event.key==='Home')next=0;if(event.key==='End')next=ids.length-1;if(next!==undefined){event.preventDefault();select(next);$('#'+ids[next]).focus();}});});}
  keyboardTabs(['signin-tab','signup-tab'],index=>changeAuth(index===0?'login':'register'));
  keyboardTabs(['files-tab','commits-tab'],setTab);$('#files-tab').addEventListener('click',()=>setTab(0));$('#commits-tab').addEventListener('click',()=>setTab(1));
  async function submitForm(form,errorSelector,action){
    const button=form.querySelector('button[type=submit]');button.disabled=true;$(errorSelector).hidden=true;
    try{await action();}catch(error){report(errorSelector,error);}finally{button.disabled=false;}
  }
  $('#auth-form')?.addEventListener('submit',event=>{event.preventDefault();submitForm(event.currentTarget,'#auth-error',async()=>{
    const result=await api('/'+authMode,{username:$('#username').value.trim().toLowerCase(),password:$('#password').value});$('#password').value='';user=result.user;repos=(await api('/repos')).repos;showWorkspace();
  });});
  $('#logout').addEventListener('click',async()=>{try{await api('/logout',{});user=null;repos=[];showAuth();}catch(error){report('#workspace-status',error);}});
  $('#new-repo').addEventListener('click',()=>{$('#repo-form').reset();$('#repo-error').hidden=true;$('#repo-dialog').showModal();});
  $('#repo-form').addEventListener('submit',event=>{event.preventDefault();submitForm(event.currentTarget,'#repo-error',async()=>{
    const name=$('#repo-name').value.trim(),description=$('#repo-desc').value.trim();let id;
    if(demo){if(repos.some(repo=>repo.name===name))throw {code:'repository_exists'};id='demo-'+crypto.randomUUID();repos.unshift({id,name,description,created:Math.floor(Date.now()/1000),files:{'README.md':'# '+name+'\n\n'+description},commits:[]});}
    else{id=(await api('/repos',{name,description})).id;repos=(await api('/repos')).repos;}
    $('#repo-dialog').close();renderRepos();await selectRepo(repos.find(repo=>repo.id===id));
  });});
  $('#new-file').addEventListener('click',()=>{$('#file-form').reset();$('#file-error').hidden=true;$('#file-dialog').showModal();});
  $('#file-form').addEventListener('submit',event=>{event.preventDefault();submitForm(event.currentTarget,'#file-error',async()=>{
    const path=$('#file-path').value.trim(),content=$('#file-text').value,message=$('#commit-message').value.trim();
    if(!path||path.split('/').some(part=>!part||part==='..'||part==='.'||part.toLowerCase()==='.git')||/[\\\x00-\x1f:]/.test(path))throw {code:'invalid_path'};
    if(demo){selected.files[path]=content;selected.commits.unshift({hash:crypto.randomUUID().replaceAll('-','').padEnd(40,'0'),message,author:'Demo',time:String(Math.floor(Date.now()/1000))});}
    else await api('/repos/'+selected.id+'/file',{path,content,message});
    $('#file-dialog').close();await selectRepo(selected);await showFile(path);
  });});
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
  $('#repo-search').addEventListener('input',renderRepos);$('#repo-sort').addEventListener('change',renderRepos);
  window.addEventListener('ktm-preferences',()=>{if(user){renderRepos();if(selected){$('#file-total').textContent=$('#file-list').children.length+' · '+t('files');}}});
  async function start(){
    if(demo){$('#demo-banner').hidden=false;user={username:'explorer'};repos=demoData;showWorkspace();await selectRepo(repos[0]);return;}
    try{user=(await api('/me')).user;repos=(await api('/repos')).repos;showWorkspace();}catch(error){showAuth();if(error.code!=='authentication_required')report('#auth-error',error);}
  }
  start();
})();
