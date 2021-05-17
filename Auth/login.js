function login(){
    var email = document.getElementById("email").value
    var password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
if(user){
    console.log(user.email);
    window.location.href = "./homepageS.html"
}


    }).catch(function(error){
        window.alert("Error: " + error.message);
    });

    
    
}

function signUp(){
    var email = document.getElementById("emailSign").value
    var password = document.getElementById('passwordSign').value;
    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
        firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
            if(user){
                console.log(user.email)
                window.location.href = "./homepageS.html"
                //window.location.href = "./Rishika/homepageS.html"
            }
        }).catch(function(error){
            window.alert("Error: " + error.message);
        })
    }).catch(function(error){
        window.alert("Error: " + error.message);
    })
}