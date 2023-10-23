import * as PIXI from "pixi.js";
import { backCardTexture, cardTextures } from "./textures";

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

for (let i = 0; i < 22; i++) {
  // cards = [];
  // numbers = [...Array(22).keys()];
  // movedCardsNo.clear();

  const x =
    paddingLeft + margin + (i % cardsPerRow) * (cardWidth + horizontalSpacing);
  const y =
    paddingTop + margin + Math.floor(i / cardsPerRow) * (cardHeight + margin);
  createCard(x, y);
}

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
    isReverse: true,
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
  console.log(cards);
  console.log(movedCardsNo);
  // biome-ignore lint/complexity/noForEach: <explanation>
  movedCardsNo.forEach((no) => {
    const cardInfo = cards.find((card) => card.no === no);
    cardInfo!.card.texture = cardTextures[no];
  });
}

const basicText = new PIXI.Text("Open");
basicText.x = 10;
basicText.y = 0;
basicText.eventMode = "static";
basicText.cursor = "pointer";
basicText.on("pointerdown", openCard);

app.stage.addChild(basicText);
