# Travel_Monkey_WebApp开发文档

## Travel_Monkey介绍
* 游戏简介

    **TravelMonkey**(旅行猴),是一款基于```Nervos```的```Cita链```开发的一款纯手绘区块链佛性游戏，travel monkey也是游戏的主人公，一只喜欢旅行的猴子，调皮的小猴子就像家长们的孩子一样，喜欢偷偷背着主人做事，喜欢发脾气甚至离家出走，为了让自己的孩子开心，玩家可以买各种东西讨好自己的宠物。小猴子怕主人担心，在旅途中也会给主人寄回来明信片，小猴子在旅途中会认识各种各样的好朋友，也有可能会带回家里面做客，下面我们看下具体玩法。


* Nervos Cita简介

    **Nervos Cita** CITA（ Cryptape Inter-enterprise Trust Automation ）是一个面向企业级应用的支持智能合约的区块链框架， 旨在为企业级区块链应用提供一个稳固、高效、灵活、可适应未来的运行平台。CITA 将区块链节点的必要功能解耦为六个微服务：RPC，Auth，Consensus，Chain，Executor，Network。各组件之间通过消息总线交换信息相互协作。通过配置和定制相应的服务，CITA 能够满足企业级用户的全部需要。

> 注意: 该文档针对对区块链有一定了解的开发者，且对智能合约有一定了解

* Cyton 简介

    **Cyton** Cyton是一个开源区块链钱包，支持以太坊和CITA。它支持以太网和CITA的大多数令牌，如ETH，ERC20，ERC721，还支持以太网和CITA的大多数DApp，如cryptokitties，Fomo3D等

* 游戏体验地址: http://139.159.241.50:3000 (ps. PC上无法运行，该版本专门为移动端设计,后面有具体的打开方法)

## 运行环境

* MacOs 10.14
* Node  10.10.0
* Npm   6.4.1
* Vim   8.0
* Android 8.0

## 安装

