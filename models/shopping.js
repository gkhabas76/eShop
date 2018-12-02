module.exports = function Shopping(shoppingItems) {
    this.items = shoppingItems.items || {};
    this.totalQty = shoppingItems.totalQty || 0;
    this.totalPrice = shoppingItems.totalPrice || 0;

    this.add = function(item, id) {
        var haveItem = this.items[id];
        if (!haveItem) {
            haveItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        haveItem.qty++;
        haveItem.price = haveItem.item.price * haveItem.qty;
        this.totalQty++;
        this.totalPrice += haveItem.item.price;
    };

    this.shoppingArr = function() {
        var shoppingList = [];
        for (var id in this.items) {
            shoppingList.push(this.items[id]);
        }
        return shoppingList;
    };
};
