//localStorage.clear();


window.onload = function () {
    loadConnection();


    //update nb of contributors
    let contributor = document.getElementById("nbcontributors");
    let storedValue = localStorage.getItem("contributors");
    contributor.textContent = storedValue !== null ? storedValue : "17000";
};




// function to register a new user ---------------------------------------------
function subscribe(){

    
    var firstname = document.getElementById("first_name");
    var lastname = document.getElementById("last_name");
    var collaborator = document.getElementById("collaborator");
    var birth = document.getElementById("birth");
    var birthdate = new Date(birth.value);
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var confirmation = document.getElementById("confirmation");

    if(firstname.value===""){
        alert("Please enter your First Name");
        return;
    }

    if(lastname.value===""){
        alert("Please enter your Last Name");
        return;
    }
    
    if(collaborator.value===""){
        alert("Please enter the type of contributor you want to be");
        return;
    }

    if(birth.value===""){
        alert("Please enter your birth date");
        return;
    }

    if(email.value==""){
        alert("Please enter your email");
        return;
    }

    if(password.value===""){
        alert("Please enter your password");
        return;
    }

    if(confirmation.value===""){
        alert("Please enter your password confirmation");
        return;
    }

    //console.log("value of email :" + email.value);
    if(isOver18(birthdate) === false){

        alert("Sorry ! You can only register if you are 18+ ! Come back when you are older !");
        return;
    }

    if(password.value != confirmation.value){


        alert("Your password and password confirmation don't match");
        password.value="";
        confirmation.value="";

        return;
    }

    if(localStorage.getItem(email.value) !== null){
        alert("email has already been used for an account ! ");
        return;
    }

    

    log(firstname.value);
    
    localStorage.setItem("connected", firstname.value);
    localStorage.setItem(email.value, JSON.stringify([password.value, firstname.value]));


    firstname.value="";
    lastname.value="";
    collaborator.value="";
    birth.value="";
    email.value="";
    password.value="";
    confirmation.value="";


    let contributors = document.getElementById("nbcontributors");
    let newvalue = parseInt(contributors.textContent);
    newvalue ++;
    contributors.textContent=newvalue;
    localStorage.setItem("contributors", newvalue);


}



//function to check if the date given corresponds to a person having 18 years old or not -----------------------------------------------
function isOver18(date){

    let today = new Date();

    let age = today.getFullYear() - date.getFullYear();


    if(today.getMonth() < date.getMonth()){
        age -- ;
    }

    return (age>=18);


}



function log(username){

    

    let form = document.getElementById("inscription");
    let welcome = document.getElementById("welcome");
    let sign= document.getElementById("sign_in");
    let name = document.getElementById("username");

    form.style.display = "none";
    sign.style.display = "none";

    name.textContent= username;

    welcome.style.display="block"; 



}



// function to check if user is connected when first connection happens ----------------------------------------
function loadConnection(){

    if ("connected" in localStorage){
    }
    else{
        return;
    }


    const username = localStorage.getItem("connected");


    log(username);


}





//function to sign in with an existing account -----------------------------------------------------
function sign_in(){

    let email = document.getElementById("email_sign_in");

    let password = document.getElementById("password_sign_in");

    if(localStorage.getItem(email.value) !== null){

    }
    else{
        alert("There is no account associated to this email. Please check if email is correct, or subscribe ");
        return;
    }


    var userdata = JSON.parse(localStorage.getItem(email.value));

    if(userdata[0] === password.value){


        log(userdata[1]);

        localStorage.setItem("connected", userdata[1]);

        email.value="";
        password.value="";

    }
    else{
        alert("Wrong password, please try again ! ");
        return;
    }


}






// function to sign out when connected ----------------------------------
function sign_out(){


    localStorage.removeItem("connected");

    let form = document.getElementById("inscription");
    let sign= document.getElementById("sign_in");
    let welcome = document.getElementById("welcome");

    let name = document.getElementById("username");

    form.style.display = "flex";
    sign.style.display = "block";

    name.textContent= "";

    welcome.style.display="none";


}


