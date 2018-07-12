const fractalGenerator = new function() {
    let generateData = {};
    let lineData = [];

    this.getLineData = () => {
        return lineData;
    };

    const drawLineByAngle = (x1, y1, degree, depth) => {
        const length = Math.pow(generateData.childBranchLengthRatio, depth)
            * generateData.initialBranchLength;

        if (depth > generateData.depthCount) return;
        const radian = degree / 180 * Math.PI;
        const x2 = Math.cos(radian) * length + x1;
        const y2 = Math.sin(radian) * length + y1;

        const c = lerpHexColor(depth / generateData.depthCount);

        lineData.push({
            depth,
            x1,
            y1,
            x2,
            y2,
            c,
            opacity: 255 - depth / generateData.depthCount * 255,
        });


        let startAngle = -(generateData.childBranchCount - 1)
            * generateData.childBranchAngle / 2 + degree * 1;

        for (let i = 0; i < generateData.childBranchCount; i++) {
            drawLineByAngle(x2, y2, startAngle, depth + 1);
            startAngle += generateData.childBranchAngle * 1;
        }
    };

    const lerpHexColor = (ratio) => {
        const r1 = Number('0x' + generateData.startColor[ 1 ] + generateData.startColor[ 2 ]);
        const g1 = Number('0x' + generateData.startColor[ 3 ] + generateData.startColor[ 4 ]);
        const b1 = Number('0x' + generateData.startColor[ 5 ] + generateData.startColor[ 6 ]);
        const r2 = Number('0x' + generateData.endColor[ 1 ] + generateData.endColor[ 2 ]);
        const g2 = Number('0x' + generateData.endColor[ 3 ] + generateData.endColor[ 4 ]);
        const b2 = Number('0x' + generateData.endColor[ 5 ] + generateData.endColor[ 6 ]);
        const r = r1 * (1 - ratio) + r2 * ratio;
        const g = g1 * (1 - ratio) + g2 * ratio;
        const b = b1 * (1 - ratio) + b2 * ratio;
        return {
            r,
            g,
            b,
        }
    };

    this.generate = (data) => {
        lineData = [];
        generateData = data;
        blendMode(BLEND);
        background(0);
        blendMode(ADD);
        const cx = width / 2;
        const cy = height / 2;

        const dAngle = 360 / data.startBranchCount;
        let currentAngle = 0;
        for (let i = 0; i < data.startBranchCount; i++) {
            drawLineByAngle(cx, cy, currentAngle, 1);
            currentAngle += dAngle;
        }

        console.log(lineData);
        // drawLine(0, 0, 500, 500, '#ff0000');
    };


    let tick = 0;
    let isPause = false;
    this.play = () => {
        tick = 0;

    };

    this.pause = () => {
        isPause = !isPause;
    };

    this.update = () =>{
        if(isPause) return;
        tick ++;
        const depth = Math.floor(tick / 100) + 1;
        drawLineData(getLineDataByDepth(depth), 0.01);
    };

    function drawLineData(datas, opacity){
        _.forEach(datas, d => {
            stroke(d.c.r,
                d.c.g,
                d.c.b,
                d.opacity * opacity);

            line(d.x1,
                d.y1,
                d.x2,
                d.y2);
        });

    }
    function getLineDataByDepth(depth){
        return _.filter(lineData, d => d.depth === depth);
    }
};

let mic;
function setup() {
    const $root = $('body');
    console.log($root.width(), $root.height());
    const canvas = createCanvas($root.width(), $root.height());
    canvas.parent('renderer');
    console.log(canvas);
    background(0);

    mic = new p5.AudioIn();
    mic.start();
}


function draw() {
    fractalGenerator.update();
    console.log(mic.getLevel());

}