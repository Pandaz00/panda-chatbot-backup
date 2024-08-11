/*// 导入所需的模块
const express = require('express');
const mysql = require('mysql');

// 创建 Express 应用
const app = express();

// 设置 Express 中间件，用于解析 POST 请求的数据
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 创建 MySQL 连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_mysql_database_name',
});

// 处理 POST 请求，保存表单数据到数据库
app.post('/submit', (req, res) => {
    const { email, message } = req.body;

    // 使用连接池获取数据库连接
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database: ', err);
            return res.status(500).json({ message: 'Database error' });
        }

        // 执行 SQL 查询，将数据插入到数据库
        const sql = 'INSERT INTO contact_messages (email, message) VALUES (?, ?)';
        connection.query(sql, [email, message], (err, result) => {
            connection.release(); // 释放数据库连接

            if (err) {
                console.error('Error querying database: ', err);
                return res.status(500).json({ message: 'Database query error' });
            }

            console.log('Data inserted successfully');
            res.status(200).json({ message: 'Data inserted successfully' });
        });
    });
});

// 启动 Express 应用，监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
