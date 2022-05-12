"use strict";
const { response } = require("express");
const UserStorage = require("./UserStorage");

class User{
    constructor(body){ 
     this.body = body;
    }
    async login(){
        const client = this.body;
        try{
       const {id,psword} = await UserStorage.getUserInfo(client.id);//여기에 추가해서
        //추가로 받아올 수 있음

        if (id){ //아이디가 존재하고
            if(id===client.id && psword===client.psword){
                return{success:true};
            }
            return{success:false, msg: "wrong psword"};
        }
        return{success:false,msg:"ID does not exist"};
    }catch(err){
        return {success: false, msg: err};
    }
} 
    async register(){
        const client = this.body;
        try{
        const response = await UserStorage.save(client);
        return response;
    }catch(err){
        return {success : false, msg: err};
    }
    }
}

module.exports = User;