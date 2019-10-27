const request = require('request-promise');
const endPoint = 'https://vpic.nhtsa.dot.gov/api/';

class RequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Request Error'
    this.message = message
  }
}

export default function main() {
  return {
    getVeicle: async (vin, year) => {
      try {
        return await request({
          method: 'GET',
          uri: `${endPoint}vehicles/DecodeVinValuesExtended/${vin}?format=json&modelyear=${year}`,
          json: true
        })
      } catch (error) {
        if (error.statusCode !== 200) {
          throw new RequestError('make sure that you include a valid vin or manufacturer');
        }
      }
    },
    getManufacturerAddresses: async (manufacturer) => {
      try {
        return await request({
          method: 'GET',
          uri: `${endPoint}vehicles/GetWMIsForManufacturer/${manufacturer}?format=json`,
          json: true
        })
      } catch (error) {
        if (error.statusCode !== 200) {
          throw new RequestError('make sure that you include a valid vin or manufacturer');
        }
      }
    },
    getModelsForMake: async (manufacturer) => {
      try {
        return await request({
          method: 'GET',
          uri: `${endPoint}vehicles/getmodelsformake/${manufacturer}?format=json`,
          json: true
        })
      } catch (error) {
        if (error.statusCode !== 200) {
          throw new RequestError('make sure that you include a valid vin or manufacturer');
        }
      }
    },
    getModelsForMakeYear: async (manufacturer, year) => {
      try {
        return await request({
          method: 'GET',
          uri: `${endPoint}vehicles/GetModelsForMakeYear/make/${manufacturer}/modelyear/${year}?format=json`,
          json: true
        })
      } catch (error) {
        if (error.statusCode !== 200) {
          throw new RequestError('make sure that you include a valid vin or manufacturer');
        }
      }
    }
  }
}