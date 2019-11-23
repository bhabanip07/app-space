import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import './sh-table-row.js';
import './sh-page.js';
class SHTable extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
      }

      :host([fit-content]) {
        min-height: fit-content;
        min-height: -ms-fit-content;
        min-height: -moz-fit-content;
        max-height: fit-content;
        max-height: -ms-fit-content;
        max-height: -moz-fit-content;
      }

      :host([readonly]) .content > ::slotted(sh-table-row) ,
      :host([readonly]) > ::slotted(sh-table-row) {
        pointer-events: none;
      }

      .table-wrapper {
        flex: 1;
        overflow-y: overlay;
        overflow-x: hidden;
        width: 100%;
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
      :host(:not([freeze])) .floating-scrollbar {
        display: none;
      }
      .table-wrapper {
        max-height: fit-content;
      }
      .floating-scrollbar {
        position: relative;
        height: 8px;
        margin-top:8px;
        overflow-x: auto;
      }
      .scrollThumb {
        height: 8px;
      }
      .header-wrapper {
        flex: 1;
        overflow-y: overlay;
        overflow-x: hidden;
        width: 100%;
        max-height: fit-content;
      }
    </style>

    <!--HTML-->
    <div class="header-wrapper">
      <slot name="header" id="header-slot"></slot>
    </div>    
    <div class="table-wrapper" on-scroll="_contentScrolled" id="tableContent" >
      <div class="content" >
        <slot></slot>
      </div>
    </div>
    <div class="floating-scrollbar" on-scroll="adjustScrollLeft">
      <div class="scrollThumb"></div>
    </div>
`;
  }

  static get is() {
    return 'sh-table';
  }
  static get properties() {
    return {
      freeze: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      lwidth: {
        type: String,
        value: '33.3%',
        reflectToAttribute: true,
        notify: true,
        observer: 'setFrozenWidthsOfChildren'
      },
      rwidth: {
        type: String,
        value: '33.3%',
        reflectToAttribute: true,
        notify: true,
        observer: 'setFrozenWidthsOfChildren'
      },
      mwidth: {
        type: String,
        value: '33.3%',
        reflectToAttribute: true,
        notify: true,
        observer: 'setFrozenWidthsOfChildren'
      },
      condensed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true,
        observer: 'condensedObserver'
      },
      scrolledLeft: {
        type: Number,
        observer: 'scrolledLeftChanged'
      }
    };
  }
  scrolledLeftChanged(newValue) {
    let self = this;
    self.children[0].scrollLeft = newValue;
  }
  ready() {
    super.ready();
    this.addEventListener('clicked', function () {
      let childElement;
      childElement = this.querySelectorAll('sh-table-row[active]');
      for (let i = 0; i < childElement.length; i++) {
        childElement[i].removeAttribute('active');
      }
    });
  }
  condensedObserver(isCondensed) {
    let children = this.children;
    if (isCondensed) {
      for (let i = 0; i < children.length; i++) {
        children[i].condensed = true;
      }
    }
    else {
      for (let i = 0; i < children.length; i++) {
        children[i].condensed = false;
      }
    }
  }
  observeWidthChangeL(newValue) {
    let self;
    self = this;
    self.children[0].lwidth = newValue;
  }
  observeWidthChangeM(newValue) {
    let self;
    self = this;
    self.children[0].mwidth = newValue;
  }
  observeWidthChangeR(newValue) {
    let self;
    self = this;
    self.children[0].rwidth = newValue;
  }
  setFrozenWidthsOfChildren() {
    let self;
    self = this;
    for (let i = 0; i < self.children.length; i++) {
      self.children[i].lwidth = self.lwidth;
      self.children[i].mwidth = self.mwidth;
      self.children[i].rwidth = self.rwidth;
    }
  }
  _contentScrolled() {
    let content,
      contentScroll,
      contentMaxScroll;
    content = this.$.tableContent;
    contentScroll = content.scrollTop + content.clientHeight;
    contentMaxScroll = content.scrollHeight;
    if (contentScroll === contentMaxScroll) {
      this.dispatchEvent(new CustomEvent('scroll-end', {
        detail: this,
        composed: true,
        bubbles: true
      }));
    }
  }

  connectedCallback() {
    super.connectedCallback();
    let self;
    self = this;
    let floatingScrollBar;
    floatingScrollBar = self.shadowRoot.querySelector('.floating-scrollbar');
    let floatThumb;
    floatThumb = self.shadowRoot.querySelector('.scrollThumb');
    self.addEventListener('middle-scrolled', function (e) {
      let scrollLeft;
      scrollLeft = e.detail.scrollLeft;
      self.scrolledLeft = scrollLeft;
      self.children[0].scrollLeft = scrollLeft;
      floatingScrollBar.scrollLeft = scrollLeft;
    });
    self.addEventListener('slots-modified', function (e) {
      floatThumb.style.width = e.detail.innerWidth + 'px';
      floatingScrollBar.style.width = e.detail.width + 'px';
      floatingScrollBar.style.left = e.detail.leftPosition + 'px';
      if (self.scrolledLeft !== undefined) {
        floatingScrollBar.scrollLeft = self.scrolledLeft;
        for (let i = 0; i < self.children.length; i++) {
          self.children[i].scrollLeft = self.scrolledLeft;
          self.children[i].shadowRoot.querySelector('.scrollable').scrollLeft = self.scrolledLeft;
        }
      }
     self.setFrozenWidthsOfChildren()
    })
    window.addEventListener('resize', function () {
      let firstRowChild = self.children[0];
      let frozenLeft = firstRowChild.shadowRoot.querySelector('.frozen-left');
      let scrollable = firstRowChild.shadowRoot.querySelector('.scrollable');
      floatingScrollBar.style.left = frozenLeft.getBoundingClientRect().width + 'px';
      floatingScrollBar.style.width = scrollable.getBoundingClientRect().width + 'px';
      floatThumb.style.width = scrollable.scrollWidth + 'px';
    })
  }
  adjustScrollLeft(e) {
    let self;
    self = this;
    if (self.children[0].scrollLeft !== e.target.scrollLeft) {
      self.children[0].scrollLeft = e.target.scrollLeft;
    }
  }

}

window.customElements.define(SHTable.is, SHTable);
