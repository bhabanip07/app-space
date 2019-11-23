/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js'
import './shared-styles.js';
class SHPagination extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style>
      :host {
        display: block;
        position: relative;
        width: 100%;
        white-space: nowrap;
      }

      .pagination-wrapper {
        list-style: none;
        width: fit-content;
        width: -ms-fit-content;
        width: -moz-fit-content;
        display: flex;
		    height: 24px;
        margin: auto;
        transition: all 0.2s ease-in-out;
      }

      .pagination-wrapper ul {
        display: inline-flex;
        list-style: none;
        margin: 0 auto;
        padding: 0;
        height: 100%;
      }

      .pagination-wrapper ul li {
        height: 24px;
        width: 24px;
        text-align: center;
        margin-right: 8px;
        font: var(--title-1);
        line-height: 24px;
        border-radius: 50%;
        color: var(--text-secondary);
        background: transparent;
        cursor: pointer;
        transition: all .2s ease-in-out;
        font-weight: 700;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
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

      .condensed ul li {
        font-size: 10px;
      }

      .pagination-wrapper ul li:last-of-type {
        margin: 0;
      }

      .pagination-wrapper ul li sh-icon {
        color: rgba(var(--ui-1), var(--opacity-4));
        margin: 4px;
        line-height: 20px;
        position: unset;
      }

      .prevPageIcon.disabled,
      .nextPageIcon.disabled {
        cursor: default;
        pointer-events: none;
      }

      .prevPageIcon.disabled sh-icon {
        color: rgba(var(--ui-1), var(--opacity-5));
        pointer-events: none;
      }

      .nextPageIcon.disabled sh-icon {
        color: rgba(var(--ui-1), var(--opacity-5));
        pointer-events: none;
      }

      .pagination-wrapper li[active] {
        background: rgba(var(--ui-1), var(--opacity-6)) !important;
        color: var(--text-primary) !important;
      }

      /* State Styles */

      .pagination-wrapper ul .sh-pagination-item[click-disabled] {
        pointer-events: none;
      }

      /* Focus Styles - Accessibility */

      :focus,
      :active {
        outline: 0;
      }

      #paginationTemplateWrapper {
        transition: all .2s ease-in-out;
      }

      .nextPageIcon sh-icon {
        margin-left: 8px;
        top: 1px;
      }

      .prevPageIcon sh-icon {
        margin-top: 1px;
      }

      .nextPageIcon {
        margin-left: 4px !important
      }

      .prevPageIcon {
        margin-right: 12px !important
      }

      /* hover */

      :host(.no-hovermq) .prevPageIcon:hover sh-icon,
      .prevPageIcon.hover sh-icon,
      :host(.no-hovermq) .nextPageIcon:hover sh-icon,
      .nextPageIcon.hover sh-icon,
      :host(:not(.no-hovermq)) .prevPageIcon:hover sh-icon,
      .prevPageIcon.hover sh-icon,
      :host(:not(.no-hovermq)) .nextPageIcon:hover sh-icon,
      .nextPageIcon.hover sh-icon {
        color: rgba(var(--ui-1), var(--opacity-3));
      }

      :host(.no-hovermq) .pagination-wrapper ul .sh-pagination-item:hover,
      :host(.no-hovermq) .pagination-wrapper ul .sh-pagination-item.hover,
      :host(:not(.no-hovermq)) .pagination-wrapper ul .sh-pagination-item:hover,
      :host .pagination-wrapper .sh-pagination-item.hover {
				background: rgba(var(--ui-1), var(--opacity-7));
				transition: all 0.2s ease-in-out;
				color: var(--text-primary);
      }
      /*css testing*/
      :host(.testing),
			:host(.testing) .pagination-wrapper,
			:host(.testing) .pagination-wrapper .sh-pagination-item,
			:host(.testing) .pagination-wrapper ul li {
        transition: all 0s linear;
      }
    </style>

    <!--HTML-->
    <div class="pagination-wrapper">
      <ul id="ul">
        <li title="Previous Page" on-click="_prevPage" class="prevPageIcon" id="leftArrowWrapper">
          <sh-icon icon="arrow-left" size="xs"></sh-icon>
        </li>
        <template id="paginationTemplateWrapper" is="dom-repeat" items="{{finalArray}}">
          <li class="sh-pagination-item" on-click="_handleClick" active$="{{makeActive(item)}}" click-disabled$="{{disableDot(item)}}" id="item">{{item}}</li>
        </template>
        <li title="Next Page" on-click="_nextPage" class="nextPageIcon" id="rightArrowWrapper">
          <sh-icon icon="arrow-right" size="xs"></sh-icon>
        </li>
      </ul>
    </div>
