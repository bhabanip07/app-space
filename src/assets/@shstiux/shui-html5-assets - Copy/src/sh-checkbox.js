/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHCheckbox extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: flex;
        flex-direction: row;
        width: 100%;
        color: var(--text-primary);
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        outline: none;
      }

      #checkbox-container {
        display: flex;
        align-items: center;
        height: 24px;
        width: 100%;
        cursor: pointer;
        position: relative;
        font: var(--body-1);
      }

      #checkbox {
        height: 16px;
        width: 16px;
        opacity: 0;
        position: absolute;
        margin: 0 4px;
      }

      .checkboxLabel {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 32px);
        line-height: 24px;
      }

      #pseudoCheckbox::before {
        border-style: solid;
        border-width: 2px;
        border-color: rgba(var(--ui-1), var(--opacity-4));
        width: 16px;
        height: 16px;
        position: absolute;
        margin: 4px;
        border-radius: 2px;
        content: '\\E0E6';
        display: flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        visibility: visible;
        box-sizing: border-box;
        transition: .2s all ease-in-out;
        font-family: "sh-icons";
        font-weight: 700;
        color: transparent;
        font-size: 14px;
        text-indent: -1px;
        line-height: 14px;
        text-align: center;
        vertical-align: middle;
      }

      #pseudoCheckbox {
        height: 24px;
        width: 24px;
        visibility: hidden;
        cursor: pointer;
        position: relative;
        margin-right: 8px;
      }

      :host(.no-hovermq) #pseudoCheckbox {
        height: 24px;
        width: 24px;
        visibility: visible;
        cursor: pointer;
        position: relative;
        margin-right: 8px;
      }

      #checkbox:focus+#pseudoCheckbox.focus-checkbox::before {
        outline: 2px solid rgb(59, 153, 252);
        outline-offset: -2px;
      }

      :host([active]) #pseudoCheckbox::before {
        color: var(--base-3);
        background: rgba(var(--ui-2), var(--opacity-1));
        border-color: transparent;
      }

      :host([neutral][active]:not([disabled])) #pseudoCheckbox::before {
        background: rgba(var(--ui-1), var(--opacity-3));
      }

      /* hover */

      :host(:not([active]):hover.no-hovermq:not()) #pseudoCheckbox::before,
      :host(:not([active]):hover:not(.no-hovermq)) #pseudoCheckbox::before,
      :host(:not([active]).hover.no-hovermq) #pseudoCheckbox::before,
      :host(:not([active]).hover:not(.no-hovermq)) #pseudoCheckbox::before {
        border-color: rgba(var(--ui-2), var(--opacity-1));
      }

      :host(:not([active]):hover.no-hovermq) #pseudoCheckbox::before,
      :host(:not([active]):hover:not(.no-hovermq)) #pseudoCheckbox::before,
      :host(:not([active]).hover.no-hovermq) #pseudoCheckbox::before,
      :host(:not([active]).hover:not(.no-hovermq)) #pseudoCheckbox::before {
        border-color: rgba(var(--ui-1), var(--opacity-3));
      }

      :host([active]:hover.no-hovermq) #pseudoCheckbox::before,
      :host([active]:hover:not(.no-hovermq)) #pseudoCheckbox::before,
      :host([active].hover.no-hovermq) #pseudoCheckbox::before,
      :host([active].hover:not(.no-hovermq)) #pseudoCheckbox::before {
        background: rgba(var(--ui-3), var(--opacity-1));
      }

      :host([neutral][active]:hover.no-hovermq) #pseudoCheckbox::before,
      :host([neutral][active]:hover:not(.no-hovermq)) #pseudoCheckbox::before,
      :host([neutral][active].hover.no-hovermq) #pseudoCheckbox::before,
      :host([neutral][active].hover:not(.no-hovermq)) #pseudoCheckbox::before {
        background: rgba(var(--ui-1), var(--opacity-2)) !important;
      }

      :host(.testing),
      :host(.testing) * {
        transition: 0s all linear;
      }

      /* indeterminate */
      :host([indeterminate]) #pseudoCheckbox::before {
        content: '\\E011';
      }

      /* disabled */
      :host([disabled]) {
        cursor: not-allowed !important;
        pointer-events: none;
        color: var(--text-disabled) !important;
      }

      :host([disabled]:not([active])) #pseudoCheckbox::before {
        border-color: rgba(var(--ui-1), var(--opacity-6));
      }

      :host([active][disabled]:not([neutral])) #pseudoCheckbox::before {
        background: rgba(var(--ui-2), var(--opacity-6));
      }

      :host([neutral][active][disabled]) #pseudoCheckbox::before {
        background: rgba(var(--ui-1), var(--opacity-6));
      }

      :host([neutral][active]:not([disabled])) #pseudoCheckbox::before {
       background: rgba(var(--ui-1), var(--opacity-3));
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
    <div id="checkbox-container">
      <input id="checkbox" type="checkbox" checked="{{active::change}}"
      active="" disabled$="[[disabled]]" role="presentation"
      aria-checked="{{active::change}}" indeterminate="{{indeterminate::change}}" tabindex="0">
      <span id="pseudoCheckbox"></span>
      <span class="checkboxLabel">[[label]]</span>
    </div>
`;
  }

  static get is() {
    return 'sh-checkbox';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: 'label',
        reflectToAttribute: true,
        notify:true
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
        notify: true
      },
      neutral: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      indeterminate: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      role: {
        type: String,
        value: 'checkbox',
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  ready() {
    super.ready();
    if (document.documentMode) {
      this.$.checkbox.style.visibility = 'visible';
      this.$.checkbox.style.width = '16px';
      this.$.checkbox.style.height = '16px';
    }
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    this.addEventListener('click', function () {
      this.active = !this.active;
      this.dispatchEvent(new CustomEvent('checked', {
        bubbles: true,
        composed: true
      }));
    });
    if (this.indeterminate) {
      this._indeterminateChanged();
    }
  }

  _indeterminateChanged() {
    if (this.indeterminate) {
      this.$.checkbox.indeterminate = true;
      this.$.checkbox.setAttribute('aria-checkbox', 'mixed');
      this.$.checkbox.style.content = '\\E011';
      this.active = true;
      this.$.checkbox.value = true;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', function () {
      if(!this.disabled) {
        this.onkeyup = function (e) {
          if(e.keyCode === 9){
            this.$.pseudoCheckbox.classList.add('focus-checkbox');
          }
        };
      }
    });

    this.addEventListener('blur', function () {
      this.$.pseudoCheckbox.classList.remove('focus-checkbox');
    });
  }
}
window.customElements.define(SHCheckbox.is, SHCheckbox);
