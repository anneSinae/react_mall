module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'mall_test', 
        {
            name: {
                type: DataTypes.STRING(50),
            },
            price: {
                type: DataTypes.INTEGER,
            },
            detail: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            path: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
            freezeTableName: true,
        }
    )
};