"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Adress {
    constructor(id_user, street, complement = null, neighbourhood, number, city, state) {
        this.id_user = id_user;
        this.street = street;
        this.complement = complement;
        this.neighbourhood = neighbourhood;
        this.number = number;
        this.city = city;
        this.state = state;
    }
    getStreet() {
        return this.street;
    }
    getComplement() {
        return this.complement;
    }
    getNeighBourhood() {
        return this.neighbourhood;
    }
    getNumber() {
        return this.number;
    }
    getCity() {
        return this.city;
    }
    getState() {
        return this.state;
    }
}
exports.default = Adress;
//# sourceMappingURL=Adress.js.map