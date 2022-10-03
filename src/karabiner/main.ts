import { Tuple } from "../types.ts";

const config = {
  leftShift: "spacebar",
  rightShift: "f20",
  fileName: "us_split_oyayubi.json",
};

type LeftKeys = Tuple<string | null, 15>;
type RightKeys = Tuple<string | null, 18>;

const leftKeys: LeftKeys = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "a",
  "s",
  "d",
  "f",
  "g",
  "z",
  "x",
  "c",
  "v",
  "b",
];
const leftNormalLayer: LeftKeys = [
  "。",
  "か",
  "た",
  "こ",
  "さ",
  "う",
  "し",
  "て",
  "け",
  "せ",
  null,
  "ひ",
  "す",
  "ふ",
  "へ",
];
const leftUpperLayer: LeftKeys = [
  "ぁ",
  "え",
  "り",
  "ゃ",
  "れ",
  "を",
  "あ",
  "な",
  "ゅ",
  "も",
  "ぅ",
  "ー",
  "ろ",
  "や",
  "ぃ",
];
const leftLowerLayer: LeftKeys = [
  null,
  "が",
  "だ",
  "ご",
  "ざ",
  "ゔ",
  "じ",
  "で",
  "げ",
  "ぜ",
  null,
  "び",
  "ず",
  "ぶ",
  "べ",
];

const rightKeys: RightKeys = [
  "y",
  "u",
  "i",
  "o",
  "p",
  "open_bracket",
  "close_bracket",
  "h",
  "j",
  "k",
  "l",
  "semicolon",
  "quote",
  "n",
  "m",
  "comma",
  "period",
  "slash",
];
const rightNormalLayer: RightKeys = [
  "ら",
  "ち",
  "く",
  "つ",
  "、",
  "「",
  "」",
  "は",
  "と",
  "き",
  "い",
  "ん",
  null,
  "め",
  "そ",
  "ね",
  "ほ",
  "・",
];
const rightUpperLayer: RightKeys = [
  "よ",
  "に",
  "る",
  "ま",
  "ぇ",
  "「",
  "」",
  "み",
  "お",
  "の",
  "ょ",
  "っ",
  "ゎ",
  "ぬ",
  "ゆ",
  "む",
  "わ",
  "ぉ",
];
const rightLowerLayer: RightKeys = [
  "ぱ",
  "ぢ",
  "ぐ",
  "づ",
  "ぴ",
  null,
  null,
  "ば",
  "ど",
  "ぎ",
  "ぽ",
  null,
  null,
  "ぷ",
  "ぞ",
  "ぺ",
  "ぼ",
  null,
];

const kanaToRome: Record<string, string | undefined> = {
  あ: "a",
  い: "i",
  う: "u",
  え: "e",
  お: "o",
  か: "ka",
  き: "ki",
  く: "ku",
  け: "ke",
  こ: "ko",
  さ: "sa",
  し: "si",
  す: "su",
  せ: "se",
  そ: "so",
  た: "ta",
  ち: "ti",
  つ: "tu",
  て: "te",
  と: "to",
  な: "na",
  に: "ni",
  ぬ: "nu",
  ね: "ne",
  の: "no",
  は: "ha",
  ひ: "hi",
  ふ: "hu",
  へ: "he",
  ほ: "ho",
  ま: "ma",
  み: "mi",
  む: "mu",
  め: "me",
  も: "mo",
  や: "ya",
  ゆ: "yu",
  よ: "yo",
  ら: "ra",
  り: "ri",
  る: "ru",
  れ: "re",
  ろ: "ro",
  わ: "wa",
  を: "wo",
  ん: "nn",
  ゔ: "vu",
  が: "ga",
  ぎ: "gi",
  ぐ: "gu",
  げ: "ge",
  ご: "go",
  ざ: "za",
  じ: "zi",
  ず: "zu",
  ぜ: "ze",
  ぞ: "zo",
  だ: "da",
  ぢ: "di",
  づ: "du",
  で: "de",
  ど: "do",
  ば: "ba",
  び: "bi",
  ぶ: "bu",
  べ: "be",
  ぼ: "bo",
  ぱ: "pa",
  ぴ: "pi",
  ぷ: "pu",
  ぺ: "pe",
  ぽ: "po",
  ぁ: "xa",
  ぃ: "xi",
  ぅ: "xu",
  ぇ: "xe",
  ぉ: "xo",
  ゃ: "xya",
  ゅ: "xyu",
  ょ: "xyo",
  ゎ: "xwa",
  っ: "xtu",
};

