# Design Gallery

A website built on top of node.js and embeddedJS. This website is built to connect developers to a UI Design Kit so that developers will be able to gain inspirations from available widgets. There are several search filters available in the gallery, allowing developers to obtain a greater relevancy in the widget they are searching for. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Node.js v9.11.1
2. npm v5.6.0 

### Installing

A step by step series of examples that tell you have to get a development env running

1. Clone the repository from GitHub.

    ```
    git clone https://github.com/lunalite/DesignGallery.git
    ```

2. Install required libraries with npm

    ```
    npm install
    ```

3. Run server. Website will be available at http://localhost:3000/

    ```
    npm start
    ```

4. Do note that if you are planning to edit the source code, it is recommended to use nodemon as changes will be made dynamically. (Optional)
  
    ```
    nodemon npm start
    ``` 

End with an example of getting some data out of the system or using it for a little demo

## Deployment

Deployment is done via Google Cloud Storage and Heroku. Due to the fact that Google does not support node.js deployment using App Engine (requires the use of Flexible Environment that might incur huge charges), we decided to implement the app on Heroku instead which is free.

Obtain a heroku account and deploy the entire app onto heroku by following instructions on Heroku itself. 

There is also a requirement for a database to be setup. We use the free [MongoDB host](http://mlab.com/). You should be able to get a MongoDB API link which will be added into Heroku under `Settings > Config Vars` with the values `MLAB_API_LINK=mongodb://USER:PW@XXX.mlab.com`.

The data stored in MongoDB is within the `widgets` collection with the following item structure:

```json
{ 
  "_id" : ObjectId("5ac23b7e27bc4099fb9fb172"), 
  "name" : "clipping-1265", 
  "clickable" : "true", 
  "color" : "Black", 
  "content-desc" : "", 
  "coordinates" : { 
    "from" : [ 4, 958 ], 
    "to" : [ 796, 1018 ] 
  }, 
  "dimensions" : { 
    "height" : 60, 
    "width" : 792 
  }, 
  "focusable" : "true", 
  "leaf" : true, 
  "package_name" : "com.plexnor.gravityscreenofffree", 
  "text" : "Activer cette option permet une réponse plus rapide. Mais si vous souhaitez éteindre l’écran manuellement par le bouton d’arrêt cette option peut interférer avec votre action et l’écran peut se rallumer.", 
  "widget_class" : "CheckBox", 
  "application_name" : "Gravity Screen - On/Off", 
  "downloads" : "1,000,000 - 5,000,000", 
  "url" : "https://play.google.com/store/apps/details?id=com.plexnor.gravityscreenofffree", 
  "src" : "/mnt/UIXML/top_10000_google_play_20170510_cleaned/com.plexnor.gravityscreenofffree_310010-output/stoat_fsm_output/ui/S_743", 
  "category" : "TOOLS" 
}
```

Widgets are stored on Google Cloud Storage with the following directory structure.


    .
    ├── widgets             #Stores all the widget under their respective classes
    |   ├── Buttons             
    |   ├── ProgressBar 
    |   ├── ...
    |   └── ImageButton 
    ├── screenshotFolder1
    └── screenshotFolder2
    

## Authors

* **Koh Hong Da** - *Initial work* - [lunalite](https://github.com/lunalite)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
