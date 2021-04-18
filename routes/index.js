const express = require('express');
const router = express.Router();

router.use('/', require('./homePage'));

router.use('/showUsers', require('./showUsers'));

router.use('/showUser', require('./showUser'));
router.use('/showUser-Action/:id', require('./showUser-Action'));

router.use('/addUser', require('./addUser'));
router.use('/addUser-Action/:id/:cash/:credit/:isActive', require('./addUser-Action'));

router.use('/depositCash', require('./depositCash'));
router.use('/depositCash-Action/:id/:cash', require('./depositCash-Action'));

router.use('/updateCredit', require('./updateCredit'));
router.use('/updateCredit-Action/:id/:credit', require('./updateCredit-Action'));

router.use('/withdrawCash', require('./withdrawCash'));
router.use('/withdrawCash-Action/:id/:cash', require('./withdrawCash-Action'));

router.use('/transferCash', require('./transferCash'));
router.use('/transferCash-Action/:tid/:gid/:cash', require('./transferCash-Action'));

// router.get('/test', (req, res)=> {
//     res.send("test");
// })

module.exports = router;