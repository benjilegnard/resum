---
lang: fr
---

# C'est l'histoire d'un poc

une semaine que je traîne cette branche, et c'est un parfait example de comment on passe d'un POC, à quelque chose de viable, testable et stable pour la suite...

// TODO git graph image

---

Allez, je vous explique, parce que c'était funky à concevoir et implémenter 🧵👇

Contexte: on est dans une application CRUD de gestion, donc plusieurs entités, avec chacune des écrans de liste qui permettent d'accéder à des écrans de détail (voir/éditer/créer/supprimer)

---

Premier truc à comprendre : j'ai 5 entités A, B, C, D, E

Il y a une relation parent <=> enfant entre chaque.

Un A contient une liste de B, B une liste de C, C liste de D etc.

Et donc pour chaque entité : écran de liste et de détail. (le MVP!)

---

On pourrait se dire naïvement "c'est simple, juste dix routes et dix écrans quoi..."

SAUF QUE, premier plot twist 🤯 : ( et c'est jamais simple )

Dans chaque écran de détail, on a des onglets listant les enfants

Sur A j'ai des listes de B,C,D,E, sur C des listes de D,E etc.

---

Et depuis chaque liste, je peux accéder à la consultation/édition de l'entité.

L'approche naïve, c'est : je fais des liens absolus

Tu es dans /liste-de-B/{id-de-B}/liste-de-C-de-B

Un clic sur une entrée C te redirige vers la page /liste-de-C/{id-de-C} et puis point barre.

---

SAUF QUE, deuxième plot-twist 🤯 :

J'ai un fil d'ariane en haut de chaque page.

Qui permet de remonter à la page parente d'où tu viens

Donc tu peux avoir :

Liste de A > détail A > liste de B > détail B > liste de C > détail C > liste de D > détail de D > liste de E etc...

---

Et évidemment ce mécanisme fil d'ariane complet, il n'est jamais dans chaque maquette, je l'ai découvert par hasard 😅

Et c'est "super attendu" par le métier, parce que dans l'ancienne appli, "ils se perdent" (et moi aussi).

---

Et puis dans ce fil d'ariane, il y a des données "dynamiques" que tu dois conserver d'une page précédente.

Donc l'approche du routage naîf/absolu, fait que notre fil d'ariane est de base conceptuellement buggé.

Il doit gérer un historique, et va casser au refresh de la page.

---

Bref pas viable, surtout qu'on va rajouter des sous-pages de partout ensuite. J'ai vu venir le truc gros comme une maison comme un piège de NFR jamais exprimées, donc premier truc : call 1on3 dev + po + design : est-ce que c'est bien ce que vous voulez ? le petit détail dans une maquette cachée là, qui change tout ?.

---

Et ensuite ç'est là que je sors la carte expert Angular, tkt, le Router, je le connais frère.

Parce que tout est possible, tout est réalisable et faire un fil d'ariane que parcourt juste l'état des routes actives, j'ai eu la vision direct (illustration : mon arbre de routage actuel)

---

Bref, reprise du thread le lendemain : le principe de base de ce que je veux "POC-ER", c'est que je découpe bien mes routes détail dans des tableaux réutilisable, et que je les importe en tant que routes enfants partout où c'est nécessaire...

---

Maintenant la phase POC, c'était YOLO, tout dans le méme fichier routes, les composants pas testés, liens en dur, pas de trad.

Le but, c'est de "démontrer" que c'est possible, et surtout que ça FONCTIONNE.

---

Petite phase exploratoire, parce qu'avec claude, c'est gratuit..

J'ai testé quelques trucs différents, avec du router-outlet nommé, avec des liens relatifs, calculés, franchement rien de décisif.

Que des hallucinations, parfois des fulgurances, quand je le guide

---

Mais j'arrive beaucoup plus vite avec claude au : ça ne marche pas, cette piste n'est pas viable, revenons en arrière, prenons de la hauteur.

Le voir galérer à comprendre ce qu'il vient de générer, quelle douleur.

---

Et puis très vite en se posant la question : est-ce que c'est compréhensible, est-ce que c'est simple de construire par dessus ? bah t'élimines.

On itère, la première implémentation n'est jamais la bonne, vous n'aurez jamais la bonne version du premier coup.

---

Et surtout : comment je simplifie les devs futurs pour que mes collègues n'aient RIEN À FAIRE (où presque).

Comment je cache la complexité et ne leur impose pas de pallier aux futurs manquements de mon implémentation par plus de code.

Faire un SOCLE.

---

Bref quand j'ai mon POC qui marche, refacto:
- ajout de tests utilisateurs avant, je veux que mon POC continue de fonctionner "high-level".
- ajout de lazy loading de toutes les routes plutôt que [...mesRoutes] dégueulasses.
- découpage mise en place des resolvers, mise en place de vraies "pages"

- passage de 4 composants de tests à 3/4 de socle, et une douzaine de "placeholder"
- documentation, explications, évangélisation, ajout de markdown guides partout.
- nitpicks nommage et qualimétrie, revue de code tout ça.

---

Ma solution finale utilise quelque features avancées du routage angular, mais pas tant que ça :

- loadChildren: partout pour éviter de faire un JS final de 15 mégas
- des "routes sans chemin" (pathless), avec pathMatch: ("prefix"|"full"), pour rediriger ou authoriser selon le contexte (plein de souplesse pour faire des groupes de routes enfants, des redirections.)
- puis titleResolver qui est pas très connu, chaque route peut avoir un title

---

Et bref, toutes les étapes "exploratoires" et expérimentations n'ont sorti des solutions ultra-compliquées alors qu'en fait, il fallait juste instancier plusieurs fois.

La solution la plus "simple" de première vue, est pas la plus souple. ça nécéssite encore de réfléchir avant, plutôt que de foncer dedans la tête baissée.

Notre objectif, ça devrait être toujours de simplifier, et clarifier avant d'implémenter, le coût de l'implem est réduit, donc tu peux te permettre d'expérimenter et de choisir la meilleure pour ton cas d'usage.

Le reste, c'est et ça a toujours été de la co-construction avec les autres. 
