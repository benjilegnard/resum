# solved problems

J'aimerais élargir le propos du tweet sur les fuseaux horaires aux "problèmes déjà résolus" dans le développement logiciel 🧑‍💻

Parce que gérer une date, son format, son calendrier 📅

Ça fait partie des problèmes qu'on ne devrait plus avoir  à gérer... 

Mais c'est pas le seul 🧵

---

Et c'est dur d'identifier ce genre de problématiques...

Soit quand on débute 🧑‍🎓, 
soit quand on connaît pas les solutions existantes 😬, ou quand on est juste médiocre 😈

// ( je prends plus de gants ici, c'est fini 🖕 )

---

Perso je me bats constamment avec ça, devs qui pensent résoudre les problèmes en réinventant la roue...

et puis non-tech aussi hein, nos amis "product owner" ou "business analyst" ou maitre d'ouvrage ou autre (osef).

Il suffit d'exposer un problème pour avoir une solution.

---

📬 les algorithmes de tri

surtout que "j'apprends le bubble vs  merge vs quick ou chépluquoi sort" en sortie d'école est utilisé en mesure de compétence...

sauf qu'en fait ça sert à rien, il faut savoir que ça existe, peut-être mais on va pas réimplémenter...

---

j'ai 15 ans de carrière et le plus compliqué que j'ai du implémenter là dessus, c'est toujours une pauvre fonction compare(a,b): number, quel que soit le language.

( ou equals/hashcode tmtc)

use the platform luke, trust the community, on est trop stupides pour faire autrement.

---

🧮 la cryptographie

bordel restez loin de ça, soit vous en faites votre boulot / passion / passe-temps, soit vous utilisez des solutions établies, mais ne venez pas perdre du temps à inventer un algorithme de chiffrement.

utilisez ce qui existe, on est trop stupides... (encore)

---

Et franchement ça se résume à ça, soit t'es stupide et tu te lances dans la réimplantation de problèmes résolus, soit t'es trop intelligent.e et tu crois que tu vas les résoudre mieux ( spoiler: non pas mieux, différemment )

---

📦 la compression

Story time : je suis passé une fois sur un projet qui avait décidé d'utiliser un algo bizarre pour encoder en chinois tout ce qui était mis dans le localStorage. (c'était avant indexed db)

---

des semaines à débugger la solution à la fin. Des gens qui deviennent fous parce que tu peux rien faire avec le truc zippé en prod. que des emmerdes.

pourquoi ? parce que tout l'état local était dedans ( et ressorti / recompressé sans arrêt ) 

encore une fois on est trop bêtes

---

En vrai c'est anecdotique, mais d'où tu crois sortir un meilleur algo de compression que gzip dans un projet de gestion de rendement agricoles ?

Solutionnisme / Technocratie encore et toujours

--- 

Bref pour conclure, tout ça c'est certes  des problèmes à connaître quand tu fais de l'informatique. mais justement à connaître pour ne pas avoir à les résoudre. ou pour ne pas appliquer des solutions là ou il faut pas

---
Est ce qu'on est là pour "résoudre des problèmes" et ça n'importe qui peut le faire dans son coin, ou est ce qu'on est là pour "répondre à un besoin" ?

J'en sais rien et je m'en fous

---
Juste plus j'avance, plus le plus souvent les problèmes sont humains, sociétaux. inter-classes, inter-personnels. 

Et c'est pas la technique va résoudre ça.
