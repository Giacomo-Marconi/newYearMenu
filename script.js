const icon = [
    {"icon": "fa-star", "color": "#f2d82c"},
    {"icon": "fa-fireworks", "color": "#ff5733"},
    {"icon": "fa-champagne-glasses", "color": "#d4af37"},
    {"icon": "fa-moon", "color": "#6c6cff"},
    {"icon": "fa-music", "color": "#ff69b4"}
]

const colorPalettes = [
    ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F'],
    ['#4A90E2', '#50E3C2', '#B8E986', '#F5A623', '#D0021B'],
    ['#F78DA7', '#E94E77', '#C62F4B', '#6B1E3A', '#D1AC00'],
    ['#7FDBFF', '#0074D9', '#001F3F', '#39CCCC', '#3D9970']
];

const fireworks = [];

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const starsContainer = document.querySelector('.falling-stars');
const createStar = () => {
    const star = document.createElement('i');
    const inx = Math.floor(Math.random() * icon.length);
    star.classList.add('fas', icon[inx]['icon'], 'star');

    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDuration = Math.random() * 4 + 3 + 's';
    star.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
    star.style.color = icon[inx]['color'];
    starsContainer.appendChild(star);

    star.addEventListener('animationend', () => {
        star.remove();
    });
};



    class Firework {
        constructor(x, y, colors) {
            this.x = x;
            this.y = y;
            this.colors = colors;
            this.particles = [];

            for (let i = 0; i < 50; i++) {
                this.particles.push(new Particle(this.x, this.y, this.colors));
            }
        }

        update() {
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.alpha <= 0) this.particles.splice(index, 1);
            });
        }

        draw() {
            this.particles.forEach(particle => particle.draw());
        }
    }

    class Particle {
        constructor(x, y, colors) {
            this.x = x;
            this.y = y;
            this.speed = Math.random() * 5 + 2;
            this.angle = Math.random() * Math.PI * 2;
            this.size = Math.random() * 3 + 1;
            this.alpha = 1;
            this.gravity = 0.1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + this.gravity;
            this.alpha -= 0.02;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
        fireworks.push(new Firework(x, y, colors));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            firework.update();
            firework.draw();
            if (firework.particles.length === 0) fireworks.splice(index, 1);
        });
        requestAnimationFrame(animate);
    }

setInterval(createFirework, 300);
setInterval(createStar, 100);
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
