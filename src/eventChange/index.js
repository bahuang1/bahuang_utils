class Index {
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
        let fn;
        for (let i = 0; fn = fns[i]; i++) {
            fn.apply(this, arguments)
        }
    }
}

export default new Index()