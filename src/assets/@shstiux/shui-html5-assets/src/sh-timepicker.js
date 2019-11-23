/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import './shared-styles.js';

// Breakpoint defines value (in pixels), below which viewport will be treated as mobile
const BREAKPOINT = 540;

/* Helper functions for range picker */
let getTransformValue;
let unifyTouches;
let swipe;
let lock;

getTransformValue = function (transformString) {
  let res = null;
  res = transformString.match(/\((.*?)\)/i);
  if (res) {
    res = res[0];
  } else {
    res = '0';
  }
  res = parseInt(res.replace('(', '').replace(')', ''), 10);
  return res;
};

// combines multipoint touches to one single touch
unifyTouches = function (e) {
  let returnValue;
  if (e.changedTouches) {
    returnValue = e.changedTouches[0];
  } else {
    returnValue = e;
  }
  return returnValue;
};


// performs list scrolling
swipe = function (swipe_target, direction, rate) {
  // get the current position values
  let transform_value = getTransformValue(swipe_target.element.style.transform);
  if (direction === 'up') {
    transform_value = transform_value - (swipe_target.props.LIST_ITEM_HEIGHT * rate);
  } else {
    transform_value = transform_value + (swipe_target.props.LIST_ITEM_HEIGHT * rate);
  }
  // 2 because third element is always at focus,
  // so to make first element at third place(selection place),
  // we need to pad 2 places to enable first element be selected
  // at third place
  if (transform_value > swipe_target.props.LIST_ITEM_HEIGHT * 2) {
    transform_value = swipe_target.props.LIST_ITEM_HEIGHT * 2;
  }
  if (transform_value < (3 - swipe_target.props.TOTAL_ELEMENTS) * swipe_target.props.LIST_ITEM_HEIGHT) {
    transform_value = (3 - swipe_target.props.TOTAL_ELEMENTS) * swipe_target.props.LIST_ITEM_HEIGHT;
  }
  swipe_target.element.children[swipe_target.props.selectionValue].className = swipe_target.element.children[swipe_target.props.selectionValue].className.replace(' selected', '');
  swipe_target.props.selectionValue = transform_value;
  swipe_target.props.selectionValue = parseInt(Math.abs((swipe_target.props.selectionValue -
    (2 * swipe_target.props.LIST_ITEM_HEIGHT)) / swipe_target.props.LIST_ITEM_HEIGHT), 10);

  swipe_target.element.style.transform = `translateY(${transform_value}px)`;
};

// locks the initial touched coordinate
lock = function (e) {
  return unifyTouches(e).clientY;
};


class SHTimepicker extends PolymerElement {

  constructor() {
    super();
    this.arr = [];

  }

  static get timepickerTemplate() {
    return html `
        <template is="dom-if" if="[[!responsive]]">
          <div class="timepicker-panel-wrapper">
            <div class="timepicker-panel">
              <div class="timepicker-controls-wrapper">
                <div class="timepicker-controls hour-control">
                  <sh-icon icon="up-s" id="dropdown-icon" data-id="h" button="" size="s" on-click="incrementWithButton"></sh-icon>
                  <div class="control-value"><input type="text" readonly="true" placeholder="hh" data-id="h-ip" id="h" min="1"
                      max="12" on-keyup="validateNumber" maxlength="2" value="{{h}}" on-keydown="incrementOrDecrement" size="2"
                      on-change="updatePropertyValues"></div>
                  <sh-icon icon="down-s" id="dropdown-icon" data-id="h" button="" size="s" on-click="decrementWithButton"></sh-icon>
                </div>
                <div class="seperator">:</div>
                <div class="timepicker-controls min-control">
                  <sh-icon icon="up-s" id="dropdown-icon" data-id="m" button="" size="s" on-click="incrementWithButton"></sh-icon>
                  <div class="control-value"><input type="text" readonly="true" placeholder="mm" data-id="m-ip" id="m" min="0"
                      max="59" on-keyup="validateNumber" maxlength="2" value="{{m}}" on-keydown="incrementOrDecrement" size="2"
                      on-change="updatePropertyValues"></div>
                  <sh-icon icon="down-s" id="dropdown-icon" data-id="m" button="" size="s" on-click="decrementWithButton"></sh-icon>
                </div>
                <div class="seperator full">:</div>
                <div class="timepicker-controls sec-control full">
                  <sh-icon icon="up-s" id="dropdown-icon" data-id="s" button="" size="s" on-click="incrementWithButton"></sh-icon>
                  <div class="control-value"><input type="text" placeholder="ss" readonly="true" data-id="s-ip" id="s" min="0"
                      max="59" on-keyup="validateNumber" maxlength="2" value="{{s}}" on-keydown="incrementOrDecrement" size="2"
                      on-change="updatePropertyValues"></div>
                  <sh-icon icon="down-s" id="dropdown-icon" data-id="s" button="" size="s" on-click="decrementWithButton"></sh-icon>
                </div>
                <div class="seperator"></div>
                <div class="timepicker-controls ampm-control">
                  <sh-icon icon="up-s" id="dropdown-icon" button="" size="s" data-id="ap" on-click="incrementWithButton"></sh-icon>
                  <div class="control-value"><input type="text" placeholder="AM" readonly="true" data-id="ap-ip" id="amOrPm"
                      value="{{amPm}}" size="2" on-keydown="incrementOrDecrement" on-change="updatePropertyValues"></div>
                  <sh-icon icon="down-s" id="dropdown-icon" button="" size="s" data-id="ap" on-click="decrementWithButton"></sh-icon>
                </div>
              </div>
            </div>
          </div>
        </template>
            `;
  }
  static get timepickerMobileTemplate() {
    return html `
        <template is="dom-if" if="[[responsive]]">
          <sh-drawer position="bottom" id="drawer-bottom-time">
            <div class="rangepicker">
              <div class="rangepicker-values-outer-wrapper outer-wrapper-1">
                <div data-target="h" class="rangepicker-container picker-container-1">
                  <dom-repeat items="{{hour_values}}">
                    <template id="hour_value_template" is="dom-bind">
                      <div class="value_container">
                        <p class="">{{item.value}}</p>
                      </div>
                    </template>
                  </dom-repeat>
                </div>
              </div>
              <div class="rangepicker-values-outer-wrapper outer-wrapper-2 full">
                <div data-target="m" class="rangepicker-container picker-container-2">
                  <dom-repeat items="{{min_sec_values}}">
                    <template id="min_value_template" is="dom-bind">
                      <div class="value_container">
                        <p class="">{{item.value}}</p>
                      </div>
                    </template>
                  </dom-repeat>
                </div>
              </div>
              <div class="rangepicker-values-outer-wrapper outer-wrapper-2 mini">
                <div data-target="m" class="rangepicker-container picker-container-2">
                  <dom-repeat items="{{mini_min_values}}">
                    <template id="min_value_template" is="dom-bind">
                      <div class="value_container">
                        <p class="">{{item.value}}</p>
                      </div>
                    </template>
                  </dom-repeat>
                </div>
              </div>
              <div class="rangepicker-values-outer-wrapper outer-wrapper-3 full">
                <div data-target="s" class="rangepicker-container picker-container-3">
                  <dom-repeat items="{{min_sec_values}}">
                    <template id="sec_value_template" is="dom-bind">
                      <div class="value_container">
                        <p class="">{{item.value}}</p>
                      </div>
                    </template>
                  </dom-repeat>
                </div>
              </div>
              <div class="rangepicker-values-outer-wrapper outer-wrapper-4">
                <div data-target="ap" class="rangepicker-container picker-container-4">
                  <dom-repeat items="{{amPm_values}}">
                    <template id="ap_value_template" is="dom-bind">
                      <div class="value_container">
                        <p class="">{{item.value}}</p>
                      </div>
                    </template>
                  </dom-repeat>
                </div>
              </div>
              <div class="selection-marker"></div>
            </div>
          </sh-drawer>
        </template>
        `;
  }

