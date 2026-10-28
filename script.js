const T=['scene','action','char','paren','dial','trans'],CYC=['action','scene','char','paren','dial','trans'];
const L={scene:'Scène',action:'Action',char:'Personnage',paren:'Parenthèse',dial:'Dialogue',trans:'Transition'};
const NEXT={scene:'action',action:'action',char:'dial',paren:'dial',dial:'char',trans:'scene'};
const $=id=>document.getElementById(id);
const SEQUENCE_TEMPLATES={
harmon:{name:'Cercle de Dan Harmon',beats:[
['1. Un personnage est dans sa zone de confort','Présente le quotidien et le monde familier du personnage.'],
['2. Il veut quelque chose','Fais émerger un désir, un manque ou un objectif concret.'],
['3. Il entre dans une situation inconnue','Le personnage franchit un seuil et quitte ses repères.'],
['4. Il s’adapte à cette nouvelle situation','Il cherche une méthode, rencontre des alliés et affronte des obstacles.'],
['5. Il obtient ce qu’il voulait','Le succès arrive, mais son prix ou ses conséquences apparaissent.'],
['6. Il paie le prix','Une perte, un choix difficile ou un retour de bâton survient.'],
['7. Il revient dans son monde','Le personnage retrouve son point de départ, transformé par l’expérience.'],
['8. Il a changé','Montre ce qui a changé en lui et ce que cette évolution implique.']
]},
hero:{name:'Voyage du héros',beats:[
['1. Monde ordinaire','Présente le héros dans son quotidien avant l’aventure.'],
['2. Appel de l’aventure','Un événement lance l’histoire et propose un défi.'],
['3. Refus de l’appel','Le héros hésite, résiste ou mesure le risque.'],
['4. Rencontre avec le mentor','Un guide, une rencontre ou un outil aide le héros à se préparer.'],
['5. Franchissement du seuil','Le héros s’engage dans le monde extraordinaire.'],
['6. Épreuves, alliés et ennemis','Le héros apprend les règles du nouveau monde et noue des alliances.'],
['7. Approche de l’épreuve','Le héros se prépare à l’affrontement ou au danger central.'],
['8. Épreuve suprême','Une crise majeure met le héros face à ses peurs et peut le transformer.'],
['9. Récompense','Le héros obtient un objet, une vérité ou une nouvelle capacité.'],
['10. Chemin du retour','Le retour vers le monde ordinaire apporte de nouvelles difficultés.'],
['11. Résurrection','Une dernière épreuve vérifie la transformation du héros.'],
['12. Retour avec l’élixir','Le héros revient avec quelque chose qui peut changer son monde.']
]},
threeAct:{name:'Structure en trois actes',beats:[
['Acte I — Mise en place','Présente le protagoniste, son monde, son désir et l’incident déclencheur.'],
['Acte I — Premier tournant','Un choix engage le protagoniste dans l’intrigue principale.'],
['Acte II — Confrontation','Les obstacles montent et les stratégies du protagoniste sont mises à l’épreuve.'],
['Acte II — Point médian','Une révélation ou un renversement change la compréhension de l’enjeu.'],
['Acte II — Crise','Les pertes s’accumulent et le protagoniste semble au plus bas.'],
['Acte III — Climax','Le protagoniste affronte le conflit central et fait un choix décisif.'],
['Acte III — Résolution','Montre les conséquences du climax et le nouvel équilibre.']
]},
sevenPoint:{name:'Structure en 7 points',beats:[
['1. Accroche','Présente une image, une situation ou une question qui donne envie de poursuivre.'],
['2. Incident déclencheur','Un événement vient déséquilibrer le quotidien du protagoniste.'],
['3. Premier tournant','Le protagoniste s’engage dans une nouvelle direction et l’intrigue démarre vraiment.'],
['4. Point médian','Une victoire, une défaite ou une révélation change la stratégie et les enjeux.'],
['5. Second tournant','La situation se resserre; le protagoniste découvre ce qu’il doit réellement affronter.'],
['6. Climax','Le protagoniste prend une décision décisive face au conflit central.'],
['7. Résolution','Montre les conséquences de cette décision et le nouvel équilibre.']
]},
eightSequences:{name:'Structure en 8 séquences',beats:[
['Séquence 1 — Mise en place','Présente le monde, le protagoniste, son désir et la situation initiale.'],
['Séquence 2 — Déclencheur','L’incident déclencheur lance l’intrigue et pose une première question dramatique.'],
['Séquence 3 — Première stratégie','Le protagoniste agit pour atteindre son objectif; la séquence se conclut sur un obstacle ou un tournant.'],
['Séquence 4 — Complications','Les obstacles s’intensifient et les enjeux deviennent plus personnels.'],
['Séquence 5 — Point médian','Un renversement modifie la compréhension du conflit ou la stratégie du protagoniste.'],
['Séquence 6 — Pression croissante','Les conséquences s’accumulent et les solutions faciles disparaissent.'],
['Séquence 7 — Crise et climax','Le protagoniste affronte le choix ou l’épreuve centrale.'],
['Séquence 8 — Résolution','Le conflit se dénoue et l’on découvre ce qui a changé.']
]},
freytag:{name:'Pyramide de Freytag — 5 actes',beats:[
['1. Exposition','Présente les personnages, le contexte et les tensions latentes.'],
['2. Montée de l’action','Les événements s’enchaînent et les enjeux progressent vers un point culminant.'],
['3. Climax','Le point de bascule concentre la tension et transforme le cours de l’histoire.'],
['4. Dénouement / retombée','Les conséquences du climax se déploient et les conflits se résolvent.'],
['5. Catastrophe ou résolution','Achève la trajectoire selon le ton choisi: chute tragique ou retour à l’équilibre.']
]},
fifteenBeats:{name:'Structure en 15 temps',beats:[
['1. Image d’ouverture','Une image résume le monde et l’état initial du protagoniste.'],
['2. Thème annoncé','Une idée centrale est évoquée, souvent sans que le protagoniste la comprenne encore.'],
['3. Mise en place','Présente le protagoniste, ses relations, son manque et le monde ordinaire.'],
['4. Déclencheur','Un événement bouleverse le quotidien.'],
['5. Débat','Le protagoniste hésite sur la manière de répondre à l’événement.'],
['6. Passage à l’acte II','Il choisit d’agir et entre dans une nouvelle situation.'],
['7. Intrigue secondaire','Une relation ou une intrigue parallèle éclaire le thème.'],
['8. Promesse du concept','Le récit explore la situation et les éléments qui ont suscité l’intérêt initial.'],
['9. Point médian','Un succès apparent ou un revers augmente les enjeux et change la dynamique.'],
['10. Les obstacles se resserrent','Les adversaires, les erreurs et les conflits intérieurs gagnent du terrain.'],
['11. Tout semble perdu','Le protagoniste subit une perte majeure ou croit avoir échoué.'],
['12. Nuit noire de l’âme','Il mesure le coût de son échec et reconsidère sa façon d’agir.'],
['13. Passage à l’acte III','Une idée, une alliance ou une prise de conscience ouvre une solution.'],
['14. Final','Le protagoniste applique ce qu’il a appris dans la confrontation décisive.'],
['15. Image finale','Une image répond à l’ouverture et montre le changement accompli.']
]},
kishotenketsu:{name:'Kishōtenketsu',beats:[
['Ki — Introduction','Installe le cadre, les personnages et les éléments de départ.'],
['Shō — Développement','Approfondis la situation et fais évoluer les éléments présentés.'],
['Ten — Tournant','Introduis un contraste, une perspective inattendue ou une révélation.'],
['Ketsu — Conclusion','Relie les éléments précédents et montre leur nouvelle signification.']
]},
fichtean:{name:'Courbe de Fichte',beats:[
['Exposition brève','Présente rapidement le protagoniste, son objectif et le danger imminent.'],
['Crise 1 — Première complication','Une crise force le protagoniste à agir et entraîne des conséquences.'],
['Crise 2 — Enjeux relevés','Une nouvelle crise aggrave la situation et réduit les options disponibles.'],
['Crise 3 — Révélation ou revers','Un revers majeur transforme le conflit ou met au jour une vérité.'],
['Crise 4 — Pression maximale','Les crises convergent; le protagoniste risque de tout perdre.'],
['Climax','La décision ou l’affrontement final tranche le conflit.'],
['Dénouement','Présente brièvement les conséquences et le sort des personnages.']
]},
mystery:{name:'Structure d’enquête',beats:[
['1. Mystère initial','Présente le crime, la disparition ou la question à résoudre.'],
['2. Lancement de l’enquête','L’enquêteur accepte l’affaire et formule une première hypothèse.'],
['3. Indices et suspects','Réunis des éléments, présente les suspects et leurs motifs possibles.'],
['4. Fausse piste','Une interprétation plausible détourne l’enquête de la vérité.'],
['5. Complication personnelle','Le danger se rapproche de l’enquêteur ou d’un personnage impliqué.'],
['6. Renversement','Un indice ou un événement invalide l’hypothèse dominante.'],
['7. Reconstitution','L’enquêteur relie les faits et identifie la logique cachée.'],
['8. Révélation et confrontation','La vérité est exposée et l’enquêteur affronte le responsable ou les conséquences.'],
['9. Résolution','Explique les dernières conséquences et referme les questions essentielles.']
]},
romance:{name:'Arc romantique',beats:[
['1. Deux mondes','Présente les personnages, leurs besoins affectifs et ce qui les tient à distance.'],
['2. Rencontre','Leurs trajectoires se croisent et une première impression s’établit.'],
['3. Rapprochement','Des expériences partagées créent confiance, attirance ou complicité.'],
['4. Complication','Un obstacle extérieur ou une incompatibilité menace le lien naissant.'],
['5. Engagement fragile','Les personnages choisissent d’essayer malgré les risques.'],
['6. Rupture ou crise','Un secret, une peur ou un conflit provoque une séparation ou une perte de confiance.'],
['7. Prise de conscience','Chaque personnage comprend sa part de responsabilité et ce qu’il doit changer.'],
['8. Choix décisif','Un geste ou une décision prouve la sincérité de l’évolution.'],
['9. Résolution','Le couple se reforme, se transforme ou se sépare selon le ton de l’histoire.']
]},
davidGoliath:{name:'Combat — David contre Goliath',beats:[
['1. Écart de puissance','Établis la supériorité écrasante de l’adversaire et la fragilité du héros : taille, force, moyens, réputation.'],
['2. Enjeu personnel','Montre pourquoi le héros ne peut ni fuir ni refuser le combat.'],
['3. Le doute des autres','Les témoins, alliés ou rivaux jugent la défaite inévitable; la pression monte.'],
['4. Les armes du faible','Révèle l’atout du héros : ruse, vitesse, terrain, savoir-faire ou détermination.'],
['5. Premier contact','L’adversaire domine; le héros encaisse, esquive ou survit de justesse.'],
['6. Le héros est piégé','Sa première approche échoue et il semble sur le point de perdre.'],
['7. Observation et faille','Il repère une faiblesse ou comprend comment retourner la situation.'],
['8. Le renversement','Il applique son plan; l’adversaire est surpris et sa confiance vacille.'],
['9. Coup décisif','Un geste précis, risqué et irréversible tranche le combat.'],
['10. Conséquences','Montre le prix de la victoire et ce qu’elle change pour le héros et les témoins.']
]},
duelEquilibre:{name:'Combat — Duel 1 contre 1 équilibré',beats:[
['1. Face à face','Présente les deux adversaires, leurs motivations et ce qui rend le duel inévitable.'],
['2. Règles et enjeux','Précise ce que chacun peut gagner ou perdre, et les limites du combat.'],
['3. Tâtonnement','Les combattants se testent; chacun révèle son style sans prendre l’avantage.'],
['4. Premier avantage A','Le premier combattant marque un point ou prend l’initiative.'],
['5. Riposte de B','Le second s’adapte et inverse la dynamique.'],
['6. Escalade','Les coups s’intensifient; les deux utilisent leurs meilleures techniques.'],
['7. Épuisement et blessures','La fatigue et les dégâts révèlent les failles de chacun.'],
['8. Révélation','Un secret, une émotion ou une technique cachée change la perception du combat.'],
['9. Impasse brisée','Un choix tactique ou personnel fait pencher la balance.'],
['10. Issue et respect','Le vainqueur est désigné ou le combat s’interrompt; la relation entre les adversaires est transformée.']
]},
combatEquilibre:{name:'Combat — Affrontement équilibré (groupe / bataille)',beats:[
['1. Deux camps en présence','Présente les forces, objectifs et ressources de chaque camp, à peu près équivalentes.'],
['2. Terrain et plans','Montre la stratégie de chaque côté et les points stratégiques à contrôler.'],
['3. Premier contact','L’engagement commence; aucune des parties ne prend nettement le dessus.'],
['4. Avantage d’un camp','Une manœuvre réussie donne l’initiative à un côté.'],
['5. Contre-attaque','L’autre camp réagit et reprend du terrain.'],
['6. Pertes et tensions','Les pertes s’accumulent; des conflits ou doutes apparaissent dans les rangs.'],
['7. Point de bascule','Un événement imprévu (renfort, trahison, changement de terrain) menace l’équilibre.'],
['8. Dernier effort','Les deux camps engagent leurs dernières ressources.'],
['9. Résolution du combat','Un camp l’emporte de peu, ou les deux s’arrêtent épuisés.'],
['10. Bilan','Montre les pertes, la signification de l’issue et ce qu’elle ouvre pour la suite.']
]}
};
const doc=$('doc');let cur=0,armed=false;
function sample(){return{title:'Le Dernier Train',author:'',blocks:[
{t:'scene',x:'INT. GARE DE LYON – NUIT'},
{t:'action',x:'Le hall est presque désert. Une valise abandonnée trône sous l’horloge. MARTHE, 60 ans, manteau trop grand, la fixe sans bouger.'},
{t:'char',x:'MARTHE'},{t:'paren',x:'(à voix basse)'},{t:'dial',x:'Il ne viendra pas, n’est-ce pas ?'},
{t:'char',x:'LE CONTRÔLEUR'},{t:'dial',x:'Le dernier train est parti, madame.'},
{t:'trans',x:'FONDU AU NOIR.'}]}}
const PROJECTS_KEY='scn-projects-v1';
const JSON_AUTOSAVE_INTERVAL=30*60*1000;
const clone=value=>JSON.parse(JSON.stringify(value));
function freshProject(name,data){return{id:uid(),name,updatedAt:new Date().toISOString(),data}};
function initialProjectStore(){
try{
const stored=JSON.parse(localStorage.getItem(PROJECTS_KEY));
if(stored&&stored.version===1&&Array.isArray(stored.projects)&&stored.projects.length){
const projects=stored.projects.filter(project=>project&&project.id&&project.data&&Array.isArray(project.data.blocks));
if(projects.length){const active=projects.some(project=>project.id===stored.activeId)?stored.activeId:projects[0].id;return{version:1,activeId:active,projects}}
}
}catch(e){}
let legacy=null;try{legacy=JSON.parse(localStorage.getItem('scn1'))}catch(e){}
const data=legacy&&Array.isArray(legacy.blocks)?legacy:sample(),project=freshProject(data.title||'Mon scénario',data);
return{version:1,activeId:project.id,projects:[project]}}
const projectStore=initialProjectStore();
let activeProjectId=projectStore.activeId;
const activeProject=()=>projectStore.projects.find(project=>project.id===activeProjectId);
let S=clone(activeProject().data);
function save(){
if(currentView==='t')recordTimelineHistory();
const project=activeProject();if(!project)return;
project.data=clone(S);project.updatedAt=new Date().toISOString();projectStore.activeId=activeProjectId;
try{localStorage.setItem(PROJECTS_KEY,JSON.stringify(projectStore));$('saveStatus').textContent='Sauvegardé dans le navigateur à '+new Date(project.updatedAt).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}
catch(e){$('saveStatus').textContent='Échec de sauvegarde locale'}
}
let fileHandleDbPromise;
function openFileHandleDb(){
if(fileHandleDbPromise)return fileHandleDbPromise;
fileHandleDbPromise=new Promise((resolve,reject)=>{
const request=indexedDB.open('scenario-editor-file-handles',1);
request.onupgradeneeded=()=>request.result.createObjectStore('project-json');
request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);
});return fileHandleDbPromise;
}
async function getProjectJsonHandle(projectId){
const db=await openFileHandleDb();return new Promise((resolve,reject)=>{const request=db.transaction('project-json','readonly').objectStore('project-json').get(projectId);request.onsuccess=()=>resolve(request.result||null);request.onerror=()=>reject(request.error)});
}
async function storeProjectJsonHandle(projectId,handle){
const db=await openFileHandleDb();return new Promise((resolve,reject)=>{const request=db.transaction('project-json','readwrite').objectStore('project-json').put(handle,projectId);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error)});
}
async function deleteProjectJsonHandle(projectId){
const db=await openFileHandleDb();return new Promise((resolve,reject)=>{const request=db.transaction('project-json','readwrite').objectStore('project-json').delete(projectId);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error)});
}
function projectJsonPayload(project){return{format:'scenario-editor-project',version:1,project:{name:project.name,updatedAt:project.updatedAt,data:project.data}}}
async function writeProjectJson(project,handle){
const writable=await handle.createWritable();await writable.write(JSON.stringify(projectJsonPayload(project),null,2));await writable.close();
}
async function linkActiveProjectJson(){
const project=activeProject();
try{
let handle=await getProjectJsonHandle(project.id);
if(handle){let permission=await handle.queryPermission({mode:'readwrite'});if(permission!=='granted')permission=await handle.requestPermission({mode:'readwrite'});
if(permission==='granted'){await writeProjectJson(project,handle);$('saveStatus').textContent='Fichier JSON lié et mis à jour';return}}
if(!window.showSaveFilePicker){$('saveStatus').textContent='Liaison de fichier non disponible dans ce navigateur';window.alert('La mise à jour directe du JSON nécessite un navigateur compatible, comme Edge ou Chrome. La sauvegarde dans le navigateur reste active.');return}
handle=await window.showSaveFilePicker({suggestedName:(project.name.replace(/[^\w-]+/g,'_')||'projet')+'.json',types:[{description:'Fichier de projet JSON',accept:{'application/json':['.json']}}]});
await writeProjectJson(project,handle);await storeProjectJsonHandle(project.id,handle);$('saveStatus').textContent='Fichier JSON lié et mis à jour';
}catch(error){if(error.name==='AbortError')return;$('saveStatus').textContent='Impossible de lier le fichier JSON';window.alert('Le fichier JSON n’a pas pu être lié. Vérifiez les autorisations du navigateur.');}
}
let jsonAutosaveRunning=false;
async function autosaveLinkedProject(){
if(jsonAutosaveRunning)return;jsonAutosaveRunning=true;
try{
save();const project=activeProject(),handle=await getProjectJsonHandle(project.id);
if(!handle){$('saveStatus').textContent='Sauvegarde navigateur OK · aucun JSON lié';return}
const permission=await handle.queryPermission({mode:'readwrite'});
if(permission!=='granted'){$('saveStatus').textContent='Autorisation JSON requise · cliquez sur « Lier JSON »';return}
await writeProjectJson(project,handle);$('saveStatus').textContent='JSON du projet mis à jour à '+new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
}catch(error){$('saveStatus').textContent='Échec de la mise à jour du JSON'}
finally{jsonAutosaveRunning=false}
}
async function saveProjectNow(){
save();
try{
const project=activeProject(),handle=await getProjectJsonHandle(project.id);
if(!handle)return;
let permission=await handle.queryPermission({mode:'readwrite'});
if(permission!=='granted')permission=await handle.requestPermission({mode:'readwrite'});
if(permission!=='granted'){$('saveStatus').textContent='JSON non actualisé · autorisation refusée';return}
await writeProjectJson(project,handle);$('saveStatus').textContent='Projet et JSON enregistrés à '+new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
}catch(error){$('saveStatus').textContent='Projet sauvegardé ici · échec du JSON'}
}
let lastPeriodicSave=Date.now();
setInterval(()=>{if(Date.now()-lastPeriodicSave>=JSON_AUTOSAVE_INTERVAL){lastPeriodicSave=Date.now();autosaveLinkedProject()}},60*1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&Date.now()-lastPeriodicSave>=JSON_AUTOSAVE_INTERVAL){lastPeriodicSave=Date.now();autosaveLinkedProject()}});
function updateProjectControls(){
const select=$('ps'),current=activeProject();select.innerHTML='';
projectStore.projects.forEach(project=>{const option=document.createElement('option');option.value=project.id;option.textContent=project.name;select.append(option)});
select.value=activeProjectId;
if(!current)$('saveStatus').textContent='Aucun projet actif';
}
function updateDocumentFields(){ $('ti').value=S.title||'';$('au').value=S.author||'' }
const CHARACTER_FIELDS={
name:{label:'Nom',aliases:['nom','nom complet','personnage','name','full name']},
age:{label:'Âge',aliases:['age','âge']},
pronouns:{label:'Pronoms',aliases:['pronoms','pronom','pronouns']},
role:{label:'Rôle / profession',aliases:['role','rôle','profession','metier','métier','occupation','fonction']},
 mood:{label:'Humeur / tempérament',aliases:['humeur','temperament','tempérament','mood','mood temperament','mood temper']},
appearance:{label:'Apparence',aliases:['apparence','description physique','physique','appearance','look']},
personality:{label:'Personnalité',aliases:['personnalite','personnalité','caractere','caractère','personality','croyance fondamentale','core belief']},
background:{label:'Histoire',aliases:['histoire','histoire personnelle','passe','passé','background','backstory','experience negative','expérience négative','negative experience']},
goal:{label:'Objectif',aliases:['objectif','objectif principal','but','goal','objective','comment il justifie sa croyance fondamentale','justification de sa croyance fondamentale','belief justification']},
motivation:{label:'Motivation',aliases:['motivation','motivations','origine du besoin','origin of the need','need origin']},
fear:{label:'Peurs',aliases:['peur','peurs','crainte','craintes','fear','fears','but du personnage','character goal']},
secret:{label:'Secret',aliases:['secret','secrets','relations avec les autres','relations with others']},
voice:{label:'Voix / façon de parler',aliases:['voix','facon de parler','façon de parler','maniere de parler','manière de parler','voice','style de vie','lifestyle']},
notes:{label:'Notes',aliases:['notes','note','divers','autres informations','interaction avec autrui','interaction with others']},
hobbies:{label:'Loisirs',aliases:['loisir','loisirs','hobby','hobbies']},
skills:{label:'Compétences',aliases:['competence','compétence','competences','compétences','skill','skills']},
habits:{label:'Habitudes / addictions',aliases:['habitude','habitudes','addiction','addictions','habits','habits addictions']},
preferences:{label:'Goûts / préférences',aliases:['gout','goût','gouts','goûts','preferences','préférences','tastes','taste','tastes preferences']},
weaknesses:{label:'Faiblesses',aliases:['faiblesse','faiblesses','weakness','weaknesses','flaw','flaws']},
secret:{label:'Secret',aliases:['secret','secrets']},
voice:{label:'Voix / façon de parler',aliases:['voix','facon de parler','façon de parler','maniere de parler','manière de parler','voice']},
notes:{label:'Notes',aliases:['notes','note','divers','autres informations']}
};
const characterFieldByAlias=new Map(Object.entries(CHARACTER_FIELDS).flatMap(([key,field])=>field.aliases.map(alias=>[normalizeLabel(alias),key])));
let selectedCharacterId=null,currentView='w';
function normalizeLabel(value){return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()}
function characters(){return S.characters||(S.characters=[])}
function relationships(){return S.relationships||(S.relationships=[])}
function defaultCharacterArc(){return{type:'positive',startingState:'',startingBelief:'',desire:'',need:'',catalyst:'',firstTurningPoint:'',midpoint:'',crisis:'',climaxChoice:'',endingState:'',summary:''}}
const POWER_TIERS=[
['11-C','Sous-humain'],['11-B','Humain faible'],['11-A','Humain supérieur'],
['10-C','Humain moyen'],['10-B','Humain en forme'],['10-A','Athlète'],
['9-C','Niveau rue'],['9-B','Mur'],['9-A','Petit bâtiment'],
['8-C','Bâtiment'],['High 8-C','Grand bâtiment'],['8-B','Quartier urbain'],['8-A','Plusieurs quartiers'],
['7-C','Petite ville'],['High 7-C','Ville'],['7-B','Grande ville'],['7-A','Montagne'],['High 7-A','Grande montagne'],
['6-C','Île'],['High 6-C','Grande île'],['6-B','Pays'],['6-A','Continent'],
['5-C','Lune'],['Low 5-B','Petite planète'],['5-B','Planète'],['5-A','Grande planète'],['High 5-A','Naine brune'],
['4-C','Étoile'],['4-B','Système solaire'],['4-A','Plusieurs systèmes solaires'],
['3-C','Galaxie'],['3-B','Plusieurs galaxies'],['3-A','Univers'],['High 3-A','Univers supérieur'],
['Low 2-C','Univers +'],['2-C','Petit multivers'],['2-B','Multivers fini'],['2-A','Multivers infini'],
['Low 1-C','Multivers complexe inférieur'],['1-C','Multivers complexe'],['High 1-C','Multivers complexe supérieur'],
['Low 1-B','Hypervers inférieur'],['1-B','Hypervers'],['High 1-B','Hypervers supérieur'],
['Low 1-A','Outervers inférieur'],['1-A','Outervers'],['High 1-A','Outervers supérieur'],['0','Sans limites']
];
function defaultPowerStats(){return[
{id:uid(),label:'Niveau / tier',value:'',type:'tier'},
{id:uid(),label:'Puissance d’attaque',value:''},
{id:uid(),label:'Capacité destructive',value:''},
{id:uid(),label:'Force physique',value:''},
{id:uid(),label:'Vitesse',value:''},
{id:uid(),label:'Durabilité',value:''},
{id:uid(),label:'Endurance',value:''},
{id:uid(),label:'Portée',value:''},
{id:uid(),label:'Intelligence / stratégie',value:''},
{id:uid(),label:'Combat / maîtrise',value:''},
{id:uid(),label:'Capacités / pouvoirs',value:''}
]}
function newCharacter(){return{id:uid(),name:'Nouveau personnage',age:'',pronouns:'',role:'',appearance:'',personality:'',background:'',goal:'',motivation:'',fear:'',secret:'',voice:'',notes:'',mood:'',hobbies:'',skills:'',habits:'',preferences:'',weaknesses:'',portrait:'',customFields:[],powerStats:defaultPowerStats(),arc:defaultCharacterArc(),pdfText:''}}
function selectedCharacter(){return characters().find(character=>character.id===selectedCharacterId)}
function renderCharacterList(){
 $('characterCount').textContent=characters().length+' fiche'+(characters().length===1?'':'s');
 $('arcCharacterCount').textContent=characters().length+' personnage'+(characters().length===1?'':'s');
['characterList','powerCharacterList','arcCharacterList'].forEach(id=>{const list=$(id);list.innerHTML='';characters().forEach(character=>{const button=document.createElement('button');button.type='button';button.textContent=character.name||'Sans nom';button.className=character.id===selectedCharacterId?'on':'';button.onclick=()=>{selectedCharacterId=character.id;if(currentView==='p')renderPowerScaling();else if(currentView==='a')renderCharacterArc();else renderCharacters()};list.append(button)})});
}
function renderCharacterEditor(){
const character=selectedCharacter(),form=$('characterForm');form.hidden=!character;$('characterEmpty').hidden=!!character;
if(!character)return;
form.querySelectorAll('[data-character-field]').forEach(field=>{field.value=character[field.dataset.characterField]||''});
$('characterPdfText').value=character.pdfText||'';
const portrait=$('characterPortraitPreview');portrait.hidden=!character.portrait;portrait.src=character.portrait||'';$('portraitPlaceholder').hidden=!!character.portrait;$('removeCharacterPortrait').hidden=!character.portrait;
const custom=$('characterCustomFields');custom.innerHTML='';
(character.customFields||[]).forEach((field,index)=>{const row=document.createElement('div');row.className='custom-character-field';
const label=document.createElement('input');label.value=field.label;label.placeholder='Libellé';label.setAttribute('aria-label','Libellé du champ personnalisé');
const value=document.createElement('textarea');value.value=field.value;value.rows=2;value.placeholder='Valeur';value.setAttribute('aria-label','Valeur du champ personnalisé');
const remove=mb('×',()=>{character.customFields.splice(index,1);save();renderCharacterEditor()},'Supprimer ce champ');
label.oninput=()=>{field.label=label.value;save()};value.oninput=()=>{field.value=value.value;save()};row.append(label,value,remove);custom.append(row)});
renderCharacterRelations();
}
function renderPowerStats(character){
if(!Array.isArray(character.powerStats))character.powerStats=defaultPowerStats();
const container=$('powerScalingStats');container.innerHTML='';
character.powerStats.forEach((stat,index)=>{
const row=document.createElement('div');row.className='power-stat';
const label=document.createElement('input');label.type='text';label.value=stat.label;label.placeholder='Statistique';label.setAttribute('aria-label','Nom de la statistique');
const normalizedStatLabel=normalizeLabel(stat.label);
const isTier=stat.type==='tier'||(normalizedStatLabel.includes('niveau')&&normalizedStatLabel.includes('tier'))||normalizedStatLabel==='niveau'||normalizedStatLabel==='tier';
let value;
if(isTier){
stat.type='tier';value=document.createElement('select');value.setAttribute('aria-label','Tier de puissance');
const empty=document.createElement('option');empty.value='';empty.textContent='Choisir un tier…';value.append(empty);
const knownTiers=new Set(POWER_TIERS.map(([tier])=>tier));
if(stat.value&&!knownTiers.has(stat.value)){const previous=document.createElement('option');previous.value=stat.value;previous.textContent=stat.value+' (valeur existante)';value.append(previous)}
POWER_TIERS.forEach(([tier,description])=>{const option=document.createElement('option');option.value=tier;option.textContent=tier+' — '+description;value.append(option)});
value.value=stat.value||'';
}else{value=document.createElement('textarea');value.value=stat.value;value.rows=2;value.placeholder='Valeur, rang ou description';value.setAttribute('aria-label','Valeur de la statistique')}
const remove=mb('×',()=>{character.powerStats.splice(index,1);save();renderPowerStats(character)},'Supprimer cette statistique');
label.oninput=()=>{stat.label=label.value;save()};label.onchange=()=>{if(!isTier&&['niveau','tier'].includes(normalizeLabel(label.value))){stat.type='tier';stat.value='';save();renderPowerStats(character)}};
value.onchange=()=>{stat.value=value.value;save()};value.oninput=()=>{if(!isTier){stat.value=value.value;save()}};
row.append(label,value,remove);container.append(row);
});
}
function renderPowerScaling(){
if(selectedCharacterId&&!selectedCharacter())selectedCharacterId=null;
if(!selectedCharacterId&&characters().length)selectedCharacterId=characters()[0].id;
renderCharacterList();const character=selectedCharacter();
$('powerDetail').hidden=powerSubtab!=='detail';$('powerStatsView').hidden=powerSubtab!=='stats';$('pvDetail').className=powerSubtab==='detail'?'on':'';$('pvStats').className=powerSubtab==='stats'?'on':'';
if(powerSubtab==='stats'){renderPowerStatsView();return}
$('powerEmpty').hidden=!!character;$('powerPanel').hidden=!character;
if(character){$('powerHeading').textContent=character.name||'Personnage sans nom';renderPowerStats(character)}
}
const RADAR_GRADES=['—','E','D','C','B','A','S'];
let powerSubtab='detail';
function radarData(){
const radar=S.radar||(S.radar={axes:[],shown:[]});
if(!radar.axes.length)radar.axes=['Force','Vitesse','Endurance','Intelligence','Technique','Pouvoir'].map(label=>({id:uid(),label}));
radar.shown=(radar.shown||[]).filter(id=>characters().some(character=>character.id===id));
return radar;
}
function radarColor(character){return character.radarColor||CHART_COLORS[Math.max(0,characters().indexOf(character))%CHART_COLORS.length]}
function radarValue(character,axisId){return Math.max(0,Math.min(6,Number(character.radar?.[axisId])||0))}
function radarReportFields(character){const radar=radarData();return radar.axes.filter(axis=>radarValue(character,axis.id)>0).map(axis=>reportField('Stat — '+axis.label,RADAR_GRADES[radarValue(character,axis.id)])).join('')}
function drawRadar(){
const radar=radarData(),svg=$('radarSvg'),cx=280,cy=262,R=185,n=radar.axes.length;
const angle=i=>-Math.PI/2+i*2*Math.PI/n,point=(i,v)=>[Math.round((cx+Math.cos(angle(i))*R*v/6)*10)/10,Math.round((cy+Math.sin(angle(i))*R*v/6)*10)/10];
let markup='';
const editingCharacter=selectedCharacter(),editingGrade=axis=>editingCharacter&&radar.shown.includes(editingCharacter.id)&&radarValue(editingCharacter,axis.id)>0?' ('+RADAR_GRADES[radarValue(editingCharacter,axis.id)]+')':'';
for(let grade=1;grade<=6;grade++)markup+=`<polygon points="${radar.axes.map((_,i)=>point(i,grade).join(',')).join(' ')}" fill="none" stroke="${grade===6?'#9b968a':'#d6d0c3'}"/><text x="${cx+5}" y="${cy-R*grade/6-3}" class="radar-grade">${RADAR_GRADES[grade]}</text>`;
radar.axes.forEach((axis,i)=>{const[x,y]=point(i,6),[lx,ly]=point(i,6.6),cos=Math.cos(angle(i));markup+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#d6d0c3"/><text x="${lx}" y="${ly+4}" text-anchor="${Math.abs(cos)<.25?'middle':cos>0?'start':'end'}" class="radar-label">${htmlEscape(axis.label)}${editingGrade(axis)}</text>`});
characters().filter(character=>radar.shown.includes(character.id)).sort((a,b)=>(a.id===selectedCharacterId)-(b.id===selectedCharacterId)).forEach(character=>{
const color=radarColor(character),editing=character.id===selectedCharacterId,points=radar.axes.map((axis,i)=>point(i,radarValue(character,axis.id)));
markup+=`<polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="${htmlEscape(color)}" fill-opacity=".16" stroke="${htmlEscape(color)}" stroke-width="${editing?3:2}" stroke-linejoin="round"/>`;
points.forEach((p,i)=>{markup+=`<circle data-character="${htmlEscape(character.id)}" data-axis="${htmlEscape(radar.axes[i].id)}" cx="${p[0]}" cy="${p[1]}" r="${editing?8:4}" fill="${htmlEscape(color)}" stroke="#fff" stroke-width="2"><title>${htmlEscape(character.name||'Sans nom')} — ${htmlEscape(radar.axes[i].label)} : ${RADAR_GRADES[radarValue(character,radar.axes[i].id)]}</title></circle>`});
});
svg.innerHTML=markup;
svg.querySelectorAll('circle').forEach(circle=>{
if(circle.dataset.character!==selectedCharacterId)return;
circle.onpointerdown=event=>{
event.preventDefault();const character=selectedCharacter(),index=radar.axes.findIndex(axis=>axis.id===circle.dataset.axis);if(!character||index<0)return;
const rect=svg.getBoundingClientRect();
drag(move=>{const dx=(move.clientX-rect.left)*680/rect.width-60-cx,dy=(move.clientY-rect.top)*520/rect.height-cy,distance=dx*Math.cos(angle(index))+dy*Math.sin(angle(index));(character.radar||(character.radar={}))[radar.axes[index].id]=Math.max(0,Math.min(6,Math.round(distance/R*6)));drawRadar()},()=>{save();renderPowerStatsView()});
};
});
}
function renderPowerStatsView(){
const radar=radarData(),list=$('radarCharacters');list.innerHTML='';
if(!characters().length){const empty=document.createElement('p');empty.className='em';empty.textContent='Crée des personnages pour comparer leurs stats.';list.append(empty)}
if(!radar.shown.length&&selectedCharacter())radar.shown.push(selectedCharacterId);
characters().forEach(character=>{
const row=document.createElement('div');row.className='radar-character'+(character.id===selectedCharacterId?' on':'');
const check=document.createElement('input');check.type='checkbox';check.checked=radar.shown.includes(character.id);check.setAttribute('aria-label','Afficher '+(character.name||'Sans nom'));check.onchange=()=>{radar.shown=check.checked?[...radar.shown,character.id]:radar.shown.filter(id=>id!==character.id);save();drawRadar()};
const color=document.createElement('input');color.type='color';color.value=radarColor(character);color.setAttribute('aria-label','Couleur de '+(character.name||'Sans nom'));color.oninput=()=>{character.radarColor=color.value;save();drawRadar()};
const name=mb(character.name||'Sans nom',()=>{selectedCharacterId=character.id;if(!radar.shown.includes(character.id))radar.shown.push(character.id);save();renderPowerStatsView()},'Modifier les notes de ce personnage');
row.append(check,color,name);list.append(row);
});
const axesBox=$('radarAxes');axesBox.innerHTML='';
radar.axes.forEach((axis,index)=>{
const row=document.createElement('div');row.className='radar-axis';
const label=document.createElement('input');label.type='text';label.value=axis.label;label.setAttribute('aria-label','Nom de l’axe '+(index+1));label.oninput=()=>{axis.label=label.value;save();drawRadar()};label.onchange=renderPowerStatsView;
const remove=mb('×',()=>{if(!window.confirm('Supprimer l’axe « '+axis.label+' » ?'))return;radar.axes.splice(index,1);characters().forEach(character=>{if(character.radar)delete character.radar[axis.id]});save();renderPowerStatsView()},'Supprimer cet axe');remove.disabled=radar.axes.length<=3;
row.append(label,remove);axesBox.append(row);
});
const editor=$('radarEditor');editor.innerHTML='';const character=selectedCharacter();
if(character){
const title=document.createElement('h3');title.textContent='Notes de '+(character.name||'Sans nom');editor.append(title);
const strengths=document.createElement('p');strengths.className='character-note';
const updateStrengths=()=>{strengths.textContent='Points forts : '+(radar.axes.map(axis=>[axis.label,radarValue(character,axis.id)]).filter(([,value])=>value>0).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([text,value])=>text+' ('+RADAR_GRADES[value]+')').join(' · ')||'aucune note')};
const grid=document.createElement('div');grid.className='radar-grades';
radar.axes.forEach(axis=>{const cell=document.createElement('label');cell.textContent=axis.label;const select=document.createElement('select');RADAR_GRADES.forEach((grade,value)=>{const option=document.createElement('option');option.value=value;option.textContent=grade;select.append(option)});select.value=radarValue(character,axis.id);select.onchange=()=>{(character.radar||(character.radar={}))[axis.id]=Number(select.value);save();drawRadar();updateStrengths()};cell.append(select);grid.append(cell)});
updateStrengths();editor.append(grid,strengths);
}
drawRadar();
}
function sequenceData(){return S.sequencer||(S.sequencer={templateId:'harmon',beats:[]})}
function sequenceScenes(){
ids();let number=0;
return S.blocks.filter(block=>block.t==='scene').map(block=>({id:block.id,label:(++number)+'. '+(block.x.trim()||'(sans titre)')}));
}
const SEQUENCE_DESCRIPTIONS={
harmon:'Huit étapes en cercle : le héros quitte sa zone de confort pour obtenir ce qu’il désire, en paie le prix, puis revient changé. Idéal pour les récits de transformation, en particulier les formats courts ou sériels.',
hero:'Douze étapes inspirées de Joseph Campbell et Christopher Vogler : appel de l’aventure, mentor, épreuves, épreuve suprême puis retour avec un « élixir ». Adapté aux grandes aventures initiatiques et à la fantasy.',
threeAct:'La structure classique du cinéma : mise en place, confrontation, résolution, reliées par deux tournants et un point médian. Une base simple et souple pour presque tous les scénarios.',
sevenPoint:'Sept jalons, de l’accroche à la résolution, qui permettent de construire l’histoire à rebours depuis son dernier point. Pratique pour vérifier que chaque tournant découle du précédent.',
eightSequences:'Le long métrage découpé en huit blocs d’environ quinze minutes, chacun avec sa propre question dramatique. Utile pour garder du rythme dans un scénario long.',
freytag:'Cinq temps, de l’exposition à la catastrophe ou la résolution, disposés en pyramide autour du climax. Adapté à la tragique, au théâtre et aux histoires ramassées.',
fifteenBeats:'Quinze temps très détaillés, avec une image d’ouverture et une image finale qui se répondent. Bien adaptés aux scénarios de long métrage qui demandent un minutage serré.',
kishotenketsu:'Quatre temps d’origine extrême-orientale : introduction, développement, tournant inattendu, conclusion. Le moteur n’est pas le conflit mais le contraste et la surprise ; convient aux histoires douces, courtes ou contemplatives.',
fichtean:'Une exposition brève suivie d’une chaîne de crises de plus en plus fortes jusqu’au climax. La tension monte dès les premières pages ; idéal pour les thrillers et les récits à fort rythme.',
mystery:'Structure d’enquête : un mystère est posé, des indices et des fausses pistes s’accumulent, puis une reconstitution révèle la vérité. Convient aux polars, à l’espionnage et aux intrigues à secrets.',
romance:'Neuf étapes qui suivent la rencontre de deux personnages, leur rapprochement, la crise qui les sépare, puis le choix qui décide de leur sort. Valable pour toute relation affective, heureuse ou non.',
davidGoliath:'Un combat très inégal où le plus faible l’emporte par la ruse, le terrain ou la détermination. L’enjeu est de faire sentir l’écart de puissance, puis de montrer la faille qui renverse la situation.',
duelEquilibre:'Un duel entre deux adversaires de force comparable, où l’avantage passe de l’un à l’autre. Chaque coup révèle un peu plus leur style et leur caractère, jusqu’à un choix tactique ou personnel qui tranche.',
combatEquilibre:'Une bataille ou un affrontement de groupe entre deux camps équivalents. La tension vient des plans, des contre-attaques, des pertes et d’un point de bascule qui décide de l’issue.'
};
function updateSequenceDescription(){
const box=$('sequenceDescription'),id=$('sequenceTemplate').value,template=SEQUENCE_TEMPLATES[id];
box.innerHTML='';box.hidden=!template;
if(!template)return;
const title=document.createElement('strong');title.textContent=template.name;
const text=document.createElement('p');text.textContent=SEQUENCE_DESCRIPTIONS[id]||'';
box.append(title,text);
}
function renderSequencer(){
const sequence=sequenceData(),templateSelect=$('sequenceTemplate');
if(!templateSelect.options.length){Object.entries(SEQUENCE_TEMPLATES).forEach(([id,template])=>{const option=document.createElement('option');option.value=id;option.textContent=template.name;templateSelect.append(option)})}
if(SEQUENCE_TEMPLATES[sequence.templateId])templateSelect.value=sequence.templateId;
updateSequenceDescription();
const scenes=sequenceScenes(),list=$('sequenceBeats');list.innerHTML='';
const linked=sequence.beats.filter(beat=>beat.sceneId&&scenes.some(scene=>scene.id===beat.sceneId)).length;
$('sequenceProgress').textContent=sequence.beats.length?sequence.beats.length+' étapes':'Aucune étape';
$('sequenceSceneCount').textContent=linked+' / '+sequence.beats.length+' reliées à une scène';
if(!sequence.beats.length){const empty=document.createElement('p');empty.className='em';empty.textContent='Choisis une structure puis charge son modèle pour commencer.';list.append(empty);return}
sequence.beats.forEach((beat,index)=>{
const article=document.createElement('article');article.className='sequence-beat';article.dataset.beatId=beat.id;
const heading=document.createElement('div');heading.className='sequence-beat-heading';
const number=document.createElement('span');number.className='sequence-beat-number';number.textContent=String(index+1).padStart(2,'0');
const title=document.createElement('input');title.className='sequence-beat-title';title.type='text';title.value=beat.title;title.setAttribute('aria-label','Titre de l’étape '+(index+1));title.oninput=()=>{beat.title=title.value;save()};
const actions=document.createElement('div');actions.className='sequence-beat-actions';
const up=mb('↑',()=>moveSequenceBeat(index,-1),'Monter cette étape');up.disabled=index===0;
const down=mb('↓',()=>moveSequenceBeat(index,1),'Descendre cette étape');down.disabled=index===sequence.beats.length-1;
const remove=mb('×',()=>{sequence.beats.splice(index,1);save();renderSequencer()},'Supprimer cette étape');
actions.append(up,down,remove);heading.append(number,title,actions);
const guide=document.createElement('p');guide.className='sequence-beat-guide';guide.textContent=beat.guide||'';
const details=document.createElement('textarea');details.className='sequence-beat-notes';details.value=beat.notes||'';details.rows=3;details.placeholder='Décris ce qui se passe dans cette étape…';details.setAttribute('aria-label','Notes de l’étape '+(index+1));details.oninput=()=>{beat.notes=details.value;save()};
const sceneSelect=document.createElement('select');sceneSelect.className='sequence-scene-select';sceneSelect.setAttribute('aria-label','Scène associée à l’étape '+(index+1));
const noScene=document.createElement('option');noScene.value='';noScene.textContent='Aucune scène liée';sceneSelect.append(noScene);
scenes.forEach(scene=>{const option=document.createElement('option');option.value=scene.id;option.textContent=scene.label;sceneSelect.append(option)});
sceneSelect.value=beat.sceneId||'';sceneSelect.onchange=()=>{beat.sceneId=sceneSelect.value;save();renderSequencer()};
article.append(heading);if(guide.textContent)article.append(guide);article.append(details,sceneSelect);list.append(article);
});
}
function moveSequenceBeat(index,direction){
const beats=sequenceData().beats,target=index+direction;if(target<0||target>=beats.length)return;
[beats[index],beats[target]]=[beats[target],beats[index]];save();renderSequencer();
}
function applySequenceTemplate(){
const templateId=$('sequenceTemplate').value,template=SEQUENCE_TEMPLATES[templateId];if(!template)return;
const sequence=sequenceData(),oldBeats=sequence.beats||[];
if(oldBeats.length&&!window.confirm('Charger ce modèle va remplacer la liste actuelle. Les notes des étapes portant le même titre seront conservées. Continuer ?'))return;
const previous=new Map(oldBeats.map(beat=>[beat.title,beat]));
sequence.templateId=templateId;
sequence.beats=template.beats.map(([title,guide])=>{const old=previous.get(title);return{id:old?.id||uid(),title,guide,notes:old?.notes||'',sceneId:old?.sceneId||''}});
save();renderSequencer();
}
function addSequenceBeat(){
const sequence=sequenceData(),number=sequence.beats.length+1;
sequence.beats.push({id:uid(),title:'Nouvelle étape '+number,guide:'',notes:'',sceneId:''});save();renderSequencer();
document.querySelector('.sequence-beat:last-child .sequence-beat-title')?.focus();
}
function timelineStore(){return S.timelines||(S.timelines=[])}
function activeTimeline(){return timelineStore().find(timeline=>timeline.id===S.activeTimelineId)}
function normalizeTimelinePositions(timeline){
const events=timeline.events||[],missing=events.some(event=>!Number.isFinite(Number(event.position)));
events.forEach((event,index)=>{if(!Number.isFinite(Number(event.position)))event.position=events.length<2?500:Math.round(index*1000/(events.length-1))});
return missing;
}
const CHART_COLORS=['#bd2635','#3b7dd8','#2f9e6b','#d4a017','#8e5bd1','#8a8a8a'];
function chartsStore(){
const charts=S.charts||(S.charts=[]);
if(!S.chartsMigrated){timelineStore().forEach(timeline=>{if(timeline.chart){charts.push({id:uid(),name:timeline.name||'Graphique',chart:timeline.chart});delete timeline.chart}});S.chartsMigrated=true}
return charts;
}
function activeChartHolder(){return chartsStore().find(item=>item.id===S.activeChartId)}
function axisLabel(label,unit){return unit?(label?label+' ('+unit+')':'('+unit+')'):label||''}
function renderChartsTab(){
const charts=chartsStore(),select=$('chartSelect');select.innerHTML='';
charts.forEach((item,index)=>{const option=document.createElement('option');option.value=item.id;option.textContent=item.name||'Graphique '+(index+1);select.append(option)});
if(!charts.some(item=>item.id===S.activeChartId))S.activeChartId=charts[0]?.id||'';
select.value=S.activeChartId||'';
const current=activeChartHolder();$('chartEmpty').hidden=!!current;$('chartEditor').hidden=!current;
if(!current)return;
$('chartName').value=current.name||'';
renderTimelineChart(current);
}
function chartData(timeline){
const chart=timeline.chart||(timeline.chart={title:'',xLabel:'Temps',yLabel:'Intensité'});
if(!Array.isArray(chart.series)){chart.series=[{id:uid(),name:'Courbe 1',color:chart.color||CHART_COLORS[0],curve:chart.curve||'smooth',area:!!chart.area,points:Array.isArray(chart.points)?chart.points:[]}];delete chart.points;delete chart.curve;delete chart.color;delete chart.area}
if(!chart.series.length)chart.series.push({id:uid(),name:'Courbe 1',color:CHART_COLORS[0],curve:'smooth',area:false,points:[]});
['xMin','yMin'].forEach(key=>{if(!Number.isFinite(chart[key]))chart[key]=0});['xMax','yMax'].forEach(key=>{if(!Number.isFinite(chart[key]))chart[key]=100});
if(typeof chart.xUnit!=='string')chart.xUnit='';if(typeof chart.yUnit!=='string')chart.yUnit='';
['xStep','yStep'].forEach(key=>{if(!(chart[key]>0))chart[key]=0});['xFormat','yFormat'].forEach(key=>{if(chart[key]!=='clock')chart[key]='number'});
if(chart.xMax<=chart.xMin)chart.xMax=chart.xMin+1;if(chart.yMax<=chart.yMin)chart.yMax=chart.yMin+1;
if(!chart.series.some(series=>series.id===chart.activeSeries))chart.activeSeries=chart.series[0].id;
return chart;
}
function activeChartSeries(chart){return chart.series.find(series=>series.id===chart.activeSeries)}
function chartCurvePath(points){
if(!points.length)return'';
let d='M'+points[0][0]+','+points[0][1];
for(let i=1;i<points.length;i++){
const style=points[i][2],p0=points[i-2]||points[i-1],p1=points[i-1],p2=points[i],p3=points[i+1]||p2;
if(style==='none')d+=' M'+p2[0]+','+p2[1];
else if(style==='step')d+=' H'+p2[0]+' V'+p2[1];
else if(style==='stepBefore')d+=' V'+p2[1]+' H'+p2[0];
else if(style==='easeIn')d+=' C'+(p1[0]+.42*(p2[0]-p1[0]))+','+p1[1]+' '+p2[0]+','+p2[1]+' '+p2[0]+','+p2[1];
else if(style==='easeOut')d+=' C'+p1[0]+','+p1[1]+' '+(p2[0]-.42*(p2[0]-p1[0]))+','+p2[1]+' '+p2[0]+','+p2[1];
else if(style==='sigmoid')d+=' C'+((p1[0]+p2[0])/2)+','+p1[1]+' '+((p1[0]+p2[0])/2)+','+p2[1]+' '+p2[0]+','+p2[1];
else if(style==='peak')d+=' L'+((p1[0]+p2[0])/2)+','+Math.min(p1[1],p2[1])+' L'+p2[0]+','+p2[1];
else if(style==='valley')d+=' L'+((p1[0]+p2[0])/2)+','+Math.max(p1[1],p2[1])+' L'+p2[0]+','+p2[1];
else if(style==='linear')d+=' L'+p2[0]+','+p2[1];
else d+=' C'+(p1[0]+(p2[0]-p0[0])/6)+','+(p1[1]+(p2[1]-p0[1])/6)+' '+(p2[0]-(p3[0]-p1[0])/6)+','+(p2[1]-(p3[1]-p1[1])/6)+' '+p2[0]+','+p2[1];
}
return d;
}
function chartPointLabel(point){
if(point.label)return point.label;if(!point.eventRef)return'';
const[timelineId,eventId]=point.eventRef.split(':');return timelineStore().find(timeline=>timeline.id===timelineId)?.events?.find(event=>event.id===eventId)?.title||'';
}
function chartTicks(min,max,step){
const span=max-min;
if(!(step>0)||span/step>100)return[0,1,2,3,4].map(i=>min+span*i/4);
const ticks=[];for(let i=0;min+i*step<=max+step*1e-9;i++)ticks.push(Math.round((min+i*step)*1e9)/1e9);return ticks;
}
const CHART_CLOCK_UNITS={s:1,min:60,h:3600};
function chartTickLabel(value,unit,format){
const factor=CHART_CLOCK_UNITS[unit];
if(format!=='clock'||!factor)return String(Math.round(value*100)/100);
const total=Math.round(Math.abs(value)*factor),h=Math.floor(total/3600),m=Math.floor(total%3600/60),s=total%60,pad=n=>String(n).padStart(2,'0');
return(value<0?'-':'')+(h?h+':'+pad(m)+':'+pad(s):m+':'+pad(s));
}
function drawTimelineChart(timeline){
const chart=chartData(timeline),svg=$('chartSvg'),L=60,R=20,Tp=40,B=56,W=800-L-R,H=340-Tp-B,xSpan=chart.xMax-chart.xMin,ySpan=chart.yMax-chart.yMin;
const px=x=>L+(x-chart.xMin)/xSpan*W,py=y=>Tp+(chart.yMax-y)/ySpan*H,fmt=v=>String(Math.round(v*100)/100);
let markup=`<defs><clipPath id="chartClip"><rect x="${L}" y="${Tp}" width="${W}" height="${H}"/></clipPath></defs><text class="chart-title" x="${L}" y="20">${htmlEscape(chart.title)}</text>`;
chartTicks(chart.yMin,chart.yMax,chart.yStep).forEach(yv=>{markup+=`<line x1="${L}" x2="${L+W}" y1="${py(yv)}" y2="${py(yv)}" stroke="#e2ded4"/><text x="${L-8}" y="${py(yv)+4}" text-anchor="end">${htmlEscape(chartTickLabel(yv,chart.yUnit,chart.yFormat))}</text>`});
chartTicks(chart.xMin,chart.xMax,chart.xStep).forEach(xv=>{markup+=`<line y1="${Tp}" y2="${Tp+H}" x1="${px(xv)}" x2="${px(xv)}" stroke="#efece4"/><text x="${px(xv)}" y="${Tp+H+16}" text-anchor="middle">${htmlEscape(chartTickLabel(xv,chart.xUnit,chart.xFormat))}</text>`});
markup+=`<line x1="${L}" x2="${L}" y1="${Tp}" y2="${Tp+H}" stroke="#77727a"/><line x1="${L}" x2="${L+W}" y1="${Tp+H}" y2="${Tp+H}" stroke="#77727a"/>`;
markup+=`<text x="${L+W/2}" y="${Tp+H+40}" text-anchor="middle">${htmlEscape(axisLabel(chart.xLabel,chart.xUnit))}</text><text transform="rotate(-90)" x="${-(Tp+H/2)}" y="16" text-anchor="middle">${htmlEscape(axisLabel(chart.yLabel,chart.yUnit))}</text>`;
const safeColor=series=>/^#[\da-f]{6}$/i.test(series.color)?series.color:CHART_COLORS[0];
markup+='<g clip-path="url(#chartClip)">';
chart.series.forEach(series=>{
const color=safeColor(series),sorted=[...series.points].sort((a,b)=>a.x-b.x),defaultStyle=series.curve==='points'?'none':series.curve,coords=sorted.map(point=>[px(point.x),py(point.y),point.segment||defaultStyle]);
if(coords.length>1){const path=chartCurvePath(coords);if(series.area)markup+=`<path d="${path} L${coords.at(-1)[0]},${Tp+H} L${coords[0][0]},${Tp+H} Z" fill="${color}" fill-opacity=".14"/>`;markup+=`<path d="${path}" fill="none" stroke="${color}" stroke-width="${series.id===chart.activeSeries?3.5:2.5}" stroke-linejoin="round"/>`}
sorted.forEach((point,index)=>{markup+=`<circle data-series="${htmlEscape(series.id)}" data-id="${htmlEscape(point.id)}" cx="${px(point.x)}" cy="${py(point.y)}" r="${series.id===chart.activeSeries?7:5}" fill="${color}" stroke="#fff" stroke-width="2"><title>${htmlEscape(series.name)} — ${htmlEscape(chartPointLabel(point)||'Point '+(index+1))} (${fmt(point.x)}${chart.xUnit?' '+htmlEscape(chart.xUnit):''} ; ${fmt(point.y)}${chart.yUnit?' '+htmlEscape(chart.yUnit):''})</title></circle>`;if(chartPointLabel(point))markup+=`<text x="${px(point.x)}" y="${py(point.y)-12}" text-anchor="middle">${htmlEscape(chartPointLabel(point))}</text>`});
});
markup+='</g>';
let legendX=L+W;[...chart.series].reverse().forEach(series=>{const width=Math.min(150,24+series.name.length*7);legendX-=width;markup+=`<rect x="${legendX}" y="12" width="12" height="12" rx="2" fill="${safeColor(series)}"/><text x="${legendX+17}" y="22">${htmlEscape(series.name)}</text>`});
svg.innerHTML=markup;
svg.querySelectorAll('circle').forEach(circle=>{circle.onpointerdown=event=>{
event.preventDefault();const series=chart.series.find(item=>item.id===circle.dataset.series),point=series?.points.find(item=>item.id===circle.dataset.id);if(!point)return;
chart.activeSeries=series.id;const rect=svg.getBoundingClientRect(),snap=span=>span<=20?10:1,round=(v,span)=>Math.round(v*snap(span))/snap(span);
drag(move=>{const x=(move.clientX-rect.left)/rect.width*800,y=(move.clientY-rect.top)/rect.height*340;point.x=Math.max(chart.xMin,Math.min(chart.xMax,round(chart.xMin+(x-L)/W*xSpan,xSpan)));point.y=Math.max(chart.yMin,Math.min(chart.yMax,round(chart.yMax-(y-Tp)/H*ySpan,ySpan)));drawTimelineChart(timeline)},()=>{save();renderTimelineChart(timeline)});
}});
}
function renderTimelineChart(timeline){
const chart=chartData(timeline),series=activeChartSeries(chart);
$('chartTitle').value=chart.title||'';$('chartXLabel').value=chart.xLabel||'';$('chartYLabel').value=chart.yLabel||'';$('chartXUnit').value=chart.xUnit;$('chartYUnit').value=chart.yUnit;$('chartXStep').value=chart.xStep||'';$('chartYStep').value=chart.yStep||'';$('chartXFormat').value=chart.xFormat;$('chartYFormat').value=chart.yFormat;$('chartXMin').value=chart.xMin;$('chartXMax').value=chart.xMax;$('chartYMin').value=chart.yMin;$('chartYMax').value=chart.yMax;
const select=$('chartSeries');select.innerHTML='';chart.series.forEach(item=>{const option=document.createElement('option');option.value=item.id;option.textContent=item.name||'Courbe';select.append(option)});select.value=series.id;
$('chartSeriesName').value=series.name;$('chartCurve').value=series.curve;$('chartColor').value=/^#[\da-f]{6}$/i.test(series.color)?series.color:CHART_COLORS[0];$('chartArea').checked=!!series.area;$('deleteChartSeries').disabled=chart.series.length<2;
const list=$('chartPoints');list.innerHTML='';
series.points.forEach((point,index)=>{
const row=document.createElement('div');row.className='chart-row';
const number=document.createElement('span');number.textContent=String(index+1).padStart(2,'0');
const label=document.createElement('input');label.type='text';label.value=point.label||'';label.placeholder='Instant ou événement';label.setAttribute('aria-label','Nom du point '+(index+1));label.oninput=()=>{point.label=label.value;save();drawTimelineChart(timeline)};
const num=(key,name,min,max)=>{const input=document.createElement('input');input.type='number';input.step='any';input.value=point[key];input.title=name;input.setAttribute('aria-label',name+' du point '+(index+1));input.onchange=()=>{point[key]=Math.max(chart[min],Math.min(chart[max],Number(input.value)||chart[min]));input.value=point[key];save();drawTimelineChart(timeline)};return input};
const remove=mb('×',()=>{series.points.splice(index,1);save();renderTimelineChart(timeline)},'Supprimer ce point');
const segment=document.createElement('select');segment.title='Allure du segment qui arrive à ce point (depuis le point précédent sur l’axe X)';segment.setAttribute('aria-label','Allure du segment vers le point '+(index+1));
[['','Allure de la courbe'],['smooth','Lissée'],['linear','Droite'],['step','Escalier'],['stepBefore','Escalier inversé'],['easeIn','Démarrage lent'],['easeOut','Arrivée douce'],['sigmoid','Courbe en S'],['peak','Pic'],['valley','Creux'],['none','Aucun trait']].forEach(([value,text])=>{const option=document.createElement('option');option.value=value;option.textContent=text;segment.append(option)});
segment.value=point.segment||'';segment.onchange=()=>{if(segment.value)point.segment=segment.value;else delete point.segment;save();drawTimelineChart(timeline)};
const link=document.createElement('select');link.title='Événement de la chronologie lié à ce point';link.setAttribute('aria-label','Événement lié au point '+(index+1));
const noLink=document.createElement('option');noLink.value='';noLink.textContent='Aucun événement lié';link.append(noLink);
timelineStore().forEach(item=>(item.events||[]).forEach(ev=>{const option=document.createElement('option');option.value=item.id+':'+ev.id;option.textContent=(item.name||'Frise')+' › '+(ev.title||'Événement');link.append(option)}));
link.value=point.eventRef||'';
link.onchange=()=>{if(link.value)point.eventRef=link.value;else delete point.eventRef;if(link.value&&!point.label){point.label=chartPointLabel(point);label.value=point.label}save();drawTimelineChart(timeline)};
row.append(number,label,num('x','Abscisse','xMin','xMax'),num('y','Ordonnée','yMin','yMax'),segment,link,remove);list.append(row);
});
drawTimelineChart(timeline);
}
const timelineUI={filter:{character:'',location:'',color:''},expanded:new Set()};
const timelineHistory={};
function timelineScale(timeline){
const scale=timeline.scale||(timeline.scale={unit:'',min:0,max:100,format:'number'});
if(!Number.isFinite(scale.min))scale.min=0;if(!Number.isFinite(scale.max))scale.max=100;if(scale.max<=scale.min)scale.max=scale.min+1;
if(scale.format!=='clock')scale.format='number';if(typeof scale.unit!=='string')scale.unit='';
return scale;
}
function positionToValue(timeline,position){const scale=timelineScale(timeline);return scale.min+position/1000*(scale.max-scale.min)}
function valueToPosition(timeline,value){const scale=timelineScale(timeline);return Math.max(0,Math.min(1000,Math.round((value-scale.min)/(scale.max-scale.min)*1000)))}
function scaleTickLabel(timeline,position){const scale=timelineScale(timeline),text=chartTickLabel(positionToValue(timeline,position),scale.unit,scale.format);return scale.format==='clock'&&CHART_CLOCK_UNITS[scale.unit]?text:text+' '+scale.unit}
function snapPosition(timeline,position){const step=Number(timeline.snap)||0;return step?Math.max(0,Math.min(1000,Math.round(position/step)*step)):position}
function timelinePositions(timeline){
const events=timeline.events;
if(timeline.mode!=='narrative')return events.map(event=>Number(event.position));
const sceneIndex=new Map(sequenceScenes().map((scene,index)=>[scene.id,index])),result=[];
events.map((event,index)=>({index,key:sceneIndex.has(event.sceneId)?sceneIndex.get(event.sceneId):1e6+index})).sort((a,b)=>a.key-b.key).forEach((item,rank)=>{result[item.index]=events.length<2?500:Math.round(rank*1000/(events.length-1))});
return result;
}
function timelineEventMatches(event){const filter=timelineUI.filter;return(!filter.character||(event.characterIds||[]).includes(filter.character))&&(!filter.location||event.locationId===filter.location)&&(!filter.color||(event.color||'#bd2635')===filter.color)}
function timelineHistoryState(){return timelineHistory[activeProjectId]||(timelineHistory[activeProjectId]={undo:[],redo:[],last:null,pending:null,timer:0})}
function updateTimelineHistoryButtons(){const state=timelineHistoryState();$('tlUndo').disabled=!(state.undo.length||state.pending!==null);$('tlRedo').disabled=!state.redo.length}
function flushTimelineHistory(){const state=timelineHistoryState();clearTimeout(state.timer);if(state.pending!==null){state.undo.push(state.pending);if(state.undo.length>80)state.undo.shift();state.pending=null}updateTimelineHistoryButtons()}
function recordTimelineHistory(){
const state=timelineHistoryState(),now=JSON.stringify(S.timelines||[]);
if(state.last===null){state.last=now;return}
if(now===state.last)return;
if(state.pending===null)state.pending=state.last;
state.last=now;state.redo.length=0;clearTimeout(state.timer);state.timer=setTimeout(flushTimelineHistory,700);updateTimelineHistoryButtons();
}
function restoreTimelines(direction){
flushTimelineHistory();const state=timelineHistoryState(),from=direction<0?state.undo:state.redo,to=direction<0?state.redo:state.undo,snapshot=from.pop();
if(snapshot===undefined)return;
to.push(JSON.stringify(S.timelines||[]));S.timelines=JSON.parse(snapshot);state.last=snapshot;save();renderTimeline();
}
function generateTimelineFromScenes(){
const timeline=activeTimeline();if(!timeline)return;
ids();const scenes=S.blocks.filter(block=>block.t==='scene'),linked=new Set(timeline.events.map(event=>event.sceneId).filter(Boolean)),todo=scenes.filter(block=>!linked.has(block.id));
if(!todo.length){$('saveStatus').textContent='Toutes les scènes ont déjà un événement dans cette frise';return}
todo.forEach(block=>{
const sceneNumber=scenes.indexOf(block),start=S.blocks.indexOf(block),speakers=new Set();
for(let i=start+1;i<S.blocks.length&&S.blocks[i].t!=='scene';i++)if(S.blocks[i].t==='char'&&S.blocks[i].x.trim())speakers.add(normalizeLabel(cn(S.blocks[i].x)));
const found=sluglineLocation(block.x),place=found&&locations().find(item=>normalizeLabel(item.name)===normalizeLabel(found.name));
timeline.events.push({id:uid(),position:scenes.length<2?500:Math.round(sceneNumber*1000/(scenes.length-1)),time:'',title:block.x.trim()||'Scène '+(sceneNumber+1),description:'',sceneId:block.id,locationId:place?.id||'',characterIds:characters().filter(character=>speakers.has(normalizeLabel(character.name))).map(character=>character.id),minorEvents:[]});
});
timeline.events.sort((a,b)=>a.position-b.position);save();renderTimeline();
$('saveStatus').textContent=todo.length+' événement'+(todo.length>1?'s':'')+' généré'+(todo.length>1?'s':'')+' depuis les scènes';
}
function exportTimelineSvg(){
const timeline=activeTimeline(),canvas=document.querySelector('#timelineTrack .timeline-canvas');
if(!timeline||!canvas){window.alert('Ajoute d’abord un événement à la frise.');return}
const origin=canvas.getBoundingClientRect(),rel=el=>{const r=el.getBoundingClientRect();return{x:r.left-origin.left,y:r.top-origin.top,w:r.width,h:r.height}};
const width=Math.round(origin.width),height=Math.round(origin.height),rulerBox=rel(canvas.querySelector('.timeline-ruler'));
let body=`<rect width="${width}" height="${height}" fill="#f7f4ee"/><text x="12" y="16" font-size="14" font-weight="700" fill="#28252a">${htmlEscape(timeline.name||'Frise')}</text>`;
canvas.querySelectorAll('.timeline-period').forEach(band=>{const r=rel(band),color=band.style.getPropertyValue('--period-color')||'#0e7490';body+=`<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${htmlEscape(color)}" fill-opacity=".25"/><text x="${r.x+4}" y="${r.y+r.h-6}" font-size="10" fill="#28252a">${htmlEscape(band.textContent)}</text>`});
body+=`<line x1="36" x2="${width-36}" y1="${rulerBox.y+20}" y2="${rulerBox.y+20}" stroke="#bd2635" stroke-width="3"/>`;
canvas.querySelectorAll('.timeline-tick').forEach(tick=>{const r=rel(tick);body+=`<text x="${r.x}" y="${rulerBox.y+44}" font-size="10" text-anchor="middle" fill="#756f64">${htmlEscape(tick.textContent)}</text>`});
canvas.querySelectorAll('.timeline-marker').forEach(marker=>{const r=rel(marker);body+=`<circle cx="${r.x+r.w/2}" cy="${r.y+r.h/2}" r="13" fill="${htmlEscape(marker.style.backgroundColor||'#bd2635')}"/><text x="${r.x+r.w/2}" y="${r.y+r.h/2+3}" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">${htmlEscape(marker.textContent)}</text>`});
canvas.querySelectorAll('.timeline-event').forEach((card,index)=>{
const event=timeline.events[index];if(!event)return;
const r=rel(card),limit=Math.max(12,Math.floor(r.w/6.5)-2),color=event.color||'#bd2635',lines=[...reportBoardLines(event.title||'',limit,2).map(text=>({text,bold:true})),...reportBoardLines(event.description||'',limit,5).map(text=>({text}))];
body+=`<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="#fffdf8" stroke="#d6d0c3"/><rect x="${r.x}" y="${r.y}" width="${r.w}" height="3" fill="${htmlEscape(color)}"/>`;
if(event.time)body+=`<text x="${r.x+10}" y="${r.y+18}" font-size="10" fill="${htmlEscape(color)}">${htmlEscape(event.time)}</text>`;
lines.forEach((line,row)=>{body+=`<text x="${r.x+10}" y="${r.y+36+row*14}" font-size="${line.bold?12:11}" font-weight="${line.bold?700:400}" fill="#28252a">${htmlEscape(line.text)}</text>`});
});
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="Arial,sans-serif">${body}</svg>`,url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'})),link=document.createElement('a');
link.href=url;link.download=((timeline.name||'frise').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'frise')+'.svg';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function renderTimelineTools(timeline){
const scale=timelineScale(timeline),zoom=Math.max(1,Math.min(6,Number(timeline.zoom)||1));
$('tlMode').value=timeline.mode==='narrative'?'narrative':'story';$('tlZoomLabel').textContent=Math.round(zoom*100)+' %';$('tlSnap').value=String(Number(timeline.snap)||0);$('tlCompact').checked=!!timeline.compact;
$('tlUnit').value=scale.unit;$('tlMin').value=scale.min;$('tlMax').value=scale.max;$('tlFormat').value=scale.format;
const fill=(id,first,items,selected)=>{const select=$(id);select.innerHTML='';const all=document.createElement('option');all.value='';all.textContent=first;select.append(all);items.forEach(([value,text])=>{const option=document.createElement('option');option.value=value;option.textContent=text;select.append(option)});select.value=items.some(([value])=>value===selected)?selected:'';return select.value};
timelineUI.filter.character=fill('tlFilterChar','Tous',characters().map(item=>[item.id,item.name||'Sans nom']),timelineUI.filter.character);
timelineUI.filter.location=fill('tlFilterLoc','Tous',locations().map(item=>[item.id,item.name||'Sans nom']),timelineUI.filter.location);
timelineUI.filter.color=fill('tlFilterColor','Toutes',[...new Set(timeline.events.map(event=>event.color||'#bd2635'))].map(color=>[color,color]),timelineUI.filter.color);
[...$('tlFilterColor').options].forEach(option=>{if(option.value)option.style.color=option.value});
const scaleOn=!!scale.unit,toDisplay=position=>scaleOn?Math.round(positionToValue(timeline,position)*100)/100:Math.round(position)/10,fromDisplay=value=>scaleOn?valueToPosition(timeline,value):Math.max(0,Math.min(1000,Math.round(value*10)));
const list=$('tlPeriods');list.innerHTML='';timeline.periods=timeline.periods||[];
timeline.periods.forEach(period=>{
const row=document.createElement('div');row.className='tl-period-row';
const label=document.createElement('input');label.type='text';label.value=period.label||'';label.placeholder='Nom de la période';label.setAttribute('aria-label','Nom de la période');label.oninput=()=>{period.label=label.value;save()};label.onchange=()=>renderTimeline();
const bound=(key,name)=>{const input=document.createElement('input');input.type='number';input.step='any';input.value=toDisplay(period[key]);input.title=name+(scaleOn?' ('+scale.unit+')':' (%)');input.setAttribute('aria-label',name+' de la période');input.onchange=()=>{period[key]=fromDisplay(Number(input.value)||0);if(period.end<period.start)[period.start,period.end]=[period.end,period.start];save();renderTimeline()};return input};
const color=document.createElement('input');color.type='color';color.value=period.color||'#0e7490';color.setAttribute('aria-label','Couleur de la période');color.onchange=()=>{period.color=color.value;save();renderTimeline()};
const remove=mb('×',()=>{timeline.periods=timeline.periods.filter(item=>item.id!==period.id);save();renderTimeline()},'Supprimer la période');
row.append(label,bound('start','Début'),bound('end','Fin'),color,remove);list.append(row);
});
updateTimelineHistoryButtons();
}
function renderTimeline(){
const timelines=timelineStore(),select=$('timelineSelect');select.innerHTML='';
timelines.forEach((timeline,index)=>{const option=document.createElement('option');option.value=timeline.id;option.textContent=timeline.name||'Frise '+(index+1);select.append(option)});
if(!timelines.some(timeline=>timeline.id===S.activeTimelineId))S.activeTimelineId=timelines[0]?.id||'';
select.value=S.activeTimelineId||'';
const current=activeTimeline();$('timelineEmpty').hidden=!!current;$('timelineEditor').hidden=!current;
if(!current)return;
current.events=current.events||[];$('timelineName').value=current.name||'';
if(!timelineHistoryState().last)timelineHistoryState().last=JSON.stringify(S.timelines||[]);
if(normalizeTimelinePositions(current))save();
renderTimelineTools(current);
const scenes=sequenceScenes(),linked=current.events.filter(event=>event.sceneId&&scenes.some(scene=>scene.id===event.sceneId)).length;
$('timelineSummary').textContent=current.events.length+' événement'+(current.events.length===1?'':'s')+' · '+linked+' lié'+(linked===1?'':'s')+' à une scène';
const track=$('timelineTrack'),keepScroll=track.scrollLeft;track.innerHTML='';
if(!current.events.length){const empty=document.createElement('p');empty.className='em';empty.textContent='Ajoute un événement pour commencer la frise.';track.append(empty);return}
const canvas=document.createElement('div');canvas.className='timeline-canvas';
const ruler=document.createElement('div');ruler.className='timeline-ruler';
const zoom=Math.max(1,Math.min(6,Number(current.zoom)||1)),scaleOn=!!timelineScale(current).unit,narrative=current.mode==='narrative',positions=timelinePositions(current),canvasWidth=Math.max(320,track.clientWidth)*zoom,endInset=Math.min(36,canvasWidth*.06),cardWidth=Math.min(270,Math.max(210,canvasWidth*.38)),positionRange=canvasWidth-cardWidth-endInset*2;canvas.style.width=canvasWidth+'px';canvas.classList.toggle('compact',!!current.compact);
(scaleOn?[0,250,500,750,1000].map(position=>scaleTickLabel(current,position)):['Début','25 %','50 %','75 %','Fin']).forEach((label,index)=>{const tick=document.createElement('span');tick.className='timeline-tick';tick.style.left=(endInset+cardWidth/2+index*positionRange/4)+'px';const text=document.createElement('span');text.textContent=label;tick.append(text);ruler.append(tick)});
const eventLayer=document.createElement('div');eventLayer.className='timeline-event-layer';
ruler.title='Clique sur la frise pour ajouter un événement à cet endroit';ruler.style.cursor='crosshair';
ruler.onclick=click=>{
if(click.target.closest('.timeline-marker')||narrative)return;
const rect=ruler.getBoundingClientRect(),minX=endInset+cardWidth/2,maxX=rect.width-endInset-cardWidth/2,localX=Math.max(minX,Math.min(maxX,click.clientX-rect.left));
const created={id:uid(),position:snapPosition(current,Math.round((localX-minX)/Math.max(1,maxX-minX)*1000)),time:'',title:'Nouvel événement',description:'',sceneId:'',minorEvents:[]};
current.events.push(created);current.events.sort((a,b)=>a.position-b.position);save();renderTimeline();
document.querySelectorAll('.timeline-event')[current.events.indexOf(created)]?.querySelector('.timeline-event-title')?.focus();
};
const startDrag=(e,event,marker)=>{
if(narrative)return;
e.preventDefault();const rect=ruler.getBoundingClientRect();
const move=ev=>{const width=ruler.clientWidth,localX=Math.max(endInset+cardWidth/2,Math.min(width-endInset-cardWidth/2,ev.clientX-rect.left));event.position=snapPosition(current,Math.round((localX-endInset-cardWidth/2)/Math.max(1,width-cardWidth-endInset*2)*1000));marker.style.left=(endInset+cardWidth/2+event.position/1000*positionRange)+'px';marker.title='Position '+event.position+' / 1000'};
const finish=()=>{removeEventListener('pointermove',move);removeEventListener('pointerup',finish);removeEventListener('pointercancel',finish);current.events.sort((a,b)=>a.position-b.position);save();renderTimeline()};
addEventListener('pointermove',move);addEventListener('pointerup',finish,{once:true});addEventListener('pointercancel',finish,{once:true});
};
current.events.forEach((event,index)=>{
event.minorEvents=event.minorEvents||[];event.minorEvents.forEach((minor,minorIndex)=>{if(!Number.isFinite(Number(minor.position)))minor.position=event.minorEvents.length<2?50:Math.round(minorIndex*100/(event.minorEvents.length-1))});
const marker=document.createElement('button');marker.type='button';marker.className='timeline-marker';marker.textContent=String(index+1).padStart(2,'0');marker.title='Glisse le point pour éloigner ou rapprocher cet événement';marker.setAttribute('aria-label','Déplacer le point de '+(event.title||'l’événement'));
marker.style.backgroundColor=event.color||'#bd2635';marker.classList.toggle('dimmed',!timelineEventMatches(event));
const eventX=endInset+cardWidth/2+(Number(positions[index])/1000)*positionRange;
marker.style.left=eventX+'px';marker.dataset.eventId=event.id;ruler.append(marker);
marker.onpointerdown=e=>{marker.setPointerCapture?.(e.pointerId);startDrag(e,event,marker)};
const card=document.createElement('article');card.className='timeline-event'+(timelineUI.expanded.has(event.id)?' expanded':'')+(timelineEventMatches(event)?'':' dimmed');card.style.setProperty('--event-color',event.color||'#bd2635');
card.onclick=click=>{if(!current.compact||click.target.closest('input,textarea,select,button,.timeline-grip'))return;if(timelineUI.expanded.has(event.id))timelineUI.expanded.delete(event.id);else timelineUI.expanded.add(event.id);card.classList.toggle('expanded')};
const order=document.createElement('div');order.className='timeline-event-order';
const earlier=mb('←',()=>moveTimelineEvent(index,-1),'Déplacer vers le début');earlier.disabled=index===0;
const later=mb('→',()=>moveTimelineEvent(index,1),'Déplacer vers la fin');later.disabled=index===current.events.length-1;
const color=document.createElement('input');color.type='color';color.className='timeline-event-color';color.value=event.color||'#bd2635';color.title='Couleur de cet événement';color.setAttribute('aria-label','Couleur de l’événement '+(index+1));color.oninput=()=>{event.color=color.value;card.style.setProperty('--event-color',event.color);marker.style.backgroundColor=event.color;save()};
const remove=mb('×',()=>{current.events.splice(index,1);save();renderTimeline()},'Supprimer cet événement');
const duplicate=mb('⧉',()=>{const copy=clone(event);copy.id=uid();copy.position=Math.min(1000,Number(event.position)+30);copy.title=(event.title||'')+' (copie)';copy.minorEvents=(copy.minorEvents||[]).map(minor=>({...minor,id:uid()}));current.events.splice(index+1,0,copy);current.events.sort((a,b)=>a.position-b.position);save();renderTimeline()},'Dupliquer cet événement');
const grip=document.createElement('span');grip.className='timeline-grip';grip.textContent='⠿';grip.title='Glisser pour déplacer l’événement sur la frise';grip.onpointerdown=e=>startDrag(e,event,marker);
order.append(grip,earlier,later,duplicate,color,remove);
const time=document.createElement('input');time.type='text';time.className='timeline-time';time.value=event.time||'';time.placeholder='Quand ?';time.setAttribute('aria-label','Repère temporel de l’événement '+(index+1));time.oninput=()=>{event.time=time.value;save()};
const title=document.createElement('input');title.type='text';title.className='timeline-event-title';title.value=event.title||'';title.placeholder='Titre de l’événement';title.setAttribute('aria-label','Titre de l’événement '+(index+1));title.oninput=()=>{event.title=title.value;save()};
const description=document.createElement('textarea');description.className='timeline-event-description';description.value=event.description||'';description.rows=4;description.placeholder='Que se passe-t-il ?';description.setAttribute('aria-label','Description de l’événement '+(index+1));description.oninput=()=>{event.description=description.value;save()};
const sceneRow=document.createElement('div');sceneRow.className='timeline-scene-row';
const sceneSelect=document.createElement('select');sceneSelect.setAttribute('aria-label','Scène liée à l’événement '+(index+1));
const noScene=document.createElement('option');noScene.value='';noScene.textContent='Aucune scène liée';sceneSelect.append(noScene);
scenes.forEach(scene=>{const option=document.createElement('option');option.value=scene.id;option.textContent=scene.label;sceneSelect.append(option)});
sceneSelect.value=event.sceneId||'';sceneSelect.onchange=()=>{event.sceneId=sceneSelect.value;save();renderTimeline()};sceneRow.append(sceneSelect);
if(event.sceneId&&scenes.some(scene=>scene.id===event.sceneId)){const open=mb('Ouvrir la scène',()=>{const blockIndex=S.blocks.findIndex(block=>block.id===event.sceneId);if(blockIndex>=0){setView('w');foc(blockIndex,0)}},'Ouvrir cette scène dans l’éditeur');sceneRow.append(open)}
const minorSection=document.createElement('section');minorSection.className='timeline-minors';
const minorHeading=document.createElement('div');minorHeading.className='timeline-minors-heading';const minorLabel=document.createElement('strong');minorLabel.textContent='Événements mineurs';
const addMinor=mb('+',()=>{event.minorEvents.push({id:uid(),position:50,title:'Nouvel événement mineur',description:''});save();renderTimeline()},'Ajouter un événement mineur');minorHeading.append(minorLabel,addMinor);minorSection.append(minorHeading);
event.minorEvents.forEach((minor,minorIndex)=>{
const minorRow=document.createElement('div');minorRow.className='timeline-minor';
const minorMarker=document.createElement('span');minorMarker.className='timeline-minor-marker';minorMarker.style.left=minor.position+'%';
const range=document.createElement('input');range.type='range';range.min='0';range.max='100';range.value=minor.position;range.className='timeline-minor-range';range.setAttribute('aria-label','Position de l’événement mineur');range.oninput=()=>{minor.position=Number(range.value);minorMarker.style.left=minor.position+'%';minorTime.value=minor.position+' %';save()};
const minorTime=document.createElement('span');minorTime.className='timeline-minor-time';minorTime.textContent=minor.position+' %';
const minorTitle=document.createElement('input');minorTitle.type='text';minorTitle.value=minor.title;minorTitle.placeholder='Événement mineur';minorTitle.setAttribute('aria-label','Titre de l’événement mineur');minorTitle.oninput=()=>{minor.title=minorTitle.value;save()};
const minorDescription=document.createElement('input');minorDescription.type='text';minorDescription.value=minor.description||'';minorDescription.placeholder='Détail (facultatif)';minorDescription.setAttribute('aria-label','Détail de l’événement mineur');minorDescription.oninput=()=>{minor.description=minorDescription.value;save()};
const removeMinor=mb('×',()=>{event.minorEvents.splice(minorIndex,1);save();renderTimeline()},'Supprimer l’événement mineur');
const mover=document.createElement('select');mover.className='timeline-minor-move';mover.title='Déplacer vers un autre événement';mover.setAttribute('aria-label','Déplacer l’événement mineur');
const keepHere=document.createElement('option');keepHere.value='';keepHere.textContent='⇄';mover.append(keepHere);
current.events.forEach(other=>{if(other.id===event.id)return;const option=document.createElement('option');option.value=other.id;option.textContent=other.title||'Événement';mover.append(option)});
mover.onchange=()=>{const target=current.events.find(other=>other.id===mover.value);if(!target)return;event.minorEvents.splice(minorIndex,1);(target.minorEvents||(target.minorEvents=[])).push(minor);save();renderTimeline()};
minorRow.append(minorMarker,range,minorTime,minorTitle,minorDescription,...(current.events.length>1?[mover]:[]),removeMinor);minorSection.append(minorRow);
});
const meta=document.createElement('div');meta.className='timeline-meta';
const placeSelect=document.createElement('select');placeSelect.setAttribute('aria-label','Lieu de l’événement '+(index+1));
const noPlace=document.createElement('option');noPlace.value='';noPlace.textContent='Aucun lieu';placeSelect.append(noPlace);
locations().forEach(place=>{const option=document.createElement('option');option.value=place.id;option.textContent=place.name||'Sans nom';placeSelect.append(option)});
placeSelect.value=event.locationId||'';placeSelect.onchange=()=>{event.locationId=placeSelect.value;save();renderTimeline()};
const people=document.createElement('div');people.className='timeline-people';
(event.characterIds||[]).forEach(characterId=>{const person=characters().find(item=>item.id===characterId);if(!person)return;const chip=document.createElement('span');chip.className='timeline-chip';chip.textContent=person.name||'Sans nom';chip.append(mb('×',()=>{event.characterIds=event.characterIds.filter(id=>id!==characterId);save();renderTimeline()},'Retirer ce personnage'));people.append(chip)});
const addPerson=document.createElement('select');addPerson.setAttribute('aria-label','Ajouter un personnage à l’événement '+(index+1));
const addLabel=document.createElement('option');addLabel.value='';addLabel.textContent='+ Personnage';addPerson.append(addLabel);
characters().filter(item=>!(event.characterIds||[]).includes(item.id)).forEach(item=>{const option=document.createElement('option');option.value=item.id;option.textContent=item.name||'Sans nom';addPerson.append(option)});
addPerson.onchange=()=>{if(!addPerson.value)return;(event.characterIds||(event.characterIds=[])).push(addPerson.value);save();renderTimeline()};
meta.append(placeSelect,people,addPerson);
const extras=[];
if(scaleOn){const valueInput=document.createElement('input');valueInput.type='number';valueInput.step='any';valueInput.className='timeline-value';valueInput.value=Math.round(positionToValue(current,Number(event.position))*100)/100;valueInput.title='Position sur l’échelle ('+timelineScale(current).unit+')';valueInput.disabled=narrative;valueInput.setAttribute('aria-label','Valeur sur l’échelle de l’événement '+(index+1));valueInput.onchange=()=>{event.position=snapPosition(current,valueToPosition(current,Number(valueInput.value)||0));current.events.sort((a,b)=>a.position-b.position);save();renderTimeline()};extras.push(valueInput)}
card.append(order,time,...extras,title,description,sceneRow,meta,minorSection);eventLayer.append(card);
});
canvas.append(ruler,eventLayer);
if(!narrative&&(current.periods||[]).length){const strip=document.createElement('div');strip.className='timeline-periods';current.periods.forEach(period=>{const x1=endInset+cardWidth/2+period.start/1000*positionRange,x2=endInset+cardWidth/2+period.end/1000*positionRange,band=document.createElement('div');band.className='timeline-period';band.style.left=x1+'px';band.style.width=Math.max(4,x2-x1)+'px';band.style.setProperty('--period-color',period.color||'#0e7490');band.textContent=period.label||'';band.title=period.label||'Période';strip.append(band)});canvas.append(strip)}
track.append(canvas);track.scrollLeft=keepScroll;
layoutTimelineCards(canvas,positions,canvasWidth,cardWidth,endInset);
}
let timelineLayoutObserver=null;
function layoutTimelineCards(canvas,events,canvasWidth,cardWidth,endInset){
const positionRange=canvasWidth-cardWidth-endInset*2,gap=18;
const cards=[...canvas.querySelectorAll('.timeline-event')].map((card,index)=>({card,x:endInset+cardWidth/2+(Number(events[index])/1000)*positionRange})).sort((a,b)=>a.x-b.x);
const place=()=>{
const lanes=[];
cards.forEach(item=>{const left=item.x-cardWidth/2;item.card.style.width=cardWidth+'px';item.card.style.left=left+'px';
let lane=lanes.find(candidate=>left>=candidate.right+gap);
if(!lane){lane={right:-Infinity,height:0,top:0};lanes.push(lane)}
item.lane=lane;lane.right=left+cardWidth;lane.height=Math.max(lane.height,item.card.offsetHeight);
});
let top=96;lanes.forEach(lane=>{lane.top=top;top+=lane.height+gap});
cards.forEach(item=>{item.card.style.top=item.lane.top+'px'});
canvas.style.height=Math.max(400,top+12)+'px';
};
place();
timelineLayoutObserver?.disconnect();
if(window.ResizeObserver){let frame=0;timelineLayoutObserver=new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(place)});cards.forEach(item=>timelineLayoutObserver.observe(item.card))}
}
function addTimeline(){
const timelines=timelineStore(),timeline={id:uid(),name:'Nouvelle frise '+(timelines.length+1),events:[]};
timelines.push(timeline);S.activeTimelineId=timeline.id;save();renderTimeline();$('timelineName').focus();$('timelineName').select();
}
function addTimelineEvent(){
const timeline=activeTimeline();if(!timeline)return;
const previous=timeline.events.at(-1),position=previous?Math.min(1000,Number(previous.position||0)+Math.max(80,1000/(timeline.events.length+1))):0;
timeline.events.push({id:uid(),position,time:'',title:'Nouvel événement',description:'',sceneId:'',minorEvents:[]});save();renderTimeline();
document.querySelector('.timeline-event:last-child .timeline-event-title')?.focus();
}
function moveTimelineEvent(index,direction){
const events=activeTimeline()?.events,target=index+direction;if(!events||target<0||target>=events.length)return;
[events[index],events[target]]=[events[target],events[index]];
[events[index].position,events[target].position]=[events[target].position,events[index].position];save();renderTimeline();
}
function storyboardData(){return S.storyboard||(S.storyboard={shots:[],activeShotId:''})}
function storyboardShots(){return storyboardData().shots}
function shotDuration(shot){const duration=Number(shot.duration);return Number.isFinite(duration)&&duration>0?duration:3}
function storyboardTotalDuration(){return storyboardShots().reduce((total,shot)=>total+shotDuration(shot),0)}
let animaticTimer=null,animaticElapsed=0,animaticStartedAt=0,animaticBaseElapsed=0;
let storyboardAudioDbPromise=null,storyboardAudioUrl='',storyboardAudioProjectId='',storyboardAudioLoadToken=0,storyboardAudioLoaded=false;
function openStoryboardAudioDb(){
if(storyboardAudioDbPromise)return storyboardAudioDbPromise;
storyboardAudioDbPromise=new Promise((resolve,reject)=>{
const request=indexedDB.open('scenario-editor-storyboard-audio',1);
request.onupgradeneeded=()=>request.result.createObjectStore('audio');
request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);
});return storyboardAudioDbPromise;
}
function storyboardAudioKey(projectId=activeProjectId){return projectId+':storyboard-background'}
async function storeStoryboardAudio(blob,projectId=activeProjectId){
const db=await openStoryboardAudioDb();return new Promise((resolve,reject)=>{const request=db.transaction('audio','readwrite').objectStore('audio').put(blob,storyboardAudioKey(projectId));request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error)});
}
async function getStoryboardAudio(projectId=activeProjectId){
const db=await openStoryboardAudioDb();return new Promise((resolve,reject)=>{const request=db.transaction('audio','readonly').objectStore('audio').get(storyboardAudioKey(projectId));request.onsuccess=()=>resolve(request.result||null);request.onerror=()=>reject(request.error)});
}
async function deleteStoryboardAudio(projectId=activeProjectId){
const db=await openStoryboardAudioDb();return new Promise((resolve,reject)=>{const request=db.transaction('audio','readwrite').objectStore('audio').delete(storyboardAudioKey(projectId));request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error)});
}
async function loadStoryboardAudio(force=false){
const token=++storyboardAudioLoadToken,projectId=activeProjectId,audio=$('storyAudio'),board=storyboardData();
if(!force&&storyboardAudioLoaded&&storyboardAudioProjectId===projectId)return;
try{
const blob=await getStoryboardAudio(projectId);if(token!==storyboardAudioLoadToken)return;
if(storyboardAudioUrl){URL.revokeObjectURL(storyboardAudioUrl);storyboardAudioUrl=''}
storyboardAudioProjectId=projectId;storyboardAudioLoaded=true;audio.pause();audio.removeAttribute('src');audio.load();
const hasAudio=!!blob;audio.hidden=!hasAudio;$('removeStoryAudio').hidden=!hasAudio;$('storyAudioName').textContent=hasAudio?(board.soundName||'Piste audio liée'):'Aucun fichier audio';
if(blob){storyboardAudioUrl=URL.createObjectURL(blob);audio.src=storyboardAudioUrl;audio.loop=true;audio.load()}
}catch(error){storyboardAudioLoaded=false;$('storyAudioName').textContent='Audio indisponible dans ce navigateur'}
}
async function importStoryboardAudio(file){
if(!file||!file.type.startsWith('audio/'))return;
try{await storeStoryboardAudio(file);storyboardData().soundName=file.name;save();await loadStoryboardAudio(true);$('saveStatus').textContent='Piste audio du storyboard enregistrée'}
catch(error){window.alert('Impossible de sauvegarder cette piste audio. Vérifie l’espace de stockage disponible.')}
}
async function removeStoryboardAudio(){
try{await deleteStoryboardAudio();delete storyboardData().soundName;save();await loadStoryboardAudio(true)}
catch(error){window.alert('Impossible de retirer la piste audio.')}
}
function syncStoryboardAudio(time=animaticElapsed,play=false){
const audio=$('storyAudio');if(audio.hidden||storyboardAudioProjectId!==activeProjectId)return;
if(Number.isFinite(audio.duration)&&audio.duration>0)audio.currentTime=time%audio.duration;
if(play)audio.play().catch(()=>{$('storyAudioName').textContent=(storyboardData().soundName||'Piste audio')+' · lecture bloquée par le navigateur'});
else audio.pause();
}
function formatAnimaticTime(seconds){const minutes=Math.floor(seconds/60),remaining=(seconds-minutes*60).toFixed(1).padStart(4,'0');return minutes+':'+remaining}
const collapsedStorySequences=new Set();
function renderStoryboard(){
const board=storyboardData(),shots=board.shots,scenes=sequenceScenes(),beats=sequenceData().beats||[],grid=$('storyboardGrid');grid.innerHTML='';
loadStoryboardAudio();
if(!board.sequenceLinksMigrated){
const beatByScene=new Map(beats.filter(beat=>beat.sceneId).map(beat=>[beat.sceneId,beat.id]));
shots.forEach(shot=>{if(!shot.sequenceId&&shot.sceneId&&beatByScene.has(shot.sceneId))shot.sequenceId=beatByScene.get(shot.sceneId)});
board.sequenceLinksMigrated=true;save();
}
if(board.activeShotId&&!shots.some(shot=>shot.id===board.activeShotId))board.activeShotId='';
if(!board.activeShotId&&shots.length)board.activeShotId=shots[0].id;
$('storyboardEmpty').hidden=shots.length>0;
let active=shots.find(shot=>shot.id===board.activeShotId);
if(!active&&shots.length){active=shots[0];board.activeShotId=active.id}
const total=storyboardTotalDuration();$('animaticTotal').textContent='Durée totale : '+formatAnimaticTime(total);
$('animaticScrubber').max=total;$('animaticScrubber').value=Math.min(animaticElapsed,total);
const groups=beats.map(beat=>({id:beat.id,title:beat.title||'Séquence sans titre',shots:shots.filter(shot=>shot.sequenceId===beat.id)}));
const unassigned=shots.filter(shot=>!beats.some(beat=>beat.id===shot.sequenceId));
if(unassigned.length||!groups.length)groups.push({id:'',title:'Hors séquence',shots:unassigned});
groups.forEach(group=>{
const section=document.createElement('section');section.className='story-sequence-group';
const groupHeading=document.createElement('div');groupHeading.className='story-sequence-heading';
const groupTitle=document.createElement('h2');groupTitle.textContent=group.title;
const groupCount=document.createElement('span');groupCount.textContent=group.shots.length+' plan'+(group.shots.length===1?'':'s');
const groupActions=document.createElement('div');groupActions.className='story-sequence-actions';
if(group.id){const addButton=mb('+ Case',()=>addStoryboardShot(group.id),'Ajouter une case à cette séquence');groupActions.append(addButton)}
const importButton=mb('Importer des images',()=>importStoryboardImages(group.id),'Importer plusieurs images dans cette séquence');groupActions.append(importButton);
const exportButton=mb('Exporter WebM',event=>exportAnimatic(group.id||null,event.currentTarget),'Exporter l’animatique de cette séquence');exportButton.disabled=!group.shots.length;
const toggle=mb(collapsedStorySequences.has(group.id)?'▶':'▼',()=>{collapsedStorySequences.has(group.id)?collapsedStorySequences.delete(group.id):collapsedStorySequences.add(group.id);renderStoryboard()},'Replier ou déplier la séquence');toggle.className='story-sequence-toggle';toggle.setAttribute('aria-expanded',String(!collapsedStorySequences.has(group.id)));
groupActions.append(exportButton);groupHeading.append(toggle,groupTitle,groupCount,groupActions);section.append(groupHeading);
const cards=document.createElement('div');cards.className='storyboard-grid';
group.shots.forEach(shot=>{
const index=shots.indexOf(shot);
shot.duration=shotDuration(shot);
const card=document.createElement('article');card.className='story-card'+(shot.id===board.activeShotId?' selected':'');card.dataset.shotId=shot.id;
card.onclick=event=>{if(event.target.closest('button,input,textarea,select'))return;board.activeShotId=shot.id;animaticElapsed=shots.slice(0,index).reduce((sum,item)=>sum+shotDuration(item),0);save();renderStoryboard()};
const frame=document.createElement('div');frame.className='story-frame';
if(shot.image){const img=document.createElement('img');img.src=shot.image;img.alt=shot.title||'Image du plan';frame.append(img)}else{const placeholder=document.createElement('span');placeholder.textContent='Image du plan';frame.append(placeholder)}
const imageInput=document.createElement('input');imageInput.type='file';imageInput.accept='image/*';imageInput.hidden=true;imageInput.setAttribute('aria-label','Importer une image pour la case '+(index+1));
const imageButton=mb(shot.image?'Changer l’image':'Importer une image',()=>imageInput.click(),'Image de la case');imageInput.onchange=async()=>{const file=imageInput.files[0];if(!file)return;try{shot.image=await compressStoryboardImage(file);save();renderStoryboard()}catch(error){window.alert('Impossible de charger cette image.') }};
const header=document.createElement('div');header.className='story-card-header';const number=document.createElement('span');number.className='story-card-number';number.textContent=String(index+1).padStart(2,'0');
const title=document.createElement('input');title.type='text';title.className='story-card-title';title.value=shot.title||'';title.placeholder='Titre du plan';title.setAttribute('aria-label','Titre de la case '+(index+1));title.oninput=()=>{shot.title=title.value;save()};header.append(number,title);
const controls=document.createElement('div');controls.className='story-card-controls';
const durationLabel=document.createElement('label');durationLabel.textContent='Durée (s)';const duration=document.createElement('input');duration.type='number';duration.min='0.1';duration.max='600';duration.step='0.1';duration.value=shot.duration;duration.setAttribute('aria-label','Durée de la case '+(index+1)+' en secondes');duration.onchange=()=>{shot.duration=Math.max(.1,Math.min(600,Number(duration.value)||3));duration.value=shot.duration;save();renderStoryboard()};durationLabel.append(duration);
const up=mb('↑',()=>moveStoryboardShot(index,-1),'Déplacer la case vers le début');up.disabled=index===0;
const down=mb('↓',()=>moveStoryboardShot(index,1),'Déplacer la case vers la fin');down.disabled=index===shots.length-1;
const remove=mb('×',()=>{shots.splice(index,1);if(board.activeShotId===shot.id)board.activeShotId=shots[Math.min(index,shots.length-1)]?.id||'';save();renderStoryboard()},'Supprimer la case');
controls.append(durationLabel,up,down,remove);
const description=document.createElement('textarea');description.className='story-card-description';description.value=shot.description||'';description.rows=3;description.placeholder='Action, cadrage, mouvement ou son…';description.setAttribute('aria-label','Description de la case '+(index+1));description.oninput=()=>{shot.description=description.value;save()};
const sceneSelect=document.createElement('select');sceneSelect.className='story-scene-select';sceneSelect.setAttribute('aria-label','Scène liée à la case '+(index+1));
const none=document.createElement('option');none.value='';none.textContent='Aucune scène liée';sceneSelect.append(none);
scenes.forEach(scene=>{const option=document.createElement('option');option.value=scene.id;option.textContent=scene.label;sceneSelect.append(option)});
sceneSelect.value=shot.sceneId||'';sceneSelect.onchange=()=>{shot.sceneId=sceneSelect.value;save()};
const sequenceSelect=document.createElement('select');sequenceSelect.className='story-sequence-select';sequenceSelect.setAttribute('aria-label','Séquence du plan '+(index+1));
const noSequence=document.createElement('option');noSequence.value='';noSequence.textContent='Hors séquence';sequenceSelect.append(noSequence);
beats.forEach(beat=>{const option=document.createElement('option');option.value=beat.id;option.textContent=beat.title||'Séquence sans titre';sequenceSelect.append(option)});
sequenceSelect.value=shot.sequenceId||'';sequenceSelect.onchange=()=>{shot.sequenceId=sequenceSelect.value;save();renderStoryboard()};
card.append(frame,imageButton,imageInput,header,controls,description,sceneSelect,sequenceSelect);cards.append(card);
});
section.append(cards);cards.hidden=collapsedStorySequences.has(group.id);grid.append(section);
});
renderAnimaticFrame();
}
function moveStoryboardShot(index,direction){const shots=storyboardShots(),target=index+direction;if(target<0||target>=shots.length)return;[shots[index],shots[target]]=[shots[target],shots[index]];save();renderStoryboard()}
async function compressStoryboardImage(file){
if(!file.type.startsWith('image/'))throw new Error('Fichier image invalide');
const bitmap=await createImageBitmap(file),scale=Math.min(1,1280/bitmap.width,720/bitmap.height),canvas=document.createElement('canvas');
canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.74));if(!blob)throw new Error('Compression image impossible');
return await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(reader.error);reader.readAsDataURL(blob)});
}
let animaticMarkerSignature='',animaticMarkerDrag=false;
function renderAnimaticMarkers(){
const shots=storyboardShots(),box=$('animaticMarkers'),total=storyboardTotalDuration(),signature=shots.map(shot=>shot.id+':'+shotDuration(shot)).join('|');
if(animaticMarkerDrag||signature===animaticMarkerSignature)return;animaticMarkerSignature=signature;box.innerHTML='';
if(!shots.length||!total)return;
let end=0;
shots.slice(0,-1).forEach((shot,index)=>{
end+=shotDuration(shot);const endAt=end;
const marker=document.createElement('button');marker.type='button';marker.className='animatic-marker';marker.style.left=(endAt/total*100)+'%';marker.title='Fin du plan '+(index+1)+' · '+formatAnimaticTime(endAt)+' (glisser pour changer la durée)';marker.setAttribute('aria-label','Changer la durée du plan '+(index+1));
marker.onpointerdown=event=>{
event.preventDefault();marker.setPointerCapture(event.pointerId);animaticMarkerDrag=true;marker.classList.add('dragging');
const rect=box.getBoundingClientRect(),start=endAt-shotDuration(shot);
marker.onpointermove=move=>{
const time=Math.max(start+.1,Math.min(total,(move.clientX-rect.left)/rect.width*total));
shot.duration=Math.round((time-start)*10)/10;marker.style.left=((start+shot.duration)/total*100)+'%';marker.title='Fin du plan '+(index+1)+' · '+formatAnimaticTime(start+shot.duration);
};
marker.onpointerup=marker.onpointercancel=()=>{marker.onpointermove=marker.onpointerup=marker.onpointercancel=null;animaticMarkerDrag=false;animaticMarkerSignature='';save();renderStoryboard()};
};
box.append(marker);
});
}
function renderAnimaticFrame(){
const shots=storyboardShots(),image=$('animaticImage'),placeholder=$('animaticPlaceholder'),total=storyboardTotalDuration();
renderAnimaticMarkers();
if(!shots.length){image.hidden=true;image.removeAttribute('src');placeholder.hidden=false;placeholder.textContent='Ajoute des cases illustrées pour lancer l’animatique.';$('animaticTitle').textContent='';$('animaticTime').textContent='';$('animaticCounter').textContent='0 / 0';$('animaticScrubber').max=0;$('animaticScrubber').value=0;$('playAnimatic').textContent='▶ Lire';return}
animaticElapsed=Math.max(0,Math.min(animaticElapsed,total));
let cursor=0,index=shots.length-1;
for(let i=0;i<shots.length;i++){if(animaticElapsed<cursor+shotDuration(shots[i])){index=i;break}cursor+=shotDuration(shots[i])}
const shot=shots[index];image.hidden=!shot.image;if(shot.image)image.src=shot.image;else image.removeAttribute('src');placeholder.hidden=!!shot.image;placeholder.textContent=shot.title||'Case sans image';
$('animaticTitle').textContent=shot.title||'Case '+(index+1);$('animaticTime').textContent=formatAnimaticTime(shotDuration(shot));$('animaticCounter').textContent=(index+1)+' / '+shots.length;
$('animaticScrubber').max=total;$('animaticScrubber').value=animaticElapsed;
}
function stopAnimatic(reset=true){if(animaticTimer){clearInterval(animaticTimer);animaticTimer=null}syncStoryboardAudio(reset?0:animaticElapsed,false);if(reset)animaticElapsed=0;$('playAnimatic').textContent='▶ Lire';renderAnimaticFrame()}
function toggleAnimatic(){
if(animaticTimer){animaticElapsed=animaticBaseElapsed+(performance.now()-animaticStartedAt)/1000;clearInterval(animaticTimer);animaticTimer=null;syncStoryboardAudio(animaticElapsed,false);$('playAnimatic').textContent='▶ Reprendre';renderAnimaticFrame();return}
if(!storyboardShots().length)return;
if(animaticElapsed>=storyboardTotalDuration())animaticElapsed=0;
animaticBaseElapsed=animaticElapsed;animaticStartedAt=performance.now();$('playAnimatic').textContent='Ⅱ Pause';syncStoryboardAudio(animaticElapsed,true);
animaticTimer=setInterval(()=>{animaticElapsed=animaticBaseElapsed+(performance.now()-animaticStartedAt)/1000;if(animaticElapsed>=storyboardTotalDuration()){stopAnimatic(false);animaticElapsed=storyboardTotalDuration()}else renderAnimaticFrame()},80);
}
function importStoryboardImages(sequenceId=''){
const input=document.createElement('input');input.type='file';input.accept='image/*';input.multiple=true;
input.onchange=async()=>{
const files=[...input.files].filter(file=>file.type.startsWith('image/')).sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}));if(!files.length)return;
const board=storyboardData();let failed=0;
for(const file of files){try{const image=await compressStoryboardImage(file);const shot={id:uid(),title:file.name.replace(/\.[^.]+$/,'')||'Plan '+(board.shots.length+1),description:'',duration:3,image,sceneId:'',sequenceId};board.shots.push(shot);board.activeShotId=shot.id}catch(error){failed++}}
save();renderStoryboard();if(failed)window.alert(failed+' image(s) n’ont pas pu être chargées.');
};
input.click();
}
function addStoryboardShot(sequenceId=''){
const board=storyboardData(),shot={id:uid(),title:'Plan '+(board.shots.length+1),description:'',duration:3,image:'',sceneId:'',sequenceId};board.shots.push(shot);board.activeShotId=shot.id;save();renderStoryboard();
document.querySelector('.story-card.selected .story-card-title')?.focus();
}
async function exportAnimatic(sequenceId=null,button=null){
const shots=storyboardShots().filter(shot=>sequenceId===null?true:shot.sequenceId===sequenceId);
if(!shots.length){window.alert(sequenceId?'Cette séquence ne contient aucune case à exporter.':'Le storyboard ne contient aucune case à exporter.');return}
if(!window.MediaRecorder||!HTMLCanvasElement.prototype.captureStream){window.alert('L’export WebM n’est pas pris en charge par ce navigateur. Essaie avec une version récente de Chrome ou Edge.');return}
if(button)button.disabled=true;
let stream=null,recorder=null;
try{
await loadStoryboardAudio();
const canvas=document.createElement('canvas');canvas.width=1280;canvas.height=720;
const context=canvas.getContext('2d');if(!context)throw new Error('Canvas indisponible');
stream=canvas.captureStream(30);const audio=$('storyAudio');let audioCaptured=false;
if(!audio.hidden&&storyboardAudioProjectId===activeProjectId){
const capture=audio.captureStream||audio.mozCaptureStream;
if(capture){audio.currentTime=0;await audio.play();capture.call(audio).getAudioTracks().forEach(track=>{stream.addTrack(track);audioCaptured=true})}
}
const mimeType=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'].find(type=>MediaRecorder.isTypeSupported(type));
if(!mimeType)throw new Error('Aucun encodeur WebM disponible');
recorder=new MediaRecorder(stream,{mimeType});const chunks=[];
recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data)};
const stopped=new Promise((resolve,reject)=>{recorder.onstop=resolve;recorder.onerror=()=>reject(recorder.error||new Error('Échec de l’enregistrement'))});
const images=await Promise.all(shots.map(shot=>new Promise(resolve=>{if(!shot.image){resolve(null);return}const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>resolve(null);image.src=shot.image})));
recorder.start(250);
let elapsed=0;
for(let index=0;index<shots.length;index++){
const shot=shots[index],image=images[index],duration=shotDuration(shot),started=performance.now();
while(elapsed<duration){
context.fillStyle='#111';context.fillRect(0,0,canvas.width,canvas.height);
if(image){const scale=Math.min(canvas.width/image.naturalWidth,canvas.height/image.naturalHeight),width=image.naturalWidth*scale,height=image.naturalHeight*scale;context.drawImage(image,(canvas.width-width)/2,(canvas.height-height)/2,width,height)}
context.fillStyle='rgba(0,0,0,.68)';context.fillRect(0,canvas.height-86,canvas.width,86);
context.fillStyle='#fff';context.font='bold 30px Arial';context.fillText((shot.title||'Plan '+(index+1)).slice(0,70),36,canvas.height-36);
elapsed=(performance.now()-started)/1000;
await new Promise(resolve=>setTimeout(resolve,30));
}
elapsed=0;
}
recorder.stop();await stopped;
const blob=new Blob(chunks,{type:mimeType}),url=URL.createObjectURL(blob),link=document.createElement('a');
const beat=sequenceId&&sequenceData().beats.find(item=>item.id===sequenceId),slug=(beat?.title||'sequence').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
link.href=url;link.download=sequenceId?'animatique-'+(slug||'sequence')+'.webm':'animatique-complete.webm';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
if(!audioCaptured&&!audio.hidden)window.alert('La vidéo a été exportée, mais ce navigateur n’a pas permis d’y inclure la piste audio.');
}catch(error){window.alert('Impossible d’exporter l’animatique : '+(error.message||'erreur du navigateur'))}
finally{if(recorder?.state==='recording')recorder.stop();if(stream)stream.getTracks().forEach(track=>track.stop());if(button)button.disabled=false;const audio=$('storyAudio');if(!audio.paused)audio.pause()}
}
function scrubAnimatic(){
if(animaticTimer){clearInterval(animaticTimer);animaticTimer=null;$('playAnimatic').textContent='▶ Lire'}syncStoryboardAudio(Number($('animaticScrubber').value)||0,false);
animaticElapsed=Number($('animaticScrubber').value)||0;renderAnimaticFrame();
const shots=storyboardShots(),board=storyboardData();let elapsed=0;
for(const shot of shots){if(animaticElapsed<elapsed+shotDuration(shot)){board.activeShotId=shot.id;break}elapsed+=shotDuration(shot)}
document.querySelectorAll('.story-card').forEach(card=>card.classList.toggle('selected',card.dataset.shotId===board.activeShotId));
}
function renderCharacterRelations(){
const container=$('characterRelations');container.innerHTML='';
relationships().filter(relation=>relation.from===selectedCharacterId||relation.to===selectedCharacterId).forEach(relation=>{
const row=document.createElement('div');row.className='character-relation';
const otherId=relation.from===selectedCharacterId?relation.to:relation.from;
const other=document.createElement('select');other.setAttribute('aria-label','Personnage lié');
characters().filter(character=>character.id!==selectedCharacterId).forEach(character=>{const option=document.createElement('option');option.value=character.id;option.textContent=character.name;other.append(option)});
other.value=otherId;other.onchange=()=>{if(relation.from===selectedCharacterId)relation.to=other.value;else relation.from=other.value;save();renderCharacterRelations()};
const kind=document.createElement('select');kind.setAttribute('aria-label','Type de relation');
['Famille','Amitié','Amour','Rivalité','Travail','Conflit','Autre'].forEach(value=>{const option=document.createElement('option');option.value=value;option.textContent=value;kind.append(option)});
kind.value=relation.type||'Autre';kind.onchange=()=>{relation.type=kind.value;save()};
const description=document.createElement('input');description.value=relation.description||'';description.placeholder='Détail de la relation';description.setAttribute('aria-label','Détail de la relation');description.oninput=()=>{relation.description=description.value;save()};
const remove=mb('×',()=>{S.relationships=relationships().filter(item=>item.id!==relation.id);save();renderCharacterRelations()},'Supprimer la relation');
row.append(other,kind,description,remove);container.append(row)});
if(!container.children.length){const empty=document.createElement('p');empty.className='em';empty.textContent='Aucune relation pour ce personnage.';container.append(empty)}
}
function renderCharacters(){
if(selectedCharacterId&&!selectedCharacter())selectedCharacterId=null;
if(!selectedCharacterId&&characters().length)selectedCharacterId=characters()[0].id;
renderCharacterList();renderCharacterEditor();
}
function renderCharacterArc(){
if(selectedCharacterId&&!selectedCharacter())selectedCharacterId=null;
if(!selectedCharacterId&&characters().length)selectedCharacterId=characters()[0].id;
renderCharacterList();const character=selectedCharacter(),panel=$('arcPanel');
panel.hidden=!character;$('arcEmpty').hidden=!!character;
if(!character)return;
if(!character.arc)character.arc=defaultCharacterArc();
$('arcHeading').textContent=character.name||'Personnage sans nom';$('arcType').value=character.arc.type||'positive';
document.querySelectorAll('[data-arc-field]').forEach(field=>{field.value=character.arc[field.dataset.arcField]||''});
}
function parseCharacterPdf(text){
const parsed={fields:{},customFields:[]},lines=text.split(/\r?\n/).map(line=>line.trim()).filter(Boolean);
for(let index=0;index<lines.length;index++){
const line=lines[index],match=line.match(/^(.{2,50}?)\s*[:：|]\s*(.*)$/)||line.match(/^(.{2,40}?)\s+[–—-]\s+(.+)$/);
if(match){const label=match[1].trim(),value=match[2].trim(),key=characterFieldByAlias.get(normalizeLabel(label));
if(key){parsed.fields[key]=parsed.fields[key]?[parsed.fields[key],value].filter(Boolean).join('\n'):value}
else parsed.customFields.push({label,value});continue}
const key=characterFieldByAlias.get(normalizeLabel(line));
if(key&&lines[index+1]){parsed.fields[key]=parsed.fields[key]?[parsed.fields[key],lines[index+1]].filter(Boolean).join('\n'):lines[++index];continue}
}
return parsed;
}
let pdfJsPromise;
function loadPdfJs(){
if(window.pdfjsLib)return Promise.resolve(window.pdfjsLib);
if(pdfJsPromise)return pdfJsPromise;
pdfJsPromise=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';script.onload=()=>{if(!window.pdfjsLib){reject(new Error('Bibliothèque PDF indisponible'));return}window.pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';resolve(window.pdfjsLib)};script.onerror=()=>reject(new Error('Impossible de charger le lecteur PDF'));document.head.append(script)});
return pdfJsPromise;
}
async function importCharacterPdf(file){
if(!file)return;
if(!selectedCharacterId){const character=newCharacter();characters().push(character);selectedCharacterId=character.id}
const status=$('saveStatus');status.textContent='Lecture du PDF…';
try{
const pdfjs=await loadPdfJs(),pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise,pages=[];
for(let pageNumber=1;pageNumber<=pdf.numPages;pageNumber++){
const page=await pdf.getPage(pageNumber),content=await page.getTextContent(),rows=[];
content.items.filter(item=>item.str&&item.str.trim()).forEach(item=>{const y=item.transform[5],row=rows.find(entry=>Math.abs(entry.y-y)<3);if(row)row.items.push(item);else rows.push({y,items:[item]})});
rows.sort((a,b)=>b.y-a.y);pages.push(rows.map(row=>row.items.sort((a,b)=>a.transform[4]-b.transform[4]).map(item=>item.str.trim()).filter(Boolean).join(' ')).filter(Boolean).join('\n'));
}
const text=pages.join('\n\n').trim();if(!text)throw new Error('Aucun texte détecté dans ce PDF.');
const character=selectedCharacter(),parsed=parseCharacterPdf(text);
Object.entries(parsed.fields).forEach(([key,value])=>{if(value&&!character[key])character[key]=value});
const currentLabels=new Set((character.customFields||[]).map(field=>normalizeLabel(field.label)));
(character.customFields||(character.customFields=[])).push(...parsed.customFields.filter(field=>field.label&&field.value&&!currentLabels.has(normalizeLabel(field.label))));
character.pdfText=[character.pdfText,text].filter(Boolean).join('\n\n--- Nouvelle fiche PDF ---\n\n');
if(!character.name||character.name==='Nouveau personnage')character.name=parsed.fields.name||file.name.replace(/\.pdf$/i,'');
save();renderCharacters();status.textContent='PDF importé dans la fiche';
}catch(error){status.textContent='Import PDF impossible';window.alert(error.message+' Le PDF doit contenir du texte sélectionnable; les documents scannés nécessitent une reconnaissance OCR.')}
}
async function storeCharacterPortrait(file){
if(!file||!file.type.startsWith('image/'))return;
const character=selectedCharacter();if(!character)return;
try{
const bitmap=await createImageBitmap(file),scale=Math.min(1,1000/bitmap.width,1200/bitmap.height),canvas=document.createElement('canvas');
canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);
canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.82));if(!blob)throw new Error('Image non prise en charge');
const reader=new FileReader();reader.onload=()=>{character.portrait=reader.result;save();renderCharacterEditor()};reader.readAsDataURL(blob);
}catch(error){window.alert('Impossible de charger cette image.')}
}
let selectedLocationId=null;
function locations(){return S.locations||(S.locations=[])}
function selectedLocation(){return locations().find(location=>location.id===selectedLocationId)}
function newLocation(name='Nouveau lieu',type=''){return{id:uid(),name,type,address:'',description:'',atmosphere:'',details:'',importance:'',notes:'',image:''}}
function sluglineLocation(text){
const match=String(text||'').trim().match(/^(INT\/EXT|I\/E|INT|EXT)[. \/]+(.*)$/i);if(!match)return null;
const kind=/^i\/e|int\/ext/i.test(match[1])?'INT/EXT':match[1].toUpperCase();
const name=match[2].replace(/\s*[–—-]\s*[^–—-]*$/,'').trim();return name?{type:kind,name:name.toUpperCase()}:null;
}
function locationScenes(location){
const key=normalizeLabel(location.name||'');if(!key)return[];
return sequenceScenes().filter(scene=>normalizeLabel(scene.label.replace(/^\d+\.\s*/,'')).includes(key));
}
function detectLocations(){
const known=new Set(locations().map(location=>normalizeLabel(location.name)));let added=0;
S.blocks.filter(block=>block.t==='scene').forEach(block=>{const found=sluglineLocation(block.x);if(!found)return;const key=normalizeLabel(found.name);if(known.has(key))return;known.add(key);locations().push(newLocation(found.name,found.type));added++});
if(added){save();selectedLocationId=selectedLocationId||locations()[0].id}
renderLocations();$('saveStatus').textContent=added?added+' lieu'+(added>1?'x':'')+' détecté'+(added>1?'s':''):'Aucun nouveau lieu détecté';
}
function renderLocations(){
if(selectedLocationId&&!selectedLocation())selectedLocationId=null;
if(!selectedLocationId&&locations().length)selectedLocationId=locations()[0].id;
$('locationCount').textContent=locations().length+' fiche'+(locations().length===1?'':'s');
const list=$('locationList');list.innerHTML='';
locations().forEach(location=>{const button=document.createElement('button');button.type='button';button.textContent=location.name||'Sans nom';button.className=location.id===selectedLocationId?'on':'';button.onclick=()=>{selectedLocationId=location.id;renderLocations()};list.append(button)});
const location=selectedLocation(),form=$('locationForm');form.hidden=!location;$('locationEmpty').hidden=!!location;
if(!location)return;
form.querySelectorAll('[data-location-field]').forEach(field=>{field.value=location[field.dataset.locationField]||''});
const image=$('locationImagePreview');image.hidden=!location.image;image.src=location.image||'';$('locationImagePlaceholder').hidden=!!location.image;$('removeLocationImage').hidden=!location.image;
const scenesBox=$('locationScenes');scenesBox.innerHTML='';const scenes=locationScenes(location);
if(!scenes.length){const empty=document.createElement('p');empty.className='em';empty.textContent='Aucune scène ne mentionne ce lieu dans son intitulé.';scenesBox.append(empty)}
scenes.forEach(scene=>{const row=document.createElement('div');row.className='timeline-scene-row';const label=document.createElement('span');label.textContent=scene.label;const open=mb('Ouvrir la scène',()=>{const index=S.blocks.findIndex(block=>block.id===scene.id);if(index>=0){setView('w');foc(index,0)}},'Ouvrir cette scène dans l’éditeur');row.append(label,open);scenesBox.append(row)});
}
function renderReportLocations(){
if(!locations().length)return'<p class="empty">Aucune fiche lieu.</p>';
return locations().map(location=>{
const fields=[['Type',location.type],['Adresse / situation',location.address],['Description',location.description],['Ambiance / atmosphère',location.atmosphere],['Détails visuels et sonores',location.details],['Importance dramatique',location.importance],['Notes',location.notes]].filter(([,value])=>String(value||'').trim()).map(([label,value])=>reportField(label,value)).join('');
const image=String(location.image||'').startsWith('data:image/')?`<img class="portrait" src="${location.image}" alt="${htmlEscape(location.name)}">`:'';
const scenes=locationScenes(location);
return`<article class="character-report"><h2>${htmlEscape(location.name||'Lieu sans nom')}</h2>${image}<div class="field-grid">${fields||'<p class="empty">Aucun détail renseigné.</p>'}</div>${scenes.length?`<h3>Scènes</h3><ul>${scenes.map(scene=>`<li>${htmlEscape(scene.label)}</li>`).join('')}</ul>`:''}</article>`;
}).join('');
}
function uniqueProjectName(name){let candidate=name,index=2;while(projectStore.projects.some(project=>project.name.toLowerCase()===candidate.toLowerCase()))candidate=name+' ('+index+++')';return candidate}
function addProject(name,data={title:'',author:'',blocks:[{t:'scene',x:''}]}){
const project=freshProject(uniqueProjectName(name),clone(data));projectStore.projects.push(project);activeProjectId=project.id;S=clone(project.data);
updateProjectControls();updateDocumentFields();render();renderCharacters();save();
}
function downloadProject(){
save();const project=activeProject(),payload={format:'scenario-editor-project',version:1,project:{name:project.name,updatedAt:project.updatedAt,data:project.data}};
const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');
link.href=url;link.download=(project.name.replace(/[^\w-]+/g,'_')||'projet')+'.json';link.click();URL.revokeObjectURL(url);
}
function importProjectFile(file){
if(!file)return;
file.text().then(text=>{
const payload=JSON.parse(text),project=payload&&payload.project;
if(payload.format!=='scenario-editor-project'||payload.version!==1||!project||!project.data||!Array.isArray(project.data.blocks))throw new Error('Format invalide');
addProject(project.name||'Projet importé',project.data);
}).catch(()=>window.alert('Ce fichier ne contient pas de sauvegarde de projet valide.'));
}
updateProjectControls();
function fit(t){t.style.height='auto';t.style.height=t.scrollHeight+'px'}
function row(i){const b=S.blocks[i],d=document.createElement('div');d.className='row '+b.t;
const lb=document.createElement('span');lb.className='lb';lb.textContent=L[b.t];
const ta=document.createElement('textarea');ta.rows=1;ta.lang='fr';ta.value=b.x;
ta.oninput=()=>{b.x=ta.value;if(b.t==='action'&&/^(INT|EXT|I\/E)[. \/]/i.test(ta.value))setType(i,'scene');fit(ta);save();stats();if(b.t==='scene')nav();chips()};
ta.onfocus=()=>{cur=i;tb();chips()};
ta.onblur=()=>{if(b.t==='paren'&&b.x.trim()&&!/^\(.*\)$/.test(b.x.trim())){b.x='('+b.x.replace(/^\(|\)$/g,'').trim()+')';ta.value=b.x;save()}};
ta.onkeydown=e=>key(e,i,ta);d.append(lb,ta);return d}
function render(f,pos){ids();doc.innerHTML='';S.blocks.forEach((_,i)=>doc.append(row(i)));[...doc.querySelectorAll('textarea')].forEach(fit);nav();stats();tb();if(f!=null)foc(f,pos)}
function foc(i,pos){const ta=doc.children[i].lastChild;ta.focus();const p=pos==='end'?ta.value.length:pos||0;ta.setSelectionRange(p,p);ta.scrollIntoView({block:'nearest'})}
function setType(i,t){S.blocks[i].t=t;const d=doc.children[i];d.className='row '+t;d.firstChild.textContent=L[t];fit(d.lastChild);tb();save();stats();nav()}
function ins(i,t,x){S.blocks.splice(i,0,{t,x:x||'',id:uid()});save();render(i,0)}
function key(e,i,ta){const b=S.blocks[i];
if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();
if(!b.x.trim()&&b.t!=='scene'){setType(i,b.t==='action'?'scene':'action');return}
const p=ta.selectionStart,rest=b.x.slice(p);b.x=b.x.slice(0,p);ins(i+1,NEXT[b.t],rest);return}
if(e.key==='Tab'){e.preventDefault();setType(i,CYC[(CYC.indexOf(b.t)+(e.shiftKey?5:1))%6]);return}
if(e.key==='Backspace'&&!b.x&&S.blocks.length>1){e.preventDefault();S.blocks.splice(i,1);save();render(Math.max(0,i-1),'end');return}
if(e.key==='ArrowUp'&&ta.selectionStart===0&&i>0){e.preventDefault();foc(i-1,'end')}
if(e.key==='ArrowDown'&&ta.selectionEnd===ta.value.length&&i<S.blocks.length-1){e.preventDefault();foc(i+1,0)}
if((e.ctrlKey||e.metaKey)&&/^[1-6]$/.test(e.key)){e.preventDefault();setType(i,T[+e.key-1])}}
function tb(){$('tb').innerHTML='';T.forEach((t,k)=>{const x=document.createElement('button');x.textContent=L[t];x.title='Ctrl+'+(k+1);x.className=S.blocks[cur]&&S.blocks[cur].t===t?'on':'';x.onmousedown=e=>{e.preventDefault();setType(cur,t);doc.children[cur].lastChild.focus()};$('tb').append(x)})}
function chips(){const c=$('chips');c.innerHTML='';const b=S.blocks[cur];if(!b||b.t!=='char')return;
const n=[...new Set(S.blocks.filter(x=>x.t==='char'&&x.x.trim()).map(x=>x.x.trim().toUpperCase()))].filter(x=>x!==b.x.trim().toUpperCase());
n.forEach(v=>{const x=document.createElement('button');x.textContent=v;x.onmousedown=e=>{e.preventDefault();b.x=v;const ta=doc.children[cur].lastChild;ta.value=v;save();chips();ta.focus()};c.append(x)})}
function nav(){const n=$('nav');n.innerHTML='';let k=0;S.blocks.forEach((b,i)=>{if(b.t==='scene'){k++;const a=document.createElement('a');a.textContent=k+'. '+(b.x||'(sans titre)');a.onclick=()=>foc(i,0);n.append(a)}})}
function stats(){let sc=0,w=0,ln=0;S.blocks.forEach(b=>{if(b.t==='scene')sc++;w+=b.x.trim()?b.x.trim().split(/\s+/).length:0;const wd=b.t==='dial'?34:b.t==='paren'?28:60;ln+=Math.ceil(Math.max(1,b.x.length)/wd)+(b.t==='dial'||b.t==='paren'?0:1)});
$('st').innerHTML=sc+' scène'+(sc>1?'s':'')+'<br>'+w+' mots<br>≈ '+Math.max(1,Math.ceil(ln/52))+' page'+(ln>52?'s':'')}
function fountain(){let o='';if(S.title)o+='Title: '+S.title+'\n';if(S.author)o+='Author: '+S.author+'\n';
S.blocks.forEach(b=>{const x=b.x.trim();if(!x)return;
if(b.t==='scene')o+='\n'+(/^(INT|EXT|I\/E)/i.test(x)?'':'.')+x.toUpperCase()+'\n';
else if(b.t==='char')o+='\n@'+x.toUpperCase()+'\n';
else if(b.t==='trans')o+='\n> '+x.toUpperCase()+'\n';
else if(b.t==='action')o+='\n'+x+'\n';else o+=x+'\n'});return o.trim()+'\n'}
function htmlEscape(value){return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function reportText(value,empty='Non renseigné'){const text=String(value??'').trim();return text?htmlEscape(text).replace(/\r?\n/g,'<br>'):htmlEscape(empty)}
function reportField(label,value){return`<div class="field"><h4>${htmlEscape(label)}</h4><p>${reportText(value)}</p></div>`}
function reportSceneLabels(){
let index=0;const labels=new Map();
S.blocks.filter(block=>block.t==='scene').forEach(block=>{labels.set(block.id,(++index)+'. '+(block.x.trim()||'(sans titre)'))});
return labels;
}
function renderReportScript(){
if(!S.blocks.length)return'<p class="empty">Aucun bloc de scénario.</p>';
return S.blocks.map(block=>{
const text=String(block.x||'').trim();if(!text)return'';
if(block.t==='scene')return`<h3 class="scene-heading">${htmlEscape(text.toUpperCase())}</h3>`;
if(block.t==='char')return`<h4 class="script-character">${htmlEscape(text.toUpperCase())}</h4>`;
if(block.t==='dial')return`<p class="script-dialogue">${reportText(text)}</p>`;
if(block.t==='paren')return`<p class="script-parenthetical">${reportText(text)}</p>`;
if(block.t==='trans')return`<p class="script-transition">${htmlEscape(text.toUpperCase())}</p>`;
return`<p class="script-action">${reportText(text)}</p>`;
}).join('')||'<p class="empty">Aucun bloc de scénario.</p>';
}
function renderReportCharacters(sceneLabels){
if(!characters().length)return'<p class="empty">Aucune fiche personnage.</p>';
return characters().map(character=>{
const arc=character.arc||{},powerStats=character.powerStats||[],fields=[['Âge',character.age],['Pronoms',character.pronouns],['Rôle / profession',character.role],['Apparence',character.appearance],['Croyance fondamentale',character.personality],['Expérience négative',character.background],['Objectif / justification',character.goal],['Motivation / origine du besoin',character.motivation],['Peurs / but',character.fear],['Relations avec les autres',character.secret],['Style de vie',character.voice],['Interaction avec autrui / notes',character.notes],['Humeur / tempérament',character.mood],['Loisirs',character.hobbies],['Compétences',character.skills],['Habitudes / addictions',character.habits],['Goûts / préférences',character.preferences],['Faiblesses',character.weaknesses]];
const profile=fields.filter(([,value])=>String(value||'').trim()).map(([label,value])=>reportField(label,value)).join('');
const custom=(character.customFields||[]).filter(field=>field.label||field.value).map(field=>reportField(field.label||'Champ personnalisé',field.value)).join('');
const power=powerStats.filter(stat=>stat.label||stat.value).map(stat=>reportField(stat.label||'Statistique',stat.value)).join('')+radarReportFields(character);
const arcTypeLabels={positive:'Positif / transformation',negative:'Négatif / chute',flat:'Stable / influence sur le monde',redemption:'Rédemption',corruption:'Corruption',maturation:'Maturation',custom:'Autre trajectoire'};
const arcFields=[['État initial',arc.startingState],['Blessure ou croyance de départ',arc.startingBelief],['Désir extérieur',arc.desire],['Besoin intérieur',arc.need],['Déclencheur',arc.catalyst],['Premier tournant',arc.firstTurningPoint],['Point médian',arc.midpoint],['Crise / point le plus bas',arc.crisis],['Choix décisif / climax',arc.climaxChoice],['État final',arc.endingState],['Résumé de l’arc',arc.summary]];
const arcBody=arcFields.filter(([,value])=>String(value||'').trim()).map(([label,value])=>reportField(label,value)).join('');
const portrait=String(character.portrait||'').startsWith('data:image/')?`<img class="portrait" src="${character.portrait}" alt="Portrait de ${htmlEscape(character.name)}">`:'';
const relations=relationships().filter(relation=>relation.from===character.id||relation.to===character.id).map(relation=>{
const otherId=relation.from===character.id?relation.to:relation.from,other=characters().find(item=>item.id===otherId);
return`<li><strong>${htmlEscape(other?.name||'Personnage supprimé')}</strong> — ${htmlEscape(relation.type||'Autre')}${relation.description?' : '+htmlEscape(relation.description):''}</li>`;
}).join('');
const relationBlock=relations?`<h3>Relations</h3><ul>${relations}</ul>`:'';
const source=String(character.pdfText||'').trim()?`<details><summary>Texte extrait de la fiche importée</summary><p>${reportText(character.pdfText)}</p></details>`:'';
return`<article class="character-report"><h2>${htmlEscape(character.name||'Personnage sans nom')}</h2>${portrait}<div class="field-grid">${profile||'<p class="empty">Aucun détail renseigné.</p>'}${custom}</div>${arcBody?`<h3>Arc — ${htmlEscape(arcTypeLabels[arc.type]||'Non défini')}</h3><div class="field-grid">${arcBody}</div>`:''}${power?`<h3>Power scaling</h3><div class="field-grid">${power}</div>`:''}${relationBlock}${source}</article>`;
}).join('');
}
function renderReportSequencer(sceneLabels){
const sequence=S.sequencer;if(!sequence?.beats?.length)return'<p class="empty">Aucun séquencier renseigné.</p>';
const template=SEQUENCE_TEMPLATES[sequence.templateId]?.name||sequence.templateId||'Structure personnalisée';
return`<p><strong>Modèle :</strong> ${htmlEscape(template)}</p><ol>${sequence.beats.map(beat=>`<li><strong>${htmlEscape(beat.title)}</strong>${beat.guide?`<p>${reportText(beat.guide)}</p>`:''}${beat.notes?`<p>${reportText(beat.notes)}</p>`:''}${beat.sceneId?`<p class="linked">Scène liée : ${htmlEscape(sceneLabels.get(beat.sceneId)||'Scène introuvable')}</p>`:''}</li>`).join('')}</ol>`;
}
function reportEventMeta(event){
const place=locations().find(item=>item.id===event.locationId),people=(event.characterIds||[]).map(id=>characters().find(item=>item.id===id)?.name).filter(Boolean);
return place||people.length?`<p class="linked">${place?'Lieu : '+htmlEscape(place.name)+(people.length?' · ':''):''}${people.length?'Personnages : '+htmlEscape(people.join(', ')):''}</p>`:'';
}
function renderReportTimelines(sceneLabels){
const timelines=S.timelines||[];if(!timelines.length)return'<p class="empty">Aucune frise chronologique.</p>';
return timelines.map(timeline=>`<article class="timeline-report"><h3>${htmlEscape(timeline.name||'Frise sans titre')}</h3>${timeline.periods?.length?`<p class="linked">Périodes : ${timeline.periods.map(period=>htmlEscape(period.label||'Période')).join(' · ')}</p>`:''}${timeline.events?.length?`<ol>${[...timeline.events].sort((a,b)=>(a.position||0)-(b.position||0)).map(event=>`<li><strong>${htmlEscape(event.time||'Repère non défini')} — ${htmlEscape(event.title||'Événement sans titre')}</strong>${reportEventMeta(event)}${event.description?`<p>${reportText(event.description)}</p>`:''}${event.sceneId?`<p class="linked">Scène liée : ${htmlEscape(sceneLabels.get(event.sceneId)||'Scène introuvable')}</p>`:''}${event.minorEvents?.length?`<ul>${[...event.minorEvents].sort((a,b)=>(a.position||0)-(b.position||0)).map(minor=>`<li><strong>${htmlEscape(minor.position)} % — ${htmlEscape(minor.title||'Événement mineur')}</strong>${minor.description?` : ${htmlEscape(minor.description)}`:''}</li>`).join('')}</ul>`:''}</li>`).join('')}</ol>`:'<p class="empty">Aucun événement.</p>'}</article>`).join('');
}
function renderReportIdeas(){
const ideas=S.ideas||[];if(!ideas.length)return'<p class="empty">Aucune idée enregistrée.</p>';
return`<ul class="idea-list">${ideas.map(idea=>`<li>${reportText(idea.t)} <span class="tag">${htmlEscape(idea.tag||'Autre')}${idea.star?' · Favori':''}</span></li>`).join('')}</ul>`;
}
function renderReportStoryboard(){
const shots=S.storyboard?.shots||[];if(!shots.length)return'<p class="empty">Aucune case de storyboard.</p>';
const scenes=reportSceneLabels(),total=shots.reduce((sum,shot)=>sum+(Number(shot.duration)||3),0);
const cards=shots.map((shot,index)=>`<article class="storyboard-report-card" style="display:inline-block;vertical-align:top;width:48%;margin:0 1% 16px 0;padding:10px;border:1px solid #ddd;border-top:3px solid #bd2635;break-inside:avoid"><div class="storyboard-report-frame" style="display:grid;place-items:center;aspect-ratio:16/9;overflow:hidden;background:#222">${shot.image?`<img src="${shot.image}" alt="${htmlEscape(shot.title||'Plan '+(index+1))}" style="display:block;width:100%;height:100%;object-fit:contain">`:'<span style="color:#ddd;font:italic 12px Arial,sans-serif">Aucune image</span>'}</div><h3 style="margin:9px 0 3px">${String(index+1).padStart(2,'0')} — ${htmlEscape(shot.title||'Plan sans titre')}</h3><p class="storyboard-report-duration" style="margin:4px 0;color:#bd2635;font:700 12px Arial,sans-serif">${(Number(shot.duration)||3).toFixed(1)} s</p>${shot.description?`<p>${reportText(shot.description)}</p>`:''}${shot.sceneId?`<p class="linked">Scène liée : ${htmlEscape(scenes.get(shot.sceneId)||'Scène introuvable')}</p>`:''}</article>`).join('');
return`<div>${cards}</div><p class="meta">Durée totale de l’animatique : ${total.toFixed(1)} s</p>`;
}
function reportBoardColor(value,fallback='#8a8a8a'){return/^#[\da-f]{6}$/i.test(value||'')?value:fallback}
function reportBoardLines(value,limit=28,maxLines=2){
const words=String(value||'').trim().split(/\s+/).filter(Boolean),lines=[];let line='';
words.forEach(word=>{if((line+' '+word).trim().length>limit&&line){lines.push(line);line=word}else line=(line+' '+word).trim()});
if(line)lines.push(line);if(lines.length>maxLines){lines.length=maxLines;lines[maxLines-1]=lines[maxLines-1].slice(0,Math.max(0,limit-1))+'…'}
return lines;
}
function renderReportBoard(){
const board=S.board;if(!board)return'<p class="empty">Aucun tableau d’idées.</p>';
const nodes=bnodes(),positions=board.pos||{},sizes=board.size||{},zones=board.zones||[];
if(!nodes.length&&!zones.length)return'<p class="empty">Aucun nœud ni zone sur le tableau.</p>';
const layout=nodes.map((node,index)=>{const position=positions[node.k]||{x:40+(index%4)*240,y:40+Math.floor(index/4)*150},size=sizes[node.k]||{};return{...node,x:Number(position.x)||0,y:Number(position.y)||0,width:Number(size.width)||190,height:Number(size.height)||72,color:reportBoardColor(KC[node.kind],'#8a8a8a')}});
const byKey=new Map(layout.map(node=>[node.k,node])),bounds=[...layout.map(node=>({x:node.x,y:node.y,width:node.width,height:node.height})),...zones.map(zone=>({x:Number(zone.x)||0,y:Number(zone.y)||0,width:Number(zone.width)||100,height:Number(zone.height)||70}))];
const pad=36,minX=Math.min(0,...bounds.map(item=>item.x))-pad,minY=Math.min(0,...bounds.map(item=>item.y))-pad,maxX=Math.max(500,...bounds.map(item=>item.x+item.width))+pad,maxY=Math.max(240,...bounds.map(item=>item.y+item.height))+pad,width=maxX-minX,height=maxY-minY;
const zoneMarkup=zones.map(zone=>{const color=reportBoardColor(zone.color,'#a8442c'),x=Number(zone.x)||0,y=Number(zone.y)||0,w=Number(zone.width)||100,h=Number(zone.height)||70;return`<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${color}" fill-opacity=".09" stroke="${color}" stroke-width="2"/><text x="${x+10}" y="${y+18}" fill="${color}" font-size="11" font-weight="700">${htmlEscape(zone.label||'Groupe')}</text></g>`}).join('');
const linkMarkup=(board.links||[]).map(([from,to])=>{const a=byKey.get(from),b=byKey.get(to);if(!a||!b)return'';const x1=a.x+a.width/2,y1=a.y+a.height/2,x2=b.x+b.width/2,y2=b.y+b.height/2,curve=Math.max(35,Math.abs(x2-x1)*.35);return`<path d="M ${x1} ${y1} C ${x1+curve} ${y1}, ${x2-curve} ${y2}, ${x2} ${y2}" fill="none" stroke="#77727a" stroke-width="2" opacity=".8"/>`}).join('');
const nodeMarkup=layout.map(node=>{const title=node.title||KL[node.kind]||'Nœud',fontSize=Math.min(20,Math.max(12,(Number(sizes[node.k]?.fontSize)||12)*1.25)),titleLines=reportBoardLines(title,Math.max(12,Math.floor((node.width-24)/7)),2),textLines=reportBoardLines(node.text||'',Math.max(14,Math.floor((node.width-24)/6)),2);
const titleMarkup=titleLines.map((line,index)=>`<text x="${node.x+12}" y="${node.y+27+index*fontSize*1.25}" fill="#28252a" font-size="${fontSize}" font-weight="700">${htmlEscape(line)}</text>`).join('');
const detailMarkup=textLines.map((line,index)=>`<text x="${node.x+12}" y="${node.y+node.height-10-(textLines.length-1-index)*13}" fill="#77727a" font-size="10">${htmlEscape(line)}</text>`).join('');
return`<g><rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" rx="7" fill="#fffdf8" stroke="#d6d0c3" stroke-width="1.5"/><path d="M ${node.x+4} ${node.y+7} V ${node.y+node.height-7}" stroke="${node.color}" stroke-width="5" stroke-linecap="round"/><text x="${node.x+12}" y="${node.y+13}" fill="${node.color}" font-size="9" font-weight="700" letter-spacing=".7">${htmlEscape(KL[node.kind]||node.kind||'NŒUD')}</text>${titleMarkup}${detailMarkup}</g>`}).join('');
const labels=new Map(nodes.map(node=>[node.k,node.title||node.text||node.k]));
const linkDetails=(board.links||[]).map(([from,to])=>`<li>${htmlEscape(labels.get(from)||from)} → ${htmlEscape(labels.get(to)||to)}</li>`).join('');
return`<figure class="board-figure"><svg class="board-diagram" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma visuel du tableau du projet" viewBox="${minX} ${minY} ${width} ${height}" preserveAspectRatio="xMinYMin meet" style="display:block;width:100%;height:auto;background:#f7f4ee;border:1px solid #d6d0c3">${zoneMarkup}${linkMarkup}${nodeMarkup}</svg><figcaption>Position, taille, couleur, groupes et liens tels qu’enregistrés dans le tableau.</figcaption></figure><details class="board-details"><summary>Liste des liens</summary>${linkDetails?`<ul>${linkDetails}</ul>`:'<p class="empty">Aucun lien.</p>'}</details>`;
}
function buildProjectReport(){
save();const project=activeProject(),projectName=project?.name||S.title||'Projet sans titre',title=S.title||projectName,sceneLabels=reportSceneLabels(),generated=new Date().toLocaleString('fr-FR');
const blocks=`<section id="scenario"><h1>Scénario</h1><p class="meta">${htmlEscape(S.author?'Écrit par '+S.author:'Auteur non renseigné')}</p><div class="screenplay">${renderReportScript()}</div></section>`;
const charactersSection=`<section id="characters"><h1>Personnages</h1>${renderReportCharacters(sceneLabels)||'<p class="empty">Aucun personnage.</p>'}</section>`;
const sequencer=`<section id="sequencer"><h1>Séquençage</h1>${renderReportSequencer(sceneLabels)}</section>`;
const timelines=`<section id="timelines"><h1>Chronologies</h1>${renderReportTimelines(sceneLabels)}</section>`;
const storyboard=`<section id="storyboard"><h1>Storyboard / Animatique</h1>${renderReportStoryboard()}</section>`;
const ideas=`<section id="ideas"><h1>Idées</h1>${renderReportIdeas()}</section>`;
const board=`<section id="board"><h1>Tableau</h1>${renderReportBoard()}</section>`;
const sections=[['scenario','Scénario'],['characters','Personnages et arcs'],['locations','Lieux'],['sequencer','Séquençage'],['timelines','Chronologies'],['storyboard','Storyboard / Animatique'],['ideas','Idées'],['board','Tableau']];
const toc=sections.map(([id,label],index)=>`<li><a href="#${id}">${String(index+1).padStart(2,'0')} — ${label}</a></li>`).join('');
const locationsSection=`<section id="locations"><h1>Lieux</h1>${renderReportLocations()}</section>`;
return`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${htmlEscape(title)} — Dossier complet</title><style>
@page{size:A4;margin:18mm}*{box-sizing:border-box}body{margin:0;color:#28252a;background:#fff;font:14px/1.55 Georgia,'Times New Roman',serif}main{max-width:900px;margin:0 auto;padding:32px 38px}.cover{min-height:75vh;display:flex;flex-direction:column;justify-content:center;border-top:9px solid #bd2635}.eyebrow,.meta,.small{color:#777;font:12px/1.5 Arial,sans-serif}.eyebrow{text-transform:uppercase;letter-spacing:.08em}.cover h1{margin:18px 0;color:#bd2635;font:italic 800 42px/1.12 Arial,sans-serif;text-transform:uppercase}.cover .subtitle{font-size:20px}.cover .rule{width:90px;border-top:3px solid #bd2635;margin:20px 0}.toc{margin-top:42px;padding:24px;border:1px solid #ddd}.toc h2{margin-top:0;color:#bd2635;font:italic 700 20px Arial,sans-serif}.toc li{margin:8px 0}.toc a{color:inherit;text-decoration:none}section{padding-top:24px;margin-top:30px;border-top:3px solid #bd2635;break-before:page}h1{color:#bd2635;font:italic 800 27px Arial,sans-serif;text-transform:uppercase}h2{margin:24px 0 10px;color:#bd2635;font:italic 700 20px Arial,sans-serif}h3{margin:20px 0 8px;color:#bd2635;font:italic 700 15px Arial,sans-serif;text-transform:uppercase}h4{margin:0 0 4px;color:#bd2635;font:700 11px Arial,sans-serif;text-transform:uppercase}.field-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 18px}.field{padding:8px 0;border-bottom:1px solid #ddd;break-inside:avoid}.field p{margin:0;white-space:normal}.character-report,.timeline-report{margin:16px 0 28px;padding:16px;border:1px solid #ddd;border-top:4px solid #bd2635;break-inside:avoid}.character-report>h2:first-child,.timeline-report>h3:first-child{margin-top:0}.portrait{float:right;max-width:150px;max-height:190px;object-fit:cover;margin:0 0 16px 20px;border:1px solid #ccc}.script-heading{font:700 15px Arial,sans-serif;text-transform:uppercase;margin-top:22px;break-after:avoid}.script-character{text-align:center;margin:15px 0 2px;color:#28252a}.script-dialogue{max-width:65%;margin:0 auto 10px}.script-parenthetical{max-width:50%;margin:0 auto;font-style:italic}.script-transition{text-align:right;font:700 12px Arial,sans-serif}.linked,.tag{color:#777;font:12px Arial,sans-serif}.idea-list li{margin:8px 0}.empty{color:#888;font-style:italic}details{margin-top:14px}summary{color:#bd2635;cursor:pointer}footer{margin-top:40px;padding-top:10px;border-top:1px solid #ddd;color:#888;font:11px Arial,sans-serif}.print-button{position:fixed;right:20px;top:20px;padding:9px 14px;border:0;background:#bd2635;color:white;cursor:pointer}@media(max-width:640px){main{padding:20px 14px}.cover h1{font-size:32px}.field-grid{grid-template-columns:1fr}.script-dialogue{max-width:90%}}@media print{.print-button{display:none}.cover{min-height:65vh}a{color:inherit}}
</style><style>.storyboard-report-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.storyboard-report-card{min-width:0;padding:10px;border:1px solid #ddd;border-top:3px solid #bd2635;break-inside:avoid;page-break-inside:avoid}.storyboard-report-frame{display:grid;place-items:center;aspect-ratio:16/9;overflow:hidden;background:#222}.storyboard-report-frame img{display:block;width:100%;height:100%;object-fit:contain}.storyboard-report-frame span{color:#ddd;font:italic 12px Arial,sans-serif}.storyboard-report-card h3{margin:9px 0 3px}.storyboard-report-duration{margin:4px 0;color:#bd2635;font:700 12px Arial,sans-serif}@media(max-width:640px){.storyboard-report-grid{grid-template-columns:1fr}}@media print{.storyboard-report-card{break-inside:avoid;page-break-inside:avoid}}</style></head><body><button class="print-button" onclick="window.print()">Imprimer / PDF</button><main><header class="cover"><div class="eyebrow">Dossier de projet · ${htmlEscape(projectName)}</div><h1>${htmlEscape(title)}</h1><div class="subtitle">${htmlEscape(S.author||'')}</div><div class="rule"></div><div class="meta">Exporté le ${htmlEscape(generated)}<br>${S.blocks.filter(block=>block.t==='scene').length} scène(s) · ${characters().length} personnage(s) · ${(S.ideas||[]).length} idée(s)</div><nav class="toc"><h2>Sommaire</h2><ol>${toc}</ol></nav></header>${blocks}${charactersSection}${locationsSection}${sequencer}${timelines}${storyboard}${ideas}${board}<footer>Dossier généré depuis le projet « ${htmlEscape(projectName)} ».</footer></main></body></html>`;
}
function exportFullProject(){
const html=buildProjectReport(),blob=new Blob([html],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');
const name=(S.title||activeProject().name||'projet').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'_').replace(/^_+|_+$/g,'')||'projet';
link.href=url;link.download=name+'_dossier_complet.html';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('ti').value=S.title||'';$('au').value=S.author||'';
$('ti').oninput=e=>{S.title=e.target.value;save()};$('au').oninput=e=>{S.author=e.target.value;save()};
$('ps').onchange=()=>{save();activeProjectId=$('ps').value;S=clone(activeProject().data);selectedCharacterId=null;selectedLocationId=null;updateDocumentFields();render();renderCharacters();save()};
$('pn').onclick=()=>addProject(uniqueProjectName('Nouveau projet'));
$('pr').onclick=()=>{const project=activeProject(),name=window.prompt('Nouveau nom du projet :',project.name);if(!name||!name.trim())return;
const cleaned=name.trim();if(projectStore.projects.some(item=>item.id!==project.id&&item.name.toLowerCase()===cleaned.toLowerCase())){window.alert('Un projet porte déjà ce nom.');return}
project.name=cleaned;save();updateProjectControls()};
$('pd').onclick=()=>{const project=activeProject();if(!window.confirm('Supprimer le projet « '+project.name+' » ? Cette action est définitive.'))return;
projectStore.projects=projectStore.projects.filter(item=>item.id!==project.id);
deleteProjectJsonHandle(project.id).catch(()=>{});
if(!projectStore.projects.length){const replacement=freshProject('Nouveau projet',{title:'',author:'',blocks:[{t:'scene',x:''}]});projectStore.projects.push(replacement)}
activeProjectId=projectStore.projects[0].id;S=clone(activeProject().data);updateProjectControls();updateDocumentFields();render();save()};
$('saveProject').onclick=saveProjectNow;
$('saveProject').title='Enregistrer maintenant et actualiser le JSON lié (Ctrl+S)';
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();saveProjectNow()}});
$('linkProjectJson').onclick=linkActiveProjectJson;
$('linkProjectJson').title='Choisir le fichier JSON qui sera actualisé automatiquement toutes les 30 minutes';
$('exportProject').onclick=downloadProject;
$('importProject').onclick=()=>$('projectFile').click();
$('projectFile').onchange=e=>{importProjectFile(e.target.files[0]);e.target.value=''};
$('characterForm').addEventListener('input',e=>{
const field=e.target.closest('[data-character-field]'),character=selectedCharacter();if(!field||!character)return;
character[field.dataset.characterField]=field.value;if(field.dataset.characterField==='name')renderCharacterList();save();
});
$('characterPdfText').oninput=e=>{const character=selectedCharacter();if(character){character.pdfText=e.target.value;save()}};
$('newCharacter').onclick=()=>{const character=newCharacter();characters().push(character);selectedCharacterId=character.id;save();renderCharacters();$('characterForm').querySelector('[data-character-field="name"]').focus()};
$('deleteCharacter').onclick=()=>{const character=selectedCharacter();if(!character||!window.confirm('Supprimer la fiche de « '+character.name+' » et ses relations ?'))return;
S.characters=characters().filter(item=>item.id!==character.id);S.relationships=relationships().filter(relation=>relation.from!==character.id&&relation.to!==character.id);selectedCharacterId=null;save();renderCharacters()};
$('addCharacterField').onclick=()=>{const character=selectedCharacter();if(!character)return;(character.customFields||(character.customFields=[])).push({label:'',value:''});save();renderCharacterEditor()};
$('addPowerStat').onclick=()=>{const character=selectedCharacter();if(!character)return;(character.powerStats||(character.powerStats=[])).push({id:uid(),label:'Nouvelle statistique',value:''});save();renderPowerStats(character)};
$('addRelationship').onclick=()=>{const character=selectedCharacter(),other=characters().find(item=>item.id!==selectedCharacterId);if(!character||!other){window.alert('Créez un deuxième personnage pour ajouter une relation.');return}
relationships().push({id:uid(),from:character.id,to:other.id,type:'Autre',description:''});save();renderCharacterRelations()};
$('importCharacterPdf').onclick=()=>$('characterPdf').click();
$('characterPdf').onchange=e=>{importCharacterPdf(e.target.files[0]);e.target.value=''};
$('chooseCharacterPortrait').onclick=()=>$('characterPortraitFile').click();
$('characterPortraitFile').onchange=e=>{storeCharacterPortrait(e.target.files[0]);e.target.value=''};
$('removeCharacterPortrait').onclick=()=>{const character=selectedCharacter();if(character){character.portrait='';save();renderCharacterEditor()}};
$('bx').onclick=()=>{$('ex').value=fountain();$('dg').showModal()};
$('exportFullProject').onclick=exportFullProject;
$('cl').onclick=()=>$('dg').close();
$('cp').onclick=async()=>{const t=$('ex');try{await navigator.clipboard.writeText(t.value);$('cp').textContent='Copié ✓'}catch(e){t.select();$('cp').textContent='Sélectionné : Ctrl+C'}setTimeout(()=>$('cp').textContent='Copier',1800)};
$('bp').onclick=()=>{try{window.print()}catch(e){}};
$('bn').onclick=()=>{if(!armed){armed=true;$('bn').textContent='Effacer tout ? Cliquer pour confirmer';setTimeout(()=>{armed=false;$('bn').textContent='Nouveau'},3000);return}
armed=false;$('bn').textContent='Nouveau';S={title:'',author:'',blocks:[{t:'scene',x:''}]};$('ti').value='';$('au').value='';save();render(0,0)};
function uid(){return Math.random().toString(36).slice(2,9)}
function ids(){S.blocks.forEach(b=>{if(!b.id)b.id=uid()})}
const bd=()=>S.board||(S.board={pos:{},links:[],free:[],zones:[]});
const KC={scene:'#a8442c',char:'#3b7dd8',lieu:'#2f9e6b',idée:'#d4a017',note:'#8a8a8a'},KL={scene:'Scène',char:'Personnage',lieu:'Lieu',idée:'Idée',note:'Note'};
const bv=$('bv');let view={x:20,y:20,k:1},els={},zoneMode=false;
const cn=x=>x.trim().toUpperCase().replace(/\s*\(.*\)$/,'');
function bnodes(){ids();const out=[],chs={};let sc=0;
S.blocks.forEach((b,i)=>{if(b.t==='scene'){sc++;let sn='';for(let j=i+1;j<S.blocks.length&&S.blocks[j].t!=='scene';j++)if(S.blocks[j].t==='action'&&S.blocks[j].x.trim()){sn=S.blocks[j].x.trim();break}
out.push({k:'b:'+b.id,kind:'scene',title:sc+'. '+(b.x.trim()||'(sans titre)').toUpperCase(),text:sn.slice(0,90)+(sn.length>90?'…':'')})}
if(b.t==='char'&&b.x.trim()){const n=cn(b.x);chs[n]=(chs[n]||0)+1}});
Object.keys(chs).forEach(n=>out.push({k:'c:'+n,kind:'char',title:n,text:chs[n]+' réplique'+(chs[n]>1?'s':'')}));
bd().free.forEach(f=>out.push({k:f.k,kind:f.kind,free:true,text:f.text}));return out}
function brender(){const B=bd(),ns=bnodes(),w=$('w');B.zones=B.zones||[];w.querySelectorAll('.node,.group-zone').forEach(n=>n.remove());els={};
 B.zones.forEach(zone=>{
const d=document.createElement('div');d.className='group-zone';d.dataset.zoneId=zone.id;d.style.left=zone.x+'px';d.style.top=zone.y+'px';d.style.width=zone.width+'px';d.style.height=zone.height+'px';d.style.setProperty('--zone-color',zone.color||'#a8442c');
const bar=document.createElement('div');bar.className='zone-bar';
const label=document.createElement('input');label.type='text';label.value=zone.label||'Groupe';label.setAttribute('aria-label','Nom de la zone');label.oninput=()=>{zone.label=label.value;save()};
const color=document.createElement('input');color.type='color';color.value=zone.color||'#a8442c';color.title='Couleur de la zone';color.setAttribute('aria-label','Couleur de la zone');color.oninput=()=>{zone.color=color.value;d.style.setProperty('--zone-color',zone.color);save()};
const remove=document.createElement('button');remove.type='button';remove.className='zone-delete';remove.textContent='×';remove.title='Supprimer la zone';remove.setAttribute('aria-label','Supprimer la zone');remove.onclick=()=>{pushUndo();B.zones=B.zones.filter(item=>item.id!==zone.id);save();brender()};
bar.append(label,color,remove);const resize=document.createElement('button');resize.type='button';resize.className='zone-resize';resize.title='Redimensionner la zone';resize.setAttribute('aria-label','Redimensionner la zone');d.append(bar,resize);w.append(d);
});
const nsc=ns.filter(n=>n.kind==='scene').length,baseY=40+Math.ceil(nsc/4)*150+50;let si=0,ci=0;
ns.forEach(n=>{if(!B.pos[n.k]){if(n.kind==='scene')B.pos[n.k]={x:40+(si%4)*240,y:40+Math.floor(si/4)*150};else if(n.kind==='char')B.pos[n.k]={x:40+(ci%4)*240,y:baseY+Math.floor(ci/4)*120};else B.pos[n.k]={x:60,y:60}}
if(n.kind==='scene')si++;if(n.kind==='char')ci++;
const p=B.pos[n.k],d=document.createElement('div');d.className='node';d.style.setProperty('--c',KC[n.kind]);d.dataset.k=n.k;d.style.left=p.x+'px';d.style.top=p.y+'px';
d.innerHTML='<i class="pt pl" data-s="l"></i><i class="pt pr" data-s="r"></i><i class="pt ptop" data-s="t"></i><i class="pt pbot" data-s="b"></i><div class="nk"><span>'+KL[n.kind]+'</span><span class="nk-actions"><button class="fav" title="Favori" aria-label="Basculer favori">'+(B.fav&&B.fav[n.k]?'★':'☆')+'</button>'+(n.free?'<button class="x" title="Supprimer">×</button>':'')+'</span></div>';
d.classList.toggle('is-fav',!!(B.fav&&B.fav[n.k]));
d.querySelector('.fav').onclick=()=>{pushUndo();B.fav=B.fav||{};if(B.fav[n.k])delete B.fav[n.k];else B.fav[n.k]=true;save();brender()};
if(n.free){const ta=document.createElement('textarea');ta.value=n.text;ta.placeholder='Écrire…';ta.oninput=()=>{if(!ta.dataset.u){pushUndo();ta.dataset.u='1'}B.free.find(f=>f.k===n.k).text=ta.value;fit(ta);fitNodeHeight(d,B.size&&B.size[n.k]?.height);save();drawLinks()};d.append(ta);
ta.onblur=()=>{delete ta.dataset.u};
d.querySelector('.x').onclick=()=>{pushUndo();B.free=B.free.filter(f=>f.k!==n.k);delete B.pos[n.k];if(B.fav)delete B.fav[n.k];B.links=B.links.filter(l=>l[0]!==n.k&&l[1]!==n.k);save();brender()}}
else{const t=document.createElement('div');t.className='nt';t.textContent=n.title;d.append(t);if(n.text){const s=document.createElement('div');s.className='ns';s.textContent=n.text;d.append(s)}}
const size=B.size&&B.size[n.k];if(size){d.style.width=size.width+'px';d.style.fontSize=(size.fontSize||12)+'px'}
const resize=document.createElement('button');resize.type='button';resize.className='node-resize';resize.title='Redimensionner le nœud';resize.setAttribute('aria-label','Redimensionner le nœud');d.append(resize);
w.append(d);els[n.k]=d});
w.querySelectorAll('.node textarea').forEach(fit);
w.querySelectorAll('.node').forEach(node=>fitNodeHeight(node,B.size&&B.size[node.dataset.k]?.height));
drawLinks()}
function ep(k,side){const e=els[k],p=bd().pos[k],w=e.offsetWidth,h=e.offsetHeight;return side==='l'?[p.x,p.y+h/2]:side==='t'?[p.x+w/2,p.y]:side==='b'?[p.x+w/2,p.y+h]:[p.x+w,p.y+h/2]}
const PORT_DIR={l:[-1,0],r:[1,0],t:[0,-1],b:[0,1]},PORT_OPPOSITE={l:'r',r:'l',t:'b',b:'t'};
function nearestSide(rect,x,y){const d={l:Math.abs(x-rect.left),r:Math.abs(x-rect.right),t:Math.abs(y-rect.top),b:Math.abs(y-rect.bottom)};return Object.keys(d).reduce((best,side)=>d[side]<d[best]?side:best,'l')}
function fitNodeHeight(node,requestedHeight){
const B=bd(),key=node.dataset.k;B.size=B.size||{};
const stored=B.size[key]||{},minimum=parseFloat(getComputedStyle(node).minHeight)||64;
node.style.height='auto';
const styles=getComputedStyle(node),borders=parseFloat(styles.borderTopWidth)+parseFloat(styles.borderBottomWidth);
const height=Math.max(minimum,Number(requestedHeight)||0,node.scrollHeight+borders);
node.style.height=height+'px';
if(height>(Number(stored.height)||0))B.size[key]={...stored,height};
return height;
}
function pth(a,b,sa='r',sb='l'){const reach=Math.max(50,Math.hypot(b[0]-a[0],b[1]-a[1])/2),da=PORT_DIR[sa],db=PORT_DIR[sb];return`M${a[0]},${a[1]}C${a[0]+da[0]*reach},${a[1]+da[1]*reach} ${b[0]+db[0]*reach},${b[1]+db[1]*reach} ${b[0]},${b[1]}`}
function drawLinks(){const B=bd();B.links=B.links.filter(l=>els[l[0]]&&els[l[1]]);
$('sv').innerHTML=B.links.map((l,i)=>{const sa=l[2]||'r',sb=l[3]||'l',d=pth(ep(l[0],sa),ep(l[1],sb),sa,sb);return`<g class="g"><path class="lk" d="${d}"/><path class="hit" data-i="${i}" d="${d}"><title>Cliquer pour supprimer le lien</title></path></g>`}).join('')+'<path id="tmp" class="lk tmp" d=""/>'}
function addLink(a,b,sa='r',sb='l'){const B=bd();if(a===b||B.links.some(l=>(l[0]===a&&l[1]===b)||(l[0]===b&&l[1]===a)))return;B.links.push([a,b,sa,sb])}
function tc(e){const r=bv.getBoundingClientRect(),m=new DOMMatrix(getComputedStyle($('w')).transform).inverse(),p=new DOMPoint(e.clientX-r.left,e.clientY-r.top).matrixTransform(m);return[p.x,p.y]}
function applyView(){$('w').style.transform=`translate(${view.x}px,${view.y}px) scale(${view.k})`}
function zoom(f,mx,my){const k0=view.k,k=Math.min(2,Math.max(.3,k0*f));mx=mx??bv.clientWidth/2;my=my??bv.clientHeight/2;view.x=mx-(mx-view.x)*k/k0;view.y=my-(my-view.y)*k/k0;view.k=k;applyView()}
function drag(mv,up){const m=e=>mv(e),u=e=>{removeEventListener('pointermove',m);removeEventListener('pointerup',u);up&&up(e)};addEventListener('pointermove',m);addEventListener('pointerup',u)}
const touches=new Map();let pinchDistance=0;
addEventListener('pointerdown',e=>{if(e.pointerType!=='touch'||!bv.contains(e.target))return;touches.set(e.pointerId,[e.clientX,e.clientY]);if(touches.size===2){const[a,b]=[...touches.values()];pinchDistance=Math.hypot(a[0]-b[0],a[1]-b[1])}},true);
addEventListener('pointermove',e=>{if(!touches.has(e.pointerId))return;touches.set(e.pointerId,[e.clientX,e.clientY]);if(touches.size!==2)return;const[a,b]=[...touches.values()],distance=Math.hypot(a[0]-b[0],a[1]-b[1]),rect=bv.getBoundingClientRect();if(pinchDistance)zoom(distance/pinchDistance,(a[0]+b[0])/2-rect.left,(a[1]+b[1])/2-rect.top);pinchDistance=distance});
const endTouch=e=>{touches.delete(e.pointerId);pinchDistance=0};addEventListener('pointerup',endTouch);addEventListener('pointercancel',endTouch);
bv.addEventListener('pointerdown',e=>{const t=e.target;
if(t.classList.contains('hit')){pushUndo();bd().links.splice(+t.dataset.i,1);save();drawLinks();return}
const zone=t.closest('.group-zone');
if(zone){const data=bd().zones.find(item=>item.id===zone.dataset.zoneId);if(!data)return;
if(t.classList.contains('zone-resize')){e.preventDefault();pushUndo();const start=tc(e),width=data.width,height=data.height;drag(ev=>{const point=tc(ev);data.width=Math.max(120,width+point[0]-start[0]);data.height=Math.max(80,height+point[1]-start[1]);zone.style.width=data.width+'px';zone.style.height=data.height+'px'},save);return}
if(t.closest('.zone-bar')&&!t.closest('input,button')){e.preventDefault();pushUndo();const start=tc(e),x=data.x,y=data.y;drag(ev=>{const point=tc(ev);data.x=x+point[0]-start[0];data.y=y+point[1]-start[1];zone.style.left=data.x+'px';zone.style.top=data.y+'px'},save);return}
if(t.closest('input,button'))return;
}
const nd=t.closest('.node');
if(nd&&t.classList.contains('node-resize')){e.preventDefault();pushUndo();const B=bd();B.size=B.size||{};const start=tc(e),width=nd.offsetWidth,height=nd.offsetHeight,baseFontSize=B.size[nd.dataset.k]?.fontSize||parseFloat(getComputedStyle(nd).fontSize)||12;
drag(ev=>{const point=tc(ev),nextWidth=Math.max(150,width+point[0]-start[0]),nextHeight=Math.max(64,height+point[1]-start[1]),scale=Math.sqrt(nextWidth/width*nextHeight/height),fontSize=Math.min(26,Math.max(9,baseFontSize*scale));nd.style.width=nextWidth+'px';nd.style.fontSize=fontSize+'px';B.size[nd.dataset.k]={...B.size[nd.dataset.k],width:nextWidth,fontSize};B.size[nd.dataset.k].height=fitNodeHeight(nd,nextHeight);drawLinks()},save);return}
if(t.closest('textarea,button,input'))return;
if(zoneMode&&!nd&&!zone){e.preventDefault();const start=tc(e),preview=document.createElement('div');preview.className='zone-preview';preview.style.left=start[0]+'px';preview.style.top=start[1]+'px';preview.style.width='0';preview.style.height='0';$('w').append(preview);
drag(ev=>{const point=tc(ev),x=Math.min(start[0],point[0]),y=Math.min(start[1],point[1]);preview.style.left=x+'px';preview.style.top=y+'px';preview.style.width=Math.abs(point[0]-start[0])+'px';preview.style.height=Math.abs(point[1]-start[1])+'px'},()=>{const x=parseFloat(preview.style.left),y=parseFloat(preview.style.top),width=parseFloat(preview.style.width),height=parseFloat(preview.style.height);preview.remove();if(width<60||height<45)return;
pushUndo();const B=bd();B.zones=B.zones||[];B.zones.push({id:uid(),label:'Groupe '+(B.zones.length+1),x,y,width,height,color:'#a8442c'});save();brender()});return}
if(t.classList.contains('pt')){e.preventDefault();const k=nd.dataset.k,side=t.dataset.s,a=ep(k,side);
drag(ev=>{const c=tc(ev);$('tmp').setAttribute('d',pth(a,c,side,PORT_OPPOSITE[side]))},ev=>{$('tmp').setAttribute('d','');const o=document.elementFromPoint(ev.clientX,ev.clientY),n2=o&&o.closest('.node');if(n2&&n2.dataset.k!==k){const k2=n2.dataset.k,side2=o.classList.contains('pt')?o.dataset.s:nearestSide(n2.getBoundingClientRect(),ev.clientX,ev.clientY);pushUndo();addLink(k,k2,side,side2);save();drawLinks()}});return}
if(nd){e.preventDefault();pushUndo();const k=nd.dataset.k,p=bd().pos[k],s=tc(e),o=[p.x,p.y];
drag(ev=>{const c=tc(ev);p.x=o[0]+c[0]-s[0];p.y=o[1]+c[1]-s[1];nd.style.left=p.x+'px';nd.style.top=p.y+'px';drawLinks()},save);return}
const sx=e.clientX,sy=e.clientY,ox=view.x,oy=view.y;drag(ev=>{if(touches.size>1)return;view.x=ox+ev.clientX-sx;view.y=oy+ev.clientY-sy;applyView()})});
bv.addEventListener('wheel',e=>{e.preventDefault();const r=bv.getBoundingClientRect();zoom(e.deltaY<0?1.1:.9,e.clientX-r.left,e.clientY-r.top)},{passive:false});
bv.addEventListener('dblclick',e=>{const nd=e.target.closest('.node');if(!nd||nd.dataset.k[0]!=='b')return;const i=S.blocks.findIndex(b=>'b:'+b.id===nd.dataset.k);setView('w');if(i>=0)foc(i,0)});
const undoStacks={};
function undoState(){return undoStacks[activeProjectId]||(undoStacks[activeProjectId]={undo:[],redo:[]})}
function updateUndoButtons(){const state=undoState();$('undoBoard').disabled=!state.undo.length;$('redoBoard').disabled=!state.redo.length}
function pushUndo(){const state=undoState(),snapshot=JSON.stringify(S.board||null);if(state.undo.at(-1)!==snapshot){state.undo.push(snapshot);if(state.undo.length>80)state.undo.shift()}state.redo.length=0;updateUndoButtons()}
function restoreBoard(from,to){
const current=JSON.stringify(S.board||null);let snapshot=null;
while(from.length){const candidate=from.pop();if(candidate!==current){snapshot=candidate;break}}
if(snapshot!==null){to.push(current);S.board=JSON.parse(snapshot);save();brender()}
updateUndoButtons();
}
function undoBoard(){const state=undoState();restoreBoard(state.undo,state.redo)}
function redoBoard(){const state=undoState();restoreBoard(state.redo,state.undo)}
function addFree(kind){pushUndo();const B=bd(),k='n:'+uid();B.free.push({k,kind,text:''});B.pos[k]={x:(bv.clientWidth/2-view.x)/view.k-95+Math.random()*60,y:(bv.clientHeight/2-view.y)/view.k-40+Math.random()*60};save();brender()}
$('zoneDraw').onclick=()=>{zoneMode=!zoneMode;$('zoneDraw').classList.toggle('on',zoneMode);bv.classList.toggle('zone-mode',zoneMode);$('hint').textContent=zoneMode?'Glissez sur le fond du tableau pour dessiner une zone de groupe · cliquez de nouveau pour annuler':'Glissez une carte pour déplacer les nœuds · glissez un point pour créer un lien · double-cliquez une scène pour l’éditer'};
$('a1').onclick=()=>addFree('idée');$('a2').onclick=()=>addFree('lieu');$('a3').onclick=()=>addFree('note');
$('a4').onclick=()=>{pushUndo();const sc=S.blocks.filter(b=>b.t==='scene');for(let i=1;i<sc.length;i++)addLink('b:'+sc[i-1].id,'b:'+sc[i].id);save();brender()};
$('a5').onclick=()=>{pushUndo();let s=null;S.blocks.forEach(b=>{if(b.t==='scene')s=b.id;else if(b.t==='char'&&b.x.trim()&&s)addLink('c:'+cn(b.x),'b:'+s)});save();brender()};
$('a6').onclick=()=>{pushUndo();const B=bd();Object.keys(B.pos).forEach(k=>{if(k[0]!=='n')delete B.pos[k]});view={x:20,y:20,k:1};applyView();save();brender()};
$('z1').onclick=()=>zoom(.85);$('z2').onclick=()=>zoom(1.18);
$('favFilter').onclick=()=>{const on=!bv.classList.contains('fav-only');bv.classList.toggle('fav-only',on);$('favFilter').classList.toggle('on',on)};
$('undoBoard').onclick=undoBoard;$('redoBoard').onclick=redoBoard;
addEventListener('keydown',e=>{
if(currentView!=='b'||!(e.ctrlKey||e.metaKey)||e.target.closest('textarea,input'))return;
const key=e.key.toLowerCase();
if(key==='z'&&!e.shiftKey){e.preventDefault();undoBoard()}else if(key==='y'||(key==='z'&&e.shiftKey)){e.preventDefault();redoBoard()}
});
function setView(v){const g=v==='g',l=v==='l',w=v==='w',b=v==='b',i=v==='i',c=v==='c',p=v==='p',q=v==='q',a=v==='a',t=v==='t',st=v==='st';currentView=v;document.body.dataset.view=v;$('mv').hidden=!w;$('bv').hidden=!b;$('iv').hidden=!i;$('cv').hidden=!c;$('lv').hidden=!l;$('graphv').hidden=!g;$('vg').className=g?'on':'';$('vl').className=l?'on':'';$('pv').hidden=!p;$('seqv').hidden=!q;$('arcv').hidden=!a;$('chronov').hidden=!t;$('storyv').hidden=!st;$('tb').hidden=!w;$('chips').hidden=!w;$('bt').hidden=!b;$('it').hidden=!i;$('vw').className=w?'on':'';$('vb').className=b?'on':'';$('vi').className=i?'on':'';$('vc').className=c?'on':'';$('vp').className=p?'on':'';$('vseq').className=q?'on':'';$('varc').className=a?'on':'';$('vchrono').className=t?'on':'';$('vstory').className=st?'on':'';if(b){brender();applyView();updateUndoButtons()}if(i)irender();if(c)renderCharacters();if(l)renderLocations();if(g)renderChartsTab();if(p)renderPowerScaling();if(q)renderSequencer();if(a)renderCharacterArc();if(t)renderTimeline();if(st)renderStoryboard()}
$('vw').onclick=()=>setView('w');$('vb').onclick=()=>setView('b');
$('vc').onclick=()=>setView('c');
$('vl').onclick=()=>setView('l');
$('locationForm').addEventListener('input',e=>{const field=e.target.closest('[data-location-field]'),location=selectedLocation();if(!field||!location)return;location[field.dataset.locationField]=field.value;if(field.dataset.locationField==='name')renderLocations();save()});
$('locationForm').addEventListener('change',e=>{const field=e.target.closest('[data-location-field]'),location=selectedLocation();if(field&&location){location[field.dataset.locationField]=field.value;save()}});
$('newLocation').onclick=()=>{const location=newLocation();locations().push(location);selectedLocationId=location.id;save();renderLocations();$('locationForm').querySelector('[data-location-field="name"]').focus()};
$('detectLocations').onclick=detectLocations;
$('deleteLocation').onclick=()=>{const location=selectedLocation();if(!location||!window.confirm('Supprimer la fiche de « '+location.name+' » ?'))return;S.locations=locations().filter(item=>item.id!==location.id);selectedLocationId=null;save();renderLocations()};
$('chooseLocationImage').onclick=()=>$('locationImageFile').click();
$('locationImageFile').onchange=async e=>{const file=e.target.files[0];e.target.value='';const location=selectedLocation();if(!file||!location)return;try{location.image=await compressStoryboardImage(file);save();renderLocations()}catch(error){window.alert('Impossible de charger cette image.')}};
$('removeLocationImage').onclick=()=>{const location=selectedLocation();if(location){location.image='';save();renderLocations()}};
$('varc').onclick=()=>setView('a');
$('vp').onclick=()=>setView('p');
$('vseq').onclick=()=>setView('q');
$('pvDetail').onclick=()=>{powerSubtab='detail';renderPowerScaling()};
$('pvStats').onclick=()=>{powerSubtab='stats';renderPowerScaling()};
$('addRadarAxis').onclick=()=>{radarData().axes.push({id:uid(),label:'Nouvel axe'});save();renderPowerStatsView()};
$('arcType').onchange=()=>{const character=selectedCharacter();if(!character)return;(character.arc||(character.arc=defaultCharacterArc())).type=$('arcType').value;save()};
$('arcPanel').addEventListener('input',event=>{const field=event.target.closest('[data-arc-field]'),character=selectedCharacter();if(!field||!character)return;(character.arc||(character.arc=defaultCharacterArc()))[field.dataset.arcField]=field.value;save()});
$('vchrono').onclick=()=>setView('t');
$('vg').onclick=()=>setView('g');
$('vstory').onclick=()=>setView('st');
$('addStoryPanel').onclick=()=>addStoryboardShot();
$('exportAnimatic').onclick=event=>exportAnimatic(null,event.currentTarget);
$('playAnimatic').onclick=toggleAnimatic;
$('stopAnimatic').onclick=()=>stopAnimatic(true);
$('animaticScrubber').oninput=scrubAnimatic;
$('importStoryAudio').onclick=()=>$('storyAudioFile').click();
$('storyAudioFile').onchange=e=>{importStoryboardAudio(e.target.files[0]);e.target.value=''};
$('removeStoryAudio').onclick=removeStoryboardAudio;
$('storyAudio').onloadedmetadata=()=>{if(animaticTimer)syncStoryboardAudio(animaticElapsed,true)};
$('addTimeline').onclick=addTimeline;
const chartSetting=(id,apply,event='oninput')=>{$(id)[event]=()=>{const timeline=activeChartHolder();if(!timeline)return;const chart=chartData(timeline);apply(chart,activeChartSeries(chart),$(id));save();drawTimelineChart(timeline)}};
const chartBound=(id,key)=>{$(id).onchange=()=>{const timeline=activeChartHolder();if(!timeline)return;const chart=chartData(timeline),value=Number($(id).value);if(Number.isFinite(value)){chart[key]=value;const isX=key[0]==='x',min=isX?'xMin':'yMin',max=isX?'xMax':'yMax';if(chart[max]<=chart[min]){if(key===max)chart[min]=chart[max]-1;else chart[max]=chart[min]+1}chart.series.forEach(series=>series.points.forEach(point=>{const axis=isX?'x':'y';point[axis]=Math.max(chart[min],Math.min(chart[max],point[axis]))}))}save();renderTimelineChart(timeline)}};
chartSetting('chartTitle',(chart,series,el)=>{chart.title=el.value});chartSetting('chartXUnit',(chart,series,el)=>{chart.xUnit=el.value.trim()});chartSetting('chartYUnit',(chart,series,el)=>{chart.yUnit=el.value.trim()});
chartSetting('chartXStep',(chart,series,el)=>{chart.xStep=Math.max(0,Number(el.value)||0)});chartSetting('chartYStep',(chart,series,el)=>{chart.yStep=Math.max(0,Number(el.value)||0)});
chartSetting('chartXFormat',(chart,series,el)=>{chart.xFormat=el.value},'onchange');chartSetting('chartYFormat',(chart,series,el)=>{chart.yFormat=el.value},'onchange');
$('chartSelect').onchange=()=>{S.activeChartId=$('chartSelect').value;save();renderChartsTab()};
$('addChart').onclick=()=>{const charts=chartsStore(),holder={id:uid(),name:'Graphique '+(charts.length+1)};chartData(holder);charts.push(holder);S.activeChartId=holder.id;save();renderChartsTab();$('chartName').focus();$('chartName').select()};
$('chartName').oninput=()=>{const holder=activeChartHolder();if(!holder)return;holder.name=$('chartName').value;const option=[...$('chartSelect').options].find(item=>item.value===holder.id);if(option)option.textContent=holder.name||'Graphique';save()};
$('deleteChart').onclick=()=>{const holder=activeChartHolder();if(!holder||!window.confirm('Supprimer le graphique « '+(holder.name||'sans titre')+' » ?'))return;S.charts=chartsStore().filter(item=>item.id!==holder.id);S.activeChartId=S.charts[0]?.id||'';save();renderChartsTab()};chartSetting('chartXLabel',(chart,series,el)=>{chart.xLabel=el.value});chartSetting('chartYLabel',(chart,series,el)=>{chart.yLabel=el.value});
chartBound('chartXMin','xMin');chartBound('chartXMax','xMax');chartBound('chartYMin','yMin');chartBound('chartYMax','yMax');
chartSetting('chartCurve',(chart,series,el)=>{series.curve=el.value},'onchange');chartSetting('chartColor',(chart,series,el)=>{series.color=el.value});chartSetting('chartArea',(chart,series,el)=>{series.area=el.checked},'onchange');
$('chartSeriesName').oninput=()=>{const timeline=activeChartHolder();if(!timeline)return;const chart=chartData(timeline),series=activeChartSeries(chart);series.name=$('chartSeriesName').value;const option=[...$('chartSeries').options].find(item=>item.value===series.id);if(option)option.textContent=series.name||'Courbe';save();drawTimelineChart(timeline)};
$('chartSeries').onchange=()=>{const timeline=activeChartHolder();if(!timeline)return;chartData(timeline).activeSeries=$('chartSeries').value;save();renderTimelineChart(timeline)};
$('addChartSeries').onclick=()=>{const timeline=activeChartHolder();if(!timeline)return;const chart=chartData(timeline),series={id:uid(),name:'Courbe '+(chart.series.length+1),color:CHART_COLORS[chart.series.length%CHART_COLORS.length],curve:'smooth',area:false,points:[]};chart.series.push(series);chart.activeSeries=series.id;save();renderTimelineChart(timeline)};
$('deleteChartSeries').onclick=()=>{const timeline=activeChartHolder();if(!timeline)return;const chart=chartData(timeline),series=activeChartSeries(chart);if(chart.series.length<2||!window.confirm('Supprimer la courbe « '+series.name+' » et ses points ?'))return;chart.series=chart.series.filter(item=>item.id!==series.id);chart.activeSeries=chart.series[0].id;save();renderTimelineChart(timeline)};
$('addChartPoint').onclick=()=>{const timeline=activeChartHolder();if(!timeline)return;const chart=chartData(timeline),series=activeChartSeries(chart),last=series.points.at(-1),step=(chart.xMax-chart.xMin)/10;series.points.push({id:uid(),label:'',x:last?Math.min(chart.xMax,last.x+step):chart.xMin,y:(chart.yMin+chart.yMax)/2});save();renderTimelineChart(timeline)};
$('addTimelineEvent').onclick=addTimelineEvent;
$('menuToggle').onclick=()=>{const header=document.querySelector('header'),open=header.classList.toggle('menu-open');$('menuToggle').setAttribute('aria-expanded',String(open))};
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
const timelineSetting=(id,apply,event='onchange')=>{$(id)[event]=()=>{const timeline=activeTimeline();if(!timeline)return;apply(timeline,$(id));save();renderTimeline()}};
timelineSetting('tlMode',(timeline,el)=>{timeline.mode=el.value});
timelineSetting('tlSnap',(timeline,el)=>{timeline.snap=Number(el.value)||0});
timelineSetting('tlCompact',(timeline,el)=>{timeline.compact=el.checked});
timelineSetting('tlUnit',(timeline,el)=>{timelineScale(timeline).unit=el.value.trim()});
timelineSetting('tlMin',(timeline,el)=>{const scale=timelineScale(timeline);scale.min=Number(el.value)||0;if(scale.max<=scale.min)scale.max=scale.min+1});
timelineSetting('tlMax',(timeline,el)=>{const scale=timelineScale(timeline);scale.max=Number(el.value)||0;if(scale.max<=scale.min)scale.min=scale.max-1});
timelineSetting('tlFormat',(timeline,el)=>{timelineScale(timeline).format=el.value});
$('tlZoomIn').onclick=()=>{const timeline=activeTimeline();if(!timeline)return;timeline.zoom=Math.min(6,Math.round(((Number(timeline.zoom)||1)+.5)*10)/10);save();renderTimeline()};
$('tlZoomOut').onclick=()=>{const timeline=activeTimeline();if(!timeline)return;timeline.zoom=Math.max(1,Math.round(((Number(timeline.zoom)||1)-.5)*10)/10);save();renderTimeline()};
[['tlFilterChar','character'],['tlFilterLoc','location'],['tlFilterColor','color']].forEach(([id,key])=>{$(id).onchange=()=>{timelineUI.filter[key]=$(id).value;renderTimeline()}});
$('tlFilterReset').onclick=()=>{timelineUI.filter={character:'',location:'',color:''};renderTimeline()};
$('tlAddPeriod').onclick=()=>{const timeline=activeTimeline();if(!timeline)return;(timeline.periods||(timeline.periods=[])).push({id:uid(),label:'Période '+((timeline.periods||[]).length+1),start:0,end:250,color:CHART_COLORS[(timeline.periods||[]).length%CHART_COLORS.length]});save();renderTimeline()};
$('tlUndo').onclick=()=>restoreTimelines(-1);$('tlRedo').onclick=()=>restoreTimelines(1);
$('tlFromScenes').onclick=generateTimelineFromScenes;$('tlExport').onclick=exportTimelineSvg;
addEventListener('keydown',e=>{
if(currentView!=='t'||!(e.ctrlKey||e.metaKey)||e.target.closest('textarea,input,select'))return;
const key=e.key.toLowerCase();
if(key==='z'&&!e.shiftKey){e.preventDefault();restoreTimelines(-1)}else if(key==='y'||(key==='z'&&e.shiftKey)){e.preventDefault();restoreTimelines(1)}
});
$('timelineSelect').onchange=()=>{S.activeTimelineId=$('timelineSelect').value;save();renderTimeline()};
$('timelineName').oninput=()=>{const timeline=activeTimeline();if(!timeline)return;timeline.name=$('timelineName').value;const option=[...$('timelineSelect').options].find(item=>item.value===timeline.id);if(option)option.textContent=timeline.name||'Frise sans titre';save()};
$('deleteTimeline').onclick=()=>{const timeline=activeTimeline();if(!timeline||!window.confirm('Supprimer la frise « '+(timeline.name||'sans titre')+' » et ses événements ?'))return;S.timelines=timelineStore().filter(item=>item.id!==timeline.id);S.activeTimelineId=S.timelines[0]?.id||'';save();renderTimeline()};
$('applySequenceTemplate').onclick=applySequenceTemplate;
$('sequenceTemplate').onchange=updateSequenceDescription;
$('addSequenceBeat').onclick=addSequenceBeat;
const ITAG={Intrigue:'#a8442c',Personnage:'#3b7dd8',Dialogue:'#8e5bd1',Lieu:'#2f9e6b',Autre:'#8a8a8a'};
const ide=()=>S.ideas||(S.ideas=[]);let IF={tag:'',star:false,q:''};
const tagOpts=Object.keys(ITAG).map(t=>`<option>${t}</option>`).join('');
$('ct').innerHTML=tagOpts;$('ct').value='Autre';
function mb(t,f,ti){const b=document.createElement('button');b.textContent=t;b.title=ti||'';b.onclick=f;return b}
function addIdeas(){const ta=$('ci'),v=ta.value.trim();if(!v)return;
const parts=($('cs').checked?v.split(/\n+/):[v]).map(s=>s.replace(/^\s*[-•*–]\s+/,'').trim()).filter(Boolean);
parts.reverse().forEach(t=>ide().unshift({id:uid(),t,tag:$('ct').value,star:false}));ta.value='';save();irender();ta.focus()}
$('ca').onclick=addIdeas;
$('ci').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();addIdeas()}};
function irender(){const tf=$('tf');tf.innerHTML='';
['',...Object.keys(ITAG)].forEach(t=>{const b=mb(t||'Toutes',()=>{IF.tag=t;irender()});b.className=IF.tag===t?'on':'';tf.append(b)});
$('sf').className=IF.star?'on':'';
const q=IF.q.toLowerCase(),all=ide(),R=all.filter(i=>(!IF.tag||i.tag===IF.tag)&&(!IF.star||i.star)&&(!q||i.t.toLowerCase().includes(q)));
$('ic').textContent=R.length+' / '+all.length+' idées';
const il=$('il');il.innerHTML='';
if(!R.length){il.innerHTML='<p class="em">Rien à afficher — notez tout ce qui vous passe par la tête dans la zone ci-dessus.</p>';return}
R.forEach(i=>{const d=document.createElement('div');d.className='idea';d.style.setProperty('--c',ITAG[i.tag]||ITAG.Autre);
const ta=document.createElement('textarea');ta.value=i.t;ta.oninput=()=>{i.t=ta.value;fit(ta);save()};
const bar=document.createElement('div');bar.className='ib';
const sel=document.createElement('select');sel.innerHTML=tagOpts;sel.value=i.tag;sel.onchange=()=>{i.tag=sel.value;save();irender()};
const st=mb(i.star?'★':'☆',()=>{i.star=!i.star;save();irender()},'Favori');
const bo=mb(i.sent?'✓ Au tableau':'→ Tableau',()=>{if(i.sent)return;pushUndo();const B=bd(),k='n:'+uid();B.free.push({k,kind:i.tag==='Lieu'?'lieu':'idée',text:i.t});B.pos[k]={x:-view.x/view.k+40+Math.random()*300,y:-view.y/view.k+40+Math.random()*200};i.sent=true;save();irender()},'Envoyer au tableau');
const x=mb('×',()=>{S.ideas=ide().filter(j=>j!==i);save();irender()},'Supprimer');
bar.append(sel,st,bo,x);d.append(ta,bar);il.append(d)});
il.querySelectorAll('textarea').forEach(fit)}
$('sf').onclick=()=>{IF.star=!IF.star;irender()};$('sq').oninput=e=>{IF.q=e.target.value;irender()};
$('vi').onclick=()=>setView('i');
render();
renderCharacters();
save();