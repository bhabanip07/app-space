/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
import './shared-styles.js';
class SHInputText extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      * {
        box-sizing: border-box
      }
      :host {
        width: 100%;
        height: auto;
        position: relative;
        display: flex;
        flex-direction: column;
      }
      .input-text-label {
        color: var(--text-secondary);
        position: absolute;
        left: 8px;
        width: calc(100% - 16px);
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
      :host(:not(.empty)) .input-text-label {
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
        color: var(--text-primary);
        background: rgba(var(--ui-1), var(--opacity-7));
        height: 40px;
        border-radius: 2px 2px 0px 0px;
        width: 100%;
        box-sizing: border-box;
        text-overflow:ellipsis;
        transition: .2s all ease-in-out;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        -webkit-appearance: none;
        border-bottom: 1px solid transparent;
        border-color: rgba(var(--ui-1), var(--opacity-5));
      }
      :host([readonly]:not([error]):not([success])) .input-text-label {
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
      :host(:not([readonly])) input:focus+.textarea+.input-text-label {
        top: 4px !important;
        font: var(--body-2) !important;
      }
      :host([readonly]) input:focus+.textarea+.input-text-label,
      :host([readonly]) .textarea:focus+.input-text-label {
        color: var(--text-secondary);
      }
      :host(.empty) input {
        padding: 8px;
      }
      :host(.empty) input{
        padding: 8px;
      }
      :host(.empty:not([condensed])) input:focus{
        padding: 20px 8px 4px 8px !important;
      }
      .textarea:focus {
        padding: 20px 8px 4px 8px !important;
      }
      :host([readonly]) input,
      :host([readonly]) .textarea,
      :host([disabled]) input,
      :host([disabled]) .textarea {
        cursor: default;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :host([disabled]) #mandatory {
        color: rgba(var(--ui-2), var(--opacity-5)) !important;
      }
      :host([readonly]) input,
      :host([readonly]) .textarea {
        background: transparent !important;
      }
      .content-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
      }
      :host([disabled]) .icon-wrapper> ::slotted(*) {
        pointer-events: none;
        color: var(--text-disabled);
      }
      .icon-wrapper {
        position: absolute;
        top: 8px;
        right: 8px;
      }
      .icon-wrapper> ::slotted(sh-icon) {
        font-size: 24px !important;
        line-height: 24px !important;
        min-height: 24px !important;
        min-width: 24px !important;
      }
      /*condensed*/
      :host(:not([textarea])[condensed]) .input-text-label {
        display: none;
      }
      :host([condensed]) input:focus+.textarea+.input-text-label {
        display: none;
      }
      :host(.empty[condensed][readonly]) input:focus+.textarea+.input-text-label {
        display: flex;
      }
      :host(.empty[condensed]) .input-text-label {
        display: flex;
        top: 4px;
        font: var(--body-1);
        line-height: 24px;
      }
      :host([condensed]) input {
        padding-top: 4px;
        padding-bottom: 4px;
        height: 32px;
      }
      :host([disabled]) .input-text-label,
      :host([disabled]) input,
      :host([disabled]) .textarea {
        color: var(--text-disabled) !important;
      }
      :host([condensed]) input:hover .icon-wrapper> ::slotted(sh-icon) {
        font-size: 24px !important;
        line-height: 24px !important;
        min-height: 24px !important;
        min-width: 24px !important;
        padding-top: 8px;
      }
      :host([condensed]) .icon-wrapper {
        top: 4px;
      }
      /* Validation Styles */
      #mandatory {
        display: none;
        color: rgba(var(--ui-2), var(--opacity-1));
      }
      :host([mandatory]) #mandatory {
        display: inline-block;
      }
      :host([error]) input,
      :host([textarea][error]) .content-wrapper {
        border-color: rgba(var(--functional-red), var(--opacity-1));
      }
      :host([success]) input,
      :host([textarea][success]) .content-wrapper {
        border-color: rgba(var(--functional-green), var(--opacity-1));
      }
      :host([safety]) input,
      :host([textarea][safety]) .content-wrapper {
        border-color: rgba(var(--functional-yellow), var(--opacity-2));
      }
      /* Clear Field Icon */
      #clear {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        transition: .2s all ease-in-out;
        cursor: pointer;
        right: 8px;
        top: 8px;
      }
      :host([readonly]) #clear,
      :host([disabled]) #clear {
        opacity: 0 !important;
      }
      :host([condensed]) #clear {
        top: 4px !important;
      }
      :host([error]:not([value=''])) #clear {
        opacity: 1;
      }
      :host([error]) #clear,
      :host([success]) #clear {
        right: 40px;
      }
      /* hover */
      :host(:not([readonly])) input:hover {
        background: rgba(var(--ui-1), var(--opacity-6));
      }
      :host(:not([readonly]):not([disabled]):not(.empty):hover:not(.no-hovermq)) #clear,
      :host(:not([readonly]):not([disabled]):not(.empty).no-hovermq):hover #clear {
        pointer-events: all;
        opacity: 1;
      }
      :host(:not(.empty):not([readonly]):not([disabled]):hover) .input-text-label {
        width: calc(100% - 48px);
      }
      :host([textarea]) #shinputDiv {
        padding-top: 32px;
      }
      :host([textarea]) .input-text-label,
      :host(.empty[textarea].active) .input-text-label {
        color: var(--text-secondary);
        background-color: transparent;
        position: absolute;
        left: 8px;
        width: calc(100% - 16px);
        transition: color .2s ease-in-out, font .2s ease-in-out, top .2s ease-in-out, line-height .2s ease-in-out;
        pointer-events: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        top: 4px;
        font: var(--body-1);
        line-height: 24px !important;
      }
      :host([textarea]) #clear,
      :host([textarea]) .icon-wrapper {
        top: 4px;
      }
      :host([textarea]) .textarea,
      :host([readonly][textarea]) .textarea:focus {
        outline: none;
        border: none;
        font: var(--body-1);
        color: var(--text-primary);
        background-color: transparent;
        width: 100%;
        box-sizing: border-box;
        padding: 0px !important;
        resize: none;
        overflow-y: auto;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
      }
      :host([textarea]) .content-wrapper {
        transition: .2s all ease-in-out, 0s height;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid transparent;
        border-color: rgba(var(--ui-1), var(--opacity-5));
        background: rgba(var(--ui-1), var(--opacity-7));
      }
      :host([textarea]:hover) .content-wrapper {
        background: rgba(var(--ui-1), var(--opacity-6));
      }
      :host([textarea][disabled]) .content-wrapper {
        background: rgba(var(--ui-1), var(--opacity-7));
      }
      :host(:not([readonly]).no-hovermq[textarea]:hover) input:hover:not(:focus),
      :host(:not([readonly]).no-hovermq[textarea]:hover) .textarea:hover:not(:focus),
      :host(:not([readonly]):not(.no-hovermq)[textarea]:hover) input:hover:not(:focus),
      :host(:not([readonly]):not(.no-hovermq)[textarea]:hover) .textarea:hover:not(:focus) {
        background-color: transparent !important;
      }
      :host([textarea]) #shinputDiv {
        padding-left: 8px !important;
        padding-right: 8px !important;
        padding-bottom: 8px !important
      }
      :host([error][textarea]) #clear {
        margin-right: 40px;
      }
      :host([error][textarea]) #clear {
        right: 0px !important;
      }
      :host([textarea][readonly]) {
        background-color:transparent !important;
      }
      :host([textarea][readonly]) .content-wrapper {
        background-color:transparent !important;
      }
      :host([textarea][readonly].active) .input-text-label  {
        color: var(--text-secondary) !important;
      }
      :host([value=''][readonly]) {
        pointer-events: none !important
      }
      :host([disabled]) input, 
      :host([disabled].active) input, 
      :host([disabled]:hover) input {
        background-color: rgba(var(--ui-1),var(--opacity-7)) !important;
      }
      /*css testing*/      
      :host(.testing), :host(.testing) *,
      :host(.testing) *:before, :host(.testing) *:after,
      :host(.testing), :host(.testing) *,
      :host(.testing.hover), :host(.testing.hover) *,
      :host(.testing) *.hover *, :host(.testing) *.active *,
      :host(.testing.active), :host(.testing.active) *,
      :host(.testing) *.hover, :host(.testing) *.active  {
        transition : 0s all linear !important;
      }
      :host(:not([readonly]).no-hovermq) input.hover:not(:focus),
      :host(:not([readonly]):not(.no-hovermq)) input.hover:not(:focus) {
        background: rgba(var(--ui-1), var(--opacity-6));
      }
      :host(:not(.no-hovermq)) #clear.hover {
        opacity: var(--opacity-2);
      }
      :host(:not(.empty).hover:not(.no-hovermq)) #clear,
      :host(:not(.empty).no-hovermq).hover #clear {
        opacity: var(--opacity-2);
        pointer-events: all;
      }
      :host(:not([readonly]).no-hovermq) input.hover:not(:focus),
      :host(:not([readonly]).no-hovermq) .textarea.hover:not(:focus),
      :host(:not([readonly]):not(.no-hovermq)) input.hover:not(:focus),
      :host(:not([readonly]):not(.no-hovermq)) .textarea.hover:not(:focus) {
        background: rgba(var(--ui-1), var(--opacity-6));
      }
      input {
        padding: 20px 8px 4px 8px;
      }
      :host(:hover:not(.empty):not([disabled]):not([readonly])) input,
      :host([iconslot]) input,
      :host([error]) input,
      :host([success]) input {
        padding-right: 40px;
      }
      :host([success]:hover:not(.empty):not([disabled]):not([readonly])) input,
      :host([error]:hover:not(.empty):not([disabled]):not([readonly])) input,
      :host([error]:not(.empty):not([disabled]):not([readonly])) input {
        padding-right: 72px;
      }
      :host(:hover[iconslot]:not([readonly]):not([disabled])) input {
        padding: 16px 64px 0px 8px !important;
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
      :host([error]) .input-text-label,
      :host([success]) .input-text-label,
      :host(:hover:not(.empty):not([disabled]):not([readonly])) .input-number-label,
      :host(:focus:not(.empty):not([disabled]):not([readonly])) .input-number-label {
        width: calc(100% - 48px);
      }
      :host(:hover[error]:not(.empty):not([disabled]):not([readonly])) .input-text-label,
      :host(:hover[success]:not(.empty):not([disabled]):not([readonly])) .input-text-label,
      :host([error]:not(.empty):not([disabled]):not([readonly])) .input-text-label {
        width: calc(100% - 48px - 32px) !important;
      }
      /* textarea auto height */
      :host([textarea][rows="auto"]) .input-text-wrapper,
      :host([textarea][rows="auto"]) .content-wrapper,
      :host([textarea][rows="auto"]) textarea {
        display: flex;
        flex: 1
      }
      :host([no-border]) input,
      :host([textarea][no-border]) .content-wrapper {
        border-bottom: none;
      }
    </style>

    <!--HTML-->
    <div class="input-text-wrapper">
      <div id="shinputDiv" class="content-wrapper">
        <input hidden$="{{textarea}}" type$="{{type}}" readonly$="{{readonly}}" value="{{value::input}}"  maxlength$="{{maxlength::input}}" id="input" disabled$="{{disabled}}" autofocus$= "{{autofocus}}"> 
        <textarea hidden$="{{!textarea}}" class="textarea" value="{{value::input}}" readonly$="{{readonly}}" maxlength$="{{maxlength::input}}" rows$="{{rows}}" id="textarea" disabled$="{{disabled}}" autofocus$= "{{autofocus}}" title$="{{title}}"></textarea>
        <div class="input-text-label">
          <div class="label-wrapper">[[label]]</div>
          <span id="mandatory"> *</span>
        </div>
        <sh-icon size="s" button icon="cancel" on-click="_clearField" id="clear"></sh-icon>
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
    return 'sh-input-text';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: 'label',
        reflectToAttribute: true,
        notify: true
      },
      value: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true,
        observer: '_valueObserver'
      },
      hint: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      type: {
        type: String,
        value: 'text',
        reflectToAttribute: true,
        notify: true
      },
      textarea: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      rows: {
        type: String,
        value: '3',
        reflectToAttribute: true,
        notify: true
      },
      maxlength: {
        type: String,
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
      mandatory: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      error: {
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
      tooltip: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true
      },
      errorMessage: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      iconslot: {
        type: Boolean,
        value: false
      },
      condensed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true,
        observer: '_condensedObserver'
      },
      resizable: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: 'resizeObserver'
      },
      autofocus: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      title: {
        type: String, 
        value: '', 
        reflectToAttribute: true,
        notify: true
      },
      noBorder: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  constructor() {
    super();
    // only runs after first paint is complete
    afterNextRender(this, function(){
      // check for textarea content
      if (this.hasAttribute('textarea')) {
        this._valueObserver();
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    let self;
    self = this;
    if (this.children.length > 0) {
      this.setAttribute("iconslot", '');
    }
    document.body.addEventListener('click', function (e) {
      if (e.target == self) {
        if (self.textarea) {
          self.shadowRoot.querySelector("textarea").focus();
        }
      }
    });

    this.addEventListener('focus', function (e) {
      self.onkeyup = function (e) {
        let checkReadonlyDisabled, checkCondensedLength;
        checkReadonlyDisabled = !this.disabled && !this.readonly;
        checkCondensedLength = !self.hasAttribute('condensed') && this.value.length > 0;
        if (e.keyCode === 9 && checkReadonlyDisabled && checkCondensedLength) {
          self.$.clear.setAttribute('tabindex', 0);
        }
      };
    });

    this.$.clear.addEventListener('focus', function () {
      this.onkeyup = function (e) {
        if (e.keyCode == 9) {
          this.style.outline = '2px solid rgb(59, 153, 252)';
        }
      };
    });

    this.$.clear.addEventListener('blur', function () {
      self.style.opacity = null;
    });

  }


  resizeObserver() {
    if (this.textarea && this.resizable) {
      this.shadowRoot.querySelector('textarea').style.resize = 'vertical';
    }
    else {
      this.shadowRoot.querySelector('textarea').style.resize = 'none';
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

  _valueObserver() {
    let _textarea;
    // adding empty class for no content
    if (this.value === '') {
      this.classList.add('empty');
    } else {
      this.classList.remove('empty');
    }

    // textarea content observer
    if (this.hasAttribute('textarea')) {
      _textarea = this.$.textarea;
      if (_textarea.scrollHeight > _textarea.clientHeight	) {
        _textarea.title = this.value;
      } else {
        _textarea.title = '';
      }
    }
  }

  _clearField(e) {
    this.removeAttribute('value');
    this.value = '';
    this.shadowRoot.querySelector('#input').focus();
    if (this.textarea) {
      e.stopPropagation();
    }
  }
  ready() {
    super.ready();
    if (this.children.length > 0) {
      this.$.clear.style.marginRight = '10%';
    }
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    if (!this.disabled && this.querySelectorAll('sh-icon').length > 0) {
      for (let i = 0; i < this.querySelectorAll('sh-icon').length; i++) {
        this.querySelectorAll('sh-icon')[i].setAttribute('tabindex', '0');
      }
    }
  }
}
window.customElements.define(SHInputText.is, SHInputText);
