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