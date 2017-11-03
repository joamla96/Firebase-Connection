(function() {
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCcUTgo4wNncUG9z9FWRvghZ19hgccPrxI",
    authDomain: "test-283b6.firebaseapp.com",
    databaseURL: "https://test-283b6.firebaseio.com",
    projectId: "test-283b6",
    storageBucket: "test-283b6.appspot.com",
    messagingSenderId: "1025862960864"
};

firebase.initializeApp(config);

const txtEmail = document.getElementById("txtemail");
const Password = document.getElementById("pass");
const btnLogIn = document.getElementById("btnLogIn");
const btnSingUp = document.getElementById("btnSingUp");
const btnLogOut = document.getElementById("btnLogOut");

    //add login event
btnLogIn.addEventListener('click', e => {
    //get email and pass
    const email = txtEmail.value;
    const pass = Password.value;
    const auth = firebase.auth();
    //sing in
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));
});
//add singup event
btnSingUp.addEventListener('click', e =>{
    //get email and pass
    const email = txtEmail.value;
    const pass = Password.value;
    const auth = firebase.auth();
    //create user
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});
    
    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut();
    });
    
    
    //add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser)
            {
                console.log(firebaseUser);
                btnLogOut.classList.remove('hide');
            } 
        else
            {
                console.log('not logged in');
                btnLogOut.classList.add('hide');
            }
    });
    
    
}());
