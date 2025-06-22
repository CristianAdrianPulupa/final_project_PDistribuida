const soap = require('soap');
const wsdlUrl = 'http://effects-calculator-service:3011/wsdl?wsdl';

async function calculateReverb(roomSize, distance) {
  return new Promise((resolve, reject) => {
    soap.createClient(wsdlUrl, (err, client) => {
      if (err) return reject(err);
      client.CalculateReverb({ roomSize, distance }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
}

module.exports = { calculateReverb };
