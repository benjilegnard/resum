---
title: Meta-frameworks, une explication.
description: ''
published: false
lang: fr
---

# Meta-Frameworks

Ce que je vois plein de gens pas comprendre dans mes mentions. C'est le concept de meta-framework.

React, Vue, Svelte, Angular, Qwik etc, c'est des frameworks client: dans le navigateur

Mais Next.js (ou remix), Nuxt, SvelteKit, AnalogJS (❤️) et qwik-city c'est coté serveur.

---

On les prends deux par deux et on les utilise ensemble

React + Next.js ( ou Remix )
Vue + Nuxt
Svelte + sveltekit
Angular + Analogjs ( ou @angular/ssr )
Qwik + qwik-city

---

et on demande à notre framework front de tourner dans un moteur js coté serveur ( souvent node.js + express ) et de faire du rendu de page en fonction de l'url,

On mets tout le HTML dans une string, puis dans une réponse HTTP et voilà.

---

Ça a plusieurs intérets :

- la page est rendue coté serveur et cacheable
- on a accés au head de la page ( pas forcément facile dans un client SPA only ) : pour le SEO, c'est pratique
- on a accès aux entêtes de requêtes HTTP
- le code est partagé, entre back et front

---

y'en a d'autres, mais je passe

ca vient avec ses inconvénients:

- comment je partage mes définitions de route
- comment je ré-hydrate mes composants rendus coté serveur avec la version coté client

---

Et puis surtout 

- comment je fais comprendre à mes collègues dev front qu'il doivent pas utiliser des apis `browser-only`` parce que pas dispo coté serveur 
- comment je fais comprendre à l'infra qu'on est pas juste des ressources statiques
- comment je leur fait comprendre a tous que c'est du dev et pas du coloriage
---

J'en ai pratiqué des projets comme ça, et c'est pas nouveau.

Dès que t'as des projets à forte audience / visibilité, qui utilise un framework SPA, c'était des pré requis obligatoire. ( encore une fois perf ++ )

Par contre ça n'a rien à voir avec le "dev d'avant" ( php, jsp, etc... )

---

C'est pas parce que vous êtes bloqués dans un paradigme SPA pour le front et API REST pour le back, qu'on peut pas faire autrement.

La confusion du tweet initial de next, c'est que vous avez back vs front gravés dans vos têtes, et c'est néfaste pour vos projets ( AMHA )

---

Et justement revenons en à notre thread, c'est qu'une fois qu'on a des meta-frameworks qui sont coté serveur.

Pourquoi ne pas leur faire faire le boulot d'un back-end ?

Et comment on simplifie ca, maintenant que le front est coté back.

---

l'example de next.js il vous a choqué, mais si tu comprends que ton composant front, il est aussi exécuté coté back, bah il est ou le problème ?

on simplifie l'api, on regroupe ce qui change en même temps, ensemble.

bref, dés
---

bref, désolé pour encore un thread technique

mais vu la violence que je vois dans les mentions, je pense que le schisme back / front faut arrêter

mais bon vous savez:

"certaine choses ne veulent pas mourir"


Donc les gens qui ont les réponses les plus violentes dans mes mentions, vous avez juste bouffé le cool aid récent qu'il y a un métier de dev back et un métier de dev front ( et non, déso,)