const symbolToKeyCode: Record<string, string | undefined> = {
  "「": "open_bracket",
  "」": "close_bracket",
  "、": "comma",
  "。": "period",
  "・": "slash",
  ー: "hyphen",
};

function createKeyCodeObj(key: string) {
  const maybeFromKana = kanaToRome[key];
  const maybeFromSymbol = symbolToKeyCode[key];
  if (maybeFromKana) {
    return maybeFromKana.split("").map((key_code) => ({ key_code }));
  } else if (maybeFromSymbol) {
    return { key_code: maybeFromSymbol };
  } else {
    throw new Error(`KeyCodeが登録されていません: ${key}`);
  }
}

const commonOptions = {
  conditions: [
    {
      type: "input_source_if",
      input_sources: [
        {
          language: "^ja$",
        },
      ],
    },
    {
      type: "frontmost_application_unless",
      bundle_identifiers: ["^com\\.apple\\.loginwindow$"],
    },
  ],
};

function createManipulatorObj(from: string | string[], to: string) {
  const fromKey = (typeof from === "string" ? [from] : from).map(
    (key_code) => ({ key_code })
  );
  const toKey = createKeyCodeObj(to);
  const base = {
    type: "basic",
    from: {},
    to: toKey,
    ...commonOptions,
  };
  switch (from.length) {
    case 0:
      throw new Error();
    case 1:
      base.from = fromKey[0];
      break;
    default:
      base.from = {
        simultaneous: fromKey,
      };
  }
  return base;
}

function createRightShiftBasedShortcut() {
  const modifierSetList = [
    ["command"],
    ["command", "control"],
    ["command", "shift"],
  ];
  return modifierSetList.map((modSet) => {
    return {
      type: "basic",
      from: {
        key_code: config.rightShift,
        modifiers: {
          mandatory: modSet,
        },
      },
      to: [
        {
          key_code: "spacebar",
          modifiers: modSet,
        },
      ],
    };
  });
}

function main() {
  const base = {
    title: "us_split_oyayubi",
    rules: [
      {
        description: "all settings",
        manipulators: [...createRightShiftBasedShortcut()] as any[],
      },
    ],
  };

  const single = [];
  const multiple = [];
  for (let i = 0; i < leftKeys.length; i++) {
    const inputCommon = leftKeys[i];
    if (inputCommon === null) {
      continue;
    }
    const inputNormal = [inputCommon];
    const inputUpper = [config.leftShift, inputCommon];
    const inputLower = [config.rightShift, inputCommon];
    const outputNormal = leftNormalLayer[i];
    const outputUpper = leftUpperLayer[i];
    const outputLower = leftLowerLayer[i];
    if (outputUpper) {
      multiple.push(createManipulatorObj(inputUpper, outputUpper));
    }
    if (outputLower) {
      multiple.push(createManipulatorObj(inputLower, outputLower));
    }
    if (outputNormal) {
      single.push(createManipulatorObj(inputNormal, outputNormal));
    }
  }
  for (let i = 0; i < rightKeys.length; i++) {
    const inputCommon = rightKeys[i];
    if (inputCommon === null) {
      continue;
    }
    const inputNormal = [inputCommon];
    const inputUpper = [config.rightShift, inputCommon];
    const inputLower = [config.leftShift, inputCommon];
    const outputNormal = rightNormalLayer[i];
    const outputUpper = rightUpperLayer[i];
    const outputLower = rightLowerLayer[i];
    if (outputUpper) {
      multiple.push(createManipulatorObj(inputUpper, outputUpper));
    }
    if (outputLower) {
      multiple.push(createManipulatorObj(inputLower, outputLower));
    }
    if (outputNormal) {
      single.push(createManipulatorObj(inputNormal, outputNormal));
    }
  }
  base.rules[0].manipulators.push(...multiple, ...single);
  const json = JSON.stringify(base);
  const encoder = new TextEncoder();
  const data = encoder.encode(json);
  try {
    Deno.mkdirSync("dist");
  } catch (err) {
    console.log("もうある");
  }
  Deno.writeFileSync(`dist/${config.fileName}`, data);
}

main();
