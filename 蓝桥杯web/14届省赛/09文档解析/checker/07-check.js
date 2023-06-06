// const parse = require("./code/js/parse");
const parse = require("./parse");

let score = 0;
let errors = [];
function check(input, expect, error) {
  const result = parse(input);
  const compressed = result.replace(/\r?\n/g, "");
  if (expect !== compressed) {
    errors.push(
      new Error(`${error}，输入为：${input}时，解析结果是：${result}`)
    );
  }
}

check("# 标题1", "<h1>标题1</h1>", "未能正确解析一级标题");
check("## 标题2", "<h2>标题2</h2>", "未能正确解析二级标题");
check("### 标题3", "<h3>标题3</h3>", "未能正确解析三级标题");
check("#### 标题4", "<h4>标题4</h4>", "未能正确解析四级标题");
check("##### 标题5", "<h5>标题5</h5>", "未能正确解析五级标题");
check("###### 标题6", "<h6>标题6</h6>", "未能正确解析六级标题");

let errorLength = errors.length;
check("---", "<hr>", "未能正确解析分割线");
if (errorLength === errors.length) {
  score += 5;
}

errorLength = errors.length;
check(
  "> helloworld",
  `<blockquote><p>helloworld</p></blockquote>`,
  "未能正确解析引用区块"
);
check(
  "> helloworld\n> helloworld",
  `<blockquote><p>helloworld</p><p>helloworld</p></blockquote>`,
  "未能正确解析多级引用区块"
);
if (errorLength === errors.length) {
  score += 5;
}

errorLength = errors.length;
check(
  "![图片](./images/md.jpg)",
  `<img src="./images/md.jpg" alt="图片">`,
  "未能正确解析图片"
);
check("**粗体**效果", `<b>粗体</b>效果`, "未能正确解析粗体效果");
check("`代码行`效果", `<code>代码行</code>效果`, "未能正确解析代码行效果");
if (errorLength === errors.length) {
  score += 5;
}

errorLength = errors.length;
check(
  "* 无序列表\n* 无序列表\n* 无序列表\n",
  `<ul><li>无序列表</li><li>无序列表</li><li>无序列表</li></ul>`,
  "未能正确解析无序列表"
);
check(
  "- 无序列表\n- 无序列表\n- 无序列表\n",
  `<ul><li>无序列表</li><li>无序列表</li><li>无序列表</li></ul>`,
  "未能正确解析无序列表"
);
if (errorLength === errors.length) {
  score += 10;
}

console.log(`总计得分：${score}`);
if (errors.length !== 0) {
  console.error(errors);
  process.exit(1);
} else {
  process.exit(0);
}
