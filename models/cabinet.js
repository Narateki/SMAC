'use strict';

const Query = require('../models/query');

class Cabinet {
    static async add(name) {
        try {
            let result = await Query.doQuery('INSERT INTO cabinet VALUES ($1)', [name]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
    static async update(id, newName) {
        try {
            let result = await Query.doQuery('UPDATE cabinet SET num = $2 WHERE id = $1;', [id, newName]);
            if (result.detail !== undefined) throw result;
            return {error: null};
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
}

module.exports = Cabinet;