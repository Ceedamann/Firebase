// $(document).ready(function(){
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC3aJZkAivvDvf3zTwzzhf7oExY44iq-fw",
    authDomain: "allaboard-704f8.firebaseapp.com",
    databaseURL: "https://allaboard-704f8.firebaseio.com",
    projectId: "allaboard-704f8",
    storageBucket: "",
    messagingSenderId: "492971905103",
    appId: "1:492971905103:web:04be41380c219a2da15a3a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainName;
  var trainDestination
  var trainFrequency;
  var firstTrain;
  var trainNexArrival;
  var trainMinutesAway;
// add-train submit button//
  $("#add-train").on('click',function(event){
    event.preventDefault();

    trainName = $("#train-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();
    firstTrain = $("#time-input").val().trim();

    database.ref().push({
      dbTrainName: trainName,
      dbTrainDestination: trainDestination,
      dbTrainFrequency: trainFrequency,
      dbFirstTrain: firstTrain,
    });
    alert("Train Added");
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");
  });
  database.ref().on("child_added", function(snap){
    console.log(snap.val());
    var tName = snap.val().dbTrainName;
    var tDestination = snap.val().dbTrainDestination;
    var tFrequency = snap.val().dbTrainFrequency;
    var tFirstTrain = snap.val().dbFirstTrain;   
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
// Current Time
var currentTime = moment();
// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var tf = $("<tr>")
    tf.append(
        "<td>"+ tName+ "</td>",
        "<td>"+ tDestination+ "</td>",
        "<td>"+ tFrequency+ "</td>",
        "<td>"+ moment(nextTrain).format("hh:mm") + "</td>",
        "<td>"+ tMinutesTillTrain + "</td>",
    );   
    $("#train > tbody").append(tf)
    
    
  })
