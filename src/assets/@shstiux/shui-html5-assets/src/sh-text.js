/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHText extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        height: auto;
        height: -ms-fit-content;
        height: -moz-fit-content;
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        font-family: siemens sans, sans-serif;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        transition: .2s color ease-in-out;
        display: block;
      }

      :host([super-header]),
      :host([size="super-header"]) {
        font: var(--super-header);
        line-height: 32px;
        color: var(--text-primary);
      }

      :host([size="header-1"]) {
        font: var(--header-1);
        line-height: 24px;
        color: var(--text-primary);
      }

      :host([header]),
      :host([size="header-2"]) {
        font: var(--header-2);
        line-height: 24px;
        color: var(--text-primary);
      }

      :host([title-1]),
      :host([size="title-1"]) {
        font: var(--title-1);
        line-height: 24px;
        color: var(--text-primary);
      }

      :host([title-2]),
      :host([size="title-2"][color="secondary"]) {
        font: var(--title-2);
        line-height: 24px;
        color: var(--text-secondary);
      }

      :host([size="title-2"][color="primary"]) {
        font: var(--title-2);
        line-height: 24px;
        color: var(--text-primary);
      }

      :host([body-1]),
      :host([size="body-1"][color="secondary"]) {
        font: var(--body-1);
        line-height: 24px;
        color: var(--text-secondary);
      }

      :host([size="body-1"][color="primary"]) {
        font: var(--body-1);
        line-height: 24px;
        color: var(--text-primary);
      }

      :host([body-2]),
      :host([size="body-2"][color="secondary"]) {
        font: var(--body-2);
        line-height: 16px;
        color: var(--text-secondary);
      }

      :host([size="body-2"][color="primary"]) {
        font: var(--body-2);
        line-height: 16px;
        color: var(--text-primary);
      }

      :host([disabled]),
      :host([disabled]:not([href=""])) a{
        color: var(--text-disabled);
        pointer-events: none;
      }

      :host(:not([href=""])[color="primary"]:not([disabled])) a{
        color: var(--text-primary);
      }

      :host(:not([href=""])[color="secondary"]:not([disabled])) a {
        color: var(--text-secondary);
      }

      :host(:not([href=""]):hover:not([disabled])[size="body-2"]) a,
      :host(:not([href=""]):hover:not([disabled])[size="body-1"]) a{
        color: rgb(var(--ui-2));
        opacity: var(--opacity-1)
      }
      /*--css testing--*/
      :host(.testing), :host(.testing) *,
      :host(.testing) *:before, :host(.testing) *:after,
      :host(.testing), :host(.testing) *,
      :host(.testing.hover), :host(.testing.hover) *,
      :host(.testing) *.hover *, :host(.testing) *.active *,
      :host(.testing.active), :host(.testing.active) *,
      :host(.testing) *.hover, :host(.testing) *.active  {
        transition : 0s all linear !important;
      }
      :host h1, h2, h3, h4, h5, p {
        margin: 0;
        font-size: inherit;
        font-weight: unset;
      }
    </style>

    <!--HTML-->
    <span class="text-wrapper" id="textWrapper">
      <slot></slot>
    </span>
`;
  }

  static get is() {
    return 'sh-text';
  }
  static get properties() {
    return {
      size: {
        type: String,
        value: 'body-1',
        reflectToAttribute: true,
        notify: true
      },
      color: {
        type: String,
        value: 'primary',
        reflectToAttribute: true,
        notify: true
      },
      href: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  ready(){
    super.ready();
    if(this.href!=='' && (this.size==='body-1' || this.size==='body-2')){
      let link;
      link = document.createElement('a');
      link.setAttribute('href', this.href);
      link.appendChild(this.$.textWrapper.children[0]);
      this.$.textWrapper.appendChild(link);
    }
    //Removing default values for backward compatibility
    let arr, self;
    arr = ['super-header', 'header', 'body-1', 'body-2', 'title-1', 'title-2'];
    self = this;
    arr.forEach(function(attr){
      if(self.hasAttribute(attr)){
        self.removeAttribute('size');
        self.removeAttribute('color');
      }
    });
  }
}
window.customElements.define(SHText.is, SHText);
