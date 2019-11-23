import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SHWorklineGroup extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: flex;
        border-radius: 80px;
        background: rgba(var(--ui-1), var(--opacity-5));
        border: 1px solid rgba(var(--ui-1), var(--opacity-5))
      }
      :host > ::slotted(*:not(:first-child):not([slot="badge"])) {
        margin-left: 16px;
      }
      :host > ::slotted(sh-workline-item:not([active])) {
        background: transparent;
      }
    </style>

    <!--HTML-->
    <slot></slot>
`;
  }

  static get is() {
    return 'sh-workline-group';
  }
  static get properties() {
    return {
      expanded: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      }
    }
  }
}

window.customElements.define(SHWorklineGroup.is, SHWorklineGroup);
