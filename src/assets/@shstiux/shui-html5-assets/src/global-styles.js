/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import '@polymer/polymer/lib/elements/custom-style.js';
import '../modernizr.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    /* THEMES */
    html, html[theme="light"] {
      --highlight-5: rgba(0,0,0,.05); /* 5% highlight */
      --highlight-10: rgba(0,0,0,.1); /* 10% highlight */
      --highlight-15: rgba(0,0,0,.15); /* 15% highlight */
      --highlight-20: rgba(0,0,0,.2); /* 20% highlight */
      --shadow-light: rgba(0,0,0,.05); /* app-header and panes (big areas) */
      --shadow-strong: rgba(0,0,0,.1); /* menu-groups, buttons (smaller components) */
      /* Base Colors */
      --base-0: rgba(255, 255, 255, 1); /* Access bar */
      --base-1: rgba(235,235,235,1); /* Pane, Page Background */
      --base-2: rgba(245,245,245,1); /* Secondary Navigation */
      --base-3: rgba(255,255,255,1); /* Main Content Area, Accodrion, Modal */
      /* UI Colors */
      --ui-0: 0,153,153; /* Petrol */
      --ui-1: 0,0,0; /* Text, UI Components */
      --ui-2: 236,102,2; /* Orange (Idle) */
      --ui-3: 207,75,0; /* Orange (Hover) */
      --ui-4: 216,88,8; /* Orange (On Press) */
      --ui-5: 125,125,125; /* Slider Handle*/
      --ui-6: 200,200,200; /* Slider Handle (disabled) */
      --ui-7: 255,255,255; /* Backgrounds, Overlays */
      /* Functional Colors */
      --functional-red: 231,0,29; /* errors, critical messages */
      --functional-yellow: 255,210,0; /* alerts, attention messages */
      --functional-green: 0,154,56; /* confirmation */
      /* Supporting Colors */
      --support-1: rgba(50,158,188,1); /* blue */
      --support-2: rgba(139,50,188,1); /* purple */
      --support-3: rgba(50,188,77,1); /* green */
      --support-4: rgba(50,188,167,1); /* turquoise */
      --support-5: rgba(50,144,188,1); /* navy blue */
      --support-6: rgba(188,50,115,1); /* magenta */
      /* Type Colors */
      --super-header: normal 400 20px bree-headline, sans-serif;
      --header-1: normal 400 16px bree-headline, sans-serif;
      --header-2: normal 700 16px siemens sans, sans-serif;
      --title-1: normal 700 14px siemens sans, sans-serif;
      --title-2: normal 700 12px siemens sans, sans-serif;
      --body-1: normal 400 14px siemens sans, sans-serif;
      --body-2: normal 400 12px siemens sans, sans-serif;
      --text-white: rgba(255,255,255,1);
      --text-highlight: rgba(236,102,2,0.9);
      --text-primary: rgba(0,0,0,0.9);
      --text-secondary: rgba(0,0,0,0.6);
      --text-disabled: rgba(0,0,0,0.2);
      /* Opacities */
      --opacity-1: 1;
      --opacity-2: 0.9;
      --opacity-3: 0.6;
      --opacity-4: 0.4;
      --opacity-5: 0.2;
      --opacity-6: 0.1;
      --opacity-7: 0.05;
      /* Color Exceptions */
      --ui-8: 255,255,255; /* Dropdown, Datepicker and Search auto complete backgrounds */
      --text-white-disabled: rgba(255,255,255,0.6); /* Label on primary buttons */
      --logo-1: #ec6602;
      --logo-2: #009999;
      /* Scroll Bar Icons */
      --arrow-down: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAACXBIWXMAABcRAAAXEQHKJvM/AAAA6UlEQVRYhe3WsQ2DMBCF4f/SpU6dHaizDENkh3QMkdlSU1M6UmQU5Bjsu6Mgkl+DAN3zJ2EJSwiBI+R0CEWDZNIgaRokzX9AROSy10KlrlWIiNyAR7x6EcWuLCQO9PG292Bqu34gItItBueYMAli2dUVIcAITJnnKswKgtg9FiEhhBcweDAFxBDX2IZ4MRbEKsSKsSI2IVqMB/GZrzmhicgVuAPnzOvnDLMiqiEVmFyqEWj+NYXPlEaFUEEUGDVCDanAmBAmyAbGjECzWbPD3w2MB+GGLDB4ELtA9ko7s6ZpkDQNkuYYEOANRAqPRQf7izMAAAAASUVORK5CYII=');
      --arrow-up: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAACXBIWXMAABcRAAAXEQHKJvM/AAAA6ElEQVRYhe3XsQ3CMBCF4fcoabMDdVpoGQR2oGOH7MA2DAItLSkPRXIkFPlsxxdBivu7RNblk1MkpohgLW1WI3FMIsdoOUZrEQzJ3SowJA8ALiTPf8UEyClc7q2gaswEMmYCVWEUiBk0G5OBmECzMAlIvwSoGJOAPAFcAdytoCJMBtKJyFtEblZQFlMCGW9YQUnMHMgSIBVTA7GCohgLxALSduZogRSAWpJNKaYLD6+GJEB9mPWarlWPKiS3w9d4xNVAJvOGV9OGWY/omtS5KYBghXzNa2I7UoT5df4PrOUYLcdoOSYagA+zVnvVlJE9ewAAAABJRU5ErkJggg==');
      --arrow-right: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAACXBIWXMAABcRAAAXEQHKJvM/AAAA3klEQVRYhe3YwQ3CMAwF0P85MgOLwJUdOLMDc7AD08AizMDVKFKRqtJKdvItItR/q3J5UhPbCc0MPWTThWKFzCQMIXkkuf0phOQZwAnARY1xQwbEfvjcqTEuCMnDCPGJFOOCmNkdwGNmSYZx/xozu2ViQps1ExM+vlmYqoKWgamurGpMU4lXYpp7jQojaXoKzH/NI5M+NM4TwNXMXukQBaIZokI0QZSIaogaUQXJQIQhWYgQJBPhhiyMijKEG7IwKsoQbgi++4kUURK+hJcLVgEpEVWQrKyvAdP0AQHwBpYiiMV91ywjAAAAAElFTkSuQmCC');
      --arrow-left: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAACXBIWXMAABcRAAAXEQHKJvM/AAAA6ElEQVRYhe3Yuw3CQBAE0BlERA2Q0oNJKQR6oA56gEJIcQ/E1EA6yJKRAFn23nn35MATnrXW0/m+piRMIYtJKGZIR9whJFck96l1S28EgBOANcmNpIu11q1HvhFtU0XyWBTSgfikwWyLQHoQTa6SHuEQA+JufVc2xBORDfFGZEEiEMmQKEQSJBJhhkQjTJASCBOkVAYhkl4AzgCeHY8PJHceVlOPlMCYP000JmmMRGKSB2sUJmvWRGCyp683ZtQ64okZvaAZMGWOigOYushRcQBTp1wn3C/h7SZZSbol1c1/A/4yQ34C4A3L9IrnRlt1HgAAAABJRU5ErkJggg==');
      /* Box Shadows */
      --shadow-flat: none;
      --shadow-raised: 0 2px 4px rgba(0,0,0,0.10), 0 -1px 2px rgba(0,0,0,0.05); /* accordions,cards */
      --shadow-navigation: 0 0 8px rgba(0,0,0,0.10); /* Navigation Bar */
      --shadow-overlay: 0 4px 8px rgba(0,0,0,0.1), 0 -1px 4px rgba(0,0,0,0.05); /* tooltip,popover,datepicker,dropdown,search,tools */
    }
    html[theme="dark"] {
      --highlight-5: rgba(255,255,255,.05); /* 5% highlight */
      --highlight-10: rgba(255,255,255,.1); /* 10% highlight */
      --highlight-15: rgba(255,255,255,.15); /* 15% highlight */
      --highlight-20: rgba(255,255,255,.2); /* 20% highlight */
      /* Base Colors */
      --base-0: rgba(20, 20, 20, 1); /* Access bar */
      --base-1: rgba(30,30,30,1); /* Pane, Page Background */
      --base-2: rgba(40,40,40,1); /* Secondary Navigation */
      --base-3: rgba(45,45,45,1); /* Main Content Area, Accordion, Modal */
      /* UI Colors */
      --ui-0: 0,153,153; /* Petrol */
      --ui-1: 255,255,255; /* Text, UI Components */
      --ui-2: 236,102,2; /* Orange (Idle) */
      --ui-3: 207,75,0; /* Orange (Hover) */
      --ui-4: 171,70,6; /* Orange(On Press) */
      --ui-5: 125,125,125; /* Slider Handle*/
      --ui-6: 60,60,60; /* Slider Handle (disabled) */
      --ui-7: 0,0,0; /* Backgrounds, Overlays */
      /* Functional Colors */
      --functional-red: 231,0,29; /* errors, critical messages */
      --functional-yellow: 255,210,0; /* alerts, attention messages */
      --functional-green: 0,154,56; /* confirmation */
      /* Supporting Colors */
      --support-1: rgba(50,158,188,1); /* blue */
      --support-2: rgba(139,50,188,1); /* purple */
      --support-3: rgba(50,188,77,1); /* green */
      --support-4: rgba(50,188,167,1); /* turquoise */
      --support-5: rgba(50,144,188,1); /* navy blue */
      --support-6: rgba(188,50,115,1); /* magenta */
      /* Type Colors */
      --super-header: normal 400 20px bree-headline, sans-serif;
      --header-1: normal 400 16px bree-headline, sans-serif;
      --header-2: normal 700 16px siemens sans, sans-serif;
      --title-1: normal 700 14px siemens sans, sans-serif;
      --title-2: normal 700 12px siemens sans, sans-serif;
      --body-1: normal 400 14px siemens sans, sans-serif;
      --body-2: normal 400 12px siemens sans, sans-serif;
      --text-white: rgba(255,255,255,1);
      --text-highlight: rgba(236,102,2,0.9);
      --text-primary: rgba(255,255,255,0.9);
      --text-secondary: rgba(255,255,255,0.6);
      --text-disabled: rgba(255,255,255,0.2);
      /* Opacities */
      --opacity-1: 1;
      --opacity-2: 0.9;
      --opacity-3: 0.6;
      --opacity-4: 0.4;
      --opacity-5: 0.2;
      --opacity-6: 0.1;
      --opacity-7: 0.05;
      /* Color Exceptions */
      --ui-8: 60,60,60; /* Dropdown, Datepicker and Search auto complete backgrounds */
      --text-white-disabled: rgba(255,255,255, 0.2); /* Label on primary buttons */
      --logo-1: rgba(255,255,255,.9);
      --logo-2: rgba(255,255,255,.9);
      /* Scroll Bar Icons */
      --arrow-down: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAvklEQVRYhe2X0QnDMAxEr6VLJcs0o3WaZiwXgT+CkFWdXEghOjAkYPwecmScW2sNZ+Z+Kv3yAiVQAn8vsAFYf8BY+1pmHg586UPynoA/D+8vPcGqwHYAoy+QqYSGL1Ylot8AK6Hhw1gCUqZ9QmIE36NbMCNBwT2BjAQN/ybASKTgklEbagmozoACpuAS5kak29NLCC5hjuLRduiE4axARIKCZwQ8CRqeFbAkUnBJpAs8CeuZSv0XlEAJXFwAwAfZRzJMuiMA2AAAAABJRU5ErkJggg==');
      --arrow-up: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAsUlEQVRYhe3W4QmAIBCG4SuapR2cpkarZWqHljEEAykvz+8Cf3SCP4TofZAO6rz31HL1Teu/BxjAAF8A5rjhNSjjLjkvyEvQG7jHHXoTCOAeVyFqAVwcRtQASnEIIQVw8TVuGCGZgrf4lpynDIJK01G6AWl8Q2/iDSCNqxAcoDYOI3IANA4hpFMgjZcQj5UDhK92V8Q5xJ6bCG4MrwcPMJ4iwhq5cbTfcgMYwABtAUR0AiVTLuJVBNbbAAAAAElFTkSuQmCC');
      --arrow-right:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAs0lEQVRYhe3XYQpAQBAF4EfO4g5chqOty3AHl1mp/SFRO/PepjCl2D/va1szVDFGPFn1o+mfB3gAY7pk1RjDu8NzUCByd+Ac3ql2IhewXqxJELmAGcBUAmE5hEUQ1rdAjvD0ASnC24hkCKYTShBsK6YRillAIV4xjnsAw8X6kjMvWAAVzgLocAYgCfcCZOEegDTcCpCHWwBFwi2AtkS4BRBSoDR8L8tXcbi5p+r/N/w4AMAGHW8wdt+xYmYAAAAASUVORK5CYII=');
      --arrow-left: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAuUlEQVRYhe3X4QmAIBAF4Fc0SzvYMjWaLVM7tIwRFERknN67+mEHQQbxPi4Vq0II+LLqT9OLB1gAhv0SV0MOd6exl7zE6sA13Ek7wQBcw49a3gDEwkcAkzVAHa4BUMJzAbTwHAA1PBVAD08BmIRLAWbhUoBpSQDbnj7fPO8BdFqctANmiJRPYIJInQN0RM4kpCJyVwENoVmGFIR2H1AjGBtRDNG+BbhDzNJDKfNU7CP3j/X/GxYOALACckAwdhxwRdcAAAAASUVORK5CYII=');
      /* Box Shadows */
      --shadow-flat: none;
      --shadow-raised: 0 2px 4px rgba(0,0,0,0.20), 0 -1px 2px rgba(0,0,0,0.1); /* accordions,cards */
      --shadow-navigation: 0 0 8px rgba(0,0,0,0.20); /* Navigation Bar */
      --shadow-overlay: 0 4px 8px rgba(0,0,0,0.20), 0 -1px 4px rgba(0,0,0,0.1); /* tooltip,popover,datepicker,dropdown,search,tools */
    }

    /* Typography classes added as requested by Product Backlog Item 14921
       For more details about the request, please visit:
       https://dev.azure.com/shs-ti-ux/SHUI/_workitems/edit/14921/ */

    .super-header {
      font: var(--super-header);
    }
    .header-1 {
      font: var(--header-1);
    }
    .header-2 {
      font: var(--header-2);
    }
    .title-1 {
      font: var(--title-1);
    }
    .title-2 {
      font: var(--title-2);
    }
    .body-1 {
      font: var(--body-1);
    }
    .body-2 {
      font: var(--body-2);
    }
    .white {
      color : var(--text-white);
    }
    .highlight {
      color : var(--text-highlight);
    }
    .primary {
      color : var(--text-primary);
    }
    .secondary {
      color : var(--text-secondary);
    }
    .disabled {
      color : var(--text-disabled);
    }
    .disabled-white {
      color : var(--text-white-disabled);
    }
    .href:hover {
      color: var(--text-highlight);
    }
    .href {
      text-decoration: underline;
      cursor: pointer;
    }
    html[theme="blue"] {
      --highlight-5: rgba(255,255,255,.05); /* 5% highlight */
      --highlight-10: rgba(255,255,255,.1); /* 10% highlight */
      --highlight-15: rgba(255,255,255,.15); /* 15% highlight */
      --highlight-20: rgba(255,255,255,.2); /* 20% highlight */
      --shadow-light: rgba(0,0,0,.15); /* app-header and panes (big areas) */
      --shadow-strong: rgba(0,0,0,.2); /* menu-groups, buttons (smaller components) */
      /* Base Colors */
      --base-0: rgba(20, 20, 45, 1); /* Access bar */
      --base-1: rgba(30,30,55,1); /* Pane, Page Background */
      --base-2: rgba(40,40,65,1); /* Secondary Navigation */
      --base-3: rgba(45,45,70,1); /* Main Content Area, Accodrion, Modal */
      /* UI Colors */
      --ui-0: 0,153,153; /* Petrol */
      --ui-1: 255,255,255; /* Text, UI Components */
      --ui-2: 236,102,2; /* Orange (Idle) */
      --ui-3: 207,75,0; /* Orange (Hover) */
      --ui-4: 171,70,6; /* Orange(On Press) */
      --ui-5: 125,125,150; /* Slider Handle*/
      --ui-6: 50,50,75; /* Slider Handle Disabled */
      --ui-7: 0,0,0; /* Backgrounds, Overlays */
      /* Functional Colors */
      --functional-red: 231,0,29; /* errors, critical messages */
      --functional-yellow: 255,210,0; /* alerts, attention messages */
      --functional-green: 0,154,56; /* confirmation */
      /* Supporting Colors */
      --support-1: rgba(50,158,188,1); /* blue */
      --support-2: rgba(139,50,188,1); /* purple */
      --support-3: rgba(50,188,77,1); /* green */
      --support-4: rgba(50,188,167,1); /* turquoise */
      --support-5: rgba(50,144,188,1); /* navy blue */
      --support-6: rgba(188,50,115,1); /* magenta */
      /* Type Colors */
      --super-header: normal 400 20px bree-headline, sans-serif;
      --header-1: normal 400 16px bree-headline, sans-serif;
      --header-2: normal 700 16px siemens sans, sans-serif;
      --title-1: normal 700 14px siemens sans, sans-serif;
      --title-2: normal 700 12px siemens sans, sans-serif;
      --body-1: normal 400 14px siemens sans, sans-serif;
      --body-2: normal 400 12px siemens sans, sans-serif;
      --text-white: rgba(255,255,255,1);
      --text-highlight: rgba(207,75,0,1);
      --text-primary: rgba(255,255,255,0.9);
      --text-secondary: rgba(255,255,255,0.6);
      --text-disabled: rgba(255,255,255,0.2);
      /* Opacities */
      --opacity-1: 1;
      --opacity-2: 0.9;
      --opacity-3: 0.6;
      --opacity-4: 0.4;
      --opacity-5: 0.2;
      --opacity-6: 0.1;
      --opacity-7: 0.05;
      /* Color Exceptions */
      --ui-8: 60,60,85; /* Dropdown, Datepicker and Search auto complete backgrounds */
      --text-white-disabled: rgba(255,255,255, 0.2); /* Label on primary buttons */
      --logo-1: rgba(255,255,255,.9);
      --logo-2: rgba(255,255,255,.9);
      /* Scroll Bar Icons */
      --arrow-down: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAvklEQVRYhe2X0QnDMAxEr6VLJcs0o3WaZiwXgT+CkFWdXEghOjAkYPwecmScW2sNZ+Z+Kv3yAiVQAn8vsAFYf8BY+1pmHg586UPynoA/D+8vPcGqwHYAoy+QqYSGL1Ylot8AK6Hhw1gCUqZ9QmIE36NbMCNBwT2BjAQN/ybASKTgklEbagmozoACpuAS5kak29NLCC5hjuLRduiE4axARIKCZwQ8CRqeFbAkUnBJpAs8CeuZSv0XlEAJXFwAwAfZRzJMuiMA2AAAAABJRU5ErkJggg==');
      --arrow-up: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAsUlEQVRYhe3W4QmAIBCG4SuapR2cpkarZWqHljEEAykvz+8Cf3SCP4TofZAO6rz31HL1Teu/BxjAAF8A5rjhNSjjLjkvyEvQG7jHHXoTCOAeVyFqAVwcRtQASnEIIQVw8TVuGCGZgrf4lpynDIJK01G6AWl8Q2/iDSCNqxAcoDYOI3IANA4hpFMgjZcQj5UDhK92V8Q5xJ6bCG4MrwcPMJ4iwhq5cbTfcgMYwABtAUR0AiVTLuJVBNbbAAAAAElFTkSuQmCC');
      --arrow-right:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAs0lEQVRYhe3XYQpAQBAF4EfO4g5chqOty3AHl1mp/SFRO/PepjCl2D/va1szVDFGPFn1o+mfB3gAY7pk1RjDu8NzUCByd+Ac3ql2IhewXqxJELmAGcBUAmE5hEUQ1rdAjvD0ASnC24hkCKYTShBsK6YRillAIV4xjnsAw8X6kjMvWAAVzgLocAYgCfcCZOEegDTcCpCHWwBFwi2AtkS4BRBSoDR8L8tXcbi5p+r/N/w4AMAGHW8wdt+xYmYAAAAASUVORK5CYII=');
      --arrow-left: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAuUlEQVRYhe3X4QmAIBAF4Fc0SzvYMjWaLVM7tIwRFERknN67+mEHQQbxPi4Vq0II+LLqT9OLB1gAhv0SV0MOd6exl7zE6sA13Ek7wQBcw49a3gDEwkcAkzVAHa4BUMJzAbTwHAA1PBVAD08BmIRLAWbhUoBpSQDbnj7fPO8BdFqctANmiJRPYIJInQN0RM4kpCJyVwENoVmGFIR2H1AjGBtRDNG+BbhDzNJDKfNU7CP3j/X/GxYOALACckAwdhxwRdcAAAAASUVORK5CYII=');
      /* Box Shadows */
      --shadow-flat: none;
      --shadow-raised: 0 2px 4px rgba(0,0,0,0.20), 0 -1px 2px rgba(0,0,0,0.1); /* accordions,cards */
      --shadow-navigation: 0 0 8px rgba(0,0,0,0.20); /* Navigation Bar */
      --shadow-overlay: 0 4px 8px rgba(0,0,0,0.20), 0 -1px 4px rgba(0,0,0,0.1); /* tooltip,popover,datepicker,dropdown,search,tools */
    }
    /* body styles */
    html, body {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      font-family: "siemens sans", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased !important;
      text-rendering: optimizeLegibility !important;
      -moz-osx-font-smoothing: grayscale !important;
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
