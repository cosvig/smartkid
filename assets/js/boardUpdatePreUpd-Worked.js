import { fourLetterWords, threeLetterWords, alphabet, currentThreeLW, currentFourLW, currentMergeSet, shuffle } from './serve.js';

var activeAudioList = new Set();
var statsCounter = 0;
var initialProp = 0;
var audioFileRecord = [];
var standcon = [
{"standconWord":"welcome", "standconDescript":"Welcome. Let's get straight to the fun part.", "standconAudio":"welcome.mp3"},
{"standconWord":"again", "standconDescript":"Again", "standconAudio":"again.mp3"},
{"standconWord":"challenge", "standconDescript":"Now Let's take a challenge", "standconAudio":"challenge.mp3"},
{"standconWord":"correct", "standconDescript":"Correct", "standconAudio":"correct.mp3"},
{"standconWord":"wrong", "standconDescript":"Wrong", "standconAudio":"wrong.mp3"},
{"standconWord":"retry", "standconDescript":"Let's try again.", "standconAudio":"retry.mp3"},
{"standconWord":"incorrect", "standconDescript":"Incorrect", "standconAudio":"incorrect.mp3"},
{"standconWord":"overall_challenge", "standconDescript":"Time to take a challenge on all we have learnt so far.", "standconAudio":"overall_challenge.mp3"},
{"standconWord":"next_words", "standconDescript":"Its time for our next words", "standconAudio":"next_words.mp3"}
];
export function threeFourLWBoard(){
	let lessonPic = document.getElementById("lessonPic");
	let lessonW = document.getElementById("lessonW");
	let lessonWDC = document.getElementById("lessonWDC");

	lessonPic.innerHTML = `<img width="300px" height="200px" src="./pixagime/${currentMergeSet[0].thlwImage}"  draggable="false">`;
	
	lessonWDC.innerHTML = currentMergeSet[0].thwDescribe;
	
	let mergeChoiceForAudio = [...threeLetterWords, ...fourLetterWords];
	
	/*mergeChoiceForAudio.forEach(function(item, index) { 
		let newAud = {
		  audioName:            item.thlwName.toLowerCase(),
        // Use the proper file for the description (you had a typo in the original data)
        audioDescriptionFile: new Audio(`./ledphoney/${item.thlwAudioDescribe}`),
        audioLessonFile:      new Audio(`./ledphoney/${item.thlwAudioL}`),
        audioQuestionFile:    new Audio(`./ledphoney/${item.thlwAudioQ}`)
		};
		
		audioFileRecord.push(newAud);
	}); 
	
	standcon.forEach(function(item, index) { 
		let newAud = {
		  audioName:            item.standconWord.toLowerCase(),
        // Use the proper file for the description (you had a typo in the original data)
        audioDescriptionFile: new Audio(`./ledphoney/${item.standconAudio}`),
        audioLessonFile:      {},
        audioQuestionFile:    {}
		};
		audioFileRecord.push(newAud);
	}); 
	Object.values(audioFileRecord).forEach(audio => {
		audio.audioDescriptionFile.preload = 'auto';
		audio.audioLessonFile.preload = 'auto';
		audio.audioQuestionFile.preload = 'auto';
		if (Object.keys(audio.audioDescriptionFile).length === 0) {
		  console.log('it is empty');
		  console.log(audio.audioDescriptionFile)
		} else {
		  console.log('it is not empty');
		}
	});*/
	preLoadAudios();
	function preLoadAudios() {
		const loadPromises = mergeChoiceForAudio.map(item => {
			const audioSet = {
				audioName: item.thlwName.toLowerCase(),
				audioDescriptionFile: new Audio(`./ledphoney/${item.thlwAudioDescribe}`),
				audioLessonFile: new Audio(`./ledphoney/${item.thlwAudioL}`),
				audioQuestionFile: new Audio(`./ledphoney/${item.thlwAudioQ}`)
			};
			
			// Set explicit preload behavior
			Object.values(audioSet).forEach(aud => {
				if (aud instanceof Audio) {
					aud.preload = 'auto'; // Explicitly request preloading
					aud.load(); // Force loading
				}
			});
			
			// Wait for all three files to be ready
			const waitForLoad = (audio) => {
				return new Promise((resolve, reject) => {
					audio.addEventListener('canplaythrough', () => resolve(audio));
					audio.addEventListener('error', (e) => reject(e));
					// Timeout after 10 seconds
					setTimeout(() => reject(new Error('Timeout')), 10000);
				});
			};
			
			return Promise.all([
				waitForLoad(audioSet.audioDescriptionFile),
				waitForLoad(audioSet.audioLessonFile),
				waitForLoad(audioSet.audioQuestionFile)
			]).then(() => {
				audioFileRecord.push(audioSet);
			}).catch(err => {
				console.error(`Failed to load audio for ${item.thlwName}:`, err);
			});
		});
		
		return Promise.all(loadPromises);
	}

	// Usage:
	preLoadAudios().then(() => {
		console.log('First Batch Audio is ready!');
		// Now safe to play without reloading
		preLoadAudiosConst()
	});
	
	function preLoadAudiosConst() {
		const loadPromises = standcon.map(item => {
			const audioSet = {
				audioName: item.standconWord.toLowerCase(),
				audioDescriptionFile: new Audio(`./ledphoney/${item.standconAudio}`),
				audioLessonFile: {},
				audioQuestionFile: {}
			};
			
			// Set explicit preload behavior
			Object.values(audioSet).forEach(aud => {
				if (aud instanceof Audio) {
					aud.preload = 'auto'; // Explicitly request preloading
					aud.load(); // Force loading
				}
			});
			
			// Wait for all three files to be ready
			const waitForLoad = (audio) => {
				return new Promise((resolve, reject) => {
					audio.addEventListener('canplaythrough', () => resolve(audio));
					audio.addEventListener('error', (e) => reject(e));
					// Timeout after 10 seconds
					setTimeout(() => reject(new Error('Timeout')), 10000);
				});
			};
			
			return Promise.all([
				waitForLoad(audioSet.audioDescriptionFile),
				//waitForLoad(audioSet.audioLessonFile),
				//waitForLoad(audioSet.audioQuestionFile)
			]).then(() => {
				audioFileRecord.push(audioSet);
			}).catch(err => {
				console.error(`Failed to load audio for ${item.thlwName}:`, err);
			});
		});
		
		return Promise.all(loadPromises);
	}
	
	preLoadAudiosConst().then(() => {
		console.log('All audio ready!');
		// Now safe to play without reloading
		let njtz = audioFileRecord.find(ukcl => ukcl.audioName == "welcome"); 
		let standconAudio = njtz ? njtz.audioDescriptionFile : undefine;
		globalAudioFunc(standconAudio)
	});

	//console.log(audioFileRecord)
	
	//let njtz = standcon.find(ukcl => ukcl.standconWord == "welcome"); 
	//let standconAudio = njtz ? njtz.standconAudio : undefine;
	
	
}
let repeatdiscribeCount = 0;
let repeattutCount = 0;
let challengeCount = 0;
let againCountRepeat = "no";
let audioPlayStopControl = "play";
let challWrongTone = 0;
let challCorrectTone = 0;
let letsTryAgain = 0;

