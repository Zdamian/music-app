# Music App

Client single page web application for **Music App**


# Setup environment

## Global *npm* dependencies

Development for this app works using **Gulp** tasks. If you do not have `gulp` installed globally run once in a terminal
```bash
>> npm install gulp -g
```

If you are working on Windows you may need also install `gulp-cli`
```bash
>> npm install gulp-cli -g
```

## Cloning repo and run app

To clone this repo and run app in a dev mode simply run the following commands
```bash
>> git clone git@github.com:Zdamian/music-app.git
>> cd music-app
>> npm run dev
```

`npm run dev` command will install all npm dependencies, compile all `scss` files into one `app.css`, merge all `js` files into one `app.js` and run `lite-server` on port 3000.

You can also run app in prod mode. In this mode all `js` files are minified with uglify. To do this run
```bash
>> npm run prod
```


# Development

To watch your files you are working on while development run
```bash
>> gulp watch.dev
```
You also need to have working live reload server. In a separate terminal tab/window run
```bash
>> npm start
```


# Production

To build production version (bundled, minified with uglify and source map all js files) run
```bash
>> gulp build.prod
```


# Installing 3rd party libs

## Installing new *npm* third-party libraries

To install new *npm* package run
```bash
>> npm install package_name --save
```
After that you need to include a path of installed package in `gulpfile.js`
