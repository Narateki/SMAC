'use strict';

const Query = require('../models/query');

class Judge {
    static async add(name) {
        try {
            let result = await Query.doQuery('INSERT INTO public.judge(\n' +
                '\tname)\n' +
                '\tVALUES ($1);',
                [name]);
            if (result.detail !== undefined) throw result;
            return result;
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async update(id, newName) {
        try {
            let result = await Query.doQuery('UPDATE judge SET name = $2 WHERE id = $1;', [id, newName]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }

    static async getAll() {
        try {
            let result = await Query.doQuery('SELECT * FROM judge ORDER BY id', []);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
            return {error: e.detail};
        }
    }
}

module.exports = Judge;