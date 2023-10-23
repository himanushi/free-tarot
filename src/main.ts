import * as PIXI from "pixi.js";
import card0Image from "./assets/cards/1.png";
import card1Image from "./assets/cards/2.png";
import card2Image from "./assets/cards/3.png";
import card3Image from "./assets/cards/4.png";
import card4Image from "./assets/cards/5.png";
import card5Image from "./assets/cards/6.png";
import card6Image from "./assets/cards/7.png";
import card7Image from "./assets/cards/8.png";
import card8Image from "./assets/cards/9.png";
import card9Image from "./assets/cards/10.png";
import card10Image from "./assets/cards/11.png";
import card11Image from "./assets/cards/12.png";
import card12Image from "./assets/cards/13.png";
import card13Image from "./assets/cards/14.png";
import card14Image from "./assets/cards/15.png";
import card15Image from "./assets/cards/16.png";
import card16Image from "./assets/cards/17.png";
import card17Image from "./assets/cards/18.png";
import card18Image from "./assets/cards/19.png";
import card19Image from "./assets/cards/20.png";
import card20Image from "./assets/cards/21.png";
import card21Image from "./assets/cards/22.png";
import backCardImage from "./assets/cards/back.png";

const backCardTexture = PIXI.Texture.from(backCardImage);

const cardTextures = [
  PIXI.Texture.from(card0Image),
  PIXI.Texture.from(card1Image),
  PIXI.Texture.from(card2Image),
  PIXI.Texture.from(card3Image),
  PIXI.Texture.from(card4Image),
  PIXI.Texture.from(card5Image),
  PIXI.Texture.from(card6Image),
  PIXI.Texture.from(card7Image),
  PIXI.Texture.from(card8Image),
  PIXI.Texture.from(card9Image),
  PIXI.Texture.from(card10Image),
  PIXI.Texture.from(card11Image),
  PIXI.Texture.from(card12Image),
  PIXI.Texture.from(card13Image),
  PIXI.Texture.from(card14Image),
  PIXI.Texture.from(card15Image),
  PIXI.Texture.from(card16Image),
  PIXI.Texture.from(card17Image),
  PIXI.Texture.from(card18Image),
  PIXI.Texture.from(card19Image),
  PIXI.Texture.from(card20Image),
  PIXI.Texture.from(card21Image),
];

const app: PIXI.Application = new PIXI.Application({
  background: "#1099bb",
  resizeTo: window,
});

document.body.appendChild(app.view as any);

// biome-ignore lint/style/useConst: <explanation>
let cards: {
  card: PIXI.Sprite;
  no: number;
  isReverse: boolean;
}[] = [];
// biome-ignore lint/style/useConst: <explanation>
let numbers = [...Array(22).keys()];
const movedCardsNo = new Set<number>();

const cardWidth = 68;
const cardHeight = 120;
const margin = 5;
const paddingLeft = 40;
const paddingTop = 100;
const totalWidth = app.screen.width - 2 * margin - paddingLeft;
const cardsPerRow = Math.floor(totalWidth / (cardWidth + margin));
const horizontalSpacing =
  (totalWidth - cardsPerRow * cardWidth) / (cardsPerRow - 1);

function shuffle() {
  // biome-ignore lint/complexity/noForEach: <explanation>
  cards.forEach((card) => {
    app.stage.removeChild(card.card);
    card.card.destroy();
  });

  cards = [];
  numbers = [...Array(22).keys()];
  movedCardsNo.clear();

  for (let i = 0; i < 22; i++) {
    const x =
      paddingLeft +
      margin +
      (i % cardsPerRow) * (cardWidth + horizontalSpacing);
    const y =
      paddingTop + margin + Math.floor(i / cardsPerRow) * (cardHeight + margin);
    createCard(x, y);
  }
}

shuffle();

function createCard(x: number, y: number) {
  const card = new PIXI.Sprite(backCardTexture);

  card.eventMode = "static";
  card.cursor = "pointer";
  card.anchor.set(0.5);
  card.scale.set(1);
  card.x = x;
  card.y = y;

  const no = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];

  const cardInfo = {
    card,
    no,
    isReverse: Math.random() > 0.5,
  };

  cards.push(cardInfo);

  card.on("pointerdown", onDragStart, cardInfo);
  app.stage.addChild(card);
}

let dragTarget: any = null;

app.stage.eventMode = "static";
app.stage.hitArea = app.screen;
app.stage.on("pointerup", onDragEnd);
app.stage.on("pointerupoutside", onDragEnd);

function onDragMove(event: any) {
  if (dragTarget) {
    dragTarget.parent.toLocal(event.global, null, dragTarget.position);
  }
}

function onDragStart() {
  this.card.alpha = 0.5;
  dragTarget = this.card;
  app.stage.on("pointermove", onDragMove);
  app.stage.addChild(this.card);
  movedCardsNo.add(this.no);
}

function onDragEnd() {
  if (dragTarget) {
    app.stage.off("pointermove", onDragMove);
    dragTarget.alpha = 1;
    dragTarget = null;
  }
}

function openCard() {
  // biome-ignore lint/complexity/noForEach: <explanation>
  movedCardsNo.forEach((no) => {
    const cardInfo = cards.find((card) => card.no === no);
    if (cardInfo) {
      cardInfo.card.texture = cardTextures[no];
      cardInfo.card.rotation = cardInfo.isReverse ? Math.PI : 0;
    }
  });
}

const openText = new PIXI.Text("Open");
openText.x = 10;
openText.y = 0;
openText.eventMode = "static";
openText.cursor = "pointer";
openText.on("pointerdown", openCard);
app.stage.addChild(openText);

const shuffleText = new PIXI.Text("Shuffle");
shuffleText.x = 100;
shuffleText.y = 0;
shuffleText.eventMode = "static";
shuffleText.cursor = "pointer";
shuffleText.on("pointerdown", shuffle);
app.stage.addChild(shuffleText);
