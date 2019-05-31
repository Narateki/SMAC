'use strict';

const Query = require('../models/query');

class Command {
    static async add(name, school, id_league, city, head, phone) {
        try {
            let code = Command.generateCode();
            let result = await Query.doQuery('INSERT INTO public.command(\n' +
                '\tname, school, id_league, city, start_bound, valid_bound, code, head, phone, points_start, points_valid)\n' +
                '\tVALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;',
                [name, school, id_league, city, 6, 0, code, head, phone, "{}", "{}"]);

            let resultParse = JSON.parse(result);
            let id_com = resultParse[0].id;
            await Command.setCommandToCab(id_com, 1);
            if (result.detail !== undefined) throw result;
            return result;
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async setCommandToCab(id_com, id_cab) {
        try {
            let result = await Query.doQuery('INSERT INTO where_command(\n' +
                '\tid_com, id_cab)\n' +
                '\tVALUES ($1, $2);', [id_com, id_cab]);
            if (result.detail !== undefined) throw result;
            return {error: null};
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async clearComCab() {
        try {
            let result = await Query.doQuery('TRUNCATE TABLE where_command', []);
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

    static async getCabinetForCommand(id_com) {
        try {
            let result = await Query.doQuery('SELECT cabinet.name\n' +
                'FROM cabinet\n' +
                'WHERE (cabinet.id = (\n' +
                '\tSELECT id_cab\n' +
                '\tFROM where_command\n' +
                '\tWHERE id_com = $1\n' +
                '))', [id_com]);
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

    static async getCommandsInCab(name_cab) {
        try {
            let result = await Query.doQuery('SELECT command.id, command.name\n' +
                'FROM command\n' +
                'WHERE (command.id IN (\n' +
                '\tSELECT where_command.id_com\n' +
                '\tFROM where_command\n' +
                '\tWHERE (where_command.id_cab = (SELECT cabinet.id\n' +
                '\t\t\t\t\t\t\t\t  FROM cabinet\n' +
                '\t\t\t\t\t\t\t\t  WHERE cabinet.name=$1))))' +
                'ORDER BY command.id', [name_cab]);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async getCommandsResultByNameCab(name_cab) {
        try {
            let result = await Query.doQuery('SELECT command.id, command.name, points_start, points_valid, start_bound, valid_bound, league.name AS league_name\n' +
                'FROM command, league\n' +
                'WHERE (command.id IN (\n' +
                '\tSELECT where_command.id_com\n' +
                '\tFROM where_command\n' +
                '\tWHERE (where_command.id_cab = (SELECT cabinet.id\n' +
                '\t\t\t\t\t\t\t\t  FROM cabinet\n' +
                '\t\t\t\t\t\t\t\t  WHERE cabinet.name=$1))) AND id_league = league.id)\n' +
                'ORDER BY command.id;', [name_cab]);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async getCommandsResultById(id_com) {
        try {
            let result = await Query.doQuery('SELECT command.id, command.name, points_start, points_valid, start_bound, valid_bound, league.name AS league_name\n' +
                'FROM command, league\n' +
                'WHERE ( command.id = $1 AND id_league = league.id) \n' +
                'ORDER BY command.id', [id_com]);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async addStartPoints(id_com, right) {
        try {
            let result = await Query.doQuery('SELECT id, points_start, start_bound, valid_bound ' +
                'FROM command ' +
                'WHERE id = $1 ' +
                'ORDER BY id; ', [id_com]);
            let arrayPoints = JSON.parse(result);
            let points = arrayPoints[0].points_start;
            if (right === 1) {
                if (arrayPoints[0].start_bound >= 1) {
                    await Command.replacePerson(id_com, arrayPoints[0].start_bound-1, arrayPoints[0].valid_bound+1);
                }
            }
            points.push(right);
            console.log(points);
            let update = await Command.updateStartPoints(id_com, points);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async addValidPoints(id_com, right) {
        try {
            let result = await Query.doQuery('SELECT id, points_valid, start_bound, valid_bound ' +
                'FROM command ' +
                'WHERE id = $1 ' +
                'ORDER BY id; ', [id_com]);
            let arrayPoints = JSON.parse(result);
            let points = arrayPoints[0].points_valid;
            if (right === 0) {
                if (arrayPoints[0].valid_bound >= 1) {
                    await Command.replacePerson(id_com, arrayPoints[0].start_bound+1, arrayPoints[0].valid_bound-1);
                }
            }
            points.push(right);
            console.log(points);
            let update = await Command.updateValidPoints(id_com, points);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
            return {error: e.detail};
        }
    }

    static async replacePerson(id_com, start_bound, valid_bound) {
        try {
            let result = await Query.doQuery('UPDATE command\n' +
                '\tSET valid_bound=$3,  start_bound=$2' +
                '\tWHERE id=$1;', [id_com, start_bound, valid_bound]);
            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
            return {error: e.detail};
        }
    }


    static async updateStartPoints(id_com, start) {
        //console.log(start)
        try {
            let result = await Query.doQuery('UPDATE command\n' +
                '\tSET points_start=$2 ' +
                '\tWHERE id=$1;', [id_com, start]);

            if (result.detail !== undefined) throw result;
            return {error: null, result: result};
        } catch (e) {
            return {error: e.detail};
        }
    }
    static async updateValidPoints(id_com, valid) {
        try {
            let result = await Query.doQuery('UPDATE command\n' +
                '\tSET points_valid=$2 ' +
                '\tWHERE id=$1;', [id_com, valid]);
            await Command.updatePoint(id_com);
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

    static countResult(start, valid) {
        let points_start = 0;
        let points_valid = 0;
        let point_val = 3;
        for (let i = 0; i < start.length; i++) {
            if (start[i] === 1) {
                points_start++;
            }

        }
        for (let i = 0; i < valid.length; i++) {
            if (valid[i] === 1) {
                points_valid += point_val;
                point_val++;
            } else {
                if (point_val > 4 && point_val < 7) {
                    point_val -= 2;
                } else {
                    if (point_val >= 7)
                        point_val = 5;
                    if (point_val === 4)
                        point_val = 3;
                }
            }
        }

        return points_start  + points_valid;
    }


}

module.exports = Command;