'use strict';

const Query = require('../models/query');

class League {
    static async add(name) {
        try {
            let result = await Query.doQuery('INSERT INTO league(name) VALUES ($1)', [name]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
    static async update(id, newName) {
        try {
            let result = await Query.doQuery('UPDATE league SET name = $2 WHERE id = $1;', [id, newName]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
    static async getAll() {
        try {
            let result = await Query.doQuery('SELECT * FROM league', []);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
}

module.exports = League;