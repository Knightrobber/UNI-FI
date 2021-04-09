firebase.auth().onAuthStateChanged(function(user){
    if(user){

        username = user.email;
		console.log("The user is " + username)


        
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