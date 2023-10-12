import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import bgImg1 from './assets/background.png';
import playerImg from './assets/player.png';

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    // this.load.image('logo', logoImg);
    this.load.image('background1', bgImg1); // 배경 이미지 로드
    // this.load.image("player", playerImg); // 플레이어 이미지 로드

    // 이미지 짤라서 로드
    this.load.spritesheet('player', playerImg, {
      frameWidth: 32,
      frameHeight: 36,
    });
  }

  create() {
    // const logo = this.add.image(400, 150, "logo");
    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: "Power2",
    //   yoyo: true,
    //   loop: -1,
    // });

    // 이미지 중앙을 기준으로 지정된 화면의 좌표에 표시
    this.background1 = this.add.image(
      0, // 화면의 x 좌표
      0, // 화면의 y좌표
      'background1',
    );
    this.background1.setOrigin(0, 0); // 이미지의 중앙 좌표값 설정

    // 화면의 중앙에 위치시키는 방법
    // this.player = this.add.image(config.width / 2, config.height / 2, "player");
    // this.player.scale = 3; // 사이즈 수정
    // this.player.flipY = true; // 상하반전
    // this.player.flipX = true; // 좌우반전
    // this.player.angle += 20; // 각도 설정

    // sprite 이미지로 그릴때
    this.player = this.add.sprite(
      config.width / 2,
      config.height / 2,
      'player',
    );

    this.add.text(
      10,
      10,
      "'위니브 월드 : 새로운 시대'에 오신 것을 환영합니다.",
      {
        font: '25px 배달의민족 주아 OTF',
        fill: 'red',
      },
    );

    // 애니메이션 설정
    this.anims.create({
      // 움직일때
      key: 'player_anim', // 식별값
      frames: this.anims.generateFrameNames('player'),
      frameRate: 12, // 프레임 값
      repeat: -1, // 반복횟수 -1은 무한을 의미
    });

    this.anims.create({
      // 멈춰있을때
      key: 'player_idle',
      frames: this.anims.generateFrameNames('player', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0,
    });

    // 만들어 놓은 애니메이션 실행
    // this.player.play("player_anim");
    // this.player.play("player_idle");

    // 키보드 입력 읽기
    this.keyboardInput = this.input.keyboard.createCursorKeys();
    this.player.moving = false;
  }

  update() {
    // 계속 빠르게 실행되는 라이프 사이클
    // console.log("업데이트");
    this.move(this.player);
  }

  // 사용자 정의 함수들
  move(player) {
    const PLAYER_SPEED = 0.2;

    if (
      this.keyboardInput.left.isDown ||
      this.keyboardInput.right.isDown ||
      this.keyboardInput.up.isDown ||
      this.keyboardInput.down.isDown
    ) {
      // 키보드 입력
      if (!player.moving) {
        this.player.play('player_anim');
      }
      player.moving = true;
    } else {
      if (player.moving) {
        this.player.play('player_idle');
      }
      player.moving = false;
    }

    if (this.keyboardInput.left.isDown) {
      player.x -= PLAYER_SPEED;
      player.flipX = false;
    } else if (this.keyboardInput.right.isDown) {
      player.x += PLAYER_SPEED;
      player.flipX = true;
    }
    if (this.keyboardInput.up.isDown) {
      player.y -= PLAYER_SPEED;
    } else if (this.keyboardInput.down.isDown) {
      player.y += PLAYER_SPEED;
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800, // 화면의 사이즈 지정
  height: 600,
  backgroundColor: 0x000000, // 배경색
  physics: {
    // 물리엔진 설정
    default: 'arcade',
    arcade: {
      debug: process.env.DEBUG === 'true',
    },
  },
  scene: MyGame, // 여러개일때 []로도 가능
};

const game = new Phaser.Game(config);
