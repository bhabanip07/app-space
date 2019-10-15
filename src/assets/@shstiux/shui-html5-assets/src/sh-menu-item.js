/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHMenuItem extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        outline:0;
        display: block;
      }

      :host([icon]) .menu-item-label {
        line-height: 32px;
      }

      :host([icon]) .menu-item-wrapper {
        padding: 4px 0;
      }

      :host([icon]) .menu-item-wrapper[active] {
        padding: 4px 8px;
      }

      .menu-item-wrapper {
        height: fit-content;
        height: -ms-fit-content;
        height: -moz-fit-content;
        width: 100%;
        box-sizing: border-box;
        padding: 8px 0;
        transition: .2s all ease-in-out;
        border-radius: 2px;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        overflow: hidden;
      }

      /* active */

      .menu-item-wrapper[active] {
        padding: 8px 8px;
        margin: 0 -8px;
        width: calc(100% + 16px);
      }

      .menu-item-wrapper[active] {
        background: rgba(var(--ui-1),var(--opacity-6)) !important;
      }


      .menu-item-wrapper.focused {
        padding: 8px 8px;
        margin: 0 -8px;
        width: calc(100% + 16px);
        background: rgba(var(--ui-1),var(--opacity-7)) !important;
      }

      /* disabled */

      :host([disabled]) {
        pointer-events: none;
      }

      .menu-item-label {
        font: var(--body-1);
        line-height: 24px;
        font-weight: normal;
        color: var(--text-primary);
        flex: 1;
        transition: .2s all ease-in-out;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        position:relative;
      }

      sh-icon#menu-item-icon {
        position:relative;
        color: var(--text-primary);
        margin-right: 8px;
      }

      .icon- {
        display: none;
      }

      ::slotted(*[slot="functions"]) {
        margin-left: 8px;
        position: relative;
      }

      .item-wrapper {
        display: flex;
        flex-direction: row;
        text-decoration: none !important;
        align-items: center;
      }

      /* chapter menu */

      .chapter-wrapper {
        transition: .1s all ease-in-out;
      }

      .chapter-wrapper > ::slotted([chapter]) {
        margin-left: -32px;
        width: calc(100% + 32px);
      }

      :host(:not([expanded])) > .chapter-wrapper {
        max-height: 0px;
        overflow: hidden;
        pointer-events: none;
        transform: translateY(-8px);
        opacity: 0;
      }

      :host([chapter]) > .chapter-wrapper {
        display: flex;
        flex-direction: column;
        margin-left: 56px;
      }

      :host(:not([chapter])) > .item-wrapper > .arrow-icon {
        display: none;
      }

      :host([chapter]) > .item-wrapper > .arrow-icon {
        display: block;
        margin-right: 8px;
      }

      :host([chapter][expanded]) > .item-wrapper > .arrow-icon {
        transform: rotate(90deg);
      }

      :host(:not([chapter]).chapter-sibling) > .item-wrapper > .menu-item-wrapper {
        margin-left: 32px;
      }

      /* hover */

      :host(:not(.no-hovermq)) .menu-item-wrapper:hover,
      :host(:not(.no-hovermq)) .menu-item-wrapper.hover {
        background: rgba(var(--ui-1),var(--opacity-7));
        padding: 8px 8px;
        margin: 0 -8px;
        width: calc(100% + 16px);
      }

      :host([icon]:not(.no-hovermq)) .menu-item-wrapper:hover,
      :host([icon]:not(.no-hovermq)) .menu-item-wrapper.hover {
        background: rgba(var(--ui-1),var(--opacity-7));
        padding: 4px 8px;
      }

      :host(.chapter-sibling:not([chapter]):not(.no-hovermq)) .menu-item-wrapper:hover,
      :host(.chapter-sibling:not([chapter]):not(.no-hovermq)) .menu-item-wrapper.hover,
      :host(.chapter-sibling:not([chapter])[active]) .menu-item-wrapper {
        margin-left: 24px;
      }
      :host(:not(.no-hovermq)) .menu-item-wrapper[disabled] {
        cursor: default;
        background: transparent;
        pointer-events: none;
      }

      :host([disabled]) .menu-item-label {
        color: var(--text-disabled) !important;
      }
      :host([disabled]) #menu-item-icon {
        opacity: .2;
      }

      #checkbox {
        display:none;
      }
      :host([checkbox]) #checkbox{
        display: block;
      }

      :host(.focused) .menu-item-wrapper{
        background: red !important;
        padding: 8px 8px;
        margin: 0 -8px;
        width: calc(100% + 16px);
      }

      /*--css testing--*/
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
    <div class="item-wrapper">
      <sh-icon id="menuExpandIcon" button="" icon="arrow-right-s" size="s" class="arrow-icon" on-click="_handleExpanded"></sh-icon>
      <div id="menuExpandWrapper" class="menu-item-wrapper" active$="[[active]]" disabled$="[[disabled]]" on-click="_handleClicked" role="button">
        <sh-icon icon$="[[icon]]" id="menu-item-icon"></sh-icon>
        <sh-checkbox neutral label=[[label]] active$="[[active]]" disabled$="[[disabled]]" id="checkbox"></sh-checkbox>
        <div class="menu-item-label">[[label]]</div>
        <slot name="functions" id="functions"></slot>
      </div>
    </div>
    <div class="chapter-wrapper">
      <slot></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-menu-item';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: 'Label',
        reflectToAttribute: true,
        notify: true
      },
      icon: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      href: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      active: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      role: {
        type: String,
        value: 'listitem',
        reflectToAttribute: true
      },
      chapter: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      expanded: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      value: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify:true
      },
      checkbox: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify:true
      }
    }
  }
  ready() {
    super.ready();
    if(this.parentElement.tagName !=='SH-MENU-ITEM') {
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-labelledby', this.label);
    }
    if(this.children.length>this.$.functions.assignedNodes({flatten: true}).length){
      this.$.menuExpandIcon.setAttribute('tabindex', '0');
      this.removeAttribute('tabindex');
    }
    if(this.parentElement.tagName === 'SH-MENU-ITEM'){
      this.$.menuExpandIcon.removeAttribute('tabindex');
    }

    if (this.icon === undefined) {
      this.shadowRoot.querySelector('#menu-item-icon').style.display = 'none';
    }
    if(!Modernizr.hovermq){
      this.classList.add('no-hovermq');
    }
    if(this.childElementCount > this.$.functions.assignedNodes({flatten: true}).length) {
      this.chapter = true;
    }
    if(this.chapter) {
      let siblingItems;
      siblingItems = this.parentNode.children;
      if (this.parentNode.tagName !== 'SH-MENU-ITEM') {
        for (let i = 0; i < siblingItems.length; i++) {
          siblingItems[i].classList.add('chapter-sibling');
        }
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    let self;
    self = this;
    this.shadowRoot.querySelector('.menu-item-label').addEventListener('mouseover',function(){
      if (this.offsetWidth < this.scrollWidth) {
        this.setAttribute('title', this.textContent);
      }
      else {
        this.removeAttribute('title');
      }
    });
    this.$.menuExpandIcon.addEventListener('focus', function () {
      this.onkeyup = function (e) {
        if (e.keyCode === 9) {
          this.style.border = '2px solid rgb(59, 153, 252)';
        }
        if (e.keyCode === 32 || e.keycode === 13) {
          e.preventDefault();
          self._handleClicked();
        }

        self.collapseCustomEvent(e);
        self.expandCustomEvent(e);
      }
    });

    this.$.menuExpandIcon.addEventListener('blur', function () {
      this.style.border = '';
    })

    this.addEventListener('focus', function () {
      this.onkeyup = function (e) {
        if (e.keyCode === 9 && !this.children.length > 0) {
            this.$.menuExpandWrapper.style.border = '2px solid rgb(59, 153, 252)';
        }
        if (e.keyCode === 32 || e.keyCode === 13) {
          e.preventDefault();
          this._handleClicked();
        }
      }
    })

    this.addEventListener('blur', function () {
      this.$.menuExpandWrapper.style.border = '';
    });
  }

  //custom event for collapse
  collapseCustomEvent(e) {
    let self;
    self = this;
    if (e.keyCode === 37) {
      if (self.expanded === true) {
        self.removeAttribute('expanded');
        self.dispatchEvent(new CustomEvent('collapse', {
          detail: self,
          composed: true,
          bubbles: true
        }));
      }
      for (let i = 0; i < self.children.length; i++) {
        if (self.children[i].hasAttribute('tabindex')) {
          self.children[i].removeAttribute('tabindex');
        }
          self.children[i].$.menuExpandIcon.removeAttribute('tabindex');
          self.children[i].style.border = '';
      }
      self.$.menuExpandWrapper.style.border = '';
    }
  }

  //Expand custom event for expand
  expandCustomEvent(e) {
    let self;
    self = this;
    if (e.keyCode === 39) {
      self.expanded = true;
      self.dispatchEvent(new CustomEvent('expand', {
        detail: self,
        composed: true,
        bubbles: true
      }));
      for (let i = 0; i < self.children.length; i++) {
        if (!self.children[i].hasAttribute('disabled')) {
          if(self.children[i].children.length === 0) {
            self.children[i].setAttribute('tabindex', '0');
          }
          self.children[i].$.menuExpandIcon.setAttribute('tabindex', '0');
          self.setAttribute('aria-labelledby', self.label);
        }
      }
    }
  }

  //Bubble up the "label" property on the click event to parent element
  _handleClicked() {
    if (this.href !== undefined) {
      window.location.href = this.href;
    }
    let clickedElement;
    clickedElement = {
      label: this.value === '' ? this.label : this.value,
      icon: this.icon
    };
    this.dispatchEvent(new CustomEvent('clicked', {
      detail: clickedElement,
      bubbles: true
    }));
    this._handleActive();
  }

  _handleActive() {
    this.active = !this.active;
  }

  _handleExpanded() {
    if (this.expanded === true) {
      this.removeAttribute('expanded');
      this.dispatchEvent(new CustomEvent('collapse', {
        detail: this,
        composed: true,
        bubbles: true
      }));
    } else {
      this.expanded = true;
      this.dispatchEvent(new CustomEvent('expand', {
        detail: this,
        composed: true,
        bubbles: true
      }));
    }
  }
}
window.customElements.define(SHMenuItem.is, SHMenuItem);
