document.addEventListener('click', launchFirework);

function launchFirework(event) {
    const fireworkContainer = document.querySelector('.firework-container');
    const star = document.createElement('div');
    star.classList.add('star');
    fireworkContainer.appendChild(star);

    const startX = event.clientX;
    const startY = event.clientY;
    star.style.left = startX + 'px';
    star.style.top = startY + 'px';

    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight / 2;
    const duration = (Math.random() * 6 + 1) * 1000;

    const trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.left = startX + 'px';
    trail.style.top = startY + 'px';
    fireworkContainer.appendChild(trail);

    setTimeout(() => {
        star.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(10)`;
        trail.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
        star.style.opacity = 0;
        trail.style.opacity = 0;
    }, 10);

    setTimeout(() => {
        star.remove();
        trail.remove();
    }, duration);
}
