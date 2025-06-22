const express = require('express');
const fs = require('fs');
const soap = require('soap');

const app = express();
const port = 3011;

const service = {
  EffectsService: {
    EffectsServiceSoapPort: {
      CalculateReverb: function (args) {
        const room = args.roomSize.toLowerCase();
        const distance = parseFloat(args.distance);

        let decayTime = 1.0;
        if (room === 'large') decayTime = 2.0;
        else if (room === 'medium') decayTime = 1.2;
        else decayTime = 0.8;

        const wetLevel = distance > 2 ? 0.7 : 0.4;

        return {
          decayTime,
          wetLevel
        };
      }
    }
  }
};

const wsdlXml = fs.readFileSync('./service.wsdl', 'utf8');

app.listen(port, () => {
  soap.listen(app, '/wsdl', service, wsdlXml);
 console.log(`SOAP service running on http://localhost:3011/wsdl?wsdl`);
});
