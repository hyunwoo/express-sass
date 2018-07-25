const particleGenerate = new function() {

    const particles = [];

    function Particle() {
        this.x = width / 2;
        this.y = height / 2;
        this.size = 10;
        this.color = '#ff0000';
        this.life = 60;
        this.vx = Math.random() * 2 + 1;
        this.vy = +Math.random() * 5 + 3;
        this.update = () => {
            this.x += this.vx;
            this.y += this.vy;
            // this.vx += Math.random() * 1 - 0.5;
            // this.vy += Math.random() * 1 - 0.5;


        };
        return this;
    };
    this.generate = data => {
        console.log(data);

        for (let i = 0; i < 300; i++) {
            particles.push(new Particle());
        }


    };

    let createIndex = 0;
    let tick = 0;
    this.update = (volume) => {
        const count = volume * 50;
        if (_.isEmpty(particles)) return;

        tick ++;
        if(tick % 30 === 0){
            const p = particles[ createIndex ];
            p.x = Math.random() * width;
            p.y = 0;
            p.life = 500;
            p.size = count + 2;
            createIndex++;
            createIndex %= 300;
        }

        for (var i = 0; i < count; i++) {
            const p = particles[ createIndex ];
            p.x = Math.random() * width;
            p.y = 0;
            p.life = 500;
            p.size = count + 2;
            createIndex++;
            createIndex %= 300;
        }



        blendMode(BLEND);
        blendMode(MULTIPLY);
        background(255,255,255,25);


        _.forEach(particles, particle => {
            if (particle.life <= 0) return;
            particle.update();
            particle.life--;
            fill(255, 255, 255, 255);
            ellipse(particle.x,
                particle.y,
                particle.size,
                particle.size);
        });

    };
};

let mic;
function setup() {
    const $root = $('body');
    console.log($root.width(), $root.height());
    const canvas = createCanvas($root.width(), $root.height());
    canvas.parent('renderer');
    console.log(canvas);
    background(0);

    const $ele = $('#id');

    mic = new p5.AudioIn();
    mic.start();


}


function draw() {
    particleGenerate.update(mic.getLevel());


}