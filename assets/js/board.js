import { alphabet, currentMergeSet, challengeOnlyArr, shuffle, deseydicing, currentBatchIndex, increaseCurrentBatchIndex, constantArrayNumber, pgnConst, challengesNoLessonMerge, takechallengesNoLMerge } from './serve.js';


var lastAttemptedAudio = null; // Stores the file name to retry
var networkModal = null; // Will hold the Bootstrap modal instance
networkModal = new bootstrap.Modal(document.getElementById('networkErrorModal'));

var activeAudioList = [];
var statsCounter = 0;
var descriptionProp = 0;
var moveToNextWordSets = false;
var endOfLessonSet = false;

let repeatdiscribeCount = 0;
let repeattutCount = 0;
let repeattutAgainTimes = 2; //Do not reset to 0.
let challengeCount = 0;
let againCountRepeat = "no";
let audioPlayStopControl = "play";
let challWrongTone = 0;
let challCorrectTone = 0;
let letsTryAgain = 0;



function resetPlayProps(){
	repeatdiscribeCount = 0;
	descriptionProp = 0;
	repeattutCount = 0;
	challengeCount = 0;
	againCountRepeat = "no";
	audioPlayStopControl = "play";
	challWrongTone = 0;
	challCorrectTone = 0;
	letsTryAgain = 0;
}

//Overall Challenges
var challengeOnlyCounter = 0;
let overallChallengeProp = 0;

//Challenges No Lesson
var ChallengesNoL = false;
var challengesNoLCounter = 0;

function resetOverallChallenge(){
	audioPlayStopControl = "play";
	challengeCount = 0;
	challWrongTone = 0;
	challCorrectTone = 0;
	letsTryAgain = 0;
	
}

function resetForNewWordSets(){
	statsCounter = 0;
	challengeOnlyCounter = 0;
	overallChallengeProp = 0;
}





var standcon = [
{"standconWord":"welcome", "standconDescript":"Welcome. Let's get straight to the fun part.", "standconAudio":"welcome.mp3"},
{"standconWord":"again", "standconDescript":"Again", "standconAudio":"again.mp3"},
{"standconWord":"challenge", "standconDescript":"Now Let's take a challenge", "standconAudio":"challenge.mp3"},
{"standconWord":"correct", "standconDescript":"Correct", "standconAudio":"correct.mp3"},
{"standconWord":"wrong", "standconDescript":"Wrong", "standconAudio":"wrong.mp3"},
{"standconWord":"retry", "standconDescript":"Let's try again.", "standconAudio":"retry.mp3"},
{"standconWord":"incorrect", "standconDescript":"Incorrect", "standconAudio":"incorrect.mp3"},
{"standconWord":"overall_challenge", "standconDescript":"Time to take a challenge on all we have learnt so far.", "standconAudio":"overall_challenge.mp3"},
{"standconWord":"next_words", "standconDescript":"Its time for our next words", "standconAudio":"next_words.mp3"},
{"standconWord":"end_lesson", "standconDescript":"We have come to the end of this lesson. Please leave us a feed back. Thank You.", "standconAudio":"end_lesson.mp3"}
];

