/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHTableRow extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        outline: 0;
        display: block;
      }

      :host>div {
        display: flex;
        flex-direction: row;
        transition: .2s all ease-in-out;
        border-bottom: 1px solid rgba(var(--ui-1), var(--opacity-6));
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
      }

      :host([slot="header"]) {
        border-bottom: 1px solid rgba(var(--ui-1), var(--opacity-4));
      }

      *[active] {
        background: rgba(var(--ui-1), var(--opacity-6));
      }

      /* column assignment */

      #wrapper>::slotted([columns="24"]), #wrapper>div>::slotted([columns="24"]) {
        width: 100%
      }

      #wrapper>::slotted([columns="23"]), #wrapper>div>::slotted([columns="23"]) {
        width: calc((100% / 24) * 23);
      }

      #wrapper>::slotted([columns="22"]), #wrapper>div>::slotted([columns="22"]) {
        width: calc((100% / 24) * 22);
      }

      #wrapper>::slotted([columns="21"]), #wrapper>div>::slotted([columns="21"]) {
        width: calc((100% / 24) * 21);
      }

      #wrapper>::slotted([columns="20"]), #wrapper>div>::slotted([columns="20"]) {
        width: calc((100% / 24) * 20);
      }

      #wrapper>::slotted([columns="19"]), #wrapper>div>::slotted([columns="19"]) {
        width: calc((100% / 24) * 19);
      }

      #wrapper>::slotted([columns="18"]), #wrapper>div>::slotted([columns="18"]) {
        width: calc((100% / 24) * 18);
      }

      #wrapper>::slotted([columns="17"]), #wrapper>div>::slotted([columns="17"]) {
        width: calc((100% / 24) * 17);
      }

      #wrapper>::slotted([columns="16"]), #wrapper>div>::slotted([columns="16"]) {
        width: calc((100% / 24) * 16);
      }

      #wrapper>::slotted([columns="15"]), #wrapper>div>::slotted([columns="15"]) {
        width: calc((100% / 24) * 15);
      }

      #wrapper>::slotted([columns="14"]), #wrapper>div>::slotted([columns="14"]) {
        width: calc((100% / 24) * 14);
      }

      #wrapper>::slotted([columns="13"]), #wrapper>div>::slotted([columns="13"]) {
        width: calc((100% / 24) * 13);
      }

      #wrapper>::slotted([columns="12"]), #wrapper>div>::slotted([columns="12"])  {
        width: calc((100% / 24) * 12);
      }

      #wrapper>::slotted([columns="11"]), #wrapper>div>::slotted([columns="11"]) {
        width: calc((100% / 24) * 11);
      }

      #wrapper>::slotted([columns="10"]), #wrapper>div>::slotted([columns="10"]) {
        width: calc((100% / 24) * 10);
      }

      #wrapper>::slotted([columns="9"]), #wrapper>div>::slotted([columns="9"]) {
        width: calc((100% / 24) * 9);
      }

      #wrapper>::slotted([columns="8"]), #wrapper>div>::slotted([columns="8"]) {
        width: calc((100% / 24) * 8);
      }

      #wrapper>::slotted([columns="7"]), #wrapper>div>::slotted([columns="7"]) {
        width: calc((100% / 24) * 7);
      }

      #wrapper>::slotted([columns="6"]), #wrapper>div>::slotted([columns="6"]) {
        width: calc((100% / 24) * 6);
      }

      #wrapper>::slotted([columns="5"]), #wrapper>div>::slotted([columns="5"]) {
        width: calc((100% / 24) * 5);
      }

      #wrapper>::slotted([columns="4"]), #wrapper>div>::slotted([columns="4"]) {
        width: calc((100% / 24) * 4);
      }

      #wrapper>::slotted([columns="3"]), #wrapper>div>::slotted([columns="3"]) {
        width: calc((100% / 24) * 3);
      }

      #wrapper>::slotted([columns="2"]), #wrapper>div>::slotted([columns="2"]) {
        width: calc((100% / 24) * 2);
      }

      #wrapper>::slotted([columns="1"]), #wrapper>div>::slotted([columns="1"]) {
        width: calc((100% / 24) * 1);
      }

      #wrapper>::slotted([columns="0"]), #wrapper>div>::slotted([columns="0"]) {
        display: none;
      }

      /* column assignment for medium breakpoint */

      @media only screen and (max-width: 1025px) {
        #wrapper>::slotted([col-m="24"]) {
          width: 100%
        }
        #wrapper>::slotted([col-m="23"]) {
          width: calc((100% / 24) * 23);
        }
        #wrapper>::slotted([col-m="22"]) {
          width: calc((100% / 24) * 22);
        }
        #wrapper>::slotted([col-m="21"]) {
          width: calc((100% / 24) * 21);
        }
        #wrapper>::slotted([col-m="20"]) {
          width: calc((100% / 24) * 20);
        }
        #wrapper>::slotted([col-m="19"]) {
          width: calc((100% / 24) * 19);
        }
        #wrapper>::slotted([col-m="18"]) {
          width: calc((100% / 24) * 18);
        }
        #wrapper>::slotted([col-m="17"]) {
          width: calc((100% / 24) * 17);
        }
        #wrapper>::slotted([col-m="16"]) {
          width: calc((100% / 24) * 16);
        }
        #wrapper>::slotted([col-m="15"]) {
          width: calc((100% / 24) * 15);
        }
        #wrapper>::slotted([col-m="14"]) {
          width: calc((100% / 24) * 14);
        }
        #wrapper>::slotted([col-m="13"]) {
          width: calc((100% / 24) * 13);
        }
        #wrapper>::slotted([col-m="12"]) {
          width: calc((100% / 24) * 12);
        }
        #wrapper>::slotted([col-m="11"]) {
          width: calc((100% / 24) * 11);
        }
        #wrapper>::slotted([col-m="10"]) {
          width: calc((100% / 24) * 10);
        }
        #wrapper>::slotted([col-m="9"]) {
          width: calc((100% / 24) * 9);
        }
        #wrapper>::slotted([col-m="8"]) {
          width: calc((100% / 24) * 8);
        }
        #wrapper>::slotted([col-m="7"]) {
          width: calc((100% / 24) * 7);
        }
        #wrapper>::slotted([col-m="6"]) {
          width: calc((100% / 24) * 6);
        }
        #wrapper>::slotted([col-m="5"]) {
          width: calc((100% / 24) * 5);
        }
        #wrapper>::slotted([col-m="4"]) {
          width: calc((100% / 24) * 4);
        }
        #wrapper>::slotted([col-m="3"]) {
          width: calc((100% / 24) * 3);
        }
        #wrapper>::slotted([col-m="2"]) {
          width: calc((100% / 24) * 2);
        }
        #wrapper>::slotted([col-m="1"]) {
          width: calc((100% / 24) * 1);
        }
        #wrapper>::slotted([col-m="0"]) {
          display: none;
        }
      }

      /* column assignment for small breakpoint */

      @media only screen and (max-width: 767px) {
        #wrapper>::slotted([col-s="24"]) {
          width: 100%
        }
        #wrapper>::slotted([col-s="23"]) {
          width: calc((100% / 24) * 23);
        }
        #wrapper>::slotted([col-s="22"]) {
          width: calc((100% / 24) * 22);
        }
        #wrapper>::slotted([col-s="21"]) {
          width: calc((100% / 24) * 21);
        }
        #wrapper>::slotted([col-s="20"]) {
          width: calc((100% / 24) * 20);
        }
        #wrapper>::slotted([col-s="19"]) {
          width: calc((100% / 24) * 19);
        }
        #wrapper>::slotted([col-s="18"]) {
          width: calc((100% / 24) * 18);
        }
        #wrapper>::slotted([col-s="17"]) {
          width: calc((100% / 24) * 17);
        }
        #wrapper>::slotted([col-s="16"]) {
          width: calc((100% / 24) * 16);
        }
        #wrapper>::slotted([col-s="15"]) {
          width: calc((100% / 24) * 15);
        }
        #wrapper>::slotted([col-s="14"]) {
          width: calc((100% / 24) * 14);
        }
        #wrapper>::slotted([col-s="13"]) {
          width: calc((100% / 24) * 13);
        }
        #wrapper>::slotted([col-s="12"]) {
          width: calc((100% / 24) * 12);
        }
        #wrapper>::slotted([col-s="11"]) {
          width: calc((100% / 24) * 11);
        }
        #wrapper>::slotted([col-s="10"]) {
          width: calc((100% / 24) * 10);
        }
        #wrapper>::slotted([col-s="9"]) {
          width: calc((100% / 24) * 9);
        }
        #wrapper>::slotted([col-s="8"]) {
          width: calc((100% / 24) * 8);
        }
        #wrapper>::slotted([col-s="7"]) {
          width: calc((100% / 24) * 7);
        }
        #wrapper>::slotted([col-s="6"]) {
          width: calc((100% / 24) * 6);
        }
        #wrapper>::slotted([col-s="5"]) {
          width: calc((100% / 24) * 5);
        }
        #wrapper>::slotted([col-s="4"]) {
          width: calc((100% / 24) * 4);
        }
        #wrapper>::slotted([col-s="3"]) {
          width: calc((100% / 24) * 3);
        }
        #wrapper>::slotted([col-s="2"]) {
          width: calc((100% / 24) * 2);
        }
        #wrapper>::slotted([col-s="1"]) {
          width: calc((100% / 24) * 1);
        }
        #wrapper>::slotted([col-s="0"]) {
          display: none;
        }
      }

      /* hover */

      :host(:not(.no-hovermq))>div:hover,
      :host(.no-hovermq)>div:hover,
      :host(:not(.no-hovermq))>div.hover,
      :host(.no-hovermq)>div.hover,
       #wrapper.hover{
        background: rgba(var(--ui-1), var(--opacity-7));
      }

      :host([slot="header"]:not(.no-hovermq))>div:hover,
      :host([slot="header"].no-hovermq)>div:hover {
        background: transparent;
      }

      :host(:not(.no-hovermq)) *[active]:hover,
      :host(.no-hovermq) *[active]:hover {
        background: rgba(var(--ui-1), var(--opacity-6));
      }
      :host(.testing), :host(.testing) *,
      :host(.testing.hover), :host(.testing.hover) *,
      :host(.testing) *.hover *, :host(.testing) *.active *,
      :host(.testing.active), :host(.testing.active) *,
      :host(.testing) *.hover, :host(.testing) *.active,
      :host(.testing)>div {
        transition : all 0s linear !important;
      }
      :host(:not([freeze])) .frozen-left, :host(:not([freeze])) .scrollable, :host(:not([freeze])) .frozen-right {
        display: none;
      }
      :host([freeze]) .frozen-left,:host([freeze]) .scrollable,:host([freeze]) .frozen-right {
        display: flex;
        width: 100%;
        whitespace: nowrap;
        box-sizing: border-box;
      }
      :host([freeze]) .frozen-left {
        -webkit-box-shadow: inset -2px 0px 0px 0px rgba(var(--ui-1), var(--opacity-6));
        -moz-box-shadow:  inset -2px 0px 0px 0px rgba(var(--ui-1), var(--opacity-6));
        box-shadow: inset -2px 0px 0px 0px rgba(var(--ui-1), var(--opacity-6));
      }
      :host([freeze]) .frozen-right {
        -webkit-box-shadow: inset 2px 0px 0px 0px rgba(var(--ui-1), var(--opacity-6));
        -moz-box-shadow:  inset 2px 0px 0px 0px rgba(var(--ui-1), var(--opacity-6));
        box-shadow: inset 2px 0px 0px 0px rgba(var(--ui-1), var(--opacity-6));
      }
      :host([freeze]) .scrollable {
        overflow-x: hidden;
      }

      :host([freeze].disappear) {
        z-index: -1;
        opacity: 0;
        visibility: hidden
      }
      :host([freeze].fade-in) {
        z-index: initial;
        opacity : 1;
        visibility: visible;
        transition: all 0.2s ease-in-out;
      }
      :host([freeze]) {
        min-width: 100%;
      }
    </style>

    <!--HTML-->
    <div id="wrapper" active$="[[active]]" on-click="_handleClick">
      <slot id="mainBody"></slot>
      <div class="frozen-left" style$ = "min-width: {{lwidth}}">
        <slot name="frozen-left"></slot>
      </div>
      <div class="scrollable" style$ = "min-width: {{mwidth}}">
        <slot name="scrollable"></slot>
      </div>
      <div class="frozen-right" style$ = "min-width: {{rwidth}}">
        <slot name="frozen-right"></slot>
      </div>
    </div>