`;
  }

  static get is() {
    return 'sh-pagination';
  }
  static get properties() {
    return {
      pages: {
        type: Number,
        value: 9,
        reflectToAttribute: true,
        notify: true,
        observer: '_checkPages'
      },
      currentPage: {
        type: Number,
        value: 1,
        reflectToAttribute: true,
        notify: true
      },
      finalArray: {
        type: Array,
        reflectToAttribute: true,
        notify: true
      },
      active: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      }
    }
  }
  static get observers() {
    return [
      'updateArray(pages,currentPage)'
    ]
  }
  updateArray() {
    this._totalArray(this.pages);
    this.highlightCurrentPage();
    if (this.currentPage === 1) {
      this.shadowRoot.querySelector('.prevPageIcon').classList.add('disabled');
    }
    if (this.currentPage === this.pages) {
      this.shadowRoot.querySelector('.nextPageIcon').classList.add('disabled');
    }
  }

  ready() {
    super.ready();
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }

    if (!this.disabled && this.shadowRoot.querySelectorAll('sh-icon').length > 0) {
      for (let i = 0; i < this.shadowRoot.querySelectorAll('sh-icon').length; i++) {
        this.shadowRoot.querySelectorAll('sh-icon')[i].setAttribute('tabindex', '0');
      }
    }
  }
  _checkPages() {
    //make pagination invisible when pages is less than or equal to 1
    if(this.pages<=1){
      this.style.display = 'none';
    }
    else {
      this.style.display = 'block';
    }

    if (this.pages > 999) {
      this.shadowRoot.querySelector('.pagination-wrapper').classList.add('condensed');
    } else {
      this.shadowRoot.querySelector('.pagination-wrapper').classList.remove('condensed');
    }
  }
  disableDot(item) {
    if (item.toString() === '...') {
      return true;
    } else {
      return false;
      }
  }
  connectedCallback() {
    super.connectedCallback();
    this._totalArray(this.pages);
    this.highlightCurrentPage();
    if (this.currentPage === 1) {
      this.shadowRoot.querySelector('.prevPageIcon').classList.add('disabled');
    }
    if (this.currentPage === this.pages) {
      this.shadowRoot.querySelector('.nextPageIcon').classList.add('disabled');
    }
  }
  _totalArray(pages) {
    let lastPage, fourthLastPage;
    lastPage = this.pages;
    fourthLastPage = this.pages - 3;
    //If no .of pages < =7, display from 1-7
    if (this.pages <= 7) {
      let totalArray;
      totalArray = [];
      for (let i = 0; i < this.pages; i++) {
        totalArray.push(i + 1);
      }
      this.set('finalArray', totalArray);
    }
    // Else if no.of pages > 7 , then enter this 'else' block
    else {
      let totalArray;
      totalArray = [];
      /*
        If current page = 1, totalArray = [1 2 3 4 5 ... 20]
        If current page = 2, totalArray = [1 2 3 4 5 ... 20]
        If current page = 3, totalArray = [1 2 3 4 5 ... 20]
        If current page = 4, totalArray = [1 2 3 4 5 ... 20]
      */
      if (this.currentPage <= 4) {
        for (let i = 1; i <= 7; i++) {
          if (i <= 5) {
            totalArray.push(i);
          }
          else if (i === 6) {
            totalArray.push('...');
          }
          else {
            totalArray.push(pages);
          }
        }
      }
      /*
        If current page = 5 , totalArray = [1 ... 4 5 6 ... 20]
        If current page = 6 , totalArray = [1 ... 5 6 7 ... 20]
        If current page = 7 , totalArray = [1 ... 6 7 8 ... 20]
        If current page = x , totalArray = [1 ... (x-1) (x) (x+1) ... N], where N = total-pages
        .
        .
        If current page = 16 ((N-3)-1), totalArray = [1 ... 15 16 17 ... 20]
       */
      else if (this.currentPage > 4 && this.currentPage < fourthLastPage) {
        for (let i = 1; i <= 5; i++) {
          if (i === 1) {
            totalArray.push(i);
          }
          else if (i === 2 || i === 4) {
            totalArray.push('...');
          }
          else if (i === 3) {
            for (let j = 1; j <= 3; j++) {
              switch (j) {
                case 1:
                  totalArray.push(this.currentPage - 1);
                  break;
                case 2:
                  totalArray.push(this.currentPage);
                  break;
                case 3:
                  totalArray.push(this.currentPage + 1);
                  break;
              }
            }
          } else {
            totalArray.push(lastPage);
          }
        }
      }
      /*
        If current page = 17, totalArray = [1 ... 16 17 18 19 20]
        If current page = 18, totalArray = [1 ... 16 17 18 19 20]
        If current page = 19, totalArray = [1 ... 16 17 18 19 20]
        If current page = 20, totalArray = [1 ... 16 17 18 19 20]
      */
      else {
        for (let i = 1; i <= 3; i++) {
          switch (i) {
            case 1:
              totalArray.push(i);
              break;
            case 2:
              totalArray.push('...');
              break;
            case 3:
              {
                let subValue = 1;
                for (let j = 1; j <= 5; j++) {
                  totalArray.push(fourthLastPage - subValue);
                    --subValue;
                }
              }
              break;
          }
        }
      }
      this.set('finalArray', totalArray);
    }
  }
  highlightCurrentPage() {
    let allPaginationItems, index, currentPage;
    /* Selecting all pagination-items */
    allPaginationItems = this.shadowRoot.querySelectorAll('.sh-pagination-item');
    index = 0;
    currentPage = this.currentPage;
    /* Finding index of currentPage among the pagination items */
    if (allPaginationItems.length) {
      for (let i = 0; i < allPaginationItems.length; i++) {
        let testValue;
        testValue = Number(allPaginationItems[i].innerHTML);
        if (testValue === currentPage) {
          index = i;
        }
      }
      /* Removing active attributes from all pagination items  */
      for (let i = 0; i < allPaginationItems.length; i++) {
        allPaginationItems[i].removeAttribute('active');
      }
      /* And making only the current page item active */
      allPaginationItems[index].setAttribute('active', true);
    }
    if (this.currentPage + 1 > this.pages) {
      this.shadowRoot.querySelector('.nextPageIcon').classList.add('disabled');
    } else {
      this.shadowRoot.querySelector('.nextPageIcon').classList.remove('disabled');
    }
    if (this.currentPage - 1 < 1) {
      this.shadowRoot.querySelector('.prevPageIcon').classList.add('disabled');
    } else {
      this.shadowRoot.querySelector('.prevPageIcon').classList.remove('disabled');
    }
  }
  makeActive(item) {
    if (item === this.currentPage) {
      return true;
    }
    else {
      return false;
    }
  }
  _handleClick(e) {
    let clickedItem, isNotANumber;
    clickedItem = Number(e.target.innerHTML);
    isNotANumber = isNaN(clickedItem);
    if (isNotANumber === false) {
      this.currentPage = clickedItem;
      this._totalArray(this.pages);
      this.highlightCurrentPage();
      this.dispatchEvent(new CustomEvent('clicked-page-move', {
        detail: this,
        composed: true,
        bubbles: true
      }));
    }
  }
  _prevPage() {
    let nextCurrentPage;
    nextCurrentPage = this.currentPage - 1;
    if (nextCurrentPage >= 1) {
      let currentPage;
      currentPage = nextCurrentPage;
      this.currentPage = currentPage;
      this._totalArray(this.pages);
      this.highlightCurrentPage();
      this.dispatchEvent(new CustomEvent('previous-page-move', {
        detail: this,
        composed: true,
        bubbles: true
      }));
    }
  }
  _nextPage() {
    let nextCurrentPage;
    nextCurrentPage = this.currentPage + 1;
    if (nextCurrentPage <= this.pages) {
      let currentPage;
      currentPage = nextCurrentPage;
      this.currentPage = currentPage;
      this._totalArray(this.pages);
      this.highlightCurrentPage();
      this.dispatchEvent(new CustomEvent('next-page-move', {
        detail: this,
        composed: true,
        bubbles: true
      }));
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
window.customElements.define(SHPagination.is, SHPagination);
