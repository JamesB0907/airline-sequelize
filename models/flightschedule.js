'use strict';
const { Model } = require('@sequelize/core');
const availableAirports = [
  'MIA',
  'JFK',
  'LAX'
];

module.exports = (sequelize, DataTypes) => {
  class FlightSchedule extends Model {
    static associate(models) {
    }
  }
  FlightSchedule.init({
    originAirport: {
      type: DataTypes.STRING,
      // examples of custom attribute validators
      validate: {
        isIn: {
          args: [availableAirports],
          msg: 'Invalid origin airport'
        }
      }
    },
    destinationAirport: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [availableAirports],
          msg: 'Invalid destination airport'
        }
      }
    },
    departureTime: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'Invalid departure time'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'FlightSchedule',
    validate: {
      validDestination() {
        const hasAirportValues = this.originAirport !==
          null && this.destinationAirport !== null;
        const invalidDestination = this.originAirport === this.destinationAirport;
        if (hasAirportValues && invalidDestination) {
          throw new Error("The destination airport cannot be the same as the origin");
        }
      }
    }
  });
  return FlightSchedule;
};