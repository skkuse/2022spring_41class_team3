"use strict";



const id = document.querySelector("#id"),
    name =document.querySelector("#name"),
    psword =document.querySelector("#psword"),
    confirmPsword =document.querySelector("#confirm-psword"),
    registerBtn = document.querySelector("#button"); 
    
    registerBtn.addEventListener("click",register);
    function register(){
        if (!id.value) return alert("아이디를 입력해주세요")
        if (psword.value!==confirmPsword.value){
            return alert("비밀번호가 일치하지 않습니다.");

        }
        const req = {
            id: id.value,
            name: name.value,
            psword:psword.value,
        };
        fetch("/register",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.success){//로그인 성공시 루트
                location.href="/login";//루트로 가라
            }else {
                alert(res.msg);
            }
        })
        .catch((err)=>{
            console.error(new Error("register error"));
        });
     }