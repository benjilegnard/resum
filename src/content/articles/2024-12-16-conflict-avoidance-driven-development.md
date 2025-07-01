---
lang: fr 
---

On ne parle pas assez du "conflict-avoidance-driven-development".

Comment on optimise le code pour éviter les conflits de fusion.

Quelques astuces de tech lead pour ça, et a minima faciliter leur résolution :

---

Déjà il faut comprendre comment git repère un changement et pourquoi un conflit peut arriver.

Le code ajouté n'existe que par rapport au précédent.

Donc moins on modifie le code précédent : moins y'a de conflits (doh)

---

Première manière d'optimiser ça en JS: activer les trailingCommas.

Prenons une liste d'arguments:

maFunction(
  alpha,
  beta
)

Sans trailingCommas, ajouter un argument gamma, va me faire modifier la ligne précédente.

```diff
maFunction(
  alpha,
- beta
+  beta,
+  gamma,
)
```

Avec, le changement est juste un ajout de ligne plutôt qu'une modification.

```diff
maFunction(
  alpha,
  beta,
+ gamma,
)
```

C'est pas grand chose, mais à l'échelle, ça joue beaucoup.

Un des soucis à relever ici aussi c'est qu'un conflit arrive quand deux commits modifient la même ligne, ou s'ajoutent au même endroit.

---

Donc quand on a des listes d'imports, des déclarations d'objets dans des tableaux ou autres cas où tout le monde ajoute sa merde en dernière position : ça pète, obligatoirement.

Donc: éviter les "barrel-files" ( fichiers qui réexportent d'autres imports )

Et les "god-files" (je vous regarde fort, les "app.module.ts" et "app-routing.module.ts" pas découpés dans les codebase angular.

---

Quand c'est pas possible de les éviter, une piste pour mitiger ça : imposer un tri par ordre alphabétique.

Alors oui, c'est controversé et un peu pénible, mais c'est lintable et autofixable.

Sur les imports : 

import/order : https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md 

---

Le but c'est de rendre "prédictible" l'endroit ou est ajouté un élément.

Et ça peut aussi être détecté / auto-corrigé pour les clés d'un objet : 

sort-keys: https://eslint.org/docs/latest/rules/sort-keys

---

return-early: un des avantages du early return, c'est aussi que tout est à plat, et que vous allez pas modifier le chemin critique en ajoutant un else{} il est déjà et devrait toujours ềtre "à plat"

Y'en a d'autre, mais c'est pas le sujet.

---

Dans les règles indispensables, ayez toujours une codebase complétement raccord avec votre formattage et vos rêgles de lint auto-fixables.

Y'a rien de pire que de merger du code qui reformatte un autre à côté.

Ou d'avoir des devs dont l'excuse, "oh, c'est mon IDE qui a modifié ça, pas moi" 🙄

Vous ajouter une règle de lint: vous la corrigez partout dans le même commit.

Vous changez une configuration de formattage : pareil, le "on laissera les devs faire les boys scouts petit à petit" : poubelle

---

Optimiser pour éviter les conflits, c'est aussi identifier les points de rencontre.

Quand tout le monde modifie le même fichier de trad json à chaque PR, il est peut-être temps de le découper.

Faire des petits composants, des petits modules, des petites fonctions, et c'est comme tout, n'en faites pas non plus une religion

---

Certains diront que tout ça c'est du nitpick et n'a pas de valeur métier.

C'est le genre d'optimisation à faible coût qui évitent de s'arracher les cheveux par la suite.

Tousse tousse, la "developer experience"

évidemment, si t'es seuletout sur un projet, OSEF, YOLO.

Mais si tu atteins un nombre critique de développeurs (pour moi ca commence à 2), pensez-y.



