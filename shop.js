class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id
        this.name = name
        this.description = description
        this.sizes = sizes
        this.price = price
        this.available = available
    }


    setAvailable(value) {
        this.available = !!value
    }
}

let item1 = new Good(1, 'kicks', 'pumped up kicks', ['s', 'm', 'l', 'xl'], 500, true)
let item2 = new Good(2, 'blue jeans', 'great with white shirt', ['s', 'm', 'l'], 600, true)
let item3 = new Good(3, 'white shirt', 'great with blue jeans', ['m', 'l', 'xl'], 800,false)
let item4 = new Good(4, 'blue suede shoes', 'don\'t step on it', ['king-size'], 1000, true)
let item5 = new Good(5, 'red suede shoes', 'nice boots', ['l','xxl'], 50, true)

class GoodList {
    #goods

    constructor(good, filter, sortPrice, sortDir) {
        this.#goods = good
        this.filter = new RegExp(filter)
        this.sortPrice = sortPrice
        this.sortDir = sortDir
    }

    addGood(item) {
        this.#goods.push(item)
            
        }

    get list() {
        
        let sortGoods = this.#goods.filter(item => item.available && this.filter.test(item.name))

        if (this.sortPrice) {
            sortGoods.sort((a, b) => a.price > b.price ? 1 : -1);
            if (this.sortDir) {
               return sortGoods
            } else {
                return sortGoods.reverse()
            }
        } else  {
            return sortGoods
        }

    }

    remove(index) {
        let goodToRemove = this.#goods.findIndex(item => item.id === index)
        if (goodToRemove != -1) {
            this.#goods.splice(goodToRemove, 1)
        } 

    }
}

const goodsList = [item1, item2, item3, item4]

let itemList = new GoodList(goodsList, /shoes/, true, true)
let itemList1 = new GoodList(goodsList, /./, false, true)
let itemList2 = new GoodList(goodsList, /./, true)
let itemList3 = new GoodList(goodsList, /./, )

// console.log(itemList.list)
// itemList.addGood(item5)

// console.log(itemList.list)
// itemList.remove(4)

// console.log(itemList.list)

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available)
        this.amount = amount

    }
}

class Basket {
    constructor() {
        this.goods = []
    }


    addGood(item, amount) {
        let indexGood = this.goods.findIndex(good => good.id == item.id)

        if (indexGood < 0) {
            this.goods.push(new BasketGood(item, amount))
        } else {
            this.goods[indexGood].amount += amount
        }

    }

        
        
    remove (item, amount) {
        let indexGood = this.goods.findIndex(good => good.id == item.id)
        if (indexGood >= 0) {
            this.goods[indexGood].amount -= amount
            console.log('Quantity reduced')
            if (this.goods[indexGood].amount <= 0) {
                this.goods.splice(indexGood, 1)
                console.log('This good is deleted')
            }
        } else {
            console.log('No such good in the basket')
        }
    }
        
    removeUnavailable() {
        this.goods = this.goods.filter(item => item.available)
    }
        
    clear() {
        this.goods = []
    }
        
    get totalAmount() {
        let sum = 0
        return this.goods.reduce((acc, good) => acc + good.amount, sum)
    }
        
    get totalSum() {
        let sum = 0
        return this.goods.reduce((acc, good) => acc + (good.price * good.amount), sum)
    }
}


const basket = new Basket()

basket.addGood(item1, 3)
basket.addGood(item2, 2)
basket.addGood(item4, 1)
basket.addGood(item3, 1)
console.log(basket.totalAmount)
console.log(basket.totalSum)

basket.removeUnavailable()

console.log(basket.totalAmount)
console.log(basket.totalSum)

basket.remove(item1, 1)
basket.remove(item2, 4)

console.log(basket.totalAmount)
console.log(basket.totalSum)

basket.clear()
console.log(basket.totalAmount)
console.log(basket.totalSum)