export function threeFourLWBoard(){
	let lessonPic = document.getElementById("lessonPic");
	let lessonW = document.getElementById("lessonW");
	let lessonWDC = document.getElementById("lessonWDC");

	lessonPic.innerHTML = `<img width="300px" height="200px" src="./pixagime/${currentMergeSet[0].thlwImage}"  draggable="false">`;
	lessonWDC.innerHTML = currentMergeSet[0].thwDescribe;
	
	document.getElementById("takingchallenges").addEventListener("click", function(event) { 
	ChallengesNoL = true;
	resetOverallChallenge()
	statsCounter = currentMergeSet.length
	document.getElementById("takingchallenges").style.display = 'none';
	document.getElementById("rboard").style.display = 'none';
	takechallengesNoLMerge();
	//startLessong();
});
	
	clickingAgain()
	//statsCounter = currentMergeSet.length;
	welcomeAudio()
}
function clickingAgain(){
	let vClickElements = document.querySelectorAll('.rboard .v-click');

	// Loop through elements and add event listener
	vClickElements.forEach((element, index) => {
	  element.addEventListener('click', () => {
		vClickElements.forEach(el => el.classList.remove('active'));
		element.classList.add('active');
		  if(index == 0) repeattutAgainTimes = 2;
		  else if(index == 1) repeattutAgainTimes = 3;
		  else if(index == 2) repeattutAgainTimes = 4;

		//console.log(index + 2); // +1 because index is 0-based
	  });
	});
}
export function endLessonClose(){
	endLessonAudio();
}
export function startLessong(){
	if(endOfLessonSet == true){
		endOfLessonSet = false;
		window.location.href = './';
		return;
	}
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
		if (descriptionProp == 0)  gotodescriptionP(); //describe image and text
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
			if(repeattutCount < repeattutAgainTimes){ //spelling audio_l
				if(againCountRepeat == "no"){
					repeattutCount++;
					againCountRepeat = "yes"
					
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
		if (overallChallengeProp == 0){    //over challenge audio
			overallChallengeAudio();
			return;
		}
		
		if(ChallengesNoL == true){
			let challengeNoLsLenght = challengesNoLessonMerge.length;
			if(challengesNoLCounter != challengeNoLsLenght){
			if(challengeCount == 0 && audioPlayStopControl == "play"){ //lets take a challenge
				challengeCount = 1;
				audioPlayStopControl = "stop";
				gotochallengeNoLP();
				setTimeout(() => {
					document.getElementById("lessonW").innerHTML = '';
					challengeNoLQuesiontAudo()
				}, 100);
			}
			}else{
				endLessonClose()
			}
			
			return;
		}
		let challengeOnlyArrLenght = challengeOnlyArr.length;
		if(challengeOnlyCounter != challengeOnlyArrLenght){
			if(challengeCount == 0 && audioPlayStopControl == "play"){ //lets take a challenge
				challengeCount = 1;
				audioPlayStopControl = "stop";
				gotochallengeOnlyP();
				setTimeout(() => {
					document.getElementById("lessonW").innerHTML = '';
					challengeQuesiontAudo()
				}, 100);
			}
		}else{
			if(moveToNextWordSets === true){
				moveToNextWordSets = false;
				resetPlayProps();
				resetForNewWordSets();
				increaseCurrentBatchIndex();
				return;
			}
			let batchstop = constantArrayNumber/pgnConst-1;
			batchstop = batchstop.toFixed(0)
			if(currentBatchIndex >= batchstop){
				moveToNextWordSets = true;
				startLessong();
			}else{
				nextWordsAudio();
			}
		}
	}
}

/****************** LESSON DESCRIPTION, SPELLNNG AND CHALLENGE *****************/
function gotodescriptionP(){
	descriptionProp++;
	document.getElementById("rboard").style.display = '';
	let lessonPic = document.getElementById("lessonPic");
	let lessonW = document.getElementById("lessonW");
	let lessonWDC = document.getElementById("lessonWDC");

	lessonPic.innerHTML = `<img width="300px" height="200px" src="./pixagime/${currentMergeSet[statsCounter].thlwImage}"  draggable="false">`;
	lessonWDC.innerHTML = currentMergeSet[statsCounter].thwDescribe;
}

function gotospellingP(){
	document.getElementById("rboard").style.display = 'none';
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
			//console.log("correct")
			realClearingToConLesson()
			statsCounter++;
			challCorrectTone = 1;
			startLessong()
		}else{
			stopAllAudio()
			//console.log("wrong")
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

function gotochallengeOnlyP(){
	let lessonPic = document.getElementById("lessonPic");
	let clearLessonW = document.getElementById("clearLessonW");
	let lessonW = document.getElementById("lessonW");
	let lessonWDC = document.getElementById("lessonWDC");
	let cellWordPick = document.getElementById("cellWordPick");
	

	lessonPic.innerHTML = `<img width="100x" height="67px" src="./pixagime/${challengeOnlyArr[challengeOnlyCounter].thlwImage}"  draggable="false">`;
	lessonW.innerHTML = '';
	lessonWDC.innerHTML = '';
	
	let setNewalphabet = [...alphabet];
	//console.log("setNewalphabet", setNewalphabet)
	shuffle(setNewalphabet)
	
	let slicedSetNewalphabet = '';

	
	let alphset = challengeOnlyArr[challengeOnlyCounter].thlwName;
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
			//console.log("correct")
			realClearingToConLesson()
			challengeOnlyCounter++;
			challCorrectTone = 1;
			startLessong()
		}else{
			stopAllAudio()
			//console.log("wrong")
			realClearingToConLesson()
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
		
		resetOverallChallenge()
	}
	
}

function gotochallengeNoLP(){
	let lessonPic = document.getElementById("lessonPic");
	let clearLessonW = document.getElementById("clearLessonW");
	let lessonW = document.getElementById("lessonW");
	let lessonWDC = document.getElementById("lessonWDC");
	let cellWordPick = document.getElementById("cellWordPick");
	

	lessonPic.innerHTML = `<img width="100x" height="67px" src="./pixagime/${challengesNoLessonMerge[challengesNoLCounter].thlwImage}"  draggable="false">`;
	lessonW.innerHTML = '';
	lessonWDC.innerHTML = '';
	
	let setNewalphabet = [...alphabet];
	//console.log("setNewalphabet", setNewalphabet)
	shuffle(setNewalphabet)
	
	let slicedSetNewalphabet = '';

	
	let alphset = challengesNoLessonMerge[challengesNoLCounter].thlwName;
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
			//console.log("correct")
			realClearingToConLesson()
			challengesNoLCounter++;
			challCorrectTone = 1;
			startLessong()
		}else{
			stopAllAudio()
			//console.log("wrong")
			realClearingToConLesson()
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
		
		resetOverallChallenge()
	}
	
}

