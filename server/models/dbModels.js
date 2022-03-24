const { Pool } = require('pg');

// Link to ElephantSQL DB
const PG_URI =
  // 'postgres://xtybcocp:Aefo98rl2Rta1AUfj4K5jiTVoWUIllWi@kashin.db.elephantsql.com/xtybcocp';
  'postgres://gtunrlhs:mAx2IA8sPDmmeYtI3OxfV32tq3aPaDwb@kashin.db.elephantsql.com/gtunrlhs';

// Establish connection to DB
const pool = new Pool({
  connectionString: PG_URI,
});

// Query to DB
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query', text);
    return pool.query(text, params, callback);
  },
};
