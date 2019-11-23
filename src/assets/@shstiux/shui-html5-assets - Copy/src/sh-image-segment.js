import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import './shared-styles.js';

class SHImageSegment extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        position: relative;
        border-radius: 2px;
        background: black;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      /* slotted image */
      :host > ::slotted(*:not([slot])) {
        height: 100%;
        width: 100%;
        flex: 1;
      }
      /* outlines */
      .segment-outline {
        position: absolute;
        top: 2px;
        left: 2px;
        height: calc(100% - 4px);
        width: calc(100% - 4px);
        box-sizing: border-box;
        border: 1px solid transparent;
        border-radius: 2px;
        transition: .2s all ease-in-out;
        opacity: var(--opacity-3);
      }
      :host(:not([outline])[focus]) .segment-outline {
        border-color: rgb(var(--ui-0));
      }
      :host([focus]) .segment-outline {
        border-width: 2px;
        opacity: var(--opacity-2);
      }
      /* slots */
      :host ::slotted(*[slot]) {
        pointer-events: all;
      }
      .corner, .side {
        pointer-events: none;
        position: absolute;
        height: auto;
        width: auto;
        transition: .2s all ease-in-out;
      }
      :host([hide-overlay]) .corner, 
      :host([hide-overlay]) .side {
        opacity: 0;
        pointer-events: none;
      }
      /* corner slots */
      .corner {
        max-width: calc(50% - 8px);
        display: flex;
        flex-direction: column;
      }
      .corner > ::slotted(*) {
        display: flex;
        flex-direction: column;
      }
      .corner.right ::slotted(*) {
        text-align: right;
      }
      /* side slots */
      .side {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .side.left > ::slotted(*),
      .side.right > ::slotted(*) {
        margin: 4px 0;
      }
      .side.left,
      .side.right {
        height: calc(100% - 24px);
        flex-direction: column;
      }
      .side.top > ::slotted(*),
      .side.bottom > ::slotted(*) {
        margin: 0 4px;
      }
      .side.top,
      .side.bottom {
        width: calc(100% - 24px);
        flex-direction: row;
      }
      .left {
        left: 12px;
      }
      .right {
        right: 12px;
      }
      .top {
        top: 12px;
      }
      .bottom {
        bottom: 12px;
      }
    </style>

    <!--HTML-->
    <div class="segment-outline" style$="border-color: [[color]]"></div>
    <!-- corner slots -->
    <div class="corner top left">
      <slot name="top-left"></slot>
    </div>
    <div class="corner top right">
      <slot name="top-right"></slot>
    </div>
    <div class="corner bottom left">
      <slot name="bottom-left"></slot>
    </div>
    <div class="corner bottom right">
      <slot name="bottom-right"></slot>
    </div>
    <!-- side slots -->
    <div class="side left">
      <slot name="left"></slot>
    </div>
    <div class="side right">
      <slot name="right"></slot>
    </div>
    <div class="side top">
      <slot name="top"></slot>
    </div>
    <div class="side bottom">
      <slot name="bottom"></slot>
    </div>
    <!-- image slot -->
    <slot></slot>
`;
  }

  static get is() {
    return 'sh-image-segment';
  }
  static get properties() {
    return {
      color: {
        type: String,
        notify: true,
        reflectToAttribute: true
      },
      focus: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      hideOverlay: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      }
    };
  }
  ready() {
    super.ready();
  }
}

window.customElements.define(SHImageSegment.is, SHImageSegment);
