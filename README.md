
# Maître d' kata

## Énoncé
[Sujet original de Mark Seemann](https://blog.ploeh.dk/2020/01/27/the-maitre-d-kata/)

## Besoin 1 : [DONE]
Gérer les reservations d'un restaurant nommé "La boutique" qui n'a qu'une seule table de 12 places que les convives se partagent et qu'un seul service.

### Exemple 
#### 1) Ajout d'un restaurant
Requête
```
POST http://localhost:8080/add-a-restaurant
{
	"restaurant-name":"La boutique"
}
```
Réponse
```
200
{
    "restaurantId": "359c3a7d-ca6f-4eaa-9157-c7a3b7185564",
    "restaurantName": "La boutique"
}
```
#### 2) Demande de réservation pour 8 (Acceptée : 8 <= 12)
Requête
```
POST http://localhost:8080/make-a-reservation
{
	"restaurant-id":"359c3a7d-ca6f-4eaa-9157-c7a3b7185564",
	"date":"2020-03-09",
	"number-of-guests":8
}
```
Réponse
```
200
{
    "restaurantId": "359c3a7d-ca6f-4eaa-9157-c7a3b7185564",
    "restaurant": "La boutique",
    "date": "2020-03-09",
    "numberOfGuests": 8,
    "tableNumber": 1
}
```
#### 3) Demande de réservation pour 4 (Acceptée : 8 + 4 = 12 <= 12 )
Requête
```
POST http://localhost:8080/make-a-reservation
{
	"restaurant-id":"359c3a7d-ca6f-4eaa-9157-c7a3b7185564",
	"date":"2020-03-09",
	"number-of-guests":4
}
```
Réponse
```
200
{
    "restaurantId": "359c3a7d-ca6f-4eaa-9157-c7a3b7185564",
    "restaurant": "La boutique",
    "date": "2020-03-09",
    "numberOfGuests": 4,
    "tableNumber": 1
}
```
#### 4) Demande de réservation pour 1 (Rejetée : 8 + 4 + 1 = 13 > 12)
Requête
```
POST http://localhost:8080/make-a-reservation
{
	"restaurant-id":"359c3a7d-ca6f-4eaa-9157-c7a3b7185564",
	"date":"2020-03-09",
	"number-of-guests":1
}
```
Réponse
```
409
{
    "restaurantId": "359c3a7d-ca6f-4eaa-9157-c7a3b7185564",
    "restaurant": "La boutique",
    "date": "2020-03-09",
    "numberOfGuests": 1
}
```

## Besoin 2 : [TODO]
Gérer les réservations d'un restaurant nommé "Haute Cusine" qui a plusieurs tables privées (1 table par réservation) de différentes tailles.

## Besoin 3 : [TODO]
Gérer les réservations d'un restaurant ayant plusieurs services. 

## Besoin 4 : [TODO]
Gérer les réservations d'un restaurant ayant des tables qu'il est possible de combiner (2 tables de 2 = 1 table de 4).

## Cumul des besoins
Les besoins décrits ci-dessus sont à adresser dans l'ordre et s'accumulent. 
En fin d'exercice, on doit être en mesure de gérer les réservations de restaurants ayant plusieurs services et plusieurs tables (partagées ou privées) qu'il est possible de combiner entre elles. 

## Particularité
L'implémentation proposée dans ce repository s'appuie sur l'Event Sourcing pour la persistence des données. Les évènements sont stockés à l'aide d'EventStore.

## Lancer les tests unitaires
```
npm test
```

## Lancer les tests de bout en bout 
```
npm run e2etest
```

## Déployer l'application en local
```
docker-compose up
``` 

## Redéployer l'application après modification
```
docker-compose down && docker-compose up
```

## EventStore
Il est possible de naviguer et d'administrer l'EventStore à l'adresse `http://localhost:2113/web/index.html#/dashboard`

**Attention :** pour les besoins de l'exercice, l'EventStore est lancé en mémoire avec l'option `EVENTSTORE_MEM_DB=True`.
Il est donc réinitialisé à chaque recréation du conteneur associé.

 




