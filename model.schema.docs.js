
/**
 * Le fichier model.schema.json va contenir les informations des différents composants qui aurons seulement besoin d'un crud
 * Chaque clé de ce fichier va représenter un composant qui pourra etre traiter.
 * La clé est l'uri de la route, elle sera alors récuperer dans le constructeur du composant defaultCrud. Ce dernier va alors faire appel au fichier model.schema.json et récuperer les informations du creer le composant
 * La clé titre : represente le titre qui sera affiché dans le composant
 * La clé endpoint : représente l'uri de l'end point qui sera contacté
 * La clé headerTable : va contenir les entêtes du tableau à afficher
 * La clé withUpdate : va dire si les éléments auront besoin d'etre modifiés ou pas
 * La clé withDelete : va dire si les éléments auront besoin d'etre supprimés ou pas
 * La clé ajout : va contenir les informations concernant l'ajout. C'est ectte valeur qui sera transmise au modal avec les validtaions, les labels des champs, lesvaleurs par défaut, le type des champs ....
 * C'est une clé assez complexe qui a pour valeur un tableau d'objet de type {id : number, value : []}
 * la clé id de ajout, est facultative mais il est recommandé de la mettre avec des valeurs différentes
 * La clé value
* */

let val= {
   "users": {
     "titre": "Utilisateurs",
     "endpoint": "users",
     "headerTable": [
       "id", "firstName", "lastName"
     ],
     "withUpdate": true,
     "withDelete": true,
     "ajout": []
   }
 }
