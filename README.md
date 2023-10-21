# Projet Composants et Services Logiciels

## Objectif du Projet

L'objectif de ce projet était de porter une [application Java existante](http://109.26.178.21/fbarbier/Programming/PauWare2/BCMS.html) vers Node.js:

* Passer de la librairie PauWare vers XState pour gérer la machine à états (Statechart de Harel)

* Utiliser une autre base de données, passage d'Apache Derby vers SQLite3 puis utiliser une API ORM tel que TypeORM pour le mappage entitées/classes

* Exposer les fonctionnalitées de la machine à états avec Express (Création d'une API REST)

## Technologies / API

* Node.js

* TypeScript

* Express

* XState

* TypeORM

* SQLite3

## Installation

Pour installer les dépedances nécessaires au projet, il faut lancer cette commande:

```sh
npm i
```

Ensuite, il faut compiler le projet en JavaScript:

```sh
npm run build
```

## Lancement

Le serveur se lance avec la commande suivante:

```sh
npm run exec
```

## Contributeurs

[Tristan Taupiac](https://github.com/TristanTcDev) et [Arnaud Chaubet](https://github.com/achaubet)
