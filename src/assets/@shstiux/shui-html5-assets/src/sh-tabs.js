/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHTabs extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        position: relative;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        border-bottom: 1px solid rgba(var(--ui-1), var(--opacity-7));
      }

      :host([access-context]),
      :host([nav-context]),
      :host([footer-context]) {
        border-bottom: none;
      }

      /* collapsed */

      .collapsed-popover {
        position: absolute;
        top: 100%;
        left: 0px;
        background: var(--base-3);
        box-shadow: var(--shadow-overlay);
        border-radius: 2px;
        min-width: 100%;
        max-width: 240px;
        max-height: 0px;
        opacity: 0;
        transform: translateY(-24px);
        overflow: hidden;
        transition: .2s all ease-in-out;
      }

      :host([collapsed][active]) .collapsed-popover {
        overflow: auto;
        max-height: 200px;
        opacity: 1;
        transform: none;
      }

      :host([collapsed][active]) #expand-icon {
        transform: rotate(180deg);
      }

      .collapsed-input {
        display: none;
      }

      :host([collapsed]) {
        overflow: visible;
      }

      :host([collapsed]) .collapsed-input {
        cursor: pointer;
        display: inline-flex;
        height: 72px;
        min-width: 100px;
        max-width: 288px;
        padding: 20px 8px;
        box-sizing: border-box;
        font: var(--body-1);
        color: var(--text-primary);
        line-height: 32px;
      }

      :host([collapsed][condensed]) .collapsed-input {
        height: 40px;
        padding: 4px 8px;
      }

      :host([collapsed][condensed]) .text {
        line-height: 32px;
      }

      :host([collapsed][condensed]) .info {
        display: none;
      }

      #expand-icon {
        transition: 0s transform, .2s color ease-in-out;
        margin-left: 8px;
        color: rgba(var(--ui-1), var(--opacity-4));
      }

      #tab-icon {
        color: rgba(var(--ui-1), var(--opacity-2));
        margin-right: 8px;
      }

      :host([info]) .text {
        font: var(--title-1);
        line-height: 16px;
      }

      .text {
        color: var(--text-primary);
        flex-direction: column;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .info {
        font: var(--body-2);
        color: var(--text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* hover */

      :host([collapsed]:not(.no-hovermq)) .collapsed-input:hover #expand-icon {
        color: rgba(var(--ui-1), var(--opacity-3));
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
    <div class="collapsed-input" on-click="_show">
      <sh-icon icon$="[[icon]]" id="tab-icon"></sh-icon>
      <div class="text">
        [[label]]
        <div class="info">[[info]]</div>
      </div>
      <div class="info"></div>
      <sh-icon icon="down-s" id="expand-icon"></sh-icon>
    </div>
    <slot id="main-slot"></slot>
    <div class="collapsed-popover">
      <slot id="collapsed-slot" name="collapsed"></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-tabs';
  }
  static get properties() {
    return {
      role: {
        type: String,
        value: 'navigation',
        reflectToAttribute: true
      },
      collapsed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_collapsedChanged'
      },
      active: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      icon: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      info: {
        type: String,
        reflectToAttribute: true
      },
      accessContext: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_contextChanged'
      },
      navContext: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_contextChanged'
      },
      footerContext: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_contextChanged'
      },
      condensed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      fixed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  ready() {
    super.ready();
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    for(let i=0;i<this.children.length;i++){
      if(!this.children[i].hasAttribute('disabled')) {
       this.children[i].setAttribute('tabindex', '0');
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._collapsedChanged();
    let activeTab;
    activeTab = this.querySelector('[active]');
    this.setActiveTabProperties(activeTab);

    // update the tab elements active state
    this.addEventListener('clicked', function (e) {
      let childElement;
      childElement = this.querySelectorAll('sh-tab-item[active]');
      this.label = e.target.label;
      this.icon = e.target.icon;
      if (e.target.patient === true) {
        this.icon = 'patient';
        this.info = e.target.info;
      }
      if (e.target.patient === false) {
        this.info = null;
      }
      // get name for tabs without labels
      if (e.target.label === undefined) {
        this.label = e.target.name;
      }
      // remove active attr from all other tabs
      for (let i = 0; i < childElement.length; i++) {
        childElement[i].removeAttribute('active');
      }
      this._hide();
    });
  }
  setActiveTabProperties(active) {
    let activeTab;
    activeTab =  active;
    if (activeTab !== null) {
      // populate placeholder properties with data from active tab-item
      if (activeTab.attributes.label !== undefined) {
        this.label = activeTab.attributes.label.value;
      }
      if (activeTab.attributes.name !== undefined) {
        this.label = activeTab.attributes.name.value;
      }
      if (activeTab.attributes.icon !== undefined) {
        this.icon = activeTab.attributes.icon.value;
      }
      if (activeTab.attributes.patient !== undefined) {
        this.icon = 'patient';
        if (activeTab.attributes.info !== undefined) {
          this.info = activeTab.attributes.info.value;
        }
      }
    }
  }
  _contextChanged() {
    let tabItems;
    tabItems = this.querySelectorAll('sh-tab-item');
    if (this.accessContext === true) {
      // trigger access prop of tab-item
      for (let i = 0; i < tabItems.length; i++) {
        tabItems[i].accessContext = true;
      }
    }
    if (this.navContext === true) {
      // trigger nav prop of tab-item
      for (let i = 0; i < tabItems.length; i++) {
        tabItems[i].navContext = true;
      }
    }
    if (this.footerContext === true) {
      // trigger footer prop of tab-item
      for (let i = 0; i < tabItems.length; i++) {
        tabItems[i].footerContext = true;
      }
    }
  }

  _collapsedChanged() {
    if (this.collapsed === true) {
      // add collapsed class to tab-items when host is collapsed
      let tabItems;
      tabItems = this.querySelectorAll('sh-tab-item');
      for (let i = 0; i < tabItems.length; i++) {
        tabItems[i].collapsed = true;
      }
    }
     if (this.collapsed === false) {
      // remove collapsed class to tab-items when host is not collapsed
      let tabItems;
      tabItems = this.querySelectorAll('sh-tab-item');
      for (let i = 0; i < tabItems.length; i++) {
        tabItems[i].collapsed = false;
      }
    }
  }

  _show() {
    if (this.active === true) {
      this._hide();
      return;
    }
    this.active = true;
  }

  _hide() {
    this.active = false;
  }
}
window.customElements.define(SHTabs.is, SHTabs);
