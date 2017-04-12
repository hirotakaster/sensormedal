# SensorMedal-EVK-001
SensorMedal tool for <a href="http://www.rohm.co.jp/web/japan/sensor-medal-support" target="_blank">SensorMedal-EVK-001</a>. 

# install 
```
npm install sensormedal
```

# sample source
```
var SensorMedal = require('./index');
SensorMedal.startScanning();
SensorMedal.on('medaldata', function(data) {
  console.dir(data);
});

## console output
#{ acceleration_x: 6,
#  acceleration_y: 3,
#  acceleration_z: 999,
#  magnetism_x: 257,
#  magnetism_y: 380,
#  magnetism_z: -3,
#  angular_x: 99,
#  angular_y: 4,
#  angular_z: 123,
#  pressure: 49613 }
```

# how to calculate the acceleration, magnetis, angular angle, pressure.
```
acceleration[m/sec*sec] = acceleration_[x|y|z] / 1024 * 9.8
magnetis[uT] = magnetis_[x|y|z] / 10
angular angle[angle/sec] = angular_[x|y|z] / 131
pressure[Pa] = pressure + 50000
```

