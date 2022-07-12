// 第二个为你想生成出固定开头文字外的随机长度
export const getTemAccount = (prefix = "", randomLength = 7) => {
  // 兼容更低版本的默认值写法
  prefix === undefined ? prefix = "" : prefix;
  randomLength === undefined ? randomLength = 8 : randomLength;

  // 设置随机用户名
  // 用户名随机词典数组
  let nameArr = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      ["a", "b", "c", "d", "e", "f", "g", "h", "i", "g", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  ]
  // 随机名字字符串
  let name = prefix;
  // 循环遍历从用户词典中随机抽出一个
  for (var i = 0; i < randomLength; i++) {
      // 随机生成index
      let index = Math.floor(Math.random() * 2);
      let zm: string = nameArr[index][Math.floor(Math.random() * nameArr[index].length)] + '';
      // 如果随机出的是英文字母
      if (index === 1) {
          // 则百分之50的概率变为大写
          if (Math.floor(Math.random() * 2) === 1) {
              zm = zm.toUpperCase();
          }
      }
      // 拼接进名字变量中
      name += zm;
  }
  // 将随机生成的名字返回
  return name;
}

// 转换为树形结构
export const initTree = (data, parentId = null) => {
  // jsonArray 变量数据
  // 第一次以后：根据id去查询parent_id相同的（相同为子数据）
  // 第一次：查找所有parent_id为null的数据组成第一级
  const children = data.filter((item) => item.parentId == parentId);
  // 第一次：循环parent_id为null数组
  return children.map((item) => ({
    ...item,
    // 当前存在id（id与parent_id应该是必须有的）调用initTree() 查找所有parent_id为本id的数据
    // childs字段写入
    children: initTree(data, item.id),
  }));
}