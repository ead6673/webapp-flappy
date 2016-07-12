jQuery("#credits").on("click", function() {
    var message = "Game created by Trap God Gucci Mane";
    jQuery("#credits").append(
    "<p>" + message + "</p>"
   );
});

jQuery("#creditsbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<div>" + "Game created by Trap God Gucci Mane" + "</div>"
    );
});

jQuery("#helpbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>"+ "<li>" + "Press SPACE to Jump" + "</li>"+ "<li>" + "Avoid the incoming pipes" + "</li>"+ "</ul>"
    );
});

function registerScore(score) {
  console.log("2");
  //if(score>5) {
    //alert(score);
    var playerName = prompt("What's your name?");
    var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
//  }
}
