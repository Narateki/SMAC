'use strict';

const Query = require('../models/query');

class Organization {


    static async update(dates, times, place) {
        try {
            let result = await Query.doQuery('UPDATE public.organization\n' +
                '\tSET dates=$1, times=$2, place=$3\n' +
                '\tWHERE id = 1;', [dates, times, place]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        }
        catch (e) {
            return {error: e.detail};
        }
    }

    static async getAll() {
        try {
            let result = await Query.doQuery('SELECT * FROM organization ORDER BY id', []);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
            return {error: e.detail};
        }
    }
}

module.exports = Organization;