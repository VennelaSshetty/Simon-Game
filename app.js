let userSeq=[];
let gameSeq=[];
let color=["brown","green","orange","blue"];

let started=0;
let level=0;
let highScore=0;

let h2=document.querySelector('h2');

document.addEventListener("keypress",function(){
    if(started==false){
    //  console.log("Game started");
      started=true;
    }
    levelup();
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash")
    }, 100);
}

function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=color[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    btnFlash(randBtn);

    gameSeq.push(randColor);
   // console.log(gameSeq);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelup,1000);
        }
    }else{
        if(level-1>highScore){
           highScore=level-1;
        }
        h2.innerHTML=`Game over!<br>High Score is ${highScore}.<br><b>Your Score is ${level-1}.</b><br>Press any key to restart`;
        document.querySelector('body').style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor="white";
        },100);
        reset();
    }
}

function btnPress(){
    let btn=this;
    btnFlash(btn);

    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".box");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
}