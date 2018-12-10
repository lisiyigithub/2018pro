const url = require('url')

console.log(url.parse('http://www.baidu.com/api?age=22'))

//node终端不支持多行操作
var str = {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?age=22',
  query: 'age=22',
  pathname: '/api',
  path: '/api?age=22',
  href: 'http://www.baidu.com/api?age=22' 
}
console.log(url.format(str))//解析
console.log(url.resolve('http://www.baidu.com','api?age=100'))//拼成完整的地址
