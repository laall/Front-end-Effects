const collectPuzzle = require("./collect-puzzle");

const testUnits = [
  {
    input: [
      ["小熊", "哈士奇", "小熊", "秋田犬"],
      ["老鹰", "喜鹊", "布谷鸟", "秋田犬"],
      ["喜鹊", "企鹅", "小熊", "北极星"],
    ],
    expect: [
      "小熊",
      "哈士奇",
      "秋田犬",
      "老鹰",
      "喜鹊",
      "布谷鸟",
      "企鹅",
      "北极星",
    ],
  },
  {
    input: [["小熊", "小猫", "小狗"], ["小猫"]],
    expect: ["小熊", "小猫", "小狗"],
  },
  {
    input: [
      ["小熊", "小熊", "小狗"],
      ["小熊", "小狗", "小狗"],
    ],
    expect: ["小熊", "小狗"],
  },
  {
    input: [[], ["小猫", "小猫", "小猫"], ["小狗", "小狗", "小狗"]],
    expect: ["小猫", "小狗"],
  },
];

function check() {
  for (let i = 0; i < testUnits.length; i++) {
    const { input, expect } = testUnits[i];
    const result = collectPuzzle(...input);
    const correct = expect.every((item, idx) => item === result[idx]);
    if (!correct) {
      console.error(`Error：collectPuzzle 处理结果不正确!`);
      process.exit(1);
    }
  }
  console.log(`Success：collectPuzzle 处理逻辑结果正确!`);
}

check();
