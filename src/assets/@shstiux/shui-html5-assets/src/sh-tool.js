/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHTool extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        padding: 4px;
        background: rgba(var(--ui-1), var(--opacity-7));
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        cursor: pointer;
        transition: .2s all ease-in-out;
        height: 68px;
        min-height: 68px;
        max-height: 68px;
        flex: 1;
        position: relative;
        outline: 0;
      }

      :host([disabled]) {
        pointer-events: none;
      }

      :host(:not(.no-hovermq):hover), :host(:active) {
        background: rgba(var(--ui-1), var(--opacity-6));
      }

      :host([active]) {
        background: rgba(var(--ui-1), var(--opacity-5)) !important;
        border: 1px solid rgba(var(--ui-0), var(--opacity-1));
      }

      :host(:not([stretch])) {
        width: 68px;
        min-width: 68px;
        max-width: 68px;
        flex: 0;
      }

      /* condensed */
      :host([condensed]) {
        height: 40px;
        min-height: 40px;
        max-height: 40px;
      }

      :host([condensed]:not([stretch])) {
        min-width: 40px;
        max-width: 40px;
      }

      /* label */

      :host([select]) .tool-label {
        color: var(--text-secondary) !important;
      }

      :host([select][value]) .tool-label {
        font-size: 12px !important;
        line-height: 12px !important;
      }

      :host([icononly][icon]) .tool-label,
      :host(:not([label])) .tool-label,
      :host([condensed][icon]) .tool-label {
        display: none;
      }

      .tool-label,
      .tool-value {
        height: auto;
        max-height: 32px;
        text-align: center;
        color: var(--text-primary);
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
        -webkit-line-clamp: 2;
      }

      :host([icon]) .tool-label {
        height: 24px !important;
        line-height: 12px !important;
        font-size: 12px !important;
        margin-top: 4px;
      }

      :host([disabled]) .tool-label,
      :host([disabled]) .tool-icon,
      :host([disabled]) .tool-value {
        color: var(--text-disabled) !important;
      }

      /* value */

      
      :host([icononly]) .tool-label,
      :host(:not([select][value])) .tool-value {
        display: none;
      }

      /* arrow */

      .arrow, .more {
        position: absolute;
        top: 4px;
        right: 4px;
      }

      .arrow {
        box-sizing: border-box;
        height: 8px;
        width: 8px;
        border-top: solid 4px rgba(var(--ui-1), var(--opacity-4));
        border-right: solid 4px rgba(var(--ui-1), var(--opacity-4));
        border-left: solid 4px transparent;
        border-bottom: solid 4px transparent;
      }

      :host(:not([select])) .arrow {
        display: none;
      }

      :host(:not([palette])) .more {
        display: none;
      }

      :host([disabled]) .arrow,
      :host([disabled]) .more {
        opacity: .2;
      }

      :host([readonly]) .arrow,
      :host([readonly]) .more {
        opacity: 0;
      }

      /* menu */

      #menu {
        position: fixed;
        background: rgba(var(--ui-8), var(--opacity-1));
        z-index: 999999;
        max-height: 200px;
        overflow: auto;
      }
    </style>

    <!--HTML-->
    <sh-icon icon$="[[icon]]" class="tool-icon"></sh-icon>
    <sh-text size="body-1" class="tool-label">[[label]]</sh-text>
    <sh-text size="body-1" class="tool-value">[[value]]</sh-text>
    <div class="arrow"></div>
    <sh-icon icon="menu" size="xs" button class="more" on-click="_expandPalette"></sh-icon>
    <sh-popover id="menu" visible$="[[expanded]]">
      <slot></slot>
    </sh-popover>
