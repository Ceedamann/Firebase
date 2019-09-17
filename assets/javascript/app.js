$(document).ready(function(){
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
    })
    alert("Train Added");
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");

  })
  database.ref().on("child_added", function(snap){
    console.log(snap.val());
    var tName = snap.val().dbTrainName;
    var tDestination = snap.val().dbTrainDestination;
    var tFrequency = snap.val().dbTrainFrequency;
    var tFirstTrain = snap.val().dbFirstTrain;

    var tr = $("<tr>")
    tr.append(
        "<td>"+ tName+ "</td>",
        "<td>"+ tDestination+ "</td>",
        "<td>"+ tFrequency+ "</td>",
        "<td>+ to be calculated+ </td>",
        "<td>+ to be calculated+ </td>",
    )
    $("tbody").append(tr)

  })
})