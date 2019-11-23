/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHCard extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
      }

      :host(:not([icon])) #card-icon {
        display: none;
      }

      .card-wrapper {
        background: var(--base-3);
        transition: .2s all ease-in-out;
        box-shadow: var(--shadow-raised);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 2px;
      }

      .label-wrapper {
        display: flex;
        flex-direction: row;
        padding: 16px;
        align-items: center;
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
      }

      .card-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
        line-height: 24px !important;
        flex: 1;
        color: var(--text-primary);
        font: var(--header-2);
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
      }

      .functions-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .header-wrapper {
        padding: 16px;
        display: flex;
        flex-direction: row;
        overflow: hidden;
      }

      .header-wrapper> ::slotted(sh-tabs) {
        flex: 1;
        margin: -16px -16px 0 -16px;
      }

      .body-wrapper {
        flex: 1;
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: auto;
        font: var(--body-1);
        color: var(--text-primary);
      }

      .footer-wrapper {
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
        padding: 16px 16px 16px 16px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
      }

      sh-icon#card-icon {
        margin-right: 8px;
        color: var(--text-primary);
      }

      .icon- {
        display: none;
      }

      .card-wrapper[empty-header] .header-wrapper {
        display: none;
      }

      .card-wrapper[empty-label] .label-wrapper {
        display: none;
      }

      .card-wrapper[empty-footer] .footer-wrapper {
        display: none;
      }

      .card-wrapper:not([empty-header]) .label-wrapper {
        display: none;
      }

      .card-wrapper:not([empty-header]) .body-wrapper {
        padding-top: 0px;
      }

      .card-wrapper:not([empty-label]) .body-wrapper {
        padding-top: 0px;
      }

      .card-wrapper:not([empty-footer]) .body-wrapper {
        padding-bottom: 0px;
      }

      .card-wrapper[has-image] .footer-wrapper {
        display: none !important;
      }

      .card-wrapper[empty-label] .label-wrapper {
        display: none;
      }

      /* Image Type Card with Title and Content */

      .card-wrapper[has-image] .image-wrapper {
        height: 64%;
        width: 100%;
        display: block;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .card-wrapper[has-image] .body-wrapper {
        font: var(--body-2);
        color: var(--text-primary);
        line-height: 18px;
      }

      .card-wrapper[has-image] .label-wrapper {
        padding: 16px 16px 8px 16px;
      }
      .card-wrapper[has-image] .card-label {
        line-height: 16px !important;
      }

      /* Image Type Card without Title and Content */

      .card-wrapper[has-image][empty-header] {
        height: 100%;
      }

      .card-wrapper[has-image][empty-label] .image-wrapper {
        height: 100%;
      }

      /* Content Spacing */

      .body-wrapper> ::slotted(* + *) {
        margin-top: 8px;
      }

      .functions-wrapper> ::slotted(*),
      .footer-wrapper> ::slotted(*) {
        margin-left: 8px;
      }

      /* touch */
      /*--css testing--*/
      :host(.testing), :host(.testing) * {
        transition: all 0s linear;
      }


      @media (pointer:coarse) {
        .body-wrapper> ::slotted(* + *) {
          margin-top: 16px;
        }

        .functions-wrapper> ::slotted(*),
        .footer-wrapper> ::slotted(*) {
          margin-left: 16px;
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
    <div class="card-wrapper" style$="max-height:[[cardHeight]];min-height:[[cardHeight]];"
         expanded$="[[expanded]]" empty-label$="[[emptyLabel]]"
         empty-footer$="[[emptyFooter]]" empty-header$="[[emptyHeader]]"
         has-image$="[[hasImage]]">
      <div class="image-wrapper" style$="background-image:url('[[image]]')"></div>
      <div class="label-wrapper">
        <sh-icon icon$="[[icon]]" id="card-icon"></sh-icon>
        <div class="card-label">[[label]]</div>
        <div class="functions-wrapper">
          <slot name="functions" id="functions"></slot>
        </div>
      </div>
      <div class="header-wrapper">
        <slot name="header" id="header"></slot>
      </div>
      <div class="body-wrapper">
        <slot id="body"></slot>
      </div>
      <div class="footer-wrapper">
        <slot name="footer" id="footer"></slot>
      </div>
    </div>
`;
  }

  static get is() {
    return 'sh-card';
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
      image: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      cardHeight: {
        type: String,
        value: '100%',
        reflectToAttribute: true,
        notify: true
      },
      emptyLabel: {
        type: Boolean,
        value: false
      },
      emptyFooter: {
        type: Boolean,
        value: false
      },
      emptyHeader: {
        type: Boolean,
        value: false
      },
      hasImage: {
        type: Boolean,
        value: true
      }
    }
  }
  ready() {
    super.ready();
    let footerNodes, headerNodes;
    footerNodes = this.$.footer.assignedNodes({
      flatten: true
    }).length;
    if (footerNodes === 0) {
      this.emptyFooter = !this.emptyFooter;
    }
    headerNodes = this.$.header.assignedNodes({
      flatten: true
    }).length;
    if (headerNodes === 0) {
      this.emptyHeader = !this.emptyHeader;
    }
    if (this.label === undefined) {
      this.emptyLabel = !this.emptyLabel;
    }
    if (this.image === undefined) {
      this.hasImage = !this.hasImage;
    }
  }
}
window.customElements.define(SHCard.is, SHCard);
