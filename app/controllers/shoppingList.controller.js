import db from '../models';

const ShoppingList = db.shoppingList;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.product){
        res.status(400).send({ message:'Product required.' });
    }

    const product = {
        product: req.body.product,
        count: req.body.count ? req.body.count : 1,
        deadline: req.body.deadline ? req.body.deadline : new Date()
    };

    ShoppingList.create(product)
    .then((data) => {
        res.status(201).send(data);
    })
    .catch((error) => {
        res.status(500).send({ message: `Error creating product ${product.product}: ${error.message}`} );
    });
};

exports.findAll = (req, res) => {
    const product = req.query.product;
    const condition = product ? { product: { [Op.like]: `%${product}%` } } : null;

    ShoppingList.findAll({ where: condition })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((error) => {
        res.status(500).send({ message: `Error retrieving all products: ${error.message}`} );
    });
};

exports.findNotDone = (req, res) => {
    ShoppingList.findAll({ where: { done: false } })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((error) => {
        res.status(500).send({ message: `Error retrieving products: ${error.message}`} );
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    ShoppingList.findByPk(id)
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((error) => {
        res.status(500).send({ message: `Error retrieving product with id=${id}: ${error.message}`} );
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    
    ShoppingList.update(req.body, { where: { id: id } })
    .then((num) => {
        if(num == 1){
            res.status(200).send( { message: 'Product was update success.' });
        }else{
            res.status(404).send( { message: 'Cannot update product. Maybe it was not found or req.body is empty!'});
        }
    })
    .catch((error) => {
        res.status(500).send({ message: `Error updating product with id=${id}: ${error.message}`} );
    });
};

exports.updateDone = (req, res) => {
    const id = req.params.id;

    ShoppingList.update({ done: true }, { where: { id: id } })
    .then((num) => {
        if(num == 1){
            res.status(200).send( { message: 'Product was done success.' });
        }else{
            res.status(404).send( { message: 'Cannot done product. Maybe it was not found.'});
        }
    })
    .catch((error) => {
        res.status(500).send({ message: `Error set done product with id=${id}: ${error.message}`} );
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    ShoppingList.destroy({ where: { id: id } })
    .then((num) => {
        if(num == 1){
            res.status(200).send( { message: 'Product was delete success.' });
        }else{
            res.status(404).send( { message: 'Cannot delete product. Maybe it was not found.'});
        }
    })
    .catch((error) => {
        res.status(500).send({ message: `Error deleting product with id=${id}: ${error.message}`} );
    });
};