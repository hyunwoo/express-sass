const fractalGenerator = new function() {

    let generateData = {};

    const drawLineByAngle = (x1, y1, degree,  depth) => {
        const length = Math.pow(generateData.childBranchLengthRatio, depth)
            * generateData.initialBranchLength;

        if (depth > generateData.depthCount) return;
        const radian = degree / 180 * Math.PI;
        const x2 = Math.cos(radian) * length + x1;
        const y2 = Math.sin(radian) * length + y1;

        const c = lerpHexColor( depth / generateData.depthCount);
        stroke(c.r, c.g, c.b, 255 - depth / generateData.depthCount * 255);
        line(x1, y1, x2, y2);

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


        // drawLine(0, 0, 500, 500, '#ff0000');
    }

};