const $root = $('.grid');
const template = `
<div class="cell">
    <div class="image-group">
        <div class="title"></div>
        <div class="tags">
        </div>
    </div>
    <div class="text-group">
        <div class="desc"></div>
        <div class="date"></div>
    </div>
</div>`;

const $grid = $('.grid').masonry({
    // set itemSelector so .grid-sizer is not used in layout
    itemSelector: '.cell',
    // use element for option
    // columnWidth: '.cell',
    percentPosition: true
})


function Element(data) {
    const $ele = $(template);
    this.$ele = $ele;
    this.title = data.title;
    // const $title = $ele.find('.title'); // 변경 여지가 있을때
    $ele.find('.title').text(data.title);
    $ele.find('.image-group').css('height', Math.random() * 200 + 200);
    $ele.find('.desc').text(data.title + " ???");
    const $tagRoot = $ele.find('.tags');

    for (let i = 0; i < data.tag.length; i++) {
        $tagRoot.append(`<div class='tag'>${data.tag[ i ]}</div>`)
    }


    // asdf .indexOf('e')

    this.hasTag = function(tag) {
        tag = tag.toLowerCase();
        return !_.isEmpty(_.filter(data.tag,
            tagValue => tagValue.toLowerCase().indexOf(tag) !== -1));

        // for (let i = 0; i < data.tag.length; i++) {
        //     const targetTag = data.tag[ i ].toLowerCase();
        //     if (targetTag.indexOf(tag) !== -1) return true;
        // }
        // return false;
    };

    this.setVisible = function(b) {
        if (b) $ele.css('display', 'inline-block');
        else  $ele.css('display', 'none');
    };


    $grid.append($ele).masonry('appended', $ele);

    // $ele.appendTo($root);

    return this;
}

// create Elements
let elements = _.map(data, (d) => new Element(d));

const $input = $('input');
$input.on('keyup', () => {
    const val = $input.val().toLowerCase();
    // 현재 있는 데이터
    elements = _.filter(elements, ele => {
        const isExist = ele.hasTag($input.val());
        if (!isExist) {
            $grid.masonry('remove', ele.$ele).masonry('layout');
        }
        return isExist;
    });

    // // 추가 되고 싶은 데이터
    // let filteredDatas = _.filter(data, d => {
    //     const arr = _.filter(d.tag, t => t.toLowerCase().indexOf(val) !== -1);
    //     return !_.isEmpty(arr);
    // });
    //
    // filteredDatas = _.filter(filteredDatas, d => {
    //     var isExist = false;
    //     for(var i = 0 ; i < elements.length ; i ++){
    //         if(elements[i].title === d.title) isExist = true;
    //     }
    //     return !isExist;
    // });
    // // 빼줘야 뺴 줘야해 이거 젠장
    // for (var i = 0; i < filteredDatas.length; i++) {
    //     const d = filteredDatas[ i ];
    //     elements.push(new Element(d));
    // }

    _.chain(data)
        .filter(d => !_.isEmpty(_.filter(d.tag, t => t.toLowerCase().indexOf(val) !== -1)))
        .filter(d => _.isEmpty(_.filter(elements, ele => ele.title === d.title)))
        .forEach(d => elements.push(new Element(d)))
        .value();


    // console.log(filteredDatas);


});

