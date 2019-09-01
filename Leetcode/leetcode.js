function isHidden(el) { return (el.offsetParent === null); }
function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
}

var result = result || {};
var done = false;

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

setTimeout(
function timeout(){

	if ($('[diff]').length){
	var obj = {
		categories: _x('.//*[contains(@class, "topic-tag")]').map(function(dom){return dom.innerText}),
		diff: $('[diff]').html(),
		title: $(_x('.//*[@data-cy="question-title"]')[0]).html(),
		question: _x(".//*[contains(@class, 'question-content')]")[0].innerHTML,
	}
		// companies: {},
  //       _x('.//a[contains(@href, "/company/")]').forEach(function(item){item=item.innerText.split('\n|\n');item[1]=parseInt(item[1]); obj.companies[item[0]]=item[1]; });

	id = obj.title.match(/\d+(?=\.)/)[0];
	if (!result.hasOwnProperty(id)){
		if (_x('.//*[@data-submission-id and text()="Accepted"]')[0] != null)
			$.get(_x('.//*[@data-submission-id and text()="Accepted"]')[0].href, function(data){
				obj.code = data.match(/(?<=submissionCode: ')[^`]*(?=',\n  editCodeUrl:)/)[0];
			});

		result[id] = obj;
	}
	}
	var next = _x('.//*[@data-cy="next-question-btn"]')[0];
	if (next != null && !done)
	{
		setTimeout(timeout, Math.random() * 2000 + 1500)

		if (!isHidden(next) && !next.getAttribute('disabled') && parseInt(id) % 300)
		{
			next.click();
		} else {
			done = true;
		}
	}
}, 5000);

(function(console){
console.save = function(data, filename){
    if(!data) return;
    if(typeof data === "object") data = JSON.stringify(data, undefined, 4);
    var blob = new Blob([data], {type: 'text/json'}), e    = document.createEvent('MouseEvents'), a    = document.createElement('a');
    a.download = filename; a.href = window.URL.createObjectURL(blob); a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':'); e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); a.dispatchEvent(e);
}})(console)