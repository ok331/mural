const enterScreen = document.createElement('div');
enterScreen.className = 'enter-screen';
enterScreen.innerHTML = '<div class="enter-text">Click to Enter</div>';
document.body.appendChild(enterScreen);

const notification = document.createElement('div');
notification.className = 'notification';
document.body.appendChild(notification);

function showNotification(message) {
    notification.classList.remove('show');
    void notification.offsetWidth;
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

document.querySelectorAll('.discord-icon').forEach(icon => {
    let isAnimating = false;

    icon.addEventListener('click', function() {
        if (isAnimating) return;
        
        const username = this.getAttribute('data-username');
        navigator.clipboard.writeText(username).then(() => {
            isAnimating = true;
            this.style.transition = 'background-color 0.3s ease';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            
            setTimeout(() => {
                this.style.background = '';
                isAnimating = false;
            }, 500);
            
            showNotification(`Copied ${username} to clipboard!`);
        }).catch(() => {
            showNotification('Failed to copy username');
        });
    });
});

const audio = document.getElementById('bgMusic');
audio.volume = 0.9;

enterScreen.addEventListener('click', () => {
    enterScreen.style.opacity = '0';
    setTimeout(() => {
        enterScreen.style.display = 'none';
    }, 300);
    audio.play().catch(error => {
        console.log("Audio autoplay was prevented. User interaction required.");
    });
});

window.addEventListener('load', () => {
    const audio = document.getElementById('bgMusic');
    audio.volume = 0.9;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Audio autoplay was prevented. User interaction required.");
        });
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0px);
        }
    }
`;
document.head.appendChild(style);

// Handle section visibility
const graveyardSection = document.querySelector('.graveyard-section');
const hoaSection = document.querySelector('.hoa-section');

// Initially hide both sections
graveyardSection.style.display = 'none';
hoaSection.style.display = 'none';

// Handle smooth scrolling and section visibility for navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId === '#memoriam') {
            graveyardSection.style.display = 'block';
            setTimeout(() => {
                graveyardSection.classList.add('visible');
            }, 50);
            
            const offset = 60; // Height of the navigation bar
            const targetPosition = graveyardSection.offsetTop + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else if (targetId === '#hoa') {
            hoaSection.style.display = 'block';
            setTimeout(() => {
                hoaSection.classList.add('visible');
            }, 50);
            
            const offset = 60;
            const targetPosition = hoaSection.offsetTop + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}); 