/*****************************ALL AUDIOS *************************/
function welcomeAudio(){
	let njtz = standcon.find(ukcl => ukcl.standconWord == "welcome"); 
	let standconAudio = njtz ? njtz.standconAudio : undefine;
	globalAudioFunc(standconAudio)
}
function discribeAudio(){
	let standconAudio = currentMergeSet[statsCounter].thlwAudioDescribe;
	globalAudioFunc(standconAudio)
}

function tutSpellAudo(){
	let standconAudio = currentMergeSet[statsCounter].thlwAudioL;
	globalAudioFunc(standconAudio)
}

function againAudio(){
	let njtz = standcon.find(ukcl => ukcl.standconWord == "again");
	let standconAudio = njtz ? njtz.standconAudio : undefine;
	globalAudioFunc(standconAudio)
}

function chanllegeAudo(){
	let njtz = standcon.find(ukcl => ukcl.standconWord == "challenge"); 
	let standconAudio = njtz ? njtz.standconAudio : undefine;
	globalAudioFunc(standconAudio)
}

function tutQuesiontAudo(){
	let standconAudio = currentMergeSet[statsCounter].thlwAudioQ;
	globalAudioFunc(standconAudio)
}

function challCorrectAudio(){
	let njtz = standcon.find(ukcl => ukcl.standconWord == "correct"); 
	let standconAudio = njtz ? njtz.standconAudio : undefine;
	globalAudioFunc(standconAudio)
}

function challWrongAudio(){
	let njtz = standcon.find(ukcl => ukcl.standconWord == "wrong"); 
	let standconAudio = njtz ? njtz.standconAudio : undefine;
	globalAudioFunc(standconAudio)
}
function tryAgainAudio(){
	let njtz = standcon.find(ukcl => ukcl.standconWord == "retry"); 
	let standconAudio = njtz ? njtz.standconAudio : undefine;
	globalAudioFunc(standconAudio)
}
function overallChallengeAudio(){
	overallChallengeProp++;
	let njtz = standcon.find(ukcl => ukcl.standconWord == "overall_challenge"); 
	let standconAudio = njtz ? njtz.standconAudio : undefine;
	globalAudioFunc(standconAudio)
}
function nextWordsAudio(){
	moveToNextWordSets = true;
	let njtz = standcon.find(ukcl => ukcl.standconWord == "next_words"); 
	let standconAudio = njtz ? njtz.standconAudio : undefine;
	globalAudioFunc(standconAudio)
}
function endLessonAudio(){
	endOfLessonSet = true;
	let njtz = standcon.find(ukcl => ukcl.standconWord == "end_lesson"); 
	let standconAudio = njtz ? njtz.standconAudio : undefine;
	globalAudioFunc(standconAudio)
}

