/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHDrawer extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        position: fixed;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .4);
        z-index: 6;
        max-height: 0px;
        opacity: 0;
        transition: .2s all ease-in-out, 0s height ease-in-out .2s, 0s max-height ease-in-out .2s;
        display: block;
      }

      :host(:not([visible])) {
        overflow: hidden;
        pointer-events: none;
      }

      .drawer-wrapper> ::slotted(*) {
        margin-bottom: 8px;
      }

      .drawer-wrapper> ::slotted(sh-menu-item) {
        margin-bottom: 0px !important;
      }

      /* positioning */

      :host([position="left"]) .drawer-wrapper,
      .drawer-wrapper {
        transition: .2s all ease-in-out;
        position: absolute;
        background: var(--base-0);
        left: 0px;
        box-sizing: border-box;
        height: 100%;
        width: 352px;
        max-width: calc(100% - 104px);
        box-shadow: var(--shadow-navigation);
        padding: 16px;
        transform: translateX(-80px);
        overflow: auto;
      }

      :host([position="right"]) .drawer-wrapper {
        right: 0px;
        left: auto;
        transform: translateX(80px);
      }

      :host([position="top"]) .drawer-wrapper,
      :host([position="bottom"]) .drawer-wrapper {
        height: auto;
        min-height: 40px;
        max-height: calc(100% - 104px);
        width: 100%;
        max-width: 100%;
      }

      :host([position="top"]) .drawer-wrapper {
        top: 0px;
        transform: translateY(-80px);
      }

      :host([position="bottom"]) .drawer-wrapper {
        bottom: 0px;
        transform: translateY(80px);
      }

      /* Margin constraint */
      :host([position="left"]) .drawer-wrapper, :host([position="right"]) .drawer-wrapper {
        max-width: calc(100% - 104px);
      }

      /* visible */

      :host([visible]) {
        max-height: 100%;
        opacity: 1;
        transition: .2s all ease-in-out .2s, 0s height ease-in-out, 0s max-height ease-in-out;
      }

      :host([visible]) .drawer-wrapper {
        transition: .2s all ease-in-out .2s;
        transform: none;
        min-height: 160px;
      }

      #label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--text-primary);
        font: var(--header-2);
        line-height: 32px !important;
        flex: 1;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        padding-bottom: 16px;
      }

      :host(:not([label])) #label {
        display: none;
      }

      :host(.testing), :host(.testing) *,
      :host(.testing) *:before, :host(.testing) *:after,
      :host(.testing), :host(.testing) *,
      :host(.testing.hover), :host(.testing.hover) *,
      :host(.testing) *.hover *, :host(.testing) *.active *,
      :host(.testing.active), :host(.testing.active) *,
      :host(.testing) *.hover, :host(.testing) *.active  {
        transition : 0s all linear !important;
      }
    </style>

    <!--HTML-->
    <div class="drawer-wrapper" id="content">
      <div id="label">[[label]]</div>
      <slot></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-drawer';
  }
  static get properties() {
    return {
      visible: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: '_drawerStatus'
      },
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      position: {
        type: String,
        value: 'left',
        reflectToAttribute: true,
        notify: true
      },
      drawerWidth: {
        type: String,
        value: '352px',
        reflectToAttribute: true,
        notify: true,
        observer: '_updateDrawerLength'
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    // this function checks if the event hits the background or the drawer itself, and closes it accordingly
    this.addEventListener('click', function () {
      this._closeDrawer();
    });
    this.$.content.addEventListener('mouseover', function () {
      this.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });
  }
  _closeDrawer() {
    this.visible = false;
  }

  _drawerStatus() {
    if(this.visible){
      let drawer;
      drawer = this;
      this.$.label.setAttribute('tabindex','0'); 
      //focus inside the drawer to move out of natural tab order
      this.$.label.focus();
      this.$.label.style.outline='0';

      for(let i=0;i<this.children.length;i++){      
        this.children[i].setAttribute('tabindex','0');
      }
      document.onkeyup = function(e){
        if(e.keyCode === 27)  {
          drawer._closeDrawer();
        }
      }
      document.onkeyup = function(e) {
        if (e.keyCode === 27) {
          drawer._closeDrawer();
        }
      };
    }
    if(!this.visible){
      for(let i=0;i<this.children.length;i++){      
        this.children[i].removeAttribute('tabindex');
      }
    }
  }
  _updateDrawerLength(drawerWidth) {
    let self, drawerContainer;
    self = this;
    drawerContainer = self.shadowRoot.querySelector('.drawer-wrapper');
    if(self.position === 'left' || self.position === 'right') {
      drawerContainer.style.width = drawerWidth;
    }
  }
}
window.customElements.define(SHDrawer.is, SHDrawer);
