class EventChange {
    list = {}
    cachedEvent = {}

    on(key, fn) {
        if (typeof fn !== 'function') return;
        if (!this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn)
        if (this.cachedEvent[key] instanceof Array) {
            fn.apply(null, this.cachedEvent[key])
        }
    }

    emit() {
        const key = Array.prototype.shift.call(arguments)
        // if (this.list[key] instanceof Array) {}
        let fns = this.list[key]
        if (!fns || fns.length === 0) {
            this.cachedEvent[key] = arguments
            return
        }
        let fn
        for (let i = 0; i < fns.length; i++) {
            fn = fns[i]
            fn.apply(this, arguments)
        }
    }

    remove(key, fn) {
        const fns = this.list[key]
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

export const eventChange = new EventChange()