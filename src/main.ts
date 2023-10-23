import * as PIXI from "pixi.js";
import { backCardTexture, cardTextures } from "./textures";

const app: any = new PIXI.Application({
  background: "#1099bb",
  resizeTo: window,
});

document.body.appendChild(app.view);

const cardWidth = 68;
const cardHeight = 120;
const margin = 10;
const paddingLeft = 40;
const paddingTop = 60;
const totalWidth = app.screen.width - 2 * margin - paddingLeft;
const cardsPerRow = Math.floor(totalWidth / (cardWidth + margin));
const horizontalSpacing =
  (totalWidth - cardsPerRow * cardWidth) / (cardsPerRow - 1);

for (let i = 0; i < 22; i++) {
  const x =
    paddingLeft + margin + (i % cardsPerRow) * (cardWidth + horizontalSpacing);
  const y =
    paddingTop + margin + Math.floor(i / cardsPerRow) * (cardHeight + margin);
  createCard(x, y, cardTextures[i]);
}

function createCard(x: any, y: any, texture: any) {
  const card = new PIXI.Sprite(texture);

  card.eventMode = "static";
  card.cursor = "pointer";
  card.anchor.set(0.5);
  card.scale.set(1);

  card.on("pointerdown", onDragStart, card);

  card.x = x;
  card.y = y;

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
  this.alpha = 0.5;
  dragTarget = this;
  app.stage.on("pointermove", onDragMove);
}

function onDragEnd() {
  if (dragTarget) {
    app.stage.off("pointermove", onDragMove);
    dragTarget.alpha = 1;
    dragTarget = null;
  }
}
