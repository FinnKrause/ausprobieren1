import { Appearance } from 'react-native';

let isDarkMode:boolean = true;

function gc(lightModeColor:string, DarkModeColor:string):string {
  return isDarkMode ? DarkModeColor : lightModeColor;
}

const changeMode = () => {
  isDarkMode = !isDarkMode;
}

const BackgroundColor: string = gc("#F5F5F5", "#151617"); 
const SecoundBackground: string = gc("#ffffff","#252627");
const PlaceHolderColor: string = gc("#61707C", "#DAE1E7");

const ContrastColor: string = "#186DB6";
const DarkerContrast: string = "#061729";
const SchriftAufKontrast: string = "#ffffff";

const SecoundContrast:string = "#FF9248";
const DarkerSecoundContrast: string = "#FF6700";
const SchriftAufSecoundContrast:string = "#ffffff";

const Schriftfarbe: string = isDarkMode ? "#ffffff" : "#000000";

const AlertColor: string = "#ff0000";


export default changeMode;

export {
  BackgroundColor,
  SecoundBackground,
  PlaceHolderColor,
  
  ContrastColor,
  DarkerContrast,
  SchriftAufKontrast,
  
  SecoundContrast,
  DarkerSecoundContrast,
  SchriftAufSecoundContrast,
  
  Schriftfarbe,
  
  AlertColor,
};
