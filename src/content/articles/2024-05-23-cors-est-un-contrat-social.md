Les entêtes CORS sont un contrat social, un thread 🧵👇

---

Qu'est ce qu'un contrat social déjà, c'est un contrat implicite entre deux parties,, parce qu'on vit dans une saucisse, dont personne a les régles.

C'est des règles qui se superposent à et qui sont plus puissantes que tes règles personnelles ou locales.

Genre... un protocole.

---

Donc par example si tu décides de renvoyer des erreurs avec un code HTTP 200 OK, c'est pas que rigolul osef.

jajaja programmerhummor toi même tu sais.

Tu as cassé surtout le contrat qui disait qu'un serveur ne devrait pas dire que tout est ok, mais qu'en fait non.

---

Dans le cas de CORS, en quoi c'est social ? bah tu prends deux parties, ton client front-end, dans le browser, et ton serveur, backend, quelque part sur l'ordinateur de quelqu'un.

Les entêtes CORS sont des contrats en amont pour valider qu'on parle bien à la bonne personne.

---

Salut, je vais t'envoyer une requête depuis tel domaine, vers tel domaine, avec tels arguments, est-ce que tu est prêt à les recevoir ?

Si cette requête initiale échoue, tout le reste est dans les choux.

Access-Control-Allow-Origin: "\*": la première erreur = osef de la gueule du monde

---

CORS dans le fond c'est quoi ? c'est un ensemble de régles mises en place pour éviter des failles de sécurité.

la plus

---

mises en place parce qu'aux début du web, on avait pas autant de filets de sécurité.

Et qu'on s'est retrouvé avec des attaques de pirates de types "homme dans le milieu"

(man in the middle, générique de malcom dans ta tête).

https://www.youtube.com/watch?v=x5Za8HggalY

---

Life is unfair,

Et donc quelqu'un de mal intentionné pouvait arriver, et dire : regarde moi, maintenant c'est moi le serveur.

---

et puis combien de devs savent qu'il existe un verbe HTTP OPTIONS ? vraiment ?

de base quand tu débutes, c'est soit GET, soit POST. je vois des devs p
