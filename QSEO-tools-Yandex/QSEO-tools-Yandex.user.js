// ==UserScript==
// @name        QSEO-tools-Yandex
// @namespace   http://qseo.ru
// @description  Different SEO Tools and helper functions for Yandex Search engine from qseo.ru 
// @icon          http://qseo.ru/logo/logo_q.svg
// @version     3.1
// @updateURL   https://github.com/Qseo/QSEO-tools-Yandex/raw/master/QSEO-tools-Yandex/QSEO-tools-Yandex.user.js
// @downloadURL https://github.com/Qseo/QSEO-tools-Yandex/raw/master/QSEO-tools-Yandex/QSEO-tools-Yandex.user.js
// @include     http*://yandex.*/yandsearch*
// @include     http*://yandex.*/search*
// @require     http://yastatic.net/jquery/1.8.3/jquery.min.js
// @require     https://raw.githubusercontent.com/carhartl/jquery-cookie/master/src/jquery.cookie.js
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

var regionStr_default = '-1:Автоматически;47:Н.Новгород;213:Москва;2:С-Петербург;11079:Нижегор.обл;972:Дзержинск;20044:Кстово;0:Без региона';

var color_context = '#FFF8E1';
var color_service = '#EDFCFF';
var color_warning = '#ffe5e5';

var regionStr;
var regionBlock = '<div id="qseo-yandex-regionlist" style="font-size: 11px"><div class="region-default">Регион в настройках: <div class="region-name">[regiondefault]</div><br/></div><div class="list-title">Сменить на:</div><div class="list-items">[regionlist]</div><div class="qseo-buttons">[<a class="qseo-update" style="text-decoration: none;" href="#">обновить</a>] [<a class="qseo-settings" style="text-decoration: none;" href="#">настроить</a>]</div>[resultsTotal]<div class="links" style="margin-top: 10px"><a href="http://qseo.ru/?utm_source=qseo-tools&utm_medium=banner&utm_campaign=qseo-tools-yandex" target="_blank" title="Качественное продвижение сайтов в сети Интернет"><img src="http://qseo.ru/logo/qseo_logo_w70.png?utm_source=qseo-tools&utm_medium=banner&utm_campaign=qseo-tools-yandex&utm_content=logo_left" alt="Качественное продвижение сайтов в сети Интернет"></a></div></div>';

var urlParams;


if(typeof GM_getValue == undefined || GM_getValue('regionStr') == null) {
  regionStr = regionStr_default;
}
else {
  regionStr = GM_getValue('regionStr',regionStr_default);
}


window.qseoToolsUpdateUrlParams = function() {
  var match,
    pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query  = window.location.search.substring(1);

  urlParams = {};

  while (match = search.exec(query)) {
    urlParams[decode(match[1])] = decode(match[2]);
  }
};


function urlAddLr(lr) {
  if(lr == -1) {
    return document.URL.replace(/[\?&]lr=\d+/,'');
  }

  if(urlParams['lr']) {
    return document.URL.replace(/lr=\d+/,'lr=' + lr);
  }
  else {
    return document.URL + '&lr=' + lr;
  }
}


function checkSerpBlock(item, check_children) {
  var detected = false;

  if(item.attr('class').search(/images|video|market|address|news/) != -1) {
    detected = true;
  }
  else if(check_children == true) {
    item.children('div').each(function() {
      if($(this).attr('class').search(/images|video|market|address|news/) != -1) {
        detected = true;
        return;
      }
    });
  }

  if(detected) {
    item.css('background-color', color_service);
    item.children('div').css('background-color', color_service);
    item.children('a').css('background-color', color_service);
    item.addClass('exclude');
  }
}

