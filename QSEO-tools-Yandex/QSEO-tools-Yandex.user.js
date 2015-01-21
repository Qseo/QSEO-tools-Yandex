// ==UserScript==
// @name        QSEO-tools-Yandex
// @namespace   yandex
// @description  Different SEO Tools and helper functions for Yandex Search engine from qseo.ru 
// @version     1.4
// @updateURL   https://github.com/Qseo/QSEO-tools-Yandex/raw/master/QSEO-tools-Yandex/QSEO-tools-Yandex.user.js
// @downloadURL https://github.com/Qseo/QSEO-tools-Yandex/raw/master/QSEO-tools-Yandex/QSEO-tools-Yandex.user.js
// @include     http://yandex.ru/*
// @include     http://yandex.ua/*
// @include     http://yandex.kz/*
// @include     http://yandex.by/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

var regionStr_default = '-1:Автоматически;47:Н.Новгород;213:Москва;2:С-Петербург;11079:Нижегор.обл;972:Дзержинск;20044:Кстово;0:Без региона';

var regionStr;

if(typeof GM_getValue == undefined) {
 regionStr = regionStr_default;
} else {
 regionStr = GM_getValue('regionStr',regionStr_default);
}

var regionList = regionStr.split(';');

var regionBlock = '<div id="yandex-serp-regionlist" style="font-size: 11px"><div class="list-title">Сменить регион:</div><div class="list-items">[regionlist]</div><div class="settings">[<a class="settings" style="text-decoration: none;" href="#">настроить</a>]</div><div class="links" style="margin-top: 10px"><a href="http://qseo.ru/?utm_source=qseo-tools&utm_medium=banner&utm_campaign=qseo-tools-yandex" target="_blank" title="Качественное продвижение сайтов в сети Интернет"><img src="http://qseo.ru/logo/qseo_logo_w70.png?utm_source=qseo-tools&utm_medium=banner&utm_campaign=qseo-tools-yandex" alt="Качественное продвижение сайтов в сети Интернет"></a></div></div>';

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

function urlAddLr(lr) {
  if(lr == -1) {
    return document.URL.replace(/[\?&]lr=\d+/,''); 
  }

  if(urlParams['lr']) {
    return document.URL.replace(/lr=\d+/,'lr=' + lr);
  } else {
    return document.URL + '&lr=' + lr;
  }
}


window.qseoToolsParse = function(event) {
  
  if(!$(".YaPlaceNumber").length && $(".serp-item_plain_yes").length)  {
  
    $("#yandex-serp-regionlist").remove();
      
    var numdoc = urlParams['numdoc']?urlParams['numdoc']:10,
        p = urlParams['p']?urlParams['p']:1;
    var m = document.cookie.match(new RegExp('[; ]yp=([^\\s;]*)'));
    if (m) {
        m = decodeURIComponent(m[1]).match(new RegExp('nd:([^\\s#]*)'));
        if (m) numdoc = decodeURIComponent('' + m[1][0] + m[1][1] + '')
    }
    
    var b = document.getElementsByClassName('button_checked_yes')[0];
    if (typeof b !== 'undefined') {
        p = parseInt(document.all ? b.innerText : b.textContent)
    }
    var place = (p - 1) * numdoc + 1;
    [].forEach.call(document.querySelectorAll('.serp-item_plain_yes,.z-address'), function(e) {
        if (e.getElementsByClassName('serp-item__label').length == 0) {
          var t = document.createElement('div');
          t.setAttribute('style', 'float: left; margin-left: -24px; padding-top: 13px; text-align: right; width: 24px;');
          t.setAttribute('class', 'YaPlaceNumber');
          t.innerHTML = place + '.';
          e.insertBefore(t, e.firstChild);
          place ++;
        } else {
          e.setAttribute('style', 'background:#ffe5e5')
        }
    });
    
    var regionsListCurrent = '';      
      
    for(key in regionList) {
        
      region = regionList[key].split(':');
      
      str = '<a style="text-decoration: none" href=' + urlAddLr(region[0]) + '>' + region[1] + '</a>';
      if((region[0]=='-1' && urlParams['lr'] == undefined) || (urlParams['lr'] == region[0])) { 
        str = '<strong>' + str + '</strong>'; 
      }
      str = '<div style="line-height: 1.7em">' + str + '</div>';
      regionsListCurrent = regionsListCurrent + str;
    }
      
    regionsListCurrent = regionBlock.replace('[regionlist]',regionsListCurrent);
      
    $(".main__left").prepend($(regionsListCurrent));
      
    $('.serp-adv__block').css('background-color','#FFF8E1');
    $('.t-images, .t-images div, .t-video div, .z-market div, .z-address div, .t-news div').css('background-color','#EDFCFF');
    //$('.div[class^=" t-" div').css('background-color','#EDFCFF');
    $('#yandex-serp-regionlist a.settings').click(function() {
      regionStr = prompt("Настройка списка регионов (формат: id1:name1;id2:name2;id3:name3): ", regionStr);
      GM_setValue('regionStr', regionStr);
    });
      
    window.addEventListener('DOMNodeInserted', qseoToolsParse, false); 
  }
}

window.qseoToolsParse();
