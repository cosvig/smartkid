//import { fullleaguedata } from './menu.js';
import { threeFourLW, fiveToSevenLW } from './serve.js';
export var selectedHPset = '';
document.getElementById("embroOne").addEventListener("click", function(event) { 
	selectedHPset = 'first';
	threeFourLW();
});


document.getElementById("embroTwo").addEventListener("click", function(event) { 
	selectedHPset = 'second';
	fiveToSevenLW();
});


export function showTutChalPage(){
	document.getElementById("heroSection").style.display = "none";
	document.getElementById("statsContainer").style.display = "none";
}

/*document.addEventListener('DOMContentLoaded', function() {

});*/