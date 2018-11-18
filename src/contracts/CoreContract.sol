pragma solidity 0.4.23;

contract CoreContract {

    //------------------------------合约中的结构体------------------------------

    struct Monkey {             //猴子  
        uint256 key;            //猴子key   
        uint256 gene;           //猴子基因 会影响猴子的样子等特征
        uint256 mood;           //心情  之后随机事件的重要依据
        uint256 banana;         //拥有的香蕉总数  香蕉可以用来购买商品
        bool state;             //猴子的状态  外出还是在家 true在家，false在外
        uint256 monkeystate;    //猴子商品状态， 标记猴子身上佩戴的物品，从而影响外观
        address owner;          //猴子的主人
    }

    struct Productstr {         //商品
        uint256 key;            //商品key
        string name;            //商品名字
        uint256 price;          //商品价格
        uint256 effect;         //商品效果，对猴子心情的影响
    }

    //图片结构体
    //所有的图片，都是在链上生成相应的backgroundid，animalsid，monkeystate，
    //然后用这三个值，去后端取出对应的图片。
    struct Picturestr {             //图片，猴子外出带回来的图片，由三部分组成，背景，小伙伴，猴子自己
        uint256 key;                //图片key
        uint256 backgroundid;       //背景的id
        uint256 animalsid;          //小伙伴的id
        uint256 monkeystate;        //猴子的状态  这里的状态是指 猴子身上带有的物品（比如从商店里面买了项链，那么照片里面的猴子就会由项链）
    }

    //------------------------------合约中的map------------------------------
    mapping (uint256 => Picturestr) allpictures;          //存放世界所有(key=>value) value为照片
    mapping (uint256 => Productstr) allproducts;          //商店所有商品 value为商品
    mapping (uint256 => Monkey) monkeys;            //世界所有的猴子 value为猴子
    mapping (address => uint256) owner2monkey;      //玩家地址 与 猴子key 的对应
    mapping (address => uint256[]) owner2product;   //玩家地址 与 玩家所拥有的商品key 的对应
    mapping (address => uint256[]) owner2picture;   //玩家地址 与 玩家所拥有的照片key 的对应
    mapping (uint256 => address) player2address;     //玩家key 与 玩家地址 的对应

    //------------------------------合约中的基本属性------------------------------
    uint256 background = 4;   //猴子出去游玩的场景总数量
    uint256 animals = 3;        //猴子出去游玩能遇到的小伙伴的总数量
    uint256 productcount = 1;   //下一个商品的key， productcount-1 为所有商品的数量
    uint256 picturecount = 1;   //下一个照片的key， picturecount-1 为所有照片的数量
    uint256 monkeycount = 1;    //下一个猴子的key， monkeycount-1 为所有猴子的数量
    uint256 playercount = 1;    //下一个玩家的key， playercount-1 为所有猴子的数量
    uint256 bananacount = 15;           //初始化树上香蕉的数量
    address public owneraddress;        //发布者地址，用于权限管理

    //------------------------------合约中的事件------------------------------
    event GetFreeMonkeySuccess (address, uint256, bool);            //成功领取猴子，在freeMonkey中触发
    event BuyProductSuccess (uint256);                              //成功购买商品，在buyProduct中触发
    event WalkoutSuccess (uint256, uint256, uint256, uint256);      //外出，在checkWalkOut中触发
    event BackHomeSuccess (bool);                                   //回家，在backHome中触发
    event AddProduct (uint256, string, uint256, uint256);           //添加新商品，在addProduct中触发
    event ChangeBackgroundSuccess (uint256);                        //改变外出场景，在changeBackground中触发
    event ChangeAnimalsSuccess (uint256);                           //改变小伙伴，在changeAnimals中触发
    event SetMonkeyStateSuccess (uint256);                          //更新猴子monkeystate，在setMonkeyState中触发
    event SetMoodSuccess (uint256);                                 //增加mood，在setMood中触发
    event SubMoodSuccess (uint256);                                 //减少mood，在subMood中触发
    event SetBananaSuccess (uint256);                               //更新banana，在setBanana中触发
    event SetStateSuccess (bool);                                   //更新state，在setState中触发

    //------------------------------初始化权限以及数据------------------------------
    //构造函数，在合约发布时调用，用于权限设置以及数据初始化
    function CoreContract() public {
        owneraddress = msg.sender;          //初始化owneraddress，发布者地址，用于后面的权限管理
        init();         //初始化商品等数据
    }

    //-----------初始化数据-----------
    function init() private {
        //初始化0号商品
        Productstr memory product = Productstr({key:0, name:"nothing", price:0,effect:0});
        //初始化0号照片
        Picturestr memory picture = Picturestr({key:0, backgroundid:0, animalsid:0, monkeystate:0});
        //初始化0号猴子
        Monkey memory monkey = Monkey({key:0, gene:0, mood:0, banana:0, state:true, monkeystate:0, owner:owneraddress});
        allproducts[0] = product;
        allpictures[0] = picture;
        monkeys[0] = monkey;
        //初始化5个商品
        addProduct("hat", 2, 2);                    //帽子
        addProduct("T-shirt", 5, 5);                //T恤
        addProduct("sugar", 1, 1);                  //糖果
        addProduct("lighting", 3, 3);               //手电筒
        addProduct("gold", 10, 10);                 //金项链
    }

    //-----------权限管理-----------
    //修改器，用于权限的判断
    modifier onlyOwner () {
        require(msg.sender == owneraddress);
        _;
    }
    //用于判断玩家是否由猴子
    modifier onlyMonkey () {
        require(owner2monkey[msg.sender] != 0);
        _;
    }

    //------------------------------基本属性的查看与修改------------------------------
    // background，animals，productcount，picturecount，monkeycount，bananacount
    // -----------background-----------
    // 查看外出场景数量，仅发布者有权限
    function getBackground() public view onlyOwner returns(uint256) {
        return background;
    }
    // 修改外出场景数量，仅发布者有权限
    // background值发生变化时，外出随机到的backgroundid的范围会变化，从而得到不同的外出场景
    // 比如background从3变为4，意味着外出场景多了一个，animalsid从（0～3）变成（0～4），4即为添加的新场景，可以在后端取到相应的图片
    function changeBackground (uint256 _background) public onlyOwner {
        background = _background;
        emit ChangeBackgroundSuccess(background);
    }

    // -----------animals-----------
    //查看小伙伴数量，仅发布者有权限
    function getAnimals() public view onlyOwner returns(uint256) {
        return animals;
    }
    //修改小伙伴数量，仅发布者有权限
    // animals值发生变化时，外出随机到的animalsid的范围会变化，从而得到不同的外出场景
    // 比如animals从3变为4，意味着外出场景多了一个，animalsid从（0～3）变成（0～4），4即为添加的小伙伴，可以在后端取到相应的图片
    function changeAnimals (uint256 _animals) public onlyOwner {
        animals = _animals;
        emit ChangeAnimalsSuccess(animals);
    }

    // -----------productcount-----------
    //获取当前商品总数量
    function getProductlength() public view returns(uint256) {
        return productcount;
    }
    //添加商品，仅发布者有权限
    //新添加的商品会出现在商店中，玩家可以购买，和之前的商品一样
    function addProduct (string _name, uint256 _price, uint256 _effect) public onlyOwner {
        Productstr memory product = Productstr({key:productcount, name:_name, price:_price, effect:_effect});
        allproducts[productcount] = product;
        productcount ++;
        Productstr memory tmpproduct = allproducts[productcount - 1];
        emit AddProduct (tmpproduct.key, tmpproduct.name, tmpproduct.price, tmpproduct.effect);
    }

    // -----------picturecount-----------
    //获取当前世界照片总数量
    function getPicturelength() public view returns(uint256) {
        return picturecount;
    }
    //在猴子照片墙上增加照片。猴子外出时，会给玩家寄回一张照片，玩家可以在照片墙上查看。
    //只能被checkWalkout()调用
    function addPicture(uint256 _randombackground, uint256 _randomanimals, uint256 _monkeystate) private {
        Picturestr memory picture = Picturestr({key:picturecount, backgroundid:_randombackground, animalsid: _randomanimals, monkeystate: _monkeystate});
        allpictures[picturecount] = picture;                   //将照片添加到世界照片墙
        uint256[] pictures = owner2picture[msg.sender]; 
        pictures.push(picturecount);                        //将照片添加到猴子的照片墙
        owner2picture[msg.sender] = pictures;
        picturecount ++; 
    }

    // -----------monkeycount-----------
    //获取游戏中猴子总数
    function getMonkeycount () public view returns (uint256) {
        return monkeycount;
    }
    //通过玩家地址check玩家是否有猴子，没有猴子则调用freeMonkey（），让玩家免费领取一只猴子
    function checkFirst () public view returns(bool){
        if(owner2monkey[msg.sender] == 0){
            return true;        //没有猴子，可以领取免费猴子
        }
        else{
            return false;       //已经有猴子
        }
    }
    //领取免费猴子，玩家不能重复领取
    function freeMonkey () public {
        require(checkFirst());                        //确认玩家没有猴子，有则无法领取
        //初始化猴子的各个属性值
        uint256 _key = monkeycount;
        uint256 _gene = randomGene();
        uint256 _mood = 60;
        uint256 _banana = 100;
        bool _state = true;
        uint256 _monkeystate = 1;
        address _owner = msg.sender;
        Monkey memory monkey = Monkey({key:_key, gene:_gene, mood:_mood, banana:_banana, state:_state, monkeystate:_monkeystate, owner:_owner});
        monkeys[monkeycount] = monkey;
        owner2monkey[msg.sender] = _key;            //地址和猴子做映射
        monkeycount ++;                             //猴子总数量+1
        player2address[playercount] = msg.sender;   //玩家key和玩家地址做映射
        playercount ++;                             //玩家总数量+1
    }

    // -----------playercount-----------
    // 获取游戏中玩家的总数量
    function getPlayercount () public view returns (uint256) {
        return playercount;
    }
    //获取第key个玩家的地址
    function getPlayer (uint256 _key) public view returns (address) {
        return player2address[_key];
    }

    // -----------bananacount-----------
    //获取香蕉树上拥有的香蕉数量（玩家可以采摘树上的香蕉，通过getBananaFromTree方法）
    function getBananacount () public view returns(uint256) {
        return bananacount;
    }
    //玩家采摘树上的香蕉。
    //游戏中需要用香蕉购买商品，当玩家采摘数量的香蕉时，树上的香蕉数量变为0，猴子增加相应数量的香蕉。
    //在购买商品时，如果树上的香蕉为0，会有一定概率增加树上的香蕉数量
    function getBananaFromTree () public {
        uint256 _monkeykey = owner2monkey[msg.sender];
        Monkey memory monkey = monkeys[_monkeykey];
        monkey.banana = monkey.banana + bananacount;                //采摘树上的香蕉
        monkeys[_monkeykey] = monkey;                               //更新猴子的数据
        bananacount = 0;                                            //树上的香蕉数量归0
    }
    // 被动增加香蕉树上香蕉的数量，只能被buyProduct()调用
    // 在玩家购买东西时，即调用buyProduct()时，有一定概率增加香蕉树上香蕉的数量
    // 取 0～100 的一个随机数，对5求余，结果即为树上长出来的香蕉数量
    function addTree () private {
        uint256 probability = uint256(sha256(now, msg.sender))%100;
        bananacount = probability % 5;
    }
    //充值banana
    //使用token来购买游戏中的banana
    function addBanana (uint256 _banana) public payable {
        require(msg.value >= _banana);                               //判断支付金额是否足够
        setBanana(_banana);
    }

    
    // ------------------------------游戏数据的查看与修改------------------------------
    // 根据地址获取玩家的猴子信息
    function getMonkey () public view  returns (uint256, uint256, uint256, uint256, bool, uint256, address) {
        uint256 _key = owner2monkey[msg.sender];
        Monkey memory monkey = monkeys[_key];
        return (monkey.key, monkey.gene, monkey.mood, monkey.banana, monkey.state, monkey.monkeystate, monkey.owner);
    }

    // 根据地址获取玩家拥有的商品的key
    function getowner2product () public view returns(uint256[]) {
        return owner2product[msg.sender];
    }

    // 根据key值获取某个商品的信息（需要一个参数，参数为商品的key值）
    function getProduct (uint256 _key) public view returns (uint256, string, uint256, uint256) {
        Productstr memory product = allproducts[_key];
        return (product.key, product.name, product.price, product.effect);
    }

    // 根据地址获取玩家拥有的照片的key
    function getowner2picture () public view returns(uint256[]) {
        return owner2picture[msg.sender];
    }

    // 根据key值获取某个照片的信息（需要一个参数，参数为照片的key值）
    function getPicture (uint256 _key) public view returns (uint256, uint256, uint256, uint256) {
        Picturestr memory picture = allpictures[_key];
        return (picture.key, picture.backgroundid, picture.animalsid, picture.monkeystate);
    }

    // 更新猴子的monkeystate属性，monkeystate用来和后端的猴子外形的图片做对应
    // 例如商店总共有有5件商品， 当前猴子有第1件和第4件，那么猴子的monkeystate为 01001 对应的9
    // 只能被buyProduct和checkWalkout调用
    function setMonkeyState () private  {
        uint256 _key = owner2monkey[msg.sender];
        Monkey memory monkey = monkeys[_key];
        uint256[] tmpproducts = owner2product[msg.sender];     //获取猴子拥有的商品的key
        uint256 i = 0;
        bool[] flag;
        for(i = 1; i < productcount; i++) {
            flag.push(false);
        }
        for(i = 1; i < tmpproducts.length; i++) {               //获取monkeystate的二进制
            flag[tmpproducts[i] - 1] = true;
        }
        uint256 res = 0;
        for(i = 0; i < flag.length; i++) {                      //获取monkeystate对应的十进制数
            if(flag[i] == true){
                res = res + calculate(i);
            }
        }
        monkey.monkeystate = res + 1;                                 //初始化时候，没有猴子，monkeystate = 0 
        monkeys[_key] = monkey;                             //有猴子，但是猴子没有任何商品时 monkeystate = 1，因此进行+1操作
        emit SetMonkeyStateSuccess(monkey.monkeystate);
    }

    // 更新猴子的mood属性，当猴子购买商品或者外出之后，猴子的mood属性会发生变化
    function setMood (uint256 _mood) private {
        uint256 _key = owner2monkey[msg.sender];
        Monkey memory monkey = monkeys[_key];
        monkey.mood = monkey.mood + _mood;
        if(monkey.mood > 100) {
            monkey.mood = 100;      //猴子的心情值最大为100
        }
        monkeys[_key] = monkey;
        emit SetMoodSuccess(monkey.mood);
    }

    // 降低猴子的mood属性，当猴子外出或者回家后，mood值有概率降低
    function subMood (uint256 _mood) private {
        uint256 _key = owner2monkey[msg.sender];
        Monkey memory monkey = monkeys[_key];
        monkey.mood = monkey.mood -  _mood;
        if(monkey.mood < 20) {
            monkey.mood = 20;      //猴子的心情值最小为20
        }
        monkeys[_key] = monkey;
        emit SubMoodSuccess(monkey.mood);
    }

    //更新猴子的banana属性，该属性为玩家拥有的banana数量，banana在游戏中可以用来购买商品。
    function setBanana (uint256 _banana) private {
        uint256 _key = owner2monkey[msg.sender];
        Monkey memory monkey = monkeys[_key];
        monkey.banana = monkey.banana + _banana;
        monkeys[_key] = monkey;
        emit SetBananaSuccess(monkey.banana);
    }

    //更新猴子的state属性值，用来标记猴子在外面还是在家中
    function setState (bool _state) private {
        uint256 _key = owner2monkey[msg.sender];
        Monkey memory monkey = monkeys[_key];
        monkey.state = _state;
        monkeys[_key] = monkey;
        emit SetStateSuccess(monkey.state);
    }


    // ------------------------------游戏中用到的工具类方法------------------------------
    //生成monkeystate用到的二进制转十进制的方法
    //setMonkeyState中调用
    function calculate (uint256 num) private view returns(uint256) {
        uint256 res = 1;
        for(uint256 i = 0; i < num; i++){
            res = res * 2;
        }
        return res;
    }

    //随机生成猴子的gene属性，猴子的初始化属性（目前未用到该属性，后面会涉及根据基因来决定其他初始值。）
    //checkWalkOut中掉用
    function randomGene () private view returns (uint256) {
        return uint256(sha256(now, msg.sender));
    }

    //随机生成Picture的backgroundid属性，即外出的场景。（猴子外出的照片由3部分构成，猴子自己，外出遇到的小伙伴，外出的场景）
    //该部分随机出一个0～background的值，代表了不同的外出场景。
    //checkWalkOut中掉用
    function randomBackground () private view returns(uint256) {
        return uint256(sha256(now, msg.sender)) % background + 1;       //后端设置background从1开始
    }

    //随机生成Picture的animalsid属性，即外出碰到的小伙伴
    //该部分随机出一个0～animals的值，代表了外出遇到的不同小伙伴。
    //checkWalkOut中掉用
    function randomAnimals () private view returns (uint256) {
        return uint256(sha256(now, msg.sender)) % animals;
    }

    
    // ------------------------------游戏中用到的功能类方法------------------------------
    // 购买商品
    // 从商店购买商品，游戏中需要用banana购买商品，当购买商品时，如果此时树上的香蕉数量为0，则会触发addTree事件。购买商品可以改变猴子的mood值。
    //（需要一个参数，参数为商品的key值）
    // 需要玩家拥有猴子
    function buyProduct (uint256 _key) public payable onlyMonkey {
        uint256 _monkeykey = owner2monkey[msg.sender];
        Monkey memory monkey = monkeys[_monkeykey];
        Productstr memory product = allproducts[_key];
            
        //判断猴子是否有足够的香蕉购买商品
        require(monkey.banana >= product.price);
        monkey.banana = monkey.banana - product.price;       //修改猴子拥有的香蕉值
        monkey.mood = monkey.mood + product.effect;          //修改猴子的心情值
        if (monkey.mood > 100) {
            monkey.mood = 100;
        }
        uint256[] products = owner2product[msg.sender];       //将商品的key添加至猴子所拥有的商品列表中
        products.push(_key);
        owner2product[msg.sender] = products;
        monkeys[_monkeykey] = monkey;
        setMonkeyState();                                         //修改猴子的monkeystate属性值
        //如果此时树上的香蕉数量为0 ，则会触发 生长香蕉的事件
        if(bananacount == 0){
            addTree();
        }
        emit BuyProductSuccess(_key);
    }

    // 猴子回家
    // 玩家通过花费10个香蕉来强制让猴子回家。
    // 需要玩家拥有猴子
    function backHome () public onlyMonkey {
        uint256 _monkeykey = owner2monkey[msg.sender];
        Monkey memory monkey = monkeys[_monkeykey];
        require (monkey.banana >= 10);
        monkey.banana = monkey.banana - 10;                 //更新banana属性
        monkey.state = true;                                //更新state属性，变为true--在家中
        monkeys[_monkeykey] = monkey;
        emit BackHomeSuccess(monkey.state);
    }
    
    // 猴子外出
    // 取一个0～100的随机数，当猴子的心情值大于随机数时，则触发外出事件
    // 随机判定是否外出，外出则随机生成照片，同时改变相关数据（外出后，猴子的mood值会发生改变，猴子照片墙上会增加形影外出的照片）。外出的照片有三部分组成，外出的背景，遇到的小伙伴，猴子的monkeystate属性
    // 比如：1-1-2，为在场景1，遇到了小伙伴1，猴子状态为2，然后用1-1-2可以在后端服务器取出相应的照片。
    // 需要玩家拥有猴子
    function checkWalkout () public onlyMonkey {
        uint256 _monkeykey = owner2monkey[msg.sender];
        Monkey memory monkey = monkeys[_monkeykey];
        uint256 probability = uint256(sha256(now, msg.sender)) % 100;
        uint256 randombackground = 0;
        uint256 randomanimals = 0;
        uint256 mood = 0;
        uint256 kind = 0;                     //事件类型，0--未触发事件，1--外出，2--小伙伴来家中
        if (monkey.mood > uint256(probability)){             //外出
            kind = 1;
            randombackground = randomBackground();          //随机外出场景
            randomanimals = randomAnimals();                //随机外出小伙伴
            addPicture(randombackground, randomanimals, monkey.monkeystate);          //增加照片
            setState(false);                                //更新state属性，变为外出
            if(100 - monkey.mood > probability) {       //有概率心情值降低
                mood = monkey.mood - probability;      //心情变化值
                if (mood > 10) {
                    mood = 10;
                }
                subMood(mood);
            }
            else {
                mood = monkey.mood - probability;               //心情变化值
                if (mood > 10) {                                //心情最高变化值为10
                    mood = 10;
                }
                setMood(mood); 
            }
            emit WalkoutSuccess(randombackground, randomanimals, monkey.monkeystate, kind);
        } else if (monkey.mood < 30 && (100 - monkey.mood) > probability){
            kind = 2;
            //心情低于30的时候，一定概率会触发小伙伴来家中看望
            //即活动场景的背景定为在家中
            randombackground = 0;
            randomanimals = randomAnimals();
            addPicture(randombackground, randomanimals, monkey.monkeystate);
            setState(false);                                //更新state属性，变为外出
            mood = 100 - monkey.mood - uint256(probability);
            if (mood > 15) {                    //mood变化值最大为15
                mood = 15;
            }
            setMood(mood);
            emit WalkoutSuccess(randombackground, randomanimals, monkey.monkeystate, kind);
        } else {                                //未触发任何事件
            emit WalkoutSuccess(randombackground, randomanimals, monkey.monkeystate, kind);
        }
    }
}
