# Agily - Rapport pour l'exercice n°2


## Rappel rapide du sujet 

- Création de ma propre API avec Express et node-cache
- Les requêtes sont faites depuis ce serveur
- les données des requêtes sont mis en cache
- les données doivent être assainies, on ne garde que l'essentiel

## Principes utilisés et décisions prises

- Savoir comment utiliser node-cache, c'est rapide à comprendre, les fonctions sont plutôt simple et claires.
- Pour savoir comment héberger ce serveur Express, on se documente rapidement et on comprends que c'est une application nodeJs qu'on fait passé comme proxy à l'application client ( ce qui correspond à l'application React ). Ce qui me dérangeai, c'est le fait de devoir ouvrir deux Terminal et lancer les deux serveur en même temps. Recherches rapide, je peux utiliser *concurrently* pour tout lancer en même temps. Très pratique !
- Pour les requêtes, on fetch la requête de notre API, qui va ensuite envoyer la reqûete à Openweathermap. Je code rapidement une fonction pour garder seulement les données qu'on veut (température, icône,arrière plan ... ). Avant d'envoyer cette reqûete, on regarde si ces données sont présent dans le cache. Dans ce cache, on a pour chaque clé ( la clé est le nom de la ville voulue ) un dictionnaire avec les données qu'on veut. On regarde si cette clé est présente avant d'envoyer les requêtes à openweathermap, si elle n'y est pas, on fait la reqûete, on enregistre les données dans le cache puis les envoie à l'application client. Si elles sont déjà présente dans le cache, pas besoin de faire de requête, donc le délai d'attente pour les données est très faible !

## Temps de réalisation
