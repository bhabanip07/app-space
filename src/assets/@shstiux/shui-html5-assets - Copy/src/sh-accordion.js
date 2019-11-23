/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHAccordion extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        transition: .2s max-height ease-in-out, .2s background-color ease-in-out;
        box-shadow: var(--shadow-raised);
        padding: 0 16px;
        box-sizing: border-box;
        background: var(--base-3);
        border-radius: 2px;
        display: block;
      }

      :host([flat]) {
        border-radius: 0px;
        background: transparent;
        padding: 0;
        box-shadow: none;
      }

      .accordion-wrapper {
        width: 100%;
        height: fit-content;
        height: -ms-fit-content;
        height: -moz-fit-content;
        display: flex;
        flex-direction: column;
        transition: .2s all ease-in-out;
        box-sizing: border-box;
        border-radius: 2px;
      }

      .header-wrapper {
        min-height: 40px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding: 8px 0;
        cursor: pointer;
      }

      .mini-thumbnail{
        display:block;
        align : center;
      }

      .accordion-wrapper[expanded] .mini-thumbnail{
        display:none;
      }

      .accordion-label {
        flex: 1;
        color: var(--text-primary);
        font: var(--header-2);
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 8px;
      }

      .accordion-wrapper sh-icon#expand {
        color: rgba(var(--ui-1), var(--opacity-4));
        transition: .2s color ease-in-out;
        margin: -4px 0;
        outline:none;
      }

      .content-wrapper {
        display: flex;
        width: 100%;
        flex-direction: column;
      }

      /* expanded */

      :host(:not([expanded])) > .accordion-wrapper > .content-wrapper {
        visibility: hidden;
        opacity: 0;
        overflow: hidden;
        transition: .2s all ease-in-out, .2s max-height ease-in-out, .2s padding ease-in-out;
        max-height: 0px;
      }

      :host(:not([flat])[expanded]) > .accordion-wrapper {
        padding-bottom: 16px;
      }

      :host([expanded]) > .accordion-wrapper > .header-wrapper > sh-icon#expand {
        transform: rotate(-180deg);
      }

      :host([expanded]) > .accordion-wrapper > .content-wrapper {
        visibility: visible;
        opacity: 1;
        max-height: 9999px;
        overflow: visible;
      }

      #accordion-icon {
        margin: -4px 8px -4px 0;
        opacity: var(--opacity-2);
      }

      .footer-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding-top: 16px;
        margin-top: 0px !important;
      }

      .footer-wrapper[empty-footer] {
        display: none;
      }

      .footer-wrapper> ::slotted(*) {
        margin-left: 8px;
      }

      .content-wrapper> ::slotted(*) {
        margin-top: 8px;
      }

      .content-wrapper> ::slotted(*:first-child),
      .content-wrapper> ::slotted(sh-menu-item) {
        margin-top: 0px !important;
      }

      /* disabled */

      :host([disabled]) {
        pointer-events: none;
      }

      :host([disabled]) .accordion-label {
        color: var(--text-disabled);
      }

      :host([disabled]) sh-icon#expand {
        color: rgba(var(--ui-1), var(--opacity-5));
      }

      /* touch */

      @media (pointer:coarse) {
        .content-wrapper> ::slotted(*) {
          margin-top: 16px;
        }
        .content-wrapper> ::slotted(*:last-child) {
          margin-bottom: 8px;
        }
      }

      /* hover */

      :host(.no-hovermq) .header-wrapper:hover sh-icon#expand,
      :host(:not(.no-hovermq)) .header-wrapper:hover sh-icon#expand,
      .header-wrapper.hover sh-icon#expand {
        color: rgba(var(--ui-1), var(--opacity-3));
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
    <div class="accordion-wrapper">
      <div class="header-wrapper" on-click="_handleExpand">
        <sh-icon icon$="[[icon]]" id="accordion-icon"></sh-icon>
        <sh-text header="" class="accordion-label">[[label]]</sh-text>
        <sh-icon id="expand" icon="arrow-down-s" tabindex="0"></sh-icon>
      </div>
      <div class="mini-thumbnail">
          <slot name="header" id="header"></slot>
      </div>
      <div class="content-wrapper">
        <slot id="body"></slot>
        <div class="footer-wrapper" empty-footer$="[[emptyFooter]]">
          <slot name="footer" id="footer"></slot>
        </div>
      </div>
    </div>
`;
  }

  static get is() {
    return 'sh-accordion';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: 'Accordion Label',
        reflectToAttribute: true,
        notify:true
      },
      flat: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify:true
      },
      expanded: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      icon: {
        type: String
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: '_handleDisabled'
      },
      emptyFooter: {
        type: Boolean,
        value: false
      }
    }
  }
  _handleExpand() {
    this.expanded = !this.expanded;
  }
  _handleDisabled() {
    if (this.disabled) {
      this.expanded = false;
    }
  }
  ready() {
    super.ready();
    let footerNodes;
    footerNodes = this.$.footer.assignedNodes({
      flatten: true
    }).length;
    if (footerNodes === 0) {
      this.emptyFooter = !this.emptyFooter;
    }
    if (this.icon === undefined) {
      this.shadowRoot.querySelector('#accordion-icon').style.display = 'none';
    }
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
  }

  connectedCallback(){
    super.connectedCallback();
    let accordion;
    accordion= this;
    this.$.expand.addEventListener('focus', function(){
      this.onkeyup = function(e){
        if(e.keyCode === 32){
          accordion._handleExpand();
        }
        if(e.keyCode === 9){
          this.style.outline = '2px solid rgb(59, 153, 252)';
        }
      }
    });

    this.$.expand.addEventListener('blur', function(){
          this.style.outline = 'none';
    });
  }
}
window.customElements.define(SHAccordion.is, SHAccordion);
