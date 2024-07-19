const totalRequests = document.getElementById("total-requests");
const totalReceived = document.getElementById("total-received");
const feedback = document.getElementById("feedback-container");

let reqCount = parseInt(totalRequests.innerText);
let receiveCount = parseInt(totalReceived.innerText);

const throttle = (f, t) => {

    let ready = true;
    let asked = false;

    return () => {
        reqCount++;
        totalRequests.innerText = reqCount;

        if(reqCount > 30){
            console.log('inside the coutner')
            const scold = document.createElement('p');
            scold.innerText = "BRO CHILL!";
            scold.style.color = "red";
            feedback.appendChild(scold)
        }


        if (ready) receiveCake();
        else {
            asked = true
            if(reqCount < 30){
                const dialogue = document.createElement('p');
                dialogue.innerText = "Literally cutting you a piece right now..."
                feedback.appendChild(dialogue)
            }
        };
    };

    function receiveCake() {

        ready = false;
        asked = false;


        setTimeout(() => {
            if (asked) {
                reqs = 1;
                receiveCake();
            }
            else ready = true;
        }, t);
        receiveCount++;
        totalReceived.innerText = receiveCount;
        f();
    }
};

// Test function to be throttled
const serveCake = () => {
    const cakeContainer = document.getElementById("cake-container")
    const cake = document.createElement('img');
    cake.src = "assests/pink-cake-slice.jpg"
    cake.style.width = "4em";
    cake.style.height = "4em";
    cake.style.borderRadius = "1em";
    cake.style.margin = ".5em";

    
    cakeContainer.appendChild(cake);
    console.log("Function executed at", new Date().toLocaleTimeString());
};

// Create a throttled version of the test function
const throttledFunction = throttle(serveCake, 4000);

// Attach throttled function to button click event
document.getElementById("testButton").addEventListener("click", throttledFunction);