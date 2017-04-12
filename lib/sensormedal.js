var events = require('events');
var util = require('util');
var noble = require('noble');

var SENSORMEDAL__UUID            = "88751dc33ced4e8d9dc613c0b67bf278";
var SENSORMEDAL__SERVICES        = "0179bbc000000100800000805f9b34fb";
var SENSORMEDAL__CHARACTERISTICS = "0179bbc300000100800000805f9b34fb";

var SensorMedal = function() {
  noble.on('discover', this.onDiscover.bind(this));
};
util.inherits(SensorMedal, events.EventEmitter);

SensorMedal.prototype.startScanning = function() {
  if (noble.state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    noble.on('stateChange', function() {
      noble.startScanning([], true);
    });
  }
};

SensorMedal.prototype.stopScanning = function() {
  noble.stopScanning();
};

SensorMedal.prototype.onDiscover = function(peripheral) {
  var self = this;
  if (peripheral.uuid == SENSORMEDAL__UUID) {
      peripheral.connect(function(error) {

      peripheral.discoverServices([SENSORMEDAL__SERVICES], function(error, services) {
        var deviceInformationService = services[0];
        deviceInformationService.discoverCharacteristics([SENSORMEDAL__CHARACTERISTICS], function(error, characteristics) {
          var sensorDataCharacteristic = characteristics[0];

          sensorDataCharacteristic.on('data', function(data, isNotification) {
            sensordata = {};
            sensordata.acceleration_x = data.readInt16LE(0);
            sensordata.acceleration_y = data.readInt16LE(2);
            sensordata.acceleration_z = data.readInt16LE(4);
  
            sensordata.magnetism_x = data.readInt16LE(6);
            sensordata.magnetism_y = data.readInt16LE(8);
            sensordata.magnetism_z = data.readInt16LE(10);

            sensordata.angular_x = data.readInt16LE(12);
            sensordata.angular_y = data.readInt16LE(14);
            sensordata.angular_z = data.readInt16LE(16);

            sensordata.pressure = data.readUInt16LE(18);

            self.emit('medaldata', sensordata);
          });

          sensorDataCharacteristic.notify(true, function(error) {
          });
        });
      });
    });
  }
};

module.exports = SensorMedal;
