//发布者
const adadisPublish = {
    // 存储订阅者的一些属性信息
    adadisBooks: {},
    // 添加订阅,根据鞋子类型添加不同的客户订阅者信息
    subscribShoe(type, customer) {
        if (this.adadisBooks[type]) {
            if (!this.adadisBooks[type].includes(customer)) {
                this.adadisBooks[type].push(customer);
            }
        } else {
            this.adadisBooks[type] = [customer];
        }
    },
    //取消订阅
    unSubscribShoe(type, customer) {
        //取消存在的订阅者
        if (!this.adadisBooks[type] || !this.adadisBooks[type].includes(customer)) {
            return;
        }
        const idx = this.adadisBooks[type].indexOf(customer);
        this.adadisBooks[type].splice(idx, 1);
    },
    // 发布者发布消息
    notify(type) {
        if (!this.adadisBooks[type]) {
            return;
        }
        this.adadisBooks[type].forEach(customer => {
            customer.update(type);
        })
    }
}

//订阅者
const customer_one = {
    phoneNumer: "142xxxxx",
    update(type) {
        console.log(this.phoneNumer + ":订阅类型" + type + "updated")
    }
}

const customer_two = {
    phoneNumer: "158xxxxx",
    update(type) {
        console.log(this.phoneNumer + ":订阅类型" + type + "updated")
    }
}

//添加订阅
// adadisPublish.subscribShoe("运动鞋", customer_one);
// adadisPublish.subscribShoe("运动鞋", customer_two);
// adadisPublish.subscribShoe("帆布鞋", customer_two);

// adadisPublish.notify("帆布鞋");

//通用实现
const Publish = (function () {
    const _subscribMap = {};
    return {
        subscrib(type, subscriber) {
            if (_subscribMap[type]) {
                if (!_subscribMap[type].includes(subscriber)) {
                    _subscribMap[type].push(subscriber)
                }
            } else {
                _subscribMap[type] = [subscriber];
            }
        },
        unSubscrib(type, subscriber) {
            if (!_subscribMap[type] || !_subscribMap[type].includes(subscriber)) {
                return;
            }
            const idx = _subscribMap[type].indexOf(subscriber);
            _subscribMap[type].splice(idx, 1);
        },
        notify(type, ...payload) {
            if (!_subscribMap[type]) {
                return;
            }
            _subscribMap[type].forEach(subscriber => {
                subscriber(...payload);
            })
        }
    }
})()

Publish.subscrib("运动鞋", (type, message) => console.log("type:" + type + ", message:" + message))
//Publish.notify("运动鞋", "type_test", "message_test")

class Publisher {
    constructor() {
        this._subscribMap = {};
    }

    subscrib(type, subscriber) {
        if (this._subscribMap[type]) {
            if (!this._subscribMap[type].includes(subscriber)) {
                this._subscribMap[type].push(subscriber)
            }
        } else {
            this._subscribMap[type] = [subscriber];
        }
    }
    unSubscrib(type, subscriber) {
        if (!this._subscribMap[type] || !this._subscribMap[type].includes(subscriber)) {
            return;
        }
        const idx = this._subscribMap[type].indexOf(subscriber);
        this._subscribMap[type].splice(idx, 1);
    }

    notify(type, ...payload) {
        if (!this._subscribMap[type]) {
            return;
        }
        this._subscribMap[type].forEach(subscriber => {
            subscriber(...payload);
        })
    }
}

const publisherInstance = new Publisher("运动鞋");
const subscriber = message => console.log(message)
publisherInstance.subscrib("运动鞋", subscriber)
publisherInstance.notify("运动鞋", "订阅 message 消息");
publisherInstance.unSubscrib("运动鞋", subscriber);

publisherInstance.notify("运动鞋", "订阅 message 消息...");