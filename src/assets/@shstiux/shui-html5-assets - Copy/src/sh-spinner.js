/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHSpinner extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        transition: .2s all ease-in-out;
        width: 100% !important;
        display: block;
      }

      :host([size="s"]) .loader,
      :host([size="s"]) .loader:after {
        width: 32px;
        height: 32px;
      }

      :host([size="m"]) .loader,
      :host([size="m"]) .loader:after  {
        height: 48px;
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

      :host([overlay]) .loader {
        margin: 0;
      }

      :host(:not([active])) {
        display: none;
      }

      .loader,
      .loader:after {
        border-radius: 50%;
        width: 48px;
        height: 48px;
        box-sizing: border-box;
      }

      .loader {
        margin: auto;
        border-left: 4px solid rgba(var(--ui-1), var(--opacity-6));
        border-right: 4px solid rgba(var(--ui-1), var(--opacity-6));
        border-bottom: 4px solid rgba(var(--ui-1), var(--opacity-6));
        border-top: 4px solid rgba(var(--ui-2), var(--opacity-1));
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: rotate 1s infinite linear;
        animation: rotate 1s infinite linear;
      }

      @-webkit-keyframes rotate {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      @keyframes rotate {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      .spinner-label {
        font: var(--body-1);
        color: var(--text-secondary);
        text-align: center;
        margin-top: 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      :host(:not([label])) .spinner-label {
        display: none;
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
    <div class="loader"></div>
    <div class="spinner-label">[[label]]</div>
`;
  }

  static get is() {
    return 'sh-spinner';
  }
  static get properties() {
    return {
      size: {
        type: String,
        value: 'm',
        reflectToAttribute: true,
        notify: true
      },
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      active: {
        type: Boolean,
        value: true,
        reflectToAttribute: true,
        notify: true
      }
    }
  }
}
window.customElements.define(SHSpinner.is, SHSpinner);
