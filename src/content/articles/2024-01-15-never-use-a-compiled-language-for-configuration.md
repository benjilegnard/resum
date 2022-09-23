Pratique que je (re-)découvre et qui est absolument terrible :

N'utilisez jamais TypeScript pour écrire votre configuration applicative, merci.

---

D'abord parce que vous ne voulez pas que votre configuration nécéssite un process de build pour être changée. Sinon ca veut dire : un build par environnement.

Et ca c'est la porte ouverte aux pipelines de l'enfer.

Un artifact livrable: doit être indépendant de l'environnement

---

J'ai envie de blamer les fichiers environment.ts qui étaient générés par le ng new angular

Le nombre de projet que j'ai vu avec 40OOO environment.xxx.ts alors que, c'était des executionMode.ts en fait

Mais j'ai vu des apps non angular avec des config.xxx.ts donc pas le sujet.

---

Petit rappel d'un des principes des 12factor
app:

- Stocker la configuration de l'environnement... dans l'environnement ( duh )
- Découpler le code de la configuration

https://12factor.net/fr/config

---

Là la conséquence incroyable que je découvre, c'est que vu que la configuration était en TS, ben y'a des devs qui se sont dit cool, je vais mettre des constructeur de classes dedans.

Adieu le découplage. Un changement de conf = une compilation = un livrable, au secours.

---

Pour remettre un peu de contexte au thread, un jour t'as un guignol qu'arrive et qui dit "ouais si y'a une clé d'api je fais rien" même si clé publique, même si pour les tests, même si en prod les clés circulent en clair sur le réseau :

https://twitter.com/benjilegnard/status/1745491922372682176

---

Une conséquence catastrophique que j'ai vu, c'est que vu que la config est en typescript était dans le code, elle a été supprimée suite à une migration / nettoyage telle que celle que j'évoquais là.

---

Résultat : l'appli ne compile pas après juste un git checkout, y'a pas de pipeline de build sur les branches, et le partage des config ts se fait sous le manteau entre devs.

Pire: un dev qui rajoute une entrée dans la config casse les envs de tous les devs qui se mettent à jour.

---

Là je dois gérer des clés dans un dépot et la config a déjà été externalisée, sauf que les clés sont toujours dans le code "au cas ou" derrière des ternaires

Donc ca se trouve on a des environnements qui n'ont pas la conf, mais fonctionnent toujours avec des clés de dev/test.

---

Bref, c'est un vaste sujet, s'il vous plait pas de conf dans un language compilable. format déclaratif, JSON, YAML, TOML, tout mais pas TS (ou JS hein). merci.
