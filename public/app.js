let trumpData;
let sizeTrumpData;
let connectCounter;



window.addEventListener('load', function () {

    //Open and connect socket
    let socket = io();
    //Listen for confirmation of connection
    socket.on('connect', function () {
        console.log("Connected");
    });


    //Listen for messages named 'msg' from the server
    socket.on('msg', function (data) {
        console.log("Message arrived!");
        console.log(data);
        connectCounter++; 

            // p5.js code 
            function setup(){
            console.log("Setup!");
            const myCanvas = createCanvas(600,650);
            myCanvas.parent("canvas-container");
            }


            function draw(){
                background(250,250,250);
            
                // graph
                stroke(0);
                strokeWeight(1);
                line(50, 600, 550, 600);
            
                let sentenceNumber = 0 ;
                let sentence = ["0%", "25%", "50%", "75%","100%"];
            
                for (let j=0; j < 550; j+= 125){
                    stroke(0);
                    strokeWeight(1);
                    line( j + 50, 0, j + 50 , 600);
                    noStroke();
                    fill(0);
                    textSize(15);
                    textFont('Arial');
                    textStyle(NORMAL);
                    text(sentence[sentenceNumber], j + 50 , 625);
                    sentenceNumber +=1;
                }
        
                // bars
                sizeTrumpData = (trumpData*500) / 8274
                if (sizeTrumpData){ 
                    console.log(sizeTrumpData);
                    let position = 50 + 150*connectCounter;
                    noStroke();
                    fill(random(0,255),random(0,255),random(0,255));
                    rect(50,position,sizeTrumpData,50)
                    fill(0,0,0);
                    textSize(12);
                    textFont('Arial');
                    text(trumpData, sizeTrumpData + 60, 30 + position);
                } 
             }   
    });
    


    /* --- Code to SEND a socket message to the Server --- */
    let wordInput = document.getElementById('trump-input')
    let button = document.getElementById('trump-button')

    button.addEventListener('click', function () {
        let word  = wordInput.value;
  
        // search button
        fetch("Trump2.json")
        .then(response => response.json())
        .then(data => {
            console.log("Find button was clicked");
            let inputText = document.getElementById("trump-input").value;
            console.log(inputText);
            let results = [];
            if (inputText)
            {
                for (var i=0 ; i < data.length ; i++){
                    if (data[i].text.includes(inputText)){
                        results.push(data[i]);
                        console.log(results);                   
                    }  
                }
            }
            console.log(results.length);
            trumpData = results.length;
        })
        //Data to send
        let msgObj = { "Word": word, "Value": trumpData };

        //Send the message object to the server
        socket.emit('msg', msgObj);
    });
});






