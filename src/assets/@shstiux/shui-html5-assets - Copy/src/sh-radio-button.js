/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHRadioButton extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        outline: none;
        display: flex;
        flex-direction: row;
        width: 100%;
        font: var(--body-1);
        line-height: 24px !important;
        color: var(--text-primary);
        white-space: nowrap;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }

      :host(:focus)+#pseudoRadio {
        outline-width: 1px;
        outline-color: blue;
        outline-style: auto;
      }

      :host([disabled]) {
        cursor: default;
        color: var(--text-disabled) !important;
      }

      :host([disabled]),:host([disabled]) #radio-container,
      :host([disabled]) #pseudoRadio,
      :host([disabled]) #radio-container label{
        cursor: default;
      }

      :host #radio-container {
        align-items: center;
        height: 24px;
        width: 100%;
        cursor: pointer;
        position: relative;
      }

      :host #radioBtn {
        opacity: 0;
        position: absolute;
        margin: 4px;
        width: 16px;
        height: 16px;
      }

      :host #pseudoRadio {
        border-radius: 50%;
        border-width: 2px;
        border-style: solid;
        border-color: rgba(var(--ui-1), var(--opacity-4));
        transition: 0.2s all ease-in-out;
        cursor: pointer;
        position: absolute;
        margin: 4px;
        box-sizing: border-box;
        height: 16px;
        width: 16px;
      }

      :host #radio-container label {
        display: inline-block;
        padding-left: 8px;
        cursor: pointer;
        flex: 1;
        font: var(--body-1);
        line-height: 24px;
        margin-left: 24px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: calc(100% - 32px);
      }

      /* Component State Styles */

      :host([active]) #pseudoRadio {
        background: transparent;
        height: 16px;
        width: 16px;
        border-width: 5px !important;
        box-sizing: border-box;
        border-style: solid;
        transition: 0.2s all ease-in-out;
        border-color: rgba(var(--ui-2), var(--opacity-1));
      }

      /* Neutral */

      :host([neutral][active]) #pseudoRadio {
        border-color: rgba(var(--ui-1), var(--opacity-3));
      }



      :host([disabled]) #pseudoRadio {
        border-color: rgba(var(--ui-1), var(--opacity-6)) !important;
      }

      :host([disabled][active]) #pseudoRadio {
        border-color: rgba(var(--ui-2), var(--opacity-6)) !important;
      }
      :host([neutral][disabled][active]) #pseudoRadio {
        border-color: rgba(var(--ui-1), var(--opacity-6)) !important;
      }

      /* hover */

      :host(:hover:not(.no-hovermq)) #pseudoRadio,
      :host(.hover:not(.no-hovermq)) #pseudoRadio {
        border-color: rgba(var(--ui-1), var(--opacity-3));
      }

      :host([active]:hover:not(.no-hovermq)) #pseudoRadio,:host([active].hover:not(.no-hovermq)) #pseudoRadio {
        border-color: rgba(var(--ui-3), var(--opacity-1));
      }

      :host([neutral][active]:hover:not(.no-hovermq)) #pseudoRadio,:host([neutral][active].hover:not(.no-hovermq)) #pseudoRadio {
        border-color: rgba(var(--ui-1), var(--opacity-2));
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
    <div id="radio-container" disabled$="[[disabled]]" >
      <input id="radioBtn" on-click="_handleActive" type="radio" name$="[[name]]" checked="{{active::change}}" active="" tabindex="-1" >
      <span id="pseudoRadio"></span>
      <label for$="[[name]]">[[label]]</label>
    </div>
`;
  }

  static get is() {
    return 'sh-radio-button';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: 'label',
        reflectToAttribute: true,
        notify: true
      },
      active: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify:true
      },
      neutral: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify:true
      },
      hostChecked: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify:true
      },
      role: {
        type: String,
        value: 'radio',
        reflectToAttribute: true,
        notify:true
      }
    }
  }
  ready() {
    super.ready();
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }


  }
  // bubble up the status to parent element
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', function (e) {
      if(e.target.disabled){
        return;
      }
      this._dispatchEvent();
    });

    this.addEventListener('focus', function () {
      if(!this.disabled){
      this.onkeyup = function (e) {
        if(e.keyCode === 9){
          this.$.pseudoRadio.style.outline = '2px solid rgb(59, 153, 252)';
          this.$.pseudoRadio.style.outlineOffset= '-2px';
        }
        if (e.keyCode === 32) {
          this._dispatchEvent();
        }
      };
      }
    });

    this.addEventListener('blur', function () {
      this.$.pseudoRadio.style.outline = '';
      this.$.pseudoRadio.style.outlineOffset = '';
    });
  }

  _dispatchEvent() {
    this.dispatchEvent(new CustomEvent('clicked', {
      bubbles: true,
      detail: this
    }));
    this.active = true;
  }
}
window.customElements.define(SHRadioButton.is, SHRadioButton);
