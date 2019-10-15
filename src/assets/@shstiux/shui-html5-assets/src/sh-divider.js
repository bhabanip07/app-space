
/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHDivider extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        height: fit-content;
        height: -ms-fit-content;
        height: -moz-fit-content;
        width: 100%;
        display: block;
      }

      .divider-wrapper {
        height: 1px;
        background-color: rgba(var(--ui-1), var(--opacity-6));
        width: 100%;
      }

      :host([spacing="s"]) .divider-wrapper {
        margin: 8px 0;
      }

      :host([spacing="m"]) .divider-wrapper {
        margin: 16px 0;
      }

      :host([spacing="l"]) .divider-wrapper {
        margin: 24px 0;
      }

      :host([spacing="xl"]) .divider-wrapper {
        margin: 48px 0;
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
    <div class="divider-wrapper"></div>
`;
  }

  static get is() {
    return 'sh-divider';
  }
  static get properties() {
    return {
      spacing: {
        type: String,
        value: 's',
        reflectToAttribute: true,
        notify: true
      }
    }
  }
}
window.customElements.define(SHDivider.is, SHDivider);
