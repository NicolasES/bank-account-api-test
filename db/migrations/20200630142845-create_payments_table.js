'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('payments', 
            { 
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                transaction_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: 'payments', key: 'id'},
                },
                amount: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
                receiver: {
                    type: Sequelize.STRING,
                    allowNull: false,
                }
            }
        )
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('payments')
    }
};
