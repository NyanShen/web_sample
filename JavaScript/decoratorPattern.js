function OriginHouse() { }

OriginHouse.prototype.getDesc = function () {
    console.log("空房子");
}

function Furniture(house) {
    this.house = house;
}
Furniture.prototype.getDesc = function () {
    this.house.getDesc();
    console.log("搬入家具");
}

function Painting(house) {
    this.house = house;
}

Painting.prototype.getDesc = function () {
    this.house.getDesc();
    console.log("刷房子")
}
let house = new OriginHouse()
house = new Furniture(house)
house = new Painting(house)

// house.getDesc()

var originHouse = {
    getDesc() {
        console.log("origin house");
    }
}

function furniture() {
    console.log("furniture");
}

function painting() {
    console.log("painting");
}
originHouse.getDesc = function () {
    var getDesc = originHouse.getDesc;
    return function () {
        getDesc();
        furniture();
        painting();
    }
}()
originHouse.getDesc();

function originDecorationFn(originObj, originKey, fn) {
    originObj[originKey] = function() {
        var originFn = originObj[originKey];
        return function() {
            originFn && originFn();
            fn();
        }
    }()
}
