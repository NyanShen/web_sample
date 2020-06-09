function YuXiangRouSi() {
    this.type = '鱼香肉丝'
}
YuXiangRouSi.prototype.eat = function () {
    console.log(this.type + '香喷喷。。。')
}

function GongBaoJiDing() {
    this.type = '宫保鸡丁'
}

GongBaoJiDing.prototype.eat = function () {
    console.log(this.type + '好辣。。。')
}
// 工厂：饭店，根据不同类型生产不同菜品实例
function restaurant(type) {
    switch (type) {
        case '鱼香肉丝':
            return new YuXiangRouSi()
        case '宫保鸡丁':
            return new GongBaoJiDing()
        default:
            return new Error("没有这个菜品")
    }
}

const diancan1 = restaurant('鱼香肉丝');
const diancan2 = restaurant('宫保鸡丁');
const diancan3 = restaurant('小炒回锅肉');
//diancan1.eat()
//diancan2.eat()

class YuXiangRouSiTwo {
    constructor() {
        this.type = '鱼香肉丝'
    }

    eat() {
        console.log(this.type + '香喷喷。。。')
    }
}

// 工厂：饭店，产品：菜品，通过菜谱menu,创建不一样的菜品实例
class Restaurant {
    constructor() {
        //菜谱，不同菜单，有不同的特色口味，材料颜色口味各不同
        this.menuData = {}
        //‘YuXiangRouSi’: {cailiao: ['','',''],color:'',eat(){}} 对应 class Menu  
    }

    // 饭店管理新增菜谱
    addMenu(menu, type, message) {
        if (this.menuData[menu]) {
            console.log('已经有这个菜谱栏')
            return
        }
        this.menuData[menu] = {type, message}
    }

    //客户点菜，饭店炒菜（实例化菜谱）
    getMenu(menu) {
        if (!this.menuData[menu]) {
            return new Error('没有这个菜单')
        }
        const { type, message } = this.menuData[menu]
        return new Menu(type, message)
    }

    //饭店移除不要的菜谱
    removeMenu(menu) {
        if (!this.menuData[menu]) return
        delete this.menuData[menu]
    }
}

class Menu {
    constructor(type, message) {
        this.type = type
        this.message = message
    }
    eat() {
        console.log(this.type + ',' + this.message)
    }
}

const restaurantFactory = new Restaurant();
restaurantFactory.addMenu('YuXiangRouSi','鱼香肉丝','好香')
restaurantFactory.addMenu('GaoBaoJiDing', '宫保鸡丁', '好辣')
restaurantFactory.getMenu('GaoBaoJiDing').eat()
