/**
 * author:Zhiping Yu  student number: 000822513
 * created date: 2020.11.10
 * The purpose of this js file is to help display the content which user can see after they submit the form without
 * reloading the webpage.The form has disappeared, but user can see the game interface. By clicking the buttons, user
 * can play the game and get result. If user wants to exit the game, he or she can go back to the register page.
 * 
 */

window.addEventListener("load", function() {  

    let userName, userAge, favColor; // user personal information
    let notification; // message sent when user click START button
    let conclusion; // game summary
    let scores; // message sent when user click STOP button
    let countWin = 0; // the number of times user won 
    let countLose = 0; // the number of times user lost the game 
    document.forms.information.addEventListener("submit", function(event) {// user clicked submit button
    event.preventDefault();
    userName = document.forms.information.name.value; // get user name
    userAge = document.forms.information.age.value; // get user age 
    favColor = document.forms.information.color.value; // get user favourite color
    /* Hide error messages */ 
    let error1 = document.getElementById("error1");
    error1.style.visibility="hidden";
    let error2 = document.getElementById("error2");
    error2.style.visibility="hidden";
    let error3 = document.getElementById("error3");
    error3.style.visibility="hidden";
    /* if user's name is not valid, display error message */
    if(userName === "" || userName ===null){
        error1.style.visibility="visible";
        error1.innerHTML = "<p>Please enter your name!</p>";
        
    }
    /* if user's age is not valid, display error message */
    if(userAge ==="" || userAge ===null || userAge === false|| userAge <3 || userAge >12){
        error2.style.visibility="visible";
        error2.innerHTML = "<p>Please select your age or your age is not in the range from 3 to 12!</p>";
        
    }
    /*if user's favourite is not valid, display error message */
    if(favColor ==="" || favColor === null || favColor === false){
        error3.style.visibility="visible";
        error3.innerHTML = "<p>Please select your favourite!</p>";
        
    }
    /* if user inputs are all valid, display game for the user */
    if(!(userName ==="" || userName ===null || userAge === false|| userAge==="" || userAge===null|| userAge <3 || userAge >12)
    && !(favColor ==="" || favColor === null || favColor === false))
    { 
        let title = document.getElementById("title");// title of the game
        title.innerHTML = "Register Successfully! Welcome to Our Dice Game ";// change title shown in the webpage
        title.style.color = favColor; // user's favourite color used to style the title
        let information = document.getElementById("container");
        information.innerHTML = "<p>Name: "+ userName +"</p>"+"<p>Age: "+userAge+"</p>";
        information.className="info";
        let image = document.getElementById("image"); // dice image in the webpage
        image.innerHTML = "<img id = 'pic' src= 'images/dice.jpg' alt='dice image'>";
        let helpBtn = document.getElementById("help"); // HELP button
        helpBtn.innerHTML="<button type='button' id='assistance'>HELP</button>";
        
        let startBtn = document.getElementById("start"); // START button
        startBtn.innerHTML="<button type='button' class='buttons'>START</button>";

        let stopBtn = document.getElementById("stop"); // STOP button
        stopBtn.innerHTML="<button type='button' class='buttons'>STOP</button>";

        let summaryBtn = document.getElementById("summary"); // SUMMARY button
        summaryBtn.innerHTML="<button type='button' class='buttons'>SUMMARY</button>";
    
        let exit = document.getElementById("exit"); // EXIT link
        exit.innerHTML="EXIT";
        exit.className="exits";

        helpBtn.addEventListener("click",displayInstruction); 
        notification = document.getElementById("notification"); 
        scores = document.getElementById("scores");
        conclusion = document.getElementById("conclusion");
        startBtn.addEventListener("click",startPlay);
        stopBtn.addEventListener("click",showScores);
        summaryBtn.addEventListener("click",displaySummary);

        
    }
    });
    
     /**
      * After user clicks HELP button, user will see the instructions of playing the dice game. On the top of that
      * a new COLLAPSE button is created and floated to the right, which is used to wrap the content in the future.
      */
    function displayInstruction(){
        let instruction = document.getElementById("instruction");
        instruction.innerHTML ="<p>You can roll two dices at the same time. If the sum of your two dices value is more than 7, "+
        "you win the game. Otherwise, you lose the game! Good luck with your game.</p>"; // instructions  of playing the game
        instruction.className="prompt";
        let collapse = document.getElementById("collapse");
        collapse.innerHTML="<button type='button'>COLLAPSE</button>"; // create a new button
        collapse.style.marginBottom="30px";
        collapse.style.float="right";
        collapse.addEventListener("click",collapseText);  
    }
    /**
     * After user click COLLAPSE button, the instruction under the HELP button disappears. In addition, 
     * COLLAPSE button should be removed too. 
     */
    function collapseText(){
        instruction.innerHTML="<p></p>"; // clear the instruction uder HELP button
        instruction.style.border="none";
        collapse.innerHTML="<p></p>" // remove COLLAPSE button
    }
    /**
     * After user clicks START button, the image begins to change to a moving dice. Plus, a message is 
     * displayed to user to notify that game has started. What's more, the content under the STOP button
     * should be cleared each time when user clicks START button
     */
    function startPlay(){
        notification.innerHTML="<h2>Start the Game! Watch the dices rolling.</h2>";
        notification.style.color="green";
        scores.innerHTML="<h2></h2>"; // clear content under STOP button
        conclusion.innerHTML="<h2></h2>";// clear content under SUMMARY  button
        image.innerHTML = "<img id = 'pic' src= 'images/dice2.gif' alt='moving dice'>"; // change images  
    }

    /**
     * If user clicked START button before clicks STOP button, user will see the dynamic image has been replaced
     * by the original static image. Besides that, user will see the sum of two dices and get a win or lose message
     * based on the differnce between user's score and key number 7. If user did not click the START button in advance,
     * user will get an error message, which asks user to click the START button first.
     *
     */
    function showScores(){
        if(notification.innerHTML!=="<h2></h2>" &&
        notification.innerHTML!==""){//confirm that user has clicked START button in advance 
            notification.innerHTML="<h2></h2>";// clear the content under START button
            conclusion.innnerHTML ="<h2></h2>"; // clear the content under SUMMARY button
            image.innerHTML = "<img id = 'pic' src= 'images/dice.jpg' alt='dice image'>";// change to static image
            let number1 =Math.trunc((Math.random()*5+1)) ; // get a random integer 1-6 for first dice value
            let number2 = Math.trunc((Math.random()*5+1)) ;// get second randon integer 1-6 for second dice value
            let sum = number1+ number2; // sum of the two dices values
            let key= 7; // value used to decide whether user wins or loses the game
            scores = document.getElementById("scores");
            if(sum > key ){// the scores user get more than key value
                scores.innerHTML = "<h2>The first number is "+ number1+ " , and second number is: "+
                number2+". Sum of them is: "+ sum+ ". Congratulation, You win the game!</h2>"; // win message
                scores.style.color="green";
                countWin += 1;
            }else{ // the scores user get less than key value
                
                scores.innerHTML = "<h2>The first number is "+ number1+ " , and second number is: "+
                number2+". Sum of them is: "+ sum+ ". Sorry, You lose the game!</h2>"; // lose message
                scores.style.color="red";
                countLose += 1; 
            }
        }else{// if user forgets to click START button ahead of time
            scores.innerHTML="<h1>Please click start button first!!</h1>"; // error message
            conclusion.innerHTML="<h2></h2>";// clear content under SUMMARY button
            scores.style.color="red";
            
        }
    }
   /**
    * When user clicks SUMMARY button, user sees the final result of how many times he won and lost the games
    */
    function displaySummary(){
            
            conclusion.innerHTML="<h2>Thank you for playing the game! "+userName+" won "+ countWin+" times and"+
            " lost "+countLose + " times.</h2>";
            conclusion.style.color="brown";
            conclusion.style.fontSize="20px";
            image.innerHTML = "<img id = 'pic' src= 'images/dice.jpg' alt='dice image'>";
            scores.innerHTML="<h2></h2>";  // clear the content user the STOP button
            notification.innerHTML="<h2></h2>" // clear the content under the START button  
    }
    
 });