//import { fullleaguedata } from './menu.js';
import { threeFourLW } from './serve.js';

document.getElementById("embroOne").addEventListener("click", function(event) { 
	threeFourLW();
});



export function showTutChalPage(){
	document.getElementById("heroSection").style.display = "none";
	document.getElementById("statsContainer").style.display = "none";
}

/*document.addEventListener('DOMContentLoaded', function() {

});*/