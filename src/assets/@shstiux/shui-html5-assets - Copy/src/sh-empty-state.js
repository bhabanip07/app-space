/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHEmptyState extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .content-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      :host([icon=""]) sh-icon {
        display: none;
      }
      sh-icon {
        font-size: 64px;
        line-height: 70px;
        min-width: 64px;
        max-width: 64px;
        min-height: 64px;
        max-height: 64px;
        margin-bottom: 16px;
        color: rgba(var(--ui-1), var(--opacity-5));
      }
      sh-text {
        text-align: center;
        line-height: 18px;
        width: 384px;
        max-width: calc(100% - 64px);
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
      /* footer */ 
      .footer-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
      }
      .footer-wrapper > ::slotted(*:not(:first-child)) {
        margin-left: 8px;
      }
      :host([empty-footer]) .footer-wrapper {
        display: none;
      }
      /* drag and drop */
      :host([drag-and-drop]) {
        border: 2px dotted rgba(var(--ui-1), var(--opacity-5));
      }
    </style>

    <!--HTML-->
    <div class="content-wrapper">
      <sh-icon icon$="[[icon]]"></sh-icon>
      <sh-text body-1="">[[label]]</sh-text>
    </div>
    <!-- footer slot -->
    <div class="footer-wrapper">
      <slot name="footer" id="footer"></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-empty-state';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      icon: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      emptyFooter: {
        value:false,
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      dragAndDrop: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      }
    }
  }
  ready() {
    super.ready()
  }
  connectedCallback() {
    super.connectedCallback();
    let self, footerNode;
    self=this;
    footerNode = this.shadowRoot.querySelector('#footer');
    footerNode.addEventListener('slotchange', function(){
      self._handleSlotNodes();
    });
    this._handleSlotNodes();
  }
  _handleSlotNodes() {
    let footerNodes;
    footerNodes = this.$.footer.assignedNodes({
      flatten: true
    });
    if (footerNodes.length === 0) {
      this.emptyFooter = true;
    }
    else {
      this.emptyFooter = false;
    }
  }
}
window.customElements.define(SHEmptyState.is, SHEmptyState);
