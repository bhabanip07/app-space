/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHToggle extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: flex;
        flex-direction: row;
        width: 100%;
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        font: var(--body-1) !important;
        color: var(--text-primary) !important;
        line-height: 24px !important;
        outline: 0;
        cursor: pointer;
      }

      .toggle {
        height: 20px;
        width: 40px;
        border-radius: 10px;
        margin: 2px 10px 2px 2px;
        border: 2px solid rgba(var(--ui-1), var(--opacity-4));
        box-sizing: border-box;
        position: relative;
        transition: .2s all ease-in-out;
        cursor: pointer;
      }

      .toggle-label{
        display: block;
        width: calc(100% - 48px);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .toggle::before {
        position: absolute;
        left: 1px;
        top: 1px;
        height: 14px;
        width: 14px;
        content: '';
        background: rgba(var(--ui-1), var(--opacity-3));
        border-radius: 50%;
        transition: .2s all ease-in-out;
      }

      :host([active]) .toggle {
        background-color: rgba(var(--ui-2), var(--opacity-1));
        border-color: transparent;
      }

      :host([active]) .toggle::before {
        background: rgba(255,255,255, 1);
        left: 20px;
      }

      :host([active][disabled]) .toggle {
        opacity: .2;
      }

      :host([active][disabled]) .toggle {
        opacity: .2;
      }

      :host([active][neutral]) .toggle {
        background-color: rgba(var(--ui-1), var(--opacity-4));
      }

      :host([disabled]) {
        cursor: default;
        pointer-events: none;
        color: rgba(var(--ui-1), var(--opacity-5)) !important;
      }

      :host([disabled]:not([active])) .toggle {
        border-color: rgba(var(--ui-1), var(--opacity-7));
      }

      :host([disabled]:not([active])) .toggle::before {
        background: rgba(var(--ui-1), var(--opacity-5));
      }

      /* hover */

      :host(:not(.no-hovermq):not([active]):hover) .toggle,
      :host(.no-hovermq:not([active]):hover) .toggle {
        border-color: rgba(var(--ui-1), var(--opacity-3));
      }

      :host(:not(.no-hovermq)[active]:hover) .toggle,
      :host(.no-hovermq[active]:hover) .toggle {
        background: rgba(var(--ui-3), var(--opacity-1));
      }

      :host(:not(.no-hovermq)[active][neutral]:hover) .toggle,
      :host(.no-hovermq[active][neutral]:hover) .toggle {
        background: rgba(var(--ui-1), var(--opacity-3));
      }

      :host(:not(.no-hovermq):not([active]):hover) .toggle::before,
      :host(.no-hovermq:not([active]):hover) .toggle::before {
        background: rgba(var(--ui-1), var(--opacity-2));
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
    <div class="toggle" id="toggle"></div>
    <span class="toggle-label">[[label]]</span>
`;
  }

  static get is() {
    return 'sh-toggle';
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
      neutral: {
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
        value: 'switch',
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
    if(!this.disabled) {
      this.setAttribute('tabindex', '0');
    }
  }

  connectedCallback(){
    super.connectedCallback();
    this.addEventListener('click', function(){
      this.active = !this.active;
    });
    this.addEventListener('focus', function(){
      this.onkeyup = function(e){
        if(e.keyCode === 32){
          this._handleActive();
        }
        if(e.keyCode === 9){
          this.$.toggle.style.outline= '2px solid rgb(59, 153, 252)';
          this.$.toggle.style.outlineOffset = '-2px';
        }
      };
    });
    this.addEventListener('blur', function(){
      this.$.toggle.style.outline= '';
      this.$.toggle.style.outlineOffset='';
    });
  }
}
window.customElements.define(SHToggle.is, SHToggle);
