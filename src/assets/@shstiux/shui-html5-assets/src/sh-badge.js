/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SHBadge extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        padding: 4px;
        border-radius: 8px;
        background: rgba(var(--ui-0), var(--opacity-1));
        font: var(--title-2);
        font-size: 10px;
        line-height: 8px;
        text-align: center;
        color: white;
        height: fit-content;
        width: fit-content;
        max-width: 32px;
        box-sizing: border-box;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      :host([label]) {
        min-width: 16px;
        padding: 4px 2px
      }
      :host([type]:not([label])) {
        padding: 0px;
        background: transparent;
      }
      :host([type="error"]) .badge-icon {
        color: rgb(var(--functional-red));
      }
      :host([type="warning"]) .badge-icon {
        color: rgb(var(--functional-yellow));
      }
      :host([type="success"]) .badge-icon {
        color: rgb(var(--functional-green));
      }
      :host(:not([type]):not([label])) .badge-icon,
      :host([type][label]) .badge-icon {
        display: none;
      }
    </style>

    <!--HTML-->
    [[label]]
    <sh-icon class="badge-icon" size="xs" icon$="[[type]]"></sh-icon>
`;
  }

  static get is() {
    return 'sh-badge';
  }
  static get properties() {
    return {
      label: {
        type: String,
        notify: true,
        reflecToAttribute: true,
        observer: '_checkCount'
      },
      type: {
        type: String,
        notify: true,
        reflecToAttribute: true
      }
    }
  }

  _checkCount() {
      var badgeLabel = parseInt(this.label, 10);
      if (badgeLabel >= 1000) {
        this.label = "999+";
    }
  }
}

window.customElements.define(SHBadge.is, SHBadge);
