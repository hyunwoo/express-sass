var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'HELLO!!!',
        items: [
            { name: '재종' },
            { name: '준엽' },
            { name: '현식' }
        ]
    });
});

router.get('/main', function (req, res, next) {
    res.render('index', {});
});

router.get('/getName', function (req, res) {
    res.send('예진');
});


router.get('/board', function (req, res, next) {
    res.render('board');
});

router.get('/fractal', function (req, res, next) {
    res.render('fractal');
});

module.exports = router;
