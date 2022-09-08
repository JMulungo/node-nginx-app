const express = require('express')
const app = express()
const port = 5000
const config = {
    host: 'dbservice',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const conn = mysql.createConnection(config)

conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

module.exports = conn;

var query = "CREATE TABLE IF NOT EXISTS `people` (`id` int(11) NOT NULL auto_increment, `name` varchar(255), PRIMARY KEY  (`id`))"
const sql = "INSERT INTO people(name) VALUES('Jorge Mulungo')"


app.get('/', (req,res) => {
    conn.query(query)
    conn.query(sql)

    res.write("<p>")
    res.write("<p>&lt;h1&gt;Full Cycle Rocks!&lt;/h1&gt;</p>")
    res.write("</p>")
    res.write("<p>")
    res.write("<p>- Lista de nomes cadastrada no banco de dados:</p>")    

    res.write("<ul>")
    conn.query("SELECT name FROM people", function (err, rows, fields) {
        if (err) throw err;
        
        rows.forEach(function(row) {
            res.write("<li>" + row+ "<li>")
            res.write(row.name);
            console.log(row.name);
        });
    });    
    res.write("</ul>")
    
    res.write("</p>")
    res.send();
})

app.listen(port, () => console.log('Server is up and running'));