`;
  }

  static get is() {
    return 'sh-table-row';
  }
  static get properties() {
    return {
      active: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      lwidth: {
        type: String,
        value: '33.3%',
        reflectToAttribute: true,
        notify: true
      },
      rwidth: {
        type: String,
        value: '33.3%',
        reflectToAttribute: true,
        notify: true
      },
      mwidth: {
        type: String,
        value: '33.3%',
        reflectToAttribute: true,
        notify: true
      },
      freeze: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      _childReadyCounter: {
        type: Number,
        value:  0
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

  ready() {
    super.ready();
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
  }

  condensedObserver(isCondensed) {
    let children = this.children;
    if(isCondensed) {
      for(let i=0; i < children.length; i++) {
        children[i].condensed = true;
      }
    }
    else {
      for(let i=0; i < children.length; i++) {
        children[i].condensed = false;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    let self,children;

    self = this;
    children = self.children;
    let counter = 0;
    let suffix;
    let index;
    if(self.slot==='header') {
      setTimeout(()=> {
        for(let i=0; i<children.length; i++) {
          if(children[i].sorted) {
            counter++;
            index=i;
          }
        }
        if(counter>1) {
          switch(index+1) {
            case 2:
              suffix = 'nd';
              break;
            case 3:
              suffix = 'rd';
              break;
            default:
              suffix = 'th';
              break;
          }
          console.warn(`%c\t${counter} table-head have sorted property.\n`,'color:white;font-weight:900;text-align:center');
          console.warn(`%c\tOnly one table-head with the sorted property is allowed.\n`,'color:white;font-weight:900;text-align:center');
          console.warn(`%c\t${index+1}${suffix} table-head with the sorted property is given the arrow.\n`,'color:white;font-weight:900;text-align:center');
          for(let i=0; i<children.length; i++) {
            if(index === i) {
              children[i].sorted = true;
            }
            else {
              children[i].sorted = false;
            }
          }
        }        
      },4);
      setTimeout(() => {
        self.addEventListener('showarrow', function(e) {
          let index;
          for(let i=0; i<children.length; i++) {
            if(children[i] === event.target) {
              index=i;
            }
          }
          for(let i=0; i<children.length; i++) {
            if(children[i].sorted !== undefined && children[i].sorted !== null) {
              if(index === i) {
                children[i].sorted = true;
              }
              else {
                children[i].sorted = false;
              }
            }
          }
        });
      }, 7);
    }
    
  }

  _handleClick() {
    let rowType;
    rowType = this.getAttribute('slot');
    if (rowType === 'header') {
      return;
    } else {
      this.dispatchEvent(new CustomEvent('clicked', {
        bubbles: true,
        composed: true
      }));
      this.active = true;
    }
  }
}
window.customElements.define(SHTableRow.is, SHTableRow);
