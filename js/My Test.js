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
    "(Copy/paste the picture so you can view it later.) Multiply: ",
    //Use a picture to display question
    "Describe the end behavior of this function: f(x) = x" + strsup5.sup() + " + 3x" + strsup3.sup() + " - 9x",
    "Let's go to imaginary land; simplify the complex number (make sure the answer is in standard form): (-2 + 3i)" + strsup2.sup() + "",
    "Find all zeros of this function: f(x) = 2x" + strsup4.sup() + " - x" + strsup3.sup() + " + 7x" + strsup2.sup() + " - 4x - 4 (hint: list the possible rational zeros first)",
    "Solve the inequality: (1/x) - 4 < 0",
    "What is the equation of an ellipse with the foci at (-2,2) and (4,2) and a minor axis of 8 units long (remember that the a value represents the major axis). Draw a picture to help you.",
    "Chris Flippin was cheating off of Scott on his last Conics quiz (he wasn't actually; I just couldn't resist the memes XD). He was given the equation x" + strsup2.sup() + " = -2y and needed to find the vertex, focus, and directrix of the parabola. He found that the vertex was at the origin, but he couldn't remember how to find the focus and the directrix. If he were to remember how to find what he was missing, what would his ENTIRE answer have to be for him to get the question right?",
];
var answerArray = [
    ["a) x = 2", "b) x = +/- 2", "c) x = 2i", "d) x = -2"],
    ["a) -4", "b) 3", "c) 4", "d) 2"],
    ["a) 2x" + strsup3.sup() + " + x" + strsup2.sup() + " + 6x - 3", "b) 2x" + strsup3.sup() + " - x" + strsup2.sup() + " + 5x - 3", "c) 2x" + strsup3.sup() + " - x" + strsup2.sup() + " + 6x - 3", "d) 2x" + strsup2.sup() + " + x" + strsup2.sup() + " + 6x - 3"],
    ["a) x(x + 2)(x - 2)/2x(x + 5)", "b) (x + 2)(x - 2)/2(x + 5)", "c) x(x" + strsup2.sup() + " - 4)/2x(x + 5)", "d) (x + 2)(x - 2)/2(x - 5)"],
    ["a) as x nears infinity, f(x) nears infinity; as x nears -infinity, f(x) nears infinity", "b) as x nears infinity, f(x) nears infinity; as x nears -infinity, f(x) nears -infinity", "c) as x nears infinity, f(x) nears -infinity; as x nears -infinity, f(x) nears -infinity",  "d) as x nears infinity, f(x) nears -infinity; as x nears -infinity, f(x) nears infinity"],
    ["a) -12i - 5", "b) 13 + 12i", "c) 12i + 13", "d) -5 - 12i"],
    ["a) x = +/- 2i, x = - 1/2, x = 1", "b) x = - 2i, x = -1/2, x = 1, x = 2", "c) x = +/-2i, x = 1/2, x = 1", "d) x = +/- 2i, x = +/- 1"],
    ["a) (-infinity, infinity)", "b) (-infinity, 0)U(0, 1/4)", "c) (-infinity, 0)U(1/4, infinity)", "d) (0, 1/4)U(1/4, infinity)"],
    ["a) (x - 1)" + strsup2.sup() + "/(16) + (y - 2)" + strsup2.sup() + "/(25) = 1", "b) (x - 1)" + strsup2.sup() + "/(25) + (y - 2)" + strsup2.sup() + "/(16) = 1", "c) (x + 1)" + strsup2.sup() + "/(25) + (y + 2)" + strsup2.sup() + "/(16) = 1", "d) (x - 1)" + strsup2.sup() + "/(10) + (y - 2)" + strsup2.sup() + "/(8) = 1"],
    ["a) Vertex: (0,0); Focus: (0,1/2); Directrix: y = -(1/2)", "b) Vertex: (0,1/2); Focus: (0,-1/2); Directrix: y = 1/2", "c) Vertex: (0,0); Focus: (-1/2,0); Directrix: x = 1/2", "d) Vertex: (0,0); Focus: (0,-1/2); Directrix: y = 1/2"],
];

