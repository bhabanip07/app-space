/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import './shared-styles.js';
import './sh-icon.js';
class SHSearch extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        width: 100%;
        display: block;
        height: 40px;
      }
      .search-wrapper {
        position: relative;
        height: 40px;
      }
      input,
      :host([readonly]) input:focus {
        line-height: 24px !important;
        padding: 8px 40px 8px 40px;
        border-radius: 2px 2px 0px 0px;
        background: rgba(var(--ui-1), var(--opacity-7));
        height: 40px;
        color: var(--text-primary);
        font: var(--body-1);
        font-size: 14px;
        border: none;
        outline: none;
        box-sizing: border-box;
        width: 100%;
        text-overflow: ellipsis;
        transition: .2s all ease-in-out;
        border-bottom: 1px solid transparent;
        border-color: rgba(var(--ui-1), var(--opacity-5));
      }
      input::-ms-clear {
        display: none;
      }
      :host([disabled]) sh-icon {
        color: rgba(var(--ui-1), var(--opacity-5));
      }
      :host([disabled]) input {
        color: var(--text-disabled);
        background: rgba(var(--ui-1), var(--opacity-7));
      }
      sh-icon {
        position: absolute;
        top: 8px;
        left: 8px;
        color: rgba(var(--ui-1), var(--opacity-4));
        cursor: pointer;
      }
      #showSearch {
        position: absolute;
        top: 40px;
        width: 100%;
        max-height: 200px;
        overflow: auto;
        display: none;
        box-shadow: var(--shadow-overlay);
        border-top: none;
        background-color: rgba(var(--ui-8), var(--opacity-1));
        z-index: 1;
      }
      .name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      #showSearch .itemList {
        height: 24px;
        padding: 8px;
        font: var(--body-1);
        color: var(--text-primary);
        line-height: 24px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-height: 24px;
      }
      .closeIcon {
        display: none;
        position: absolute;
        left: calc(100% - 32px);
        cursor: pointer;
        margin: 0;
        color: rgba(var(--ui-1), var(--opacity-4));
        outline : 0;
        background: transparent !important;
      }
      :host([disabled]) input::-webkit-input-placeholder {
        color: var(--text-disabled);
      }
      input::-webkit-input-placeholder {
        font: var(--body-1);
        color: var(--text-secondary);
      }
      .searchText {
        white-space: pre;
        color: var(--text-disabled);
        font: var(--body-1);
      }
      /* hover */
      input:hover {
        background: rgba(var(--ui-1), var(--opacity-6));
      }
      input:focus {
        border-color: rgba(var(--ui-1), var(--opacity-3));
      }
      :host(.no-hovermq) sh-icon:hover,
      :host(:not(.no-hovermq)) sh-icon:hover,
      sh-icon.hover {
        color: rgba(var(--ui-1), var(--opacity-3));
      }
      :host(.no-hovermq) #showSearch .itemList:hover,
      :host(:not(.no-hovermq)) #showSearch .itemList:hover,
      #showSearch .itemList.hover {
        cursor: pointer;
        background: rgba(var(--ui-1), var(--opacity-7));
      }
      :host(.no-hovermq) .closeIcon:hover,
      :host(:not(.no-hovermq)) .closeIcon:hover,
      .closeIcon.hover {
        color: rgba(var(--ui-1), var(--opacity-3));
      }
      :host(:not(.no-hovermq)) ::-webkit-input-placeholder:hover {
        font: var(--body-1);
        color: var(--text-secondary);
      }
      .active {
        background: rgba(var(--ui-1), var(--opacity-7));
      }
      /*multiline suggestions */
       :host([multiline]) #showSearch .itemList{
         padding: 4px 8px;
       }
       :host([multiline]) #showSearch .itemList{
        padding: 4px 8px;
        height: 32px;
        line-height: 32px;
        max-height: 32px;
       }
       :host([multiline]) #showSearch .itemList div{
        padding: 0;
        height: 16px;
        line-height: 16px;
      }
      :host([multiline]) #showSearch .firstItem{
        font: var(--body-1);
        color: var(--text-primary);
      }
      :host([multiline]) #showSearch .secondItem{
        font: var(--body-2);
        color: var(--text-secondary);
      }
      .secondItem .searchText {
        font: var(--body-2);
      }
      .firstItem, .secondItem{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .empty-wrapper{
        display: none;
      }
      :host([empty-result]) .empty-wrapper{
        display: block;
        padding: 16px 8px;
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

    <div class="search-wrapper">
      <input type="text" value="{{value::input}}" id="searchBox" class="form-control" disabled$="[[disabled]]" placeholder="[[label]]">
      <sh-icon size="s" icon="search" on-click="_search"></sh-icon>
      <sh-icon icon="cancel" size="s" class="closeIcon" id="close" on-click="_clearInput" tabindex="0"></sh-icon>
      <div id="showSearch">
      <template is="dom-if" if="[[singlesearch]]">
        <template id="searchTemplate" is="dom-repeat" items="{{searchArray}}" filter="{{_computeSingleFilter(value)}}">
          <div on-click="_selectItem" class="itemList" data-full-str$="{{item}}">
            <span class="name" data-full-str$="{{item}}">{{item}}</span>
          </div>
        </template>
      </template>
      <template is="dom-if" if="[[multiline]]">
        <template id="multiSearchTemplate" is="dom-repeat" items="{{searchArray}}" filter="{{_computeFilter(value)}}">
          <div on-click="_selectItem" class="itemList" data-full-str$="{{buildItem(item, firstItem)}}">
            <div class="firstItem" data-full-str$="{{buildItem(item, firstItem)}}">
              <span class="name" data-full-str$=" {{buildItem(item, firstItem)}}">{{buildItem(item, firstItem)}}</span>
            </div>
            <div class="secondItem" data-full-str$="{{buildItem(item, firstItem)}}" data-full-second-str$="{{buildItem(item, secondItem)}}">
              <span class="name" data-full-str$=" {{buildItem(item, firstItem)}}">{{buildItem(item, secondItem)}}</span>
            </div>
          </div>
        </template>
      </template>

        <div class="empty-wrapper">
          <slot name="empty"></slot>
        </div>
      </div>
    </div>
`;
  }

  static get is() {
    return 'sh-search';
  }
  static get properties() {
    return {
      label: {
        type: String,
        value: 'Search',
        reflectToAttribute: true,
        notify: true
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      searchArray: {
        type: Array,
        reflectToAttribute: true,
        notify: true,
        value() {
          return []
        }
      },
      multiline: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      singlesearch: {
        type: Boolean,
        value: true
      },
      currentFocus: {
        value: -1,
        type: Number
      },
      value: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      fields: {
        type: Array,
        reflectToAttribute: true,
        notify: true,
        value() {
          return []
        }
      },
      emptyResult: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      wholeString: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      }
    };
  }

  ready() {
    super.ready();
    this.$.searchBox.addEventListener('keyup', () => {
      this._changeInput(this.value);
    });
    this.$.searchBox.addEventListener('keydown', e => {
      this.keyEvents(e);
    });
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }

    this.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this._search();
      }
    });
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.children.length === 0) {
      this.shadowRoot.querySelector('.empty-wrapper').style.padding = '0';
    }

    if (this.multiline) {
      this.singlesearch = false;
      if (this.fields.length === 0 && this.searchArray.length > 0) {
        this.firstItem = Object.keys(this.searchArray[0])[0];
        this.secondItem = Object.keys(this.searchArray[0])[1];
      }
      else {
        this.firstItem = this.fields[0];
        this.secondItem = this.fields[1];
      }
    }
    let search;
    search = this;
    document.body.addEventListener('click', e => search._closeSearch(e));
    search.addEventListener('focus', function () {
      if(this.multiline) {
        search._computeFilter(search.value);
      }
      else {
        search._computeSingleFilter(search.value);
      }
    });
    this.$.close.addEventListener('focus', function () {
      this.onkeyup = function (e) {
        if (e.keyCode == '13') {
          search._clearInput();
        }
        if (e.keyCode == '9') {
          this.style.outline = '2px solid rgb(59, 153, 252)';
          this.style.outlineOffset = '-2px';
        }
      };
    });
    this.$.close.addEventListener('blur', function () {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  }
  buildItem(item, field) {
    return item[field];
  }
  _closeSearch(e) {
    let self, target;
    self = this;
    target = e.target;
    if (target === self) {
      return;
    } else {
      self.shadowRoot.querySelector('#showSearch').style.display = 'none';
    }
  }
  //on clearing input the close icon and search results will be hidden
  _clearInput() {
    let showClose, showSearch;
    showClose = this.shadowRoot.querySelector('.closeIcon');
    showSearch = this.shadowRoot.querySelector('#showSearch');
    showClose.style.display = 'none';
    this.value = '';
    showSearch.style.display = 'none';
    this.clearActive();
    this.dispatchEvent(new CustomEvent('clearsearch', {
      detail: this,
      composed: true,
      bubbles: true
    }));
  }
  //keyboard events using up and down arrows to navigate between the search results
  keyEvents(e) {
    let x;
    x = this.shadowRoot.querySelector('#showSearch');
    if (x) {
      x = x.querySelectorAll('.itemList');
    }
    if (e.keyCode === 40) {
      this.currentFocus++;
      this.addActive(x);
    }
    if (e.keyCode === 38) {
      this.currentFocus--;
      this.addActive(x);
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      if (this.currentFocus > -1 && x) {
          x[this.currentFocus].click();
      }
    }
  }
  addActive(x) {
    if (!x) {
       return false;
    }
    this.removeActive(x);
    if (this.currentFocus >= x.length) {
      this.currentFocus = 0;
    }
    if (this.currentFocus < 0) {
      this.currentFocus = x.length - 1;
    }
    x[this.currentFocus].classList.add('active');
  }
  removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('active');
    }
  }

  refreshFilter() {
    if(this.singlesearch) {
      this.shadowRoot.querySelector('#searchTemplate').render();
    }
    else {
      this.shadowRoot.querySelector('#multiSearchTemplate').render();
    }
  }
  //on user input the search results will be shown and highlights the user enetered text in search result
  _changeInput(value) {
    let showSearch, showClose, val;
    showSearch = this.shadowRoot.querySelector('#showSearch');
    showClose = this.shadowRoot.querySelector('.closeIcon');
    val = value;
    if((this.wholeString && this.singlesearch) || this.singlesearch) {
      let itemList;
      itemList = this.shadowRoot.querySelectorAll('#showSearch .itemList');
      for(let i=0;i<itemList.length;i++) {
        let  fullStr;
        fullStr = itemList[i].dataset.fullStr;
        itemList[i].innerHTML = this.searchHighlight(fullStr,value);
      }
    }
    if (this.multiline) {
      this.multilineSearch(val);
    }

    showClose.style.display = 'block';
    if (value === '') {
      this.clearActive();
      showClose.style.display = 'none';
      showSearch.style.display = 'none';
    }
    if (showSearch.querySelectorAll('.itemList').length === 0) {
      if (this.value === '') {
        return;
      }
      this.dispatchEvent(new CustomEvent('noresult', {
        detail: this,
        composed: true,
        bubbles: true
      }));
      this.emptyResult = true;
    }
    else {
      this.emptyResult = false;
    }
  }

  searchHighlight(fullStr, value) {
    let matchStart, matchEnd,beforeMatch, matchText, afterMatch, replaceHtml;
    matchStart = fullStr.toLowerCase().indexOf(value.toLowerCase());
    matchEnd = matchStart + value.length - 1;
    beforeMatch =  fullStr.slice(0, matchStart);
    matchText = fullStr.slice(matchStart, matchEnd + 1);
    afterMatch = fullStr.slice(matchEnd + 1);
    replaceHtml = beforeMatch + '<span class="searchText">' + matchText+'</span>' + afterMatch;
    return replaceHtml;
  }

  multilineSearch(value){
    let val, firstItemList, secondItemList;
    val = value;
    firstItemList = this.shadowRoot.querySelector('#showSearch').querySelectorAll('.itemList .firstItem');
    secondItemList = this.shadowRoot.querySelector('#showSearch').querySelectorAll('.itemList .secondItem');
    for(let i=0;i<firstItemList.length;i++) {
      let  fullStr;
      fullStr = firstItemList[i].dataset.fullStr;
      if(fullStr.toLowerCase().match(new RegExp('^'+val,'i'))) {
        firstItemList[i].innerHTML = this.searchHighlight(fullStr,val);
      }
      else if(this.wholeString && fullStr.toLowerCase().search(val.toLowerCase())>=0) {
        firstItemList[i].innerHTML = this.searchHighlight(fullStr,val);
      }
      else {
        firstItemList[i].innerHTML = '<span class="name">' + fullStr + '</span>';
      }
    }
    for(let i=0;i<secondItemList.length;i++) {
      let  fullSecondStr;
      fullSecondStr = secondItemList[i].dataset.fullSecondStr;
      if(fullSecondStr.toLowerCase().match(new RegExp('^'+val,'i'))) {
        secondItemList[i].innerHTML = this.searchHighlight(fullSecondStr,val);
      }
      else if(this.wholeString && fullSecondStr.toLowerCase().search(val.toLowerCase())>=0) {
        secondItemList[i].innerHTML = this.searchHighlight(fullSecondStr,val);
      }
      else {
        secondItemList[i].innerHTML = '<span class="name">' + fullSecondStr + '</span>';
      }
    }
  }

  //filter results based on user input
  _computeFilter(string) {
    let showSearch, computeStr, self;
    self=this;
    computeStr = string;
    showSearch = this.shadowRoot.querySelector('#showSearch');
    if (!computeStr) {
      showSearch.style.display = 'none';
      return null;
    } else {
      showSearch.style.display = 'block';
      computeStr = computeStr.toLowerCase();
        return function (searchedString) {
          let firstKey, secondKey;
          firstKey = searchedString[Object.keys(searchedString)[0]].toLowerCase();
          secondKey = searchedString[Object.keys(searchedString)[1]].toLowerCase();
          if(self.wholeString && self.multiline) {
            return firstKey.match(new RegExp(computeStr, 'i')) || secondKey.match(new RegExp(computeStr, 'i'));
          }
          else {
            return firstKey.match(new RegExp('^' + computeStr, 'i')) || secondKey.match(new RegExp('^' + computeStr, 'i'));
          }
        };
    }
  }
  _computeSingleFilter(string) {
    let showSearch, computeStr, self;
    self=this;
    computeStr = string;
    showSearch = this.shadowRoot.querySelector('#showSearch');
    if (!computeStr) {
      showSearch.style.display = 'none';
      return null;
    } else {
      showSearch.style.display = 'block';
      computeStr = computeStr.toLowerCase();
        return function (searchedString) {
          if(self.wholeString && self.singlesearch) {
            return searchedString.match(new RegExp(computeStr,'i'));
          }
          else {
            return searchedString.match(new RegExp('^' + computeStr, 'i'));
          }
        };

    }
  }

  clearActive() {
    let activeClass;
    activeClass = this.shadowRoot.querySelector('#showSearch').getElementsByClassName('active');
    if (activeClass) {
      for (let i = 0; i < activeClass.length; i++) {
        activeClass[i].classList.remove('active');
      }
    }
    this.currentFocus = -1;
  }
  //select item from the search results and display in input textbox
  _selectItem(e) {
    let  showSearch;
    showSearch = this.shadowRoot.querySelector('#showSearch');
    this.value = e.target.dataset.fullStr;
    if(e.target.tagName === 'SPAN') {
      this.value = e.target.parentNode.dataset.fullStr;
    }
    else {
      this.value = e.target.dataset.fullStr;
    }
    this.refreshFilter(this.value);
    this._changeInput(this.value);
    showSearch.style.display = 'none';
    this.clearActive();
    this._search();
  }
  _search() {
    // fire event on searching
    this.dispatchEvent(new CustomEvent('search', {
      detail: this,
      composed: true,
      bubbles: true
    }));
  }
}
window.customElements.define(SHSearch.is, SHSearch);
