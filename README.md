# Service de gestion d'image du site d'E-learning [easyclass.edu](https://www.easyclass.edu).

## Description du projet

Il s'agit ici d'un service destiné à upload et la suppression des images(d'utilisateurs, de domaines , de matières ,...) . Dans l'optique d'appliquer notre achitecture **micro-service** , ce service utilise comme jeton de securité de ses **end-point** , le token fournis par le service d'authentification disponnible [oauthEasyclass](https://github.com/dylEasydev/Oauth2Easyclass)

## objectif du projet 

Il est question pour nous d'upload des image lors des modification d'image(d'utilisateurs, de domaines , de matières ,...) , de leurs compresser et de leurs ramener au format `.jpeg` et supprimer l'anciennes image associer .

>[!NOTE]
> fournir des images déjà redimensionner pour avoir un résultat convenable
> comme profil ou image de domaine (le front-end se chargera de ça). 

Nous devons aussi agir sur la securité donnant ainsi uniquement le droit au détenteur de l'image d'effectuer des opérations . 

## Prérequis
Avant de se lancer à coeur joie vers le demarage de se projet rassurez vous d'avoir :
- **nodejs** et **npm** d'installer sur votre ordinateur.
* un **SGBD**(sytème de gestion de base de donnée) dans notre **postgresql** et **mysql**
> [!IMPORTANT]
> vous pouvez utiliser un autre SGBD il vous suffit juste d'installer sont driver
> et de verifier s'il est pris en charge par [sequelize](https://sequelize.org)

+ possèder git et savoir faire des pull `git pull` ou des **fork**

## installation
Pour lancer le projet il faut tous d'abord installer les dependences .
ouvrez le terminal et deplacez vous au dossier où vous avez effectué le pull.
et  lancer `npm install`

## configuration

Créer un fichier `.env`àla racine du projet puis copiez le code si dessous à l'interieur .

```js

PORT = 3001
DB_NAME = //même base de donnée que le serveur d'authentification 
DB_HOST = localhost
DB_DRIVER = //postgres ou mysql
DB_PASSWORD = 
DB_USER = 
NODE_ENV = developemnent
HOSTNAME = 127.0.0.1
PRIVATE_KEY = //même clés que le serveur d'autehntification

```
## demarage du serveur
ouvrez le terminal et lancez la commande `npm run dev` .

pour les adepte de javascripts vous pouvez compiler grâce à la commande `npm build`.
Puis lancer le serveur avec la commande `node -r dotenv/config ./dist/server/index.js`

## exemple d'utilisation
```js
import axios from 'axios';
const jeton = ``//jeton obtenu lors du login  
const axiosRequest = axios.create({
    baseURL:'http://localhost:3001/',
    timeout:3000
    hearder{
         headers:{
            Authorization:`Bearer ${jeton}`
        }
    }
});
const newStudent = axiosRequest.delete('/image/user').then((response)=>{
    return response.data;
})
```
## Documentation
la documentation est à l'adresse http://127.0.0.1:3001/docs .
son fichier html [ici](/docs/index.html) à enrichir si vous voulez bien . 

## conctact
Mon addresse: 
> easyclassgroup@gmail.com
