
 * Le fichier model.schema.json va contenir les informations des différents composants qui aurons seulement besoin d'un crud
 * Chaque clé de ce fichier va représenter un composant qui pourra etre traiter.
 * La clé est l'uri de la route, elle sera alors récuperer dans le constructeur du composant defaultCrud. Ce dernier va alors faire appel au fichier model.schema.json et récuperer les informations du creer le composant
 * La clé titre : represente le titre qui sera affiché dans le composant
 * La clé endpoint : représente l'uri de l'end point qui sera contacté
 * La clé headerTable : va contenir les entêtes du tableau à afficher
 * La clé withUpdate : va dire si les éléments auront besoin d'etre modifiés ou pas
 * La clé withDelete : va dire si les éléments auront besoin d'etre supprimés ou pas
 * La clé ajout : va contenir les informations concernant l'ajout. C'est ectte valeur qui sera transmise au modal avec les validtaions, les labels des champs, lesvaleurs par défaut, le type des champs ....
 * C'est une clé assez complexe qui a pour valeur un tableau d'objet de type {id : number, value : []}. On peut configurer pour que les champs s'affiche sur une ligne ou plusieurs lignes
 * Chaque objet dans le tableau de valeur de la clé ajout va représenter une ligne dans le modal d'ajout
 * la clé id de ajout, est facultative mais il est recommandé de la mettre avec des valeurs différentes
 * La clé value va contenir d'une ligne dans le modale. C'est dans cette clé qu'on va connaitre le nombre de champ que la ligne va contenir et pour chaque champ les infomations de ce champs
 * La clé value va prendre un tableau d'objet comme valeur. Chaque objet va reprsénter un champ. Le css va automatiquement s'adapter au nombre de champ , permettant ainsi à tous les champs de pour etre contenue et si necssaire d'aller à la ligne
* Un objet du tableau de la clé value va contenir les champs suivant :
   - label : qui va représenter la valeur que le label du champ va afficher
   - type : il va représenter le type du champ : input, select ou image(à venir, pas encore implémenter)
   - inputType : Il va représenter le type de champ . Il peut prendre toutes les valeurs existants des inputs si le type est input, chaine vide pour les autres types
   - control : c'est un objet qui doit contenir les différents controle qui seront appliqués à ce champ et possiblement sa valeur initiale
   - control.initiale : Il contenir la valeur par défaut du champ
   - control.validations : c'est un tableau de chaines de caracteres qui va contenir les différentes validations du champ. Ses valeurs possibles : required , min, max, pattern, email, minLength et minLength
                         pour certaines valeurs de validations, il valeur est necessaire pour faire la validation comme par exemple min, il nous faut lui fournir la valeur minimale. Pour cela on le concataine avec la validation : on met min_3 pour dire que la valeur minimale est de 3
 
   - errorMessage : cette clé va représenter le message d'erreur qui sera affiché lorsuq'un validation n'a pas été respecter par la l'utilisateur
   - id : va représenter l'id du champ
   - name : va représenter la valeur du formControleName qui sera utiliser

```javascript
  let val= {
   "users": {
     "titre": "Utilisateurs",
     "endpoint": "users",
     "headerTable": [
       "id", "firstName", "lastName"
     ],
     "withUpdate": true,
     "withDelete": true,
     "ajout": [
       {
         "id" : 1,
         "value" : [
           {
             "label": "Prenom",
             "inputType": "",
             "type" : "select",

             "control": {
               "initiale" : "Babacar",
               "validations" : ["required", "minLength_3"]

             },
             "errorMessage" : "Le champ prenom est requis et dois comporter au moins 3 lettres",
             "id": "prenom",
             "name": "prenom"

           }
         ]
       }

     ]
   }
 }

```