  static get template() {
    return html `
        <!--CSS-->
        <style include="shared-styles">
            :host{
              outline: 0;
              width: 100%;
              height: auto;
              position: relative;
              display: flex;
              flex-direction: column;
            }
            /*--Idle state styles--*/
            .timepicker-wrapper{
              width: 100%;
              height: 40px;
              background-color: rgba(var(--ui-1),var(--opacity-7));
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              flex-direction: column;
              border-radius: 2px 2px 0px 0px;
              position: relative;
            }
            .timepicker-input{
              display: -webkit-box;
              display: flex;
              flex-direction: row;
              position: relative;
            }
            .timepicker-panel{
              display:none;
            }
            :host([active]) .timepicker-panel {
              top: 40px;
              background: rgba(var(--ui-8), var(--opacity-1));
              min-height: 100px;
              position: absolute;
              width: 100%;
              box-sizing: border-box;
              box-shadow: 1px 2px 1px var(--shadow-strong), -1px -1px 1px var(--shadow-light);
              z-index: 6;
              padding: 16px 0;
              display: flex;
              flex-direction: row;
              justify-content: center;
              border-radius: 2px;
            }
            .timepicker-controls-wrapper{
              flex-direction: row;
              display: flex;
              align-items: center;
            }
            .timepicker-controls-wrapper .seperator{
              width: 24px;
            }
            .timepicker-controls{
              text-align: center;
            }
            .control-value{
              margin: 16px 0;
            }
            :host([error]) .timepicker-wrapper {
              border-color: rgb(var(--functional-red)) !important;
            }
            :host([safety]) .timepicker-wrapper {
              border-color: rgb(var(--functional-yellow)) !important;
            }
            :host([success]) .timepicker-wrapper {
              border-color: rgb(var(--functional-green)) !important;
            }
            .label-area {
              width: 57.142857142857142857142857142857%;
              margin:  8px 0 0 8px;
              transition: 0.2s all ease-in-out;
              flex: 1 1 auto;
              height: 32px;
              display: flex;
              flex-direction: column;
              position: relative;
            }
            .label{
              white-space: nowrap;
              overflow: hidden;
              -o-text-overflow: ellipsis;
              text-overflow: ellipsis;
              max-width: calc(100% - 10px);
            }
            .label-slot{
              color: var(--text-secondary);
              font: var(--body-1);
              line-height: 24px;
              -webkit-transition: 0.2s all ease-in-out , 0s line-height ease-in-out, 0s height ease-in-out;
              -o-transition   :0.2s all ease-in-out , 0s line-height ease-in-out, 0s height ease-in-out;
              transition: 0.2s all ease-in-out , 0s line-height ease-in-out, 0s height ease-in-out,0s width ease-in-out;
              transform-origin: left;
              transform: scale(1);
              position: absolute;
              width: 100%;
              display: flex;
            }
            .left-button {
              height: 24px;
              width: 24px;
              margin: 8px 0 0 0 ;
              overflow: hidden;
            }
            .right-button {
              height: 24px;
              width: 24px;
              margin: 8px 0 0 8px;
              overflow: hidden;
            }
            #leftButtonIcon, #rightButtonIcon {
              color: rgba(var(--ui-1),var(--opacity-4));
              position: relative;
              right: 4px;
              bottom: 4px;
            }
            .close-button{
              opacity: 0;
              height: 24px;
              width: 24px;
              margin: 8px 0px 8px 8px;
              transition: .2s opacity ease-in-out;
              pointer-events: none;
            }
            :host([error]:not([h=""])) .close-button,
            :host([error]:not([m=""])) .close-button,
            :host([error]:not([s=""])) .close-button,
            :host(:hover:not([h=""])) .close-button,
            :host(:hover:not([m=""])) .close-button,
            :host(:hover:not([s=""])) .close-button {
              opacity: 1;
              pointer-events: all;
            }
            .schedule-button{
              margin: 8px;
              cursor: pointer;
            }
            #closeIcon {
              position: relative;
            }
            /*--Hover styles--*/
            #closeIcon.hover {
              cursor: pointer;
            }
            #leftButtonIcon.hover, #rightButtonIcon.hover {
              cursor: pointer;
              color: rgba(var(--ui-1),var(--opacity-3))
            }
            .label-slot.hover{
              color: var(--text-secondary);
              font: var(--body-1);
              width: 100%;
              height: 100%;
              line-height: 24px;
            }
            :host([element-focused~="active"]:not([element-focused~="blur"])) .timepicker-wrapper {
              border-color: rgba(var(--ui-1), var(--opacity-3));
            }
            .timepicker-wrapper.hover{
              background: rgba(var(--ui-1), var(--opacity-6)) !important;
            }
            .timepicker-wrapper{
              transition: .2s all ease-in-out;
              border-bottom: 1px solid transparent;
              border-color: rgba(var(--ui-1), var(--opacity-5));
            }
            :host([element-focused="active"]) .timepicker-wrapper.hover, :host([element-focused="active"]) .timepicker-wrapper{
              background-color: rgba(var(--ui-1),var(--opacity-7)) !important;
            }
            :host([element-focused~="active"]) .timepicker-wrapper{
              background: rgba(var(--ui-1), var(--opacity-7));
            }
            /*--Focus Styles--*/
            .input-slot {
              opacity: 0;
              position: relative;
              z-index: 2;
              line-height: 16px;
              height: 16px;
              display: flex;
              flex-direction: row;
              background: transparent;
              font: var(--body-1);
              color:var(--text-primary);
            }
            .input-slot input::placeholder{
              color:var(--text-disabled);
            }
            .input-slot input{
              height: 16px;
              width: 16px;
            }
            :host([element-focused ~="active"]) .input-slot{
              opacity:1;
              margin-top: 16px;
            }
            :host([element-focused ~="active"]) .label-area{
              height: 32px;
              width: 57.142857142857142857142857142857%;
              margin: 4px 0 0 8px;
            }
            :host([element-focused ~="active"]) .label-slot {
              font: var(--body-2);
              line-height: normal;
            }
            :host([element-focused ~="blur"]) .label-slot {
              color: var(--text-secondary)
            }
            #h,#m,#s, #h-label, #m-label, #s-label {
              width: 16px;
              background: transparent;
              outline: none;
              border: none;
              font: var(--body-1);
              color: var(--text-primary);
              -webkit-user-select: text;
              -moz-user-select: text;
              -ms-user-select: text;
              -webkit-transition: all 0.01s ease-in-out;
              -o-transition: all 0.01s ease-in-out;
              transition: all 0.01s ease-in-out;
              overscroll-behavior: contain;
            }
            :host([responsive]) .input-slot input{
              pointer-events:none;
            }
            #amOrPm, #ap-label {
              width: 20px;
              background: transparent;
              outline: none;
              border: none;
              font: var(--body-1);
              color: var(--text-primary);
              -webkit-user-select: text;
              -moz-user-select: text;
              -ms-user-select: text;
              -webkit-transition: all 0.3s ease-in-out;
              -o-transition: all 0.3s ease-in-out;
              transition: all 0.3s ease-in-out;
              overscroll-behavior: contain;
            }
            :host([m=""]) #m-label{
              width: 24px;
            }
            :host(:not([m=""])) #m-label{
              width: 16px;
            }
            .seperator{
              width: 8px;
              height: 16px;
              line-height: 16px;
              text-align: center;
              color: var(--text-disabled);
            }
            .highlight{
              background: rgba(var(--ui-2),var(--opacity-1)) !important;
              color:var(--text-white);
              font:var(--body-1);
            }
            .timepicker-scroll-container{
              max-height: 100px;
              overflow:hidden;
            }
            @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
              .input-slot {
                position: relative;
                top: -15px;
                left: -1px;
              }
              *{
                -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
                -moz-box-sizing: border-box; /* Firefox, other Gecko */
                box-sizing: border-box;
              }
              #h,#m,#s,#amOrPm, #h-label, #m-label, #s-label {
                padding: 0;
              }
              #amOrPm, #ap-label {
                width: 22px;
              }
              :host([element-focused ~="active"]) .input-slot{
                opacity: 1;
                margin-top: 30px;
              }
          }
            .rangepicker {
              display: flex;
              flex-direction: row;
              position: relative;
              justify-content: center;
              max-height: 200px;
              min-height: 200px;
              height: 200px;
              margin: 0;
            }
            .rangepicker .rangepicker-values-outer-wrapper{
              overflow: hidden;
            }
            .rangepicker-container{
              transition: all 1s cubic-bezier(0,-0.18,0,.91);
              transform: translateY(0px);
              }
            .rangepicker .value_container{
              margin: 8px 16px;
              min-height: 32px;
              max-height: 32px;
            }

            .rangepicker .value_container p{
              width: 20px;
              min-width: 20px;
              margin: 0;
              color: rgba(var(--ui-1));
              opacity: var(--opacity-3);
              word-wrap: normal;
            }
            .rangepicker .value_container.selected p{
              opacity: var(--opacity-2);
            }
            .rangepicker .selection-marker{
              position: absolute;
              height: 32px;
              border-top: solid 1px rgba(var(--ui-1));
              border-bottom: solid 1px rgba(var(--ui-1));
              left: 0;
              right: 0;
              top: 82px;
              opacity: var(--opacity-6);
            }
            #mandatoryStarSymbol {
              color: rgba(var(--ui-2),var(--opacity-1));
            }
            .seperator.colon-active{
              color: var(--text-primary)
            }
            :host([disabled]) .timepicker-wrapper{
              background-color: rgba(var(--ui-1),var(--opacity-7));
              pointer-events: none;
            }
            :host([disabled]) input{
              pointer-events: none;
              color: var(--text-disabled)
            }
            :host([disabled]) .label-slot, :host([disabled]) .close-button{
              pointer-events: none;
            }
            :host([disabled]) .close-button{
              display: none;
            }
            :host([disabled]) *{
              color: var(--text-disabled) !important;
              pointer-events: none;
            }

            /*Condensed Styles*/

            :host([condensed][element-focused ~="active"]) .label-slot {
              display: none;
            }
            :host([condensed]) .timepicker-wrapper {
              height: 32px;
            }
            :host([condensed]) .label-area {
              margin: 4px 0 4px 8px;
              height: auto;
            }
            :host([condensed]) .timepicker-input {
              height: 100%;
            }
            :host([condensed]) .input-slot {
              margin: 0px;
              height: 100%;
            }
            :host([condensed]) .input-slot input{
              height: 16px;
              width: 16px;
              margin-top: 4px;
            }
            :host([condensed]) .seperator {
              margin-top: 3px;
            }
            :host([condensed]) .close-button, :host([condensed]) .schedule-button  {
              margin-top: 4px;
              margin-bottom: 4px;
            }
            :host([condensed]) .schedule-button sh-icon {
              margin-top: 1px;
            }
            /* helper text */
            .helper-text {
              padding: 0 8px;
              box-sizing: border-box;
              line-height: 24px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            :host([error-message]) .hint {
              display: none;
            }
            :host([disabled]) .helper-text {
              color: var(--text-disabled);
            }
            :host(:not([error])) .error-icon,
            :host(:not([success])) .success-icon {
              display: none;
            }
            .icon-wrapper {
              margin: 8px 0px 8px 8px;
            }
            :host([condensed]) .icon-wrapper {
              margin: 4px 0px 4px 8px;
            }
            :host([no-border]) .timepicker-wrapper {
              border-bottom: none;
            }
          </style>

        <!--HTML MARKUP-->
        <div class="timepicker-wrapper" on-click="activateTimePickerPanel" on-mouseover="addHoverClass" on-mouseout="removeHoverClass" id="timepickerWrapper">
          <div class="timepicker-input">
            <div class="label-area">
              <div class="label-slot"><div class="label">{{label}}</div><span id="mandatoryStarSymbol">*</span></div>
                <div class="input-slot">
                  <input type="text" placeholder="hh" data-id="h-ip" id="h-label" min="1" max="12"
                         on-keyup="validateNumber" maxlength="2" value="{{h}}" on-keydown="incrementOrDecrement"
                         size="2" on-change="updatePropertyValues" disabled="{{disabled}}" on-blur="appendZeroAndUpdateArray">
                  <div class="seperator">:</div>
                  <input type="text" placeholder="mm" data-id="m-ip" id="m-label" min="0" max="59"
                         on-keyup="validateNumber" maxlength="2" value="{{m}}" on-keydown="incrementOrDecrement"
                         size="2" on-change="updatePropertyValues" disabled="{{disabled}}" on-blur="appendZeroAndUpdateArray">
                  <div class="seperator full">:</div>
                  <input type="text" placeholder="ss"  data-id="s-ip" class="full" id="s-label" min="0" max="59"
                         on-keyup="validateNumber" maxlength="2" value="{{s}}" on-keydown="incrementOrDecrement"
                         size="2" on-change="updatePropertyValues" disabled="{{disabled}}" on-blur="appendZeroAndUpdateArray">
                  <div class="seperator"></div>
                  <input type="text" data-id="ap-ip" id="ap-label" placeholder="AM" value="{{amPm}}" size="2" maxlength="2"
                         on-keydown="incrementOrDecrement" on-change="updatePropertyValues" on-keyup="validateAMOrPM"
                         disabled="{{disabled}}" on-blur="appendZeroAndUpdateArray">
                </div>
              </div>
            <div class="close-button" on-click="clickActions" id="closeBtn">
              <sh-icon button tabindex="0" on-mouseover="addHoverClass" size="s" icon="cancel" id="closeIcon" on-mouseout="removeHoverClass"></sh-icon>
            </div>
          <div class="icon-wrapper">
            <sh-icon icon="error" class="error-icon" size="s" color="rgb(var(--functional-red))"></sh-icon>
            <sh-icon icon="success" class="success-icon" size="s" color="rgb(var(--functional-green))"></sh-icon>
          </div>
            <div class="schedule-button">
              <sh-icon button tabindex="0"  size="s" icon="scheduled" id="scheduledIcon" on-click="toggleTimeSelection"></sh-icon>
            </div>
          </div>
          ${this.timepickerTemplate}
          ${this.timepickerMobileTemplate}
        </div>
        <sh-text size="body-2" class="helper-text hint" color="secondary">[[hint]]</sh-text>
        <sh-text size="body-2" class="helper-text error-message" color="secondary">[[errorMessage]]</sh-text>
`;
  }

