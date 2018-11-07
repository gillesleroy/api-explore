// Initialize Firebase
var config = {
    apiKey: "AIzaSyCIMUTrI21xr6S3raX4U_o3opClC5T9FrI",
    authDomain: "api-exploration-838a6.firebaseapp.com",
    databaseURL: "https://api-exploration-838a6.firebaseio.com",
    projectId: "api-exploration-838a6",
    storageBucket: "api-exploration-838a6.appspot.com",
    messagingSenderId: "526245276523"
  };

firebase.initializeApp(config);

var database = firebase.database();
// Initial list of topic buttons
var topicInit = [
    {
      name: "NYtimes"
    , description: "NYtimes"
    , owner: "gilles"     
    , authors: ""
    , docurl: "www"
    , url: "https://api.nytimes.com/svc/search/v2/articlesearch.json"
    , param: "&q=trump&facet_field=source&begin_date=20180101&end_date=20181231"
    , sample: "file:///Users/gillesleroy/Documents/Gilles/UCB/06-%20API%20and%20AJAX/Day-02/09-ClickJSON/Unsolved/nytimes-4.html"
    }
];
var topics = []; //topicInit;
var namesInit = [{
                  name: "dummy"
                , value: ""
                }];
var names = [];

var apiIndex;

function displayApiInfo() {
    $("#display-name").text("");
    $("#display-description").text("");
    $("#display-owner").text("");
    $("#display-authors").text("");
    $("#display-docurl").text("");
    $("#display-url").text("");
    $("#display-param").text("");
    $("#display-sample").text("");
    $("#display-key").text("");
    $("#frameSample").attr("src","#");
    // var limit = 10;
    var apiName = $(this).attr("api-name");
    var apiDescription = $(this).attr("api-description");
    var apiOwner = $(this).attr("api-owner");
    var apiAuthors = $(this).attr("api-authors");
    var apiDocurl = $(this).attr("api-docurl");
    var apiURL = $(this).attr("api-url");
    var apiParam = $(this).attr("api-param");   
    var apiSample = $(this).attr("api-sample");   
    apiIndex = $(this).attr("api-index"); 
    // var apiKey = $("#input-key").val().trim();
    names = JSON.parse(localStorage.getItem('names'));
    if (names === null)
    {
        names = namesInit;
        console.log(names[0].name);
    }
    for (var i=0;i<names.length;i++)
    {
        if (names[i].name === apiName)
        {
            var apiKey = names[i].value;
            break;
        }
    }
    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";
// console.log("topic="+topic);
    // var queryURL = "https://api.giphy.com/v1/gifs/search?"
    //   +"q=" + topic
    //   +"&limit="+limit 
    //   +"&api_key="+apiKey;
    // var searchTerm = "trump"; //$("#search-term").val();
    // var numberRecords = "5"; //$("#number-records").val();
    // var startYear = "20180101"; //$("#start-year").val();
    // var endYear = "20181231"; //$("#end-year").val();
    // var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    // queryURL = queryURL + "&q="+searchTerm+"&facet_field=source&begin_date="+startYear+"&end_date="+endYear;
    // $("#display-name").val(apiName);
    $("#display-name").text(apiName);
    $("#display-description").text(apiDescription);
    $("#display-owner").text(apiOwner);
    $("#display-authors").text(apiAuthors);
    $("#display-docurl").text(apiDocurl);
    $("#display-url").text(apiURL);
    $("#display-param").text(apiParam);
    $("#display-sample").text(apiSample);
    $("#display-key").text(apiKey);
    $("#frameSample").attr("src",apiSample);
    // console.log(apiURL);
    // console.log(apiKey);
    // console.log(apiParam);

    $("#nav").append(
        addObj({
            type:  "button"
            ,class: "classToForm"
            ,text: savedButtons[i].name
            ,attr: [
                     { a: "api-name", v: savedButtons[i].name}
                   ]
            })
        );

    var queryURL = apiURL+apiKey+apiParam;
    console.log(queryURL);
    // console.log(queryURLnew);

    $.ajax({
      url: queryURL,
      method: "GET",
    //   headers: {
    //     Authorization:"6e3bf298-dadd-11e8-83ef-0242ac130004-6e3bf3a6-dadd-11e8-83ef-0242ac130004"
    //      }
    }).then(function(response) {
      console.log(response);

   //   var results = response.data;

  //    renderApiIfnfo(results);

    });
  };

//Refresh the list of buttons from the array
function renderButtons(savedButtons) {
    $("#api-list").empty();
    // Looping through the array of topics
    for (var i = 0; i < savedButtons.length; i++){
        $("#api-list").append(
                                addObj({
                                    type:  "button"
                                    ,class: "classApi"
                                    ,text: savedButtons[i].name
                                    ,attr: [
                                             { a: "api-name", v: savedButtons[i].name}
                                           , { a: "api-description", v: savedButtons[i].description}
                                           , { a: "api-owner", v: savedButtons[i].owner}
                                           , { a: "api-authors", v: savedButtons[i].authors}
                                           , { a: "api-docurl", v: savedButtons[i].docurl}
                                           , { a: "api-url", v: savedButtons[i].url}
                                           , { a: "api-param", v: savedButtons[i].param}
                                           , { a: "api-sample", v: savedButtons[i].sample}
                                           , { a: "api-index", v: i}
                                           ]
                                    }
                                )

        )}
  }

  $("#edit-button").on("click", function(event) {
    event.preventDefault();
    var apiName = $("#input-name").val().trim();
    names = JSON.parse(localStorage.getItem('names'));
    if (names === null)
    {
        names = namesInit;
        // console.log(names[0].name);
    }
    topics.splice(apiIndex,1);
    database.ref().set({
                        apis: topics
                        });           
    for (var i=0;i<names.length;i++)
    {
        if (names[i].name === apiName)
        {
            names.splice(i,1);
            break;
        }
    }        
    localStorage.setItem('names', JSON.stringify(names));       
});

 // Firebase watcher + initial loader HINT: .on("value")
 database.ref().on("value", 
    function(snapshot) {
        // console.log(snapshot.val());
        topics = snapshot.val().apis;     
        renderButtons(topics);
        //  renderButtons(snapshot.val().names);
        },

        function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        });

$(document).on("click", ".classApi", displayApiInfo);

$(document).on("click", ".classToForm", function() {
    var url = "https://gillesleroy.github.io/api-explore/form.html?p_apiname="+$(this).attr("api-name");
    window.location(url);
    }
);

