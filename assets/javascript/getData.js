$(document).ready(function(){
  let test = $.getJSON("data/data.json", function(j){
      console.log("~File access complete.")
  }).done(function(json){
      console.log(json.document.title);

    console.log("~Fetching complete.")
  }).fail(function(){
    console.log("~Getting Error in getting JSON.")
  }).always(function(){
    console.log("~Always complete.");
  })


})
