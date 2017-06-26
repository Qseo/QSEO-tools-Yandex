# QSEO-tools-Yandex

Different SEO Tools and helper functions for Yandex Search engine (UserScript) from qseo.ru

- Shows result numbers in Yandex search result pages
- Adds links for quick switching geo region
- Highlight Yandex advertising and services blocks in search result items

Copyright
------------------------

Author: Alexey Murz Korepov

E-mail: seo@qseo.ru

Official page: https://info.qseo.ru/technologies/internet-marketing/serp-position-numbers/yandex

Description in Russian
========================

Инструменты SEO для Яндекса и вспомогательные функции (UserScript) от компании Qseo.ru

- Добавляет номера результатов поиска в выдаче яндекса
- В левой колонке добавляется переключалка регионов (список регионов пока жестко задается в коде скрипта, потом возможно вынесу в настройки)
- Блоки Яндекс.Директ выделяются желтым фоном
- Сервисы Яндекса (Карты, Маркет, Фото, Видео, Новости) выделяются голубым фоном

Установка:
------------------------

Данный скрипт должен работать во всех современных браузерах:

- Mozilla Firefox: предварительно нужно установить расширение GreaseMonkey https://addons.mozilla.org/ru/firefox/addon/greasemonkey/
- Google Chrome: не требует установки специальных плагинов/расширений, для расширенных настроек можно использовать Tampermonkey https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo
- Internet Explorer: IE7, IE8, IE9 поддерживают юзерскрипты при использовании плагинов Trixie http://www.bhelpuri.net/Trixie/Trixie/ и IE7Pro http://www.ie7pro.com/
- Подробнее о поддержке браузерами UserScripts можете прочитать здесь: http://habrahabr.ru/post/129454/

После этого перейти по ссылке: https://github.com/Qseo/QSEO-tools-Yandex/raw/master/QSEO-tools-Yandex/QSEO-tools-Yandex.user.js
и согласиться с установкой плагина, перезагружать браузер не требуется.

После этого на страницах Яндекса должны появиться дополнительные элементы.

Отключение и удаление:
------------------------

- перейти в список UserScripts, отключить или удалить скрипт с названием QSEO-tools-Yandex

**P.S.**

*Изначально скрипт был разработан для личных нужд компании qseo.ru, но в процессе доработок принято решение поделиться этими наработками с обществом SEO-специалистов.*

*При изменении Яндексом шаблона страниц или других обновлениях со временем какие-то функции возможно перестанут работать, поэтому потребуется обновление скрипта. Постараемся своевременно замечать эти изменения, находить обходные решения  и выпускать новые версии. Найденные баги и предложения можете сообщать через GitHub issue tracker.*


Changelog
---------

2017-07-20 - версия 3.3. Исправлена нумерация блоков после изменения выдачи Яндекса.

2016-07-04 - версия 3.2. Исправлена нумерация блоков после изменения выдачи Яндекса.

2016-03-01 - версия 3.1. Исправление багов.

2016-03-01 - версия 3.0. Исправление багов.

2016-03-01 - версия 2.9. Исправлена нумерация блоков после изменения выдачи Яндекса.

2015-11-05 - версия 2.8. Исключено попадание блоков Яндекс.Директ в нумерацию позиций выдачи. Исправлена ошибка с неверной нумерацией, при навигации по страницам выдачи.

2015-08-18 - версия 2.7. Исправлена позиция номера выдачи, ускорена скорость загрузки страницы (объединен jquery с Яндексовским).

2014-07-16 - версия 2.6. Исправлена работа с новой версией выдачи Яндекса (изменился урл поиска). Исправлено отображение кол-ва "всего результатов", теперь через 3 секунды после открытия страницы пересчитывает. Добавлена кнопка "обновить" для принудительного обновления информации.

2014-03-18 - версия 2.5. Добавлен вывод кол-ва результатов под список регионов, т.к. для длинных запросов Яндекс его не показывает. Пока не всегда срабатывает при первом запросе, но если заново нажать "найти" на странице, то выводит.

2014-03-05 - версия 2.4. Небольшие оптимизации скорости работы скрипта

2014-02-27 - версия 2.3. Починена работа в Google Chrome

2014-02-04 - версия 2.2. Переработан принцип поиска блоков яндекса в выдаче

2014-02-04 - версия 2.1. Добавлена раскраска ещё некоторых типов блоков новостей, карты

2014-01-29 - версия 2.0. Добавлен вывод региона из настроек Яндекса и возможность сохранять новых регион в настройки Яндекса.

2014-01-27 - версия 1.9. Добавлена работа с Яндексом по https протоколу.

2014-01-21 - версия 1.8. Первая публичная версия.


Скриншот с примером работы скрипта:
------------------------
![Скриншот с примером работы скрипта](https://github.com/Qseo/QSEO-tools-Yandex/raw/master/qseo-tools-yandex-screenshot.png)
