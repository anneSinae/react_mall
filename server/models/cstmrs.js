module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'cstmrs', 
        {
            name: {
                type: DataTypes.STRING(50),
            },
            password: {
                type: DataTypes.INTEGER,
            },
            email: {
                type: DataTypes.STRING(50),
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