* [node安装](https://nodejs.org/en/download/)
* [npm安装](https://www.npmjs.com/)
* [Cyton安装](https://github.com/cryptape/cyton-android/releases/download/0.7.1/cyton_v0.7.1.190121_cryptape.apk)

> ps. 钱包[项目地址](https://github.com/cryptape/cyton-android/releases) 目前只支持安装

## Nervos Cita上部署合约

   * 在运行该项目前 我们先了解下怎么在Nervos的Cita中部署合约, 该demo中所有内容都配置好了，
   如果只是想运行的用户可以直接跳到运行。
  
   
   * 首先把自己写好的```sol```文件，在[Remix](https://remix.ethereum.org/)上调试好，拿到自己的
     ```abi```和```bytecode```
   * 首先进入```contracts```目录, 我们看到有五个文件
   
   ```bash
    $ cd Travel_Monkey_WebApp_WebApp/src/contracts
        ├── compiled.js
        ├── deploy.js
        ├── CoreContract.sol
        ├── transaction.js
        └── chain.js
   ```
   * 我们将之前得到的abi和byte_code填入compiled.js文件中,然后exports出来:
   
   
```js
module.exports = {
        abi,
        bytecode
    }
```

   * 最后执行```deploy.js```文件完成部署:
   
```bash
$ node deploy.js
```
   
## Nervos Cita上自定义配置

   * 之后我们在```Travel_Monkey_WebApp/src/config.js```文件中修改自己的配置信息以及
   使用哪条公链的信息,这里使用的是```http://121.196.200.225:1337```
   
   ```js
    const config = {
        chain: 'https://node.cryptape.com',
        contractAddress: '0x9Cf7a2062AE3b87036cF04FE9555d4e4ddCed5ca',
        apiAddress:'http://139.159.241.50:8888',
        privateKey: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        pc_media: "(min-width:31em)",
    }
        
   ```
   
   * 所有需要自己配置的大部分就是这些，demo中都已经配置了一套，
   有兴趣可以自己试着配一套



## 运行

* 对钱包熟悉的朋友可以用cyton钱包访问 http://139.159.241.50:3000

* 项目克隆到本地

```bash
$ git clone https://github.com/MrPaoBrother/Travel_Monkey_WebApp.git

$ cd Travel_Monkey_WebApp
```

* 安装相关依赖

```bash
$ npm i

```

> 安装完成之后，项目根目录下会看到多出了```node_modules```文件.

* 项目运行

```bash
$ npm run start
Starting the development server...
```

> 可能会看到一堆的warning， 没关系， 只要没有Error就行, 有一些是对依赖库版本的警告

* 打开Cyton钱包,进入如下界面:

<img width="30%" height="30%" src="readme_images/cyton.png" />


* 最后打开钱包中的浏览器运行 ```http://localhost:3000/``` 或者 图片中提到的体验地址: ```http://139.159.241.50:3000```

ps.保证手机和电脑在同一个局域网中

## 项目说明

### 前端部分

* 前端基于React，Redux框架，通过媒体查询自适应手机端

### 文件结构

* ./node_modules 文件夹下是运行所需要的第三方库

* ./public 文件夹下是前端引用的静态文件
 
* ./readme_images 是程序的部分截图

* ./src 文件夹下是核心代码

* ./src/components 下是网页中用到的组件

* ./src/containers 下是网站的各个页面，目前我们是单页的，所以只有一个Home文件夹

* ./src/contracts 下是合约相关的文件

* ./src/images 下是网站本地的图片

* ./src/store 下是redux相关的文件，下一个版本将引入redux和redux saga，这个版本暂时没用到 

* ./src/config.js 合约的配置文件，包括用的链的地址，用户私钥，用户地址，合约地址，后台服务器的地址





### 合约相关的函数

* ./src/contracts/chain.js 中引用了大部分的合约函数，多数函数名和合约上的函数名一致

* getMonkeycount() 是从合约上获取当前猴子数量的函数

* checkFirst() 是从合约上获取当前用户是否拥有猴子的函数

* getBananacount() 是用户从合约上获取香蕉树上可供收割香蕉数量（游戏中的积分）的函数

* getMonkey() 是用户从合约上获取自己的猴子的详细信息的函数

* getowner2picture() 是用户从合约上获取自己猴子的照片墙上照片的ID的数组的函数

* getPicture() 是用户从合约上获取ID对应的照片的详细信息的函数

* getowner2product() 是用户从合约上获取自己猴子的背包里物品的ID的数组的函数

* getProductlength() 是从合约上获取当前商城所有商品数量的函数

* getProduct() 是用户从合约上获取ID对应的物品的详细信息的函数

* freeMonkey() 是用户在没有猴子时从合约上获取一只新猴子的函数

* addBanana() 是用户从合约上充值香蕉的函数

* getBananaFromTree() 是在合约中从香蕉树上收获香蕉的函数

* buyProduct() 是用户从合约上购买商品的函数

* checkWalkout() 是从合约上允许猴子出去旅行的函数

* backHome() 是用户让猴子回家的函数



### 后台服务器相关的函数(暂不开源)

* story_happen() 是从服务器发送跟踪猴子旅行故事请求的函数

* get_monkey_status() 是从服务器中发送返回猴子旅行状态的函数

* go_home() 新版本为了更好的和用户进行交互，新增强制让猴子回家功能

## 相关优化

### 功能方面
   * 新增呼唤猴子回家功能
   * 修改猴子出去要和主人打招呼功能
   * 新增新场景和朋友
### 技术优化
   * 图片渲染速度提升50%
   * 链数据不稳定，新增降级方案
   * 部分图片重新设计优化
   * 重构旅行途中地图功能代码


## 效果展示

* 登录时会显示当前已经存在的猴子数量

<img width="30%" height="30%" src="readme_images/login.png" />

* 领取猴子

<img width="30%" height="30%" src="readme_images/init_monkey.png" />


* 游戏商城，点击物品直接购买

<img width="30%" height="30%" src="readme_images/shop.png" />


* 玩家的背包

<img width="30%" height="30%" src="readme_images/bag.png" />


* 购买前的猴子

<img width="30%" height="30%" src="readme_images/init_monkey.png" />


* 购买后猴子穿上了衣服

<img width="30%" height="30%" src="readme_images/monkey_with_cat.png" />


* 香蕉树上有香蕉时，可以点击香蕉收割

<img width="30%" height="30%" src="readme_images/banana_catch.png" />

* 可以通过充值获取更多香蕉

<img width="30%" height="30%" src="readme_images/buy_banana.png" />

* 小猴子想旅行了，支付一点旅费

<img width="30%" height="30%" src="readme_images/monkey_want_out.png" />

* 小猴子出去了,房间空无一人

<img width="30%" height="30%" src="readme_images/monkey_out.png" />

* 小猴子想回家了/呼唤猴子回家

<img width="30%" height="30%" src="readme_images/monkey_want_back.png" />

* 小猴子旅行时寄回来的照片

<img width="30%" height="30%" src="readme_images/album.png" />

* 小猴子在用电脑看什么

<img width="30%" height="30%" src="readme_images/monkey_computer.png" />

## 参考资料

[1] [Nervos Cita 文档](https://github.com/cryptape/cita)

[2] [Nervos Cyton 钱包](https://github.com/cryptape/cyton-android)




