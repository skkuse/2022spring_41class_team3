"use strict";
const mysql      = require('mysql');

const db = mysql.createConnection({
    host     : 'sw-team3.c2sntlwpeih5.ap-northeast-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'as156423',
    database : 'mydb'
  });

class UserStorage{

    static getUserInfo(id){

        return new Promise((resolve,reject) => {
            const query = 'SELECT * from users WHERE id = ?;';
            db.query(query,[id],(err, data) => {
                if (err) reject(err);
                if(data[0]===undefined) {resolve(
                    
                        {id: 'admin',
                        Email: 'rkdtlseb@naver.com',
                        psword: '123',
                        admin: 1,
                        salt: 'salty'
                    }
                      
                )}
                //console.log(data[0]);
                resolve(data[0]);
              
              });
        });
       

    }
       
    static async save(userInfo){

        return new Promise((resolve,reject) => {
            const query = 'INSERT INTO users(id,Email,psword,admin,salt) VALUES(?,?,?,?,?);';
            db.query(query,
                [userInfo.id,userInfo.Email,userInfo.password,userInfo.admin,userInfo.salt]
                ,(err) => {
                if (err) reject(`${err}`);
                resolve(true);
            
              });
        });
    }
}

module.exports = UserStorage;