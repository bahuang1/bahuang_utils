class DialogExecute{
  Vue
  _currentVueCom = null
  _singleVue
  _strategyMap
  _store
  _router
  // 初始化方法，传入 vue， store，router等
  init(option) {
    if (!option.vue) {
      console.error('需要注入vue对象')
      return
    }
    this.Vue = option.vue
    option.store ? this._store = option.store : ''
    option.router ? this._router = option.router : ''
    const filters = option.filters
    if (filters && typeof filters === 'object') {
      Object.keys(filters).forEach(key => {
        this.Vue.filter(key, filters[key])
      })
    }

    this._singleVue = {}
    this._strategyMap = {}
  }
  // 创建vue实例用于初始化 弹框组件 并将该实例返回
  _createVueComponent(vueOption) {
    const tempVueOption = {
      render: h => h(vueOption)
    }
    if (this._store) {
      tempVueOption['store'] = this._store
    }
    if (this._router) {
      tempVueOption['router'] = this._router
    }
    const tempVueCom = new this.Vue(tempVueOption).$mount()
    document.body.append(tempVueCom.$el)
    return tempVueCom.$children[0]
  }

  _hasCommand(command) {
    if (this._strategyMap[command]) {
      console.warn('指令已注册, 将覆盖原有指令')
    }
  }
  // 弹框组件注册
  strategyInstall(a, b) {
    if (typeof a === 'object') {
      Object.keys(a).forEach(item => {
        this._hasCommand(item)
        this._strategyMap[item] = a[item]
      })
    }
    if (typeof a === 'string' && b) {
      this._hasCommand(a)
      this._strategyMap[a] = b
    }
  }
  // 弹框组件执行
  async execute(command, params) {
    if (!this._singleVue[command]) {
      let tempOption = null
      if (typeof this._strategyMap[command] === 'function') {
        tempOption = (await this._strategyMap[command]()).default
      } else {
        tempOption = this._strategyMap[command]
      }
      this._singleVue[command] = this._createVueComponent(tempOption)
    }
    this._currentVueCom = this._singleVue[command]
    if (this._currentVueCom.show && typeof this._currentVueCom.show === 'function') {
      this._currentVueCom.show(params)
    } else {
      console.error('请提供一个show方法以便组件初始化')
    }
  }
}

const diaExecute = new DialogExecute()

function executeInit(vue, ...rest) {
  diaExecute.init(vue, ...rest)
}
function strategyInstall(a, b) {
  diaExecute.strategyInstall(a, b)
}
function execute(command, params) {
  diaExecute.execute(command, params)
}

export default {
  DialogExecute,
  diaExecute,
  executeInit,
  strategyInstall,
  execute
}

export {
  diaExecute,
  executeInit,
  strategyInstall,
  execute
}

