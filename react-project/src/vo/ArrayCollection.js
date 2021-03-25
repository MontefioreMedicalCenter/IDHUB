// add one more method to it (can do more)
export default class ArrayCollection extends Array {
    isEmpty() {
        return this.length === 0;
    }

    addItem(item) {
        this.push(item);
    }
    addItemAt(item, index) {
        return this.push(item);
    }
    contains(item) {
        this.push(item);
    }
    getItemAt(index, prefetch = 0)/*:Object*/ {
        return this[index];
    }

    getItemIndex(item/*:Object*/) {
        return this.indexOf(item);
    }

    removeAll() {
        this.length = 0;
    }
    removeItemAt(index)/*:Object*/ {
        const item = this[index];
        if (index !== -1) {
            this.splice(index, 1);
        }
        return item;
    }
    setItemAt(item/*:Object*/, index)/*:Object*/ {
        this[index] = item;
    }
    toArray() {
        return this.concat([]);
    }

}
