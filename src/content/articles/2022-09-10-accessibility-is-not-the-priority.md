---
title: L'accessibilité n'est pas la priorité, et c'est nul
description: On mets trop souvent l'accessibilité de cotê
published: false
lang: fr
---

Alors par ou commencer sur le combat sans fin de l'accessibilité dans le développement web, petit thread complètement foutraque de choses que j'ai rencontré dans ma carrière et comment les combattre, orienté développeurs donc désolé pour le jargon 🧵👇

- avant de déchainer les passions en tout genre, je suis pas expert en accessibilité numérique mais j'ai beaucoup d'expérience là dedans et vu que ca se pinaille souvent dans le domaine sur telle ou telle pratique, avertissement: ca sera insta-block direct. j'ai pas votre temps. Venez pas m'apprendre mon métier

- ça sera très orienté développement web donc désolé pour le jargon 

- Commencons par le ou la dev de base qui va faire du code que je dois rejeter parce qu'empilage de balises div , un seul gestionnaire d'évenement au click, et quand tu lui dit oui mais le focus ? oui mais le clavier ou touche entrée, ca pleure en ouin ouin c'était pas demandé. 

- le "good enough" ou "minimum viable product" est l'ennemi de l'accessibilité parce qu'on traite ça en "améliorations pour plus tard". ça marche dans le cas passant, donc on envoie en prod direct, en excluant une grosse partie des utilisateurs. 

- je ne peux que recommmander la conf 'agile is ablist' pour les convaincus du 'process over people' also known as scrum, scale et autre horreurs du genre.

- le fameux principe "make it work, make it nice, make it fast". Pour moi la plupart des devs s'arrêtent au premier, Faire en sorte que ça fonctionne, mais juste pour moi, valide. Ca demande un minimum d'empathie de se forcer à le rendre disponible pour tous. Et on est pas égaux là dedans.

- le classique: est-ce un lien ou un bouton ? mettez en place des styles communs pour les deux dans votre design system, sur mon projet actuel j'ai une directive qui s'applique aussi bien sur lien que sur button pour faire le taf et c'est le bonheur.

- je ne compte plus le nombre de clients qui m'ont fait des demandes pour enlever le "outline" qui apparait au focus. Il faut savoir dire non ou merde à son client, quitte à passer 3 heures en réunion derrière à expliquer pourquoi on enlèvera pas un indicateur de focus juste parce que "c'est pas quali" sur les visuels (vécu).

