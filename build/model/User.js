"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, email, cpf, password, hasAdress = false) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.password = password;
        this.hasAdress = hasAdress;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getCpf() {
        return this.cpf;
    }
    getPassword() {
        return this.password;
    }
    getHashAdress() {
        return this.hasAdress;
    }
}
exports.default = User;
