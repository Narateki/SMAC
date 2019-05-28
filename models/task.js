'use strict';

const Query = require('../models/query');

class Task {
    static async add(id_league, type, condition, answer, num) {
        try {
            let result = await Query.doQuery('INSERT INTO task\n' +
                '(id_league, type, condition, answer, num) \n' +
                'VALUES ($1, $2, $3, $4, $5);', [id_league, type, condition, answer, num]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
    static async update(id, id_league, type, condition, answer, num) {
        try {
            let result = await Query.doQuery('UPDATE task\n' +
                '\tSET id_league=$2, type=$3, condition=$4, answer=$5, num=$6\n' +
                '\tWHERE id = $1;', [id, id_league, type, condition, answer, num]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
    static async getAll() {
        try {
            let result = await Query.doQuery('SELECT * FROM task ORDER BY id', []);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        }
        catch (e) {
            return {error: e.detail};
        }
    }

    static async clear() {
        try {
            let result = await Query.doQuery('TRUNCATE TABLE task RESTART IDENTITY', []);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        }
        catch (e) {
            return {error: e.detail};
        }
    }
}

module.exports = Task;