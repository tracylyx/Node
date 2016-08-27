// @descripton 简易的爬虫
// @data 2016-08-27 11:15:59
var https = require('https');

// npm install cheerio 安装cheerio模块，可以操作获取的页面数据
// cheerio模块是以JQ为核心，给服务端设计的便捷、快熟、熟悉的jq语法的处理dom数据的工具
var cheerio = require('cheerio');

var url = 'https://github.com/tracylyx?tab=repositories';

var hostStr = 'https://github.com';

/**
 * filterInfo 对获取的dom结构数据进行处理
 * @param  {String} htmlStr [页面所有dom数据]
 * @return {[type]}         [description]
 */
function filterInfo (htmlStr) {
	var $ = cheerio.load(htmlStr);

	var datas = [];

	// 确定拿到数据的数据结构
	// [{
	// 		title: '',
	// 		description: '',
	// 		href: ''
	// }]
	// 
	
	var chapters = $('.repo-list-item');

	chapters.each(function (index, item) {
		var chapter = $(item); // <==> var chapter = $(this);
		
		var data = {};
		
		data.title = chapter.find('.repo-list-name a').text();
		data.href = hostStr + chapter.find('.repo-list-name a').attr('href');
		data.description = chapter.find('.repo-list-description').text();

		datas.push(data);

		console.log(index + ': \n'+ data.title + ' ' + data.href + '\n' + data.description);
	});	
}

https.get(url, function (res) {
	var html = '';

	// console.log('statusCode: ', res.statusCode);

	// console.log('headers: ', res.headers);

	res.on('data', function (data) {
		html += data;
	});

	res.on('end', function () {
		filterInfo(html); // 处理取到的界面代码，获取自己需要的数据
		// console.log(html);
	});

}).on('error', function (e) {

	console.log('出现错误: ' + e.message);

});