var pos = 0;
    const pacArray = [
        ['/images/PacMan1.png', '/images/PacMan2.png'],
        ['/images/PacMan3.png', '/images/PacMan4.png']
    ];
    var direction = 0;
    const pacMen = [];
    
    function setToRandom(scale) {
        return {
            x: (Math.random() * scale),
            y: (Math.random() * scale)
        }
    }
    // Factory to make a PacMan 
    function makePac() {
        // returns an object with values scaled {x: 33, y: 21}
        let velocity = setToRandom(10);
        let position = setToRandom(200);
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';
        newimg.src = '/images/PacMan1.png';
        newimg.width = 100;
        newimg.style.left = position.x;
        // added + 35 to y so they don't spawn over buttons
        newimg.style.top = position.y + 35;
        game.appendChild(newimg);
        // new style of creating an object
        return {
            position,
            velocity,
            newimg
        }
    }

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            checkCollisions(item)
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;
            //makes pacmen face the right way and open and close mouth
            item.newimg.src = pacArray[direction][pos];
            
        })
        //changes pos between 1 and 0 so mouth will open and shut
        pos = (pos + 1) % 2;
        setTimeout(update, 100);
    }

    function checkCollisions(item) {
        if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
            item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;
        if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
            item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
          //checks velocity and sets direction
            if (item.velocity.x > 0) {
                direction = 0;
                } else {
                direction = 1;
                }

        }

    function makeOne() {
        
        pacMen.push(makePac()); // add a new PacMan
    }