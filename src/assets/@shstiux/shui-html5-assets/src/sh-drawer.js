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

      .drawer-wrapper {
        background: var(--base-3);
        position: absolute;
        display: flex;
        flex-direction: column;
        box-shadow: var(--shadow-navigation);
        box-sizing: border-box;
        height: 100%;
        width: 352px;
        max-width: calc(100% - 104px);
        transition: .2s all ease-in-out;
      }

      .drawer-wrapper> ::slotted(*) {
        margin-bottom: 8px;
      }

      .drawer-wrapper> ::slotted(sh-menu-item) {
        margin-bottom: 0px !important;
      }

      /* slot styles */

      :host(:not([label])) .label-wrapper {
        display: none;
      }

      .header-wrapper {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        padding: 16px;
      }
      
      .label-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 16px;
        justify-content: flex-end;
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
      }

      .functions-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .body-wrapper {
        flex: 1;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: auto;
        overflow-x: hidden;
        padding: 0 16px;
      }
      .body-wrapper ::slotted(*) {
        margin-bottom: 8px;
      }
      .footer-wrapper {
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
        padding: 16px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
      }

      .functions-wrapper > ::slotted(*),
      .footer-wrapper > ::slotted(*) {
        margin-left: 8px;
      }

      .drawer-wrapper[empty-header] .header-wrapper {
        display: none;
      }
      .drawer-wrapper:not([empty-header]) .label-wrapper {
        display: none;
      }
      .drawer-wrapper:not([empty-header]) .body-wrapper,
      :host([label]) .body-wrapper {
        padding-top: 0px !important;
      }

      .drawer-wrapper[empty-footer] .footer-wrapper {
        display: none;
      }

      .header-wrapper> ::slotted(sh-tabs) {
        flex: 1;
      }

      /* positioning */

      :host([position="left"]) .drawer-wrapper {
        left: 0px;
        transform: translateX(-80px);
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

      .drawer-label {
        overflow: hidden;
        width: -webkit-fill-available;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--text-primary);
        font: var(--header-2);
        line-height: 32px !important;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
      }

      :host(:not([label])) .drawer-label {
        display: none;
      }

      /* touch */
      @media (any-pointer:coarse) {
        .functions-wrapper> ::slotted(*),
        .footer-wrapper> ::slotted(*) {
          margin-left: 16px;
        }
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
    <div class="drawer-wrapper" id="content" empty-footer$="[[emptyFooter]]" empty-header$="[[emptyHeader]]">
      <div class="label-wrapper">
        <div class="drawer-label">[[label]]</div>
        <div class="functions-wrapper">
          <slot name="functions" id="functions"></slot>
        </div>
      </div>
      <div class="header-wrapper">
        <slot name="header" id="header"></slot>
      </div>
      <div class="body-wrapper">
        <slot id="body"></slot>
      </div>
      <div class="footer-wrapper">
        <slot name="footer" id="footer"></slot>
      </div>
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
      sticky: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      drawerWidth: {
        type: String,
        value: '352px',
        reflectToAttribute: true,
        notify: true,
        observer: '_updateDrawerLength'
      },
      emptyHeader: {
        type: Boolean, 
        value: false
      },
      emptyFooter: {
        type: Boolean,
        value: false
      }
    }
  }

  ready() {
    super.ready();
    let footerNodes, headerNodes;
    footerNodes = this.$.footer.assignedNodes({
      flatten: true
    }).length;
    if (footerNodes === 0) {
      this.emptyFooter = true;
    }
    headerNodes = this.$.header.assignedNodes({
      flatten: true
    }).length;
    if (headerNodes === 0) {
      this.emptyHeader = !this.emptyHeader;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mousedown', function () {
      if(!this.sticky){
        this._closeDrawer();
      }
    });
    this.$.content.addEventListener('mousedown', function (e) {
      e.stopPropagation();
    });
  }
  _closeDrawer() {
    this.visible = !this.visible;

    // fire event on closing
    this.dispatchEvent(new CustomEvent('drawer-closed', {
      detail: this,
      composed: true,
      bubbles: true
    }));
  }

  _drawerStatus() {
    if(this.visible){
      let drawer;
      drawer = this;
      //focus inside the drawer to move out of natural tab order
      this.shadowRoot.querySelector('.drawer-label').focus();
      this.shadowRoot.querySelector('.drawer-label').style.outline='0';

      for(let i=0;i<this.children.length;i++){      
        this.children[i].setAttribute('tabindex','0');
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
