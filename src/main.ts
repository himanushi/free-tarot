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
const openCardsNo = new Set<number>();
let currentDescription: PIXI.Text | null = null;
let descriptionBackground: PIXI.Graphics | null = null;

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
  if (currentDescription) {
    app.stage.removeChild(currentDescription);
    app.stage.removeChild(descriptionBackground!);
  }

  cards = [];
  numbers = [...Array(22).keys()];
  movedCardsNo.clear();
  openCardsNo.clear();

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
  card.on(
    "pointerdown",
    () => {
      showDescription(cardInfo.no);
    },
    cardInfo,
  );
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
      openCardsNo.add(no);
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

const descriptions = [
  "△: 新たな始まり, 自由, 無知, 純粋, 冒険, 信頼, 大胆, 楽観, 直感, 無垢",
  "○: 創造, 意志力, 技術, 変化, 自己表現, 戦略, 自己信頼, 可能性, 手練手管, 知識",
  "○: 神秘, 直感, 内面の声, 知識, 理解, 内省, 調和, 包含, 母性, 成長",
  "◎: 豊穣, 母性, 豊饒, 自然, 創造, 繁栄, 美, 安心, 愛情, 調和",
  "◎: 権威, 父性, 制御, 組織, 指導, 保護, 堅固, 勇敢, 責任, 力",
  "○: 知恵, 精神的な指導, 教訓, 共感, 宗教, 啓示, 教義, 倫理, 説明, 信念",
  "○: 愛, パートナーシップ, 結合, 統一, 選択, 信頼, 恋愛, 結婚, 調和, 契約",
  "○: 決定, 勝利, 自己制御, 勇気, 行動, 向上心, 忍耐, 闘争, 勝利, 進行",
  "◎: 勇気, 自制心, 恐れの克服, 決定力, 内なる力, パワー, 堅実, 達成, バランス, エネルギー",
  "△: 内省, 独りでいる, 自己探求, 思考, 啓示, 内面の声, 慎重, 瞑想, 成熟, 静寂",
  "◎: 運命, 変化, チャンス, 幸運, サイクル, 可能性, 期待, 予見, リスク, チャレンジ",
  "○: 公平, バランス, 正義, 理性, 真実, 倫理, 法, 規則, 平等, 公正",
  "△: 犠牲, 放棄, 新たな視点, 内面の検索, 静止, 反抗, 逆転, 悔い改め, 魂の試練, 内面の闘い",
  "x: 変化, 終わり, 新たな始まり, 変換, 再生, 転換, 終焉, 新生, 開放, 変貌",
  "○: バランス, 調和, 節制, 統合, モデレーション, 繁栄, 創造, 幸福, 調整, 自制",
  "x: 誘惑, 束縛, 恐怖, 欲望, 失敗,  陰鬱, 嘲笑, 破壊, 衝動, 困難",
  "x: 破壊, カオス, 解放, 変化, 意外な出来事, 衝撃, 困難, リスク, 危機, 進展",
  "○: 希望, 信念, 導き, 啓示, 平和, 前進, 新たな目標, 明確, 安心, 平和",
  "△: 恐怖, 混乱, 幻想, 無知, 誤解, 不安, 変容, 幻滅, 謎, 夢",
  "◎: 喜び, 成功, 満足, 幸せ, 達成, 輝き, 自慢, 善意, 誠実, 繁栄",
  "◎: 再生, 復活, 醒め, 審判, 変化, 進化, 新生, 希望, 更新, 悔い改め",
  "◎: 完結, 達成, 旅の終わり, 新たなサイクル, 完成, 成功, 達成, 理解, 調和, 完全",
];

