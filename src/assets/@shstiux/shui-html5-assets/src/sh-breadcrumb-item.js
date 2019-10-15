/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHBreadcrumbItem extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: block;
        float: left;
        outline: 0;
      }

      .crumb-container {
        margin-right: 4px;
        height: 24px;
        display: inline-flex;
      }

      .crumb-container a {
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: bold;
        margin-right: 4px;
        transition: all .2s ease-in-out;
        max-width: 160px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        font: var(--body-1);
        line-height: 24px;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        outline: 0;
      }

      :host sh-icon {
        color: rgba(var(--ui-1), var(--opacity-4));
        margin: -4px 0;
      }

      :host(:last-of-type) sh-icon {
        display: none;
      }

      :host(:last-of-type) .crumb-container a {
        color: var(--text-primary);
        pointer-events: none;
      }

      /* State Styles */

      :host([active]) .crumb-container a {
        color: var(--text-primary);
      }

      /* hover */

      :host(:not(.no-hovermq)) .crumb-container a:hover,
      :host(.no-hovermq) .crumb-container a:hover, a.hover {
        color: var(--text-primary);
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
    <div class="crumb-container" click="_handleActive">
      <a href="[[href]]" title="[[label]]" >[[label]]</a>
      <sh-icon icon="arrow-right-s"></sh-icon>
    </div>
`;
  }

  static get is() {
    return 'sh-breadcrumb-item';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify:true
      },
      href: {
        type: String,
        value: '/link',
        reflectToAttribute: true,
        notify:true
      },
      role: {
        type: String,
        value: 'link',
        reflectToAttribute: true
      }
    }
  }

  ready() {
    super.ready();
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    this.shadowRoot.querySelector('a').setAttribute('tabindex', 0);
  }
  connectedCallback(){
    super.connectedCallback();
    this.addEventListener('focus', function(){
      this.onkeyup = function(e){
        if(e.keyCode === 9){
          this.shadowRoot.querySelector('a').style.outline = '2px solid rgb(59, 153, 252)';
        }
      }
    });
    this.addEventListener('blur', function() {
      this.shadowRoot.querySelector('a').style.outline = '';
    });
  }
}
window.customElements.define(SHBreadcrumbItem.is, SHBreadcrumbItem);
