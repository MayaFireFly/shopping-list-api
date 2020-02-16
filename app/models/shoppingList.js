module.exports = (sequelize, DataTypes) => {
    const shoppingList = sequelize.define('shoppingList', 
    {
        product:{
            type: DataTypes.STRING,
            allowNull: false
        },
        count:{
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        deadline:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        done:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName:true
    });

    return shoppingList;
};