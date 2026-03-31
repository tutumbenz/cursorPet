(function Blob() {
    const Blob = document.createElement("div");
    let mouseX = 0;
    let mouseY = 0;
    let blobX = 0;
    let blobY = 0;
    let blobSpeed = 2;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimationFrame = 0;
    let idleAnimation = null;
    const blobSets = {
        alert: [
            [-1, -10],
            [-2, -10],
            [-3, -10]
        ],
        idel: [
            [0, 0],
            [-1, 0],
            [-2, 0],
            [-3, 0]
        ],
        idel2: [
            [0, -1],
            [-1, -1],
            [-2, -1],
            [-3, -1],
            [-4, -1]
        ],
        N: [
            [-1, -3],
            [-2, -3],
            [-3, -3],
            [0, -4]
        ],
        NE: [
            [-1, -6],
            [-2, -6],
            [-3, -6],
            [0, -7]
        ],
        NW: [
            [-1, -7],
            [-2, -7],
            [-3, -7],
            [0, -8]
        ],
        S: [
            [-1, -2],
            [-2, -2],
            [-3, -2],
            [0, -3],
        ],
        SE: [
            [-1, -8],
            [-2, -8],
            [-3, -8],
            [0, -9]
        ],
        SW: [
            [-1, -9],
            [-2, -9],
            [-3, -9],
            [0, -10]
        ],
        W: [
            [-1, -4],
            [-2, -4],
            [-3, -4],
            [0, -5]
        ],
        E: [
            [-1, -5],
            [-2, -5],
            [-3, -5],
            [0, -6]
        ]
    };

    function createBlob() {
        Blob.id = "blob";
        Blob.style.width = "32px";
        Blob.style.height = "32px";
        Blob.style.backgroundImage = "url('assets/Blobspreadsheet.gif')";
        Blob.style.position = "fixed";
        Blob.style.imageRendering = "pixelated";
        Blob.style.left = "16px";
        Blob.style.top = "16px";

        document.body.appendChild(Blob);

        window.onmousemove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.blobInterval = setInterval(animateBlob, 100);
    }

    function setSprite(name, frame) {
        const sprite = blobSets[name][frame % blobSets[name].length];
        Blob.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
    }

    function idle() {
        idleTime += 1; // Tick the clock

        // MISSION: Decide to do something special
        // Every ~10 seconds, if we aren't already doing a special animation...
        if (idleTime > 10 && Math.random() < 0.01 && idleAnimation == null) {
            // Pick idel2
            idleAnimation = "idel2";
        }

        // MISSION: Play the chosen animation
        switch (idleAnimation) {
            case "idel2":
                // Play my 5-frame 'idel2' animation
                setSprite("idel2", idleAnimationFrame);
                if (idleAnimationFrame > 15) resetIdleAnimation(); // End after a few loops
                break;
            default:
                // The Idle
                // Use my 4 frames: [0,0], [-1,0], [-2,0], [-3,0]
                setSprite("idel", frameCount);
                return;
        }

        idleAnimationFrame += 1; // Move to the next frame of the special action
    }

    function animateBlob() {
        frameCount++;
        const diffX = blobX - mouseX;
        const diffY = blobY - mouseY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < 50 || distance < blobSpeed) {
            //idle animation
            idle();
            return;
        }
        resetIdleAnimation();
        // alerted 
        if (idleTime > 1) {
            setSprite("alert", frameCount);
            idleTime = Math.min(idleTime, 7);
            idleTime -= 1;
            return;
        }

        idleTime = 0;
        // moving : decide the direction
        let direction = "";
        direction += diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "E" : "";
        direction += diffX / distance < -0.5 ? "W" : "";
        setSprite(direction, frameCount);

        blobX -= (diffX / distance) * blobSpeed;
        blobY -= (diffY / distance) * blobSpeed;

        Blob.style.left = blobX + "px";
        Blob.style.top = blobY + "px";
    }

    createBlob();
})();
/* const cube= document.getElementById("cube");

let mouseX = 0;
let mouseY = 0;
let cubeX = 0;
let cubeY = 0;
let speed = 0.1;

// To capture mouse position
window.addEventListener("mousemove", (e)=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
})

// Cube movement
function cubeAnimation(){

    // Smoother movement
    cubeX += (mouseX - cubeX) * speed;
    cubeY += (mouseY - cubeY) * speed;

    // Cube position
    cube.style.left = cubeX + "px";
    cube.style.top = cubeY + "px";

    // call the function
    requestAnimationFrame(cubeAnimation);
}

// the loop 
cubeAnimation(); */