// ==UserScript==
// @name         Hide WhatsApp Panels
// @namespace    craig382
// @version      0.1
// @description  Add button and hotkey Ctrl + Shift + H to hide side or main panel on web.whatsapp.com.
// @author       Craig Veiner
// @match        https://web.whatsapp.com/
// @icon         https://i.imgur.com/LeZuNg7.png
// @grant        none
// ==/UserScript==

// Based on Whatsapp Web Privacy Mode script by Graphen.
/* jshint esversion: 6 */

(function() {
    'use strict';
    const sidePanelHeight = "45%";
    const bothPanelsVisible = 0;
    const mainPanelVisible = 1;
    const sidePanelVisible = 2;
    var visiblePanel = bothPanelsVisible;  // must equal 0, 1, or 2 (both, main, or side)
    var topContainer1;
    var topContainer2;
    var sidePanel;
    var mainPanel;
    var bottomPanel;
    var popOutPanel;
    var defaultbkg = 'lightgrey';

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
                      showPanel();
                  }
              }, false);
              // add Button
              initCss();
              addButton('Both', showPanel);
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

    function initCss() {
      topContainer1 = document.querySelector('._1jJ70');
      // console.log("topContainer1"); console.log(topContainer1);
      topContainer2 = document.querySelector('._2QgSC');
      // console.log("topContainer2"); console.log(topContainer2);
      sidePanel = document.getElementsByClassName('_3RGKj')[1];
      // console.log("sidePanel"); console.log(sidePanel);
      mainPanel = document.getElementsByClassName('_2xAQV')[1];
      // console.log("mainPanel"); console.log(mainPanel);
      bottomPanel = document.getElementsByClassName('_1xFRo')[0];
      // console.log("bottomPanel"); console.log(bottomPanel);
      popOutPanel = document.getElementsByClassName('_3RGKj')[0];
      // console.log("popOutPanel"); console.log(popOutPanel);

      topContainer1.style.setProperty('flex-direction', 'column');
      topContainer1.style.setProperty('min-width', '400px');

      topContainer2.style.setProperty('flex-direction', 'column');
      
      sidePanel.style.setProperty('max-width', '100%');
      sidePanel.style.setProperty('flex-basis', sidePanelHeight);
      sidePanel.style.setProperty('width', '100%');
      sidePanel.style.setProperty('height', sidePanelHeight);

      mainPanel.style.setProperty('display', 'flex');
      mainPanel.style.setProperty('flex-direction', 'column');

      bottomPanel.style.setProperty('display', 'none');

      popOutPanel.style.setProperty('max-width', '100%');
      popOutPanel.style.setProperty('flex-basis', '100%');

    }

    function showPanel() {
      var btn = document.getElementsByClassName('show-hide-btn')[0];
      visiblePanel = (visiblePanel + 1) % 3;
      // console.log("visiblePanel: " + visiblePanel);
      switch(visiblePanel){
        case bothPanelsVisible:
          btn.innerHTML = 'Both';
          btn.style["box-shadow"] = 'grey 3px 3px 0px 0px';
          defaultbkg = 'lightgrey';
          btn.style.left = '70px';
          btn.style.top = '15px';
          sidePanel.style.setProperty('height', sidePanelHeight);
          sidePanel.style.setProperty('display', 'flex');
          mainPanel.style.setProperty('display', 'flex');
      break;
        case mainPanelVisible:
          btn.innerHTML = 'Main';
          btn.style["box-shadow"] = '';
          defaultbkg = 'grey';
          btn.style.left = '73px';
          btn.style.top = '18px';
          sidePanel.style.setProperty('display', 'none');
          mainPanel.style.setProperty('display', 'flex');
          break;
        case sidePanelVisible:
          btn.innerHTML = 'Side';
          btn.style["box-shadow"] = '';
          defaultbkg = 'grey';
          btn.style.left = '73px';
          btn.style.top = '18px';
          sidePanel.style.setProperty('display', 'flex');
          mainPanel.style.setProperty('display', 'none');
          sidePanel.style.setProperty('height', '100%');
          break;
        default:
          console.log("WARNING. showPanel() switch default case exercised.");
          break;
      }
      sidePanel.style.setProperty('max-width', '100%');
      // popOutPanel.style.setProperty('max-width', '100%');
      document.getElementsByClassName('show-hide-btn')[0].style["background-color"] = defaultbkg;
      // console.log("sidePanel"); console.log(sidePanel);
      // console.log("mainPanel"); console.log(mainPanel);

    }
})();
