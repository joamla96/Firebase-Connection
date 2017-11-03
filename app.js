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
    
    //get elements
    const preObject = document.getElementById('object');
    const ulList = document.getElementById('list');
    
    //create references
    const dbRefObject= firebase.database().ref().child('object');
    const dbRefList = dbRefObject.child('Hobbies');
    
    //sync object changes
    dbRefObject.on('value', snap => {
        preObject.innerText = JSON.stringify(snap.val(), null,  3);
    });
    
    //sync list changes
    dbRefList.on('child_added', snap => {
        
        const li = document.createElement('li');
        li.innerText = snap.val();
        li.id = snap.key;
        ulList.appendChild(li);
    });
    
    dbRefList.on('child_changed', snap => {
        
        const liChanged = document.getElementById(snap.key);
        liChanged.innerText = snap.val();
    });
    
    dbRefList.on('child_removed', snap=> {
        const liToRemove = document.getElementById(snap.key);
        liToRemove.remove();
    })
    
}());
