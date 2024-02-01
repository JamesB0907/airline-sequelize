const { Model } = require('@sequelize/core');
module.exports = (sequelize, DataTypes) => {
  class BoardingTicket extends Model {
    static associate(models) {
      this.Customer = this.belongsTo(models['Customer']);
      this.FlightSchedule = this.belongsTo(models['FlightSchedule']);
    }
  };
  BoardingTicket.init(
    {
      seat: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please enter in a valid seating arrangement",
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'BoardingTicket',
    }
  );
  return BoardingTicket;
};
