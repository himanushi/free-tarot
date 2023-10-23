import * as PIXI from "pixi.js";
import { cardTextures } from "./textures";

const app: any = new PIXI.Application({
  background: "#1099bb",
  resizeTo: window,
});

document.body.appendChild(app.view);

for (let i = 0; i < 22; i++) {
  createCard(
    100 + (i % 11) * 70,
    Math.floor(i / 11) * 120 + 100,
    cardTextures[i],
  );
}

function createCard(x: any, y: any, texture: any) {
  const card = new PIXI.Sprite(texture);

  card.eventMode = "static";
  card.cursor = "pointer";
  card.anchor.set(0.5);
  card.scale.set(0.05);

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
