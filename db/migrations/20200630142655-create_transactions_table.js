'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('transactions', 
            { 
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                account_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: 'accounts', key: 'id'},
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                amount: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                account_amount: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
            }
        )
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('transactions')
    }
};
