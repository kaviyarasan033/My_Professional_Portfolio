import {bootstrapApplication} from '@angular/platform-browser';
import {App} from './app/app';
import {appConfig} from './app/app.config';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

const themes = [

  { green: "#00C853", yellow: "#FFD600" },

  { green: "#7B1FA2", yellow: "#F48FB1" },

  { green: "#D32F2F", yellow: "#FFCC80" },

  { green: "#1976D2", yellow: "#81D4FA" },


  { green: "#2E7D32", yellow: "#FFF176" },


  { green: "#00897B", yellow: "#80DEEA" },


  { green: "#E65100", yellow: "#FFAB91" },


  { green: "#C2185B", yellow: "#E1BEE7" },


  { green: "#303F9F", yellow: "#B3E5FC" },

  { green: "#AFB42B", yellow: "#B9F6CA" },

 
  { green: "#5D4037", yellow: "#D7CCC8" },


  { green: "#00E676", yellow: "#FFEA00" },


  { green: "#263238", yellow: "#FFC107" },
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