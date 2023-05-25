// 返回条件为真的新数组
Array.prototype.myarray = function (cb) {
  // TODO：待补充代码
  newArray = []
  cardList.forEach(e => {
    if (cb(e)) {
      console.log(e);
      newArray.push(e)
    }
  });
  // console.log(typeof (this));
  // console.log(this);
  // console.log(typeof (newArray));
  console.log(newArray);
  // (item) => item.category == "werewolf"
  // return this.filter(cb)
  return newArray

};
