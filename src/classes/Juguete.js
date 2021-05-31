

export default class Juguete{
    constructor(id,name,stock,price){
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.price = price;
    }

    update(juguete){
        this.name = juguete.name;
        this.price = juguete.price;
        this.stock = juguete.stock;
    }
}