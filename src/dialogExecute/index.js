class DialogExecute{
  Vue
  _currentVueCom = null
  _singleVue
  _strategyMap
  _store
  _router
  init(vue, store, router, filters) {
    if (!vue) {
      console.error('需要注入vue对象')
      return
    }
    this.Vue = vue
    store ? this._store = store : ''
    router ? this._router = router : ''
    if (filters && typeof filters === 'object') {
      Object.keys(filters).forEach(key => {
        this.Vue.filter(key, filters[key])
      })
    }

    this._singleVue = {}
    this._strategyMap = {}
  }

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

  strategyInstall(a, b) {
    if (typeof a === 'object') {
      Object.keys(a).forEach(item => {
        this._strategyMap[item] = a[item]
      })
    }
    if (typeof a === 'string' && b) {
      this._strategyMap[a] = b
    }
  }

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

