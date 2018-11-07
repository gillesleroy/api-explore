var user = [];
//get user info and store locally
$("#button-submit").on("click", function(event) {
    event.preventDefault();
    var userName = $("#input-user").val().trim();
    var firstName = $("#input-first").val().trim();
    var lastName = $("#input-last").val().trim();

    localStorage.setItem("user", userName);
    localStorage.setItem("first", firstName);
    localStorage.setItem("last", lastName);       
 });
//click on api buttons to show or hide update button if its the owner or not
 $(".classApi").on("click", function(event){
    var checker = $(this).attr("owner");
    if(localStorage.getItem("user") === checker){
        $("#upd-button").hide();
    }
    else{
        $("#upd-button").show();  
    }
 });
/*
 $(document).on("click", ".classApi", displayInfo);

 function displayInfo(){
    $("#input-user").reset();
    $("#input-first").reset();
    $("#input-last").reset();
 }
*/
 //clear form
 /*
 $("#clear-button").on("click", function(event){
    $("#login-user").reset();
    $("#login-first").reset();
    $("#login-last").reset();
 })
 */