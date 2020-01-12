// ***********************************************************************
// ***********************************************************************
   // giqtest firebase, db, jquery, utils etc

// ***********************************************************************
// ***********************************************************************
   // All firebase helpers

// ***********************************************************************
// ***********************************************************************

var isFirebase = false;

function firebaseInit(firebase){ //pass in frame reference, firebase ref

	// Initialize Firebase
	var config = {
	  apiKey: "AIzaSyAFdcwGK-yCtftw1fMcOwv_d4UQoo7jYqI",
	  authDomain: "giqtest-2a3bf.firebaseapp.com",
	  databaseURL: "https://giqtest-2a3bf.firebaseio.com",
	  storageBucket: "giqtest-2a3bf.appspot.com",
	  messagingSenderId: "67558629960"
	};
	firebase.initializeApp(config);
	console.log("firebaseInit");
	return true;
}

function firebaseConnect(firebase){ //pass in frame reference, firebase ref

	/** 
	 * Firebase
	 */
	// [START authanon firebase]
	firebase.auth().signInAnonymously().catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // [START_EXCLUDE]
	  if (errorCode === 'auth/operation-not-allowed') {
	    //alert('You must enable Anonymous auth in the Firebase Console.');
	  } else {
	    console.error(error);
	  }
	}) === undefined ? isFirebase = false : isFirebase = true;
	console.log("firebaseConnect", isFirebase);
	return true;
}

function updateTestAnswers(firebase, pF, callBack){ //pass in frame reference, firebase ref, update answers
	console.log("updateTest", callBack, isFirebase);
	//var pF = parent.frames['collect'];
	var ps = pF.picSectionCollector; //shorten names
	var vs =pF.vocabularySectionCollector;
	var rs =pF.recallSectionCollector;
	var rbs =pF.recallBackwardsSectionCollector;
	var res =pF.relationshipSectionCollector;
	var as =pF.arithmeticSectionCollector;

	var params = { 
	ps, 
	vs, //vocabularySectionCollector
	rs, //recallSectionCollector
	rbs,//recallBackwardsSectionCollector
	res,//relationshipSectionCollector
	as//arithmeticSectionCollector
	};
	doFirebaseUpdate(firebase, pF.testKey, "answers", params, callBack);

}
	
function setupTest(pF, testObj){
	//sync data to the frame set
	params = testObj["answers"];

	pF.picSectionCollector = params["ps"]; //shorten names
	pF.vocabularySectionCollector = params["vs"];
	pF.recallSectionCollector = params["rs"];
	pF.recallBackwardsSectionCollector = params["rbs"];
	pF.relationshipSectionCollector = params["res"];
	pF.arithmeticSectionCollector = params["as"];

	pF.testId = testObj["testId"];
	//pF.testKey = testObj["testKey"]; don't think we need, use TestId
	pF.username = testObj["username"];
	pF.email = testObj["email"];
	pF.date = testObj["date"];
}


function doFirebaseUpdate(firebase, testKey, paramKey, params, callBack) {
	console.log("doFirebaseUpdate, then call", callBack);

	//put answers in firebase db
	var currentTestRef = firebase.database().ref('test/' + testKey);

	// Attach an asynchronous callback, what a bunch of complex bollocks
	currentTestRef.once("value", function(snapshot) {
		var currentTest = snapshot.val();
		currentTest[paramKey] = params;
		var updates = {};
		updates['test/' + testKey] = currentTest;
		
		//console.log("firebase updates initiated");
		firebase.database().ref().update(updates, function(error) { //asynchronous callback, what a bunch of complex bollocks
			console.log("firebase updateTest write complete, calling", callBack);
			if (callBack && typeof(callBack) == "function") callBack();	 //if we have a callback, call it (usually submit)
					
		}); //update the test w/ answer params
  		
	}, function (errorObject) {
	  console.log("firebase: The read failed: " + errorObject.code);
	});	
	
}


//function updateTestWith(firebase, key, params, callback{ //pass in frame reference, firebase ref
//	var payPalDate = queryStr["pp"]; //pp is key

//}
	
//}