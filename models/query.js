'use strict';

const db = require('../lib/db');

class Query {

    static async doQuery(text, values) {
        let client;
        let err = null;
        let result = null;
        try {
            client = await db.pool.connect();
            let r = await client.query({
                text: text,
                values: values
            });
            if (r.rowCount > 0) {
                result = JSON.stringify(r.rows);
            } else {
                result = "[]";
            }
            return result;
        } catch (e) {
            err = e;
            console.log("ERROR : ", e.detail);
            return -1;
        } finally {
            await client.release();
        }
    }

}

module.exports = Query;
