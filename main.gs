function doPost(e) {
  var estringa = JSON.parse(e.postData.contents);
  var payload = identificar(estringa);
  var data = {
    "method": "post",
    "payload": payload
  }
  var tgBotkey = "114514:YOURBOTtoken";
  var rtn = JSON.parse(UrlFetchApp.fetch("https://api.telegram.org/bot" + tgBotkey + "/", data));

  //debug
  var payload = {
    "method": "sendMessage",
    "chat_ID": "405582582",
    "text": "DEBUG" // + e.postData.contents.toString()
  }

  //----------------------------------

  function identificar(e) {
    cid = e.message.chat.id;
    if (e.message.text) {

      var mensaje = {
        "method": "sendMessage",
        "parse_mode": "HTML",
        "chat_id": cid,
        "text": getDict(e.message.text)
      }
    } else if (e.message.sticker) {
      var mensaje = {
        "method": "sendSticker",
        "chat_id": e.message.chat.id,
        "sticker": e.message.sticker.file_id
      }
    } else if (e.message.photo) {
      var array = e.message.photo;
      var text = array[1];
      var mensaje = {
        "method": "sendPhoto",
        "chat_id": e.message.chat.id,
        "photo": text.file_id
      }
    } else {
      var mensaje = {
        "method": "sendMessage",
        "chat_id": e.message.chat.id,
        "text": "Send me a word plz - -"
      }
    }

    return mensaje;
  }

  function getDict(i) {
    if (i.search("/debug ") != -1) {
      i = i.substring(7);
      var isDebugging = true;
    } else {
      if (!(/^[a-zA-Z]+$/.test(i))) return "I can only deal with one single English word at present.";
      if (i.length >= 32) return "The word seems too long :|";
    }
    //var yandexStylish = "";

    //fetch Yandex Dict
    var yandexAPIkey = "dict.1.1.114514.1145141919810.YandexAPIKey";
    var res = UrlFetchApp.fetch("https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=" + yandexAPIkey + "&lang=en-en&text=" + i);
    var yandex = res.getContentText();

    if (isDebugging) return yandex;
    //var yandex = '{"head":{},"def":[{"text":"do","pos":"verb","ts":"duː","fl":"did, done","tr":[{"text":"execute","pos":"verb","syn":[{"text":"achieve","pos":"verb"},{"text":"fulfil","pos":"verb"},{"text":"accomplish","pos":"verb"},{"text":"carry","pos":"verb"},{"text":"perform","pos":"verb"},{"text":"fulfill","pos":"verb"},{"text":"effectuate","pos":"verb"}]},{"text":"doeth","pos":"noun","syn":[{"text":"dress","pos":"noun"}]},{"text":"commit","pos":"verb","syn":[{"text":"perpetrate","pos":"verb"},{"text":"do away","pos":"verb"}]},{"text":"act","pos":"noun","syn":[{"text":"function","pos":"noun"},{"text":"fiddle","pos":"noun"}]},{"text":"engage","pos":"verb","syn":[{"text":"engage in","pos":"verb"},{"text":"go in","pos":"verb"},{"text":"draw","pos":"verb"},{"text":"work over","pos":"verb"}]},{"text":"will make","pos":"verb","syn":[{"text":"pass","pos":"verb"},{"text":"proceed","pos":"verb"},{"text":"come down","pos":"verb"},{"text":"befall","pos":"verb"}]},{"text":"deal","pos":"noun","syn":[{"text":"work","pos":"noun"},{"text":"affair","pos":"noun"},{"text":"duty","pos":"noun"},{"text":"event","pos":"noun"}]},{"text":"create","pos":"verb","syn":[{"text":"produce","pos":"verb"},{"text":"generate","pos":"verb"},{"text":"beget","pos":"verb"}]},{"text":"play","pos":"verb","syn":[{"text":"behave","pos":"verb"},{"text":"serve","pos":"verb"}]},{"text":"arrange","pos":"verb","syn":[{"text":"set","pos":"verb"},{"text":"make out","pos":"verb"}]},{"text":"exercise","pos":"noun","syn":[{"text":"charge","pos":"noun"},{"text":"commitment","pos":"noun"}]},{"text":"practise","pos":"verb"},{"text":"occur","pos":"verb","syn":[{"text":"come about","pos":"verb"},{"text":"transpire","pos":"verb"}]},{"text":"need","pos":"noun","syn":[{"text":"order","pos":"noun"},{"text":"command","pos":"noun"}]},{"text":"cope","pos":"verb","syn":[{"text":"manage","pos":"verb"},{"text":"get by","pos":"verb"}]},{"text":"cause","pos":"verb","syn":[{"text":"prosecute","pos":"verb"},{"text":"invoke","pos":"verb"},{"text":"bring on","pos":"verb"}]},{"text":"progress","pos":"noun","syn":[{"text":"advance","pos":"noun"}]},{"text":"get on","pos":"verb"},{"text":"cook","pos":"verb","syn":[{"text":"cut","pos":"verb"},{"text":"put through","pos":"verb"}]},{"text":"stick","pos":"noun","syn":[{"text":"whip","pos":"noun"}]},{"text":"practice","pos":"noun"},{"text":"enrich","pos":"verb","syn":[{"text":"beautify","pos":"verb"}]},{"text":"portray","pos":"verb","syn":[{"text":"impersonate","pos":"verb"},{"text":"imitate","pos":"verb"}]},{"text":"answer","pos":"noun","syn":[{"text":"curry","pos":"noun"}]},{"text":"result","pos":"noun"},{"text":"bother","pos":"verb"},{"text":"pretty","pos":"noun"},{"text":"hap","pos":"noun"}]}]}';
    //'{"head":{},"def":[{"text":"telegram","pos":"noun","ts":"ˈtelɪgræm","tr":[{"text":"cablegram","pos":"noun","syn":[{"text":"wire","pos":"noun"},{"text":"cable","pos":"noun"}]},{"text":"despatch","pos":"noun","syn":[{"text":"dispatch","pos":"noun"}]}]}]}';
    var j = JSON.parse(yandex);
    var o = "";
    j.def.forEach(function (def) {
      o += ("<b>" + def.text + "</b>   " + def.pos + ".  " + "📢 /" + def.ts + "/     ");
      if (def.hasOwnProperty("fl")) o += " (" + def.fl + ") ";
      var i = 1;
      def.tr.forEach(function (meaning) {
        o += "&#10;" + (i++) + ". <b>" + meaning.text + "</b>";

        //DEAL WITH SYN
        //Not all meanings contain a "syn".
        if (meaning.hasOwnProperty("syn")) {
          o += ": ";

          meaning.syn.forEach(function (syn) {
            o += syn.text + ", ";
          });
        }
        //SYN END
      });
      //o += ";  ";
    });
    //   if (o.substr(- 3, ) == ",  "){
    //   o = o.substring(0, str.length - 3);
    //   }

    return o;
  }

}
