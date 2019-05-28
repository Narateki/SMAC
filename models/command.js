'use strict';

const Query = require('../models/query');

class Command {
    static async add(name, school, id_league, city, head, phone) {
        try {
            let code = Command.generateCode();
            let result = await Query.doQuery('INSERT INTO public.command(\n' +
                '\tname, school, points, id_league, city, id_cab, start_bound, valid_bound, code, head, phone)\n' +
                '\tVALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;',
                [name, school, "{0}", id_league, city, 1, 0, 0, code, head, phone]);
            if (result.detail !== undefined) throw result;
            return result;
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async addPartisip(id_command, name, grade) {
        try {
            let code = Command.generateCode();
            let result = await Query.doQuery('INSERT INTO public.particip(\n' +
                '\tid_com, name, grade)\n' +
                '\tVALUES ($1, $2, $3);', [id_command, name, grade]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async update() {
        try {
            let result = await Query.doQuery('', );
            if (result.detail !== undefined) throw result;
            return {error: null};
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async getAll() {
        try {
            let result = await Query.doQuery('SELECT * FROM command ORDER BY id', []);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
            return {error: e.detail};
        }
    }
    static async getAllParticips(id_com) {
        try {
            let result = await Query.doQuery('SELECT * FROM particip WHERE id_com = $1 ORDER BY id', [id_com]);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
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

    static async getCode(id) {
        try {
            let result = await Query.doQuery('SELECT code FROM command WHERE id = $1', [id]);
            if (result.detail !== undefined) throw result;
            return result;
        } catch (e) {
            return {error: e.detail};
        }
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

module.exports = Command;