var correctAnswers = [
                      3, 
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
    $("#question1").hide();
    $("#question2").hide();
    $("#question3").hide();
    $("#question4").hide();
    $("#question5").hide();
    $("#question6").hide();
    $("#question7").hide();
    $("#question8").hide();
    $("#question9").hide();
    $("#question10").hide();
    
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
        $("#questionInfo").show();
        $("#question1").show();
        $("#text1").html("Question 1: " + (document.getElementById("questionText").innerHTML = questionArray[0]) + "<br>Your Answer: " + selectedAnswers[0] + "<br>Correct Answer: d) x = -2");
        $("#advice1").html("Think of two numbers that add to be the b-value (in this case, 4) but multiply to be the c-value (also 4). Then you find out that x + those numbers are your factors ( (x + 2)(x + 2) would be correct). Then you set them equal to 0 and solve.");
        $("#question2").show();
        $("#text2").html("Question 2: " + (document.getElementById("questionText").innerHTML = questionArray[1]) + "<br>Your Answer: " + selectedAnswers[1] + "<br>Correct Answer: c) 4");
        $("#advice2").html("You must plug in the x-values into the equation to find y" + strsub2.sub() + " and y" + strsub1.sub() + " for the average rate of change (which is essentially the constant rate of change for quadratics). Try plugging the x" + strsub2.sub() + " value in first, solve, then plug in x" + strsub1.sub() + " (I find it easier to visualize where everything's supposed to go if I do that, but do whatever helps you solve y" + strsub2.sub() + " - y" + strsub1.sub() + "/x" + strsub2.sub() + " - x" + strsub1.sub() + ").");
        $("#question3").show();
        $("#text3").html("Question 3: " + (document.getElementById("questionText").innerHTML = questionArray[2]) + "<br>Your Answer: " + selectedAnswers[2] + "<br>Correct Answer: c) 2x" + strsup3.sup() + " - x" + strsup2.sup() + " + 6x - 3");
        $("#advice3").html("FOIL properly to get just what you need. Remember that f(x) * g(x) does NOT mean f(g(x)). The latter describes a composite function, while the former means you must multiply x" + strsup2.sup() + " + 3 by 2x - 1");
        $("#question4").show();
        $("#text4").html("Question 4: Multiply (See picture I told you to copy/paste)." + "<br>Your Answer: " + selectedAnswers[3] + "<br>Correct Answer: b) (x + 2)(x - 2)/2(x + 5)");
        $("#advice4").html("BEFORE YOU DO ANYTHING: make SURE you factor the polynomials as if they were stand alone equations. The first demoninator can be factored normally, but you'll need to factor out a term for both the second numerator AND the second denominator to get terms that can be easily cancelled out later. Also, factor the first numerator by grouping (because no two numbers that give you that equation add to be 1 but multiply to be -6). Once you do all of that, you'll have factors that can easily be cancelled out. Get rid of any terms on both the top and the bottom that are the same!");
        $("#question5").show();
        $("#text5").html("Question 5: " + (document.getElementById("questionText").innerHTML = questionArray[4]) + "<br>Your Answer: " + selectedAnswers[4] + "<br>Correct Answer: b) as x nears infinity, f(x) nears infinity; as x nears -infinity, f(x) nears -infinity");
        $("#advice5").html("Remember that when you're looking at end behavior, all you need to observe is the first term and it's degree. You can check your classwork packet called Polynomials of a Higher Degree for all four end behavior types, but in this case, our degree (5) is odd, and our leading coefficient is positive, which means as x nears infinity, f(x) nears infinity; as x nears -infinity, f(x) nears -infinity (if the words confuse you, look at those notes; we drew graphs of what the end behavoir would look like for various functions!).");
        $("#question6").show();
        $("#text6").html("Question 6: " + (document.getElementById("questionText").innerHTML = questionArray[5]) + "<br>Your Answer: " + selectedAnswers[5] + "<br>Correct Answer: d) -5 - 12i");
        $("#advice6").html("The only thing to remember here is that when a polynomail is squard, it really just means to multiply the polynomial by itself. Same principle applies here (DON'T DISTRIBUTE THE EXPONENT!!!). The other answers are wrong because either a) the wrong operation was used, or b) they're not in standard form.");
        $("#question7").show();
        $("#text7").html("Question 7: " + (document.getElementById("questionText").innerHTML = questionArray[6]) + "<br>Your Answer: " + selectedAnswers[6] + "<br>Correct Answer: a) x = +/- 2i, x = - 1/2, x = 1");
        $("#advice7").html("Do p/q (+ or - the constant's factors/+ or - the LC's factors) to get the possible rational zeros of the function. You'll want to use synthetic division to make sure two of those zeros you found work (1 is always a good number to fall back on). Alternatively, if you can use your calculator on a problem like this, graph the function and find the REAL zeros by looking at the x-intercepts of the graph. Remember that any possible rational zeros you use to synthetically divide that give you 0 as a remainder count as zeros of the function, also MORE OFTEN THAN NOT, if you need to find ALL zeros of a function, there are imaginary zeros (which always come in pairs of two).");
        $("#question8").show();
        $("#text8").html("Question 8: " + (document.getElementById("questionText").innerHTML = questionArray[7]) + "<br>Your Answer: " + selectedAnswers[7] + "<br>Correct Answer: c) (-infinity, 0)U(1/4, infinity)");
        $("#advice8").html("When you have fractions and need to solve an inequality with one, you must ALWAYS set the denominator equal to 0 (after solving the inequality normally) in order to get one of your intervals for testing points. Then you proceed to test points within the intervals that you found.");
        $("#question9").show();
        $("#text9").html("Question 9: " + (document.getElementById("questionText").innerHTML = questionArray[8]) + "<br>Your Answer: " + selectedAnswers[8] + "<br>Correct Answer: b) " + "(x - 1)" + strsup2.sup() + "/(25) + (y - 2)" + strsup2.sup() + "/(16) = 1");
        $("#advice9").html("Don't worry. This wasn't easy. I even tricked myself when I was doing this problem out so I could write advice for anyone who got it wrong (yes, that is seriously how mind-gamey this was). If you DID get it write, my utmost congradulations to you." + "<br>... But anyway, what you need to take away from this problem is that half of the minor axis length is your b-value. However, 8 is still the length, so it's not your b" + strsup2.sup() + " value (square the halved length of the minor axis to get b" + strsup2.sup() + "!). Then, after plotting some points and plugging some values into the ellipse equation, use the foci equation to find your a" + strsup2.sup() + "-value.");
        $("#question10").show();
        $("#text10").html("Question 10: If Chris is given x" + strsup2.sup() + " = -2y, what would his answer need to be?" + "<br>Your Answer: " + selectedAnswers[9] + "<br>Correct Answer: d) Vertex: (0,0); Focus: (0,-1/2); Directrix: y = 1/2");
        $("#advice10").html("No tricks here. Just know that in this case, the parabola opens down because x is squared and there's a negative sign next to the p value. Also remember that the focus should always be inside the parabola as a point, and that the directrix is an equation that CANNOT intersect the parabola. And watch those signs! They'll help to tell you which way the parabola opens up, too!");
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