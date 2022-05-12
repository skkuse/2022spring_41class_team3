"use strict";

const id = document.querySelector("#id"),
    psword =document.querySelector("#psword"),
    loginBtn = document.querySelector("#button"); 

    loginBtn.addEventListener("click",login);
    function login(){
        const req = {
            id: id.value,
            psword:psword.value,
        };

        fetch("/login",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.success){//로그인 성공시 루트
                location.href="/";//루트로 가라
            }else {
                alert(res.msg);
            }
        })
        .catch((err)=>{
            console.error(new Error("login error"));
        });
    }