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
    // console.log(queryURLnew);
  };

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
       // renderButtons(topics);
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