function initialPropFunc(){
	initialProp++;
	let lessonPic = document.getElementById("lessonPic");
	let lessonW = document.getElementById("lessonW");
	let lessonWDC = document.getElementById("lessonWDC");

	lessonPic.innerHTML = `<img width="300px" height="200px" src="./pixagime/${currentMergeSet[statsCounter].thlwImage}"  draggable="false">`;
	lessonWDC.innerHTML = currentMergeSet[statsCounter].thwDescribe;
}

function resetPlayProps(){
	repeatdiscribeCount = 0;
	initialProp = 0;
	repeattutCount = 0;
	challengeCount = 0;
	againCountRepeat = "no";
	audioPlayStopControl = "play";
	challWrongTone = 0;
	challCorrectTone = 0;
	letsTryAgain = 0;
}


function startLessong(){
	let currentMergeSetLenght = currentMergeSet.length;
	if(statsCounter != currentMergeSetLenght){
		if(letsTryAgain == 1){
			letsTryAgain = 0;
			tryAgainAudio();
			return;
		}
		if(challCorrectTone == 1){
			challCorrectTone = 0;
			challCorrectAudio();
			return;
		}else if(challWrongTone == 1){
			challWrongTone = 0;
			letsTryAgain = 1;
			challWrongAudio();
			return;
		}
		if (initialProp == 0)  initialPropFunc(); //describe image and text
		if( repeatdiscribeCount < 2){ //decribe audio
			repeatdiscribeCount++;
			console.log("repeatdiscribeCount", repeatdiscribeCount)
			console.log("repeattutCount", repeattutCount)
			console.log("challengeCount", challengeCount)
			console.log("statsCounter", statsCounter)
			document.getElementById("lessonW").innerHTML = '';
			setTimeout(() => {
				discribeAudio()
			}, 500);
			
		}else{
			if(repeattutCount < 3){ //spelling audio_l
				if(againCountRepeat == "no"){
					repeattutCount++;
					againCountRepeat = "yes"
					
					console.log("againCountRepeat", againCountRepeat)
					console.log("repeatdiscribeCount", repeatdiscribeCount)
					console.log("repeattutCount", repeattutCount)
					console.log("statsCounter", statsCounter)
					gotospellingP();
					setTimeout(() => {
						tutSpellAudo()
					}, 1000);
				}else{ //again
					againCountRepeat = "no";
					againAudio();
				}
			}else{
				if(challengeCount == 0 && audioPlayStopControl == "play"){ //lets take a challenge
					challengeCount = 1;
					console.log("repeatdiscribeCount", repeatdiscribeCount)
					console.log("repeattutCount", repeattutCount)
					console.log("challengeCount", challengeCount)
					console.log("statsCounter", statsCounter)
					setTimeout(() => {
						document.getElementById("lessonW").innerHTML = '';
						chanllegeAudo()
					}, 200);
				}else if(challengeCount == 1 && audioPlayStopControl == "play"){ //spell audio_q
					challengeCount = 0;
					audioPlayStopControl = "stop";
					console.log("repeatdiscribeCount", repeatdiscribeCount)
					console.log("repeattutCount", repeattutCount)
					console.log("challengeCount", challengeCount)
					console.log("statsCounter", statsCounter)
					gotochallengeP();
					setTimeout(() => {
						tutQuesiontAudo()
					}, 200);
				}
				
			}
		}
	}else{
		//CREATE A FUNCTION THAT CHECKS WHAT'S UP
		//TAKE A FULL CHALLENGE OF THE SUB SET //BUT THIS IS TIGGERED BY THE WHAT'S UP FUNCTION
		//HERE IS ONLY FOR LESSON AUDIO
		//CHALLENGE ONLY AUDIO SHOULD BE DIFFERENT, BUT CAN BE CALLED HERE FROM WHATS'UP FUNCTION
	}
}