const reversedDescriptions = [
  "x: 不確実性, 不注意, 危険, 思慮不足, 失敗, 過信, 落胆, 混乱, 無計画, 機会損失",
  "△: 欺瞞, 混乱, 無計画, 未熟, 潜在的才能, 迷信, 欠乏, 無能, 制約, 自己中心",
  "△: 秘密, 過保護, 未発達の才能, 曖昧さ, 混乱, 無知, 隠蔽, 誤解, 混乱, 偽り",
  "x: 過保護, 支配的, 欠乏, 過剰, 依存, 無気力, 抑圧, 不満, 退廃, 逆境",
  "△: 頑固, 権力闘争, 非効率, 不公平, 不調和, 専横, 独裁, 破壊, 抑圧, 過度",
  "△: 不寛容, 狭量, 信頼の欠如, 悪徳, 偽善, 権威主義, 無知, 固執, 退廃, 尊大",
  "△: 不一致, 不信, 不調和, 失恋, 対立, 遠慮, 冷淡, 浮気, 不安, 反抗",
  "x: 矛盾, 誤解, 不決定, 負け, 暴力, 逃走, 怠惰, 逆転, 軽率, 非協力",
  "x: 虐待, 弱さ, 無力感, 不調和, 自己疑い, 悲観, 失望, 絶望, 失敗, 否定",
  "△: 孤立, 隠蔽, 秘密, 恐れ, 過度の孤独, 疎外感, 無視, 孤独, 無関心, 忍耐",
  "x: 悪運, 抵抗, 不運, 変化への抵抗, 予想外の出来事, 困難, 挫折, 失敗, 危機, 退行",
  "△: 不公平, 偏見, 虐待, 不調和, 矛盾, 不公正, 腐敗, 失敗, 欠乏, 法律違反",
  "x: 抵抗, 物事の先延ばし, 怠け者, 停滞, 無駄な犠牲, 遅滞, 後悔, 逆境, 拒絶, 無気力",
  "○: 新しい展開, 恐怖, 固執, 拒否, 内なる抵抗, 再生への抵抗, 逆転, 遅滞, 反抗, 暴動, 損失",
  "△: 不均衡, 不調和, 行き過ぎ, 極端な行動, 衝突, 混乱, 困難, ストレス, 過負荷, 不調",
  "○: 制御, 逃避, 依存, 自己破壊, 束縛, 操られ, 嘘, 陰鬱, 欺瞞, 誤解",
  "x: 抵抗, 無力感, 危機, 恐怖, 否定的変化, 衝撃, 逆転, 不安, 悲観, 破壊",
  "x: 絶望, 喪失, 過度の楽観, 落胆, 破滅的思考, 無力感, 失望, 悲観, 不安, 迷走",
  "○: 混乱, 欺瞞, 虚偽, 不確実性, 夢想, 迷信, 幻覚, 騙し, 欺瞞, 不安",
  "x: 落胆, 失敗, 欺瞞, 未達成, 虚偽, 裏切り, 虚栄心, 無関心, 損失, 過大評価",
  "x: 恐怖, 否定, 拒否, 失敗, 退行, 後悔, 判断の誤り, 不適, 罪悪感, 苦悩",
  "△: 未完, 失敗, 進行の遅延, 目標の欠如, 停滞, 遅滞, 遅れ, 困難, 満足のいかない結果, 不安定",
];

function showDescription(cardNo: number) {
  if (!openCardsNo.has(cardNo)) {
    return;
  }

  if (currentDescription) {
    app.stage.removeChild(currentDescription);
    app.stage.removeChild(descriptionBackground!);
  }

  descriptionBackground = new PIXI.Graphics();
  descriptionBackground.beginFill(0xffffff);

  const cardInfo = cards.find((card) => card.no === cardNo);

  const style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: ["#ffffff", cardInfo?.isReverse ? "#ff4500" : "#00ff99"],
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: "round",
  });

  currentDescription = new PIXI.Text(
    cardInfo?.isReverse ? reversedDescriptions[cardNo] : descriptions[cardNo],
    style,
  );
  currentDescription.x = 10;
  currentDescription.y = 50;

  const padding = 10;
  descriptionBackground.drawRect(
    currentDescription.x - padding / 2,
    currentDescription.y - padding / 2,
    currentDescription.width + padding,
    currentDescription.height + padding,
  );
  descriptionBackground.endFill();

  app.stage.addChild(descriptionBackground);
  app.stage.addChild(currentDescription);
}
