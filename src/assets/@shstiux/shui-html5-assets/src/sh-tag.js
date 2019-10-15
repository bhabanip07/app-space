/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHTag extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        overflow-y: hidden;
        flex-direction: row;
        cursor: pointer;
        outline: 0;
        display: block;
      }

      .tag-wrapper {
        min-width: 32px;
        max-width: 120px;
        display: flex;
        justify-content: center;
        width: fit-content;
        width: -ms-fit-content;
        width: -moz-fit-content;
        height: 100%;
        border: 1px solid rgba(var(--ui-1), var(--opacity-5));
        box-sizing: border-box;
        border-radius: 2px;
        padding: 0 8px;
        transition: .2s all ease-in-out;
      }
      
      :host([removable]) .tag-wrapper{
        min-width: 80px;
        max-width: 140px;
        padding-right:0;
        justify-content: flex-end;
      }
      :host(:hover) .tag-wrapper,
      :host(.hover) .tag-wrapper {
        border-color: rgba(var(--ui-1), var(--opacity-4));
      }

      .tag-wrapper .tag-label {
        font: var(--body-1);
        color: var(--text-primary);
        line-height: 32px;
        width: -webkit-fill-available;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }

      .tag-wrapper sh-icon {
        padding: 8px 8px;
      }
      :host([removable]) .tag-wrapper .tag-label {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      :host([disabled]) {
        pointer-events: none;
      }

      :host([disabled]) .tag-wrapper {
        border-color: rgba(var(--ui-1), var(--opacity-7));
      }

      :host([disabled]) .tag-wrapper .tag-label {
        color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([disabled]) sh-icon {
        color: rgba(var(--ui-1), var(--opacity-6));
      }

      /* State Styles */
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
    <div class="tag-wrapper">
      <span class="tag-label">[[label]]</span>
      <sh-icon id="clear" button="" icon="cancel" size="xs" hidden$="[[!removable]]" on-click="_removeTag" ></sh-icon>
    </div>
`;
  }

  static get is() {
    return 'sh-tag';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: 'Label',
        reflectToAttribute: true,
        notify: true
      },
      removable: {
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
      }
    }
  }
  ready() {
    super.ready();
    if(!this.disabled && this.removable) {
      this.$.clear.setAttribute('tabindex', '0');
    }
  }
  _removeTag() {
    this.style.display = 'none';
    this.parentNode.removeChild(this);
    //custom event for close tag
    this.dispatchEvent(new CustomEvent('closed', {
      detail: this,
      composed: true,
      bubbles: true
    }));
  }
}
window.customElements.define(SHTag.is, SHTag);
