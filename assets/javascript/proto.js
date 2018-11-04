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

// database.ref().set({
//     apis: topics
//     }); 

function isValid(inputVal)
{
    var isGood = true;
    if (inputVal.trim() != "" )
    {
      for (var i=0;i<topics.length;i++)
      {
       //   alert("array index="+i);
          if(topics[i].name.toLowerCase() === inputVal.toLowerCase())
          {
            isGood = false;
            break;
          }
      }
    }  
    else
    {
        isGood = false;
    }   
return (isGood);
}

// function renderApiInfo(results)
// {
//     var numCols = 0;
//     $("#imgReturned").empty();
//     for (var i=0;i<results.length;i++)
//           {
//           var imageUrl = results[i].images.fixed_height_still.url;
//           var imageUrlAnim = imageUrl.replace("_s.",".");
//           var imageRating = results[i].rating;      
 
//           if (numCols ===0)
//              {
//               var divRow = addObj({
//                   type:  "div"
//                   ,class: "row"
//                   ,attr: [
//                           { a: "id", v: "divrow"}
//                           ]
//                   });
//              }
//           var divTopic = addObj({
//                                   type:  "div"
//                                   ,class: "col-lg-4"
//                                   ,attr: [
//                                           { a: "id", v: "divTopic"}
//                                           ]
//                                   });
//           divTopic.append(addObj(
//               {
//                   type: "p"
//                  ,class: "pClass"
//                  ,text:  "Rating: "+imageRating
//                  ,attr: [ 
//                           { a: "id", v: "pTopic"}
//                       //    ,{ a: "text", v: imageRating}
//                         ]
//               }));

//           divTopic.append(
//               addObj(
//                   {type: "img"
//                        ,class: "imgClass"
//                        ,attr: [
//                           { a: "src", v: imageUrl},
//                           { a: "alt", v: topics[i]},
//                           { a: "image-still", v: imageUrl},
//                           { a: "image-anim", v: imageUrlAnim},
//                           { a: "image-state", v: "still"}
//                           ]
//                        }
//               )      
//           );   
//           $(divRow).prepend(divTopic);

//           if (numCols === 0)    
//           {
//               $("#imgReturned").prepend(
//                   divRow
//                  );                       
//           }     
//           numCols++;
//           if (numCols > 3)
//           {
//               numCols = 0;
//           }         
//       }
// }

function displayApiInfo() {
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
    $("#input-name").val(apiName);
    $("#input-description").val(apiDescription);
    $("#input-owner").val(apiOwner);
    $("#input-authors").val(apiAuthors);
    $("#input-docurl").val(apiDocurl);
    $("#input-url").val(apiURL);
    $("#input-param").val(apiParam);
    $("#input-sample").val(apiSample);
    $("#input-key").val(apiKey);
    $("#frameSample").attr("src",apiSample);
    // console.log(apiURL);
    // console.log(apiKey);
    // console.log(apiParam);
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

//  renderButtons();
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


// Click on Submit adds a button
$("#clear-button").on("click", function(event) {
    event.preventDefault();
    topics = topicInit;
    database.ref().set({
    apis: topics
    });      
    $("#imgReturned").empty();
    renderButtons(topics);
});

// Click on Submit adds a button
$("#add-button").on("click", function(event) {
    event.preventDefault();
    var apiName = $("#input-name").val().trim();
    var apiDescription = $("#input-description").val().trim();
    var apiOwner = $("#input-owner").val().trim();
    var apiAuthors = $("#input-authors").val().trim();
    var apiDocurl = $("#input-docurl").val().trim();
    var apiUrl = $("#input-url").val().trim();
    var apiParam = $("#input-param").val().trim();
    var apiSample = $("#input-sample").val().trim();
    var apiKey = $("#input-key").val().trim();
    if (isValid(apiName))
    {
        names = JSON.parse(localStorage.getItem('names'));
        if (names === null)
        {
            names = namesInit;
            console.log(names[0].name);
        }

        topics.push({name: apiName 
                   , description: apiDescription
                   , owner: apiOwner
                   , authors: apiAuthors
                   , docurl: apiDocurl
                   , url: apiUrl
                   , param: apiParam
                   , sample: apiSample
                }); 
        // topics[0].name = apiName;
        database.ref().set({
        apis: topics
        });           
        renderButtons(topics);
        names.push({name: apiName,
                    value: apiKey 
              });
        localStorage.setItem('names', JSON.stringify(names));       
        $("#input-name").val("");
        $("#input-description").val("");
        $("#input-owner").val("");
        $("#input-authors").val("");
        $("#input-docurl").val("");
        $("#input-url").val("");
        $("#input-param").val("");
        $("#input-sample").val("");
        $("#input-key").val("");
    }
});

$("#upd-button").on("click", function(event) {
    event.preventDefault();
    var apiName = $("#input-name").val().trim();
    var apiDescription = $("#input-description").val().trim();
    var apiOwner = $("#input-owner").val().trim();
    var apiAuthors = $("#input-authors").val().trim();
    var apiDocurl = $("#input-docurl").val().trim();   
    var apiUrl = $("#input-url").val().trim();
    var apiParam = $("#input-param").val().trim();
    var apiSample = $("#input-sample").val().trim();
    var apiKey = $("#input-key").val().trim();
    var isFound = false;
    // if (isValid(apiName))
    // {
        names = JSON.parse(localStorage.getItem('names'));
        if (names === null)
        {
            names = namesInit;
            // console.log(names[0].name);
        }

        topics[apiIndex].description = apiDescription;
        topics[apiIndex].owner = apiOwner;
        topics[apiIndex].authors = apiAuthors;
        topics[apiIndex].docurl = apiDocurl;
        topics[apiIndex].url = apiUrl;
        topics[apiIndex].param = apiParam;
        topics[apiIndex].sample = apiSample;
        // topics.push({name: apiName 
        //            , url: apiUrl
        //            , param: apiParam
        //            , sample: apiSample
        //         }); 
        // topics[0].name = apiName;
        database.ref().set({
                            apis: topics
                            });           
        // renderButtons(topics);
        // names[apiIndex+1].name;
        for (var i=0;i<names.length;i++)
        {
            if (names[i].name === apiName)
            {
                names[i].value = apiKey;
                isFound = true;
                break;
            }
        }        
        if (!isFound){
            names.push({name: apiName,
                        value: apiKey 
                });
        }

        localStorage.setItem('names', JSON.stringify(names));       
 });

 $("#del-button").on("click", function(event) {
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

// $(document).on("click", ".imgClass", imgChangeState);