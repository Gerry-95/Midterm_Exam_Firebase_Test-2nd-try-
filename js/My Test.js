var database = firebase.database();
google.charts.load('current', {'packages':['corechart']});

$(".alert").hide();
$(".img").hide();

var strsup2 = "2";
var result1 = strsup2.sup();

var strsup3 = "3";
var result2 = strsup3.sup();

var strsup4 = "4";
var result3 = strsup4.sup();

var strsup5 = "5";
var result4 = strsup5.sup();

var strsub1 = "1";
var result4 = strsub1.sub();

var strsub2 = "2";
var result5 = strsub2.sub();


var questionArray = [
    "Solve: y = x" + strsup2.sup() + " + 4x + 4", 
    "Given x" + strsub1.sub() + " = 1, x" + strsub2.sub() + " = 5: Find the average rate of change of: f(x) = x" + strsup2.sup() + " - 2x + 8.",
    "Given f(x) = x" + strsup2.sup() + " + 3 and g(x) = 2x - 1, find f(x) * g(x).",
    "Multiply: ",
    //Use a picture to display question
    "Describe the end behavior of this function: f(x) = x" + strsup5.sup() + " + 3x" + strsup3.sup() + " - 9x",
    "Let's go to imaginary land; simplify the complex number (make sure the answer is in standard form): (-2 + 3i)" + strsup2.sup() + "",
    "Find all zeros of this function: f(x) = 2x" + strsup4.sup() + " - x" + strsup3.sup() + " + 7x" + strsup2.sup() + " - 4x - 4 (hint: list the possible rational zeros first)",
    "Solve the inequality: (1/x) - 4 < 0",
    "What is the equation of an ellipse with the foci at (-2,2) and (4,2) and a minor axis of 8 units long (remember that the a value represents the major axis). Draw a picture to help you.",
    "Chris Flippin was cheating off of Scott on his last Conics quiz (he wasn't actually; I just couldn't resist the memes XD). He was given the equation x" + strsup2.sup() + " = -2y and needed to find the vertex, focus, and directrix of the parabola. He found that the vertex was at the origin, but he couldn't remember how to find the focus and the directrix. If he were to remember how to find what he was missing, what would his ENTIRE answer have to be for him to get the question right?",
];
var answerArray = [
    ["x = 2", "x = +/- 2", "x = 2i", "x = -2"],
    ["-4", "3", "4", "2"],
    ["2x" + strsup3.sup() + " + x" + strsup2.sup() + " + 6x - 3", "2x" + strsup3.sup() + " - x" + strsup2.sup() + " + 5x - 3", "2x" + strsup3.sup() + " - x" + strsup2.sup() + " + 6x - 3", "2x" + strsup2.sup() + " + x" + strsup2.sup() + " + 6x - 3"],
    ["x(x + 2)(x - 2)/2x(x + 5)", "(x + 2)(x - 2)/2(x - 5)", "x(x" + strsup2.sup() + " - 4)/2x(x + 5)", "x(x" + strsup2.sup() + " + 4)/2x(x + 5)"],
    ["as x nears infinity, f(x) nears infinity; as x nears -infinity, f(x) nears infinity", "as x nears infinity, f(x) nears infinity; as x nears -infinity, f(x) nears -infinity", "as x nears infinity, f(x) nears -infinity; as x nears -infinity, f(x) nears -infinity",  "as x nears infinity, f(x) nears -infinity; as x nears -infinity, f(x) nears infinity"],
    ["-12i - 5", "13 + 12i", "13", "-5 - 12i"],
    ["x = +/- 2i, x = - 1/2, x = 1", "x = - 2i, x = -1/2, x = 1, x = 2", "x = +/-2i, x = 1/2, x = 1", "x = +/- 2i, x = +/- 1"],
    ["(-infinity, infinity)", "(-infinity, 0)U(0, 1/4)", "(-infinity, 0)U(1/4, infinity)", "(0, 1/4)U(1/4, infinity)"],
    ["(x - 1)" + strsup2.sup() + "/(16) + (y - 2)" + strsup2.sup() + "/(25) = 1", "(x - 1)" + strsup2.sup() + "/(25) + (y - 2)" + strsup2.sup() + "/(16) = 1", "(x + 1)" + strsup2.sup() + "/(25) + (y + 2)" + strsup2.sup() + "/(16) = 1", "(x - 1)" + strsup2.sup() + "/(10) + (y - 2)" + strsup2.sup() + "/(8) = 1"],
    ["Vertex: (0,0); Focus: (0,1/2); Directrix: y = -(1/2)", "Vertex: (0,1/2); Focus: (0,-1/2); Directrix: y = 1/2", "Vertex: (0,0); Focus: (-1/2,0); Directrix: x = 1/2", "Vertex: (0,0); Focus: (0,-1/2); Directrix: y = 1/2"],
];

var correctAnswers = [
                      0, 
                      2, 
                      2,
                      1, 
                      1, 
                      3, 
                      0, 
                      2, 
                      1, 
                      3,
];

var selectedAnswers = [];

var questionCounter = 0;

var correctCounter = 0;

$( document ).ready(function() {
    
    displayQuestion();
    displayAnswers();
    displayQuestionNumber();
    $("#scoreReport").hide();
    $("#questionInfo").hide();
    $("question1").hide();
    $("question2").hide();
    $("question3").hide();
    $("question4").hide();
    $("question5").hide();
    $("question6").hide();
    $("question7").hide();
    $("question8").hide();
    $("question9").hide();
    $("question10").hide();
    
});

