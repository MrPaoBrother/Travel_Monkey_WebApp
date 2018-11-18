const initState = {
    hasMonkey: false, //有无猴
    monkeyNum: 0, //猴子数量
    monkey: {
        key: '',
        gene: '',
        mood: '',
        banana: 0,
        state: 0,
        owner: ''
    }, //猴子状态
    treeFruits: 0, //树上钱
    bag: [], //背包
    picWall: ["https://yimixiaoyuan.top/2-1-2-1.jpg",
        "https://yimixiaoyuan.top/2-1-2-1.jpg",
        "https://yimixiaoyuan.top/2-1-2-1.jpg"], //照片墙
    market: [{key: 1, name: 'hat', price: 2, effect: 2},
        {key: 2, name: 'T-shirt', price: 5, effect: 2},
        {key: 3, name: 'sugar', price: 1, effect: 2},
        {key: 4, name: 'lighting', price: 3, effect: 2},
        {key: 5, name: 'gold', price: 10, effect: 2}], //商店
    marketData: [], //商店数据
    picArray: [], //照片墙图片序号
    picArrayy: [], //照片墙图片序号
    monkeyClass: false,
    where: 2,
    status: [1, 0, 1],
    i: 0
}

export default (state = initState, action) => {
    //
    if (action.type === 'setMonkeyNum') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.monkeyNum = action.data;
        return newState;
    }
    if (action.type === 'setHasMonkey') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.hasMonkey = action.data;
        return newState;
    }
    if (action.type === 'setMonkey') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.monkey = action.data;
        return newState;
    }
    if (action.type === 'setTreeFruits') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.treeFruits = action.data;
        return newState;
    }
    //
    if (action.type === 'setBag') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.bag = action.data;
        return newState;
    }
    if (action.type === 'setMarket') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.market = action.data;
        return newState;
    }
    if (action.type === 'setPicWall') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.picWall = action.data;
        return newState;
    }
    //


    if (action.type === 'clearBag') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.bag = [];
        return newState;
    }
    if (action.type === 'addProduct') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.bag.push(action.data);
        return newState;
    }
    if (action.type === 'clearPicWall') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.picWall = [];
        return newState;
    }
    if (action.type === 'addPicture') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.picWall.push(action.data);
        return newState;
    }


    return state;
}
