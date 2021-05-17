console.log("Hi");
var user;
const db= firebase.database()
var database = firebase.database();
firebase.auth().onAuthStateChanged(function(userInfo){
    if(userInfo){

        username = userInfo.email;
		console.log("The user is " + username)
		username = username.split("@");
		console.log(username[0],"userId");
		user = username[0];
		startListener(); 

		// write your code and call functions from here cause we only have the user after this point

        
    }
    else{
        console.log("no user signed in")
    }

})



signout =()=>{
	firebase.auth().signOut().then(() => {
		console.log("Signout successful")
		window.location.href = "./index.html"
	  }).catch((error) => {
		// An error happened.
	  });
}





 


// Your web app's Firebase configuration
var database = firebase.database();

//   var flag = 1;
//   var message = "hello";
var otherUser = "sg748"
function sendMessage() {
	//console.log(user)
	var x = document.getElementById("chatForm");
	if (x.elements[1].value > 1 || x.elements[1].value < 0) {
		alert("FLAG MUST BE 0/1");
		return false;
	}
	// var text = "";
	//var i;
	let obj = {
		Flag: x.elements[1].value,
		Message: x.elements[0].value,
		createdAt: firebase.database.ServerValue.TIMESTAMP
	};
	console.log(obj);
	//console.log("USer before sending msg",user)
	firebase
		.database()
		.ref("/Messaging/"+ user +"/Messages/"+otherUser)
		.push(obj);
}

//var readRef = firebase.database().ref("Adil/Messages/Simran/");
function startListener(){
	var readRef = firebase.database().ref("/Messaging/"+ user + "/Messages/"+otherUser);
	readRef.on("value", function(snapshot) {
	//  document.getElementById("textDisp").innerHTML = "";
	console.log("DB chnaged")

		if (snapshot.val()!=null){
			snapshot.forEach(snap => {
			const chat = snap.val();
			console.log(chat);

			if (chat.Flag == 1) {
			// document.getElementById("container").style.color = "red";
			var div = document.createElement("div");
			document.createElement("div");
			div.id = "container";
			div.innerHTML = `${chat.Message}`;
			var chatDisplay = document.getElementById("chatDisplay");
			chatDisplay.appendChild(div);
			// div.className = "border pad";

			//  document.getElementById("container").innerHTML += ;
			} else if (chat.Flag == 0) {
			//  document.getElementById("textDisp").style.color = "black";
			// document.getElementById(
			//   "container-dark"
			// ).innerHTML += `${chat.Message}`;
			var div = document.createElement("div");
			document.createElement("div");
			div.id = "container-dark";
			div.innerHTML = `${chat.Message}`;
			var chatDisplay = document.getElementById("chatDisplay");
			chatDisplay.appendChild(div);
			}
			// const data = snapshot.val();
			// console.log(data.createdAt);
		});
	}
		else{
			console.log("Issa null");
		}
	});
}
