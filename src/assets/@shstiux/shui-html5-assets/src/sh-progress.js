/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHProgress extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        display: block;
      }
      :host([overlay]) {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(var(--ui-7), var(--opacity-3));
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      :host([overlay]) .header-wrapper,
      :host([overlay]) .bar-wrapper,
      :host([overlay]) .footer-wrapper {
        width: 280px;
      }
      .bar-wrapper {
        height: 8px;
        width: 100%;
        display: flex;
      }
      .bar-background {
        border-radius: 4px;
        fill: rgba(var(--ui-1), var(--opacity-6));
      }
      .bar-value {
        border-radius: 4px 0px 0px 4px;
        fill: rgba(var(--ui-2), var(--opacity-1));
      }
      :host([paused]) .bar-value {
        border-radius: 4px 0px 0px 4px;
        fill: rgba(var(--ui-1), var(--opacity-3)) !important;
      }
      :host(:not([label])) .progress-label,
      :host(:not([info])) .footer-wrapper {
        display: none;
      }
      .progress-label {
        font: var(--header-3);
        font-weight: bold;
        color: var(--text-primary);
        line-height: 20px;
      }
      :host([label]) .progress-label {
        text-align: center;
        display: block;
      }
      :host([info]) .footer-wrapper {
        display: flex;
        margin-top: 8px;
      }
      .footer-wrapper > ::slotted(*) {
        margin-left: 8px;
      }
      :host([info]) .progress-info {
        flex: 1;
        color: var(--text-secondary);
        font: var(--body-1);
        line-height: 16px;
      }
      .header-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      :host .progress-header {
        display:none;
      }
      :host(:not[header]) .progress-label {
        width: 100%;
      }
      :host([header]) .progress-label {
        line-height: 20px;
      }
      :host([header]) .progress-header {
        display: block;
        font: var(--header-2);
        line-height: 20px;
        color: var(--text-primary);
        flex: 1;
      }
      :host([header]) .header-wrapper,
      :host([label]) .header-wrapper {
        margin-bottom: 8px;
      }
      :host(.testing), :host(.testing) *,
      :host(.testing) *:before, :host(.testing) *:after,
      :host(.testing), :host(.testing) *,
      :host(.testing.hover), :host(.testing.hover) *,
      :host(.testing) *.hover *, :host(.testing) *.active *,
      :host(.testing.active), :host(.testing.active) *,
      :host(.testing) *.hover, :host(.testing) *.active {
        transition : 0s all linear !important;
      }
      /* indeterminate */
      :host([indeterminate]) .bar-value {
        width: 120px !important;
        animation: indeterminate 2s linear infinite;
      }
      @keyframes indeterminate {
        0% {
          x: -120px;
        }
        100% {
          x: 100%;
        }
      }
      /* type icon */
      :host([type]) .type-icon {
        margin-right: 8px;
      }
      :host([type="error"]) .type-icon {
        color: rgb(var(--functional-red))
      }
      :host([type="warning"]) .type-icon {
        color: rgb(var(--functional-yellow))
      }
      :host([type="success"]) .type-icon {
        color: rgb(var(--functional-green))
      }
    </style>

    <!--HTML-->
    <div class="header-wrapper">
      <div class="progress-header">[[header]]</div>
      <div class="progress-label">[[label]]</div>
    </div>
    <!-- progress bar svg -->
    <svg class="bar-wrapper">
      <defs>
        <clipPath id="clip-path">
          <rect width="100%" height="8px" rx="4px"/>
        </clipPath>
      </defs>
      <rect class="bar-background" width="100%" height="8px" rx="4px" />
      <rect class="bar-value" style$="width: [[value]]%; fill: [[color]]" height="8px" clip-path="url(#clip-path)" />
    </svg>
    <div class="footer-wrapper">
      <sh-icon class="type-icon" icon$="[[type]]" size="xs"></sh-icon>
      <div class="progress-info">[[info]]</div>
      <slot name="functions"></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-progress';
  }
  static get properties() {
    return {
      value: {
        type: Number,
        value: 0,
        reflectToAttribute: true,
        notify: true
      },
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      info: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      role: {
        type: String,
        value: 'progressbar',
        reflectToAttribute: true,
        notify: true
      },
      header: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      type: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      color: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      paused: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      }
    }
  }
}
window.customElements.define(SHProgress.is, SHProgress);