function discribeAudio(){
	//let standconAudio = currentMergeSet[statsCounter].thlwAudioDescribe;
	let thlwName = currentMergeSet[statsCounter].thlwName.toLowerCase();
	let njtz = audioFileRecord.find(ukcl => ukcl.audioName == thlwName); 
	let standconAudio = njtz ? njtz.audioDescriptionFile : undefine;
	console.log("describe", thlwName)
	globalAudioFunc(standconAudio)
}

function tutSpellAudo(){
	//let standconAudio = currentMergeSet[statsCounter].thlwAudioL;
	let thlwName = currentMergeSet[statsCounter].thlwName.toLowerCase();
	let njtz = audioFileRecord.find(ukcl => ukcl.audioName == thlwName); 
	let standconAudio = njtz ? njtz.audioLessonFile : undefine;
	console.log("lesson", thlwName)
	globalAudioFunc(standconAudio)
}

function againAudio(){
	//let njtz = standcon.find(ukcl => ukcl.standconWord == "again");
	//let standconAudio = njtz ? njtz.standconAudio : undefine;
	let njtz = audioFileRecord.find(ukcl => ukcl.audioName == "again"); 
	let standconAudio = njtz ? njtz.audioDescriptionFile : undefine;
	console.log("again")
	globalAudioFunc(standconAudio)
}

function chanllegeAudo(){
	//let njtz = standcon.find(ukcl => ukcl.standconWord == "challenge"); 
	//let standconAudio = njtz ? njtz.standconAudio : undefine;
	let njtz = audioFileRecord.find(ukcl => ukcl.audioName == "challenge"); 
	let standconAudio = njtz ? njtz.audioDescriptionFile : undefine;
	console.log("challenge")
	globalAudioFunc(standconAudio)
}

function tutQuesiontAudo(){
	//let standconAudio = currentMergeSet[statsCounter].thlwAudioQ;
	let thlwName = currentMergeSet[statsCounter].thlwName.toLowerCase();
	let njtz = audioFileRecord.find(ukcl => ukcl.audioName == thlwName); 
	let standconAudio = njtz ? njtz.audioQuestionFile : undefine;
	console.log("question", thlwName)
	globalAudioFunc(standconAudio)
}

