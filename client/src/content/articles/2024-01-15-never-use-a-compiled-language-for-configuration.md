Pratique que je (re-)découvre et qui est absolument terrible :

N'utilisez jamais TypeScript pour écrire votre configuration applicative, merci.

---

D'abord parce que vous ne voulez pas que votre configuration nécéssite un process de build pour être changée. Sinon ca veut dire : un build par environnement.

Et ca c'est la porte ouverte aux pipelines de l'enfer.

---

Petit rappel du principe des 12factor 
app: 

- Stocker la configuration de l'environnement... dans l'environnement ( duh )
- Découpler le code de la configuration

---

Là la conséquence incroyable que je découvre, c'est que vu que la configuration était en TS, ben y'a des devs qui se sont dit cool, je vais mettre des constructeur de classes dedans.

Adieu le déclaratif.

---

l'autre conséquence catastrophique que je dois gérer là, c'est que vu que la config est en typescript et dans le code, elle a été supprimée suite à une migration / nettoyage telle que celle que j'évoquais là.

---

Résultat : l'appli ne compile pas après juste un git checkout, y'a pas de pipeline de build sur les branches, et le partage des config ts se fait sous le manteau entre devs. Pire: un dev qui rajoute une entrées dans la config casse les envs de tous les devs qui se mettent à jour.

---

...
