var Device = function (name, power) {
    this.name = name;
    this.type = 'Device';
    this.power = power;
    this.enabled = false;
}
Device.prototype.constructor = Device;
Device.prototype.switchOnOff = function () {
    if (this.enabled) {
        this.enabled = false;
        console.log(this.name + ' disabled');
    }
    else {
        this.enabled = true;
        console.log(this.name + ' enabled');
    }
}
Device.prototype.print = function () {
    for (var propertyName in this) {
       if (typeof this[propertyName] !== 'function') {
            console.log(propertyName + ': ' + this[propertyName]);
        }
    }
}
Device.prototype.getPower = function () {
    if (this.enabled) {
        return this.power;
    }
    else {
        return 0;
    }
}

var Lamp = function (name, power) {
    Device.apply(this, arguments);
    this.type = 'Lamp';
    this.luminousFlux = 800;
}
Lamp.prototype = Object.create(Device.prototype);
Lamp.prototype.constructor = Lamp;

var Chandelier = function (name, power) {
    Device.apply(this, arguments);
    this.type = 'Chandelier';
    this.luminousFlux = 2000;
    this.lamps = [new Lamp(name + '__lamp1', power / 3),
    new Lamp(name + '__lamp2', power / 3),
    new Lamp(name + '__lamp3', power / 3)];
}
Chandelier.prototype = Object.create(Device.prototype);
Chandelier.prototype.constructor = Chandelier;
Chandelier.prototype.switchOnOff = function () {
     this.lamps.forEach(lamp => {
        lamp.switchOnOff();
   });
    if (this.enabled) {
        this.enabled = false;
       console.log(this.name + ' disabled');
    }
    else {
        this.enabled = true;
        console.log(this.name + ' enabled');
    }
}

var Refrigerator = function (name, power) {
    Device.apply(this, arguments);
    this.type = 'Refrigerator';
    this.lamp = new Lamp(name + '__lamp', 10);
    this.opened = false;
}
Refrigerator.prototype = Object.create(Device.prototype);
Refrigerator.prototype.constructor = Refrigerator;
Refrigerator.prototype.openClose = function () {
    if (this.opened) {
        this.opened = false;
        console.log(this.name + ' door closed');
    }
    else {
        this.opened = true;
        console.log(this.name + ' door opened');
    }
    this.lamp.switchOnOff();
}
Refrigerator.prototype.getPower = function () {
    if (this.enabled) {
        return this.power + this.lamp.getPower();
    }
    else {
        return 0;
    }
}

var Screen = function (name, power) {
    this.name = name;
    this.type = 'Screen';
    this.power = power;
    this.enabled = false;
    this.resolutionX = 1920;
    this.resolutionY = 1080;
}
Screen.prototype = Object.create(Device.prototype);
Screen.prototype.constructor = Screen;

var Room = function (name, devices) {
    this.name = name;
    this.devices = devices;
 }
Room.prototype.constructor = Room;
Room.prototype.getPower = function () {
    return this.devices.reduce(function (accumulator, device) {
        return accumulator + device.getPower();
    }, 0);
}
Room.prototype.getDevice = function (deviceName) {
      return this.devices.find(device => {
        return device.name === deviceName;
    });
}

var tv = new Screen('TV', 300);
tv.print();
console.log(tv.getPower());
tv.switchOnOff();
console.log(tv.getPower());
tv.switchOnOff();
console.log(tv.getPower());
console.log('=========================================================================');
var room = new Room('Kitchen',
    [new Lamp('Lamp1', 10),
    new Chandelier('Chandelier1', 30),
    new Refrigerator('HAIER C2F637CGG', 300),
    new Device('Microwave', 2000),
    new Screen('TV', 300)]);

for (let i = 0; i < room.devices.length; i += 2) {
    const device = room.devices[i];
    device.switchOnOff();
}
console.log('Room consuming ' + room.getPower() + ' W');
for (let i = 1; i < room.devices.length; i += 2) {
    const device = room.devices[i];
    device.switchOnOff();
}
console.log('Room consuming ' + room.getPower() + ' W');
room.getDevice('HAIER C2F637CGG').openClose();
console.log('Room consuming ' + room.getPower() + ' W');
room.getDevice('HAIER C2F637CGG').openClose();
console.log('Room consuming ' + room.getPower() + ' W');
for (let i = 0; i < room.devices.length; i += 2) {
    const device = room.devices[i];
    device.switchOnOff();
}
console.log('Room consuming ' + room.getPower() + ' W');
for (let i = 1; i < room.devices.length; i += 2) {
    const device = room.devices[i];
    device.switchOnOff();
}
console.log('Room consuming ' + room.getPower() + ' W');

room.getDevice('TV').print();