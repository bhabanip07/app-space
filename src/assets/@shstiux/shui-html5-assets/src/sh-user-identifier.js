/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHUserIdentifier extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
        outline: 0;
      }

      :host([access-context]) {
        width: fit-content;
        width: -ms-fit-content;
        width: -moz-fit-content;
      }

      sh-icon {
        border-radius: 50%;
        overflow: hidden;
      }

      .info-wrapper {
        flex-direction: column;
        display: flex;
        margin-left: 8px;
        justify-content: center;
      }

      :host(:not[name]) .info-wrapper {
        display: none;
      }

      :host([access-context]) .info-wrapper {
        max-width: 160px;
      }

      .name,
      .info {
        max-width: 100%;
        line-height: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        font-family: siemens sans, sans-serif;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
      }

      :host([name]) .name,
      :host([info]) .info {
        height: 16px;
      }

      .name {
        color: var(--text-secondary);
        font-weight: bold;
      }

      .info {
        font: var(--body-2);
        color: var(--text-secondary);
      }

      /* condensed access-bar */

      :host([access-context][condensed]) {
        margin: -4px 0;
      }

      /* medium screens */

      @media only screen and (max-width: 1025px) {
        :host([access-context]) .info-wrapper {
          display: none
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
    <sh-icon icon$="[[image]]"></sh-icon>
    <div class="info-wrapper">
      <div class="name">[[name]]</div>
      <div class="info">[[info]]</div>
    </div>
`;
  }

  static get is() {
    return 'sh-user-identifier';
  }
  static get properties() {
    return {
      image: {
        type: String,
        value: 'user-avatar',
        reflectToAttribute: true,
        notify: true
      },
      name: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      info: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      condensed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      accessContext: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    }
  }

  ready(){
    super.ready();
    this.setAttribute('tabindex', '0');
  }

  connectedCallback(){
    super.connectedCallback();
    this.addEventListener('focus', function(){
      this.onkeyup = function(e){
        if(e.keyCode === 9){
          this.style.outline = '2px solid rgb(59, 153, 252)';
        }
      };
    });
    this.addEventListener('blur', function(){
          this.style.outline = '0';
    });
  }
}
window.customElements.define(SHUserIdentifier.is, SHUserIdentifier);
