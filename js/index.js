window.addEventListener('load', () => {
    // Get the number of valid rows and columns entered by the user.
    alert('please input the rows and cols, which are limited between 6 and 15.')
    let rows = prompt('rows:');
    let cols, isEnter = 0;
    if(rows>=6 && rows<=15){
        cols = prompt('cols:');
        if(rows>=6 && rows<=15){
            alert('welcome!');
            isEnter = 1;
        } else{
            alert('rows must be a number between 6 and 15!!');
            window.location.reload();
        }
    } else{
        alert('rows must be a number between 6 and 15!!');
        window.location.reload();
    }
    // Make the basic game box
    const outerBox = document.querySelector('.outerBox');
    for(let i=0; i<rows; i++){
        let div = document.createElement('div')
        div.setAttribute('rownum', i);
        div.classList.add('midBox');
        outerBox.appendChild(div);
        for(let j=0; j<cols; j++){
            const midBox = document.querySelectorAll('.midBox');
            let span = document.createElement('span');
            span.setAttribute('state', 0);
            span.classList.add('littleBox');
            midBox[i].style.height = 32 + 'px';
            midBox[i].appendChild(span);
        }
        const outerBoxWidth = cols * 32;
        const outerBoxHeight = rows * 32;
        outerBox.style.width = outerBoxWidth + 'px';
        outerBox.style.height = outerBoxHeight + 'px';
    }
    // Initialize the position of small fish as the upper left corner,
    // and randomly generate the positions of treasure chest, anchor point and shrimp.
    let fish = document.createElement('img');
    fish.src = './img/fish.png';
    let treasure = document.createElement('img');
    treasure.src = './img/treasure.png';
    let waterAnchor = document.createElement('img');
    waterAnchor.src = './img/water_anchor.png';
    let start = outerBox.children[0];
    start.children[0].appendChild(fish);
    start.children[0].setAttribute('state', 4);
    for(let i=0; i<6; i++){
        let x = Math.floor(Math.random() * parseInt(cols));
        let y = Math.floor(Math.random() * parseInt(rows));
        let a = outerBox.children[y];
        if(a.children[x].getAttribute('state') == 1 || a.children[x].getAttribute('state') == 2 || a.children[x].getAttribute('state') == 3 || a.children[x].getAttribute('state') == 4) continue;
        else{
            if(i==0) {
                a.children[x].appendChild(treasure);
                a.children[x].setAttribute('state', 2);
            }else if(i==1) {
                a.children[x].appendChild(waterAnchor);
                a.children[x].setAttribute('state', 3);
            }else if(i>=2){
                let shrimp = document.createElement('img');
                shrimp.src = './img/shrimp.png';
                a.children[x].appendChild(shrimp);
                a.children[x].setAttribute('state', 1);
            }
            
        }
    }
    //Start game button time
    let btn = document.querySelector('.startGame');
    btn.addEventListener('click', () => {
        //Disable button after use
        btn.disabled = true;
        // Bind keyboard events to time
        let isEnd = 5;
        let xx = 0;
        let yy = 0;
        let scoreSum = 0;
        var scorediv = document.querySelector('.score');
        scorediv.innerHTML = 'score:' + scoreSum;
        document.addEventListener('keyup', (keys) => {
            if(isEnd==0){
                alert('congratulations!your score is:' + scoreSum);
                Window.location.reload();
            }
            if(keys.key=='w' || keys.key=='ArrowUp'){
                if(yy>0) {
                    outerBox.children[yy].children[xx].removeChild(outerBox.children[yy].children[xx].children[0]);
                    outerBox.children[yy].children[xx].setAttribute('state', 0);
                    yy--;
                    scoreSum = score(xx, yy, scoreSum);
                    scorediv.innerHTML = 'score:' + scoreSum;
                    let fish1 = document.createElement('img');
                    fish1.src = './img/fish.png';
                    outerBox.children[yy].children[xx].appendChild(fish1);
                    outerBox.children[yy].children[xx].setAttribute('state', 4);
                }
            }else if(keys.key=='a' || keys.key=='ArrowLeft'){
                if(xx>0) {
                    outerBox.children[yy].children[xx].removeChild(outerBox.children[yy].children[xx].children[0]);
                    outerBox.children[yy].children[xx].setAttribute('state', 0);
                    xx--;
                    scoreSum = score(xx, yy, scoreSum);
                    scorediv.innerHTML = 'score:' + scoreSum;
                    let fish1 = document.createElement('img');
                    fish1.src = './img/fish.png';
                    outerBox.children[yy].children[xx].appendChild(fish1);
                    outerBox.children[yy].children[xx].setAttribute('state', 4);
                }
            }else if(keys.key=='d' || keys.key=='ArrowRight'){
                if(xx<(cols-1)) {
                    outerBox.children[yy].children[xx].removeChild(outerBox.children[yy].children[xx].children[0]);
                    outerBox.children[yy].children[xx].setAttribute('state', 0);
                    xx++;
                    scoreSum = score(xx, yy, scoreSum);
                    scorediv.innerHTML = 'score:' + scoreSum;
                    let fish1 = document.createElement('img');
                    fish1.src = './img/fish.png';
                    outerBox.children[yy].children[xx].appendChild(fish1);
                    outerBox.children[yy].children[xx].setAttribute('state', 4);
                }
            }else if(keys.key=='s' || keys.key=='ArrowDown'){
                if(yy<(rows-1)) {
                    outerBox.children[yy].children[xx].removeChild(outerBox.children[yy].children[xx].children[0]);
                    outerBox.children[yy].children[xx].setAttribute('state', 0);
                    yy++;
                    scoreSum = score(xx, yy, scoreSum);
                    scorediv.innerHTML = 'score:' + scoreSum;
                    let fish1 = document.createElement('img');
                    fish1.src = './img/fish.png';
                    outerBox.children[yy].children[xx].appendChild(fish1);
                    outerBox.children[yy].children[xx].setAttribute('state', 4);
                }
            }
            
        })
        // Score judging function, fish 4, shrimp 1, treasure box 2, anchor 3
        let score = (p, q, ss) => {
            if(outerBox.children[q].children[p].getAttribute('state')==1){
                outerBox.children[q].children[p].removeChild(outerBox.children[q].children[p].children[0]);
                ss += Math.floor((8 + 4*Math.random()));
                isEnd--;
            }else if(outerBox.children[q].children[p].getAttribute('state')==2){
                outerBox.children[q].children[p].removeChild(outerBox.children[q].children[p].children[0]);
                ss += 10;
                initTime += 6;
                isEnd--;
            }else if(outerBox.children[q].children[p].getAttribute('state')==3){
                alert('Sorry!!You have been dead!!!');
                window.location.reload();
            }
            console.log(isEnd);
            return ss;
        }
        // Set countdown
        let time = document.querySelector('.time');
        let initTime = 66;
        let timefn = setInterval(() => {
            time.innerHTML = 'remaining time:' + initTime + "s";
            initTime--;
            if(initTime<0){
                clearInterval(timefn);
                alert('congratulations!!!your score is:' + scoreSum);
                Window.location.reload();
            }
        }, 1000);
    });
    

    

    
})