var displayQuestion = function() {
    $(".img").hide();
    document.getElementById("questionText").innerHTML = questionArray[questionCounter];
        if (questionCounter == 3) {
            $(".img").show();
    }
}

var displayAnswers = function() {
        $("input").removeAttr("checked");
    // Refresh the button.
    var answers = answerArray[questionCounter];
    for (var i = 0; i < answers.length; i++) {
        var answerText = answers[i];
        var choiceName = "choice" + (i+1);
        document.getElementById(choiceName).innerHTML = answerText;
    }
       
};

var displayQuestionNumber = function() {
    document.getElementById("questionIndicator").innerHTML = "Question " + (questionCounter + 1) + " / 10";
}

var buttonClicked = function() {
    $(".alert").hide();
    var radioButtons = document.getElementsByClassName("radioButton");
    var checkedFlag = false;
    for (var i = 0; i < radioButtons.length; i++) {
        var currentButton = radioButtons[i];
        if (currentButton.checked == true) {
            checkedFlag = true;
            var choiceName = "choice" + (i+1);
            var selection = document.getElementById(choiceName).innerHTML;
            selectedAnswers.push(selection);
            if (answerArray[questionCounter].indexOf(selection) == correctAnswers[questionCounter]) {
                correctCounter++;
                //maybe add something later
            }
            break;
        }
    }
    
    if (checkedFlag == false) {
        //Display alert
        $(".alert").show();
        return;
    }
    
    console.log(correctCounter)
    console.log(selectedAnswers);
    console.log(correctAnswers);
    console.log(questionCounter);
    
    //next question plz
    questionCounter++;
    if (questionCounter >= questionArray.length) {
        //End Test
        //Display score report, send score report to data base, etc.
        collectData();
        return;
        
    }
    displayQuestion();
    displayAnswers();
    displayQuestionNumber();
}

var collectData = function() {
    //loop thru selected answer
    //determine if each is correct
    //gener8 out, 1 = correct, 0 = otherwise
    var outputObject = {};
    for (var i = 0; i < selectedAnswers.length; i++) {
        var outputValue = 0;
        if (answerArray[i].indexOf(selectedAnswers[i])== correctAnswers[i]) {
            //question is correct
            outputValue = 1;
        }
        var outputKey = "question" + i;
        outputObject[outputKey] = outputValue;
    }
    sendData(outputObject);
}



var sendData = function(opobj) {
    //Get a key for new response
    console.log(opobj);
    var newPostKey = firebase.database().ref().child('responses').push().key;
    //Write new response's data simultaneously to database
    var updates = {};
    updates['/responses/' + newPostKey] = opobj;
    firebase.database().ref().update(updates);
    readData();
}

var readData = function() {
firebase.database().ref('/responses/').once('value').then(function(snapshot) {
        //...
        console.log(snapshot.val());
        //1st, calculate student score
        var studentScore = 100*correctCounter / questionArray.length;
        var classAverage = 0;
        var classScore = 0;
        var keys = Object.keys(snapshot.val());
        var outputArray = [
            ['Grade', 'Number'],
            ['F', 0],
            ['D', 0],
            ['C', 0],
            ['B', 0],
            ['A', 0]
        ];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var response = snapshot.val()[key];
            var responseKeys = Object.keys(response);
            var responseScore = 0;
            for (var x = 0; x < responseKeys.length; x++) {
                var responseKey = responseKeys[x];
                responseScore+=response[responseKey];
            }
            classScore+=responseScore;
            var responsePercent = 100*responseScore / questionArray.length
            if (responsePercent >= 90) {
                outputArray[5][1] += 1;
               }
            else if (responsePercent >= 80) {
                outputArray[4][1] += 1;
            }
            else if (responsePercent >= 70) {
                outputArray[3][1] += 1;
            }
            else if (responsePercent >= 60) {
                outputArray[2][1] += 1;
            }
            else {
                outputArray[1][1] += 1;
            }
        classAverage = 100*classScore / (keys.length * questionArray.length)
        $("#main").hide();
        $("#scoreReport").show();
        $("#totalScoreDiv").html("Your score: " + studentScore + "<br>Class Average: " + classAverage); 
        drawChart(outputArray);
        $("questionInfo").show();
        $("question1").show();
        $("text1").html("" + (document.getElementById("questionText").innerHTML = questionArray[0]) + "<br>Your Answer: " + selectedAnswers[0] + "<br>Correct Answer: " + correctAnswers[0])
        $("advice1").html("get good")
        };
    });
};


var drawChart = function(withData) {
        var data = google.visualization.arrayToDataTable(withData);

        var options = {
             title: 'Overall Class Performance',
             pieHole: 0.3,
             slices: {
               0: {
                  color: '#DC143C'
               }, 
               1: {
                  color: 'orange'
               }, 
               2: {
                  color: 'yellow'
               },
               3: {
                  color: 'green'
               }, 
               4: {
                  color: '#0000CD'
               } 
            },
             pieSliceTextStyle: {
                color: 'black'
            }
         };

        var chart = new google.visualization.PieChart(document.getElementById('bellChartDiv'));
        chart.draw(data, options);
}