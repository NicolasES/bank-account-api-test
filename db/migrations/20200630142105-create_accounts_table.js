'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('accounts', 
            { 
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: 'users', key: 'id'},
                },
                amount: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                }
            }
        )
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('accounts')
    }
};
