let scoreH2= document.getElementById('scorer');
let timeLeftH2= document.getElementById('time');
let startH2= document.getElementById('start');
let pauseH2= document.getElementById('pause');
let squares= document.querySelectorAll('.square');
let timerId=null;        // since both func run at equal interval either timmer or randommole
let randomMoleId= null;
let gameMusic= new Audio('');   
let HitMusic= new Audio('');   // it will be played on clicking the mole 



let hitPosition=null
function randomMole(){
    squares.forEach(square=>{
        square.classList.remove('mole');
    })

     let randomSquare = squares[Math.floor(Math.random()*squares.length)];  // yha phle hit pos tha let ke baad aur squares[] nhi tha
    // squares[hitPosition].classList.add('mole')
    randomSquare.classList.add('mole');
    hitPosition=randomSquare.id;
    }

    function startGame(){
        scorer=0;
        time=60;
        scoreH2.innerHTML='Your Score: 0';
        timeLeftH2.innerHTML='Time Left:60';  // always clicking in the new game score and time will be updated
        pauseH2.innerHTML= 'Pause';

        gameMusic.play();   // on starting the game it will be played
        randomMoleId= setInterval(randomMole,1000);  //
        // for time left
        timerId= setInterval(countDown,1000);
    
    }
    
    function pauseGame(){
        if(pauseH2.textContent === 'Pause'){
            gameMusic.pause();         // stop music on pause
            clearInterval(timerId);
            clearInterval(randomMoleId);
            timerId=null;
            randomMoleId=null;
            pauseH2.style.display= 'inline-block';
            pauseH2.textContent= 'Resume' ;  // u can also use innerText
    
        }
        else{
            gameMusic.play(); 
            timerId= setInterval(randomMole,1000);
            randomMoleId= setInterval(countDown,1000);
            pauseH2.textContent= 'Pause' ;
        }
    }


    function countDown(){
        time--;
        timeLeftH2.innerHTML=`Time Left: ${time}`;
        if(time===0){
            clearInterval(timerId);   // to stop it use clearInterval  timer v kam nhi hoga 0 hone ke baad
          clearInterval(randomMoleId);  // mole ghumna band kr dega 
        }
    }

randomMole();
squares.forEach(square=>{
    square.addEventListener('mousedown',() => {
        if(timerId!==null){  // agr pause rhe game to mole pe click krne par score update n ho
       if(square.id===hitPosition){
        HitMusic.play();   // on updation of score it will be played
        // we want to play it for few sec turant nhi band krna h after 1 sec
        setTimeout(()=> {HitMusic.pause()},1000);// stop that music also to avoid continue of this
        scorer++;
        scoreH2.innerText=`Your Score ${scorer}`;
        // problem is at the same position we click on multiple time the score get updated so do null
        hitPosition= null;  // isse update nhi hoga score ek hi jagah click krne se
        
       }
    }
    }
    )
})



startH2.addEventListener('click',startGame);  // to stop or update time after 0 sec we should grab it through id
pauseH2.addEventListener('click',pauseGame);