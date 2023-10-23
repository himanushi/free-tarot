import * as PIXI from "pixi.js";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const app: any = new PIXI.Application({
  background: "#1099bb",
  resizeTo: window,
});

document.body.appendChild(app.view);
