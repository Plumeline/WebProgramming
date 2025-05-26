
const factor_vaccine = 3;
const factor_well = 0.75;


window.

window.onload = function(){

    loadData();
};

window.addEventListener("beforeunload", function(){

    saveData();


});

function increase(money){

    console.log("something happens.");

    let input = document.getElementById("money");
    let persons = document.getElementById("nbchildren");
    let vaccine = document.getElementById("nbvaccine");

    

    let curr = parseInt(input.value) ;

    if(money < 0 && curr ===0){
        return;
    }

    curr = curr+ money;

    input.value= curr;


    persons.textContent= curr * factor_well;

    vaccine.textContent = curr * factor_vaccine;


}


function gift(){


    let input = document.getElementById("money");

    let money = parseInt(input.value);

    if(money===0){
        alert("You need at least 1 dollar to make a donation");
        return;
    }

    let vaccine = document.getElementById("vaccine");

    let well = document.getElementById("well");



    vaccine.textContent = parseInt(vaccine.textContent) + money *factor_vaccine;

    well.textContent = parseInt(well.textContent) + money *factor_well;

    increase(-money);


    alert("Thank you a lot for your gift of " + money + " $, many people are grateful for your help !");



}




function saveData() {

    const vaccine = document.getElementById("vaccine").textContent;

    const well = document.getElementById("well").textContent;

    localStorage.setItem("vaccineCount", vaccine);

    localStorage.setItem("wellCount", well);

}



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