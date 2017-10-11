module.exports = function(mw){
          
          var globalShortcut = require('electron').globalShortcut;
          var Menu = require('electron').Menu;
          var Tray = require('electron').Tray;
	  var path = require('path');
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
          
          var contextMenu = Menu.buildFromTemplate([
                  {label: 'Airsonic'},
                  {label: 'Pause', click: function () {
                      playPause();
                  }},
          ]);

          tray = new Tray(path.join(__dirname, '../../../../logo.png'));
          tray.setToolTip('Airsonic');
          tray.setContextMenu(contextMenu);
          tray.on('click', () => {
              mw.show();
          });
          tray.setHighlightMode('always');
          mw.on('page-title-updated', function (e, title) {
	      var contextMenu = Menu.buildFromTemplate([
                  {label: title},
                  {label: 'Play#Pause', click: function () {
                      playPause();
                  }},
               ]);
		  tray.setContextMenu(contextMenu);

	      Menu.setApplicationMenu(contextMenu);
              tray.setToolTip(title);
          });
};

