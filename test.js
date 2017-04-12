var SensorMedal = require('./index');
SensorMedal.startScanning();
SensorMedal.on('medaldata', function(data) {
  console.dir(data);
});
