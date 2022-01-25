个人在项目中常用的一些方法，在此做一个分享
### dialogExecute 函数式调用 vue 弹框组件
```angular2html
option = { vue: Vue, store: store, router: router }
1. 初始化: 在 main.js 中引入 executeInit(option)

2. 注册指令: 在 execute('command')调用 之前 先 strategyInstall('command')

3. execute：指令执行，全局注册一次即可使用 execute('command')
```
### cookie相关
```
    /**
    依赖于 js-cookie
    方法：
    */
    // 获取 cookie
    getCookie(name)
    // 设置 cookie
    setCookie(name, value)
    // 删除 cookie
    removeCookie(name)
```

### 日期操作相关
```
    /*
    *日期转字符串
    * now 为时间
    * flag 为格式
    *   1: YYYY-MM-DD
    *   2: HH:mm
    *   3: YYYY-MM-DD HH:mm
    *   4: YYYY-MM-DD HH:mm:ss
    **/
    dateToStr(now, flag)
    
    // 获取当前时间 时分秒
    getCurTime()
    
    // 获取当前日期 年月
    getCurDate()
    
    // 获取当前周 周几
    getCurWeek()
    
    // 获取当前时间 年月日 时分秒 周几
    getCurDateTimeWeek()
    
    // 用选中的时间获取周一和周日的函数(含时分秒)=>返回一个包含起止时间的数组
    getWeekList(val)
    
    // 用选中的时间获取月初和月末的函数(含时分秒)=>返回一个包含起止时间的数组
    getMonthList(val)
    
    // 用选中的时间获取季度第一天和季度最后一天的函数(含时分秒)=>返回一个包含起止时间的数组
    getSeasonList(val)
    
    // 用选中的时间，来求的是这一年的第几周
    getWeekNum(val)
```
### 存储相关
```
    // 本地缓存存储
    localStorageSet(name, obj)
    
    // 本地缓存获取
    localStorageGet(name)
    
    // 本地缓存删除
    localStorageRemove(name)
    
    // 会话缓存 存储
    sessionStorageSet(name, obj)
    
    // 会话缓存 获取
    sessionStorageGet(name)
```

### 安全回显
```
    // 依赖于 xss
    getSafeText(input)
```

### 类型判断
```
    // string, number, symbol, boolean 判断是否是 primitive 基本数据类型
    isPrimitive(value)
    
    // undefined and null
    isUndef(v)
    
    // not undefined not null
    isDef(v)

    // true
    isTrue(v)
    
    // false
    isFalse(v)
    
    // 是否是对象类型 包含数组
    isObject(obj)
    
    hasOwn(obj, key)
    
    // 是否是 明确的javascript 对象
    isPlainObject(obj)
    
    // 是否是 正则
    isRegExp(v)
```

### 类型转换
```
    // 转化为数组
    toArray(list, start)
    
    // 对象的扩展
    extend(to, _from)
    
    // 转换为 对象
    toObject(arr)
    
    // 转化为数字
    toNumber(val)
    
    // 转化微字符串
    toString(val)
```

### 模块整合
```
    // obj 参数是 通过 import 的模块对象 import * as obj from 'target/module'
    mergeModule(obj)
```
