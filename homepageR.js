firebase.auth().onAuthStateChanged(function (user) {
	if (user) {

		username = user.email;
		console.log("The user is " + username)



	}
	else {
		console.log("no user signed in")
	}

})

const db = firebase.database()

signout = () => {
	firebase.auth().signOut().then(() => {
		console.log("Signout successful")
		window.location.href = "./index.html"
	}).catch((error) => {
		// An error happened.
	});
}

const searchBar = document.getElementById('searchBar')
let SearchResultsUni = []
let SearchResultsCourse = []
let SearchResults = []
let FilteredResults = []

search = () => {
	SearchResultsUni = []
	SearchResultsCourse = []
	SearchResults = []
	var searchString = document.getElementById("searchBar").value
	//console.log(searchString)
	db.ref("Universities").once('value', (snap) => {
		snap.forEach((subSnap) => {
			if (subSnap.key.toLowerCase().includes(searchString.toLowerCase())) {
				//console.log("match");
				temp = new Object()
				temp.name = subSnap.key
				temp.location = subSnap.val().Location
				temp.country = subSnap.val().Country
				temp.tuition = subSnap.val().Annual_Tuition
				temp.livingExp = subSnap.val().Living_Expenses
				temp.accRate = subSnap.val().Acceptance_Rate
				SearchResultsUni.push(temp)
			}
			subSnap.forEach((subsubSnap) => {
				if (subsubSnap.key == "Courses") {
					subsubSnap.forEach((subsubsubSnap) => {
						if (subsubsubSnap.key.toLowerCase().includes(searchString.toLowerCase())) {
							//console.log("match");
							temp = new Object()
							temp.name = subSnap.key
							temp.location = subSnap.val().Location
							temp.course = subsubsubSnap.key
							temp.country = subSnap.val().Country
							temp.tuition = subSnap.val().Annual_Tuition
							temp.livingExp = subSnap.val().Living_Expenses
							temp.accRate = subSnap.val().Acceptance_Rate
							SearchResultsCourse.push(temp)
						}
					})
				}
			})
		})
	}).then(() => {
		console.log(SearchResultsUni)
		console.log(SearchResultsCourse)
		SearchResults = SearchResultsUni.concat(SearchResultsCourse)
		console.log(SearchResults)
		filters()
		//document.getElementById("searchres").value = SearchResults //DISPLAYS OBJECTS IN TEXT AREA - FIX
	})

}

let countryList = [] //RENDER AS RADIO BUTTONS
getCountries = () =>{
	countryList = []
	if(FilteredResults.length>0){
		FilteredResults.forEach((obj)=>{
			if(countryList.indexOf(i) === -1) {
				countryList.push(obj.country);
			}
			//countryList.push(obj.country)
		})

	var SearchResults1 = document.createElement("div"); //Create left div
	SearchResults1.id = "left"; //Assign div id
	SearchResults1.setAttribute("style", "float:left; width:66.5%; line-height: 26px; text-align:left; font-size:12pt; padding-left:8px; height:60px;"); //Set div attributes
	SearchResults1.style.background =  "#FF0000";
	SearchResults1.style.borderBlockStart = "solid";
	SearchResults1.style.borderBlockStartColor = "green";
	/* a = document.createElement('a');
	a.href =  'google.com'; // Insted of calling setAttribute 
	a.innerHTML = "Link" // <a>INNER_TEXT</a>
	SearchResults.appendChild(a); // Append the link to the div */
	/* p = document.createElement('p');
	var textNode = document.createTextNode(" This is a new text node");
	p.appendChild(textNode);
	SearchResults.appendChild(p); // Append the link to the div */

	var radioHtml = '<input type="radio" name="' + name + '"';
	var checked = 0;
    if ( checked ) {
        radioHtml += ' checked="checked"';
    }
    radioHtml += '/>';

    var radioFragment = document.createElement('div');
    radioFragment.innerHTML = radioHtml;

    //radioFragment.firstChild;
	SearchResults1.appendChild(radioFragment.firstChild)
	document.body.appendChild(SearchResults1);
	}
	else{
		SearchResults.forEach((obj)=>{
			if(countryList.indexOf(i) === -1) {
				countryList.push(obj.country);
			}
			//countryList.push(obj.country)
		})

	}
}


