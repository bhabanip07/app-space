/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import './sh-icon.js';
import './shared-styles.js';
class SHTableHead extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        min-width: 40px;
        display: inline-flex;
        box-sizing: border-box;
        height: fit-content;
        width: -ms-fit-content;
        width: -moz-fit-content;
        margin: 0 12px;
        outline: 0;
      }

      :host * {
        box-sizing: border-box;
      }

      :host([unsortable]) .sort-icon {
        display: none;
      }

      .head-wrapper {
        display: flex;
        color: var(--text-primary);
        font: var(--title-1);
        line-height: 32px;
        margin: 8px 0;
        width:100% !important;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        width: fit-content;
        width: -ms-fit-content;
        width: -moz-fit-content;
      }
      .head-wrapper slot {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }
      :host([active]) {
        background: transparent;
      }

      .sort-icon {
        display: inline-block;
        visibility: hidden;
        position: relative;
        --icon-color: rgba(var(--ui-1), var(--opacity-4))
      }

      .descendingSort {
        transform: rotate(180deg);
      }

      .alwaysStay {
        visibility: visible;
      }

      .alignLeft {
        justify-content: flex-start;
      }

      .alignRight {
        display: flex;
        justify-content: flex-end;
      }

      /* number heads */

      :host([number]) {
        display: flex;
        justify-content: flex-end;
      }

      /* icon heads */

      :host([icon]) {
        flex: 0;
        min-width: fit-content;
        min-width: -ms-fit-content;
        min-width: -moz-fit-content;
      }

      :host([icon]) .sort-icon {
        display: none;
      }

      /* medium screens */

      @media only screen and (max-width: 1024px) {
        :host {
          margin: 0 8px;
        }
      }

      /* hover */

      :host([unsortable]:hover:not(.no-hovermq)),
      :host([unsortable]:hover) *,
      :host([unsortable].no-hovermq):hover,
      :host([unsortable]):hover * {
        cursor: default;
      }

      :host([unsortable]:hover:not(.no-hovermq)) .head-wrapper,
      :host([unsortable].no-hovermq):hover .head-wrapper {
        color: var(--text-secondary);
        cursor: default;
      }

      :host(:not(.no-hovermq)) .head-wrapper:hover .sort-icon,
      :host(.no-hovermq) .head-wrapper:hover .sort-icon,
      :host(:not(.no-hovermq)) .head-wrapper.hover .sort-icon,
      :host(.no-hovermq) .head-wrapper.hover .sort-icon {
        visibility: visible;
        --icon-color: rgba(var(--ui-1), var(--opacity-3))
      }

      :host(:not(.no-hovermq)) .head-wrapper:hover,
      :host(.no-hovermq) .head-wrapper:hover,
      :host(:not(.no-hovermq)) .head-wrapper.hover,
      :host(.no-hovermq) .head-wrapper.hover {
        cursor: pointer;
        color: var(--text-primary);
      }

      :host(:hover) #sortIcon{
        visibility: visible
      }

      /* Condensed Table */
      :host([condensed]) .head-wrapper {
        margin: 4px 0;
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
    <div id="headWrapper" class="head-wrapper" on-click="toggleIcon">
      <slot></slot>
      <sh-icon icon="down-s" color="var(--icon-color)" class="sort-icon" id="sortIcon"></sh-icon>
    </div>
`;
  }

  static get is() {
    return 'sh-table-head';
  }
  static get properties() {
    return {
      header: {
        type: Boolean,
        value: true
      },
      sortDescending: {
        type: Boolean,
        reflectToAttribute: true,
        observer: 'arrowFlip'
      },
      value: {
        type: String,
        reflectToAttribute: true
      },
      unsortable: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      number: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      icon: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      minWidth: {
        type: String,
        reflectToAttribute: true,
        notify: true,
        observer: 'adjustMinWidth'
      },
      sorted: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: 'toggleArrowVisibility'
      },
      columns :{
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      colS :{
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      colM :{
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      condensed: {
        type: Boolean,
        value: false,
        notify:true,
        reflectToAttribute:true,
        observer: 'condensedObserver'
      }
    };
  }

  // If 'sorted' property is present, then that particular
  // column has to show the arrow without hover. Only 1
  // table-head can have sorted property true at a time.

  // Dispatch event for parent row to control sorted
  // property of table-heads
  toggleArrowVisibility(isTrue){
    if(isTrue){
      this.dispatchEvent(new CustomEvent('showarrow', {detail: this, bubbles: true, composed: true}));
      this.shadowRoot.querySelector('.sort-icon').classList.add('alwaysStay');
    }
    else{
      this.shadowRoot.querySelector('.sort-icon').classList.remove('alwaysStay');
    }
  }

  toggleIcon() {
    // If the header is not unsortable (i.e if it is sortable),
    // then fire the events for toggling icon and sorting. Else
    // don't do anything.
    if (!this.unsortable) {
      this.dispatchEvent(new CustomEvent('toggle', {
        detail: this,
        bubbles: true
      }));
    }
    this.arrowFlip();
  }

  ready() {
    super.ready();
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    if(!this.icon) {
      this.setAttribute('tabindex',0);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.minWidth = this.minWidth;
    window.addEventListener('toggle', this._boundListener);
    this.addEventListener('focus',function(){
      this.onkeyup = function(e){
        if(e.keyCode === 9){
          this.$.headWrapper.style.border='2px solid rgb(59, 153, 252)';
          this.$.sortIcon.style.visibility = 'visible';
        }
        if(e.keyCode === 13 || e.keyCode === 32){
          this.toggleIcon();
        }
      };
    });
    this.addEventListener('blur',function(){
      this.$.headWrapper.style.border='';
      this.$.sortIcon.style.visibility = '';
    });
    this.dispatchEvent(new CustomEvent('head-ready', {
      detail: this,
      bubbles: true
    }));
  }

  constructor() {
    super();
    this._boundListener = this.arrowToggle.bind(this);
  }

  arrowToggle(clickedHeader) {
    // If this header is same as the header that was clicked (one that dispatched the event), then toggle the icon,
    // toggle the sorting order and make the icon always visible, even after mouse-leave.
    if ((clickedHeader.target.shadowRoot.querySelector('.head-wrapper')) === (this.shadowRoot.querySelector('.head-wrapper'))) {
      this.sortDescending = !this.sortDescending;
      this.shadowRoot.querySelector('.sort-icon').classList.add('alwaysStay');
    } else {
      // If this header is NOT the header that was clicked, then make the icon disappear, force the sort order for this header
      // to be ascending (this is optional) and make the icon revert to ascending option.
      this.shadowRoot.querySelector('.sort-icon').classList.remove('alwaysStay');
      this.sortDescending = false;
      this.shadowRoot.querySelector('.sort-icon').classList.remove('descendingSort');
    }
  }

  arrowFlip() {
    if (this.sortDescending) {
      this.shadowRoot.querySelector('.sort-icon').classList.add('descendingSort');
    }
    else {
      this.shadowRoot.querySelector('.sort-icon').classList.remove('descendingSort');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot.querySelector('.sort-icon').classList.remove('descendingSort');
    window.removeEventListener('toggle', this._boundListener);
  }

  adjustMinWidth(newValue){
    if(newValue !== undefined) {
      this.style.minWidth = newValue;
    }
  }
}
window.customElements.define(SHTableHead.is, SHTableHead);