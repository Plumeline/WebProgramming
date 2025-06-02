//localStorage.clear();


//this file is dedicated to the connection system of the crew page. 
//you can create an account, and register. Your email and passwords are saved so you can connect again
//you can also disconnect from the page using sign out button.
//You can connect back to any account you created using your email and password corresponding to that account.
//reloading the page does NOT disconnect you from the page (local storage), only sign out button does
// creating a new account will increment the number of contributors



//these are the elementary operations to be done when page loads
window.onload = function () {

    // we check if user is connected using the function
    loadConnection();


    //we update the number of contributors if it has been increased.
    let contributor = document.getElementById("nbcontributors");
    let storedValue = localStorage.getItem("contributors");
    contributor.textContent = storedValue !== null ? storedValue : "17000";
};




// function to register a new user ---------------------------------------------
function subscribe(){

    
    //first we get all the data given by the user
    var firstname = document.getElementById("first_name");
    var lastname = document.getElementById("last_name");
    var collaborator = document.getElementById("collaborator");
    var birth = document.getElementById("birth");
    var birthdate = new Date(birth.value);
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var confirmation = document.getElementById("confirmation");

    //we check if any of the field is empty
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



    //we use the dedicated function to check if user is 18+ 
    if(isOver18(birthdate) === false){

        alert("Sorry ! You can only register if you are 18+ ! Come back when you are older !");
        return;
    }

    //we check whether or not the password and password confirmation match
    if(password.value != confirmation.value){


        alert("Your password and password confirmation don't match");
        password.value="";
        confirmation.value="";

        return;
    }

    //we check if the email isn't already used for another account.
    if(localStorage.getItem(email.value) !== null){
        alert("email has already been used for an account ! ");
        return;
    }

    

    log(firstname.value);
    

    //we add to the storage this combination to let us know we are connected to this account.
    localStorage.setItem("connected", firstname.value);
    //we save the combination of informations about user that is to be used for connection.
    localStorage.setItem(email.value, JSON.stringify([password.value, firstname.value]));

    //we reset every field
    firstname.value="";
    lastname.value="";
    collaborator.value="";
    birth.value="";
    email.value="";
    password.value="";
    confirmation.value="";

    //since a new contributor has joined, we increase the number of contributors, and save the new value 
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


//this function is for updating the page visuals when we are connected. (simply to avoid repetitions in different functions)
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



// function to check if user is connected when loading the page ----------------------------------------
function loadConnection(){

    //check if there is currently a user connected
    if ("connected" in localStorage){
    }
    else{
        return;
        //if not end function
    }


    const username = localStorage.getItem("connected");

    //use the function to make the page display accordingly (make the necessary visual changes for the page to show)
    log(username);


}





//function to sign in with an existing account -----------------------------------------------------
function sign_in(){

    //we get email and password given by user
    let email = document.getElementById("email_sign_in");

    let password = document.getElementById("password_sign_in");

    // we check if an account exists with this mail
    if(localStorage.getItem(email.value) !== null){

    }
    else{
        //if not, we return an error to the user, and end function

        alert("There is no account associated to this email. Please check if email is correct, or subscribe ");
        return;
    }

    //if an account is linked to this mail, we load the informations linked to it

    var userdata = JSON.parse(localStorage.getItem(email.value));

    // we check if the password given corresponds to the password linked to this account
    if(userdata[0] === password.value){


        log(userdata[1]);


        //if yes the user can connect, we store the state connected to the local storage
        localStorage.setItem("connected", userdata[1]);

        //we reset input fields
        email.value="";
        password.value="";

    }
    else{
        //if passwords don't match, we ask user to try again and end function
        alert("Wrong password, please try again ! ");
        return;
    }


}






// function to sign out when connected ----------------------------------
function sign_out(){

    //remove the state connected so the page doesn't connect again when reloading page
    localStorage.removeItem("connected");

    //we do all the necessary visual changes to display back sign and log forms. (and reset personnalized user page)
    let form = document.getElementById("inscription");
    let sign= document.getElementById("sign_in");
    let welcome = document.getElementById("welcome");

    let name = document.getElementById("username");

    form.style.display = "flex";
    sign.style.display = "block";

    name.textContent= "";

    welcome.style.display="none";


}


