const http = require('http')
const querystring = require('querystring')

const postData = querystring.stringify({
  	'question[title]': null,
	'question[content]':' <p>很赞<br/></p>',
	'question[courseId]': 405,
	'question[lessonId]': 9493,
	'_csrf_token': '211f82d8c692edf30b96a2712eee412d05b9d664'
});

const options = {
  hostname: 'www.codingke.com',
  
  port: 80,
  path: '/ajax/create/course/question',
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language':' zh-CN,zh;q=0.9',
	'Connection': 'keep-alive',
	'Content-Length': postData.length,
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	'Cookie': 'tgw_l7_route=1da6220a8c6aee8fae7fcb8ec6e1299a; UM_distinctid=1679b03f1d0235-0a1e12c95da755-3f674706-1fa400-1679b03f1d15ec; CNZZDATA1256018185=85158131-1544489394-null%7C1544489394; Hm_lvt_7d5fe787f1dd300413ad4b53656dc0b1=1544493986; 53gid2=10420621329003; visitor_type=new; 53gid0=10420621329003; 53gid1=10420621329003; 53revisit=1544493988282; 53kf_72165667_from_host=www.codingke.com; 53kf_72165667_keyword=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3D7xTEnnOkQCf_2HCN8-p9XYgdIfZ4xMMIX5ce_E4bagLMjGQZgyBQYsmyXbVhZpck%26wd%3D%26eqid%3Dfff071360000dded000000025c0f1b98; 53kf_72165667_land_page=http%253A%252F%252Fwww.codingke.com%252F; kf_72165667_land_page_ok=1; 53uvid=1; onliner_zdfq72165667=0; PHPSESSID=svilt13nd7ab3pmkurq4bkr077; Invite_code=326104; Hm_lpvt_7d5fe787f1dd300413ad4b53656dc0b1=1544494079',
	'Host': 'www.codingke.com',
	'Origin': 'http://www.codingke.com',
	'Referer': 'http://www.codingke.com/v/9493-lesson-405-course',
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
	'X-CSRF-Token': '211f82d8c692edf30b96a2712eee412d05b9d664',
	'X-Requested-With': 'XMLHttpRequest'
  }
};

const req = http.request(options, (res) => {
//console.log(`STATUS: ${res.statusCode}`);
//console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log('success');
  });
  res.on('end', () => {
    
  });
});

req.on('error', (e) => {
  
});

// write data to request body
req.write(postData);
req.end();