filterCheck = (accRateFilter, tutFilter, livingExpFilter) =>{
	FilteredResults = []
	SearchResults.forEach((obj)=>{
		if((obj.accRate < accRateFilter) && (obj.tuition < tutFilter) && (obj.livingExp < livingExpFilter))
			FilteredResults.push(obj)
	})
	console.log(FilteredResults)
	getCountries()
}

filters = () =>{
var accRateFilter = 100
var tutFilter = 10000000
var livingExpFilter = 10000000
if (document.querySelector('input[name="accrate"]')) {
	document.querySelectorAll('input[name="accrate"]').forEach((elem) => {
	  elem.addEventListener("change", function(event) {
		accRateFilter = event.target.value
		filterCheck(accRateFilter,tutFilter,livingExpFilter)
	  })
	})
  }
  if (document.querySelector('input[name="tuition"]')) {
	document.querySelectorAll('input[name="tuition"]').forEach((elem) => {
	  elem.addEventListener("change", function(event) {
		tutFilter = event.target.value
		filterCheck(accRateFilter,tutFilter,livingExpFilter)
	  })
	})
  }
  if (document.querySelector('input[name="livingexp"]')) {
	document.querySelectorAll('input[name="livingexp"]').forEach((elem) => {
	  elem.addEventListener("change", function(event) {
		livingExpFilter = event.target.value
		filterCheck(accRateFilter,tutFilter,livingExpFilter)
	  })
	})
  }
}








/* searchBar.addEventListener('keyup', (e) => {
	const searchStr = e.target.value
	searchStr.toLowerCase()
	db.ref("Universities").once('value', (snap) => { // query to get the Uni information using keyword
		// if the keyword is present in either the univeristy name or the courses offered by the univeristy, that University information is stored
		snap.forEach((subSnap) => {
			//console.log(typeof(subSnap.key))
			let converted = subSnap.key.toLowerCase()
			if (converted.includes(searchStr)) {
				temp = new Object()
				temp.name = subSnap.key
				temp.location = subSnap.val().Location
				temp.courses = []

				tempCourses = subSnap.val().Courses
				for (i = 0; i < tempCourses.length; ++i)
					if (tempCourses[i].includes(searchStr))
						temp.courses.push(tempCourses[i])

				SearchResults.push(temp)
			}
			else {
				temp = new Object()
				temp.courses = []
				tempCourses = subSnap.val().Courses
				for (i = 0; i < tempCourses.length; ++i)
					if (tempCourses[i].includes(searchStr))
						temp.courses.push(tempCourses[i]);

				if (temp.courses.length != 0) {
					temp.name = subSnap.key
					temp.location = subSnap.val().Location

					SearchResults.push(temp)
				}


			}
		})
	}).then(() => {
		console.log(SearchResults.reverse()) // printing the query results. If the uni
	})

}) */

/* Search = () => {

} */

/* test = () => {

	searchStr = "CM"
	SearchResults = []

	db.ref("Universities").once('value', (snap) => { // query to get the Uni information using keyword
		// if the keyword is present in either the univeristy name or the courses offered by the univeristy, that University information is stored
		snap.forEach((subSnap) => {
			console.log(typeof (subSnap.key))
			if (subSnap.key.includes(searchStr)) {
				temp = new Object()
				temp.name = subSnap.key
				temp.location = subSnap.val().Location
				temp.courses = []

				tempCourses = subSnap.val().Courses
				for (i = 0; i < tempCourses.length; ++i)
					if (tempCourses[i].includes(searchStr))
						temp.courses.push(tempCourses[i])

				SearchResults.push(temp)
			}
			else {
				temp = new Object()
				temp.courses = []
				tempCourses = subSnap.val().Courses
				for (i = 0; i < tempCourses.length; ++i)
					if (tempCourses[i].includes(searchStr))
						temp.courses.push(tempCourses[i]);

				if (temp.courses.length != 0) {
					temp.name = subSnap.key
					temp.location = subSnap.val().Location

					SearchResults.push(temp)
				}


			}
		})
	}).then(() => {
		console.log(SearchResults) // printing the query results. If the uni
	})

} */