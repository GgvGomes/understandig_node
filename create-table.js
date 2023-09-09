import { sql } from "./db.js";

// sql `DROP TABLE IF EXISTS data`
//     .then(() => {
//         console.log('Table dropped')
//     });

// Create a table for storing the data
sql `
    CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        duration INTEGER
    )
`.then(() =>{
    console.log('Table created')
});