// let platformImage = document.getElementById("platformImage").innerHTML;
// console.log(platformImage);
// platformImage.src = platform.png;
// console.log(platformImage);
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//changing canvas size to size of window screen
canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5; //creating "gravity" acceleration

//==========================================================
//===================PLAYER CREATION========================
//==========================================================
class Player {
  constructor() {
    //player's properties
    this.speed = 6;
    this.position = {
      //player's starting position (object)
      x: 100,
      y: 100,
    };
    this.width = 66;
    this.height = 120;
    this.velocity = {
      //creating gravity for the player
      x: 0,
      y: 0,
    };
    this.image = createImage("./img/hero_1.png");
    this.frames = 0;
  }

  draw() {
    c.drawImage(
      this.image,
      200 * this.frames,
      0,
      200,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    // //changing the color of the player on the canvas
    // c.fillStyle = "red";
    // //filling the player as a rectangle on the canvas, referencing the constructor method
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    //updating player's y position with gravity on the canvas
    this.draw();
    this.frames += 1;
    if (this.frames > 4) this.frames = 0;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity; //acceleration to "gravity"
    }
    // else {
    //   this.velocity.y = 0; //stopping the player at the bottom of the page (using the bottom of the player as ref)
    // }
  }
}

//==========================================================
//=================PLATFORM CREATION========================
//==========================================================

class Platform {
  //platform's properties
  constructor({ x, y, image }) {
    //platform's starting position (object)
    this.position = {
      x: x,
      y: y,
    };

    this.image = image;

    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width.w, this.height.h);
  }
}

//==========================================================
//==================DECORATIVE CLASS========================
//==========================================================

class DecorativeObjects {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };

    this.image = image;

    this.width = image.width;
    this.height = 580;
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

//==========================================================
//====================Image Creation========================
//==========================================================
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}
// const image = new Image();
const platformImage = createImage("./img/Wooden_Platform.png");
const backgroundImage = createImage("./img/Background_elongated.png");
const platformImage2 = createImage("./img/platform2.png");
const platformImage3 = createImage("./img/balloon.png");

//==========================================================
//============Implement the player class====================
//==========================================================
let player = new Player();
//==========================================================
//============Implement the platform class==================
//==========================================================

let platforms = [
  new Platform({ x: -50, y: 560, image: platformImage }),
  new Platform({ x: platformImage.width - 60, y: 560, image: platformImage }),
  new Platform({
    x: platformImage.width * 2 + 100,
    y: 560,
    image: platformImage,
  }),
  new Platform({
    x: platformImage.width * 3 + 150,
    y: 420,
    image: platformImage,
  }),
  new Platform({ x: platformImage.width * 4, y: 300, image: platformImage }),
  new Platform({ x: platformImage.width * 5.5, y: 400, image: platformImage2 }),
  new Platform({ x: platformImage.width * 6.2, y: 350, image: platformImage2 }),
  new Platform({ x: platformImage.width * 6.5, y: 300, image: platformImage3 }),
]; //creation of an array of platforms

//==========================================================
//==============Implement Decorative class==================
//==========================================================
let decorativeObjects = [
  new DecorativeObjects({
    x: 0, //leftmost part of screen
    y: 0, //topmost part of screen
    image: backgroundImage,
  }),
];

//==========================================================
//====================Implement Keys========================
//==========================================================
//(Keys Objects) right and left keys pressed down, return true, else false, tagged with Event Listener.
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

//==========================================================
//========================GAME RESET========================
//==========================================================
function restartGame() {
  player = new Player();

  platforms = [
    new Platform({ x: -50, y: 560, image: platformImage }),
    new Platform({ x: platformImage.width - 60, y: 560, image: platformImage }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 560,
      image: platformImage,
    }),
  ]; //creation of an array of platforms

  decorativeObjects = [
    new DecorativeObjects({
      x: 0, //leftmost part of screen
      y: 0, //topmost part of screen
      image: backgroundImage,
    }),
  ];

  scrollOffset = 0;
}

//==========================================================
//=======================ANIMATIONS=========================
//==========================================================
function animate() {
  //animate loop
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height); //function to clear canvas
  //Updating/call the platform's draw function (style and fill)

  decorativeObjects.forEach((decorativeObject) => {
    decorativeObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update(); //Updating/call the draw function and player new position

  //===============KEY PRESS CONDITIONS======================
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;
    //scroll conditions
    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      decorativeObjects.forEach((decorativeObject) => {
        decorativeObject.position.x -= player.speed * 0.66;
      });
      scrollOffset += player.speed;
    } else if (keys.left.pressed && scrollOffset > 0) {
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      decorativeObjects.forEach((decorativeObject) => {
        decorativeObject.position.x += player.speed * 0.66;
      });
      scrollOffset -= player.speed;
    }
  }
  console.log(scrollOffset);

  //===========PLATFORM COLLISION DETECTION===================
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

  //==========================================================
  //======================WIN SCENARIO========================
  //==========================================================
  //WIN SCENARIO
  if (scrollOffset > 2000) {
    console.log("You Win!");
  }

  //LOSE SCENARIO
  if (player.position.y + player.height * 0.3 > canvas.height) {
    restartGame();
  }
}

animate();

//==========================================================
//===========EVENT LISTENER - PLAYER MOVEMENTS==============
//==========================================================

addEventListener("keydown", ({ keyCode }) => {
  //finding the keycodes for each key.
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 87:
      console.log("up");
      if (player.velocity.y === 0) {
        player.velocity.y -= 12;
        break;
      }
  }
});

addEventListener("keyup", ({ keyCode }) => {
  //finding the keycodes for each key.
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;
    case 87:
      console.log("up");
      player.velocity.y = 0;
      break;
  }
});