  static get is() {
    return 'sh-timepicker';
  }
  static get properties() {
    return {
      active: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      elementFocused: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true
      },
      mini: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      step: {
        type: String,
        value: '1',
        reflectToAttribute: true,
        notify: true
      },
      responsive: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      label: {
        type: String,
        value: 'Time',
        reflectToAttribute: true,
        notify: true
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: 'disableAllClicks'
      },
      timerMode: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      h: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true,
        observer: 'updateHoursInValue'
      },
      m: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true,
        observer: 'updateMinutesInValue'
      },
      s: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true,
        observer: 'updateSecondsInValue'
      },
      arr: {
        type: String
      },
      scrollDirection: {
        type: String,
        value: '',
        notify: true
      },
      amPm: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true,
        observer: 'updateAmPmInValue'
      },
      val: {
        value() {
          return `${this.h}:${this.m}:${this.s} ${this.amPm}`;
        },
        notify: true,
        reflectToAttribute: true
      },
      error: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: 'giveRedBorder'
      },
      errorMessage: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      hint: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      safety: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: 'giveYellowBorder'
      },
      noBorder: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      mandatory: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true,
        observer: 'appendStarToLabel'
      },
      open: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      close: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      hour_values: {
        value() {
          let hr_arr;
          hr_arr = [];
          for (let i = 0; i < 12; i++) {
            let k;
            if(i < 10) {
              k = `0${i}`;
            }
            else {
              k =  `${i}`;
            }
            hr_arr.push({
              value: k
            });
          }
          return hr_arr;
        }
      },
      min_sec_values: {
        value() {
          let arr;
          arr = [];
          for (let i = 0; i < 60; i++) {
            let k;
            if(i < 10) {
              k = `0${i}`;
            }
            else {
              k =  `${i}`;
            }
            arr.push({
              value: k
            });
          }
          return arr;
        }
      },
      mini_min_values: {
        value() {
          let arr;
          arr = [];
          for (let i = 0; i < 60; i += 5) {
            let val;
            if(i < 10) {
              val = `0${i}`;
            }
            else {
              val =  `${i}`;
            }
            arr.push({
              value: val
            });
          }
          return arr;
        }
      },
      amPm_values: {
        value() {
          return [{
            value: 'AM'
          }, {
            value: 'PM'
          }];
        }
      },
      condensed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      }
    };
  }
  appendZeroAndUpdateArray(e) {
    let self;
    self = this;
    let element;
    element = e.target;
    let elementId;
    elementId = e.target.id;
    let elementValue;
    elementValue = Number(e.target.value);
    if (element.value !== '') {
      if (elementValue > 0 && elementValue < 10) {
        element.value = '0' + elementValue;
      }
      else if (elementValue === 0) {
        element.value = '';
        element.value = '0' + elementValue;
      }
      else {
        element.value = element.value;
      }
      switch (elementId) {
        case 'h-label':
          self.h = element.value;
          break;
        case 'm-label':
          self.m = element.value;
          break;
        case 's-label':
          self.s = element.value;
          break;
        default:
          self.amPm = element.value;
      }
    }
  }
  updatePropertyValues() {
    this.h = this.shadowRoot.querySelector('#h-label').value;
    this.m = this.shadowRoot.querySelector('#m-label').value;
    this.s = this.shadowRoot.querySelector('#s-label').value;
    if(this.shadowRoot.querySelector('#ap-label').value.toUpperCase() === 'PM' ||
      this.shadowRoot.querySelector('#ap-label').value.toUpperCase() === 'AM') {
        this.amPm = this.shadowRoot.querySelector('#ap-label').value.toUpperCase();
    }
    else {
      this.amPm = '';
    }
  }
  giveRedBorder(errorIsTrue) {
    if (errorIsTrue) {
      this.shadowRoot.querySelector('.timepicker-wrapper').classList.add('error');
    }
    else {
      this.shadowRoot.querySelector('.timepicker-wrapper').classList.remove('error');
      this.removeAttribute('error-message');
    }
  }
  giveYellowBorder(safetyIsTrue) {
    if (safetyIsTrue) {
      this.shadowRoot.querySelector('.timepicker-wrapper').classList.add('safety');
    }
    else {
      this.shadowRoot.querySelector('.timepicker-wrapper').classList.remove('safety');
    }
  }
  appendStarToLabel(mandatoryIsTrue) {
    if (mandatoryIsTrue) {
      this.$.mandatoryStarSymbol.style.visibility = 'visible';
    }
    else {
      this.$.mandatoryStarSymbol.style.visibility = 'hidden';
    }
  }

  disableAllClicks(isTrue) {
    let self;
    self = this;
    let scheduleIcon;
    scheduleIcon = self.shadowRoot.querySelector('#scheduledIcon');
    if (isTrue) {
      self.tabIndex = -1;
      scheduleIcon.tabIndex = -1;
    }
    else {
      self.tabIndex = 0;
      scheduleIcon.tabIndex = 0;
    }
  }

  updateHoursInValue() {
    let self;
    self = this;
    let seperators;
    seperators = self.shadowRoot.querySelectorAll('.seperator');
    self.val = self.h + ':' + self.m + ':' + self.s + ':' + self.amPm;
    if (self.h === '' && self.m === '' && self.s === '' && self.amPm === '') {
      seperators.forEach(function (element) {
        element.classList.remove('colon-active');
      });
    }
    else {
      seperators.forEach(function (element) {
        element.classList.add('colon-active');
      });
    }
  }
  updateMinutesInValue() {
    let self;
    self = this;
    let seperators;
    seperators = self.shadowRoot.querySelectorAll('.seperator');
    self.val = self.h + ':' + self.m + ':' + self.s + ':' + self.amPm;
    if (self.h === '' && self.m === '' && self.s === '' && self.amPm === '') {
      seperators.forEach(function (element) {
        element.classList.remove('colon-active');
      });
    }
    else {
      seperators.forEach(function (element) {
        element.classList.add('colon-active');
      });
    }
  }
  updateSecondsInValue() {
    let self;
    self = this;
    let seperators;
    seperators = self.shadowRoot.querySelectorAll('.seperator');
    self.val = self.h + ':' + self.m + ':' + self.s + ':' + self.amPm;
    if (self.h === '' && self.m === '' && self.s === '' && self.amPm === '') {
      seperators.forEach(function (element) {
        element.classList.remove('colon-active');
      });
    }
    else {
      seperators.forEach(function (element) {
        element.classList.add('colon-active');
      });
    }
  }
  updateAmPmInValue() {
    let self;
    self = this;
    let seperators;
    seperators = self.shadowRoot.querySelectorAll('.seperator');
    self.val = self.h + ':' + self.m + ':' + self.s + ':' + self.amPm;
    if (self.h === '' && self.m === '' && self.s === '' && self.amPm === '') {
      seperators.forEach(function (element) {
        element.classList.remove('colon-active');
      });
    } else {
      seperators.forEach(function (element) {
        element.classList.add('colon-active');
      });
    }
  }


  updateArray() {
    let h;
    h = this.shadowRoot.querySelector('#h') || this.shadowRoot.querySelector('#h-label');
    let m;
    m = this.shadowRoot.querySelector('#m') || this.shadowRoot.querySelector('#m-label');
    let s;
    s = this.shadowRoot.querySelector('#s') || this.shadowRoot.querySelector('#s-label');
    let amPm;
    amPm = this.shadowRoot.querySelector('#amOrPm') || this.shadowRoot.querySelector('#ap-label');
    if (h.value === '') {
      h.value = '00';
    }
    if (m.value === '') {
      m.value = '00';
    }
    if (s.value === '') {
      s.value = '00';
    }
    if (amPm.value === '') {
      amPm.value = 'AM';
    }
    let valH;
    valH = Number(h.value);
    let valM;
    valM = Number(m.value);
    let valS;
    valS = Number(s.value);
    if (valH === 0 || valH <= 9) {
      h.value = '0' + (valH.toString());
    }
    if (valM === 0 || valM <= 9) {
      m.value = '0' + (valM.toString());
    }
    if (valS === 0 || valS <= 9) {
      s.value = '0' + (valS.toString());
    }

    this.h = h.value;
    this.m = m.value;
    this.s = s.value;
    this.amPm = amPm.value;
  }
  ready() {
    super.ready();

    this.setAttribute('tabindex', 0);
    if (this.h === '' && this.m === '' && this.s === '' && this.amPm === '') {
      //don't open
    } else {
      this.updateArray();
    }
  }


  /* The basic initialisation code */
  connectedCallback() {
    super.connectedCallback();
    /*****
     *
     *  Wheel Function to scroll time here
     *
     *
     *
     */

    if (this.responsive || window.innerWidth <= BREAKPOINT) {
      this.responsive = true;
    }
    else {
      this.responsive = false;
    }

    // mini version is just hr:min:AM/PM
    this.mini = this.mini;



    // Sorry for the below condition here
    // The reason i'm sorry is because this condition here is redundant
    // and is already defined in toggleTimePicker() function
    // And its here because, we need to hide 'second' value input
    // when only hr:min mode is selected (mini=true)
    // And if i don't add condition here, then 'second' input will be displayed until
    // toggleTimePicker() is called. So it will be visible until then.
    // Now the reason why i added condition there is because some elements are rendered
    // on calling toggleTimePicker() and are not accessible in this function,
    // so just writing the condition here has no effect on them since they are rendered later
    // Now you understand my situation. As much i hate to write redundant code, i have to include
    // the condition here until i find better solution.
    // -ZH
    if (this.mini) {
      this.shadowRoot.querySelectorAll('.full').forEach(element => {
        element.style.display = 'none';
      });
    }
    // sorry note end

    this.addEventListener('focus', function (e) {
      if (!this.disabled) {
        if (this.elementFocused !== 'active') {
          this.elementFocused = 'active';
        }
      }
      else {
        e.stopPropagation();
      }
    });


    this.addEventListener('blur', function (e) {
      if (!this.disabled) {
        if(String(this.h).length > 0) {
          this.elementFocused = 'active blur';
        }
        else {
          this.elementFocused =  '';
        }
      }
      else {
        e.stopPropagation();
      }
    });

    if((String(this.h).length > 0)) {
      this.elementFocused = 'active blur';
    }
    else {
      this.elementFocused =  '';
    }

    /**
     * Condensed Styling When Under A Table
     */
    if (this.parentElement.tagName === 'SH-TABLE-CELL') {
      this.condensed = true;
    }

    this.addEventListener('keyup', function (e) {
      let scheduleIcon;
      let keyupComposedPath;
      let enteredOnScheduleIcon;
      scheduleIcon = this.shadowRoot.querySelector('#scheduledIcon');
      keyupComposedPath = e.composedPath();
      for (let i = 0; i < keyupComposedPath.length; i++) {
        if (keyupComposedPath[i] === scheduleIcon) {
          enteredOnScheduleIcon = true;
          break;
        }
        else {
          enteredOnScheduleIcon = false;
        }
      }
      if (e.keyCode === 13 && !enteredOnScheduleIcon) {
        scheduleIcon.click();
      }
    });
  }

  updateWithSystemTime() {
    let self;
    self = this;
    let d;
    d = new Date();
    let hour;
    hour = d.getHours();
    /**
     * Initial display logic
     */
    if (hour > 11 && hour !== 12) {
      hour -= 12;
      self.amPm = 'PM';
    }
    else if (hour === 12) {
      hour = 12;
      self.amPm = 'PM';
    }
    else if (hour === 0) {
      hour = 12;
      self.amPm = 'AM';
    }
    else {
      self.amPm = 'AM';
    }
    /**
     * If number is less than 10, then make it like '0x' , eg: '02' for 2
     */
    if(hour < 10) {
      self.h = '0' + hour;
    }
    else {
      self.h =  hour;
    }
    if(d.getMinutes() < 10) {
      self.m = '0' + d.getMinutes();
    }
    else {
      self.m =  d.getMinutes();
    }
    if(d.getSeconds() < 10) {
      self.s = '0' + d.getSeconds() ;
    }
    else {
      self.s =  d.getSeconds();
    }
  }
  //-- Adding 'hover' class to elements (IE Compatible) (:hover not supported in IE) But this approach of adding class 'hover' is supported in all browsers --
  addHoverClass(e) {
    this.shadowRoot.querySelector('.timepicker-wrapper').classList.add('hover');
    e.target.classList.add('hover');
  }
  //-- Removing 'hover' class from elements --
  removeHoverClass(e) {
    this.shadowRoot.querySelector('.timepicker-wrapper').classList.remove('hover');
    e.target.classList.remove('hover');
  }
  //--On keyup--
  validateNumber(event) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
      //---- If the inputted value > maximum-value for that particular field, then make that field's value as 0 (Internal validation). ----
      if (parseInt(event.target.value, 10) > Number(event.target.max)) {
        // (It is '0' and not 0 since this is a text input)
        event.target.value = '00';
      }

      if (event.target.value.length === parseInt(event.target.maxLength, 10)) {
        event.target.nextElementSibling.nextElementSibling.focus();
      }
    }
    else {
      if(event.target.value.match(/\D/i) !== null) {
        event.target.value = '00';
      }
      else {
        event.target.value =  event.target.value;
      }
    }
  }

  // this function takes input from swipe scroller on mobile and attaches them to proper variables
  applyValues(value, elem) {
    let self;
    self = this;
    switch (elem) {
      case 'h':
        self.h = value;
        break;
      case 'm':
        self.m = value;
        break;
      case 's':
        self.s = value;
        break;
      case 'ap':
        self.amPm = value;
        break;
      default:
        break;
    }
  }

  addSwipeScroll() {
    let self;
    self = this;
    let SCROLL_LIM;
    SCROLL_LIM = this.shadowRoot.querySelector('.rangepicker').clientHeight;
    // touch events registration
    if (this.responsive) {
      self.pickers = this.shadowRoot.querySelector('.rangepicker').children;
      self.pickers = Array.from(self.pickers);
      // don't need marker
      self.pickers = self.pickers.filter(item => {
        if (item.className && item.className.match(`rangepicker-values-outer-wrapper`) !== null) {
          return item;
        }
      });

      self.pickers = self.pickers.map(function (item) {
        let props;
        props = {};
        props.TOTAL_ELEMENTS = item.children[0].children.length - 1;
        props.LIST_HEIGHT = item.children[0].clientHeight;
        props.LIST_ITEM_HEIGHT = 40;
        props.initY = null;
        props.timer = null;
        props.swipe_dir = '';
        props.rate = null;
        props.selectionValue = 0;

        return {
          props,
          touchTarget: item,
          element: item.children[0],
          targetElem: item.children[0].dataset.target
        };
      });

      self.pickers.forEach(function (picker) {
        picker.touchTarget.addEventListener('touchstart', e => {
          e.preventDefault();
          picker.props.initY = lock(e);
          if (picker.timer) {
            clearTimeout(picker.timer);
            picker.timer = null;
          }
        }, false);

        picker.touchTarget.addEventListener('touchmove', e => {
          e.preventDefault();
          let alpha;
          let currY;
          currY = unifyTouches(e).clientY;
          let dy;
          dy = currY - picker.props.initY;

          if (Math.abs(dy) >= SCROLL_LIM) {
            dy = Math.sign(dy) * SCROLL_LIM;
          }

          // calculate alpha & rate
          alpha = Math.abs(dy) / SCROLL_LIM;
          // max elements that can be moved from a scroll
          picker.props.rate = Math.floor(alpha * 7);
          // get swipe direction
          picker.props.swipe_dir = Math.sign(dy);

          if (!picker.props.timer) {
            if (picker.props.swipe_dir < 0) {
              // change to requestAnimationFrame for optimized animation
              picker.props.timer = setTimeout(() => {
                swipe(picker, 'up', picker.props.rate);
                clearTimeout(picker.props.timer);
                picker.props.timer = null;
              }, 300);
            }
            else {
              picker.props.timer = setTimeout(() => {
                swipe(picker, 'down', picker.props.rate);
                clearTimeout(picker.props.timer);
                picker.props.timer = null;
              }, 300);
            }
          }
        }, false);

        picker.touchTarget.addEventListener('touchend', e => {
          e.preventDefault();
          let finalValue;
          if (unifyTouches(e).clientY === picker.props.initY) {
            let touchTargetElement;
            let childrenElementsOfPicker;
            childrenElementsOfPicker = Array.from(picker.element.children);
            if(e.target.children.length > 0) {
              touchTargetElement = e.target;
            }
            else {
              touchTargetElement =  e.target.parentElement;
            }
            let indexOfCurrentTarget = childrenElementsOfPicker.indexOf(touchTargetElement);
            if (indexOfCurrentTarget === -1) {
              return;
            }
            indexOfCurrentTarget -= picker.props.selectionValue;
            if (Math.sign(indexOfCurrentTarget) < 0) {
              swipe(picker, 'down', Math.abs(indexOfCurrentTarget));
            }
            else {
              swipe(picker, 'up', Math.abs(indexOfCurrentTarget));
            }
          }
          else {
            //clear timeout
            clearTimeout(picker.props.timer);
            picker.props.timer = null;
            if (picker.props.swipe_dir < 0) {
              swipe(picker, 'up', picker.props.rate);
            }
            else {
              swipe(picker, 'down', picker.props.rate);
            }
            picker.props.initY = null;
          }

          picker.element.children[picker.props.selectionValue].className = picker.element.children[picker.props.selectionValue].className.concat(' selected');
          finalValue = picker.element.children[picker.props.selectionValue].children[0].innerHTML;
          self.applyValues(finalValue, picker.targetElem);
        }, false);
      });
    }
  }

  activateTimePickerPanel(e) {
    if (this.responsive) {
      this.toggleTimeSelection(e);
    }
  }

  // Toggle Time selection panel here
  toggleTimeSelection(e) {
    e.stopPropagation();
    if (!this.active) {
      // if this is mini version, hide redundant fields
      if (this.mini) {
        this.shadowRoot.querySelectorAll('.full').forEach(element => {
          element.parentNode.removeChild(element);
        });
      }
      else {
        this.shadowRoot.querySelectorAll('.mini').forEach(element => {
          element.style.display = 'none';
        });
      }

      // We do this, because removing event listener needs a same signature(ID) function so assigning
      // _closeTimePicker to disableEvent creates a signature(ID) which we then use in
      // removeEventListener to remove event listener
      // .bind(this) gives eventlistener a context(in this case, timepicker component) within which variables should
      // be accessed
      this.disableEvent = this._closeTimePicker.bind(this);
      document.body.addEventListener('click', this.disableEvent);
    }
    else {
      document.body.removeEventListener('click', this.disableEvent);
    }
    this.active = !this.active;
    if (this.responsive) {
      if (!this.swipeEventsAdded) {
        this.addSwipeScroll();
        this.swipeEventsAdded = true;
        this.shadowRoot.querySelector('.rangepicker').focus();
      }
      if (this.h.length < 1 || this.m.length < 1 || this.s.length < 1 || this.amPm.length < 1) {
        // reset all values to zero
        this.pickers.forEach(picker => {
          swipe(picker, 'down', picker.props.TOTAL_ELEMENTS);
          picker.element.children[picker.props.selectionValue].className = picker.element.children[picker.props.selectionValue].className.concat(' selected');
          let finalValue;
          finalValue = picker.element.children[picker.props.selectionValue].children[0].innerHTML;
          this.applyValues(finalValue, picker.targetElem);
        });
      }
      this.shadowRoot.querySelector('#drawer-bottom-time').visible = this.active;
    }

    let amOrPmInDropDown;
    let eventSet;
    let scheduleIcon;
    /**
     * The below code is to prevent the schedule icon getting
     * clicked twice when the enter key is pressed
     */
    amOrPmInDropDown = this.shadowRoot.querySelector('#amOrPm');
    eventSet = false;
    scheduleIcon = this.shadowRoot.querySelector('#scheduledIcon');
    if (!eventSet) {
      amOrPmInDropDown.addEventListener('keydown', function (e) {
        eventSet = true;
        if (e.keyCode === 9 && !e.shiftKey) {
          scheduleIcon.click();
          this.blur();
        }
      });
    }
  }

  //--On keydown--
  incrementOrDecrement(e) {
    let self;
    self = this;
    let eventSrc;
    if(e.path) {
      eventSrc = e.path[0] ;
    }
    else {
      eventSrc =  e.srcElement;
    }
    if (e.key === 'ArrowUp' || e.key === 'Up') {
      e.preventDefault();
      self.incrementTime(eventSrc);
    }
    if ((e.key === 'ArrowDown' || e.key === 'Down')) {
      e.preventDefault();
      self.decrementTime(eventSrc);
    }
  }

  validateAMOrPM(e) {
    let self;
    self = this;
    let SpecialCharacterIsPressed;
    SpecialCharacterIsPressed = ( e.key === ' ' ||
                                  e.key === 'Backspace' ||
                                  e.key === 'Tab' ||
                                  e.key === 'Up' ||
                                  e.key === 'ArrowUp' ||
                                  e.key === 'ArrowDown' ||
                                  e.key === 'Down');
    let valueOfAmPmInput;
    valueOfAmPmInput = e.target.value.toLowerCase();
    let newValue;
    if (!SpecialCharacterIsPressed && valueOfAmPmInput.length === '2') {
      if (valueOfAmPmInput !== 'am' && valueOfAmPmInput !== 'pm') {
        newValue = 'AM';
      }
      else if (valueOfAmPmInput === 'pm' || valueOfAmPmInput === 'am') {
        newValue = valueOfAmPmInput.toUpperCase();
      }
      else {
        // do nothing. Adding for sonar lint
      }
      e.target.value = newValue;
      self.amPm = e.target.value;
    }
  }

  clickActions(e) {
    e.stopPropagation();

    if (e.currentTarget === this.shadowRoot.querySelector('.close-button')) {
      this.h = '';
      this.m = '';
      this.s = '';
      this.amPm = '';
    }
  }

  incrementTime(e) {
    let self;
    self = this;
    //user might prefer to select am / pm by up/down arrows. So the condition of am/pm was excluded here
    self.previousHourValue = Number(self.h);
    if (self.h === '' || self.m === '' || self.s === '') {
      self.updateWithSystemTime();
      return;
    }
    switch (e.dataset.id) {
      case 's':
      case 's-ip':
        self.s = parseInt(self.s, 10) + (parseInt(self.step, 10) - parseInt(self.s, 10) % parseInt(self.step, 10));
        let totS = self.s;
        totS = totS / 60;
        self.m = parseInt(self.m, 10) + parseInt(totS, 10);
        self.s = Math.floor((totS - parseInt(totS, 10)) * 60);
        if(self.s < 10) {
          self.s = '0' + self.s;
        }
        else {
          self.s =  self.s;
        }
      case 'm':
      case 'm-ip':
        if (e.dataset.id === 'm' || e.dataset.id === 'm-ip') {
          self.m = parseInt(self.m, 10) + (parseInt(self.step, 10) - parseInt(self.m, 10) % parseInt(self.step, 10));
        }
        let totM = self.m;
        totM = totM / 60;
        self.h = parseInt(self.h, 10) + parseInt(totM, 10);
        self.m = Math.floor((totM - parseInt(totM, 10)) * 60);
        if(self.m < 10) {
          self.m = '0' + self.m;
        }
        else {
          self.m =  self.m;
        }
      case 'h':
      case 'h-ip':
        if (e.dataset.id === 'h' || e.dataset.id === 'h-ip') {
          self.h = parseInt(self.h, 10) + 1;
        }
        if (self.h === 12 && self.previousHourValue === 11) {
          if(self.amPm === 'PM') {
            self.amPm = 'AM';
          }
          else {
            self.amPm =  'PM';
          }
        }
        if (self.h === 13 && self.previousHourValue === 12) {
          self.h = 1;
        }
        if(self.h < 10) {
          self.h = '0' + self.h;
        }
        else {
          self.h =  self.h;
        }
      default:
        //incrementAMPM
        if (e.dataset.id === 'ap' || e.dataset.id === 'ap-ip') {
          if(self.amPm === 'PM') {
            self.amPm = 'AM';
          }
          else {
            self.amPm =  'PM';
          }
        }
        break;
    }
  }

  decrementTime(e) {
    let self;
    self = this;
    self.previousHourValue = Number(self.h);
    if (self.h === '' || self.m === '' || self.s === '' || self.amPm === '') {
      self.updateWithSystemTime();
      return;
    }
    switch (e.dataset.id) {
      case 's':
      case 's-ip':
        let subVal;
        if(self.s % parseInt(self.step, 10) === 0) {
          subVal = parseInt(self.step, 10);
        }
        else {
          subVal =  self.s % parseInt(self.step, 10);
        }
        self.s = parseInt(self.s, 10) - subVal;
        if (self.s < 0) {
          self.m = parseInt(self.m, 10) - parseInt(self.step, 10);
          self.s = 60 - parseInt(self.step, 10);
        }
        if(self.s < 10) {
          self.s = '0' + self.s ;
        }
        else {
          self.s =  self.s;
        }

      case 'm':
      case 'm-ip':
        self.m = parseInt(self.m, 10);
        if (e.dataset.id === 'm' || e.dataset.id === 'm-ip') {
          let subVal;
          if(self.m % parseInt(self.step, 10) === 0) {
            subVal = parseInt(self.step, 10);
          }
          else {
            subVal =  self.m % parseInt(self.step, 10);
          }
          self.m = parseInt(self.m, 10) - subVal;
        }
        if (self.m < 0) {
          self.h = parseInt(self.h, 10) - 1;
          self.m = 60 - parseInt(self.step, 10);
        }
        if(self.m < 10) {
          self.m = '0' + self.m;
        }
        else {
          self.m =  self.m;
        }
      case 'h':
      case 'h-ip':
        self.h = parseInt(self.h, 10);
        if (e.dataset.id === 'h' || e.dataset.id === 'h-ip') {
          self.h = parseInt(self.h, 10) - 1;
        }
        if (self.h === 11 && self.previousHourValue === 12) {
          if(self.amPm === 'PM') {
            self.amPm = 'AM';
          }
          else {
            self.amPm =  'PM';
          }
        }
        if (self.h === 0 && self.previousHourValue === 1) {
          self.h = 12;
        }
        if(self.h < 10) {
          self.h = '0' + self.h;
        }
        else {
          self.h =  self.h;
        }
        break;
      default:
        //incrementAMPM
        if(self.amPm === 'PM') {
          self.amPm = 'AM';
        }
        else {
          self.amPm =  'PM';
        }
        break;
    }
  }

  incrementWithButton(e) {
    e.stopPropagation();
    this.incrementTime(e.target);
  }
  decrementWithButton(e) {
    e.stopPropagation();
    this.decrementTime(e.target);
  }

  //close time selector when user clicks outside
  _closeTimePicker(e) {
    let self;
    self = this;
    e.stopPropagation();
    self.active = e.target === self;
    if (!self.active) {
      document.body.removeEventListener('click', this.disableEvent);
    }
  }
}
window.customElements.define(SHTimepicker.is, SHTimepicker);