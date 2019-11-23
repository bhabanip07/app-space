/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SHHomeCard extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        cursor: pointer;
        transition: .2s all ease-in-out;
        display: block;
      }

      :host(:hover) {
        transform: translateY(-4px);
      }

      .card-wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .content-wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      #card-icon {
        color: var(--text-secondary);
        font-size: 64px;
        line-height: 70px;
        min-width: 64px;
        max-width: 64px;
        min-height: 64px;
        max-height: 64px;
        position: relative;
      }

      .card-title {
        margin-top: 8px;
        text-align: center;
      }

      /* footer slot */

      #footer-wrapper {
        border-top: 1px solid rgba(var(--ui-1), var(--opacity-6));
        padding-top: 16px;
        height: 72px;
        overflow: auto;
      }
      /* dots */
      :host([notifications]) .notification-dot {
        background: var(--support-5);
        height: 16px;
        width: 16px;
        font: var(--body-2);
        text-align: center;
        font-weight: bold;
        line-height: 16px;
        color: var(--base-3);
        border: 2px solid var(--base-3);
        position: absolute;
        right: 0px;
        bottom: 0px;
        border-radius: 50%;
      }

      :host([errors]) .error-dot {
        background: rgb(var(--functional-red));
        height: 16px;
        width: 16px;
        font: var(--body-2);
        text-align: center;
        font-weight: bold;
        line-height: 16px;
        color: var(--base-3);
        border: 2px solid var(--base-3);
        position: absolute;
        right: 0px;
        bottom: 0px;
        border-radius: 50%;
      }

      /*--css testing--*/
      :host(.testing), :host(.testing) * {
        transition: all 0s linear;
      }

      /* small screens */

      @media only screen and (max-width: 767px) {
        :host(:hover) {
          transform: none;
        }
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
    <sh-card>
      <div class="card-wrapper">
        <div class="content-wrapper">
          <div style="position: relative">
            <sh-icon id="card-icon" icon$="[[icon]]"></sh-icon>
            <div class="notification-dot">[[notifications]]</div>
            <div class="error-dot">[[errors]]</div>
            </div>
          <sh-text class="card-title" title-1>[[label]]</sh-text>
        </div>
        <div id="footer-wrapper">
          <slot></slot>
        </div>
      </div>
    </sh-card>
`;
  }

  static get is() {
    return 'sh-home-card';
  }
  static get properties() {
    return {
      icon: {
        type: String,
        value: 'patient',
        reflectToAttribute: true,
        notify: true
      },
      label: {
        type: String,
        value: 'Card Label',
        reflectToAttribute: true,
        notify: true
      },
      notifications: {
        type: Number,
        reflectToAttribute: true,
        notify: true
      },
      errors: {
        type: Number,
        reflectToAttribute: true,
        notify: true
      }
    }
  }
  ready() {
    super.ready();
    if (this.children.length === 0) {
      this.shadowRoot.querySelector('#footer-wrapper').setAttribute('style', 'display: none');
    }
  }
}

window.customElements.define(SHHomeCard.is, SHHomeCard);
