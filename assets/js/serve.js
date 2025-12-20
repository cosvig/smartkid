import { showTutChalPage } from './main.js';
import { threeFourLWBoard, startLessong, endLessonClose, preloadAllAudios } from './board.js';

//const json no changes made
export var threeLetterWords = '';
export var fourLetterWords = '';
var fiveLetterWords = '';
var sixLetterWords = '';

//new set created
export var alphabet = '';
export var setconstThreeLW = '';
export var setconstFourLW = '';

export var currentThreeLW = '';
export var currentFourLW = '';
export var preLoadMergeSet = ''
export var currentMergeSet = '';
export var challengeOnlyArr = '';

export var currentBatchIndex = 0;
export var pgnConst = 3;

export var constantArrayNumber = 15; //We are using this for now (dynamic in future)

export function threeFourLW(){
	$('#pageCamp').load('tut-chal.html', function() {
		showTutChalPage();
		tlwjs();
	});
	function tlwjs(){
		relayJSONfile('./reqxon/three-letter-words.json', function(data){
			threeLetterWords = data;
			setconstThreeLW = [...threeLetterWords];
			flwjs()
        });
	}
	function flwjs(){
		relayJSONfile('./reqxon/four-letter-words.json', function(data){
			fourLetterWords = data;
			setconstFourLW = [...fourLetterWords];
			alphetArrConstruct();
			slicingandsetting()
        });
	}
}

function slicingandsetting(){
	shuffle(setconstThreeLW);
	shuffle(setconstFourLW);
	
	
	preLoadMergeSet = [...setconstThreeLW,  ...setconstFourLW]
	//currentThreeLW = setconstThreeLW.slice(0, 1);
	//currentFourLW = setconstFourLW.slice(0, 1);
	
	//setconstThreeLW.splice(0, 3);
	//setconstFourLW.splice(0, 3);
	//currentBatchIndex = 6;
	
	let startIdx = currentBatchIndex * pgnConst;
	currentThreeLW = setconstThreeLW.slice(startIdx, startIdx + pgnConst);
	currentFourLW = setconstFourLW.slice(startIdx, startIdx + pgnConst);
	
	currentMergeSet = [...currentThreeLW,  ...currentFourLW];
	shuffle(currentMergeSet);
	console.log(currentMergeSet)
	challengeOnlyArr = [...currentMergeSet];
	document.getElementById('pageLoader').style.display = "";
	preloadAllAudios();
}

export function deseydicing(){
	let startIdx = currentBatchIndex * pgnConst;
	currentThreeLW = setconstThreeLW.slice(startIdx, startIdx + pgnConst);
	currentFourLW = setconstFourLW.slice(startIdx, startIdx + pgnConst);
	
	currentMergeSet = [...currentThreeLW,  ...currentFourLW];
	shuffle(currentMergeSet);
	shuffle(currentMergeSet);
	console.log(currentMergeSet)
	challengeOnlyArr = [...currentMergeSet];
	startLessong();
}

export function increaseCurrentBatchIndex(){
	currentBatchIndex++;
	if (currentBatchIndex * pgnConst >= constantArrayNumber) {
		endLessonClose()
		//PICTURE LESSON ENDED
		return;
	}
	deseydicing();
}

function alphetArrConstruct(){
	alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
}


export function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function relayJSONfile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}





/*
function testrunda(){
	function lunch1() {
	  return new Promise((resolve, reject) => { 
		$('#pageCamp').load('tut-chal.html', function() {
		  // This callback executes AFTER content is inserted into DOM
		  resolve();
		});
	  });
	}

	async function lunch2() {
	  await lunch1();
	  let lessonW = document.getElementById("lessonW");
	  //console.log(lessonW); // Should now work
	  //jQuery("#lessonW").fitText();
	  let viewportWidth = window.innerWidth;
		console.log("Viewport width:", viewportWidth, "pixels");
		//768
	  const questionTexts = document.querySelectorAll('.lesson-word');
	  //console.log(questionTexts)
	  questionTexts.forEach(textElement => {
			const length = textElement.textContent.length;
			let fontSize; 
			let letterSpacing;
			console.log(length)
			
			if(viewportWidth <= 768 && length >= 10){
				fontSize = '35px';
				letterSpacing = '10px';
			}else if(viewportWidth <= 768 && length >= 9){
				fontSize = '54px';
				letterSpacing = '10px';
			}else if(viewportWidth <= 768 && length >= 7){
				fontSize = '60px';
				letterSpacing = '15px';
			}else if(viewportWidth <= 768 && length >= 5){
				fontSize = '65px';
				letterSpacing = '20px';
			}
			// WE MIGHT WRITE FOR SCREEN BELOW 390 WIDTH
			if(viewportWidth <= 390 && length >= 10){
				fontSize = '30px';
				letterSpacing = '8px';
			}else if(viewportWidth <= 390 && length >= 9){
				fontSize = '48px';
				letterSpacing = '8px';
			}else if(viewportWidth <= 390 && length >= 7){
				fontSize = '52px';
				letterSpacing = '10px';
			}else if(viewportWidth <= 390 && length >= 5){
				fontSize = '60px';
				letterSpacing = '16px';
			}
			
			//if (length > 200) fontSize = '13px'; // 13px
			//else if (length > 120) fontSize = '14px'; // 14px
			//else if (length > 60) fontSize = '16px'; // 16px
			//else fontSize = '18px'; // 18px
			
			 textElement.style.fontSize = fontSize;
			 textElement.style.letterSpacing = letterSpacing;
			 textElement.style.transition = 'font-size 0.3s ease';
		});
		// Set random animation delays for each p element

    const pElements = document.querySelectorAll('.cell-words p');
    pElements.forEach(element => {
        // Generate a random delay between 0 and 2 seconds
        const randomDelay = Math.random() * 4;
        element.style.animationDelay = `${randomDelay}s`;
    });


				return;
	}
	

	lunch2();
}*/