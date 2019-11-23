/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHThumbnail extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: block;
        height: auto;
        transition: .2s all ease-in-out;
        position: relative;
        border-radius: 2px;
        border: 1px solid transparent;
      }
      :host(:not([label])) .label-wrapper,
      :host(:not([number])) .number,
      :host(:not([options])) .options-icon,
      :host(:not([selectable])) .thumbnail-checkbox,
      :host([selectable]:not([checked]):not(:hover)) .thumbnail-checkbox,
      :host(:not([new])) .new-icon,
      :host(:not([icon])) .thumbnail-icon {
        display: none;
      }
      .thumbnail-wrapper {
        display: block;
        cursor: pointer;
        color: rgba(var(--ui-1), var(--opacity-3)) ;
        z-index: 2;
        position: relative;
      }
      .image-wrapper {
        display: flex;
        flex-direction: column;
        padding: 8px 8px 8px 8px;
      }
      .image {
        background-size: contain;
        background-color: black;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        padding-top: 100%;
        box-sizing: border-box;
        transition: .2s all ease-in-out;
        border-radius: 2px;
      }
      .options-popover {
        position: absolute;
        right: 28px;
      }
      .label {
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        flex: 1;
        height: 32px;
        line-height: 16px;
      }
      .label-wrapper {
        height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: auto;
        color: rgba(var(--ui-1), var(--opacity-3)) ;
        margin: -4px 8px 4px 8px;
      }
      :host([options]) .options-icon {
        display: inline-block;
      }
      .number {
        position: absolute;
        left: 16px;
        bottom: 16px;
        background: var(--base-3);
        opacity: var(--opacity-2);
        padding: 0px 8px;
        border-radius: 16px;
        height: 24px;
        line-height: 24px;
        display: block;
        width: auto;
      }
      :host([selectable].no-hovermq) .thumbnail-checkbox,
      :host([selectable]:hover) .thumbnail-checkbox,
      :host([checked]) .thumbnail-checkbox {
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 10px;
        width: 24px;
        padding: 4px;
      }
      .thumbnail-checkbox::before,
      .thumbnail-icon::before {
        height: 32px;
        width: 32px;
        top: 0px;
        left: 0px;
        content: "";
        background: var(--base-2);
        opacity: var(--opacity-2);
        position: absolute;
        border-radius: 1px;
      }
      .thumbnail-icon::before {
        background: rgba(0,0,0, var(--opacity-3));
      }
      :host(:hover) {
        background: rgba(var(--ui-1), var(--opacity-7));
      }
      :host([active]) {
        background: rgba(var(--ui-1), var(--opacity-6));
      }
      :host([active]) .label {
        color: rgba(var(--ui-1), var(--opacity-2));
      }
      :host([focus]) {
        border-color: rgb(var(--ui-0));
      }

      /* badge slot */
      :host(:not([badge])) .thumbnail-badge {
        display: none;
      }
      :host([badge]) .thumbnail-badge {
        display:block;
        position: absolute;
        top: 10px;
        right: 10px;
        width: 16px;
        margin: 8px;
      }
      :host([badge="new"]) .thumbnail-badge {
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background-color: rgb(var(--ui-0));
      }

      .thumbnail-icon {
        display: block;
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: rgba(255, 255, 255, var(--opacity-3)) ;
      }
      :host(:not([number])) .id-number {
        display: none;
      }

      /* icons slot */
      .icons-wrapper {
        display: flex;
      }

      .icons-wrapper ::slotted(*) {
        margin-left: 4px;
        margin-bottom: 4px;
        color: var(--text-secondary);
      }

      .icons-wrapper ::slotted(*:first-child) {
        margin-left: 8px;
      }

      /* badge */
      .new-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 8px;
        margin: 12px;
        height: 8px;
        border-radius: 8px;
        background-color: rgb(var(--ui-0));
      }
      :host([new]) .thumbnail-badge {
        display: none !important;
      }

      /* info slot */
      .info-slot-wrapper {
        display:flex;
        flex-direction:rows;
        display:block;
        position:absolute;
        bottom:10px;
        left:10px;
        background: var(--base-2);
        opacity: var(--opacity-3);
        padding: 4px;
        border-radius:2px;
      }
      
      .thumbnail-wrapper[empty-info] .info-slot-wrapper {
        display: none;
      }

      :host([active]) .icons-wrapper ::slotted(*) {
        color: var(--text-primary);
      }
    </style>

    <!--HTML-->
    <div class="thumbnail-wrapper" id="thumbnailWrapper" empty-info$="[[emptyInfo]]">
      <div class="image-wrapper">
        <div class="image" style$="background-image:url('[[src]]'); padding-top: calc(100% / ([[aspectRatio]]))"></div>
        <sh-icon class="thumbnail-icon" icon$="[[icon]]"></sh-icon>
        <sh-checkbox id="thumbnailCheckbox" label="" class="thumbnail-checkbox" on-click="_checkboxClicked" active$="[[checked]]"></sh-checkbox>
        <div class="new-icon"></div>
        <sh-badge class="thumbnail-badge" type$="[[badge]]"></sh-badge>
        <div class="info-slot-wrapper">
          <slot name="info" id="info"></slot>
        </div>
      </div>
    </div>
    <div class="label-wrapper" id="labelWrapper">
      <sh-text size="body-2" color="secondary" class="label" title$=[[label]]>
        <b class="id-number">[[number]] • </b>[[label]]
      </sh-text>
      <sh-icon button icon="more" class="options-icon" id="optionsIcon" on-click="_showOptions"></sh-icon>
    </div>
    <div class="icons-wrapper">
      <slot name="icons" id="icons"></slot>
    </div>
    <sh-popover id="popover" class="options-popover">
      <slot></slot>
    </sh-popover>`;
  }

  static get is() {
    return 'sh-thumbnail';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      src: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true
      },
      number: {
        type: Number,
        reflectToAttribute: true,
        notify: true
      },
      active: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      focus: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      selectable: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      new: {
        type: Boolean, 
        value: false, 
        reflectToAttribute: true,
        notify: true
      },
      badge: {
        type: String,
        value: 'new',
        reflectToAttribute: false,
        notify: true
      },
      checked: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      options: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      icon: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      aspectRatio: {
        type: String,
        value: "1/1",
        reflectToAttribute: true,
        notify: true
      },
      emptyInfo: {
        type: Boolean, 
        value: false
      },
      show: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: 'showpopover'
      }
    };
  }
  ready() {
    super.ready();
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    let items;
    items = this.querySelectorAll('sh-menu-item');
    if (items.length > 0) {
      this.options = true;
      for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function(e) {
          e.target.removeAttribute('active');
        });
      }
    } else {
      this.options = false;
    }
    // activate checkbox if checked
    if(this.checked) {
      this.$.thumbnailCheckbox.active = true;
    }
    // check for empty slots
    let infoNodes;
    infoNodes = this.$.info.assignedNodes({
      flatten: true
    }).length;
    if (infoNodes === 0) {
      this.emptyInfo = true;
    }

  }

  showpopover(show){
    if(show){
      this.shadowRoot.querySelector('sh-popover').style.visibility = 'visible';
      this.shadowRoot.querySelector('sh-popover').style.opacity = 1;
    }
    else {
      this.shadowRoot.querySelector('sh-popover').style.visibility = 'hidden';
      this.shadowRoot.querySelector('sh-popover').style.opacity = 0;
    }
  }

  _showOptions(e) {
    let self, iconHeight;
    self = this;
    self.show = !self.show;
    if (self.show) {
      iconHeight = 20;
      this.$.popover.style.top = this.shadowRoot.querySelector('.thumbnail-wrapper').offsetHeight + iconHeight + 'px';
      document.addEventListener('click', function(e) {
        if (e.target !== self) {
          self.show = false;
        }
      });
    } else {
        self.show = false;
    }
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('menu-clicked', {detail: this, bubbles: true, composed: true}));
  }

  _checkboxClicked(e) {
    e.stopImmediatePropagation();
    this.checked = !this.checked;
    e.stopPropagation();
  }
}

window.customElements.define(SHThumbnail.is, SHThumbnail);
