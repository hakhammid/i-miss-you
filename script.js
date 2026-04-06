// script.js - stops meow immediately when turning sound OFF
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const catImg = document.getElementById('catGif');
        const messageElement = document.querySelector('.heartfelt-message');
        const toggleBtn = document.getElementById('soundToggle');
        const card = document.querySelector('.card');
        
        console.log("🐾 Meow! The owner's cat sends you warm whiskers.");
        
        // --- GIF fallback ---
        if (catImg) {
            catImg.addEventListener('error', function() {
                this.src = 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif';
                this.alt = 'Cute animated cat waving softly';
            });
        }
        
        // --- LOCAL MP3 SOUND ---
        let soundEnabled = false;
        let meowAudio = null;
        const soundFileName = 'scottishperson-sound-effect-cat-meow-279336.mp3';
        
        function playMeow() {
            if (!soundEnabled) return;
            if (!meowAudio) {
                meowAudio = new Audio(soundFileName);
                meowAudio.volume = 0.4;
            }
            meowAudio.currentTime = 0;
            meowAudio.play().catch(e => {
                console.log("Playback failed:", e);
            });
        }
        
        function stopMeow() {
            if (meowAudio) {
                meowAudio.pause();
                meowAudio.currentTime = 0;  // reset for next play
            }
        }
        
        // --- Sound toggle button ---
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                const wasEnabled = soundEnabled;
                soundEnabled = !soundEnabled;
                toggleBtn.textContent = soundEnabled ? '🔊 Meow sounds ON' : '🔇 Meow sounds OFF';
                
                if (soundEnabled) {
                    // Turning ON: preload & play a test meow
                    if (!meowAudio) {
                        meowAudio = new Audio(soundFileName);
                        meowAudio.volume = 0.4;
                    }
                    playMeow();
                } else {
                    // Turning OFF: stop any currently playing meow immediately
                    stopMeow();
                }
            });
        }
        
        // --- Trigger meow on cat hover/click (only if sound enabled) ---
        if (catImg) {
            catImg.addEventListener('mouseenter', function() {
                if (soundEnabled) playMeow();
            });
            catImg.addEventListener('click', function(e) {
                e.stopPropagation();
                if (soundEnabled) playMeow();
            });
        }
        
        // --- Floating hearts on card click ---
        function createHeart(x, y) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('floating-heart');
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
        
        if (card) {
            card.addEventListener('click', (e) => {
                createHeart(e.clientX, e.clientY);
            });
        }
        
        // --- Sparkle cursor ---
        document.addEventListener('mousemove', (e) => {
            const spark = document.createElement('div');
            spark.classList.add('sparkle');
            spark.style.left = `${e.clientX - 4}px`;
            spark.style.top = `${e.clientY - 4}px`;
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 600);
        });
        
        // --- Paw prints on cat click ---
        if (catImg) {
            catImg.addEventListener('click', (e) => {
                e.stopPropagation();
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                for (let i = 0; i < 3; i++) {
                    const paw = document.createElement('div');
                    paw.innerHTML = '🐾';
                    paw.classList.add('paw-print');
                    const offsetX = (Math.random() - 0.5) * 40;
                    const offsetY = (Math.random() - 0.5) * 40;
                    paw.style.left = `${mouseX + offsetX}px`;
                    paw.style.top = `${mouseY + offsetY}px`;
                    document.body.appendChild(paw);
                    setTimeout(() => paw.remove(), 800);
                }
                catImg.style.transform = 'scale(0.97)';
                setTimeout(() => { if(catImg) catImg.style.transform = ''; }, 150);
            });
        }
        
        // --- Message bounce on click ---
        if (messageElement) {
            messageElement.addEventListener('click', function() {
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    if (messageElement) messageElement.style.transform = '';
                }, 200);
            });
        }
        
        // --- Safe area for notched phones ---
        const adjustForSafeArea = () => {
            const body = document.body;
            if (window.CSS && CSS.supports('padding-top: env(safe-area-inset-top)')) {
                body.style.paddingTop = 'env(safe-area-inset-top)';
                body.style.paddingBottom = 'env(safe-area-inset-bottom)';
                body.style.paddingLeft = 'max(1rem, env(safe-area-inset-left))';
                body.style.paddingRight = 'max(1rem, env(safe-area-inset-right))';
            }
        };
        adjustForSafeArea();
        window.addEventListener('resize', adjustForSafeArea);
        
        document.documentElement.setAttribute('data-cat-message', 'ready');
    });
})();