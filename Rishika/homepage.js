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
let SearchResults = []

searchBar.addEventListener('keyup', (e) => {
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

})

Search = () => {

}

test = () => {


	/* courses = ["CSE","EEE","SOC","CMS","ECE"]
	db.ref("Universities/CME").set({
		Location:"Koti",
		Courses:courses
	}).then(()=>{
		console.log("db set")
	}) */
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



}