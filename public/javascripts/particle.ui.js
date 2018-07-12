/**
 * Created by hyunwoo on 2018. 7. 10..
 */

const inputs = $('input');
$('#exec').on('click', () => {
    const data = {};
    for (let i = 0; i < inputs.length; i++) {
        const $input = $(inputs[ i ]);
        const k = $input.attr('name');
        const v = $input.val();
        data[ k ] = v;
    }
    particleGenerate.generate(data);
});


// $('#play').on('click', fractalGenerator.play);
// $('#pause').on('click', fractalGenerator.pause);


