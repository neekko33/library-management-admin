// 将参数对象转换为为字符串形式
export function transformData(data) {
  let str = ''
  for (let key in data) {
    str += `${key}=${data[key]}&`
  }
  return str.substring(0, str.length - 1)
}
