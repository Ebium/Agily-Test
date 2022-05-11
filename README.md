# Agily - Rapport global

Ce répertoire contient le projet *Meteapp*.
C'est une application permettant de donner la météo du jour même et des 7 prochains jour à venir.

L'application est composé des architectures client et serveur organisé de la manière suivante :

![image](https://user-images.githubusercontent.com/91456594/167903136-dd760bbd-0b15-4280-a7d1-b5a9744d0f36.png)

 
 ### Description des fichiers
 
 Les dossiers node_modules ne sont pas présents dans le répertoire en raison de leur taille
 Ils contiennent les dépendances / paquets utiles au projet, qui sont dans notre cas :
 - Axios :  permet de communiquer avec l'Api openweathermap
 - node-cache : permet de mettre en cache les données qu'on a/veut envoyer, limitant ainsi le délai des requêtes
 - Express : framework permettant de construitre l'application côté serveur
 - React : framework permettant de construire l'application côté client
 - concurrently : permet de lancer le lancement de l'application serveur et client en même temps
 
 #### Partie serveur 
 
 - app.js : "API" envoyant les requêtes à Openweatherapp quand c'est utile. En effet, si on demande les données pour la même ville deux fois, il est inutile d'envoyer la reqûete pour avoir ces données là deux fois. Lors de la première fois, on enregistre les données dans le cache node, qui seront utilisées pour la seconde requête. Cela permet de limiter la bande passante du client et le délai d'attente

 - package-lock.json / package.json : contient la racine de l'application serveur

#### Partie client

- package-lock.json / package.json : contient la racine de l'application serveur
- les deux dossiers public et src :

- 1. dossier public 

  - icon.png : icône de l'application, affiché à l'extrémité gauche de l'onglet
  - index.html : génère le template de l'application

- 2. dossier src

  - le dossier style : composé des fichiers App.css, Home.css, Index.css, left-arrow.svg et search.svg
  - Home.js : script pour le rendu de la page principale permettant de demander une ville au client
  - App.js : script pour le rendu de la seconde page, affichant la météo du jour même et des 7 jours à venir, ainsu qu'une possibilité de revenir sur la première page
  - Index.js : script principale liant l'index.html au rendu des pages Home et App


