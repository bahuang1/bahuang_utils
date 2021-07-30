class EventChange {
    list = {}

    on(key, fn) {
        if (!this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn)
    }

    emit() {
        let key = Array.prototype.shift.call(arguments)
        let fns = this.list[key]
        if (!fns || fns.length === 0) {
            return
        }
        let fn
        for (let i = 0; i < fns.length; i++) {
            fn = fns[i]
            fn.apply(this, arguments)
        }
    }

    remove(key, fn) {
        let fns = this.list[key]
        if (!fns) {
            return
        }
        if (!fn) {
            // 默认删除所有方法
            fns.length = 0
        } else {
            // 删除指定事件指定方法
            for (let len = fns.length - 1; len >= 0; len--) {
                let _fn = fns[len]
                if (_fn === fn) {
                    fns.splice(len, 1)
                }
            }
        }
    }
}

export default new EventChange()