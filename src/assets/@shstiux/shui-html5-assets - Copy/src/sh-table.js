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
        min-width: fit-content;
        min-width: -ms-fit-content;
        min-width: -moz-fit-content;
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
      :host([freeze]) {
        width: calc(100% - 8px) !important;
        position: relative;
        overflow-x: hidden;
      }
      :host([freeze]) .floating-scrollbar {
        height: 8px;
        width:8px;
        position: absolute;
        overflow-x: auto;
        z-index: 9999
      }
      :host([freeze]) .floating-scrollbar div {
        height: 8px;
        display: block;
      }
      :host([freeze]) .table-wrapper {
        margin-bottom: 16px;
        min-width: 100%;
      }
      .disappear {
        z-index: -1;
        opacity: 0;
        visibility: hidden
      }
      .fade-in {
        z-index: initial;
        opacity : 1;
        visibility: visible;
        transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;
      }

    </style>

    <!--HTML-->

    <slot name="header" id="header-slot"></slot>
    <div class="table-wrapper" on-scroll="_contentScrolled" id="tableContent" >
      <div class="content" >
        <slot></slot>
      </div>
    </div>
    <div class="floating-scrollbar">
      <div class="scrollThumb"></div>
    </div>
    <sh-spinner label = "Loading ..." size = "s" style="display: none"></sh-spinner>
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
        observer: 'observeWidthChangeL'
      },
      rwidth: {
        type: String,
        value: '33.3%',
        reflectToAttribute: true,
        notify: true,
        observer: 'observeWidthChangeR'
      },
      mwidth: {
        type: String,
        value: '33.3%',
        reflectToAttribute: true,
        notify: true,
        observer: 'observeWidthChangeM'
      },
      scrollPosition: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true
      },
      stickyScroll: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      scroller: {
        type: Function
      },
      scrollerTop:{
        type: String
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
    this.addEventListener('clicked', function () {
      let childElement;
      childElement = this.querySelectorAll('sh-table-row[active]');
      for (let i = 0; i < childElement.length; i++) {
        childElement[i].removeAttribute('active');
      }
    });
    let self,
        floatScrollBar;
    self = this;
    if(self.freeze === true) {
      /** Extracting the computed width of each block and storing the values */
      let leftBlockPixelValues,
          midBlockPixelValues,
          rightBlockPixelValues;
      leftBlockPixelValues = self.children[0].shadowRoot.querySelector('.frozen-left').getBoundingClientRect().width;
      midBlockPixelValues = self.children[0].shadowRoot.querySelector('.scrollable').getBoundingClientRect().width;
      rightBlockPixelValues = self.children[0].shadowRoot.querySelector('.frozen-right').getBoundingClientRect().width;

      /** Setting the width value of each block explicitly to allow for the cells to hide and the scrollbar to appear */
      for(let i=0; i < self.children.length; i++) {
        self.children[i].shadowRoot.querySelector('.frozen-left').style.width = leftBlockPixelValues + 'px';
        self.children[i].shadowRoot.querySelector('.scrollable').style.width = midBlockPixelValues + 'px';
        self.children[i].shadowRoot.querySelector('.frozen-right').style.width = rightBlockPixelValues + 'px';
        self.children[i].style.minWidth = '100%';
        self.children[i].freeze = true;
      }
    }
    if(self.freeze) {
      /** We need a timeout here, since it takes some time to actually stamp the DOM in the browser. Because in the
       * subsequent functions, we are calculating the computed height and width of total rows and each block respectively.
       * This is to adjust the scrollbar position with respect to the table as a whole.
       */
      setTimeout(() => {
        self.alignFloatingScrollBar();
        self.adjustScrollBarWidth();
      }, 1000);

      if(self.scrollPosition !== '') {
        self.shadowRoot.querySelector('.floating-scrollbar').style.display = 'none';
      }
    }
    self.scroller = self.shadowRoot.querySelector('.floating-scrollbar');
    
    floatScrollBar = self.shadowRoot.querySelector('.floating-scrollbar');
    self.scrollerTop = floatScrollBar.getBoundingClientRect().top;
    setTimeout(() => {
      self._alignStickyScroller();
    }, 3000);
  }

  observeWidthChangeL(newValue){
    let self;
    self = this;
    if(newValue !== undefined && newValue !== '') {
      setTimeout(() => {
        for(let i=0; i < self.children.length; i++) {
          self.children[i].lwidth = newValue;
        }
        self.adjustCenterWidth();
        self.adjustScrollBarWidth();
      }, 2000);
    }
  }
  observeWidthChangeR(newValue){
    let self;
    self = this;
    if(newValue !== undefined && newValue !== '') {
      setTimeout(() => {
        for(let i=0; i < self.children.length; i++) {
          self.children[i].rwidth = newValue;
        }
        self.adjustCenterWidth();
        self.adjustScrollBarWidth();
      }, 2000);
    }
  }
  observeWidthChangeM(newValue){
    let self;
    self = this;
    if(newValue !== undefined && newValue !== '') {
      setTimeout(() => {
        for(let i=0; i < self.children.length; i++) {
          self.children[i].mwidth = newValue;
        }
        self.adjustCenterWidth();
        self.adjustScrollBarWidth();
      }, 2000);
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

  _contentScrolled(){
    let content,
        contentScroll,
        contentMaxScroll;
    content = this.$.tableContent;
    contentScroll = content.scrollTop + content.clientHeight;
    contentMaxScroll = content.scrollHeight;
    if(contentScroll === contentMaxScroll){
      this.dispatchEvent(new CustomEvent('scroll-end', {
        detail: this,
        composed: true,
        bubbles: true
      }));
    }
  }

  _alignStickyScroller() {
    let self,
        floatScrollBar;
    self = this;
    floatScrollBar = self.shadowRoot.querySelector('.floating-scrollbar');
    self.scrollerTop = floatScrollBar.style.top;
    if(self.stickyScroll === true) {
      floatScrollBar.style.position = 'absolute';
      floatScrollBar.style.top = (window.innerHeight - 48) + 'px';
      let page,
          main;
      page = document.querySelector('sh-page');
      main = page.shadowRoot.querySelector('.main-wrapper');
      main.addEventListener('scroll', function(){
        let scrollerTop,
            threshold,
            winHeight;
        scrollerTop = Number(floatScrollBar.style.top.toString().split('px')[0]);
        threshold = Number(self.scrollerTop.toString().split('px')[0]);
        winHeight = window.innerHeight;
        if(scrollerTop < threshold) {
          floatScrollBar.style.top = (winHeight - 48 + main.scrollTop) + 'px';
        }
        if(floatScrollBar.getBoundingClientRect().top > winHeight) {
          floatScrollBar.style.top = (winHeight - 48 + main.scrollTop) + 'px';
        }
        if(scrollerTop > threshold) {
          floatScrollBar.style.top = threshold + 'px';
        }
      });
    }
  }

  alignFloatingScrollBar(){
    /** Function to correctly position the scrollbar */
    let self,
        totalHeight,
        floatScrollBar,
        tableWrapperHeight,
        tableWrapperInnerHeight;
    self = this;
    totalHeight = 0;
    floatScrollBar = self.shadowRoot.querySelector('.floating-scrollbar');
    tableWrapperHeight = self.shadowRoot.querySelector('.table-wrapper').getBoundingClientRect().height;
    tableWrapperInnerHeight = self.shadowRoot.querySelector('.table-wrapper').scrollHeight;
    if(tableWrapperInnerHeight > tableWrapperHeight) {
      totalHeight = self.getBoundingClientRect().height;
    }
    else {
      for (let i = 0; i < self.children.length; i++) {
        totalHeight += self.children[i].shadowRoot.querySelector('#wrapper').getBoundingClientRect().height;
      }
      totalHeight += 16;
    }
    floatScrollBar.style.top = (totalHeight - 8) + 'px';
  }

  adjustScrollBarWidth() {
    let self,
        floatScrollBar,
        floatScrollThumb,
        scrollBarLeft;
    self = this;
    floatScrollBar = self.shadowRoot.querySelector('.floating-scrollbar');
    floatScrollThumb = self.shadowRoot.querySelector('.scrollThumb');
    floatScrollBar.style.width = self.children[0].shadowRoot.querySelector('.scrollable').getBoundingClientRect().width + 'px';
    floatScrollThumb.style.width = self.children[0].shadowRoot.querySelector('.scrollable').scrollWidth + 'px';
    scrollBarLeft = self.children[0].shadowRoot.querySelector('.frozen-left').getBoundingClientRect().width + 'px';
    floatScrollBar.style.left = scrollBarLeft;
  }

  adjustCenterWidth() {
    let self;
    self=this;
    /** Setting the width value of each block explicitly to allow for the cells to hide and the scrollbar to appear */
    for(let i=0; i < self.children.length; i++) {
      self.children[i].lwidth = self.lwidth;
      self.children[i].rwidth = self.rwidth;
      self.children[i].mwidth = self.mwidth;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    let self;
    self = this;
    if(self.freeze) {
      self.shadowRoot.querySelector('sh-spinner').style.display = 'block';
      self.shadowRoot.querySelector('.table-wrapper').classList.add('disappear');
      self.children[0].classList.add('disappear');
      self.shadowRoot.querySelector('.floating-scrollbar').classList.add('disappear');
    }
    setTimeout(() => {
      self.shadowRoot.querySelector('sh-spinner').style.display = 'none';
      self.shadowRoot.querySelector('.table-wrapper').classList.remove('disappear');
      self.children[0].classList.remove('disappear');
      self.shadowRoot.querySelector('.floating-scrollbar').classList.remove('disappear');

      self.shadowRoot.querySelector('.table-wrapper').classList.add('fade-in');
      self.children[0].classList.add('fade-in');
      self.shadowRoot.querySelector('.floating-scrollbar').classList.add('fade-in');
    }, 2000);
    let floatScrollBar;
    floatScrollBar = self.shadowRoot.querySelector('.floating-scrollbar');

    floatScrollBar.addEventListener('scroll', function(){
      for(let i = 0; i < self.children.length; i++) {
        self.children[i].shadowRoot.querySelector('.scrollable').scrollLeft = floatScrollBar.scrollLeft ;
      }
    });

    /** dynamic monitoring whether any items are added to the freeze table
     * so as to adjust the scrollbar accordingly;
     */

    if(self.freeze) {
      let monitorNode,
          config,
          callback;
      monitorNode = self;

      //   monitoring values
      config = { attributes: true, characterData: true, childList: true, subtree: true, attributeOldValue: true, characterDataOldValue: true};

      // Callback function to execute when mutations are observed
      callback = function(mutationList, observer) {
        mutationList.forEach((mutation) => {
          /** Extracting the computed width of each block and storing the values */
          let leftBlockPixelValues,
              midBlockPixelValues,
              rightBlockPixelValues;
          leftBlockPixelValues = self.children[0].shadowRoot.querySelector('.frozen-left').getBoundingClientRect().width;
          midBlockPixelValues = self.children[0].shadowRoot.querySelector('.scrollable').getBoundingClientRect().width;
          rightBlockPixelValues = self.children[0].shadowRoot.querySelector('.frozen-right').getBoundingClientRect().width;
          
          /** Setting the width value of each block explicitly to allow for the cells to hide and the scrollbar to appear */
          for(let i=0; i < self.children.length; i++) {
            self.children[i].shadowRoot.querySelector('.frozen-left').style.width = leftBlockPixelValues + 'px';
            self.children[i].shadowRoot.querySelector('.scrollable').style.width = midBlockPixelValues + 'px';
            self.children[i].shadowRoot.querySelector('.frozen-right').style.width = rightBlockPixelValues + 'px';
            self.children[i].freeze = true;
          }
          self.adjustCenterWidth();
          self.alignFloatingScrollBar();
          self.adjustScrollBarWidth();
        })
      };
      let observer;
      observer = new MutationObserver(callback);
      observer.observe(monitorNode, config);
    }
    window.addEventListener('resize',function(){
      self.adjustCenterWidth();
      self.alignFloatingScrollBar();
      self.adjustScrollBarWidth();
      self._alignStickyScroller();
    });
  }
}

window.customElements.define(SHTable.is, SHTable);
