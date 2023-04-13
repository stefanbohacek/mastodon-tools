class LocalStorage {
    addItem(key, value, ttl){
        const now = new Date()
        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        }
        console.log(`localStorage.setItem(${key}, JSON.stringify(${item}))`)
        localStorage.setItem(key, JSON.stringify(item))
    }

    getItem(key){
        const itemStr = localStorage.getItem(key)
        if (!itemStr) {
            return null
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key)
            return null
        }
        return item.value
    }

    removeItem(key){
        localStorage.removeItem(key)
    }

};

const ls = new LocalStorage();

export default ls;
