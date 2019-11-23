/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import {
  FlattenedNodesObserver
} from '@polymer/polymer/lib/utils/flattened-nodes-observer';

class SHInputNumber extends PolymerElement {
  static get template() {
    return html`
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

      :host([condensed]) input:focus+.input-number-label {
        display: none;
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
      :host([condensed][no-clear]) input {
        padding-top: 4px !important;
      }
      :host([condensed][no-clear][no-arrows]) input {
        padding-top: 4px !important;
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
        max-height: 0px;
        height: 0px;
        width: 208px;
        z-index: 9999;
        position: absolute;
        background-color: var(--base-3);
        box-sizing: border-box;
        top: 40px;
        box-shadow: var(--shadow-raised);
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
        user-select: none;
        -webkit-touch-callout:none;
        -ms-user-select:none;
        -moz-user-select:none;
        line-height: 24px;
      }
      .circle-buttons:hover {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }
      .circle-buttons:active {
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }
      :host([keypad-disabled]) .circle-buttons {
        pointer-events: none;
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }
      .erase-button {
        background-color: transparent;
      }
      .functions-wrapper {
        position: relative;
        display: flex;
        width: 176px;
        justify-content: space-between;
        padding-right: 8px;
        box-sizing: border-box;
      }
      .footer-wrapper {
        position: relative;
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
      .items-wrapper {
        max-height: 200px;
        min-width: 0;
        overflow: auto;
        padding: 0 8px;
        background: rgba(var(--ui-8), var(--opacity-1));
        width: 208px;
        position:fixed;
      }
      .functions-wrapper>::slotted(*:first-child) {
        margin-left: 16px !important;
        margin-right: 8px !important;
      }

      .functions-wrapper>::slotted(:not(*:first-child)){
        margin-left: 8px;
        margin-right: 8px;
      }
      :host([no-border]) input {
        border-bottom: none;
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
      <div class="items-wrapper keypad-wrapper">
        <div class="functions-wrapper">
          <slot name="functions" id="functionsSlot"></slot>
        </div>
        <div class="keypad-main-frame">
          <div class="circle-buttons" tabindex="0">1</div>
          <div class="circle-buttons" tabindex="0">2</div>
          <div class="circle-buttons" tabindex="0">3</div>
          <div class="circle-buttons" tabindex="0">4</div>
          <div class="circle-buttons" tabindex="0">5</div>
          <div class="circle-buttons" tabindex="0">6</div>
          <div class="circle-buttons" tabindex="0">7</div>
          <div class="circle-buttons" tabindex="0">8</div>
          <div class="circle-buttons" tabindex="0">9</div>
          <div class="circle-buttons" tabindex="0">.</div>
          <div class="circle-buttons" tabindex="0">0</div>
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
        notify: true,
        observer:'_inputDisabledObserver'
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
      },
      keypadActive: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: '_handleKeypadActive'
      },
      keypadDisabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
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
    this.boundMove = this._releasePlusCounter.bind(this);
    this.eventCounter = 0;
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

  _inputDisabledObserver(newValue) {
    let self;
    self = this;
    if (newValue) {
      self.$.input.disabled = true;
    }
    else  {
      self.$.input.disabled = false;
    }
  }

  checkIfValueIsEmpty(value) {
    let self;
    self = this;
    if (value === '') {
      self.removeAttribute('value');
      self.value = '';
      self.setAttribute('value', self.value);
    }
  }

  openKeypadIfAppropriate(inputBox) {
    let isKeypad;
    let isNotReadonly;
    let isNotDisabled;
    let self;

    self = this;
    isKeypad = self.keypad;
    isNotReadonly = !self.readonly;
    isNotDisabled = !self.disabled;
    if (isKeypad && isNotReadonly && isNotDisabled) {
      self.openKeypad();
      inputBox.readonly = true;
    }
  }

  closeKeypadIfBackTabbedOnInputBox(e) {
    let self;
    self = this;
    if (e.keyCode === 9 && e.shiftKey) {
      self._finalCheck();
      self._checkMaxMin();
      self.closeKeypad();
    }
  }

  storeInputCursorPositionIfKeypadIsOpen(inputBox) {
    let self;
    self = this;
    if (self.keypadActive) {
      inputBox.type = 'text';
      self.cursorPosition = inputBox.selectionStart;
    }
    else {
      inputBox.type = 'number';
    }
  }

  clearValueIfEnterKeyPressedOnClearIcon(e, clearIcon) {
    let self;
    self = this;
    if (e.keyCode === 13 && e.target === clearIcon) {
      self._clearField();
    }
    self.style.outlineOffset = '-2px';
  }

  validateOnBlurOnKeypadInput(inputBox) {
    let self;
    self = this;

    self.closeKeypad();
    inputBox.type = 'number';
    self._finalCheck();
    self._checkMaxMin();
    if (!self.readonly) {
      inputBox.readonly = false;
    }
  }
  validateOnBlurOnNormalInput(inputBox) {
    let self;
    self = this;
    inputBox.type = 'number';
    self._finalCheck();
    self._checkMaxMin();
    if (!self.readonly) {
      inputBox.readonly = false;
    }
  }

  haveFooterNodes(footerNodes) {
    if (footerNodes.length === 0) {
      return false;
    }
    return true;
  }

  haveFunctionNodes(functionNodes) {
    if (functionNodes.length === 0) {
      return false;
    }
    return true;
  }

  determineForwardTabCheckingElement(hasFooterNode, footerNodes) {
    let self;
    self = this;
    if (hasFooterNode) {
      return footerNodes[footerNodes.length - 1];
    }
    else {
      return self.shadowRoot.querySelector('sh-icon[icon="delete-number"]');
    }
  }

  determineBackwardTabCheckingElement(hasFunctionNodes, functionNodes) {
    let self;
    self = this;
    if (hasFunctionNodes) {
      return functionNodes[0];
    }
    else {
      return self.shadowRoot.querySelectorAll('.circle-buttons')[0];
    }
  }

  closeKeypadIfForwardTabbedOnForwardTabElement(e, forwardTabCheckingElement) {
    let self;
    self = this;
    if (e.target === forwardTabCheckingElement) {
      self.closeKeypad();
      self._finalCheck();
      self._checkMaxMin();
    }
  }

  closeKeypadIfBackwardTabbedOnBackwardTabElement(e, backwardTabCheckingElement) {
    let self;
    self = this;
    if (e.target === backwardTabCheckingElement) {
      self.closeKeypad();
      self._finalCheck();
      self._checkMaxMin();
    }
  }
  appendValueAndUpdateCursorPosition(e, inputBox) {
    let self;
    let buttonValue;
    let buttonString;
    let valueString;
    let isEitherNumberOrDotButton;
    let isEraseButton;

    self = this;
    /* temporarily changing the type of input to text to allow the appearance of dot */
    inputBox.type = 'text';
    buttonValue = Number(e.target.innerHTML.toString());
    buttonString = e.target.innerHTML;
    valueString = self.value.toString();
    isEitherNumberOrDotButton = (buttonValue >= 0 && buttonValue <= 9) || (buttonString === '.');
    isEraseButton = e.target.tagName === 'SH-ICON' || e.target.classList.contains('erase-button');

    inputBox.focus();
    if (inputBox.selectionStart === 0 && self.cursorPosition !== null && self.cursorPosition > 0) {
      inputBox.selectionStart = self.value.toString().length;
    }
    self.cursorPosition = inputBox.selectionStart;
    /* if button's value is either dot, comma or number, then insert value at cursor position */
    if (isEitherNumberOrDotButton) {
      self.value = valueString.slice(0, self.cursorPosition) + buttonString + valueString.slice(self.cursorPosition);
      inputBox.setSelectionRange(self.cursorPosition + 1, self.cursorPosition + 1);
    }
    /* if button is erase button and cursor position is not at the beginning of the input value,
       then remove the previous character at the cursor position */
    if (isEraseButton && (self.cursorPosition !== 0)) {
      self.value = valueString.slice(0, self.cursorPosition - 1) + valueString.slice(self.cursorPosition);
      inputBox.setSelectionRange(self.cursorPosition - 1, self.cursorPosition - 1);
    }
    self.cursorPosition = inputBox.selectionStart;
    inputBox.focus();
  }

  clickButtonIfEnterKeyIsPressedOnButton(e, element) {
    let self;
    self = this;
    if (e.keyCode === 13 && !self.keypadDisabled) {
      element.click();
      element.focus();
    }
  }
  checkIfClickedOutsideKeypad(e) {
    let composedPathLength;
    let clickedOutside;
    let self;

    self = this;
    composedPathLength = e.composedPath().length;

    for (let i = 0; i < composedPathLength; i++) {
      let clickedOutsideConditionFalse;
      let clickedKeypadWrapperOrInputBox;
      let clickedFunctionWrapperOrFooterWrapper;
      let clickedDivider;

      clickedKeypadWrapperOrInputBox =
        e.composedPath()[i] === self.shadowRoot.querySelector('.keypad-wrapper') ||
        e.composedPath()[i] === self.shadowRoot.querySelector('input');
      clickedFunctionWrapperOrFooterWrapper =
        e.composedPath()[i] === self.shadowRoot.querySelector('.functions-wrapper') ||
        e.composedPath()[i] === self.shadowRoot.querySelector('.footer-wrapper');
      clickedDivider =
        e.composedPath()[i] === self.shadowRoot.querySelector('.divider');

      clickedOutsideConditionFalse = clickedKeypadWrapperOrInputBox || clickedFunctionWrapperOrFooterWrapper || clickedDivider;

      if (clickedOutsideConditionFalse) {
        clickedOutside = false;
        break;
      } else {
        clickedOutside = true;
      }
    }
    return clickedOutside;
  }

  openKeypad() {
    let self;
    self = this;
    self.keypadActive = true;
  }

  closeKeypad() {
    let self;
    self = this;
    self.keypadActive = false;
  }

  addOrSubtractBasedOnKey(e) {
    let self;
    self = this;
    switch (e.which) {
      case 38: {
        e.preventDefault();
        self._handlePlus();
      }
        break;
      case 40: {
        e.preventDefault();
        self._handleMinus();
      }
        break;
      default: {
        // nothing here. Just adding for Sonar.
      }
    }
  }
  closeKeypadIfTabbedOnAppropriateElement(e) {
    let forwardTabbed;
    let backwardTabbed;
    let footerNodes;
    let hasFooterNode;
    let functionNodes;
    let hasFunctionNodes;
    let self;

    self = this;

    forwardTabbed = e.keyCode === 9 && !e.shiftKey;
    backwardTabbed = e.keyCode === 9 && e.shiftKey;

    footerNodes = self.$.footer.assignedNodes({
      flatten: true
    });

    functionNodes = self.$.functionsSlot.assignedNodes({
      flatten: true
    });

    hasFooterNode = self.haveFooterNodes(footerNodes);
    hasFunctionNodes = self.haveFunctionNodes(functionNodes);
    if (forwardTabbed) {
      let forwardTabCheckingElement;
      forwardTabCheckingElement = self.determineForwardTabCheckingElement(hasFooterNode, footerNodes);
      self.closeKeypadIfForwardTabbedOnForwardTabElement(e, forwardTabCheckingElement);
    }
    else if (backwardTabbed) {
      let backwardTabCheckingElement;
      backwardTabCheckingElement = self.determineBackwardTabCheckingElement(hasFunctionNodes, functionNodes);
      self.closeKeypadIfBackwardTabbedOnBackwardTabElement(e, backwardTabCheckingElement);
    }
    else {
      // invalid condition
    }
  }

  hideOrDisplayDividerBasedOnFooter() {
    let footerNodes;
    let self;

    self = this;
    footerNodes = self.$.footer.assignedNodes({
      flatten: true
    });
    if (self.haveFooterNodes(footerNodes)) {
      self.shadowRoot.querySelector('.divider').style.display = 'initial';
    }
    else {
      self.shadowRoot.querySelector('.divider').style.display = 'none';
    }
  }
  addMarginsToFunctionWrapperBasedOnFunctionSlot() {
    let haveFunctionNodes;
    let functionNodes;
    let functionsWrapper;
    let requiredFunctionWrapperMarginBottom;
    let self;

    self = this;
    functionsWrapper = self.shadowRoot.querySelector('.functions-wrapper');
    functionNodes = self.$.functionsSlot.assignedNodes({
      flatten: true
    });
    haveFunctionNodes = self.haveFunctionNodes(functionNodes);
    requiredFunctionWrapperMarginBottom = (haveFunctionNodes) ? '16px' : '0px';
    functionsWrapper.style.marginBottom = requiredFunctionWrapperMarginBottom;
  }

  connectedCallback() {
    super.connectedCallback();
    // All event listeners to everything go here. Its better to add disconnectedCallback too.

    // Variable declarations
    let self;
    let keypadWrapper;
    let inputBox;
    let circleButtons;
    let clearIcon;

    // Variable definitions
    self = this;
    keypadWrapper = this.shadowRoot.querySelector('.keypad-wrapper');
    inputBox = this.$.input;
    circleButtons = this.shadowRoot.querySelectorAll('.circle-buttons');
    clearIcon = this.$.clear;

    // Event listeners
    // Event listener for the window
    window.addEventListener('mousemove', self.boundMove);
    // Event listeners for the input field
    inputBox.addEventListener('focus', function () {

      self.checkIfValueIsEmpty(self.value);
      self.openKeypadIfAppropriate(inputBox);

      inputBox.onkeydown = function (e) {
        self.addOrSubtractBasedOnKey(e);
        if (self.keypadActive) {
          let isValidInput;
          switch (e.key) {
            case '0': isValidInput = true;
              break;
            case '1': isValidInput = true;
              break;
            case '2': isValidInput = true;
              break;
            case '3': isValidInput = true;
              break;
            case '4': isValidInput = true;
              break;
            case '5': isValidInput = true;
              break;
            case '6': isValidInput = true;
              break;
            case '7': isValidInput = true;
              break;
            case '8': isValidInput = true;
              break;
            case '9': isValidInput = true;
              break;
            case 'e': isValidInput = true;
              break;
            case 'Shift': isValidInput = true;
              break;
            case 'Enter': isValidInput = true;
              break;
            case 'Tab': isValidInput = true;
              break;
            case 'Backspace': isValidInput = true;
              break;
            case 'Delete': isValidInput = true;
              break;
            case 'Home': isValidInput = true;
              break;
            case 'End': isValidInput = true;
              break;
            case 'ArrowUp': isValidInput = true;
              break;
            case 'ArrowDown': isValidInput = true;
              break;
            case 'ArrowRight': isValidInput = true;
              break;
            case 'ArrowLeft': isValidInput = true;
              break;
            case '-': isValidInput = true;
              break;
            case '+': isValidInput = true;
              break;
            case ',': isValidInput = true;
              break;
            case '=': isValidInput = true;
              break;
            case '.': isValidInput = true;
              break;
            case 'Space': isValidInput = true;
              break;
            default:
              isValidInput = false;
          }
          if (!isValidInput) {
            e.preventDefault();
          }
        }
      };
    });

    inputBox.addEventListener('keydown', function (e) {
      self.closeKeypadIfBackTabbedOnInputBox(e);
    });

    inputBox.addEventListener('click', function () {
      self.storeInputCursorPositionIfKeypadIsOpen(inputBox);
    });

    // Event listener for the clear icon
    clearIcon.addEventListener('focus', function () {
      self.onkeyup = function (e) {
        self.clearValueIfEnterKeyPressedOnClearIcon(e, clearIcon);
      };
    });

    // Event listener for the host
    this.addEventListener('blur', function () {
      self.validateOnBlurOnNormalInput(inputBox);
    });

    keypadWrapper.addEventListener('keydown', function (e) {
      self.closeKeypadIfTabbedOnAppropriateElement(e);
    });

    // Event listener for the keypad buttons
    /* extracting the button value and appending to value */
    circleButtons.forEach(element => {
      element.addEventListener('click', function (e) {
        self.appendValueAndUpdateCursorPosition(e, inputBox);
      });
      element.addEventListener('keyup', function (e) {
        self.clickButtonIfEnterKeyIsPressedOnButton(e, element);
      });
    });

    // Event listener for the body element
    /* close keypad after clicking outside the input-number element */
    document.body.addEventListener('click', function (e) {
      let hasClickedOutsideKeypad;

      hasClickedOutsideKeypad = self.checkIfClickedOutsideKeypad(e);

      if (hasClickedOutsideKeypad) {
        self.validateOnBlurOnKeypadInput(inputBox);
      }
    });
    // Setting observers to add tabindex=0 to elements in footer slot and function slot.
    // Also adjusting divider presence and function wrapper margins.
    this._footerSlotObserver = new FlattenedNodesObserver(self.$.footer, info => {
      self._addTabindex(info.addedNodes);
      self.hideOrDisplayDividerBasedOnFooter();
    });
    this._functionSlotObserver = new FlattenedNodesObserver(self.$.functionsSlot, info => {
      self._addTabindex(info.addedNodes);
      self.addMarginsToFunctionWrapperBasedOnFunctionSlot();
    });
    // Setting condensed to true if parent element is SH-TABLE-CELL
    if (self.parentElement.tagName === 'SH-TABLE-CELL') {
      self.condensed = true;
    }
    self._checkMaxMin();
    self._renewStableValue(self.value);
  }
  _addTabindex(nodes) {
    let addedNodes;
    addedNodes = nodes;
    addedNodes.forEach(element => {
      element.setAttribute('tabindex', 0);
    });
  }
  _handleOffset() {
    let menu;
    menu = this.shadowRoot.querySelector('.items-wrapper');
    let hintHeight;
    hintHeight = 0;
    menu.visible = this.active;
    // position menu in X axis
    menu.style.left = this.offsetX + 'px';
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
    while (parentEl.tagName !== 'HTML') {
      if (getComputedStyle(parentEl).transform !== 'none') {
        transformPresent = true;
        transformedParent = parentEl;
        break;
      } else {
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
      if (transformPresent) {
        menu.style.top = 0 - transformedParent.getBoundingClientRect().top + this.offsetY - menu.clientHeight - hintHeight + 'px';
      } else {
        menu.style.top = this.offsetY - menu.clientHeight - hintHeight + 'px';
      }
    } else {
      if (transformPresent) {
        menu.style.top = 0 - transformedParent.getBoundingClientRect().top + this.offsetY + this.offsetHeight + 'px';
      } else {
        menu.style.top = this.offsetY + this.offsetHeight + 'px';
      }
    }
  }
  _decimalsObserver(newValue) {
    let decimalsInNumber;
    decimalsInNumber = Number(newValue);
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
      let valueOfInput;
      if (this.value !== null && this.value !== undefined) {
        valueOfInput = this.value.toString();
        if (valueOfInput !== '' && valueOfInput.indexOf('.') > -1) {
          let decimalPlaces;
          decimalPlaces = valueOfInput.split('.')[1].length;
          this.$.input.step = Math.pow(10, -decimalPlaces);
        }
      }
    }
  }
  _finalCheck() {
    let currentInputValue;
    let isInvalidValue;
    currentInputValue = this.value;
    isInvalidValue = currentInputValue === '' || isNaN(currentInputValue);
    if (isInvalidValue) {
      this.$.input.value = null;
      this.value = '';
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


  getValue() {
    let self;
    let valueInNumber;
    self = this;
    if (self.value !== undefined && self.value !== null) {
      valueInNumber = parseFloat(self.value.toString(), 10);
      if (!isNaN(valueInNumber)) {
        return (valueInNumber);
      } else {
        return '';
      }
    }
  }

  _handleKeypadActive(keypadIsOpen) {
    let self;
    self = this;
    if (keypadIsOpen) {
      self.dispatchEvent(new CustomEvent('keypad-opened', {
        detail: this,
        composed: true,
        bubbles: true
      }));
      self.shadowRoot.querySelector('.keypad-wrapper').classList.add('open');
      self.reposition = setInterval(function () {
        self._handleOffset();
      }, 10);
    } else {
      self.dispatchEvent(new CustomEvent('keypad-closed', {
        detail: this,
        composed: true,
        bubbles: true
      }));
      self.shadowRoot.querySelector('.keypad-wrapper').classList.remove('open');
      clearInterval(self.reposition);
    }
  }
}
window.customElements.define(SHInputNumber.is, SHInputNumber);
