import {bootstrapApplication} from '@angular/platform-browser';
import {App} from './app/app';
import {appConfig} from './app/app.config';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

const themes = [

  { green: "#00C853", yellow: "#FFD600" },


  { green: "#7B1FA2", yellow: "#F48FB1" },


  { green: "#D32F2F", yellow: "#FFCC80" },


  { green: "#1976D2", yellow: "#81D4FA" },
];


const randomTheme = themes[Math.floor(Math.random() * themes.length)];


document.documentElement.style.setProperty(
  "--color-primary-green",
  randomTheme.green
);

document.documentElement.style.setProperty(
  "--color-primary-yellow",
  randomTheme.yellow
);