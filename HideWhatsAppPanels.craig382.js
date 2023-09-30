// ==UserScript==
// @name         Hide WhatsApp Panels
// @namespace    craig382
// @version      0.1
// @description  Add button and hotkey Ctrl + Shift + H to hide contact names on web.whatsapp.com
// @author       Craig Veiner
// @match        https://web.whatsapp.com/
// @icon         https://i.imgur.com/LeZuNg7.png
// @grant        none
// ==/UserScript==

// Based on Whatsapp Web Privacy Mode script by Graphen.

/* jshint esversion: 6 */
(function() {
    'use strict';
    var hidden = false;
    var defaultbkg = 'lightgrey';
    var prevName = '';

    waitForId('side').then(el => {
      //console.log(el);
    });
    function waitForId(id, nodeToObserve = document) {
      const el = document.getElementById(id);
      return el ?
        Promise.resolve(el) :
        new Promise(resolve => {
          new MutationObserver((mutations, observer) => {
            const el = document.getElementById(id);
            if (el) {
              // add Ctrl + Shift + H shortcut
              document.addEventListener("keydown", function(e) {
                  if(e.ctrlKey && e.shiftKey && e.code === 'KeyH') {
                      toggleShowHide();
                  }
              }, false);
              // add Button
              addButton('Hide', toggleShowHide);
              observer.disconnect();
              resolve(el);
            }
          }).observe(nodeToObserve, {childList: true, subtree: true});
        });
    }

    function addButton(text, onclick, cssObj) {
        cssObj = cssObj || {position: 'absolute', top: '15px', left:'70px', 'z-index': 5000, 'font-weight':'bold', border:'black solid', 'border-radius':'10px',
                            padding:'4px', 'background-color': defaultbkg, 'min-width': '75px', 'box-shadow':'grey 3px 3px 0px 0px'};
        let button = document.createElement('button'), btnStyle = button.style;

      try{
        document.getElementById('app').appendChild(button);
      }
      catch(err){
        console.log("addButton: " + err);
      }
        button.innerHTML = text;
        button.onclick = onclick;
        button.classList = ['show-hide-btn unpressed'];

        button.onmouseover = function() {
            button.style["background-color"] = 'salmon';
        };
        button.onmouseout = function() {
            button.style["background-color"] = defaultbkg;
        };
        Object.keys(cssObj).forEach(key => btnStyle[key] = cssObj[key]);
        return button;
    }

    function toggleShowHide() {
        var btn = document.getElementsByClassName('show-hide-btn')[0];
        var panel = document.getElementById('pane-side');
        console.log("panel");
        console.log(panel);
        const side = document.getElementById('side');
        console.log("side");
        console.log(side);
        const main = document.getElementById('main');
        console.log("main");
        console.log(main);
//        const chatPanel = document.querySelector('#app > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(4)');
        const chatPanel = document.querySelector('#app > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > span');
        console.log("chatPanel");
        console.log(chatPanel); // looking for class="_2Ts6i _3RGKj _318SY"
//        const defaultSideDisplay = side.style.display;
//        var chatname = document.querySelector('#main > header > div:nth-of-type(2) > div:nth-of-type(1) > div > span');
//        var groupsubheadline = document.querySelector('#main > header > div:nth-of-type(2) > div:nth-of-type(2) > span');
//        var partnerimage = document.querySelector('#main > header > div:nth-of-type(1) > div:nth-of-type(1) > img');
        //console.log(btn);

        if (hidden) {
            // show
            //console.log("WA Privacy: Toggled show.");
//            chatPanel.setAttribute('style', 'filter:none');
            chatPanel.style.width = "250px";
//            side.style.width = "250px";
//            main.style.marginLeft = "250px";
//            side.style.width = "250px";
//            side.setAttribute('style', 'filter:none');
//            panel.setAttribute('style', 'filter:none');
            defaultbkg = 'lightgrey';
            btn.innerHTML = 'Hide';
            btn.style.left = '70px';
            btn.style.top = '15px';
            btn.style["box-shadow"] = 'grey 3px 3px 0px 0px';
            prevName = '';
        } else {
            // hide
            //console.log("WA Privacy: Toggled hide.");
//            panel.setAttribute('style', 'filter:blur(10px);');
//            panel.setAttribute('style', 'display:none;');
//            chatPanel.style.display = 'none';
//            chatPanel.style.width = "0";
//            side.style.display = 'none';
//            side.style.width = "0";
//            panel.style.display = 'none';
            chatPanel.style.width = "0";
//            side.style.width = "0";
//            main.style.marginLeft = "0";
            defaultbkg = 'grey';
            btn.innerHTML = 'Show';
            btn.style.left = '73px';
            btn.style.top = '18px';
            btn.style["box-shadow"] = '';
        }
        document.getElementsByClassName('show-hide-btn')[0].style["background-color"] = defaultbkg;
        hidden = !hidden;
    }
})();
