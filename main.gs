function doPost(e){
  var estringa = JSON.parse(e.postData.contents);
  var payload = identificar(estringa);
  var data = {
    "method": "post",
    "payload": payload
  }
  var tgBotkey = "114514:APIKEY";
  var rtn = JSON.parse(UrlFetchApp.fetch("https://api.telegram.org/bot" + tgBotkey + "/", data));

  //debug
  var payload = {
  "method": "sendMessage",
  "chat_ID": "405582582",
  "text": "DEBUG"// + e.postData.contents.toString()
  }

//----------------------------------

function identificar(e){
  cid = e.message.chat.id;
  if (e.message.text){
  
  var mensaje ={
  "method":"sendMessage",
  "chat_id": cid,
  "text": getDict(e.message.text)
  }
  } else if (e.message.sticker){
    var mensaje = {
      "method": "sendSticker",
      "chat_id": e.message.chat.id,
      "sticker": e.message.sticker.file_id
    }
   }
  else if (e.message.photo){
    var array = e.message.photo;
    var text = array[1];
    var mensaje = {
      "method": "sendPhoto",
      "chat_id": e.message.chat.id,
      "photo": text.file_id
    }
   }
    else {
    var mensaje = {
      "method": "sendMessage",
      "chat_id": e.message.chat.id,
      "text": "Send me a word plz - -"
    }
   }
     
  return mensaje;
}

function getDict(i){
  if (!(/^[a-zA-Z]+$/.test(i))) return "I can only deal with one single English word at present.";
  if (i.length >= 32) return "The word seems too long :|";
  
  //fetch Yandex Dict
  
  var yandexAPIkey = "dict.1.1.1145141919810:APIKEY"; 
  var res = UrlFetchApp.fetch("https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=" + yandexAPIkey + "&lang=en-en&text=" + i);
  var yandex = res.getContentText();
  
  return yandex;
}

}
