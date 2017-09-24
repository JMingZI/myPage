// import "babel-polyfill"
class Index {
    init () {
        this.getBg()
        this.bind()
    }

    getBg () {
        const key = 'bg'
        let local = localStorage.getItem(key)
        const _getAsync = () => {
            let script = document.createElement('script')
            script.src = 'https://bing.ioliu.cn/v1?callback=cb'
            document.body.appendChild(script)

            window.cb = (res) => {
                if (res.status.code === 200) {
                    localStorage.setItem(key, JSON.stringify({ time: new Date().getTime(), url: res.data.url }))
                    this.setBg(res.data.url)
                } else {
                    console.error('接口服务异常' + res)
                }
            }
        }

        if (!local) {
            _getAsync()
        } else {
            // check time is current day
            local = JSON.parse(local)
            if (new Date(local.time).getDate() !== new Date().getDate()) {
                _getAsync()
            } else {
                this.setBg(local.url)
            }
        }
    }

    setBg (url) {
        document.body.style.backgroundImage = `url("${url}")`
    }

    el (selector) {
        let name = selector.replace(/\./, '')
        let cache = this[name]

        if (!cache) {
            this[name] = document.querySelector(selector)
            cache = this[name]
        }
        return cache
    }

    bind () {
        const el = this.el.bind(this)

        // word-wrap
        el('.s-people').addEventListener('click', () => {
            el('.mask').classList.remove('display-n', 'opacity-0')

            Promise.resolve()
                .then(() => {
                    el('.mask').classList.add('fadeIn')
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve()
                        }, 950)
                    })
                })
                .then(() => {
                    el('.text-wrap').classList.remove('display-n')
                    el('.text-wrap').classList.add('changeWidth')

                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve()
                        }, 950)
                    })
                })
                .then(() => {
                    el('.text').classList.remove('display-n')
                    el('.text').classList.add('fadeIn')
                })
        })

        el('.close').addEventListener('click', () => {
            Promise.resolve()
                .then(() => {
                    el('.text').classList.remove('fadeIn')
                    el('.text').classList.add('fadeOut')

                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve()
                        }, 950)
                    })
                })
                .then(() => {
                    el('.text').classList.add('display-n')
                    el('.text').classList.remove('fadeOut')

                    el('.text-wrap').classList.remove('changeWidth')
                    el('.text-wrap').classList.add('changeWidthInverse')
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve()
                        }, 950)
                    })
                })
                .then(() => {
                    el('.text-wrap').classList.add('display-n')
                    el('.text-wrap').classList.remove('changeWidthInverse')
                    el('.mask').classList.remove('fadeIn')
                    el('.mask').classList.add('fadeOut')
                    setTimeout(()=> {
                        el('.mask').classList.add('display-n', 'opacity-0')
                        el('.mask').classList.remove('fadeOut')
                    }, 950)
                })
        })
    }
}

const index = new Index()
index.init()