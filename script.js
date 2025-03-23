document.addEventListener('DOMContentLoaded', () => {
    const revealButton = document.getElementById('reveal-button');
    const revealOverlay = document.getElementById('reveal-overlay');
    const birthdayContent = document.getElementById('birthday-content');
    const card = document.querySelector('.card');
    const frontBtn = document.querySelector('#revbtn');
    const backBtn = document.querySelector('.card-back button');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    console.log("DOM loaded");
    console.log("Reveal button:", revealButton);
    console.log("Overlay:", revealOverlay);
    console.log("Content:", birthdayContent);
    
    // Track card state
    let rotationDegree = 0;
    let floatY = 0;
    let floatDirection = 1;

    // Reveal everything when button is clicked
    revealButton.addEventListener('click', function() {
        console.log("Button clicked");
        // Hide overlay
        revealOverlay.classList.add('hidden');
        
        // Show content with staggered animations
        setTimeout(() => {
            console.log("Showing content");
            birthdayContent.classList.remove('hidden');
            
            // Animate header
            setTimeout(() => {
                if (header) header.style.animation = 'slideDown 1s forwards';
            }, 300);
            
            // Animate balloons
            const balloons = document.querySelectorAll('.balloon-2, .balloon-3');
            balloons.forEach((balloon, i) => {
                setTimeout(() => {
                    balloon.style.animation = 'pop-in 0.8s forwards';
                }, 500 + (i * 200));
            });
            
            // Animate cake
            const cakes = document.querySelectorAll('.cake');
            cakes.forEach((cake, i) => {
                setTimeout(() => {
                    cake.style.animation = 'float-cake 8s infinite ease-in-out';
                }, 1200 + (i * 300));
            });
            
            
            // Animate footer
            setTimeout(() => {
                if (footer) footer.style.animation = 'slideUp 1s forwards';
            }, 2000);
            
            // Start random balloon appearances
            setTimeout(startRandomBalloons, 3000);
            
            // Initial confetti burst
            setTimeout(createConfetti, 800);
            
        }, 500);
    });
    
    // Card flip and animations
    function startFloatAnimation() {
        floatAnimation();
    }
    

    function floatAnimation() {
        
        floatY += 0.1 * floatDirection;
        
        if (floatY >= 10) floatDirection = -1;
        if (floatY <= 0) floatDirection = 1;
        
        if (card) updateCardTransform();
        requestAnimationFrame(floatAnimation);
    }

    startFloatAnimation()
    
    function updateCardTransform() {
        card.style.transform = `rotateY(${rotationDegree}deg) translateY(${floatY}px)`;
    }
    
    function flipCard(degrees) {
        rotationDegree = degrees;
        updateCardTransform();
    }
    
    // Event listeners for buttons (if they exist)
        frontBtn.addEventListener('click', () => {
            flipCard(180);
            createConfetti();
        });
        backBtn.addEventListener('click', () => flipCard(0));
    
    // Confetti effect
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}deg, 100%, 50%)`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
    
    // Random balloon appearances
    function startRandomBalloons() {
        const balloon1 = document.querySelector('.balloon-1');
        const balloon4 = document.querySelector('.balloon-4');
        
        if (!balloon1 || !balloon4) return;
        
        function showRandomBalloon(balloon) {
            const randomX = Math.random() * 80 + 10;
            const randomY = Math.random() * 80 + 10;
            
            balloon.style.left = randomX + 'vw';
            balloon.style.top = randomY + 'vh';
            balloon.style.opacity = '1';
            balloon.style.transform = 'scale(1)';
            
            setTimeout(() => {
                balloon.style.opacity = '0';
            }, 1000);
        }
        
        setInterval(() => {
            if (balloon1) showRandomBalloon(balloon1);
        }, 2000);
        
        setTimeout(() => {
            setInterval(() => {
                if (balloon4) showRandomBalloon(balloon4);
            }, 2000);
        }, 1000);
    }
});