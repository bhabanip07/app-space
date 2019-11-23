/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SHInputNumber extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        height: auto;
        position: relative;
        display: flex;
        flex-direction: column;
      }
      .host-wrapper {
        width: 100%;
      }
      .input-number-label {
        color: var(--text-secondary);
        position: absolute;
        left: 8px;
        width: calc(100% - 72px);
        transition: .2s all ease-in-out;
        pointer-events: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        top: 8px;
        font: var(--body-1);
        line-height: 24px;
        display: flex;
      }
      :host(:not(.empty)) .input-number-label {
        top: 4px;
        font: var(--body-2);
        line-height: 16px;
      }
      .label-wrapper {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1;
        max-width: fit-content;
      }
      input,
      :host([readonly]) input:focus {
        outline: none;
        border: none;
        font: var(--body-1);
        line-height: 20px !important;
        color: var(--text-primary);
        background: rgba(var(--ui-1), var(--opacity-7));
        height: 40px;
        line-height: 16px;
        border-radius: 2px 2px 0px 0px;
        width: 100%;
        box-sizing: border-box;
        padding: 20px 72px 4px 8px;
        text-overflow: ellipsis;
        transition: .2s all ease-in-out;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        -webkit-appearance: none;
        border-bottom: 1px solid transparent;
        border-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([no-arrows]) .icon-slot {
        display: none;
      }
      input,
      :host([no-arrows]) input:focus {
        padding: 20px 4px 4px 8px;
      }
      :host([readonly]) input {
        padding: 20px 8px 4px 8px;
      }
      :host([no-arrows]) #clear {
        right: 4px;
      }
      :host(:hover:not(.empty):not([disabled]):not([readonly])) input,
      :host([error]:not([readonly])) input,
      :host([success]:not([readonly])) input {
        padding-right: 104px !important;
      }
      :host(:hover[no-arrows]:not(.empty):not([disabled]):not([readonly])) input,
      :host([error]:not([readonly])) input,
      :host([success]:not([readonly])) input {
        padding-right: 36px !important;
      }
      :host([error][readonly]) input,
      :host([success][readonly]) input {
        padding-right: 40px !important;
      }
      :host(:hover[error]:not(.empty):not([disabled]):not([readonly])) input,
      :host(:hover[success]:not(.empty):not([disabled]):not([readonly])) input,
      :host([error]:not(.empty):not([disabled]):not([readonly])) input {
        padding-right: 136px !important;
      }
      :host([readonly]:not([error]):not([success])) .input-number-label {
        width: calc(100% - 16px);
      }
      /* focus */
      input:focus:not([error]),
      input:focus:not([success]),
      input:focus:not([safety]) {
        border-color: rgba(var(--ui-1), var(--opacity-3));
      }
      input::-ms-clear {
        display: none;
      }
      input:focus {
        outline: none;
      }
      :host(:not([condensed])) input:focus+.input-number-label {
        top: 4px !important;
        font: var(--body-2) !important;
      }
      :host(:not([condensed]):not(.empty)) input:focus+.input-number-label{
        width:calc(100% - 112px);
      } 
      :host([readonly]) input:focus+.input-number-label{
        color: var(--text-secondary);
      }
      :host(.empty) input:not(:focus:invalid) {
        padding: 8px;
      }
      :host([disabled]) input {
        cursor: default;
        resize: none !important;
        pointer-events: none;
      }
      :host([readonly]) input {
        cursor: default;
        pointer-events: none;
        background: transparent !important;
      }
      .content-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
      }
      .icon-wrapper {
        position: absolute;
        top: 8px;
        right: 72px;
      }
      :host([readonly]) .icon-wrapper {
        right: 8px;
      }
      /*condensed*/
      :host([condensed]) .input-number-label {
        display: none;
      }
      :host(.empty[condensed]) .input-number-label {
        display: block;
        top: 4px;
        font: var(--body-1);
        line-height: 24px;
      }
      :host([condensed]) input,
      :host([condensed]) input:focus {
        padding-top: 4px;
        padding-bottom: 4px;
        height: 32px;
      }
      :host([condensed]) #plus,
      :host([condensed]) #minus{
        margin-top : -4px;
      }
      :host([condensed]) .icon-wrapper,
      :host([condensed]) #clear {
        top: 4px;
      }
      :host([disabled]) .input-number-label,
      :host([disabled]) input {
        color: var(--text-disabled) !important;
      }
      /* Clear Field Icon */
      #clear {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        transition: .2s all ease-in-out;
        cursor: pointer;
        right: 72px;
        top: 8px;
      }
      :host([readonly]) #clear,
      :host([disabled]) #clear,
      :host([no-clear]) #clear,
      :host(.empty) #clear {
        display: none !important;
      }
      :host([no-clear]) input {
        padding: 16px 80px 0px 8px !important;
      }
      :host([error]) #clear,
      :host([success]) #clear {
        right: 104px;
      }
      /* Validation Styles */
      #mandatory {
        display: none;
        color: rgba(var(--ui-2), var(--opacity-1));
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
      :host([mandatory]) #mandatory {
        display: inline-block;
      }
      :host([disabled]) #mandatory {
        color: rgba(var(--ui-2), var(--opacity-5)) !important;
      }
      /* Stepper Styles */
      input::-webkit-inner-spin-button {
        display: none;
      }
      .icon-slot {
        display: flex;
        flex-direction: row;
        position: absolute;
        top: 4px;
        right: 4px;
      }
      :host([readonly]) .icon-slot {
        display: none;
      }
      :host([disabled]) .icon-slot>* {
        pointer-events: none;
        color: rgba(var(--ui-1), var(--opacity-5));
      }
      /* hover */
      :host(.empty:not(.no-hovermq)) input:hover:not(:focus),
      :host(.empty.no-hovermq) input:hover:not(:focus) {
        background: rgba(var(--ui-1), var(--opacity-6)) !important;
      }
      :host(:not([readonly]):not(.no-hovermq)) input:hover:not(:focus),
      :host(:not([readonly]).no-hovermq) input:hover:not(:focus) {
        background: rgba(var(--ui-1), var(--opacity-7));
      }
      :host(:hover:not(.empty)) #clear,
      :host(:focus:not(.empty)) #clear,
      :host([error]:not(.empty)) #clear {
        opacity: 1;
        pointer-events: all;
      }
      input:invalid~.input-number-label {
        top: 4px !important;
        font: var(--body-2) !important;
        line-height: 16px !important;
      }
      input:invalid {
        padding: 20px 104px 4px 8px;
      }
      :host(:hover) input:invalid~#clear {
        opacity: 1 !important;
        pointer-events: all !important;
        display: block !important;
      }
      :host([disabled]) #plus,
      :host([disabled]) #minus {
        color:rgba(var(--ui-1),var(--opacity-5)) !important
      }
      :host input:hover {
        background: rgba(var(--ui-1), var(--opacity-6)) !important;
      }
      :host(:hover) #clear {
        opacity:1 !important;
      }
      /* test css */
      :host(.testing), :host(.testing) *{
        transition: all 0s linear;
      }
      :host(.empty:not(.no-hovermq)) input:hover:not(:focus),
      :host(.empty.no-hovermq) input:hover:not(:focus),
      :host(.empty:not(.no-hovermq)) input.hover:not(:focus),
      :host(.empty.no-hovermq) input.hover:not(:focus) {
        background: rgba(var(--ui-1), var(--opacity-6)) !important;
      }
      :host(:not([readonly]):not(.no-hovermq)) input:hover:not(:focus),
      :host(:not([readonly]).no-hovermq) input:hover:not(:focus),
      :host(:not([readonly]):not(.no-hovermq)) input.hover:not(:focus),
      :host(:not([readonly]).no-hovermq) input.hover:not(:focus) {
        background: rgba(var(--ui-1), var(--opacity-7));
      }
      :host(:hover) input:invalid~#clear,
      :host(.hover) input:invalid~#clear {
        opacity: 1 !important;
        pointer-events: all !important;
        display: block !important;
      }
      :host input:hover,
      :host input.hover {
        background: rgba(var(--ui-1), var(--opacity-6)) !important;
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
      /* keypad */
      .keypad-wrapper.open {
        visibility: visible;
        opacity: 1;
        overflow: visible;
        max-height: fit-content;
        height: fit-content;
        padding: 16px;
      }
      .keypad-wrapper {
        visibility: hidden;
        opacity: 0;
        overflow: hidden;
        transition: .2s all ease-in-out, .2s max-height ease-in-out, 0s padding ease-in-out;
        max-height: 0px;
        height: 0px;
        width: 208px;
        box-shadow: var(--shadow-raised);
        z-index: 9999;
        position: absolute;
        background-color: var(--base-3);
        box-sizing: border-box;
        top: 40px;
      }
      :host([condensed]) .keypad-wrapper {
        top: 32px;
      }
      .keypad-main-frame {
        width: 176px;
        height: 240px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
      }
      .circle-buttons {
        transition: .2s all ease-in-out;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display:flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(var(--ui-1), var(--opacity-6));
        font: var(--header-2);
        color: var(--text-primary);
        cursor: pointer;
      }
      .circle-buttons:hover {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }
      .circle-buttons:active {
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }
      .erase-button sh-icon {
        margin-right: 3px;
        margin-bottom: 3px
      }
      .erase-button {
        background-color: transparent;
      }
      .functions-wrapper {
        position: relative;
        display: flex;
        width: 176px;
        justify-content: space-around;
      }
      .footer-wrapper {
        position: relative;
        margin:0 auto;
        display: flex;
        justify-content: flex-end;
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
      :host(:not([error])) .error-icon, 
      :host(:not([success])) .success-icon {
        display: none;
      }
      :host([error]:not([readonly])) .input-number-label,
      :host([success]:not([readonly])) .input-number-label,
      :host(:hover:not(.empty):not([disabled]):not([readonly])) .input-number-label,
      :host(:focus:not(.empty):not([disabled]):not([readonly])) .input-number-label {
        width: calc(100% - 112px);
      }
      :host([error][readonly]) .input-number-label,
      :host([success][readonly]) .input-number-label {
        width: calc(100% - 48px);
      }
      :host(:hover[error]:not(.empty):not([disabled]):not([readonly])) .input-number-label,
      :host(:hover[success]:not(.empty):not([disabled]):not([readonly])) .input-number-label,
      :host([error]:not(.empty):not([disabled]):not([readonly])) .input-number-label {
        width: calc(100% - 144px) !important;
      }
    </style>

    <!--HTML-->
  
    <div class="host-wrapper">
      <div class="content-wrapper">
        <input id="input" type="number" value="{{value::input}}" readonly$="{{readonly}}" min="[[min]]" max="[[max]]" step="[[step]]" disabled$="{{disabled}}">
        <div class="input-number-label">
          <div class="label-wrapper">[[label]]</div>
          <span id="mandatory"> *</span>
        </div>
        <sh-icon button size="s" icon="cancel" on-click="_clearField" id="clear"></sh-icon>
        <div class="icon-slot">
          <sh-icon button icon="left-s" id="minus" on-click="_handleMinus" on-mousedown="_startMinusCounter" on-mouseup="_releaseMinusCounter" on-touchstart="_startMinusCounter" on-touchend="_releaseMinusCounter"></sh-icon>
          <sh-icon button icon="right-s" id="plus" on-click="_handlePlus" on-mousedown="_startPlusCounter" on-mouseup="_releasePlusCounter" on-touchstart="_startPlusCounter" on-touchend="_releasePlusCounter"></sh-icon>
        </div>
      </div>
      <div class="keypad-wrapper">
        <div class="functions-wrapper">
          <slot name="functions"></slot>
        </div>
        <div class="keypad-main-frame">
          <div class="circle-buttons">1</div>
          <div class="circle-buttons">2</div>
          <div class="circle-buttons">3</div>
          <div class="circle-buttons">4</div>
          <div class="circle-buttons">5</div>
          <div class="circle-buttons">6</div>
          <div class="circle-buttons">7</div>
          <div class="circle-buttons">8</div>
          <div class="circle-buttons">9</div>
          <div class="circle-buttons">.</div>
          <div class="circle-buttons">0</div>
          <div class="circle-buttons erase-button"><sh-icon icon="delete-number"></sh-icon></div>
        </div>
        <sh-divider class="divider" spacing="m"></sh-divider>
        <div class="footer-wrapper">
          <slot name="footer" id="footer"></slot>
        </div>
      </div>
      <div class="icon-wrapper">
        <slot name="icon" id="icon"></slot>
        <sh-icon icon="error" class="error-icon" size="s" color="rgb(var(--functional-red))"></sh-icon>
        <sh-icon icon="success" class="success-icon" size="s" color="rgb(var(--functional-green))"></sh-icon>
      </div>
    </div>
    <sh-text size="body-2" class="helper-text hint" color="secondary">[[hint]]</sh-text>
    <sh-text size="body-2" class="helper-text error-message" color="secondary">[[errorMessage]]</sh-text>
`;
  }

  static get is() {
    return 'sh-input-number';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: 'Label',
        reflectToAttribute: true,
        notify: true
      },
      value: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true,
        observer: '_emptyObserver'
      },
      min: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      max: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      step: {
        type: String,
        value: '1',
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
      role: {
        type: String,
        value: 'textbox',
        reflectToAttribute: true,
        notify: true
      },
      condensed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true,
        observer: '_condensedCellObserver'
      },
      errorMessage: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      hint: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      error: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      mandatory: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      safety: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      decimals: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true,
        observer: '_decimalsObserver'
      },
      inputDisabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      keypad: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      scrollIntoView: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      scrollingParentId: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      noClear: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      noArrows: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      }

    };
  }

  constructor() {
    super();
    this.boundMove = this._releasePlusCounter.bind(this);
  }
  ready() {
    super.ready();
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    if (!this.disabled && !this.readonly) {
      this.$.clear.setAttribute('tabindex', '0');
    }
    if (!this.disabled && this.shadowRoot.querySelectorAll('sh-icon').length > 0) {
      for (let i = 0; i < this.shadowRoot.querySelectorAll('sh-icon').length; i++) {
        this.shadowRoot.querySelectorAll('sh-icon')[i].setAttribute('tabindex', '0');
      }
    }
    let footerNodes;
    footerNodes = this.$.footer.assignedNodes({
      flatten: true
    });
    if (footerNodes.length === 0) {
      this.shadowRoot.querySelector('.divider').style.display = 'none';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    let self;
    self = this;
    window.addEventListener('mousemove', self.boundMove);
    this.$.input.addEventListener('focus', function () {
      if (self.readonly) {
        return;
      }
      if (self.value === '') {
        this.removeAttribute('value');
        this.value = '';
        this.setAttribute('value', this.value);
      }
      self.$.input.onkeydown= function (e) {
        if (e.which === 38 || e.which === 40) {
          e.preventDefault();
        }
        if (e.keyCode === 38) {
          e.preventDefault();
          self._handlePlus();
        }
        if (e.keyCode === 40) {
          self._handleMinus();
        }
      }
      if (self.keypad && self.readonly === false && self.disabled === false) {
        self.shadowRoot.querySelector('.keypad-wrapper').classList.add('open');
        self.shadowRoot.querySelector('input').readonly = true;


        if (self.scrollIntoView === true) {
          let scrollParent,
            scrollParentTagName,
            selector,
            hasShadowRoot,
            scrollingElement;
          scrollParent = document.querySelector('#' + self.scrollingParentId);
          scrollParentTagName = scrollParent.tagName.toString().toLowerCase();
          switch (scrollParentTagName) {
            case 'sh-card':
            case 'sh-pane': {
              selector = '.body-wrapper';
              hasShadowRoot = true;
            }
            break;
          case 'sh-page': {
            selector = '.main-wrapper';
            hasShadowRoot = true;
          }
          break;
          default: {
            hasShadowRoot = false;
          }
          }
          if (hasShadowRoot) {
            scrollingElement = scrollParent.shadowRoot.querySelector(selector);
          } else {
            scrollingElement = scrollParent;
          }

          setTimeout(() => {
            scrollingElement.style.scrollBehaviour = 'smooth';
            let contentWrapper;
            contentWrapper = self.shadowRoot.querySelector('.keypad-wrapper');
            contentWrapper.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }, 250);
          setTimeout(() => {
            let inputField;
            inputField = self.shadowRoot.querySelector('#input');
            inputField.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }, 500);
        }
        // variable to indicate the presence of children with slot='functions'
        let haveFunctionIcons;
        for (let i = 0; i < self.children.length; i++) {
          let child;
          child = self.children[i];
          if (child.slot === 'functions') {
            haveFunctionIcons = true;
            break;
          } else {
            haveFunctionIcons = false;
          }
        }
        if (haveFunctionIcons) {
          self.shadowRoot.querySelector('.functions-wrapper').style.marginBottom = '16px';
        } else {
          self.shadowRoot.querySelector('.functions-wrapper').style.marginBottom = '0px';
        }
      }
    });
    this.$.clear.addEventListener('focus', function () {
      this.onkeyup = function (e) {
        if (e.keyCode === 13) {
          self._clearField();
        }
        if (e.keyCode === 9) {
          this.style.outline = '2px solid rgb(59, 153, 252)';
        }
        this.style.outlineOffset = '-2px';
      };
    });

    this.addEventListener('blur', function (e) {
      if (!self.keypad) {
        this._finalCheck();
        this._checkMaxMin();
      }
      if (!self.keypad) {
        this._finalCheck();
        this._checkMaxMin();
      }
    });
    this.shadowRoot.querySelector('.keypad-wrapper').addEventListener('blur', function () {
      self._finalCheck();
      self._checkMaxMin();
    });

    if (self.parentElement.tagName === 'SH-TABLE-CELL') {
      self.condensed = true;
    }
    let numVal,
      numMin,
      numMax;
    numVal = Number(self.value);
    numMin = Number(self.min);
    numMax = Number(self.max);

    if (self.min && self.max) {
      if (numVal >= numMin && numVal <= numMax && isNaN(numVal) === false) {
        this.stableValue = Number(this.value);
      }
    } else {
      if (isNaN(numVal) === false) {
        this.stableValue = Number(this.value);
      }
    }
    /* extracting the button value and appending to value */
    this.shadowRoot.querySelectorAll('.circle-buttons').forEach(element => {
      element.addEventListener('click', function (e) {
        let buttonValue;
        buttonValue = Number(e.target.innerHTML.toString());
        /* if button's value is either dot, comma or number, then append the value of the button */
        if ((buttonValue >= 0 && buttonValue <= 9)) {
          self.value = self.value + e.target.innerHTML.toString();
        }
        if (e.target.innerHTML == '.') {
          self.value = self.value + '.';
        }
        /* if button is erase icon, then remove the last character of the value (erase from last) */
        if (e.target.tagName === 'SH-ICON') {
          self.value = self.value.toString().substring(0, self.value.toString().length - 1);
        }
      });
    });
    /* close keypad after clicking outside the input-number element */
    document.body.addEventListener('click', function (e) {
      let clickedOutside;
      let composedPathLength;
      clickedOutside = false;
      composedPathLength = e.composedPath().length;
      for (let i = 0; i < composedPathLength; i++) {
        let clickedOutsideConditionFalse = e.composedPath()[i] === self.shadowRoot.querySelector('.keypad-wrapper') ||
          e.composedPath()[i] === self.shadowRoot.querySelector('input') ||
          e.composedPath()[i] === self.shadowRoot.querySelector('.functions-wrapper') ||
          e.composedPath()[i] === self.shadowRoot.querySelector('.footer-wrapper') ||
          e.composedPath()[i] === self.shadowRoot.querySelector('.divider');
        if (clickedOutsideConditionFalse) {
          clickedOutside = false;
          break;
        } else {
          clickedOutside = true;
        }
      }
      if (clickedOutside === true) {
        self._finalCheck();
        self._checkMaxMin();
        self.shadowRoot.querySelector('.keypad-wrapper').classList.remove('open');
      }
    });
  }

  _decimalsObserver(newValue) {
    let decimalsInNumber = Number(newValue);
    /* this below assignment to step of input is to prevent HTML from showing warning
       tooltip */
    this.$.input.step = Math.pow(10, -decimalsInNumber);
  }

  _condensedCellObserver(isTrue) {
    let self;
    self = this;
    if (isTrue) {
      self.setAttribute('condensed', 'true');
    }
    if (!isTrue) {
      self.removeAttribute('condensed');
    }
  }
  _getNumberOfPrecision() {
    /**
     *  Function to get the required number of decimal
     *  places in the result, by either taking the maximum
     *  number of decimal places in the step and value, or
     *  by taking the value specified in the decimals property
     *  (if specified).
     *
     * 1. Replace all decimal seperators with dots of both
     *    step and copy of value.
     * 2. Extracts the number of decimal places in step &
     *    value.
     * 3. Compares them and the maximum number is extracted
     *    and placed as the required number of decimal places
     *    in the result.
     * 4. If the component already has the property 'decimals',
     *    then, that property is set as the required number of
     *    the decimal places in the result regardless of the
     *    above calculation.
     * 5. If not, the number of decimal places calculated will
     *    be set as the required number of decimal places.
     */

    let valueInString;
    let valueHasDecimalPoints;
    let stepHasDecimalPoints;
    let numberOfDecimalPointsOfValue;
    let numberOfDecimalPointsOfStep;
    let finalNumberOfDecimalPoints;
    let decimalPoints;
    let numOfDecimalPoints;

    valueInString = this.value.toString();
    valueHasDecimalPoints = false;
    stepHasDecimalPoints = false;
    numberOfDecimalPointsOfValue = 0;
    numberOfDecimalPointsOfStep = 0;
    finalNumberOfDecimalPoints = 0;
    if (this.step.includes('.')) {
      stepHasDecimalPoints = true;
      numberOfDecimalPointsOfStep = this.step.split('.')[1].length;
    }
    if (valueInString.includes('.')) {
      valueHasDecimalPoints = true;
      numberOfDecimalPointsOfValue = valueInString.split('.')[1].length;
    }
    if (valueHasDecimalPoints || stepHasDecimalPoints) {
      if (numberOfDecimalPointsOfStep > numberOfDecimalPointsOfValue) {
        finalNumberOfDecimalPoints = numberOfDecimalPointsOfStep;
      } else {
        finalNumberOfDecimalPoints = numberOfDecimalPointsOfValue;
      }
    }
    decimalPoints = this.decimals;
    numOfDecimalPoints = Number(decimalPoints);
    if (decimalPoints.length !== 0 && numOfDecimalPoints > 0) {
      this.$.input.step = Math.pow(10, -numOfDecimalPoints);
      return numOfDecimalPoints;
    } else {
      this.$.input.step = Math.pow(10, -finalNumberOfDecimalPoints);
      return finalNumberOfDecimalPoints;
    }
  }

  _handlePlus() {
    /**
     * This function is triggered when the right facing icon
     * is pressed. This function adds the value to step after
     * necessary calculations and emits an event 'plus pressed'
     *
     * 1. If value is null or undefined, it is set to ''.
     * 2. If step is null or undefined, it is set to '1'.
     * 3. Get required number of decimal places in the value.
     * 4. Convert decimal seperators in step and value to dots.
     * 5. Add the numerical values of step and value.
     * 6. Replace all dots in the value and step
     *    back to decimal seperators.
     * 7. Check whether value is within max and min values.
     * 8. Either save this value as stable value (if this value is
     *    a valid value) or renew the stable value as the required
     *    value.
     */
    let finalNumberOfDecimalPoints;
    /* the below if-check is to prevent double addition due to both mousedown and click
       firing simultaneously.  */
    if (this.mouseDownAddition) {
      this.mouseDownAddition = false;
      return;
    }
    if (this.value === null || this.value === undefined) {
      this.value = '';
    }
    if (this.step === null || this.step === undefined) {
      this.step = '1';
    }
    finalNumberOfDecimalPoints = this._getNumberOfPrecision();
    this.value = Number(this.step) + Number(this.value);
    this.value = Number(this.value).toFixed(finalNumberOfDecimalPoints);
    this._checkMaxMin();
    this._renewStableValue(this.value);

    // fire additional custom event
    this.dispatchEvent(new CustomEvent('plusPressed', {
      detail: this,
      composed: true,
      bubbles: true
    }));
  }

  _handleMinus() {
    /**
     * This function is triggered when the left facing icon
     * is pressed. This function subtracts the step from value
     * after necessary calculations and emits an event 'plus pressed'.
     *
     * 1. If value is null or undefined, it is set to '0'.
     * 2. If step is null or undefined, it is set to '1'.
     * 3. Get required number of decimal places in the value.
     * 4. Convert decimal seperators in step and value to dots.
     * 5. Add the numerical values of step and value.
     * 6. Replace all dots in the value and step back to decimal
     *    seperators.
     * 7. Check whether value is within max and min values.
     * 8. Either save this value as stable value (if this value is
     *    a valid value) or renew the stable value as the required
     *    value.
     */
    let finalNumberOfDecimalPoints;
    /* the below if-check is to prevent double subtraction due to both mousedown and click
       firing simultaneously.  */
    if (this.mouseDownSubtraction) {
      this.mouseDownSubtraction = false;
      return;
    }
    if (this.value === null || this.value === undefined) {
      this.value = '';
    }
    if (this.step === null || this.step === undefined) {
      this.step = '1';
    }
    finalNumberOfDecimalPoints = this._getNumberOfPrecision();
    this.value = Number(this.value) - Number(this.step);
    this.value = Number(this.value).toFixed(finalNumberOfDecimalPoints);
    this._checkMaxMin();
    this._renewStableValue(this.value);

    // fire additional custom event
    this.dispatchEvent(new CustomEvent('minusPressed', {
      detail: this,
      composed: true,
      bubbles: true
    }));
  }

  _clearField() {
    this.removeAttribute('value');
    this.value = '';
    this.setAttribute('value', this.value);
  }

  _findNumberOfOccurences(origStr, searchStr) {
    let count;
    count = (origStr.toString().split(searchStr).length - 1);
    return count;
  }

  _renewStableValue(value) {
    let self;
    let tempValue;
    self = this;
    tempValue = value;
    tempValue = Number(tempValue);
    /**
     *  Below if-check is to save the value as a stable value.
     *  If the host contains min and max properties, then save the 
     *  current value as stable value only if it satisfies :
     *  Number(value) >= Number(min) and Number(value) <= Number(max)
     * 
     *  If the host does not contain min and max properties,
     *  then the current value is by default a stable value.  
     **/
    if (self.min && self.max) {
      if ((Number(self.value) >= Number(self.min)) && (Number(self.value) <= Number(self.max))) {
        self.stableValue = tempValue;
      }
    } else {
      self.stableValue = tempValue;
    }
  }

  _checkMaxMin() {
    if (this.max !== undefined || this.min !== undefined) {
      if (this.value !== '' && Number(this.value) > Number(this.max)) {
        this.value = this.max;
      }
      if (Number(this.value) < Number(this.min)) {
        this.value = this.min;
      }
    }
  }
  _emptyObserver() {
    if (this.value === null || this.value === '') {
      this.classList.add('empty');
    } else {
      this.classList.remove('empty');
    }
  }
  _finalCheck() {
    let currentInputValue;
    let isInvalidValue;
    currentInputValue = this.value;
    isInvalidValue = currentInputValue === '';
    if (isInvalidValue) {
      this.$.input.value = null;
      return;
    }
    // if the value is a valid value, then 
    else {
      this.value = Number(parseFloat(this.value));
      // if it is a decimal number, round it to the number of decimal places.
      if (this.decimals) {
        this.value = Number(this.value).toFixed(Number(this.decimals));
      }
      return;
    }
  }

  _startPlusCounter(e) {
    let self;
    self = this;
    self.plusClock = setInterval(self._handlePlusOnMouseDown, 100, self);
    e.preventDefault();
  }

  _handlePlusOnMouseDown(self) {
    /**
     * This function is triggered when the right facing icon
     * is pressed. This function adds the value to step after
     * necessary calculations and emits an event 'plus pressed'
     *
     * 1. If value is null or undefined, it is set to ''.
     * 2. If step is null or undefined, it is set to '1'.
     * 3. Get required number of decimal places in the value.
     * 4. Convert decimal seperators in step and value to dots.
     * 5. Add the numerical values of step and value.
     * 6. Replace all dots in the value and step
     *    back to decimal seperators.
     * 7. Check whether value is within max and min values.
     * 8. Either save this value as stable value (if this value is
     *    a valid value) or renew the stable value as the required
     *    value.
     */
    let finalNumberOfDecimalPoints;
    if (self.value === null || self.value === undefined) {
      self.value = '';
    }
    if (self.step === null || self.step === undefined) {
      self.step = '1';
    }
    finalNumberOfDecimalPoints = self._getNumberOfPrecision();
    self.value = Number(self.step) + Number(self.value);
    self.value = Number(self.value).toFixed(finalNumberOfDecimalPoints);
    self._checkMaxMin();
    self._renewStableValue(self.value);

    self.minusIcon = false;
    self.plusIcon = true;
    // fire additional custom event
    self.dispatchEvent(new CustomEvent('plusPressed', {
      detail: self,
      composed: true,
      bubbles: true
    }));
    /* mouseDownAddition is a flag to indicate that mouse down addition has happened. This flag
       is checked inside the handlePlus block to prevent subsequent addition due to click  */
    self.mouseDownAddition = true;
  }

  _releasePlusCounter() {
    let self;
    self = this;
    if (self.plusIcon) {
      clearInterval(self.plusClock);
    }
    if (self.minusIcon) {
      clearInterval(self.minusClock);
    }
    clearInterval(self.plusClock);
  }

  _startMinusCounter(e) {
    let self;
    self = this;
    self.minusClock = setInterval(self._handleMinusOnMouseDown, 100, self);
    e.preventDefault();
  }

  _handleMinusOnMouseDown(self) {
    /**
     * This function is triggered when the left facing icon
     * is pressed. This function subtracts the step from value
     * after necessary calculations and emits an event 'plus pressed'.
     *
     * 1. If value is null or undefined, it is set to '0'.
     * 2. If step is null or undefined, it is set to '1'.
     * 3. Get required number of decimal places in the value.
     * 4. Convert decimal seperators in step and value to dots.
     * 5. Add the numerical values of step and value.
     * 6. Replace all dots in the value and step back to decimal
     *    seperators.
     * 7. Check whether value is within max and min values.
     * 8. Either save this value as stable value (if this value is
     *    a valid value) or renew the stable value as the required
     *    value.
     */

    let finalNumberOfDecimalPoints;
    if (self.value === null || self.value === undefined) {
      self.value = '';
    }
    if (self.step === null || self.step === undefined) {
      self.step = '1';
    }
    finalNumberOfDecimalPoints = self._getNumberOfPrecision();
    self.value = Number(self.value) - Number(self.step);
    self.value = Number(self.value).toFixed(finalNumberOfDecimalPoints);
    self._checkMaxMin();
    self._renewStableValue(self.value);
    self.plusIcon = false;
    self.minusIcon = true;
    // fire additional custom event
    self.dispatchEvent(new CustomEvent('minusPressed', {
      detail: self,
      composed: true,
      bubbles: true
    }));
    /* mouseDownSubtraction is a flag to indicate that mouse down subtraction has happened. This flag
       is checked inside the handleMinus block to prevent subsequent subtraction due to click  */
    self.mouseDownSubtraction = true;
  }

  _releaseMinusCounter() {
    let self;
    self = this;
    clearInterval(self.minusClock);
  }


}
window.customElements.define(SHInputNumber.is, SHInputNumber);