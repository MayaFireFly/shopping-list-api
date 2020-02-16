module.exports = (app) => {    
    const products = require('../controllers/shoppingList.controller');
    const router = require('express').Router();

    router.post('/', products.create);

    router.get('/', products.findAll);

    router.get('/notdone', products.findNotDone);

    router.get('/:id', products.findOne);

    router.put('/done/:id', products.updateDone);

    router.put('/:id', products.update);

    router.delete('/:id', products.delete);

    app.use('/api/products', router);
};