# Agily - Rapport pour l'exercice n°1

## Rappel rapide du sujet 

- 1 carte pour la météo du jour même
- 7 cartes pour la météo des 7 prochains jour avec la possiblité de cliquer dessus pour avoir quelques informations supplémentaire, remplacant la carte principale
- bouton pour revenir à page principale
- il faut utiliser l'api openweathermap (OWM) pour récupérer les données et axios pour faire les requêtes
- le fond d'écran doit changer en fonction de la ville souhaitée


## Principes utilisés et décisions prises


- Pour ces cartes là, il faut affiche l'icône de la météo correspondante, on a juste à l'extraire des données récupérées à partir le d'API.
- Affichage des dates et des jours sur les cartes : au début, aucune idée. On s'aperçoit qu'on récupère le valeur dt pour chaque jour, c'est-à-dire le temps en UNIX. Je code rapidement une fonction pour convertir se temps en jour et en mois, puis l'affiche.
- Pour le fond d'écran, j'ai d'abord cherché si l'API OWM me donnait une image, mais pas du tout. Je vais donc utiliser TELEPORT PUBLIC API, api retournant une image pour chaque ville. Les deux défault sont le nombre limité de ville disponible - pas de problème on affiche l'image de las-vegas si on obtient rien sur celle demandée, et la qualité de l'image.
- Il faut une possibilité de revenir sur la première page, j'ai donc fait quelques recherches pour savoir comment rendre plusieurs pages en React et je tombe sur le package React Route. J'ai donc 2 pages mais je bloque sur l'envoie d'un formulaire et de la redirection sur l'une des pages. Je me passe donc de ce package et choisi une façon plus *vanilla*. On rend la première page au début, puis lorsque qu'on entre le nom de la ville et qu'il est valide, on rend la seconde page avec les données demandées.
- Comment vérifier que le nom de ville est correct ? Il faut juste vérifier que la requête à l'API ne renvoie pas d'erreur !
- Il faut pouvoir swap une des 7 cartes avec la carte principale pour avoir plus d'informations sur le jour voulu, ce qui est compliqué car on peut pas " dérendre ", enlever une partie quand on rend la page en React. J'ai donc créer 8 cartes, une pour chaque jour, et j'affiche seulement celle du jour même. Ensuite, j'ai implémenté une petite fonction qui permet d'afficher la carte voulu et d'enlever celle de base à l'aide du paramètre de style : display
- Dernière chose, le police de caractère ( le font ) ... Faut pas ce compliquer la tête pour ça, on marque *Font from picture* sur google et le tour est joué ! On obtiens la police voulue.


## Temps de réalisation

- Temps pour les recherches et pour apprendre les principes du React, d'Axios et autres : 2 jours
- Temps total pour finir le premier exercice : 3 jours et demi
