
const factor_vaccine = 3;
const factor_well = 0.75;

//this file allows the gift part of the file to work
//when increasing the amount of money to give, this file will update the number of people helped displayed
// when making a gift, it will display a thank you message
//the data of how many people are helped will also be added to the table of statistics
// ex if you give 1$, it will pass from 0 person helped to 3 and 0.75,
//and when you press "give" it will effectively add those 3 and 0.75 to the fields corresponding in the table of data
// this table and the data inside it are saved in local storage ; reloading the page won't reset the data



//window.

//onload, charge data
window.onload = function(){

    loadData();
};

//on unload, save data
window.addEventListener("beforeunload", function(){

    saveData();


});


//function to deal with the change of money
function increase(money){

    //console.log("something happens.");

    //we get the necessary informations for this
    let input = document.getElementById("money");
    let persons = document.getElementById("nbchildren");
    let vaccine = document.getElementById("nbvaccine");

    

    let curr = parseInt(input.value) ;


    //if money is 0 and we try to go negative, not possible, stop function
    if(money < 0 && curr ===0){
        return;
    }

    //increase the number of money
    curr = curr+ money;

    input.value= curr;

    //update the number of people helped depending on how many money is given 
    persons.textContent= curr * factor_well;

    vaccine.textContent = curr * factor_vaccine;


}

//function to deal with event : button 'gift is pressed'
function gift(){


    //we get how many is being given
    let input = document.getElementById("money");

    let money = parseInt(input.value);

    // check if the amount given is not zero
    if(money===0){
        alert("You need at least 1 dollar to make a donation");
        return;
    }

    
    let vaccine = document.getElementById("vaccine");

    let well = document.getElementById("well");


    //add to the table the amount of persons helped by the gift
    vaccine.textContent = parseInt(vaccine.textContent) + money *factor_vaccine;

    well.textContent = parseInt(well.textContent) + money *factor_well;

    //and we decrease the money by its amount to get back to zero
    increase(-money);

    //display a little message to thank the giver
    alert("Thank you a lot for your gift of " + money + " $, many people are grateful for your help !");



}



//function to save data in local storage
function saveData() {

    const vaccine = document.getElementById("vaccine").textContent;

    const well = document.getElementById("well").textContent;

    localStorage.setItem("vaccineCount", vaccine);

    localStorage.setItem("wellCount", well);

}


//function to load data from local storage
function loadData() {

    const vaccine = localStorage.getItem("vaccineCount");

    const well = localStorage.getItem("wellCount");


    if (vaccine!== null) {

        document.getElementById("vaccine").textContent = vaccine;

    }

    if (well !== null) {

        document.getElementById("well").textContent = well;

    }
}