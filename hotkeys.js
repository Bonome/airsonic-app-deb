module.exports = function(mw){
          var globalShortcut = require('electron').globalShortcut;
          var playPause = function(){
              mw.webContents.executeJavaScript("if(window.parent.frames.playQueue.document.querySelector('#audioPlayer').paused) {window.parent.frames.playQueue.document.querySelector('#audioPlayer').play();}else{window.parent.frames.playQueue.document.querySelector('#audioPlayer').pause();}");
          };
          var next = function(){
              mw.webContents.executeJavaScript("parent.frames.playQueue.onNext();");
          }
          var previous = function(){
              mw.webContents.executeJavaScript("parent.frames.playQueue.onPrevious();");
          };
          globalShortcut.register('ctrl+shift+super+end', playPause);
          globalShortcut.register('ctrl+shift+option+end', playPause);
          globalShortcut.register('ctrl+shift+insert', previous);
          globalShortcut.register('ctrl+shift+home', next);
};