window.qseoToolsParse = function(event, forcecheck) {
  qseoToolsUpdateUrlParams();

  if( (forcecheck == 'undefined' || !forcecheck) && ($(".qseo-place-number").length || !$(".serp-item_plain_yes").length))  {
    return;
  }

  $("#qseo-yandex-regionlist").remove();
  $(".qseo-place-number").remove();

  var numdoc = urlParams['numdoc'] ? urlParams['numdoc'] : 10,
      p = urlParams['p'] ? urlParams['p'] : 0;

  var m = document.cookie.match( new RegExp('[; ]yp=([^\\s;]*)') );

  if (m) {
    m = decodeURIComponent(m[1]).match(new RegExp('nd:([^\\s#]*)'));

    if (m) {
      numdoc = decodeURIComponent('' + m[1][0] + m[1][1] + '')
    }
  }

  var b = document.getElementsByClassName('button_checked_yes')[0];

  if (typeof b !== 'undefined') {
    p = parseInt(document.all ? b.innerText : b.textContent)
  }

  var place = p * numdoc + 1;

  [].forEach.call(document.querySelectorAll('.serp-item,.z-address'), function(e) {
    if (e.className.search(/images|video|market|address|news|companies/) == -1 && e.getElementsByClassName('serp-adv-item__label').length == 0 && e.getElementsByClassName('serp-item__greenurl').length != 0 ) {
      if (e.getElementsByClassName('serp-item__label').length == 0) {
        var t = document.createElement('div');

        t.setAttribute('style', 'float: left; margin-left: -47px; padding-top: 5px; text-align: right; width: 24px;');
        t.setAttribute('class', 'qseo-place-number');
        t.innerHTML = place + '.';
        e.insertBefore(t, e.firstChild);
        place++;
      }
      else {
        e.setAttribute('style', 'background-color: ' + color_warning);
      }
    }
  });

  if(regionStr) {
    var regionList = regionStr.split(';');

    var regionListKeys = [];

    var regionsListCurrent = '';

    var YaCookieRegion = $.cookie('yandex_gid');

    for(key in regionList) {
      if(!regionList[key]) continue;

      region = regionList[key].split(':');
      regionListKeys[region[0]] = region[1];

      str = '<a style="text-decoration: none" href=' + urlAddLr(region[0]) + '>' + region[1] + '</a>';

      if((region[0]=='-1' && urlParams['lr'] == undefined) || (urlParams['lr'] == region[0])) {
        str = '<div style="background: #FFF8DC; display: table-cell"><strong>' + str + '</strong>';

        if(YaCookieRegion != region[0]) {
          str = str + '<br/>[<a id="qseo-region-save" class="' + region[0] + '" href="#">Запомнить</a>]';
        }

        str = str + '</div>';
      }

      str = '<div style="line-height: 1.7em">' + str + '</div>';
      regionsListCurrent = regionsListCurrent + str;
    }

    regionsListCurrent = regionBlock.replace('[regionlist]',regionsListCurrent);
  }
  else {
    regionsListCurrent = regionBlock.replace('[regionlist]','[не настроено]');
  }

  if(YaCookieRegion) {
    if(regionListKeys[YaCookieRegion]) {
      YaCookieRegion = regionListKeys[YaCookieRegion];
    }
    else {
      YaCookieRegion = "id " + YaCookieRegion;
    }

    regionsListCurrent = regionsListCurrent.replace('[regiondefault]',  YaCookieRegion);
  }
  else {
    regionsListCurrent = regionsListCurrent.replace('[regiondefault]',  'Авто');
  }

  var resultsTotal = $(".input__found").text();

  if(resultsTotal) {
    resultsTotal = resultsTotal.replace(/[^\s]+\s/,"");
    regionsListCurrent = regionsListCurrent.replace("[resultsTotal]", "<div class='qseo-results-total'>" + resultsTotal + "</div>");
  }
  else {
    regionsListCurrent = regionsListCurrent.replace("[resultsTotal]","");
  }

  $(".main__left").prepend($(regionsListCurrent));

  $('.serp-adv-item__label').parents('.serp-item').css('background-color', color_context);
  $('.serp-item__wrap').each(function() { checkSerpBlock($(this), true); });
  $('.serp-item').each(function() { checkSerpBlock($(this),false); });

  $('#qseo-yandex-regionlist a.qseo-settings').click(function() {
    regionStr = prompt("Настройка списка регионов (формат: id1:name1;id2:name2;id3:name3): ", regionStr);
    GM_setValue('regionStr', regionStr);
  });

  $('#qseo-yandex-regionlist a.qseo-update').click(function() {
    window.qseoToolsParse(event,true);
  });

  $('#qseo-region-save').click(function() {
    var saveRegionId = $(this).attr("class");

    $.cookie('yandex_gid', saveRegionId, {path: "/", domain: "yandex.ru"});
    $(this).text('Запомнено');
    $('.region-default .region-name').text($(this).parent().children('strong').text());
  });

};


window.qseoToolsParse();

setTimeout(function() { window.qseoToolsParse(false, true);  }, 3000);

$('.main__center').get(0).addEventListener('DOMNodeInserted', qseoToolsParse, false);
