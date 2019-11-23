/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';


class SHDropdown extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        height: auto;
        position: relative;
        display: block;
        translate(0px, 0px);
      }
      .dropdown-label {
        color: var(--text-secondary);
        position: absolute;
        left: 8px;
        width: calc(100% - 48px);
        transition: .2s all ease-in-out;
        pointer-events: none;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        top: 8px;
        font: var(--body-1);
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: .2s all ease-in-out;
        display: flex;
      }
      :host(:not(.empty)) .dropdown-label,
      :host([active]) .dropdown-label {
        top: 4px;
        font: var(--body-2);
        line-height: 16px !important;
      }
      .label-wrapper {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1;
        max-width: fit-content;
      }
      input {
        outline: none;
        border: none;
        cursor: pointer;
        font: var(--body-1);
        line-height: 16px !important;
        color: var(--text-primary);
        background: rgba(var(--ui-1), var(--opacity-7));
        height: 40px;
        border-radius: 2px 2px 0px 0px;
        width: 100%;
        box-sizing: border-box;
        padding: 20px 40px 4px 8px;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        transition: .2s all ease-in-out;
        text-overflow: ellipsis;
        border-bottom: 1px solid transparent;
        border-color: rgba(var(--ui-1), var(--opacity-5));
      }
      :host([active]) input {
        outline: none;
        border-color: rgba(var(--ui-1), var(--opacity-3));
      }
      :host(.empty) input {
        padding: 8px 4px 8px 8px;
      }
      .dropdown-wrapper {
        display: flex;
        flex-direction: row;
        position: relative;
      }
      .content-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      #dropdown-icon {
        position: absolute;
        top: 8px;
        right: 4px;
        transition: .2s color ease-in-out, 0s transform;
        margin: -4px 0;
        color: rgba(var(--ui-1), var(--opacity-4));
      }
      #dropdown-icon:hover,
      #dropdown-icon.hover {
        color: rgba(var(--ui-1), var(--opacity-3));
      }
      :host([active]) #dropdown-icon {
        transform: rotate(180deg);
      }
      .items-wrapper {
        max-height: 200px;
        min-width: 0;
        overflow: auto;
        padding: 0 8px;
        background: rgba(var(--ui-8), var(--opacity-1));
        width: 100%;
        position:fixed;
      }
      :host([disabled]) {
        pointer-events: none;
        cursor: not-allowed;
      }
      :host([disabled]) .dropdown-label,
      :host([disabled]) input,
      :host([disabled]) #dropdown-icon {
        color: var(--text-disabled) !important;
      }
      /* Validation Styles */
      #mandatory {
        display: none;
        color: rgba(var(--ui-2), var(--opacity-1));
      }
      :host([disabled]) #mandatory {
        color: rgba(var(--ui-2), var(--opacity-5)) !important;
      }
      :host([mandatory]) #mandatory {
        display: inline-block;
      }
      :host([error]) input {
        border-color: rgba(var(--functional-red), var(--opacity-1));
      }
      :host([success]) input {
        border-color: rgba(var(--functional-green), var(--opacity-1));
      }
      :host([safety]) input {
        border-color: rgba(var(--functional-yellow), var(--opacity-2));
      }
      :host([readonly]) input{
        background: transparent !important;
        cursor: default;
      }
      :host([readonly]) #dropdown-icon {
        display: none;
      }
      :host([readonly]) input:focus+.dropdown-label {
        color: var(--text-secondary);
      }
      :host([readonly]),
      :host([readonly]) * {
        pointer-events: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      /* condensed styles */
      :host([condensed]:not(.empty)) .dropdown-label {
        display: none;
      }
      :host([condensed]) .dropdown-label {
        top: 4px;
      }
      :host([condensed]) input,
      :host([condensed]) input:focus {
        padding: 4px 8px !important;
        height: 32px;
      }
      :host([condensed]) #dropdown-icon {
        margin-top: -8px;
      }
      /* icon */
      :host([icon]) input {
        padding-left: 48px !important;
      }
      :host([condensed][icon][active]) input,
      :host([condensed][icon]) input{
        padding-left: 48px !important;
      }
      :host([icon]) .dropdown-label {
        padding-left: 40px;
        width: calc(100% - 96px);
      }
      .dropdown-icon {
        position: absolute;
        top: 4px;
        left: 8px;
      }
      :host([condensed]) .dropdown-icon {
        min-height: 24px;
        min-width: 24px;
        font-size: 24px;
        line-height: 26px;
      }
      :host([condensed]) .icon-wrapper {
        top: 4px;
      }
      /* hover */
      :host(:hover:not([active]):not(.no-hovermq)) input, :host(.hover:not([active])) input{
        background: rgba(var(--ui-1), var(--opacity-6));
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
      /* helper text */
      .helper-text {
        padding: 0 8px;
        box-sizing: border-box;
        line-height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :host([error-message]) .hint {
        display: none;
      }
      :host([disabled]) .helper-text {
        color: var(--text-disabled);
      }
      /* status icons */
      .icon-wrapper {
        position: absolute;
        top: 8px;
        right: 40px;
      }
      :host([readonly]) .icon-wrapper {
        right: 8px;
      }
      :host(:not([error])) .error-icon,
      :host(:not([success])) .success-icon {
        display: none;
      }
      :host([success]) .dropdown-label,
      :host([error]) .dropdown-label {
        width: calc(100% - 48px - 32px)
      }
      :host([success]:not([readonly])) input,
      :host([error]:not([readonly])) input {
        padding-right: 72px;
      }
      :host([no-border]) input {
        border-bottom: none;
      }
    </style>

    <!--HTML-->
    <div class="dropdown-wrapper" on-click="_handleActive">
      <div class="content-wrapper">
        <sh-icon icon$="[[icon]]" class="dropdown-icon"></sh-icon>
        <input id="dropdownInput" type="text" value$="{{value::input}}" readonly disabled$="{{disabled}}">
        <div class="dropdown-label">
          <div class="label-wrapper">[[label]]</div>
          <span id="mandatory"> *</span>
        </div>
      </div>
      <div class="icon-wrapper">
        <sh-icon icon="error" class="error-icon" size="s" color="rgb(var(--functional-red))"></sh-icon>
        <sh-icon icon="success" class="success-icon" size="s" color="rgb(var(--functional-green))"></sh-icon>
      </div>
      <sh-icon icon="down-s" id="dropdown-icon" button=""></sh-icon>
    </div>
    <sh-popover class="items-wrapper" visible$="[[active]]">
      <slot></slot>
    </sh-popover>
    <sh-text size="body-2" class="helper-text hint" color="secondary">[[hint]]</sh-text>
    <sh-text size="body-2" class="helper-text error-message" color="secondary">[[errorMessage]]</sh-text>
`;
  }

  static get is() {
    return 'sh-dropdown';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: 'label',
        notify: true,
        reflectToAttribute: true
      },
      value: {
        type: String,
        value: '',
        notify: true,
        reflectToAttribute: true,
        observer: '_emptyObserver'
      },
      hint: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      icon: {
        type: String,
        notify: true,
        reflectToAttribute: true
      },
      active: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: '_activeObserver'
      },
      role: {
        type: String,
        value: 'listbox',
        notify: true,
        reflectToAttribute: true
      },
      isDropUp: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      error: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      errorMessage: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      safety: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      readonly: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      condensed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true,
        observer: '_condensedObserver'
      },
      currentFocus: {
        value: -1,
        type: Number,
        notify: true,
        reflectToAttribute: true
      },
      multiSelect: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      noBorder: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      }
    };
  }
  constructor() {
    super();
  }
  ready() {
    super.ready();
    let self;
    self = this;
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    self._options = [];
    let childOptions;
    childOptions = this.children;
    for (let counter = 0; counter < childOptions.length; counter++) {
      if (childOptions[counter].tagName.toString().toLowerCase() === 'sh-menu-item') {
        self._options.push(childOptions[counter]);
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    let self;
    let menuItemWrapper;
    let menuItem;
    self = this;
    if(!this.multiSelect) {
      this._updateValue();
   }
    this.shadowRoot.querySelector('#dropdownInput').addEventListener('mouseover', function () {
      if (this.offsetWidth < this.scrollWidth) {
        this.setAttribute('title', this.value);
      } else {
        this.removeAttribute('title');
      }
    });
    if (self.multiSelect) {
      let menuItem;
      menuItem = self.querySelectorAll('sh-menu-item');
      for (let i = 0; i < menuItem.length; i++) {
        menuItem[i].setAttribute('checkbox', true);
      }
    }
    menuItemWrapper = self.shadowRoot.querySelector('.items-wrapper');
    self.parentElement.addEventListener('scroll', e => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
    this.addEventListener('blur', function () {
      this.shadowRoot.querySelector('#dropdown-icon').style.outline = '';
    });
    this.addEventListener('keydown', function (e) {
      if (e.keyCode === 40 || e.keyCode === 38) {
        e.preventDefault();
      }
    });
    self.multiValue = [];
    this.addEventListener('clicked', function (e) {
      let val;
      if (self.value === '') {
        self.multiValue = [];
      }
      if ((e.target.value !== '')) {
        val = e.target.value;
      } else {
        val = e.target.label;
      }
      if (self.multiSelect) {
        if (e.target.active) {
          self.multiValue = self.multiValue.filter(item => item !== val);
        } else {
          self.multiValue.push(val);
        }
        this.value = self.multiValue.toString();
      } else {
        this.value = e.detail.label;
        this.icon = e.detail.icon;
        this._updateElement();
        this._handleActive();
      }
    });
    menuItem = this.children;
    if (this.value !== '') {
      for (let i = 0; i < menuItem.length; i++) {
        menuItem[i].removeAttribute('active');
        if (this.value === menuItem[i].getAttribute('label')) {
          menuItem[i].setAttribute('active', true);
        }
      }
    } else {
      if(!this.multiSelect ) {
        for (let i = 0; i < menuItem.length; i++) {
          if (menuItem[i].getAttribute('active') === '') {
            this.value = menuItem[i].getAttribute('label');
            this.icon = menuItem[i].getAttribute('icon');
          }
        }
      }
    }
    if (this.multiSelect) {
      if(this.value!=='') {
      let val,arr;
      val = this.value;
      this.multiValue = val.split(',');
      arr = this.multiValue;
      for (let i = 0; i < menuItem.length; i++) {
        menuItem[i].removeAttribute('active');
        for (let j = 0; j < arr.length; j++) {
          if (arr[j] === menuItem[i].getAttribute('label')) {
            menuItem[i].setAttribute('active', true);
          }
        }
      }
    }

   else {
      let arr = [];
      for (let i = 0; i < menuItem.length; i++) {
        if(menuItem[i].getAttribute('active') === '') {
          arr.push(menuItem[i].getAttribute('label'));
        }
      }
      this.multiValue = arr;
      this.value = arr.toString();
   }
  }
    /* When body is clicked, check if dropdown is clicked or not. If dropdown is clicked, toggle it open or close. */
    document.body.addEventListener('click', e => this._closeDropdown(e));
    /* Actions to perform on focus of input (Actions to perform when dropdown is closed) */
    this.$.dropdownInput.addEventListener('focus', function () {
      this.onkeyup = function (e) {
        if (self.multiSelect) {
          self.keyEvents(e);
        } else {
          /* Enter key to toggle open/ close dropdown */
          if (e.keyCode === 13) {
            self._handleActive();
            if (!self.active) {
              self.$.dropdownInput.focus();
            }
            self.shadowRoot.querySelector('#dropdown-icon').style.outline = '2px solid rgb(59, 153, 252)';
          }
          /* Space key to do nothing */
          if (e.keyCode === 32) {
            e.stopPropagation();
            e.preventDefault();
          }
          /* Down arrow to move down */
          if (e.keyCode === 40 || e.keyCode === 39) {
            if (self.multiSelect) {
              return;
            }
            let newValueIndex;
            if (self.value !== '') {
              for (let i = 0; i < self._options.length; i++) {
                if (self.value === self._options[i].value || self.value === self._options[i].label) {
                  self._sel_value_index = i;
                }
              }
              newValueIndex = self._navigateAndReturnNewIndex('down', self._options, self._sel_value_index);
            } else {
              newValueIndex = 0;
            }
            if ((self._options[newValueIndex].value)) {
              self.value = self._options[newValueIndex].value;
            } else {
              self.value = self._options[newValueIndex].label;
            }
            if (self._options[newValueIndex].icon !== undefined) {
              self.icon = self._options[newValueIndex].icon;
            } else {
              self.removeAttribute('icon');
            }
            for (let i = 0; i < self.children.length; i++) {
              self.children[i].removeAttribute('active');
              self.children[i].active = false;
            }
            self.children[newValueIndex].active = true;
            self.children[newValueIndex].setAttribute('active', true);
            self.children[newValueIndex].focus();
            self.$.dropdownInput.focus();
            e.preventDefault();
            e.stopPropagation();
          }

          /** Up arrow to move up */

          if (e.keyCode === 38 || e.keyCode === 37) {
            if (self.multiSelect) {
              return;
            }
            let newValueIndex;
            if (self.value !== '') {
              for (let i3 = 0; i3 < self._options.length; i3++) {
                if (self.value === self._options[i3].value || self.value === self._options[i3].label) {
                  self._sel_value_index = i3;
                }
              }
              newValueIndex = self._navigateAndReturnNewIndex('up', self._options, self._sel_value_index);
            } else {
              newValueIndex = 0;
            }
            if ((self._options[newValueIndex].value)) {
              self.value = self._options[newValueIndex].value;
            } else {
              self.value = self._options[newValueIndex].label;
            }
            if (self._options[newValueIndex].icon !== undefined) {
              self.icon = self._options[newValueIndex].icon;
            } else {
              self.removeAttribute('icon');
            }
            for (let i4 = 0; i4 < self.children.length; i4++) {
              self.children[i4].removeAttribute('active');
              self.children[i4].active = false;
            }
            self.children[newValueIndex].active = true;
            self.children[newValueIndex].setAttribute('active', true);
            self.children[newValueIndex].focus();
            self.$.dropdownInput.focus();
            e.preventDefault();
            e.stopPropagation();
          }
          /* Escape key to move up */
          if (e.keyCode === 27 && self.active) {
            self._handleActive();
          }
        }
      };
    });
    if (self.parentElement.tagName === 'SH-TABLE-CELL') {
      self.condensed = true;
    }
    /* For adding blue outline to down - arrow icon */
    document.body.addEventListener('keyup', e => this._addBlueOutline(e));
    let lastDropdownChild;
    let firstDropdownChild;
    lastDropdownChild = this.children[this.children.length - 1];
    firstDropdownChild = this.children[0];
    /* Actions to perform on opening the dropdown */
    menuItemWrapper.addEventListener('keyup', function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        if (self.multiSelect) {
          return;
        }
        self.shadowRoot.querySelector('#dropdown-icon').style.outline = '2px solid rgb(59, 153, 252)';
        self.$.dropdownInput.focus();
        if (e.keyCode === 32) {
          e.stopPropagation();
        }
      }
      if (e.keyCode === 27) {
        self._handleActive();
      }
      if (e.keyCode === 9) {
        let highlightedMenuItem;
        highlightedMenuItem = e.target;
        if (self.multiSelect) {
          return;
        }
        if ((highlightedMenuItem.value)) {
          self.value = highlightedMenuItem.value;
        } else {
          self.value = highlightedMenuItem.label;
        }
        if (highlightedMenuItem.icon !== undefined) {
          self.icon = highlightedMenuItem.icon;
        } else {
          self.removeAttribute('icon');
        }
      }
    });
    /* Closing dropdown if tabbing too much  */
    menuItemWrapper.addEventListener('keydown', function (e) {
      if (e.keyCode === 9) {
        if (e.shiftKey === false && e.target === lastDropdownChild) {
          self._handleActive();
          self.blur();
          if (self.nextElementSibling) {
            self.nextElementSibling.focus();
          }
        } else if (e.shiftKey === true && e.target === firstDropdownChild) {
          self._handleActive();
          self.blur();
          if (self.previousElementSibling) {
            self.previousElementSibling.focus();
          }
        } else {
          // do nothing
        }
      }
    });
  }
  keyEvents(e) {
    let self,
      menuItems;
    self = this;
    menuItems = self.children;
    if (e.keyCode === 40) {
      self.currentFocus++;
      self.addActive(menuItems);
      self.children[self.currentFocus].focus();
      self.$.dropdownInput.focus();
    }
    else if (e.keyCode === 38) {
      self.currentFocus--;
      self.addActive(menuItems);
      self.children[self.currentFocus].focus();
      self.$.dropdownInput.focus();
    }
    else if (e.keyCode === 13) {
      let dropIconFocus;
      dropIconFocus = self.shadowRoot.querySelector('#dropdown-icon').style.outline;
      if (dropIconFocus !== '') {
        self._handleActive();
      }
      else {
        if (self.currentFocus > -1 && self.active) {
          let val;
          let item;
          let itemActive;
          item = this.children[this.currentFocus];
          itemActive = this.children[this.currentFocus].active;
          if (self.value === '') {
            self.multiValue = [];
          }
          if((item.value !== '')) {
            val = item.value;
          }
          else {
            val =  item.label;
          }
          if (itemActive) {
            this.children[this.currentFocus].removeAttribute('active');
            self.multiValue = self.multiValue.filter(item => item !== val);
          }
          else {
            this.children[this.currentFocus].setAttribute('active', true);
            self.multiValue.push(val);
          }
          this.value = self.multiValue.toString();
        }
      }
      if (self.currentFocus > -1 && menuItems) {
        menuItems[self.currentFocus].click();
      }
    }
    else {
      // do nothing
    }

    if (e.keyCode === 27 && self.active) {
      self._handleActive();
    }
  }
  addActive(menuItem) {
    if (!menuItem) {
      return false;
    }
    this.removeActive(menuItem);
    if (this.currentFocus >= menuItem.length) {
      this.currentFocus = 0;
    }
    if (this.currentFocus < 0) {
      this.currentFocus = (menuItem.length - 1);
    }
    menuItem[this.currentFocus].shadowRoot.querySelector('.menu-item-wrapper').classList.add('focused');
    return;
  }
  removeActive(menuItem) {
    for (let i = 0; i < menuItem.length; i++) {
      menuItem[i].shadowRoot.querySelector('.menu-item-wrapper').classList.remove('focused');
    }
  }

  /* Helper function to calculate index of menu-item selected on navigation with key */
  _navigateAndReturnNewIndex(direction, options, index) {
    if (direction === 'down') {
      if (index === (options.length - 1)) {
        return index;
      }
      else {
        return (index + 1);
      }
    }
    else {
      if (index === 0) {
        return index;
      }
      else {
        return (index - 1);
      }
    }
  }
  _activeObserver(isActive) {
    let self;
    self = this;
    if (!isActive) {
      let alldropDowns;
      alldropDowns = self.children;
      for (let i = 0; i < alldropDowns.length; i++) {
        alldropDowns[i].style.border = '';
        alldropDowns[i].blur();
      }
    }
  }
  _condensedObserver(isCondensed) {
    let self;
    self = this;
    if (isCondensed) {
      self.setAttribute('condensed', 'true');
    }
    else {
      self.removeAttribute('condensed');
    }
  }
  _emptyObserver() {
    if (this.value === '') {
      this.classList.add('empty');
    }
    else {
      this.classList.remove('empty');
    }
    if(!this.multiSelect) {
      this._updateValue();
    }
  }
  //update the value and icon for dropdown
  _updateValue() {
    let self;
    self = this;
    if(self._options !== undefined) {
      for (let i = 0; i < self._options.length; i++) {
        if (self.value === self._options[i].value || self.value === self._options[i].label) {
          self._options[i].setAttribute('active', true);
          if (self._options[i].icon !== undefined) {
            self.setAttribute('icon', self._options[i].icon )
          }
        }
        else {
          if(self._options[i].icon !== undefined) {
            self._options[i].removeAttribute('active');
          }
        }
      }
    }
  }

  _handleActive() {
    let _this;
    _this = this;
    if (this.currentFocus >= 0 && this.multiSelect) {
      this.children[this.currentFocus].shadowRoot.querySelector('.menu-item-wrapper').classList.remove('focused');
      this.currentFocus = -1;
    }
    if (!this.readonly) {
      this.active = !this.active;
      this._handleOffset();
    }
    // reposition every 1 sec
    this.reposition = setInterval(function () {
      _this._handleOffset();
      if (!_this.active) {
        clearInterval(this.reposition);
      }
    }, 10);
  }
  _handleOffset() {
    let menu;
    menu = this.shadowRoot.querySelector('sh-popover');
    let hintHeight;
    hintHeight = 0;
    menu.visible = this.active;
    // position menu in X axis
    menu.style.left = this.offsetX + 'px';
    menu.style.width = this.offsetWidth + 'px';
    // position menu in Y axis
    if (this.hint || this.errorMessage) {
      hintHeight = 24;
    }
    // extracting the parent element here
    let parentEl;
    parentEl = this.parentElement;
    let transformPresent;
    let transformedParent;
    /**
     * Check for parent elements up the DOM tree from this dropdown
     * which have css transform property set.
     * If the css transform property is set to something, (translation), then
     * we store that parent element and raise a flag
     *
     * Later we use this flag and this stored parent element to correctly
     * determine the css top value of the internal popover
     */
    while(parentEl.tagName !== 'HTML') {
      if(getComputedStyle(parentEl).transform !== 'none') {
        transformPresent =  true;
        transformedParent = parentEl;
        break;
      }
      else {
        transformPresent = false;
      }
      parentEl = parentEl.parentElement;
    }
    this.offsetY = this.getBoundingClientRect().top;

    /**
     * Variables used in this function and their intended meanings:
     * 
     * 1. menu              - the popover
     *
     * 2. parentEl          - the parent element as mentioned above
     *
     * 3. this.offsetY      - the dropdown's distance from top of the page
     *                        in pixels got by getBoundingClientRect()
     *
     * 4. menu.clientHeight - the popover's height
     *
     * 5. this.offsetHeight - the dropdown input's height
     *
     * 6. hintHeight        - the height of the hint text
     *
     * 7. transformPresent  - flag to indicate presence of parent with css transform
     *                        property set.
     *
     * 8. transformParent   - the parent element with the css transform property set.
     *
     * If the bottom of the dropdown container which is measured as
     * (popover height (this.offsetHeight) + top of dropdown (this.offsetY) +
     *  dropdown-input height(menu.clientHeight)),
     * is greater than window inner height, then that means the dropdown container
     * goes beyond the window.
     * This means that the dropdown must drop-up.
     *
     * If the transform property is set on the parent...
     * then..
     * popover top must be 0 - the transformed parents top + dropdown's top - popover's height
     * (because top 0px on the dropdown stays to the top of the transformed parent
     * and not at the top of the page. This is why we have to first set the popover to
     * be at the top of the page by [ 0 - transformed parents top ] which would be like
     * a reference point and then take the dropdown's top, dropdown's input height,
     * popover-height, hint-height, etc to correctly set the top value of the popover according
     * to whether it is drop-up or not).
     *
     * Else, go by the normal calculations.
     */

    if (this.offsetY + menu.clientHeight + this.offsetHeight > window.innerHeight || this.isDropUp) {
      if(transformPresent) {
        menu.style.top = 0 - transformedParent.getBoundingClientRect().top + this.offsetY - menu.clientHeight - hintHeight + 'px';
      }
      else {
        menu.style.top = this.offsetY - menu.clientHeight - hintHeight + 'px';
      }
    }
    else {
      if(transformPresent) {
        menu.style.top = 0 - transformedParent.getBoundingClientRect().top + this.offsetY + this.offsetHeight + 'px';
      }
      else {
        menu.style.top = this.offsetY + this.offsetHeight + 'px';
      }
    }
  }
  
  _updateElement() {
    let childElement;
    childElement = this.querySelectorAll('sh-menu-item[active]');
    for (let i = 0; i < childElement.length; i++) {
      childElement[i].removeAttribute('active');
    }
  }
  _closeDropdown(e) {
    let self;
    let target;
    self = this;
    target = e.target;
    if (target === self || target.parentElement === self) {
      return;
    }
    else {
      if (this.active) {
        this._handleActive();
      }
      else {
        return;
      }
    }
  }
  /* Adding blue outline to dropdown icon */
  _addBlueOutline(event) {
    if (event.keyCode === 9 && event.target === this) {
      this.shadowRoot.querySelector('#dropdown-icon').style.outline = '2px solid rgb(59, 153, 252)';
    }
  }
}
window.customElements.define(SHDropdown.is, SHDropdown);