/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHBreadcrumbs extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        height: 24px;
        float: left;
        display: table;
        overflow: hidden;
      }
    </style>

    <!--HTML-->
      <slot></slot>
`;
  }

  static get is() {
    return 'sh-breadcrumbs';
  }
  static get properties() {
    return {}
  }
  ready() {
    super.ready();
  }
}
window.customElements.define(SHBreadcrumbs.is, SHBreadcrumbs);