function challCorrectAudio(){
	//let njtz = standcon.find(ukcl => ukcl.standconWord == "correct"); 
	//let standconAudio = njtz ? njtz.standconAudio : undefine;
	let njtz = audioFileRecord.find(ukcl => ukcl.audioName == "correct"); 
	let standconAudio = njtz ? njtz.audioDescriptionFile : undefine;
	globalAudioFunc(standconAudio)
}

function challWrongAudio(){
	//let njtz = standcon.find(ukcl => ukcl.standconWord == "wrong"); 
	//let standconAudio = njtz ? njtz.standconAudio : undefine;
	let njtz = audioFileRecord.find(ukcl => ukcl.audioName == "wrong"); 
	let standconAudio = njtz ? njtz.audioDescriptionFile : undefine;
	globalAudioFunc(standconAudio)
}
function tryAgainAudio(){
	//let njtz = standcon.find(ukcl => ukcl.standconWord == "retry"); 
	//let standconAudio = njtz ? njtz.standconAudio : undefine;
	let njtz = audioFileRecord.find(ukcl => ukcl.audioName == "retry"); 
	let standconAudio = njtz ? njtz.audioDescriptionFile : undefine;
	globalAudioFunc(standconAudio)
}

function gotospellingP(){
	let lessonPic = document.getElementById("lessonPic");
	let lessonW = document.getElementById("lessonW");
	let lessonWDC = document.getElementById("lessonWDC");
	
	lessonW.innerHTML = currentMergeSet[statsCounter].thlwName;
	resizingLessonLetters()
	lessonWDC.innerHTML = '';
}
function gotochallengeP(){
	let lessonPic = document.getElementById("lessonPic");
	let clearLessonW = document.getElementById("clearLessonW");
	let lessonW = document.getElementById("lessonW");
	let lessonWDC = document.getElementById("lessonWDC");
	let cellWordPick = document.getElementById("cellWordPick");
	

	lessonPic.innerHTML = `<img width="100x" height="67px" src="./pixagime/${currentMergeSet[statsCounter].thlwImage}"  draggable="false">`;
	lessonW.innerHTML = '';
	lessonWDC.innerHTML = '';
	
	let setNewalphabet = [...alphabet];
	//console.log("setNewalphabet", setNewalphabet)
	shuffle(setNewalphabet)
	
	let slicedSetNewalphabet = '';

	
	let alphset = currentMergeSet[statsCounter].thlwName;
	let alphsetLength = alphset.length;
	let alphsetArray = stringToArray(alphset)
	
	if(alphsetLength == 3){
		slicedSetNewalphabet = setNewalphabet.splice(0, 3);
	}else if(alphsetLength == 4){
		slicedSetNewalphabet = setNewalphabet.splice(0, 2);
	}
	shuffle(slicedSetNewalphabet)
	let combineAlphals = [...slicedSetNewalphabet, ...alphsetArray];
	shuffle(combineAlphals)
	

	let remAlphalsArr = []
	let remAlphalsVa = '';

	rearrangeCSW();
	
	function rearrangeCSW(){
		
		combineAlphals.forEach(function(item, index) {
			let cellwordDiv = document.createElement("div");
			
			let cellwordP = document.createElement("p");
			cellwordP.innerHTML = item;
			
			cellwordDiv.addEventListener("click", function() {
				remAlphalsArr.push(cellwordP.innerText)
				lessonW.innerHTML += cellwordP.innerText;
				remAlphalsVa += cellwordP.innerText;
				resizingLessonLetters()
				cellwordDiv.remove();
				addingClearButton()
				stopAllAudio()
				
				let remAlphalsVaLenght = remAlphalsVa.length;
				if(alphsetLength == remAlphalsVaLenght){
					checkSpellResult()
				}
				//console.log(remAlphalsArr)
				//console.log(remAlphalsVa)
			});
			
			cellwordDiv.appendChild(cellwordP);
			cellWordPick.appendChild(cellwordDiv);
		});
		randomAnimLetters();
	}
	function addingClearButton(){
		clearLessonW.classList.add('clear-lesson-row')
		clearLessonW.innerHTML = `<div class="clear-lesson-col">X</div>`;
		clearLessonW.addEventListener("click", function() {
			clearingSpelledWords()
		});
	}
	function clearingSpelledWords(){
		remAlphalsArr = [];
		lessonW.innerHTML = '';
		remAlphalsVa = '';
		cellWordPick.innerHTML = '';
		
		clearLessonW.classList.remove('clear-lesson-row');
		clearLessonW.innerHTML = '';
		rearrangeCSW();
	}
	function checkSpellResult(){
		cellWordPick.innerHTML = '';
		clearLessonW.classList.remove('clear-lesson-row');
		clearLessonW.innerHTML = '';
		if(alphset == remAlphalsVa){
			
			stopAllAudio();
			console.log("correct")
			realClearingToConLesson()
			statsCounter++;
			challCorrectTone = 1;
			startLessong()
		}else{
			stopAllAudio()
			console.log("wrong")
			realClearingToConLesson()
			repeatdiscribeCount = 2;
			challWrongTone = 1;
			startLessong()
		}
		
	}
	
	function realClearingToConLesson(){
		remAlphalsArr = [];
		//lessonW.innerHTML = '';
		remAlphalsVa = '';
		cellWordPick.innerHTML = '';
		clearLessonW.classList.remove('clear-lesson-row');
		clearLessonW.innerHTML = '';
		
		resetPlayProps()
	}
	
}


