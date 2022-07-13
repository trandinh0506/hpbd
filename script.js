class star {
  constructor(bullet, deg) {
    this.ctx = bullet.ctx;
    this.x = bullet.x;
    this.y = bullet.y;
    this.DEG_ROTATE_SPEED = Math.PI / 4;
    this.DEG_ROTATE = 0;
    this.deg = deg;
    this.CHANGE_SIZE_SPEED = 1;
    this.A = 20;
    this.B = this.A / (1 + Math.sqrt(5) / 2);
    this.SPEED = Math.random() * 2 + 10;
    this.SPEED_X = this.SPEED * Math.cos(this.deg);
    this.SPEED_y = this.SPEED * Math.sin(this.deg);
    this.color = bullet.color;
    this.alpha = 1;
  }
  update() {
    // this.x += this.SPEED_X;
    // this.y += this.SPEED_y;

    if (this.A > 7) {
      this.B = this.A / (1 + Math.sqrt(5) / 2);
      this.A -= this.CHANGE_SIZE_SPEED;
    }
    if (this.alpha > 0) {
      this.alpha -= 0.03;
    }
  }

  draw() {
    const C = this.A * Math.cos(Math.PI / 10) * 3;

    // góc của 1 đỉnh trong 1 ngôi sao 5 cánh = 36 độ => nữa góc ở đỉnh = 18 độ => pi/10 radian 1 độ = pi/180
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.x + Math.sin(this.DEG_ROTATE) * C,
      this.y + Math.cos(this.DEG_ROTATE) * C
    );
    this.ctx.lineTo(
      this.x - Math.sin(Math.PI / 10) * this.A + Math.sin(this.DEG_ROTATE) * C,
      this.y + Math.cos(Math.PI / 10) * this.A + Math.cos(this.DEG_ROTATE) * C
    );
    this.ctx.lineTo(
      this.x -
        Math.sin(Math.PI / 10) * this.A -
        this.A +
        Math.sin(this.DEG_ROTATE) * C,
      this.y + Math.cos(Math.PI / 10) * this.A + Math.cos(this.DEG_ROTATE) * C
    );
    this.ctx.lineTo(
      this.x -
        Math.sin(Math.PI / 10) * this.A -
        Math.sin(Math.PI / 10) * this.B +
        Math.sin(this.DEG_ROTATE) * C,
      this.y +
        Math.cos(Math.PI / 10) * this.A +
        Math.cos(Math.PI / 10) * this.B +
        Math.cos(this.DEG_ROTATE) * C
    );
    this.ctx.lineTo(
      this.x -
        Math.sin(Math.PI / 10) * this.A -
        Math.sin(Math.PI / 10) * this.B -
        Math.sin(Math.PI / 10) * this.A +
        Math.sin(this.DEG_ROTATE) * C,
      this.y +
        Math.cos(Math.PI / 10) * this.A +
        Math.cos(Math.PI / 10) * this.B +
        Math.cos(Math.PI / 10) * this.A +
        Math.cos(this.DEG_ROTATE) * C
    );
    this.ctx.lineTo(
      this.x + Math.sin(this.DEG_ROTATE) * C,
      this.y +
        this.A +
        this.B +
        Math.sin(Math.PI / 10) * this.B +
        Math.cos(this.DEG_ROTATE) * C
    );
    this.ctx.lineTo(
      this.x +
        Math.sin(Math.PI / 10) * this.A +
        Math.sin(Math.PI / 10) * this.B +
        Math.sin(Math.PI / 18) * this.A +
        Math.sin(this.DEG_ROTATE) * C,
      this.y +
        Math.cos(Math.PI / 10) * this.A +
        Math.cos(Math.PI / 10) * this.B +
        Math.cos(Math.PI / 10) * this.A +
        Math.cos(this.DEG_ROTATE) * C
    );
    this.ctx.lineTo(
      this.x +
        Math.sin(Math.PI / 10) * this.A +
        Math.sin(Math.PI / 10) * this.B +
        Math.sin(this.DEG_ROTATE) * C,
      this.y +
        Math.cos(Math.PI / 10) * this.A +
        Math.cos(Math.PI / 10) * this.B +
        Math.cos(this.DEG_ROTATE) * C
    );
    this.ctx.lineTo(
      this.x +
        Math.sin(Math.PI / 10) * this.A +
        this.A +
        Math.sin(this.DEG_ROTATE) * C,
      this.y + Math.cos(Math.PI / 10) * this.A + Math.cos(this.DEG_ROTATE) * C
    );
    this.ctx.lineTo(
      this.x + Math.sin(Math.PI / 10) * this.A + Math.sin(this.DEG_ROTATE) * C,
      this.y + Math.cos(Math.PI / 10) * this.A + Math.cos(this.DEG_ROTATE) * C
    );

    this.ctx.closePath();
    this.ctx.fillStyle = "rgba(" + this.color + "," + this.alpha + ")";
    this.ctx.fill();
  }
}

class bullet {
  constructor(main) {
    const NUMBER_STAR_PER_BULLET = 18;
    this.main = main;
    this.ctx = this.main.ctx;
    this.x = Math.floor(Math.random() * (screen.width - 20));
    this.y = Math.floor(Math.random() * ((screen.height * 3) / 4));
    this.color =
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255);
    this.stars = [];
    this.specialStars = [];
    let bullet_deg = (2 * Math.PI) / NUMBER_STAR_PER_BULLET;
    for (let i = 0; i < NUMBER_STAR_PER_BULLET; i++) {
      let new_star = new star(this, i * bullet_deg);
      this.stars.push(new_star);
    }
  }
  draw() {
    this.stars.forEach((star) => star.draw());
  }

  update() {
    const Max_bullet = 45;
    if (this.main.bullets.length > Max_bullet) {
      this.main.bullets.shift();
    }
    this.stars.forEach((star) => star.update());
  }
}

class main {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = screen.width;
    this.canvas.height = screen.height;
    this.bullets = [];
    setInterval(() => {
      let newBullet = new bullet(this);
      this.bullets.push(newBullet);
    }, 20);
    this.loop();
  }
  loop() {
    this.draw();
    this.ctx.font = "55px Sofia";
    this.ctx.fillText("Happy Birthday", 10, 100);
    this.ctx.fillText("Lê Ngọc", 120, 260, 300);
    this.ctx.fillText("Ánh Duyên", 70, 400, 300);

    setTimeout(() => this.loop(), 50);
  }
  clear_screen() {
    this.ctx.fillStyle = "rgb(0,0,0)";
    this.ctx.fillRect(0, 0, screen.width, screen.height);
  }
  draw() {
    this.clear_screen();
    this.bullets.forEach((bullet) => bullet.update());
    this.bullets.forEach((bullet) => bullet.draw());
  }
}

var g = new main();
