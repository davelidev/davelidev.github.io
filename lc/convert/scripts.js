// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://leetcode.com/subscribe/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
close();
    // Your code here...
})();
========================================================================================================

queue=[]; lc = {}; $('.question-list-table .reactable-data tr').each(function(idx, row){tds = $(row).find('td'); num = tds[1].innerText; lc[num]={}; if ($(tds[3]).find('a[href]').length) {lc[num].article_link = $(tds[3]).find('a[href]')[0].getAttribute('href'); queue.push([num, lc[num].article_link ])}});


setTimeout(
  function timeout(){
    if (!queue.length) return;
    var id_link = queue.pop();
    console.log(id_link);
    $.get(id_link[1], function(res){
      lc[id_link[0]]["article"] = res;
      setTimeout(timeout, Math.random() * 500 + 500);
    });

    //setTimeout(timeout, Math.random() * 2000 + 3000);
  }, 2000);

  function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
};

========================================================================================================


queue = _x(".//a[contains(@href, '/problems/') and @href != '/problems/random-one-question/all']");

function timeout(){
  if (!queue.length) return;
    if ((queue.length % 10 != 0) || window.document.hasFocus()){
    var link = queue.pop();
    var win = window.open(link.getAttribute('href'), '_blank')
    win.focus();
  }
  setTimeout(timeout, Math.random() * 500 + 500 );
}; timeout();

========================================================================================================

// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://leetcode.com/problems/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
var $ = jQuery;

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
}

function click_next(){
    close();
    return;
    var next = _x('.//*[@data-cy="next-question-btn"]')[0];
    if (next != null){
        next.click();
        location.reload();
    }
}

function main(){
    if ($('#initial-loading').length){
        setTimeout(main, 100);
    }else{
            if ($('[diff]').length){
                var obj = {
                    categories: _x('.//*[contains(@class, "topic-tag")]').map(function(dom){return dom.innerText}),
                    diff: $('[diff]').html(),
                    title: $(_x('.//*[@data-cy="question-title"]')[0]).html(),
                    question: _x(".//*[contains(@class, 'question-content')]")[0].innerHTML,
                    url: window.location.href,
                    companies: {},
                }

                _x('.//a[contains(@href, "/company/")]').forEach(function(item){item=item.innerText.split('\n|\n');item[1]=parseInt(item[1]); obj.companies[item[0].replace('\n|', '')]=item[1]; });

                var id = obj.title.match(/\d+(?=\.)/)[0];
                if (_x('.//*[@data-submission-id and text()="Accepted"]')[0] != null)
                    $.get(_x('.//*[@data-submission-id and text()="Accepted"]')[0].href, function(data){
                        obj.code = data.match(/(?<=submissionCode: ')[^`]*(?=',\n  editCodeUrl:)/)[0];
                        download(id + '.json', JSON.stringify(obj, null, 2));
                        click_next();
                    });
                else{
                    download(id + '.json', JSON.stringify(obj, null, 2));
                    click_next();
                }
            }
            else{
                location.reload();
            }
    }
}

main();

//setTimeout(main, Math.random() * 3000 + 5000)