function globalAudioFunc(audio){
	//console.log(audio)
	//let audio = new Audio("./ledphoney/"+audioSound);
	//let audio = audioSound;
	/*activeAudioList.push(audio);
	audio.addEventListener('ended', () => {
		const index = activeAudioList.indexOf(audio);
        if (index !== -1) activeAudioList.splice(index, 1);
		
		startLessong();
	});
	audio.addEventListener('error', (e) => {
		const index = activeAudioList.indexOf(audio);
       if (index !== -1) activeAudioList.splice(index, 1);
		console.error('Audio error:', e);
		//startLessong();
	});
	audio.play()
	.catch(err => {
	  // play() returns a promise – catch rejections (e.g., autoplay blocked)
	  console.error('Play failed:', err);
		const index = activeAudioList.indexOf(audio);
	  if (index !== -1) activeAudioList.splice(index, 1);
	  startLessong();
	});*/
	
	//activeAudioList.add(audio);
	audio.play()
    .catch(err => console.error('Play failed:', err));
	
	audio.onended = () =>{
		//activeAudioList.delete(audio);
		startLessong();
	}

  /*audio.addEventListener('ended', () => {
    // When it finishes we can forget about it
    activeAudioList.delete(audio);
    startLessong();               // your existing callback
  });*/

  /*audio.addEventListener('error', (e) => {
    console.error('Audio error:', e);
    activeAudioList.delete(audio); // clean up on error as well
  });*/


  // Optional: if you ever pause manually, also clean up
  //audio.addEventListener('pause', () => activeAudioList.delete(audio));

  //return audio;   // in case the caller wants the object
}


function stopAllAudio() {
    // Stop DOM audio/video elements
    /*const mediaElements = document.querySelectorAll('audio, video');
    mediaElements.forEach(element => {
        if (!element.paused) {
            element.pause();
            element.currentTime = 0;
        }
    });

     //Stop all tracked Audio objects
    activeAudioList.forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    // Clear the tracking list
    activeAudioList = [];*/
	
	document.querySelectorAll('audio, video').forEach(el => {
    el.pause();
    el.currentTime = 0;
  });

}

function resizingLessonLetters(){
	let viewportWidth = window.innerWidth;
		//console.log("Viewport width:", viewportWidth, "pixels");
	  const questionTexts = document.querySelectorAll('.lesson-word');
	  questionTexts.forEach(textElement => {
			const length = textElement.textContent.length;
			let fontSize; 
			let letterSpacing;
			//console.log(length)
			
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
			}else if(viewportWidth <= 768 && length >= 2){
				fontSize = '80px';
				letterSpacing = '30px';
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
			}else if(viewportWidth <= 390 && length >= 2){
				fontSize = '70px';
				letterSpacing = '20px';
			}
			
			 textElement.style.fontSize = fontSize;
			 textElement.style.letterSpacing = letterSpacing;
			 textElement.style.transition = 'font-size 0.3s ease';
		});
		
		return;
}

function randomAnimLetters(){
	// Set random animation delays for each p element
	
    const pElements = document.querySelectorAll('.cell-words p');
    pElements.forEach(element => {
        // Generate a random delay between 0 and 2 seconds
        const randomDelay = Math.random() * 4;
        element.style.animationDelay = `${randomDelay}s`;
    });
}

function stringToArray(str) {
    return str.split('');
}

