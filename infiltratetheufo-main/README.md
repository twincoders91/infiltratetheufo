# Infiltrate The Ufo
This game is built using HTML, CSS and JavaScript on VSC.
# Table of Contents

1. [ Game Description ](#desc)
2. [ Canvas Creation ](#canvas)
3. [Global Definitions](#global)
4. [ Classes Creation ](#classescreation)
* [Player Creation](#playercreation)
* [Platform Creation](#platformcreation)
* [Moving Platform Creation](#movingplatformcreation)
* [Boulder Creation](#bouldercreation)
* [Background Creation](#backgroundcreation)
5. [ Implementation of Classes ](#implementation)
6. [ Win/Lose Scenarios ](#scenarios)
7. [ Key Press ](#keypress)
8. [Collision Detection](#detection)
9. [Animations](#animations)
10. [Restart Game](#restartgame)
11. [Highscore System](#highscore)

<a name="desc"></a>
## 1. Game Description
This is jumping game that allows players to navigate through an obstacle course while testing their reflexes and skills. Players must make their way to the top of the castle where the UFO awaits.

Today, a mysterious unidentified object was sighted entering our atmosphere...You are tasked by King Desmond to infiltrate the foreign spacecraft! The presence of this gigantic UFO was accompanied by a massive earthquake! Avoid falling debris and reach the top as fast as you can! Conquer the earthquake and find the UFO.

<a name="canvas"></a>
## 2. Canvas Creation

The canvas element is the foundation for this game and will be used as a container for graphics. Over here the following properties must be set and adhered to before proceeding with the rest of the game creation:
<li>Canvas Width</li>
<li>Canvas Height</li>
<br>
These properties are the dimensions of the canvas that will be used to draw the game. The canvas is linked to the HTML page through the following DOM manipulation.
<br>

```
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//changing canvas size to size of window screen
canvas.width = 700;
canvas.height = 700;
```

<a name="global"></a>
## 3. Global Definitions
<p>Global variables are defined at the top of the script to specify values that are important for conditional statements defined in the later stages.</p>
  
  ```
  
  const gravity = 0.5; //creating "gravity" acceleration
let playerNameUpperCase = "";
let boulderStartFalling = false;
let player1 = false;
let player2 = false;
  
  ```

<a name="classescreation"></a>
## 4. Classes Creation
<p>Classes Creation are used to define the building blocks of the games. Some of these include:</p>
<li>Player Classes</li>
<li>Platform Classes</li>
<li>Moving Platform Classes</li>
<li>Boulder Classes</li>
<li>Background Classes</li>

<a name="playercreation"></a>
<h3>4.1. Player Creation</h3>
<p>The Player is created using the Class keyword followed by the method constructor(). An example of creating the Player class is shown here:

```
class Player {
  constructor() {
    this.speed = 6;                             //player's speed
    this.speedY = 10;
    this.position = {                           //player's starting position
      x: 0,
      y: 480,
    };
    this.width = 66;                            //player's width and height
    this.height = 120;
    this.velocity = {                           //player's velocity
      x: 0,
      y: 0,
    };
```

<p>The Player's properties such as velocity, starting position on the canvas, width, height and "image to use" are defined within.</p>

<p>The second part of the Player class dictates the drawing method that will be used for the Player. The update method will redraw the Player class using the new values of the Player's properties.</p>

```
draw() {
    c.drawImage(                                //The draw function used will be called repeatedly, about 60 times per second.
      this.image,
      200 * this.frames,                        //flipping image through a sprite sheet, 200px per frame
      0,
      200,                                      //cropping image from sprite sheet
      400,                                      //cropping image from sprite sheet
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();                                
    // this.frames += 1;
    // if (this.frames > 19) this.frames = 0;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) { //updating player's y position with gravity on the canvas
      this.velocity.y += gravity; //acceleration to "gravity"
    }
  }
  ```


<a name="platformcreation"></a>
<h3>4.2. Platform Creation</h3>

<p>The Platform is created using the Class keyword followed by the method constructor(). An example of creating the Platform class is shown here:

```
class Platform {
  //platform's properties
  constructor({ x, y, image }) {
    //platform's starting position (object)
    this.position = {                              //platform's position
      x: x,
      y: y,
    };

    this.image = image;                            //platform's image

    this.width = image.width;                      //platform's width and height
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);         //drawing the platform on canvas
  }
}
```

<p>The Platform's properties such as starting position on the canvas, width and height and "image to use" are defined within.</p>


<a name="movingplatformcreation"></a>
<h3>4.3. Moving Platform Creation</h3>

<p>The Moving Platform is created using the Class keyword followed by the method constructor(). An example of creating the Moving Platform class is shown here:

```
class MovingPlatform {
  constructor({ x, y, image }) {
    this.position = {                              //moving platform's position
      x: x,
      y: y,
    };
    this.velocity = {                              //moving platform's velocity
      x: 0,
      y: 0,
    };
    this.image = image;                            //moving platform's image
    this.width = image.width;                      //moving platform's width and height
    this.height = image.height;                    
    this.movingPlatformValue = false;              //value used to aid the platform's directional movement
  }
  draw() {                                         //The draw function used will be called repeatedly, about 60 times per second.
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {                                       //The update function used to update the drawings on canvas.
    this.draw();
    this.position.x += this.velocity.x;
  }
}
```

<p>The moving Platform's properties such as starting position on the canvas, width and height, "image to use" and updating requirements are defined within. The update method will redraw the Moving Platform class using the new values of it's properties.</p>



<a name="bouldercreation"></a>
<h3>4.4. Boulder Creation</h3>


<p>The falling boulders or Boulder is created using the Class keyword followed by the method constructor(). An example of creating the Boulder class is shown below. The concept is similar to the examples above:

```
class Boulder {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.velocity = {
      x: 0,
      y: 0.8,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }
}
```

<p>The Boulder's properties such as starting position on the canvas, width and height, "image to use" and updating requirements are defined within. The update method will redraw the Boulder class using the new values of it's properties.</p>

<a name="backgroundcreation"></a>
<h3>4.5. Background Creation</h3>


<p>The Background is created using the Class keyword followed by the method constructor(). An example of creating the Background class is shown below. The concept is similar to the examples above:

```
class DecorativeObjects {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };

    this.image = image;

    this.width = image.width;
    this.height = 8192;
  }
  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
```

<p>The Background's properties such as starting position on the canvas, width and height and "image to use" are defined within.</p>


<a name="implementation"></a>
## 5. Implementation of Classes
<p>In order to populate the Classes described above onto the canvas itself, the following implementation approach is used through an array with individual key-value pairs.</p>

```
let player = new Player();

let platforms = [
  new Platform({ x: -100, y: 650, image: platformImage }),
  new Platform({ x: 100, y: 500, image: platformImage2 }),
  new Platform({ x: 200, y: 400, image: platformImage2 }),
  new Platform({ x: 300, y: 300, image: platformImage2 }),
  new Platform({ x: 300, y: 000, image: platformImage2 }),
  new Platform({ x: 100, y: -100, image: platformImage2 }),
  new Platform({ x: 200, y: -300, image: platformImage2 }),
];
```

<a name="scenarios"></a>
## 6. Win/Lose Scenarios

<p>In order to complete the game, a win scenario is created. Likewise, lose scenarios are needed to complete the game. The following code snippets are used to create those scenarios</p>

```
 if (scrollOffsetY >= 4800) {
    // console.log("You win!");
    keys.up.pressed = false;
    keys.left.pressed = false;
    keys.right.pressed = false;
    updateGameInfoBoxWin();
    scrollOffsetY = 0;
    restartGame();
  }
  ```
  
  <p>The win scenario here is tied to a conditional statement. The Player will win the game after crossing a certain height and subsequently other relevant functions will be called to log the score and restart the game.</p>
  
  ```
  if (player.position.y + player.height * 0.3 > canvas.height) {
    keys.up.pressed = false;
    keys.left.pressed = false;
    keys.right.pressed = false;
    updateGameInfoBoxDeath();
    restartGame();
  }

  boulderObject.forEach((boulder) => {
    if (
      player.position.x + player.width >= boulder.position.x &&
      player.position.x <= boulder.position.x + boulder.width &&
      player.position.y + player.height >= boulder.position.y &&
      player.position.y <= boulder.position.y + boulder.height
    ) {
      keys.up.pressed = false;
      keys.left.pressed = false;
      keys.right.pressed = false;
      updateGameInfoBoxDeath();
      restartGame();
    }
  });
  ```
  
    <p>The lose scenario here is tied to a couple of conditional statements. The Player will lose the game upon falling off the canvas or coming into contact with falling boulders. Afterwhich other relevant functions will be called to log the score and restart the game.</p>
    
<a name="keypress"></a>
## 7. Key Press

<p>The Player's movement along the canvas will be employed through key presses on the keyboard. Event Listeners are used to "listen" for certain keys being pressed.</p>

```
addEventListener("keydown", ({ keyCode }) => {
  //finding the keycodes for each key.
  switch (keyCode) {
    case 65:
      // console.log("left");
      keys.left.pressed = true;
      break;
    case 83:
      // console.log("down");
      break;
    case 68:
      // console.log("right");
      keys.right.pressed = true;
      break;
    case 87:
      // console.log("up");
      if (player.velocity.y === 0) {
        keys.up.pressed = true;
        player.velocity.y -= player.speedY;
        // keys.up.pressed = false;
        break;
      }
  }
});
```

<p>Similarly, the Player's movement will be halted when certain keys are released from the keyboard. Event Listeners are used to "listen" for certain keys being released.</p>

```
addEventListener("keyup", ({ keyCode }) => {
  //finding the keycodes for each key.
  switch (keyCode) {
    case 65:
      // console.log("left");
      keys.left.pressed = false;
      break;
    case 83:
      // console.log("down");
      break;
    case 68:
      // console.log("right");
      keys.right.pressed = false;
      break;
    case 87:
      // console.log("up");
      keys.up.pressed = false;
      player.velocity.y -= 0;
      break;
  }
});
```

<a name="detection"></a>
## 8. Collision Detection

<p>The Collision Detection system is coded to allow the Player to jump onto Platforms and Moving Platforms to further the journey upwards. Without this, the Player will fall right through and back to his/her original position.</p>

```
platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y && //any y position above or equal the platform, player y velocity = 0
      player.position.y + player.height + player.velocity.y >= //any y position below or equal the platform, player y velocity = 0
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  movingPlatform.forEach((movingPlatform) => {
    if (
      player.position.y + player.height <= movingPlatform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        movingPlatform.position.y &&
      player.position.x + player.width >= movingPlatform.position.x &&
      player.position.x <= movingPlatform.position.x + movingPlatform.width
    ) {
      player.velocity.y = 0;
    }
  });
  
  ```
  
  <p>The same system is used to detect whether or not the Player comes into contact with falling debris such as the boulders.</p>
  
  ```
  boulderObject.forEach((boulder) => {
    if (
      player.position.x + player.width >= boulder.position.x &&
      player.position.x <= boulder.position.x + boulder.width &&
      player.position.y + player.height >= boulder.position.y &&
      player.position.y <= boulder.position.y + boulder.height
    ) {
      keys.up.pressed = false;
      keys.left.pressed = false;
      keys.right.pressed = false;
      updateGameInfoBoxDeath();
      restartGame();
    }
  });
}

```


<a name="animations"></a>
## 9. Animations

<p>To provide an animated feel to the game, the function animate() is used to call the draw() method on individual arrays of classes. Conditional statements are also included to ensure certain animations happen when needed.</p>

```
function animate() {
  this.toggleScreen("startScreen", false);
  this.toggleScreen("canvas", true);
  requestAnimationFrame(animate); //requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height); //function to clear canvas
  //Updating/call the platform's draw function (style and fill)

  if (scrollOffsetY > 10) {
    boulderStartFalling = true;
  }

  //====================MOVING PLATFORMS======================
  movingPlatform.forEach((movingPlatform) => {
    if (
      movingPlatform.movingPlatformValue === false &&
      movingPlatform.position.x < 700
    ) {
      movingPlatform.velocity.x = 2;
      movingPlatform.movingPlatformValue = true;
    } else if (
      movingPlatform.movingPlatformValue === true &&
      movingPlatform.position.x >= 700
    ) {
      movingPlatform.velocity.x = -2;
    } else if (movingPlatform.position.x <= -300) {
      movingPlatform.movingPlatformValue = false;
    }
  });

  //====================DRAWING OBJECTS======================
  decorativeObjects.forEach((decorativeObject) => {
    decorativeObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });

  winningObject.forEach((winningObject) => {
    winningObject.draw();
  });

  movingPlatform.forEach((movingPlatform) => {
    movingPlatform.update();
  });

  boulderObject.forEach((boulderObject) => {
    if (boulderStartFalling === true) {
      boulderObject.update();
    }
  });
  
  ```
  
  <a name="restartgame"></a>
## 10. Restart Game

<p>The Restart Game function, restartgame() will be called when the Player invokes the Win/Lose scenarios or selects a new player to take over. All the basic blocks of the game will reset into its original position, allowing the Player to have a go at the game again while setting new values to the Global variables.</p>

```
function restartGame() {
  player = new Player();

  platforms = [
    new Platform({ x: -100, y: 650, image: platformImage }),
    new Platform({ x: 100, y: 500, image: platformImage2 }),
    new Platform({ x: 200, y: 400, image: platformImage2 }),
    new Platform({ x: 300, y: 300, image: platformImage2 }),
    new Platform({ x: 300, y: 000, image: platformImage2 }),
    new Platform({ x: 100, y: -100, image: platformImage2 }),
    ];
    
    movingPlatform = [
    new MovingPlatform({ x: 500, y: 150, image: movingPlatformImage }),
    new MovingPlatform({ x: 500, y: -550, image: movingPlatformImage }),
    new MovingPlatform({ x: 500, y: -2350, image: platformImage2 }),
    ];
    .
    .
    .
    }
    
```

  <a name="highscore"></a>
## 11. Highscore System
<p>The highscore system is used to track the Player's score. This is done by tracking the vertical offset or scrollOffsetY "travelled" by the Player and appended onto the HTML for display.
  
  ```
  let highscore = scrollOffsetY;
      document.querySelector("#highscore").innerHTML = highscore;
  ```
  