function challengeQuesiontAudo(){
	let standconAudio = challengeOnlyArr[challengeOnlyCounter].thlwAudioQ;
	globalAudioFunc(standconAudio)
}

function challengeNoLQuesiontAudo(){
	let standconAudio = challengesNoLessonMerge[challengesNoLCounter].thlwAudioQ;
	globalAudioFunc(standconAudio)
}





/*****************************HELPER FUNCTIONS *************************/
function retryLastAudio() {
    if (lastAttemptedAudio) {
        console.log("Retrying audio:", lastAttemptedAudio);
        
        globalAudioFunc(lastAttemptedAudio); 
		// Hide modal (if open) and call globalAudioFunc again
		let currentlyonline = workbackonline();
		if (currentlyonline == 0) {
			networkModal.hide();
		}
		
    }
}
function globalAudioFunc(audioSound) {
	stopAllAudio();
    // 1. Validation: If undefined/null, handle gracefully (or throw error)
    if (!audioSound) {
        console.error("Audio source is undefined.");
        // Decide logic here: Do you want to skip if file is missing, or break?
        // Assuming we treat missing file as an error -> show modal
        lastAttemptedAudio = audioSound;
        networkModal.show();
        return;
    }

    // Update the last attempted audio for retry logic
    lastAttemptedAudio = audioSound;
    
    // Create Audio Object
    let audio = new Audio("./ledphoney/" + audioSound);
    activeAudioList.push(audio);

    // 2. Success Handler (Ended)
    audio.addEventListener('ended', () => {
        const index = activeAudioList.indexOf(audio);
        if (index !== -1) activeAudioList.splice(index, 1);
        
        // Clear last attempt on success
        lastAttemptedAudio = null; 
        
        // Move to next stage
        startLessong();
    });

    // 3. Error Handler (Network/Loading issues)
    audio.addEventListener('error', (e) => {
        console.error('Audio load error:', e);
        handleAudioFailure(audio);
    });

    // 4. Play Attempt
    // We explicitly check if play() fails (e.g., autoplay blocks or network during load)
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error('Play execution failed:', error);
            handleAudioFailure(audio);
        });
    }
}

// --- Helper to handle failures ---
function handleAudioFailure(audioInstance) {
    // Remove the broken audio instance from the active list
    const index = activeAudioList.indexOf(audioInstance);
    if (index !== -1) activeAudioList.splice(index, 1);

    // Do NOT call startLessong(). Instead, show the modal.
    console.log("Pausing execution. Waiting for retry...");
    if (networkModal) {
        networkModal.show();
    } else {
        // Fallback if DOM isn't ready or modal missing
        alert("Network Error: Audio failed to load. Please check connection.");
    }
}

// --- Your existing Stop Function (Unchanged) ---
function stopAllAudio() {
    const mediaElements = document.querySelectorAll('audio, video');
    mediaElements.forEach(element => {
        if (!element.paused) {
            element.pause();
            element.currentTime = 0;
        }
    });

    activeAudioList.forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    activeAudioList = [];
}

window.addEventListener('online', () => {
    console.log("Back online! Retrying...");
    if (lastAttemptedAudio) {
        // Optional: Add a small delay to ensure connection is stable
        setTimeout(() => {
            retryLastAudio();
        }, 1000); 
    }
});


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

function workbackonline() {
    if (navigator.onLine) {
        return 0;
    }else{
        return 1;
    }
}

window.retryLastAudio = retryLastAudio;