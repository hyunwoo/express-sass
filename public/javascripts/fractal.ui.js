/**
 * Created by hyunwoo on 2018. 7. 10..
 */


function setup() {
    const $root = $('body');
    console.log($root.width(), $root.height());
    const canvas = createCanvas($root.width(), $root.height());
    canvas.parent('renderer');
    console.log(canvas);
    background(0);

}
const inputs = $('input');
$('#exec').on('click',() => {
    const data = {};
    for(let i = 0 ; i < inputs.length ; i ++){
        const $input = $(inputs[i]);
        const k = $input.attr('name');
        const v = $input.val();
        data[k] = v;
    }
    console.log(data);
    fractalGenerator.generate(data);

});

// function draw(){
//     stroke(255,255,255,1);
//     console.log('asdf');
//     line(0,0,1000,1000);
// }

