document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const frontBtn = document.querySelector('.card-front button');
    const closeBtn = document.querySelector('.card-back button:last-of-type');
    

    // Track rotation state
    let rotationDegree = 0;

    // Function to handle card flip
    function flipCard(degrees) {
        rotationDegree = degrees;
        updateCardTransform();
    }

    // Event listeners for buttons
    frontBtn.addEventListener('click', () => {
        flipCard(180)
        createConfetti();
    });
    closeBtn.addEventListener('click', () => flipCard(0));

    // Add floating animation to the card
    let floatY = 0;
    let floatDirection = 1;

    function floatAnimation() {
        floatY += 0.1 * floatDirection;
        
        if (floatY >= 10) floatDirection = -1;
        if (floatY <= 0) floatDirection = 1;
        
        updateCardTransform();
        requestAnimationFrame(floatAnimation);
    }

    // Function to update card transform with both rotation and translation
    function updateCardTransform() {
        card.style.transform = `rotateY(${rotationDegree}deg) translateY(${floatY}px)`;
    }

    // Start floating animation
    floatAnimation();

    // Add confetti effect when card is opened
    function createConfetti() {
        console.log("Creating confetti!"); // Debug
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -20 + 'px';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}deg, 100%, 50%)`;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    // Start the random balloon effect
    randomBalloons();
});

// Add this function to your existing script.js

// Random balloon appearance effect
function randomBalloons() {
    const balloon1 = document.querySelector('.balloon-1');
    const balloon4 = document.querySelector('.balloon-4');
    
    // Function to make a balloon appear at random position
    function showRandomBalloon(balloon) {
        // Generate random position
        const randomX = Math.random() * 80 + 10; // 10% to 90% of screen width
        const randomY = Math.random() * 80 + 10; // 10% to 90% of screen height
        
        // Position balloon
        balloon.style.left = randomX + 'vw';
        balloon.style.top = randomY + 'vh';
        
        // Show balloon with pop-in animation
        balloon.style.opacity = '1';
        balloon.style.animation = 'pop-in 0.5s';
        
        // Hide balloon after a short delay
        setTimeout(() => {
            balloon.style.opacity = '0';
        }, 1000);
    }
    
    // Show balloons at alternating times
    setInterval(() => {
        showRandomBalloon(balloon1);
    }, 2000);
    
    setTimeout(() => {
        setInterval(() => {
            showRandomBalloon(balloon4);
        }, 2000);
    }, 1000); // Offset by 1 second for alternating effect
}