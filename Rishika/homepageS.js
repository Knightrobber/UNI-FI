firebase.auth().onAuthStateChanged(function(user){
    if(user){

        username = user.email;
		console.log("The user is " + username)


        
    }
    else{
        console.log("no user signed in")
    }

})

const db= firebase.database()

signout =()=>{
	firebase.auth().signOut().then(() => {
		console.log("Signout successful")
		window.location.href = "./index.html"
	  }).catch((error) => {
		// An error happened.
	  });
}

test = ()=>{


	/* courses = ["CSE","EEE","SOC","CMS","ECE"]
	db.ref("Universities/CME").set({
		Location:"Koti",
		Courses:courses
	}).then(()=>{
		console.log("db set")
	}) */
	searchStr = "CM"
	SearchResults = []

	db.ref("Universities").once('value',(snap)=>{ // query to get the Uni information using keyword
		// if the keyword is present in either the univeristy name or the courses offered by the univeristy, that University information is stored
		snap.forEach((subSnap)=>{
			//console.log(typeof(subSnap.key))
			if (subSnap.key.includes(searchStr)){
				temp = new Object()
				temp.name = subSnap.key
				temp.location = subSnap.val().Location
				temp.courses = []

				tempCourses = subSnap.val().Courses
				for (i=0;i<tempCourses.length;++i)
					if (tempCourses[i].includes(searchStr))
						temp.courses.push(tempCourses[i])
					
				SearchResults.push(temp)
			}
			else{
				temp = new Object()
				temp.courses = []
				tempCourses = subSnap.val().Courses
				for (i=0;i<tempCourses.length;++i)
					if (tempCourses[i].includes(searchStr))
						temp.courses.push(tempCourses[i]);
				
				if (temp.courses.length!=0){
					temp.name = subSnap.key
					temp.location = subSnap.val().Location
					
					SearchResults.push(temp)
				}

				
			}
		})
	}).then(()=>{
		console.log(SearchResults) // printing the query results. If the uni
		

		if (SearchResults.length!=0){

			for (i=0;i<SearchResults.length;++i){
				// code here dynamically renders buttons based on the search results
				var button = document.createElement("button");
				button.type = 'button';
				button.innerHTML = SearchResults[i].name;
				button.className = 'btn-styled';

				button.onclick = function() { // Note this is a function
					console.log("Button clicked")
					//render the info here
				};

				/* var foo = document.getElementById("fooBar");
				//Append the element in page (in span).  
				foo.appendChild(element); */
				var container = document.getElementById('container');
				container.appendChild(button);
				addNode() // this is the function that renders cards. plis finish this function
			}


			

		}

		



		

	})

	



}


var PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
function decode(id) {
  id = id.substring(0,8);
  var timestamp = 0;
  for (var i=0; i < id.length; i++) {
    var c = id.charAt(i);
    timestamp = timestamp * 64 + PUSH_CHARS.indexOf(c);
  }
  return timestamp;
}
var key = "-MYUwa0VJLMoygS2qhbg"
if (key) {
  var timestamp = decode(key);
  console.log(timestamp+"\n"+new Date(timestamp));
  //alert(timestamp+"\n"+new Date(timestamp));
}


function addNode(uniName,courses) // code to render the red cards. needs to take the university name and the courses of the search result and display it
     {
	  

	  var SearchResults = document.createElement("div"); //Create left div
	  SearchResults.id = "left"; //Assign div id
	  SearchResults.setAttribute("style", "float:left; width:66.5%; line-height: 26px; text-align:left; font-size:12pt; padding-left:8px; height:60px;"); //Set div attributes
	  SearchResults.style.background =  "#FF0000";
	  SearchResults.style.borderBlockStart = "solid";
	  SearchResults.style.borderBlockStartColor = "green";
	  /* a = document.createElement('a');
	  a.href =  'google.com'; // Insted of calling setAttribute 
	  a.innerHTML = "Link" // <a>INNER_TEXT</a>
	  SearchResults.appendChild(a); // Append the link to the div */
	  p = document.createElement('p');
	  var textNode = document.createTextNode(" This is a new text node"); // this renders a text dynamically
	  p.appendChild(textNode);
	  SearchResults.appendChild(p); // Append the link to the div

	  
	  SearchResults.onclick = function(){ // when you click on one of the serach results you must be redirected to another page with all the bs info. For later
		  console.log("CLicked");
	  }
	  document.body.appendChild(SearchResults);

	} 