- aujourd'hui on peut tout à fait styler comme on veut cet indicateur :  c'est à prendre en compte ( https://developer.mozilla.org/en-US/docs/Web/CSS/outline ) dans votre design system. Le fameux "*{ outline: none; }" pour enlever les pointillés, on oublie.

- les UX/UI, plus communéments appelés graphistes qui veulent pas changer les couleurs parce que "c'est l'image des marque" : bah oui mais tes couleurs pastels elles sont bien mais on y lit rien. Ce qui marche pas mal pour les convaincre eux c'est les simulateur de daltonisme https://firefox-source-docs.mozilla.org/devtools-user/accessibility_inspector/simulation/index.html Montrez leur leurs jolies maquettes passé là dedans, iels changeront vite d'avis. 

- les UX/UI toujours, à qui il faut remonter le fait que c'est gentil, mais "ca s'enregistre tout seul", bah non il est ou le bouton d'action qui valide le formulaire ? comment tu indique à l'utilisateur que son action a été prise en compte ? comment tu lui explique les erreurs potentielles ? l'accessibilité ça commence par la conception, évitez l'implicite. Pas d'actions cachées ou magiques. Concevez les cas d'erreurs. 

- je suis de la team anti sigle: un sigle est une abbréviation orale qui n'a aucun sens à l'écrit, utilisez les balise <abbr> dès que possible, Et la c'est pas les devs qu'il faut secouer, c'est le commanditaire métier et son jargon qu'il faut recentrer.

- un des meilleurs projet que j'ai vécu sur l'accessibilité, les critères étaient dans la "definition of ready" des user stories, c'est hyper important. On réfléchit avant d'agir, on exprime clairement qu'est ce qu'on attends niveau accessibilité avant de coder. et pas après. Sinon ça coute

- d'ailleurs souvent les entreprises qui y font attention, c'est pas pour rien, elles se sont mangé des procès là dessus. souvent aux états-unis, souvent poursuivies par les vendeurs de lecteurs d'écran (LOL). Les amendes, ça marche.

- rappel que pour beaucoup de lecteurs d'écrans, une page HTML invalide est une page innaccessible, c'est peut -être tombé en désuétude parce qu'HTML5 est très permissif, mais faites valider vos pages, niveau w3c, vous serez surpris de ce que ça ressort : https://validator.w3.org/nu/

- une grosse difficulté de tout ça c'est l'éventail de solutions à devoir tester pour être certains de pas faire de la merde est assez énorme, entre JAWS, NVDA, VoiceOver, et j'en passe.

- j'ai un souvenir d'un chef de projet qui m'a sorti blanco "ah ils nous emmerdent les handicapés" quand on lui a chiffré le rework accessible d'un projet... 

- a l'époque j'étais trop junior et précaire pour réagir, aujourd'hui je lui soufflerais dans les bronches si violamment qu'il toucherait peut être la lune.

- les ESN sont très bonnes pour facturer leurs erreurs disait élie sloim, donc non, on évite ce genre de boulette et on pense à ca dès le début

- Oh on va faire des onglets, okay, tout est caché avec "display:none" et après on s'étonne que ça marche plus. Je me souviens d'un post de W3sch00l (fuyez ce site ) Qui montrait un accordéon avec du js et css only, Bah en fait non, ça suffit pas, il y a des patterns à suivre :

- ma plus grande expérience humblifiante ça a été de me retrouver face à un utilisateur aveugle d'un site sur lequel je bossais, et il me montre sans écran, avec son clavier braille en me disant ce qu'il lit que : il comprend rien, il sait plus ou il est.

- donc quand on  concoit une page pour tous, on fait attention à la hiérarchie de titre. et aux éléments focusables, essayez de naviguer dans vos pages avec unquement tab et shift+tab, et vous verrez tout ce qui est loupé.

- attention parfois les balises "sémantiques" sont en fait une pollution pour les lecteurs d'écran. il va s'arréter pour dire : élement: section élément "article", sans aucune valeur ajoutée. les attributs title ou aria-label sont plus importants que les balises sémantiques

- tout ce qui n'a pas de valeur ajoutée à être lue doit être ignorée, role="presentation" est votre meileur amis sur les balises  "présentationnelles"

- à propos de valeur ajoutée, fuyez les "Business Analyst" comme la peste, et autres personnes qui doivent trouver une "valeur business" à absolument tout. Que les applications soient accessible ou le code de qualité, ils s'en foutent, et mettront les critères d'acceptance en bas de la lsite.


- Il y a des outils pour vérifier tout ça quand on pousse pour, il faudrait que ca soit testé automatiquement "c'est pas dans le MVP". Ma recommandation: ajoutez "axe-core" dans vos tests end to end, et faite le remonter les erreurs sur chaque page finale : https://www.deque.com/axe/

- sur un poc alternatif j'ai utilisé axe-core dans un test  qui checke toute l'appli, voici le code : https://github.com/gotloop/ms-20/blob/feature/init-components-and-state/src/app.test.tsx 

- Prenez ça en compte dès le départ. Vous commencez un projet ? mettez vous des règles de lint qui vont bien (// todo regle a11y)

- humainement, formez vous ensemble dans une équipe à ce que ca veut dire de faire de l'accessible. => guides aria, qualité opquast etc. Renseignez vous sur comment les déficients (oh que je hais ce terme) visuels utilisent un smartphone par example. Tout le monde en sortira grandi.

- les développeuses et développeurs seront toujours les PREMIERS UTILISATEURS donc c'est à vous aussi quand vous développez des écrans de monter vos critères d'acceptances, débranchez vos souris. zoomez le texte et vérifiez que rien ne pête, que tout soit lisible. 

- on est clairement pas au niveau là dessus, j'ai jamais vu un projet parfait, mais ca ne tiens qu'a nous toutes et tous de faire en sorte que ca soit meux.

- fin du thread, refusez toujours d'accepter la médiocrité, jespère pas avoir été trop défaitiste et que vous aurez appris des trucs, bisous (// todo obama mic drop)
