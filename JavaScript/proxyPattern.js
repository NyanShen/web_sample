//目标对象target: 明星
const SuperStar = {
    name: '小鲜肉',
    scheduleFlag: false,
    scheduleFlagActually: false,
    playAdvertisement: function (advertisement) {
        console.log(this.name + '做任务: ' + advertisement)
    }
}

//代理对象proxy: 经纪人
const proxyAssistant = {
    name: '经纪人张某',
    scheduleTimeByPromise: function () {
        return new Promise((resolve, reject) => {
            console.log("schedule time")
            setTimeout(() => {
                console.log("小鲜肉空出时间了");
                resolve();
            }, 2000)
        })
    },
    scheduleTimeByProxy: function (advertisement) {
        const schedule = new Proxy(SuperStar, {
            // handler回调，prop为发生变化的属性，val为发生变化的值
            // 有值发生变化后才执行回调，此处setTimeout先执行
            // 只要对象属性发生变化就会监听执行回调
            set(obj, prop, val) {
                console.log('proxy values: ', prop, val)
                if (prop !== 'scheduleFlag') {
                    return;
                }
                if (obj.scheduleFlag === false && val === true) {
                    obj.scheduleFlag = true;
                    obj.playAdvertisement(advertisement);
                }
            }
        });
        setTimeout(() => {
            console.log("小鲜肉空出时间了");
            schedule.scheduleFlag = true;
        }, 2000)
    },
    scheduleTimeByDefineProperty: function (advertisement) {
        // 只能监听scheduleFlag变化，还要借用变量
        Object.defineProperty(SuperStar, 'scheduleFlag', {
            get() {
                return SuperStar.scheduleFlagActually
            },
            set(val) {
                if (SuperStar.scheduleFlagActually === false && val === true) {
                    SuperStar.scheduleFlagActually = true;
                    SuperStar.playAdvertisement(advertisement)
                }
            }
        });

        setTimeout(() => {
            console.log("小鲜肉空出时间了");
            SuperStar.scheduleFlag = true;
        }, 2000)
    },
    playAdvertisement: function (condition, advertisement) {
        if (condition > 100000) {
            console.log('接受任务: ' + advertisement);
            //SuperStar.playAdvertisement(advertisement);
            // proxyAssistant.scheduleTimeByPromise()
            // .then(()=> {
            //     SuperStar.playAdvertisement(advertisement)
            // });
            proxyAssistant.scheduleTimeByProxy(advertisement);
        } else {
            console.log('不满足条件，不做')
        }
    }
}
//访问者visitor
proxyAssistant.playAdvertisement(100, "拍广告");
proxyAssistant.playAdvertisement(1000000, "拍广告");