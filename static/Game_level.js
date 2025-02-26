const canvas = document.getElementById('gradientCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
resizeCanvas();
function resizeCanvas() {
    canvas.width = window.innerWidth; // Set canvas width
    canvas.height = window.innerHeight; // Set canvas height
}

const textArray = ["Escape From Cyber Thieves", "साइबर चोरों से बचें", "ಸೈಬರ್ ಕಳ್ಳನಿಂದ ತಪಿಸಿಕೊಳ್ಳಿ", "సైబర్ దొంగల నుంచి తప్పించుకోండి", "சைபர் திருடர்களிடம் இருந்து தப்பிக்க"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

function playLevel(level) {
    const greetingAudio = document.getElementById('greeting-audio');
    const levelAudio = document.getElementById(`level-audio${level}`); // Use template literal to select audio

    // Play greeting audio
    greetingAudio.play().catch((error) => {
        console.error("Greeting audio playback failed:", error);
    });

    // Play level-specific audio
    levelAudio.play().catch((error) => {
        console.error("Level audio playback failed:", error);
    });

    // Redirect to the corresponding level page after 6 seconds
    setTimeout(() => {
        let levelPath = ""; // Initialize the variable to hold the level path

        switch (level) {
            case 1:
                levelPath = "Level-1/ok.html";
                break;
            case 2:
                levelPath = "Level-2/new.html";
                break;
            case 3:
                levelPath = "Level-3/new.html";
                break;
            case 4:
                levelPath = "Level-4/index.html";
                break;
            case 5:
                levelPath = "Level-5/index.html";
                break;
            default:
                alert("Level " + level + " is not available yet.");
                return; // Exit the function if level is not valid
        }

        // Redirect after 2 seconds delay for the level page redirect
        setTimeout(() => {
            window.location.href = levelPath; // Redirect to the appropriate level
        }, 2000); // 2 seconds delay for the level page redirect

    }, 6000); // 6 seconds delay for greeting audio
}

function completeLevel(level) {
    // Mark the level as complete or update the status
    document.getElementById('button' + level).textContent = "Completed";
    document.getElementById('button' + level).disabled = true;
}

// Add event listener for window resize
window.addEventListener('resize', resizeCanvas);

const points = [
    { x: 100, y: 300, color: 'rgba(34, 43, 122,0.8)', radius: 400, dx: 1, dy: 1.2 },
    { x: 300, y: 600, color: 'rgba(174, 227, 255, 0.5)', radius: 500, dx: 1, dy: 1.2 },
    { x: 800, y: 400, color: 'rgba(174, 141, 255, 0.5)', radius: 350, dx: -1, dy: -1 },
    { x: 400, y: 700, color: 'rgb(180, 180, 180,0.5)', radius: 450, dx: 1.5, dy: -0.8 }
];

function drawGradient() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(point => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius);
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    });
}

function updatePoints() {
    points.forEach(point => {
        point.x += point.dx;
        point.y += point.dy;

        if (point.x < 0 || point.x > canvas.width) point.dx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.dy *= -1;
    });
}

function animate() {
    updatePoints();
    drawGradient();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});