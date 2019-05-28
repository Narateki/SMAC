'use strict';

const Query = require('../models/query');

class Cabinet {
    static async add(name) {
        try {
            let code = Cabinet.generateCode();
            let result = await Query.doQuery('INSERT INTO cabinet(\n' +
                '\tname, code)\n' +
                '\tVALUES ($1, $2);', [name, code]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
    static async update(id, newName) {
        try {
            let result = await Query.doQuery('UPDATE cabinet SET name = $2 WHERE id = $1;', [id, newName]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
    static async getAll() {
        try {
            let result = await Query.doQuery('SELECT * FROM cabinet ORDER BY id', []);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
    static async addJudge(idCab, idJudge) {
        try {
            let result = await Query.doQuery('', [idCab, idJudge]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }

    static async addCommands(array) {
        try {
            array.forEach(function (item) {
                let ans = Cabinet.addCommand(item.nameCab, item.nameCommand);
                if (ans.error != null) throw ans;
            });
        }
        catch (e) {
            return {error: e.detail};
        }
    }

    static async addCommand(nameCab, nameCommand) {
        try {
            let result = await Query.doQuery('', [nameCab, nameCommand]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }

    static generateCode() {
        let min = 10000;
        let max = 99999;
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    static async isRightCode(id_cabinet, code) {
        try {
            let result = await Query.doQuery('SELECT name\n' +
                '\tFROM public.cabinet\n' +
                '\tWHERE id = $1 AND code = $2', [id_cabinet, code]);
            if (result.detail !== undefined) throw result;
            if (result.length !== 0) return result;
            return {name: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
}

module.exports = Cabinet;