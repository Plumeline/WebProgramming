const goals = document.querySelectorAll('.goal_clickable');

goals.forEach((goal) => {
  goal.addEventListener('click', toggleInfo);
});



function toggleInfo(event) {

  current_goal = event.currentTarget;

  let div_to_show = document.getElementById("G" + current_goal.id[1]);
  const divs = document.querySelectorAll('.fullInfo');

  divs.forEach((div) => {
    if (div != div_to_show){
      console.log(div.id);
      let c_g = document.getElementById("g"+div.id[1]);
      div.style.display = 'none';
      c_g.style.height = '';
      c_g.style.borderBottomLeftRadius = '10px';
      c_g.style.borderBottomRightRadius = '10px';
    }
  });

  if (window.getComputedStyle(div_to_show).display === 'flex'){
    current_goal.style.height = '';
    current_goal.style.borderBottomLeftRadius = '10px';
    current_goal.style.borderBottomRightRadius = '10px';
  } else {
    current_goal.style.height = current_goal.offsetHeight + 10 + 'px';
    current_goal.style.borderBottomLeftRadius = '0px';
    current_goal.style.borderBottomRightRadius = '0px';
    // The id of the divs are of the form Gi with i going from 1 to the total number of goal
    if (div_to_show.id[1] % 2 === 1){  // These are the goals to the left of the screen
      div_to_show.style.borderTopRightRadius = '10px';
    } else {  // These the ones to the right
      div_to_show.style.borderTopLeftRadius = '10px';
    }
  }

  div_to_show.style.display = (window.getComputedStyle(div_to_show).display === "flex") ? "none" : "flex";
}