function collectPuzzle(...puzzles) {
  // TODO:在这里写入具体的实现逻辑
  // 对所有的拼图进行收集，获取不同拼图类型的结果，并返回
  const result = new Set();
  puzzles.forEach((p) => {
    p.forEach((i) => {
      result.add(i);
    });
  });
  return [...result];
}

// 检测需要，请勿删除
module.exports = collectPuzzle;
