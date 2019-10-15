/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHGrid extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: grid;
        display: -ms-grid;
        grid-template-columns: repeat(12, 1fr);
        -ms-grid-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      }

      ::slotted(*) {
        width: auto;
        min-width: 0;
        min-height: 0;
      }

      /* small spacing */

      :host([spacing="s"]) {
        margin: -4px !important;
        height: calc(100% + 8px) !important;
        width: calc(100% + 8px) !important;
      }

      :host([spacing="s"]) ::slotted(*) {
        margin: 4px;
      }

      /* medium spacing (default) */

      :host([spacing="m"]) {
        height: calc(100% + 16px) !important;
        width: calc(100% + 16px) !important;
        margin: -8px !important;
      }

      :host([spacing="m"]) ::slotted(*) {
        margin: 8px;
      }

      /* large spacing */

      :host([spacing="l"]) {
        margin: -12px !important;
        height: calc(100% + 24px) !important;
        width: calc(100% + 24px) !important;
      }

      :host([spacing="l"]) ::slotted(*) {
        margin: 12px;
      }

      /* fit-content */

      :host([fit-content]) {
        height: auto !important;
      }

      /* columns rules: large screen */

      ::slotted([columns="0"]) {
        display: none;
      }

      ::slotted(*:not([columns])),
      ::slotted([columns="1"]) {
        grid-column: span 1;
        -ms-grid-column-span: 1;
      }

      ::slotted([columns="2"]) {
        grid-column: span 2;
        -ms-grid-column-span: 2;
      }

      ::slotted([columns="3"]) {
        grid-column: span 3;
        -ms-grid-column-span: 3;
      }

      ::slotted([columns="4"]) {
        grid-column: span 4;
        -ms-grid-column-span: 4;
      }

      ::slotted([columns="5"]) {
        grid-column: span 5;
        -ms-grid-column-span: 5;
      }

      ::slotted([columns="6"]) {
        grid-column: span 6;
        -ms-grid-column-span: 6;
      }

      ::slotted([columns="7"]) {
        grid-column: span 7;
        -ms-grid-column-span: 7;
      }

      ::slotted([columns="8"]) {
        grid-column: span 8;
        -ms-grid-column-span: 8;
      }

      ::slotted([columns="9"]) {
        grid-column: span 9;
        -ms-grid-column-span: 9;
      }

      ::slotted([columns="10"]) {
        grid-column: span 10;
        -ms-grid-column-span: 10;
      }

      ::slotted([columns="11"]) {
        grid-column: span 11;
        -ms-grid-column-span: 11;
      }

      ::slotted([columns="12"]) {
        grid-column: span 12;
        -ms-grid-column-span: 12;
      }

      /* columns rules: medium screen */

      @media only screen and (max-width: 1025px) {
        ::slotted([col-m="0"]) {
          display: none;
        }
        ::slotted([col-m="1"]) {
          grid-column: span 1;
          -ms-grid-column-span: 1;
        }
        ::slotted([col-m="2"]) {
          grid-column: span 2;
          -ms-grid-column-span: 2;
        }
        ::slotted([col-m="3"]) {
          grid-column: span 3;
          -ms-grid-column-span: 3;
        }
        ::slotted([col-m="4"]) {
          grid-column: span 4;
          -ms-grid-column-span: 4;
        }
        ::slotted([col-m="5"]) {
          grid-column: span 5;
          -ms-grid-column-span: 5;
        }
        ::slotted([col-m="6"]) {
          grid-column: span 6;
          -ms-grid-column-span: 6;
        }
        ::slotted([col-m="7"]) {
          grid-column: span 7;
          -ms-grid-column-span: 7;
        }
        ::slotted([col-m="8"]) {
          grid-column: span 8;
          -ms-grid-column-span: 8;
        }
        ::slotted([col-m="9"]) {
          grid-column: span 9;
          -ms-grid-column-span: 9;
        }
        ::slotted([col-m="10"]) {
          grid-column: span 10;
          -ms-grid-column-span: 10;
        }
        ::slotted([col-m="11"]) {
          grid-column: span 11;
          -ms-grid-column-span: 11;
        }
        ::slotted([col-m="12"]) {
          grid-column: span 12;
          -ms-grid-column-span: 12;
        }
      }

      /* columns rules: small screen */

      @media only screen and (max-width: 767px) {
        ::slotted([col-s="0"]) {
          display: none;
        }
        ::slotted([col-s="1"]) {
          grid-column: span 1;
          -ms-grid-column-span: 1;
        }
        ::slotted([col-s="2"]) {
          grid-column: span 2;
          -ms-grid-column-span: 2;
        }
        ::slotted([col-s="3"]) {
          grid-column: span 3;
          -ms-grid-column-span: 3;
        }
        ::slotted([col-s="4"]) {
          grid-column: span 4;
          -ms-grid-column-span: 4;
        }
        ::slotted([col-s="5"]) {
          grid-column: span 5;
          -ms-grid-column-span: 5;
        }
        ::slotted([col-s="6"]) {
          grid-column: span 6;
          -ms-grid-column-span: 6;
        }
        ::slotted([col-s="7"]) {
          grid-column: span 7;
          -ms-grid-column-span: 7;
        }
        ::slotted([col-s="8"]) {
          grid-column: span 8;
          -ms-grid-column-span: 8;
        }
        ::slotted([col-s="9"]) {
          grid-column: span 9;
          -ms-grid-column-span: 9;
        }
        ::slotted([col-s="10"]) {
          grid-column: span 10;
          -ms-grid-column-span: 10;
        }
        ::slotted([col-s="11"]) {
          grid-column: span 11;
          -ms-grid-column-span: 11;
        }
        ::slotted([col-s="12"]) {
          grid-column: span 12;
          -ms-grid-column-span: 12;
        }
      }

      /* rows rules */

      ::slotted(*:not([rows])), ::slotted([rows="1"]) {
        grid-row: span 1;
        -ms-grid-row-span: 1;
      }
      ::slotted([rows="2"]) {
        grid-row: span 2;
        -ms-grid-row-span: 2;
      }
      ::slotted([rows="3"]) {
        grid-row: span 3;
        -ms-grid-row-span: 3;
      }
      ::slotted([rows="4"]) {
        grid-row: span 4;
        -ms-grid-row-span: 4;
      }
      ::slotted([rows="5"]) {
        grid-row: span 5;
        -ms-grid-row-span: 5;
      }
      ::slotted([rows="6"]) {
        grid-row: span 6;
        -ms-grid-row-span: 6;
      }
      ::slotted([rows="7"]) {
        grid-row: span 7;
        -ms-grid-row-span: 7;
      }
      ::slotted([rows="8"]) {
        grid-row: span 8;
        -ms-grid-row-span: 8;
      }
      ::slotted([rows="9"]) {
        grid-row: span 9;
        -ms-grid-row-span: 9;
      }
      ::slotted([rows="10"]) {
        grid-row: span 10;
        -ms-grid-row-span: 10;
      }
      ::slotted([rows="11"]) {
        grid-row: span 11;
        -ms-grid-row-span: 11;
      }
      ::slotted([rows="12"]) {
        grid-row: span 12;
        -ms-grid-row-span: 12;
      }
    </style>

    <!--HTML-->
    <slot style="min-width: 0px"></slot>
`;
  }

  static get is() {
    return 'sh-grid';
  }
  static get properties() {
    return {
      spacing: {
        type: String,
        value: 'm',
        reflectToAttribute: true
      },
      columns: {
        type: Number,
        reflectToAttribute: true,
        observer: '_columnsChanged'
      },
      rows: {
        type: Number,
        reflectToAttribute: true,
        observer: '_rowsChanged'
      },
      fitContent: {
        type: Boolean,
        value: false
      }
    }
  }
  // dynamically generate columns and rows on load
  _rowsChanged() {
    if (this.rows !== undefined) {
      this.style.gridTemplateRows = 'repeat(' + this.rows + ', 1fr)';
      this.style.msGridRows = '(1fr)[' + this.rows + ']';
    }
  }
  _columnsChanged() {
    if (this.rows !== undefined) {
      this.style.gridTemplateColumns = 'repeat(' + this.columns + ', 1fr)';
      this.style.msGridColumns = '(1fr)[' + this.columns + ']';
    }
  }
}
window.customElements.define(SHGrid.is, SHGrid);