`;
  }

  static get is() {
    return 'sh-tool';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      value: {
        type: String,
        reflectToAttribute: true,
        notify:true
      },
      icon: {
        type: String,
        reflectToAttribute: true,
        notify:true
      },
      active: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      select: {
        type: Boolean,
        reflectToAttribute: true,
        notify:true
      },
      icononly: {
        type: Boolean,
        reflectToAttribute: true,
        notify:true
      },
      palette: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      toggle: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      expanded: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        observer: '_clickListener'
      },
      disabled: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      offsetX: {
        type: Number
      },
      offsetY: {
        type: Number
      },
      menuHeight: {
        type: Number
      },
      menuWidth: {
        type: Number
      }
    };
  }
  ready() {
    super.ready();
    let _this;
    _this = this
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    if (this.label !== undefined) {
      this.setAttribute('aria-labelledby', this.label);
    }
    // check for hover input
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    // remove context menu default behavior
    this.addEventListener('contextmenu', function(e) {
      e.preventDefault()
    })
    // long touch palette listener
    this.addEventListener('touchstart', function() {
      let touchTimer;
      if (_this.palette) {
        touchTimer = window.setTimeout(function() { 
          _this._expandPalette();
        }, 500);
      }
      _this.addEventListener('touchend', function() {
        clearTimeout(touchTimer);
      });
    });
    // click event handlers
    this.addEventListener('click', function (e) {
      // toggle active state
      if (e.target.tagName === 'SH-TOOL') {
        if (_this.toggle) {
          _this.active = !_this.active;
        }
        if (_this.select) {
          _this.expanded = true;
          _this._handleOffset();
        }
      }
    });
    // stop click propagation from menu to host
    this.shadowRoot.querySelector('#menu').addEventListener('click', function (e) {
      e.stopPropagation()
      if (e.target.tagName === 'SH-MENU-ITEM') {
        _this.expanded = false;
        _this._unselectSiblings();
        e.target.active = true;
        if (_this.select) {
          // ICON ONLY
          if (_this.icononly) {
            _this.icon = e.target.icon;
          } else {
            _this.value = e.target.label;
          }
        } else if (e.target.icon) {
          _this.label = e.target.label;
          _this.icon = e.target.icon;
        }
        else {
          _this.label = e.target.label;
        }
      }
    });
    // show menu for select tool
    if (this.palette || this.select) {
      for (let i = 0; i < this.children.length; i++) {
        // look for active item on load
        if (this.children[i].active) {
          if (this.select) {
            if (_this.icononly) {
              _this.icon = this.children[i].icon;
            } else {
            _this._unselectSiblings();
            this.value = this.children[i].label;
            }
          } else {
            this.label = this.children[i].label;
            if (this.children[i].icon !== undefined) {
              this.icon = this.children[i].icon;
            }
          }
        }
      }
    }
  }
  _expandPalette(e) {
    if (e) {
      e.stopPropagation();
    }
    this.expanded = true;
    this._handleOffset();
  }
  _handleOffset() {
    let menu;
    menu = this.shadowRoot.querySelector("#menu");
    menu.visible = this.expanded;
    // define tool offset
    this.offsetY = this.getBoundingClientRect().top;
    this.offsetX = this.getBoundingClientRect().left;
    // position menu
    this.menuHeight = menu.clientHeight;
    this.menuWidth = menu.clientWidth;
    // position menu in Y axis
    if (this.offsetY + this.menuHeight > window.innerHeight) {
      menu.style.top = this.offsetY - this.menuHeight + this.offsetHeight +  'px';
    } else {
      menu.style.top = this.offsetY + 'px';
    }
    // position menu in X axis
    if (this.offsetX + this.offsetWidth + this.menuWidth > window.innerWidth) {
      menu.style.left = this.offsetX - this.menuWidth + 'px';
    } else {
      menu.style.left = this.offsetX + this.offsetWidth + 'px';
    }
  }
  _unselectSiblings() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].removeAttribute('active');
    }
  }
  _clickListener() {
    let _this, reposition;
    _this = this
    // reposition every 1 sec
    reposition = setInterval(function() {
      _this._handleOffset();
      if (_this.expanded) {
        clearInterval(reposition);
      }
    }, 10);
    // close menu on click
    document.addEventListener("click", function (e) {
      if (e.target !== _this) {
        _this.expanded = false;
      }
    });
  }
}

window.customElements.define(SHTool.is, SHTool);