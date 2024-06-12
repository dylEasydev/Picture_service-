Salut il s'agit ici d'un serveur de gestion d'image de la companie easy class.  

Pour ceux ayant un maitrisse de git vous devrez juste faire un `git clone` ou un `git pull`.

Vous devez possèder un systeme de Gestion de Base de donnée comme postgres ou mysql.  

Ce referentiel à des dependances avec celui sur le Serveur Oauth2 de mon github [https://github.com/dylEasydev/Oauth2Easyclass]ici !  

je ferais une vidé youtude dedier à sa mise en route [https://www.youtube.com/easyclass]lien de ma chaine.  

Etape1: faire un coup de `npm install`.  

Etape2 : créer un .env et remplir les information si dessous

```
PORT = 3001
DB_NAME = 
DB_HOST = localhost
DB_DRIVER = 
DB_PASSWORD = 
DB_USER = 
NODE_ENV = developemnent
HOSTNAME = localhost
PRIVATE_KEY = 

```   
Etape3: Lancer son serveur de Base de donnée !  

Etape4: npm run dev  
Etape5: Aller à la documentation avec http://localhost:{process.env.PORT}/docs .  

