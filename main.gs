function doPost(e) {
  var estringa = JSON.parse(e.postData.contents);
  var payload = identificar(estringa);
  var data = {
    "method": "post",
    "payload": payload
  }
  var tgBotkey = "114514:APIKey_kEY";
  var rtn = JSON.parse(UrlFetchApp.fetch("https://api.telegram.org/bot" + tgBotkey + "/", data));

  //debug
  var payload = {
    "method": "sendMessage",
    "chat_ID": "405582582",
    "text": "DEBUG" // + e.postData.contents.toString()
  }

  //----------------------------------

  //String.prototype.delending = function (ending){
  //  var l = ending.length; 
  //  if (this.substr(-l) == ending) return this.substring(0, this.length - l);
  //  return this;  
  //}

  function delEnding(str, ending) {
    var l = ending.length;
    if (str.substr(-l) == ending) return str.substring(0, str.length - l);
    return str;
  }

  function isJapanese(t) {
    var pHiragana = "[\\u3041-\\u3096\\u309D-\\u309F]|\\uD82C\\uDC01|\\uD83C\\uDE00";
    var pKatakana = "[\\u30A1-\\u30FA\\u30FD-\\u30FF\\u31F0-\\u31FF\\u32D0-\\u32FE\\u3300-\\u3357\\uFF66-\\uFF6F\\uFF71-\\uFF9D]|\\uD82C\\uDC00";
    var pHan = "[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uF900-\\uFA6D\\uFA70-\\uFAD9]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1]|\\uD87E[\\uDC00-\\uDE1D]";
    var rx = new RegExp("^([" + pHiragana + "|" + pKatakana + "|" + pHan + ")+$");
    return rx.test(t);
  }

  function Manchurize(str) {
    var tmp = "";
    if (str.length > 0) {
      for (var i = 0; i < str.length; i++) {
        var val = str.charAt(i);
        var prev = " ";
        if (i > 0) {
          prev = str.charAt(i - 1);
        }
        if (val == "a") {
          tmp += "ᠠ";
        } else if (val == "e") {
          tmp += "ᡝ";
        } else if (val == "i") {
          tmp += "ᡳ";
        } else if (val == "o") {
          tmp += "ᠣ";
        } else if (val == "u") {
          tmp += "ᡠ";
        } else if (val == "v") {
          tmp += "ᡡ";
        } else if (val == "@") {
          tmp += "ᡡ";
        } else if (val == "n") {
          tmp += "ᠨ";
        } else if (val == "N") {
          tmp += "ᠩ";
        } else if (val == "b") {
          tmp += "ᠪ";
        } else if (val == "p") {
          tmp += "ᡦ";
        } else if (val == "x") {
          tmp += "ᡧ";
        } else if (val == "S") {
          tmp += "ᡧ";
        } else if (val == "k") {
          tmp += "ᡴ";
        } else if (val == "g") {
          if (prev == "ᠨ" || prev == "n") {
            tmp = tmp.substring(0, tmp.length - 1);
            tmp += "ᠩ";
          } else {
            tmp += "ᡤ";
          }
        } else if (val == "h") {
          tmp += "ᡥ";
        } else if (val == "m") {
          tmp += "ᠮ";
        } else if (val == "l") {
          tmp += "ᠯ";
        } else if (val == "t") {
          tmp += "ᡨ";
        } else if (val == "d") {
          tmp += "ᡩ";
        } else if (val == "s") {
          if (prev == "ᡨ" || prev == "t") {
            tmp = tmp.substring(0, tmp.length - 1);
            tmp += "ᡮ";
          } else {
            tmp += "ᠰ";
          }
        } else if (val == "c") {
          tmp += "ᠴ";
        } else if (val == "j") {
          tmp += "ᠵ";
        } else if (val == "y") {
          tmp += "ᠶ";
        } else if (val == "r") {
          tmp += "ᡵ";
        } else if (val == "w") {
          tmp += "ᠸ";
        } else if (val == "f") {
          tmp += "ᡶ";
        } else if (val == "K") {
          tmp += "ᠺ";
        } else if (val == "G") {
          tmp += "ᡬ";
        } else if (val == "H") {
          tmp += "ᡭ";
        } else if (val == "J") {
          tmp += "ᡷ";
        } else if (val == "C") {
          tmp += "ᡱ";
        } else if (val == "R") {
          tmp += "ᡰ";
        } else if (val == "z") {
          if (prev == "ᡩ" || prev == "d") {
            tmp = tmp.substring(0, tmp.length - 1);
            tmp += "ᡯ";
          } else {
            tmp += "z";
          }
        } else if (val == "'") {
          tmp += "\u180B";
        } else if (val == "\"") {
          tmp += "\u180C";
        } else if (val == "`") {
          tmp += "\u180D";
        } else if (val == "_") {
          tmp += "\u180E";
        } else if (val == "-") {
          tmp += "\u202F";
        } else if (val == "*") {
          tmp += "\u200D";
        } else {
          tmp += val;
        }
      }
    }
    return tmp;
  }

  //function io(m){
  //document.write("<div class=mw>"+Manchurize(m)+"</div>");
  //}
  //io ("neko");
  //
  //io ("\
  //giyan serengge niyalma-i xan yasa.\
  //ilibume muteburengge abka de tafara gese mangga, ebereme efujerengge funiyehe dara gese ja.\
  //giyan de ijis’hun ningge gung bahambi, giyan de fadarahangge de ehe be tuxambi.\
  //");


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
        "sticker": 'CAADBQADCgIAAgsiPA6YQhC2cRBPowI' //e.message.sticker.file_id
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
    if (i == "/start") return "I am a Telegram dictionary bot made by @OverflowCat, with dictionary data powered by @Yandex. Github repo see https://github.com/OverflowCat/Forwords";
    if (i == "/help") return "Just send me a word.";
    if (i.search("/debug ") != -1) {
      i = i.substring(7);
      var isDebugging = true;
    } else {
      if (isJapanese(i)) {
        var srcLang = "jp";

      } else {
        var srcLang = "en";
        if (!isDebugging) {
          if (!(/^[a-zA-Z]+$/.test(i))) return "I can only deal with one single English word at present.";
          if (i.length >= 32) return "The word seems too long :|";
        }
      }
    }

    //var yandexStylish = "";

    //fetch Yandex Dict
    var yandexAPIkey = "dict.1.1.1145141919810";
    var lang = "en-en";
    srcLang = "jp" ? lang = "en-en" : lang = "jp-en";
    var res = UrlFetchApp.fetch("https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=" + yandexAPIkey + "&lang=" + lang + "&text=" + i);
    var yandex = res.getContentText();

    if (isDebugging) return yandex;
    if (yandex == '{"head":{},"def":[]}') return "No definition found in the dictionary.";
    //var yandex = '{"head":{},"def":[{"text":"do","pos":"verb","ts":"duː","fl":"did, done","tr":[{"text":"execute","pos":"verb","syn":[{"text":"achieve","pos":"verb"},{"text":"fulfil","pos":"verb"},{"text":"accomplish","pos":"verb"},{"text":"carry","pos":"verb"},{"text":"perform","pos":"verb"},{"text":"fulfill","pos":"verb"},{"text":"effectuate","pos":"verb"}]},{"text":"doeth","pos":"noun","syn":[{"text":"dress","pos":"noun"}]},{"text":"commit","pos":"verb","syn":[{"text":"perpetrate","pos":"verb"},{"text":"do away","pos":"verb"}]},{"text":"act","pos":"noun","syn":[{"text":"function","pos":"noun"},{"text":"fiddle","pos":"noun"}]},{"text":"engage","pos":"verb","syn":[{"text":"engage in","pos":"verb"},{"text":"go in","pos":"verb"},{"text":"draw","pos":"verb"},{"text":"work over","pos":"verb"}]},{"text":"will make","pos":"verb","syn":[{"text":"pass","pos":"verb"},{"text":"proceed","pos":"verb"},{"text":"come down","pos":"verb"},{"text":"befall","pos":"verb"}]},{"text":"deal","pos":"noun","syn":[{"text":"work","pos":"noun"},{"text":"affair","pos":"noun"},{"text":"duty","pos":"noun"},{"text":"event","pos":"noun"}]},{"text":"create","pos":"verb","syn":[{"text":"produce","pos":"verb"},{"text":"generate","pos":"verb"},{"text":"beget","pos":"verb"}]},{"text":"play","pos":"verb","syn":[{"text":"behave","pos":"verb"},{"text":"serve","pos":"verb"}]},{"text":"arrange","pos":"verb","syn":[{"text":"set","pos":"verb"},{"text":"make out","pos":"verb"}]},{"text":"exercise","pos":"noun","syn":[{"text":"charge","pos":"noun"},{"text":"commitment","pos":"noun"}]},{"text":"practise","pos":"verb"},{"text":"occur","pos":"verb","syn":[{"text":"come about","pos":"verb"},{"text":"transpire","pos":"verb"}]},{"text":"need","pos":"noun","syn":[{"text":"order","pos":"noun"},{"text":"command","pos":"noun"}]},{"text":"cope","pos":"verb","syn":[{"text":"manage","pos":"verb"},{"text":"get by","pos":"verb"}]},{"text":"cause","pos":"verb","syn":[{"text":"prosecute","pos":"verb"},{"text":"invoke","pos":"verb"},{"text":"bring on","pos":"verb"}]},{"text":"progress","pos":"noun","syn":[{"text":"advance","pos":"noun"}]},{"text":"get on","pos":"verb"},{"text":"cook","pos":"verb","syn":[{"text":"cut","pos":"verb"},{"text":"put through","pos":"verb"}]},{"text":"stick","pos":"noun","syn":[{"text":"whip","pos":"noun"}]},{"text":"practice","pos":"noun"},{"text":"enrich","pos":"verb","syn":[{"text":"beautify","pos":"verb"}]},{"text":"portray","pos":"verb","syn":[{"text":"impersonate","pos":"verb"},{"text":"imitate","pos":"verb"}]},{"text":"answer","pos":"noun","syn":[{"text":"curry","pos":"noun"}]},{"text":"result","pos":"noun"},{"text":"bother","pos":"verb"},{"text":"pretty","pos":"noun"},{"text":"hap","pos":"noun"}]}]}';
    //'{"head":{},"def":[{"text":"telegram","pos":"noun","ts":"ˈtelɪgræm","tr":[{"text":"cablegram","pos":"noun","syn":[{"text":"wire","pos":"noun"},{"text":"cable","pos":"noun"}]},{"text":"despatch","pos":"noun","syn":[{"text":"dispatch","pos":"noun"}]}]}]}';
    var j = JSON.parse(yandex);
    var o = "";
    j.def.forEach(function (def) {
      o += ("<b>" + def.text + "</b>  <i>" + def.pos + ".</i>  " + "📢 /" + def.ts + "/     ");
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
        o = delEnding(o, ", ");
        //SYN END
      });
    });
    return o;
  }
}
