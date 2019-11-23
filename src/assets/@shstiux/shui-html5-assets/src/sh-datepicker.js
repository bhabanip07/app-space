/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

// month map
const month_map = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// converts string true/false to boolean
function toBoolean(str) {
  return JSON.parse(str);
}

// Breakpoint defines value (in pixels), below which viewport will be treated as mobile
const BREAKPOINT = 540;

/* Helper functions for range picker */
function getTransformValue(transformString) {
  let res = null;
  res = transformString.match(/\((.*?)\)/i);
  if(res) {
    res = res[0];
  }
  else {
    res = '0';
  }
  res = parseInt(res.replace('(', '').replace(')', ''), 10);
  return res;
}

// combines multipoint touches to one single touch
function unifyTouches(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

// performs list scrolling
let swipe;
swipe = function (swipe_target, direction, rate) {
  // get the current position values
  let transform_value = getTransformValue(swipe_target.element.style.transform);
  transform_value = direction === 'up' ? transform_value - swipe_target.props.LIST_ITEM_HEIGHT * rate : transform_value + swipe_target.props.LIST_ITEM_HEIGHT * rate;
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
  swipe_target.props.selectionValue = parseInt(Math.abs((swipe_target.props.selectionValue - 2 * swipe_target.props.LIST_ITEM_HEIGHT) / swipe_target.props.LIST_ITEM_HEIGHT), 10);

  swipe_target.element.style.transform = `translateY(${transform_value}px)`;
};

// locks the initial touched coordinate
function lock(e) {
  return unifyTouches(e).clientY;
}
class SHDatepicker extends PolymerElement {

  static get dateRangePickerTemplate() {
    return html`
      <div class="scrollpicker">
        <div class="scrollpicker-values-outer-wrapper outer-wrapper-1">
          <div data-target="mon" class="scrollpicker-container picker-container-1">
            <dom-repeat items="{{mon_values}}">
              <template id="mon_value_template" is="dom-bind">
                <div class="value_container">
                  <p class="month">{{item.value}}</p>
                </div>
              </template>
            </dom-repeat>
          </div>
        </div>
        <div class="scrollpicker-values-outer-wrapper outer-wrapper-2">
          <div data-target="day" class="scrollpicker-container picker-container-2">
            <dom-repeat items="{{day_values}}">
              <template id="day_value_template" is="dom-bind">
                <div class="value_container">
                  <p class="day">{{item.value}}</p>
                </div>
              </template>
            </dom-repeat>
          </div>
        </div>
        <div class="scrollpicker-values-outer-wrapper outer-wrapper-3">
          <div data-target="year" class="scrollpicker-container picker-container-3">
            <dom-repeat items="{{year_values}}">
              <template id="year_value_template" is="dom-bind">
                <div class="value_container">
                  <p class="year">{{item.value}}</p>
                </div>
              </template>
            </dom-repeat>
          </div>
        </div>
        <div class="selection-marker"></div>
      </div>
    `;
  }

  static get partialTemplate() {
    return html`
      <div class="date-wrapper">
        <div class="month-list">
          <sh-icon button="" icon="arrow-left" class="icon-left" size="xs" data-year$={{year}} data-counter="-1" on-click="chooseMonth"></sh-icon>
          <sh-icon button="" icon="arrow-right" class="icon-right" size="xs" data-year$={{year}} data-counter="1" on-click="chooseMonth"></sh-icon>
          <template is="dom-repeat" items="{{monthList}}" as="months" index-as="monthno">
            <div class="month-panel">
              <div class="month-header">
                <div style="width:100%; text-align:center;">
                  <div>
                    <div align="center" class="center_heading">
                      <div class="calendar-picker-label" data-year$={{showYear(tempYear,monthno)}} on-focus="_focusContext"
                        on-blur="_blurContext" on-click="chooseYear" style="outline:0" tabindex="0">{{showYear(tempYear,monthno)}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="month-list-panel">
                <div class="dp-table">
                  <template is="dom-repeat" items="{{months}}" as="i">
                    <div class="dp-cell">
                      <div class$="[[computeMonthYearClasses(i.selectedMonth,i.currentMonth)]]" data-year$={{i.year}}
                        data-month$={{i.monthNo}} on-click="selectMonth">{{i.month}}</div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="year-list">
          <sh-icon button="" icon="arrow-left" class="icon-left" size="xs" data-right= "0" data-year$={{decadeYear}} data-counter-year="-10"
            on-click="chooseYear"></sh-icon>
          <sh-icon button="" icon="arrow-right" class="icon-right" size="xs" data-right ="1" data-year$={{decadeYear}} data-counter-year="0"
            on-click="chooseYear"></sh-icon>
          <template is="dom-repeat" items="{{yearList}}" as="years" index-as="yearno">
            <div class="year-panel">
              <div class="year-header">
                <div style="width:100%; text-align:center;">
                  <div>
                    <div align="center" class="center_heading">
                      <div class="calendar-picker-label" on-focus="_focusContext" on-blur="_blurContext" style="outline:0"
                        tabindex="0">{{displayDecade(decadeYear,yearno)}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="year-list-panel">
                <div class="dp-table">
                  <template is="dom-repeat" items="{{years}}" as="i">
                    <div class="dp-cell">
                      <div data-year$={{i.year}} on-click="selectYear" class$="[[computeMonthYearClasses(i.selectedYear,i.currentYear)]]">{{i.year}}</div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>
      
        <div class="multiple-months">
          <sh-icon button icon="arrow-left" size="xs" class="icon-left" data-counter="-1" on-click="navigateMultipleMonth"></sh-icon>
          <sh-icon button icon="arrow-right" size="xs" class="icon-right" data-counter="1" on-click="navigateMultipleMonth"></sh-icon>
          <template is="dom-repeat" items="{{allMonths}}" as="months" index-as="month_no">
            <div class="date-panel-wrapper">
              <div class="calendar-body">
                <div class="calendar-table">
                  <div class="dp-heading">
                    <div class="calendar-month-heading">
                      <div style="width:100%; text-align:center;">
                        <div align="center" class="center_heading">
                          <div class="calendar-picker-label" on-focus="_focusContext" on-blur="_blurContext" data-year$="{{displayYear(monthNumber,month_no,year)}}"
                            on-click="chooseMonth" style="" tabindex="0">{{displayMonth(monthNumber,month_no,year)}} </div>
                        </div>
                      </div>
                    </div>
                    <div class="dp-row">
                      <template is="dom-repeat" items="{{daysArray}}" as="days">
                        <div class="dp-cell">
                          <div class="column-header">
                            <span class="column-header-inner">{{days}}</span>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <template is="dom-repeat" items="{{months}}" as="week">
                    <div class="dp-row">
                      <template is="dom-repeat" items="{{week}}" as="i">
                        <div class="dp-cell">
                          <div class$="[[computeClasses(i.otherMonthDays,i.today,i.selectedDate,i.withinRange,i.disabledays)]]"
                            data-full-date$="{{i.date}}" on-focus="_focusContext" on-blur="_blurContext" style="outline:0"
                            tabindex="0" on-mouseover="setHoverDate" on-mouseleave="clearHoverDate" on-click="displayDate">{{i.dayOfMonth}}</div>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
  `
  }

  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        min-height: fit-content;
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      .arrow-left {
        float: left;
        width:20px;
        padding-left: 5px;
        padding-top: 8px;
      }
      .arrow-right {
        float: right;
        width: 20px;
        padding-top: 8px;
      }
      .center_heading {
        margin: 0 auto;
        display: inline-block;
        width: 150px;
        padding-bottom: 10px;
      }
      .calendar-label {
        color: var(--text-secondary);
        position: absolute;
        font-size: 12px;
        top: 4px;
        left: 8px;
        width: calc(100% - 8px);
        box-sizing: border-box;
        padding-right: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: .2s all ease-in-out;
        line-height: 16px;
        pointer-events: none;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
      }
      :host(.empty) .calendar-label {
        top: 8px;
        font-size: 14px;
        line-height: 24px !important;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        font: var(--body-1)
      }
      :host:not(.empty[active]) .calendar-label,
      :host([active]) .calendar-label {
        top: 4px !important;
        font-size: 12px !important;
        line-height: 16px !important;
      }
      input {
        outline: none;
        border: none;
        font-family: siemens sans, sans-serif;
        font-size: 14px;
        font: var(--body-1);
        line-height: 24px !important;
        color: var(--text-primary);
        background: rgba(var(--ui-1), var(--opacity-7));
        border-radius: 2px 2px 0px 0px;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding: 16px 40px 0px 8px;
        transition: .2s all ease-in-out;
        font-weight: 300;
        text-overflow: ellipsis;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        border-bottom: 1px solid transparent;
        border-color: rgba(var(--ui-1), var(--opacity-5));
      }
      :host([active]) input {
        outline: none;
        border-color: rgba(var(--ui-1), var(--opacity-3));
      }
      :host(.empty) input {
        padding: 8px 40px 8px 8px;
      }
      .datepicker-input-wrapper {
        display: flex;
        flex-direction: row;
        position: relative;
        width: 100%;
        height: 40px;
      }
      .content-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .date-range {
        position: absolute;
        top: 8px;
        right: 8px;
      }
      .date-range:hover,:host(.hover) .date-range {
        color: rgba(var(--ui-1),var(--opacity-2));
      }
      :host([disabled]) .date-range {
        color:rgba(var(--ui-1),var(--opacity-5));
      }
      :host([disabled]) {
        pointer-events: none;
      }
      :host([disabled]) .calendar-label,
      :host([disabled]) input{
        color: var(--text-disabled);
      }
      /* Date Panel Styles */
      :host .date-panel-wrapper {
        background: rgba(var(--ui-8), var(--opacity-1));
        padding: 16px 0 0 8px;
        box-sizing: border-box;
        border-radius: 2px;
        box-sizing: border-box;
        box-shadow: var(--shadow-overlay);
        display: none;
        opacity: 0;
        position: absolute;
        left: 0;
        z-index: 3;
        transition: .2s all ease-in-out .2s, 0s max-height ease-in-out;
      }
      .calendar-table sh-icon {
        cursor: pointer;
        padding-right: 10px;
        color: rgba(var(--ui-1),var(--opacity-4));
        padding-bottom: 5px !important;
      }
      .calendar-table sh-icon:hover{
        color: rgba(var(--ui-1),var(--opacity-2));
      }
      .calendar-picker-label {
        font: var(--title-1);
        height: 32px !important;
        line-height: 32px !important;
        cursor: pointer;
        transition: .2s all ease-in-out;
        color: var(--text-primary);
        border-radius: 16px;
        outline: 0;
      }
      .calendar-picker-label:hover {
        background-color: rgba(var(--ui-1),var(--opacity-7));
      }
      .calendar-table .dp-row .dp-cell.column-header,
      .calendar-cell {
        padding: 16px 8px 8px 0;
      }
      .last-month-cell {
        color: var(--text-disabled) !important;
        padding: 0;
      }
      .column-header-inner {
        display: inline-block;
        height: 32px;
        width: 32px;
        text-align: center;
        font: var(--title-1);
        color: var(--text-disabled);
        font-weight: normal;
        line-height: 32px;
      }
      .calendar-cell {
        border-radius: 50%;
        color: var(--text-primary);
        padding: 0;
      }
      .calendar-table {
        width: 100%;
        border-spacing: 0;
      }
      .calendar-table .dp-row .dp-cell {
        height: 24px;
        padding: 0;
      }
      .calendar-table .dp-row .dp-cell {
        padding: 0 8px 8px 0;
      }
      /* State Styles */
      :host([active]) .date-panel-wrapper {
        max-height: fit-content;
        overflow: auto;
        opacity: 1;
        transition: .2s all ease-in-out .2s, 0s max-height ease-in-out;
        padding: 16px 0 0 8px;
        background: rgba(var(--ui-8), var(--opacity-1));
        display: block;
        width: 288px;
        position: absolute;
        top: 40px;
        height: 336px;
        overflow-x: hidden;
        overflow-y: hidden;
      }
      .calendar-date.within-range {
        background: rgba(var(--ui-1), var(--opacity-6));
        border-radius: 0;
      }
      .calendar-date.disabledate,
      .calendar-date.disabledate.unselected-date {
        color: var(--text-disabled);
        pointer-events: none;
      }
      .calendar-body .dp-table .dp-row .dp-cell.calendar-date:last-child {
        color: var(--text-disabled);
      }
      .calendar-date.todayDate.unselected-date {
        color: var(--text-highlight);
      }
      .calendar-date,
      .calendar-date.unselected-date {
        height: 32px;
        width: 32px;
        line-height: 32px !important;
        text-align: center;
        margin: auto;
        cursor: pointer;
        border-radius: 50%;
        color: var(--text-primary);
        font: var(--body-1);
        outline: 0;
      }
      input[readonly]:focus {
        outline: none;
      }
      :host([active]) .calendar-label {
        top: 4px !important;
        line-height: 16px !important;
        font: var(--body-2);
      }
      :host(.empty[condensed]) .calendar-label {
        display: block !important;
        top: 1px !important;
        font-size: 14px !important;
      }
      :host(:not(.empty)) input {
        padding: 16px 68px 0px 8px !important;
      }
      .month-panel,
      .year-panel {
        display: block;
        transition: .2s all ease-in-out .2s;
        background: rgba(var(--ui-8), var(--opacity-1));
        box-sizing: border-box;
        box-shadow: var(--shadow-overlay);
        position: absolute;
        z-index: 4;
        width: 288px;
        height: 336px;
        top: 40px;
        left: 0;
      }
      .month-list-panel,
      .year-list-panel {
        padding: 28px 16px 12px 32px
      }
      .month-list-panel .dp-table,
      .year-list-panel .dp-table {
        border-spacing: 0;
        border-collapse: collapse;
      }
      .month-list-panel .dp-table .dp-row .dp-cell,
      .year-list-panel .dp-table .dp-row .dp-cell {
        padding: 0 16px 16px 0;
        width: 64px;
        height: 48px;
      }
      .month-header,
      .year-header {
        padding: 14px 8px 0;
      }
      .month-header table,
      .year-header table {
        width: 100%;
        border-spacing: 0;
      }
      .month-header sh-icon,
      .year-header sh-icon,
      .year-display {
        cursor: pointer;
      }
      .month-panel>div>.dp-table>.dp-row:nth-child(4)>.dp-cell,
      .year-panel>div>.dp-table>.dp-row:nth-child(4)>.dp-cell {
        padding-bottom: 0;
      }
      .month-name,
      .month-name.unselected .year-range {
        cursor: pointer;
        text-align: center;
        color: var(--text-primary);
        font: var(--body-1);
        border-radius: 16px;
        height: 32px;
        line-height: 32px !important;
        outline: 0;
        width: 64px;
      }
      .month-name:hover{
        background: rgba(var(--ui-1), var(--opacity-6))
      }
      .month-name.current {
        color: var(--text-highlight);
      }
      .month-name.selected,.month-name.selected:hover {
        background: rgba(var(--ui-3), var(--opacity-1));
        color: var(--text-white) !important;
        font: var(--title-1);
        border-radius: 16px;
        height: 32px;
        line-height: 32px !important;
      }
      .year-list-panel>.dp-table>.dp-row:nth-child(1)>.dp-cell:nth-child(1)>div,
      .year-list-panel>.dp-table>.dp-row:nth-child(4)>.dp-cell:nth-child(3)>div {
        color: var(--text-disabled);
      }
      .year-label,
      .year-display {
        font: var(--title-1);
        color: var(--text-primary);
      }
      .dp-table {
        display: table;
      }
      .dp-heading {
        display: table-row;
        font-weight: bold;
        text-align: center;
      }
      .dp-row {
        display: table-row;
      }
      .dp-cell {
        display: table-cell;
        vertical-align:middle;
      }
      :host([mandatory]) #mandatory {
        display: inline-block;
      }
      #mandatory {
        display: none;
        color: rgba(var(--ui-2), var(--opacity-1));
      }
      :host([disabled]) #mandatory {
        color: rgba(var(--ui-2), var(--opacity-5)) !important;
      }
      /* types */
      :host([safety]) input {
        border-color: rgba(var(--functional-yellow), var(--opacity-2)) !important;
      }
      :host([success]) input {
        border-color: rgba(var(--functional-green), var(--opacity-2)) !important;
      }
      :host([error]) input {
        border-color: rgba(var(--functional-red), var(--opacity-1)) !important;
      }
      /* hover */
      :host(.no-hovermq) .calendar-date.within-range:hover,
      :host(:not(.no-hovermq)) .calendar-date.within-range:hover {
        background: rgba(var(--ui-1), var(--opacity-6));
      }
      :host(:hover.no-hovermq) input ,
      :host(:hover:not(.no-hovermq)) input,
      :host(.hover) input {
        background: rgba(var(--ui-1), var(--opacity-6));
      }
      :host(:hover:not([active]):not(.no-hovermq)) input {
        background: var(--highlight-10);
      }
      :host(.no-hovermq) .calendar-date:hover,
      :host(:not(.no-hovermq)) .calendar-date:hover,
      .calendar-date.hover {
        background: rgba(var(--ui-1), var(--opacity-6));
      } 
      :host(.no-hovermq) .calendar-date.calendar-selected-date,
      :host(:not(.no-hovermq)) .calendar-date.calendar-selected-date {
        background: rgba(var(--ui-3), var(--opacity-1));
        color: var(--text-white);
        font: var(--title-1);
      }      
      :host(.no-hovermq) .calendar-date.calendar-selected-cell,
      :host(:not(.no-hovermq)) .calendar-date.calendar-selected-cell {
        background: rgba(var(--ui-2), var(--opacity-1));
        color: var(--text-white);
      }
      :host(:not(.no-hovermq)) .calendar-date.calendar-selected-cell,
      :host(:not(.no-hovermq)) .calendar-date.calendar-selected-cell:hover {
        background:   rgba(var(--ui-2), var(--opacity-1)); /* rgba(var(--ui-2), var(--opacity-1)) */;
        color: var(--text-white);
      }
      :host(:not(.no-hovermq)) .calendar-date.calendar-selected-date,
      :host(:not(.no-hovermq)) .calendar-date.calendar-selected-date:hover {
        background: rgba(var(--ui-3), var(--opacity-1));
        color: var(--text-white);
      }
      .testing,:host(.testing) input,:host(.testing) .calendar-label,
      :host(.testing) .date-panel-wrapper,
      :host(.testing) .calendar-picker-label,
      :host(.testing) .month-panel,:host(.testing) .year-panel,
      :host(.testing[active]) .date-panel-wrapper {
        transition: all 0s linear;
      }
      .scrollpicker{
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: center;
        max-height: 200px;
        margin: 0;
        height: inherit;

      }
      .scrollpicker .scrollpicker-values-outer-wrapper{
          overflow:hidden;
      }
    .scrollpicker-container {
      transition: all 1s cubic-bezier(0,-0.18,0,.91);
      transform: translateY(0px);
    }
    .scrollpicker .value_container {
      margin: 8px 16px;
      min-height: 32px;
      max-height: 32px;
    }
    
    .scrollpicker .value_container p {
      margin: 0;
      color: rgba(var(--ui-1));
      opacity: var(--opacity-3);
      word-wrap: normal;
    }
    .scrollpicker .value_container p.year {
      min-width: 32px;
      width: 32px;
    }
    .scrollpicker .value_container p.month {
      min-width: 28px;
      width: 28px;
    }
    .scrollpicker .value_container p.day {
      min-width: 20px;
      width: 20px;
    }
    .scrollpicker .value_container.selected p {
      opacity: var(--opacity-2);
    }
    .scrollpicker .selection-marker {
      position: absolute;
      height: 32px;
      border-top: solid 1px rgba(var(--ui-1));
      border-bottom: solid 1px rgba(var(--ui-1));
      left: 0;
      right: 0;
      top: 82px;
      opacity: var(--opacity-6);
    }
    :host(:hover:not(.empty)) .close-button,
    :host([error]:not([readonly]):not([disabled])) .close-button {
      opacity: 1;
      pointer-events: all;
    }
    .close-button {
      opacity: 0;
      pointer-events: none;
    }
    :host([responsive="true"]) .date-wrapper {
      background: #fff;
      position: relative;
      max-height: 368px;
      min-height: 368px;
      height: 368px;
      flex: 1 1 auto;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
    }
    :host([responsive="true"]) .month-panel,
    :host([responsive="true"]) .year-panel,
    :host([responsive="true"][active]) .date-panel-wrapper {
      top:inherit;
      right:inherit;
      left:inherit;
      box-shadow:none;
      width:296px;
    }
    :host([active][responsive="true"]) .date-panel-wrapper {
      padding:0;
      overflow: visible;
    }
    :host([responsive="true"]) .calendar-table .dp-row .dp-cell {
      padding: 0 12px 12px 0;
      height: 32px;
    }
    :host([responsive="true"]) .calendar-table .dp-row .dp-cell.right-arrow-cell {
      padding-right: 0;
      padding-left: 12px;
    }
    .multiple-months {
      display:flex;
      flex-direction: row;
      position: absolute;
      left: 0;
      top:40px;
      box-shadow: var(--shadow-overlay);
    }
    :host([active]) .multiple-months .date-panel-wrapper {
      position: static;
      flex-direction: row;
      box-shadow: none;
    }
    .multiple-months .dp-heading {
      display: block;
    }
    .multiple-months .icon-left,
    .month-list .icon-left,
    .year-list .icon-left {
      position:absolute;
      left: 8px;
      top:24px;
      z-index: 6;
      display:none;
      cursor: pointer;
    }
    .multiple-months .icon-right,
    .month-list .icon-right,
    .year-list .icon-right {
      position:absolute;
      right: 8px;
      top: 24px;
      z-index: 6;
      display:none;
      cursor: pointer;
    }
    :host([active]) .multiple-months .icon-right,
    :host([active]) .multiple-months .icon-left {
      display:block;
    }
    .month-list,.year-list {
      display: none;
      flex-direction: row;
      position: absolute;
      top: 40px;
      left: 0;
      z-index: 7;
    }
    .month-list .month-panel,
    .year-list .year-panel {
      position: static;
      flex-direction: row;
      box-shadow:none;
    }
    .month-list-panel .dp-table,
    .year-list-panel .dp-table {
      display: flex;
      flex-direction: row;
    }
    .month-list-panel .dp-table .dp-cell,
    .year-list-panel .dp-table .dp-cell {
      width:80px;
      height:64px;
      padding-right: 0 16px 16px 0;
    }
    .month-panel .dp-table,
    .year-panel .dp-table{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .month-list sh-icon,
    .year-list sh-icon{
      top:24px;
      z-index: 6;
      display:none;
    }   
    .year-list-panel > div > div:nth-child(1) > div,
    .year-list-panel > div > div:nth-child(12) > div {
      color: var(--text-disabled) !important;
      background: none !important;
    } 
    /* readonly */
    :host([readonly]) input{
      background: transparent !important;
      cursor: default;
    }
    :host([readonly]) #calendarBtn,
    :host([readonly]) .close-button
    :host([disabled]) .close-button {
      display: none !important;
    }
    :host([readonly]), 
    :host([readonly]) * {
      pointer-events: none;
      -webkit-user-select: none; 
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
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
    /* status icons */
    .icon-wrapper {
      position: absolute;
      top: 8px;
      right: 40px;
    }
    :host([readonly]) .icon-wrapper {
      right: 8px;
    }
    :host(:not([error])) .error-icon, 
    :host(:not([success])) .success-icon {
      display: none;
    }
    :host([success]:not([readonly])) input,
    :host(:hover:not(.empty)) input,
    :host(:hover[success]:not([readonly])) input,
    :host([success]:not([readonly])) .calendar-label,
    :host(:hover:not(.empty)) .calendar-label,
    :host(:hover[success]:not([readonly])) .calendar-label {
      padding-right: 72px;
    }
    :host([error]:not([readonly]):not([disabled])) input,
    :host(:hover[success]:not([readonly]):not(.empty)) input,
    :host([error]:not([readonly]):not([disabled])) .calendar-label,
    :host(:hover[success]:not([readonly]):not(.empty)) .calendar-label {
      padding-right: 104px;
    }
    :host([readonly]:not([error]):not([success])),
    :host([disabled]:not([error]):not([success])) {
      padding-right: 8px;
    }
    /* clear icon */
    .close-button {
      right: 40px;
    }
    :host([error]) .close-button,
    :host([success]) .close-button {
      right: 72px
    }

    .multiple-months {
      display:flex;
      flex-direction: row;
      position: absolute;
      left: 0;
      top:40px;
    }

    :host([active]) .multiple-months .date-panel-wrapper {
      position: static;
      flex-direction: row;
      box-shadow: none;
    }
    .multiple-months .dp-heading {
      display: block;
    }
    .multiple-months .icon-left,
    .month-list .icon-left,
    .year-list .icon-left{
      position:absolute;
      left: 8px;
      top:24px;
      z-index: 6;
      display:none;
      cursor: pointer;
    }
    .multiple-months .icon-right,
    .month-list .icon-right,
    .year-list .icon-right{
      position:absolute;
      right: 8px;
      top: 24px;
      z-index: 6;
      display:none;
      cursor: pointer;
    }
    :host([active]) .multiple-months .icon-right,
    :host([active]) .multiple-months .icon-left{
      display:block;
    }
    .month-list,.year-list{
      display: none;
      flex-direction: row;
      position: absolute;
      top: 40px;
      left: 0;
      z-index: 7;
    }
    .month-list .month-panel,
    .year-list .year-panel {
      position: static;
      flex-direction: row;
      box-shadow:none;
    }
    .month-list-panel .dp-table,
    .year-list-panel .dp-table {
      display: flex;
      flex-direction: row;
    }
    .month-list-panel .dp-table .dp-cell,
    .year-list-panel .dp-table .dp-cell{
      width:80px;
      height:64px;
      padding-right: 0 16px 16px 0;
    }
    .month-panel .dp-table,
    .year-panel .dp-table{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .month-list sh-icon,
    .year-list sh-icon{
      top:24px;
      z-index: 6;
      display:none;
    }   
    .year-list-panel > div > div:nth-child(1) > div,
    .year-list-panel > div > div:nth-child(12) > div{
      color: var(--text-disabled) !important;
      background: none !important;
    } 
    :host([no-border]) input {
      border-bottom: none;
    }
    </style>

    <div class="datepicker-input-wrapper" on-click="_handleActive">
      <div class="content-wrapper">
        <input class="inputDate" type="text" value="{{value::input}}" disabled$="[[disabled]]" readonly="" on-click="initiateCalendar">
        <div class="calendar-label">[[label]]
        <span id="mandatory">*</span>
        </div>
      </div>
      <sh-icon size="s" icon="cancel" class="date-range close-button" button on-click="clearCalendar"></sh-icon>
      <div class="icon-wrapper">
        <sh-icon icon="error" class="error-icon" size="s" color="rgb(var(--functional-red))"></sh-icon>
        <sh-icon icon="success" class="success-icon" size="s" color="rgb(var(--functional-green))"></sh-icon>
      </div>
      <sh-icon button id="calendarBtn" size="s" icon="calendar" class="date-range" on-click="initiateCalendar"></sh-icon>
    </div>
    <template is="dom-if" if="[[!enableResponsive]]"> 
      <div class="date-overlay">${this.partialTemplate}</div>
    </template>
    <template is="dom-if" if="[[enableResponsive]]">
      <template is="dom-if" if="[[scrollpicker]]">
        <sh-drawer position="bottom" id="drawer-bottom-date">${this.dateRangePickerTemplate}</sh-drawer>
      </template>
      <template is="dom-if" if="[[!scrollpicker]]">
        <sh-drawer position="bottom" id="drawer-bottom-date">${this.partialTemplate}</sh-drawer>
      </template>
    </template>
    <sh-text size="body-2" class="helper-text hint" color="secondary">[[hint]]</sh-text>
    <sh-text size="body-2" class="helper-text error-message" color="secondary">[[errorMessage]]</sh-text>
`;
  }

  static get is() {
    return 'sh-datepicker';
  }
  static get properties() {
    return {
      active: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      scrollpicker: {
        type: String,
        value: 'false',
        reflectToAttribute: true,
        notify: true
      },
      responsive: {
        type: String,
        value: 'false',
        reflectToAttribute: true,
        notify: true
      },
      label: {
        type: String,
        value: 'Date Picker'
      },
      value: {
        type: String,
        value: '',
        reflectToAttribute: true,
        notify: true,
        observer: '_emptyObserver'
      },
      disabled: {
        type: Boolean,
        value: false
      },
      daysArray: {
        type: Array,
        value: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      },
      datesArray: {
        type: Array,
        value: []
      },
      month: {
        type: String,
        value: ''
      },
      year: {
        type: String,
        value: ''
      },
      monthNumber: {
        type: Number,
        value: ''
      },
      range: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      clickCounter: {
        type: Number,
        value: 0
      },
      fromDate: {
        type: String,
        value: ''
      },
      toDate: {
        type: String,
        value: ''
      },
      tempFromDate: {
        type: String,
        value: ''
      },
      tempToDate: {
        type: String,
        value: ''
      },
      format: {
        type: String,
        value: 'MMDDYYYY'
      },
      separator: {
        type: String,
        value: '/'
      },
      tempDisplayDate: {
        type: String,
        value: ''
      },
      monthList: {
        type: Array,
        value: ''
      },
      yearList: {
        type: Array,
        value: []
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
      error: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      safety: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      months: {
        type: Number,
        value: 1,
        reflectToAttribute: true,
        notify: true
      },
      futureDateDisable: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      noBorder: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      day_values: {
        value() {
          let day_arr;
          day_arr = [];
          for (let i = 1; i < 32; i++) {
            let val;
            if(i < 10) {
              val = `0${i}`;
            }
            else {
              val = `${i}`;
            }
            day_arr.push({
              value: val
            });
          }
          return day_arr;
        }
      },
      mon_values: {
        value() {
          let mon_arr = [];
          mon_arr = month_map.map(month => {
            return {
              value: month
            }
          });
          return mon_arr;
        }
      },
      year_values: {
        value() {
          const year_arr = [];
          for (let i = 1900; i < 2100; i++) {
            year_arr.push({
              value: '' + i
            });
          }
          return year_arr;
        }
      }
    }
  }
  constructor() {
    super();
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

  applyValues(val, elem) {
    switch (elem) {
      case 'day':
        this.d = val;
        break;
      case 'mon':
        this.m = month_map.indexOf(val) + 1;
        if(this.m < 10) {
          this.m = `0${this.m}`;
        }
        else {
          this.m = `${this.m}`;
        }
        break;
      case 'year':
        this.y = val;
        break;
      default:
        break;
    }
    this.value = `${this.m}/${this.d}/${this.y}`;
  }


  addSwipeScroll() {
    const self = this;
    const SCROLL_LIM = this.shadowRoot.querySelector('.scrollpicker').clientHeight;
    // touch events registration
    if (this.scrollpicker) {
      this.pickers = this.shadowRoot.querySelector('.scrollpicker').children;
      this.pickers = Array.from(this.pickers);
      // don't need marker
      this.pickers.pop();

      this.pickers = this.pickers.map(function (item) {
        const props = {};
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
        }
      });

      this.pickers.forEach(function (picker) {
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
          let alpha, currY;
          currY = unifyTouches(e).clientY;
          let dy = currY - picker.props.initY;

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
            } else {

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
              touchTargetElement = e.target.parentElement;
            }
            let indexOfCurrentTarget = childrenElementsOfPicker.indexOf(touchTargetElement);
            if (indexOfCurrentTarget === -1) {
              return;
            }
            indexOfCurrentTarget -= picker.props.selectionValue;
            if (Math.sign(indexOfCurrentTarget) < 0) {
              swipe(picker, 'down', Math.abs(indexOfCurrentTarget));
            } else {
              swipe(picker, 'up', Math.abs(indexOfCurrentTarget));
            }

          } else {
            //clear timeout
            clearTimeout(picker.props.timer);
            picker.props.timer = null;
            if (picker.props.swipe_dir < 0) {
              swipe(picker, 'up', picker.props.rate);
            } else {
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

  connectedCallback() {
    super.connectedCallback();
    if (toBoolean(this.responsive) || window.innerWidth <= BREAKPOINT) {
      this.enableResponsive = true;
      this.responsive = 'true';
    } else {
      this.enableResponsive = false;
    }

    if (toBoolean(this.scrollpicker)) {
      this.scrollpicker = true;
    } else {
      this.scrollpicker = false;
    }
    document.body.addEventListener('click', (e) => this._closeDatePicker(e));
    let val;
    val = this.value;
    if (val !== '') {
      if (this.range) {
        let splitDateInput, fromDate, toDate;
        splitDateInput = val.split('-');
        fromDate = this.validateInput(splitDateInput[0]);
        toDate = this.validateInput(splitDateInput[1]);
        this.value = fromDate + '-' + toDate;
      } else {
        this.value = this.validateInput(val);
      }
    }
    this.onkeyup = function (e) {
      if (e.keyCode === 27) {
        this._closeDatePicker(this);
      }
    };
  }

  _focusContext(e) {
    e.target.onkeyup = function (e) {
      if (e.keyCode === 9) {
        e.target.style.outline = '2px solid rgb(59, 153, 252)';
        e.target.style.outlineOffset = '-2px';
      }
      if (e.keyCode === 13) {
        e.target.click();
      }
    };
  }

  _blurContext(e) {
    e.target.style.outline = '';
    e.target.style.outlineOffset = '';
  }

  _handleActive() {
    this.active = !this.active;
    if (this.active) {
      document.body.addEventListener('click', e => {return this._closeDatePicker(e);});
    }
    if (this.enableResponsive) {
      if (this.scrollpicker) {
        if (!this.swipeEventsAdded) {
          this.addSwipeScroll();
          this.swipeEventsAdded = true;
        }
        if (this.value.length < 1) {
          // initialise all the values
          this.pickers.forEach(picker => {
            swipe(picker, 'down', picker.props.TOTAL_ELEMENTS);
            picker.element.children[picker.props.selectionValue].className = picker.element.children[picker.props.selectionValue].className.concat(' selected');
            let finalValue;
            finalValue = picker.element.children[picker.props.selectionValue].children[0].innerHTML;
            this.applyValues(finalValue, picker.targetElem);
          });
        }
        this.shadowRoot.querySelector('.scrollpicker').focus();
      }

      this.shadowRoot.querySelector('#drawer-bottom-date').visible = this.active;
    }

  }

  //close datepicker when user clicks outside
  _closeDatePicker(e) {
    let self, srcElem, target;
    self = this;
    srcElem = e.path ? e.path[0] : e.srcElement;
    target = e.target;
    if (target === self && !srcElem.id.match('drawer-bottom-date')) {
      return;
    } else {
      if (!this.scrollpicker) {
        this.shadowRoot.querySelector('.month-list').style.display = 'none';
        this.shadowRoot.querySelector('.year-list').style.display = 'none';
      }

      if (this.active) {
        document.body.removeEventListener('click', e => {return this._closeDatePicker(e);});
        this._handleActive();
      } else {
        return;
      }
    }
  }

  clearCalendar(e) {
    e.stopPropagation();
    this.value = '';
  }

  validateInput(dateInput) {
    let dateValue, day, month, splitDate;
    splitDate = dateInput.split(this.separator);
    if (this.format === 'MMDDYYYY') {
      day = this.returnDay(splitDate[1]);
      month = this.returnMonth(splitDate[0]);
      dateValue = month + this.separator + day + this.separator + splitDate[2];
    } else if (this.format === 'DDMMYYYY') {
      day = this.returnDay(splitDate[0]);
      month = this.returnMonth(splitDate[1]);
      dateValue = day + this.separator + month + this.separator + splitDate[2];
    } else {
      day = this.returnDay(splitDate[2]);
      month = this.returnMonth(splitDate[1]);
      dateValue = splitDate[0] + this.separator + month + this.separator + day;
    }
    return dateValue;
  }

  returnDay(dayNumber) {
    let day;
    day = dayNumber; 
    if( day<=9 && day.length < 2 ) {
       day = '0' + day;
       return day;
    }
    else {
      return day;
    }
  }

  returnMonth(monthNumber) {
    let month;
    month = monthNumber;
    if( month<=9 && month.length < 2 ) {
      month = '0' + month;
      return month;
    }
    else {
     return month;
    }
  }

  showMonth(month) {
    let monthName;
    monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'];
    return monthName[month];
  }

  shortMonth(month) {
    let monthName;
    monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'];
    return monthName[month];
  }

  buildMonthArray(year, curMonth, selMonth, curYear, selYear) {
    let months;
    months = [{ monthNo: 0, month: 'Jan' },
    { monthNo: 1, month: 'Feb' },
    { monthNo: 2, month: 'Mar' },
    { monthNo: 3, month: 'Apr' },
    { monthNo: 4, month: 'May' },
    { monthNo: 5, month: 'Jun' },
    { monthNo: 6, month: 'Jul' },
    { monthNo: 7, month: 'Aug' },
    { monthNo: 8, month: 'Sep' },
    { monthNo: 9, month: 'Oct' },
    { monthNo: 10, month: 'Nov' },
    { monthNo: 11, month: 'Dec' }];
    for (let i in months) {
      months[i].year = year;
      months[i].currentMonth = false;
      months[i].selectedMonth = false;
      if (curMonth === months[i].monthNo && year === curYear) {
        months[i].currentMonth = true;
      }
      if (months[i].monthNo === selMonth && year === selYear) {
        months[i].selectedMonth = true;
      }
    }
    return months;
  }

  buildYearArray(decadeYear, curYear, selYear) {
    let years;
    years = [];
    for (let i = 0; i <= 11; i++) {
      decadeYear++;
      let yearObj;
      yearObj = {};
      yearObj.year = decadeYear;
      yearObj.selectedYear = false;
      yearObj.currentYear = false;
      if (decadeYear === selYear) {
        yearObj.selectedYear = true;
      }
      if (this.value === '') {
        yearObj.selectedYear = false;
      }
      if (decadeYear === curYear) {
        yearObj.currentYear = true;
      }
      years.push(yearObj);
    }
    return years;
  }

  displayMonth(monthNumber, index, years) {
    let month, monthName, year;
    month = monthNumber + index;
    year = years;
    if (month > 11) {
      month = 0;
      year = year + 1;
    }
    monthName = this.showMonth(month);
    return monthName + ' ' + year;
  }

  displayYear(monthNumber, index, years) {
    let month, year;
    month = monthNumber + index;
    year = years;
    if (month > 11) {
      year = year + 1;
    }
    return year;
  }
  displayDecade(decadeYear, inc) {
    let year, firstYear, secondYear;
    year = decadeYear - (10 * (this.months - 2)) + 10 * inc;
    firstYear = parseInt(year,10) - 8;
    secondYear = parseInt(firstYear,10) + 9;
    return firstYear + '-' + secondYear;
  }
  showYear(tempYear, inc) {
    let year;
    year = parseInt(tempYear, 10) + inc;
    return year;
  }

  //format the dates based on the format given in the component
  formatDate(date) {
    let splitDate, formatDate;
    splitDate = date.split(this.separator);
    if (this.format === 'YYYYMMDD') {
      formatDate = splitDate[0] + this.separator + splitDate[1] + this.separator + splitDate[2];
    } else if (this.format === 'DDMMYYYY') {
      formatDate = splitDate[2] + this.separator + splitDate[1] + this.separator + splitDate[0];
    } else {
      formatDate = splitDate[1] + this.separator + splitDate[2] + this.separator + splitDate[0];
    }
    return formatDate;
  }

  //split month and year to show calendar on click of input
  splitMonthYear(dateInput) {
    let splitDate, monthYearArr;
    splitDate = dateInput.split(this.separator);
    monthYearArr = [];
    if (this.format === 'YYYYMMDD') {
      monthYearArr.push(splitDate[1] - 1, splitDate[0]);
    } else if (this.format === 'DDMMYYYY') {
      monthYearArr.push(splitDate[1] - 1, splitDate[2]);
    } else {
      monthYearArr.push(splitDate[0] - 1, splitDate[2]);
    }
    return monthYearArr;
  }

  //building month array of weeks to display in template
  buildCalendarArr(month, year) {
    if (month > 11) {
      month = 0;
      year = year + 1;
    }
    let currentDate, firstWkDayofCurrMonth,currDate, monthArray, todaysDate, dayNow, monthNow, yearNow, selectedDateValue;
    currentDate = new Date(year, month, 1);
    firstWkDayofCurrMonth = currentDate.getDay();
    currDate = currentDate;
    monthArray = [];
    todaysDate = new Date();
    dayNow = new Date().getDate();
    monthNow = todaysDate.getMonth();
    yearNow = todaysDate.getFullYear();
    selectedDateValue = this.convertDate(this.value);

    for (let week = 0; week <= 5; week++) {
      let currWeekArr;
      currWeekArr = [];
      if (week === 0 && firstWkDayofCurrMonth > 0) {
        for (let i = firstWkDayofCurrMonth - 1; i >= 0; i--) {
          let dateObj, date;
          dateObj = {};
          date = new Date(year, month, -i);
          dateObj.dayOfMonth = date.getDate();
          dateObj.month = date.getMonth();
          dateObj.dispMonth = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() +
            1);
          dateObj.year = date.getFullYear();
          let day;
          day = (dateObj.dayOfMonth <= 9) ? '0' + dateObj.dayOfMonth : dateObj.dayOfMonth;
          dateObj.date = dateObj.year + this.separator + dateObj.dispMonth + this.separator + day;
          dateObj.otherMonthDays = true;
          dateObj.today = false;
          if (this.futureDateDisable && new Date(dateObj.date).getTime() > new Date(todaysDate).getTime()) {
            dateObj.disabledays = true;
          }
          else {
            dateObj.disabledays = false;
          }
          dateObj.withinRange = false;
          dateObj.selectedDate = false;
          currWeekArr.push(dateObj);
        }

      }

      for (let j = currWeekArr.length; j <= 6; j++) {
        let dateObj1;
        dateObj1 = {};
        dateObj1.dayOfMonth = currDate.getDate();
        dateObj1.month = currDate.getMonth();
        dateObj1.dispMonth = currDate.getMonth() + 1 < 10 ? '0' + (currDate.getMonth() + 1) : currDate.getMonth() +
          1;
        dateObj1.year = currDate.getFullYear();
        let day;
        day = dateObj1.dayOfMonth <= 9 ? '0' + dateObj1.dayOfMonth : dateObj1.dayOfMonth;
        dateObj1.date = dateObj1.year + this.separator + dateObj1.dispMonth + this.separator + day;
        dateObj1.otherMonthDays = month !== dateObj1.month ? true : false;
        dateObj1.today = monthNow === dateObj1.month && yearNow === dateObj1.year && dayNow === dateObj1.dayOfMonth ?
          true : false;
        if (this.futureDateDisable && new Date(dateObj1.date).getTime() > new Date(todaysDate).getTime()) {
          dateObj1.disabledays = true;
        }
        else {
          dateObj1.disabledays = false;
        }
        if (this.range) {
          dateObj1.selectedDate = (this.fromDate === dateObj1.date || this.toDate === dateObj1.date) ? true :
            false;
          let fromDate, toDate;
          fromDate = new Date(this.fromDate).getTime();
          toDate = new Date(this.toDate).getTime();
          if (month != dateObj1.month) {
            dateObj1.withinRange = false;
            dateObj1.selectedDate = false;
          }
          else {
            let fromDateCheck, toDateCheck;
            fromDateCheck = new Date(dateObj1.date).getTime() > fromDate && new Date(dateObj1.date).getTime() < toDate;
            toDateCheck = new Date(dateObj1.date).getTime() > new Date(this.tempFromDate).getTime() && new Date(dateObj1.date).getTime() < new Date(this.tempToDate).getTime();
            dateObj1.withinRange = fromDateCheck || toDateCheck ? true : false;
          }
        } else {
          dateObj1.selectedDate = selectedDateValue === dateObj1.date ? true : false;
        }
        currWeekArr.push(dateObj1);
        currDate.setDate(currDate.getDate() + 1);
      }

      monthArray.push(currWeekArr);
      this.set('datesArray', monthArray);
    }
    return this.datesArray;
  }

  //Apply classes based on todays date,selected date and range date
  computeClasses(otherMonthDays, today, selectedDate, withinRange, disabledays) {
    let classStr;
    classStr = 'calendar-date';
    if (otherMonthDays) {
      classStr += ' last-month-cell';
    }
    if (today) {
      classStr += ' todayDate';
    }
    if (selectedDate) {
      classStr += ' calendar-selected-date';
    }
    if (withinRange) {
      classStr += ' within-range';
    }
    if (disabledays) {
      classStr += ' disabledate';
    }
    return classStr + ' unselected-date';
  }
  //creating month array to display on click of month
  chooseMonth(e) {
    this.$.calendarBtn.focus();
    this.shadowRoot.querySelector('.month-list').style.display = 'flex';
    this.shadowRoot.querySelectorAll('.month-list sh-icon').forEach((node) => node.style.display = 'block');
    this.shadowRoot.querySelector('.year-list').style.display = 'none';
    let currentMonth, currentYear, inputVal, selectedYear, selectedMonth, allMonthobjarr;
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    inputVal = this.value;
    let monthYearArr = [];

    if (inputVal !== '' && this.range) {
      let splitDateInput;
      splitDateInput = inputVal.split('-');
      monthYearArr = this.splitMonthYear(splitDateInput[1]);
      selectedMonth = parseInt(monthYearArr[0], 10);
      selectedYear = parseInt(monthYearArr[1], 10);
    }
    else {
      monthYearArr = this.splitMonthYear(inputVal);
      selectedMonth = parseInt(monthYearArr[0], 10);
      selectedYear = parseInt(monthYearArr[1], 10);
    }
    if (e.target.dataset.counter) {
      this.year = parseInt(this.year, 10) + parseInt(e.target.dataset.counter, 10);
    }

    allMonthobjarr = [];
    for (let i = 0; i < this.months; i++) {
      let year, marray;
      this.tempYear = parseInt(e.target.dataset.year, 10);
      year = parseInt(e.target.dataset.year, 10) + i;
      marray = this.buildMonthArray(year, currentMonth, selectedMonth, currentYear, selectedYear);
      allMonthobjarr.push(marray);
    }
    this.set('monthList', allMonthobjarr);
    return this.monthList;
  }

  //Apply classes for current and selected month in month/year panel
  computeMonthYearClasses(selected, current) {
    let classStr;
    classStr = 'month-name';
    if (selected) {
      classStr += ' selected';
    }
    if (current) {
      classStr += ' current';
    }
    return classStr + ' unselected';
  }

  //Show calendar based on the month selected from month panel
  selectMonth(e) {
    this.$.calendarBtn.focus();
    this.year = parseInt(e.target.dataset.year,10);
    this.monthNumber = parseInt(e.target.dataset.month,10);
    this.allMonths = [];
    if (this.months > 1) {
      this.range = true;
    }
    for (let i = 0; i < this.months; i++) {
      let marray;
      marray = this.buildCalendarArr(this.monthNumber + i, this.year);
      this.allMonths.push(marray);
    }
    this.shadowRoot.querySelector('.month-list').style.display = 'none';
    this.active = true;
  }

  //Navigate betwwen years in month panel on clicking of right and left arrows
  navigateYear(e) {
    this.year = parseInt(this.year, 10) + parseInt(e.target.dataset.counter, 10);
  }

  //creating year array to display on click of year
  chooseYear(e) {
    this.$.calendarBtn.focus();
    this.shadowRoot.querySelector('.month-list').style.display = 'none';
    this.shadowRoot.querySelectorAll('.month-list sh-icon').forEach((node) => node.style.display = 'none');
    this.shadowRoot.querySelector('.year-list').style.display = 'flex';
    this.shadowRoot.querySelectorAll('.year-list sh-icon').forEach((node) => node.style.display = 'block');
    let selectedYear, currentYear, decadeYear, inputVal, allMonthobjarr, clickedYear;
    clickedYear = e.target.dataset.year;
    currentYear = new Date().getFullYear();
    let monthYearArr = [];
    inputVal = this.value;
    if (inputVal !== '' && this.range) {
      let splitDateInput;
      splitDateInput = inputVal.split('-');
      monthYearArr = this.splitMonthYear(splitDateInput[1]);
      selectedYear = parseInt(monthYearArr[1], 10);
    }
    if (inputVal !== '' && !this.range) {
      monthYearArr = this.splitMonthYear(inputVal);
      selectedYear = parseInt(monthYearArr[1], 10);
    }
    decadeYear = clickedYear - clickedYear % 10 - 2;
    if (e.target.dataset.counterYear) {
      let counter;
      counter = e.target.dataset.counterYear;
      if(this.months === 1 && e.target.dataset.right === '1') {
        decadeYear = parseInt(this.decadeYear, 10) + 10;
      }
      else {
        decadeYear = parseInt(this.decadeYear, 10) + parseInt(counter,10) * (this.months);
      }
    }

    allMonthobjarr = [];
    for (let i = 0; i < this.months; i++) {
      let year, yearArray;
      year = decadeYear + 10 * i;
      this.decadeYear = year;
      yearArray = this.buildYearArray(year, currentYear, selectedYear);
      allMonthobjarr.push(yearArray);
    }
    this.set('yearList', allMonthobjarr);
    return this.yearList;
  }

  //Show calendar based on the year selected from month panel
  selectYear(e) {
    this.year = e.target.dataset.year;
    this.chooseMonth(e);
    if (this.months > 1) {
      this.range = true;
    }
    this.allMonths = [];
    for (let i = 0; i < this.months; i++) {
      let marray;
      marray = this.buildCalendarArr(this.monthNumber + i, this.year);
      this.allMonths.push(marray);
    }
    this.active = true;
    this.shadowRoot.querySelector('.year-list').style.display = 'none';
  }

  //set hover date on mouse over
  setHoverDate(e) {
    if (this.clickCounter === 0) {
      return;
    } else {
      let startDate, endDate, splitStartDateTime, splitEndDateTime;
      startDate = this.fromDate;
      endDate = e.target.dataset.fullDate;
      splitStartDateTime = new Date(startDate).getTime();
      splitEndDateTime = new Date(endDate).getTime();
      if (splitStartDateTime > splitEndDateTime) {
        this.tempToDate = startDate;
        this.tempFromDate = endDate;
      } else {
        this.tempToDate = endDate;
        this.tempFromDate = startDate;
      }
      this.allMonths = [];
      for (let i = 0; i < this.months; i++) {
        let marray;
        marray = this.buildCalendarArr(this.monthNumber + i, this.year);
        this.allMonths.push(marray);
      }
    }
  }

  //Clear hover date on mouse leave
  clearHoverDate() {
    this.tempToDate = '';
    this.buildCalendarArr(this.monthNumber, this.year);
  }

  //range selection for setting from and to date
  rangeSelector(e) {
    let self;
    self = this;
    if (this.clickCounter === 1) {
      this.shadowRoot.querySelectorAll('.calendar-date').forEach(node => {return node.classList.remove(
        'calendar-selected-date');});
      this.shadowRoot.querySelectorAll('.calendar-date').forEach(node => {return node.classList.remove('within-range');});
    }
    e.target.classList.add('calendar-selected-cell');

    if (this.clickCounter === 2) {
      this.shadowRoot.querySelectorAll('.calendar-selected-cell').forEach(node => {return node.classList.add('calendar-selected-date');});
      this.toDate = e.target.dataset.fullDate;
      this.tempToDate = this.toDate;
      this.clickCounter = 0;
      let startDate, endDate, splitStartDateTime, splitEndDateTime;
      startDate = this.fromDate;
      endDate = this.toDate;
      splitStartDateTime = new Date(startDate).getTime();
      splitEndDateTime = new Date(endDate).getTime();

      if (splitStartDateTime > splitEndDateTime) {
        this.toDate = startDate;
        this.fromDate = endDate;
      }

      let rangeDate;
      rangeDate = this.formatDate(this.fromDate) + '-' + this.formatDate(this.toDate);
      this.value = rangeDate;
      this.tempFromDate = '';
      this.tempToDate = '';
      setTimeout(function () {
        self._handleActive();
      }, 300);
    } else {
      this.fromDate = e.target.dataset.fullDate;
      this.tempFromDate = this.fromDate;
      this.toDate = '';
    }
  }
  //return Date on click of date and display in input
  displayDate(e) {
    if (this.range) {
      this.clickCounter++;
      this.rangeSelector(e);
    } else {
      let fullDate, self;
      fullDate = e.target.dataset.fullDate;
      self = this;
      this.value = this.formatDate(fullDate);
      setTimeout(function () {
        self._handleActive();
      }, 300);
    }
  }

  //Navigate to previous/next month on click of arrows
  navigateMonth(e) {
    let counter, month, year, dateObj, displayMonth, currentMonth, currentYear;
    counter = parseInt(e.target.dataset.prevMonth, 10);
    month = parseInt(e.target.dataset.monthInc, 10);
    year = parseInt(e.target.dataset.year, 10);
    dateObj = new Date(year, month);
    displayMonth = dateObj.getMonth() + counter;
    this.monthNumber = displayMonth;
    currentMonth = month + counter;
    currentYear = year;
    if (currentMonth === -1) {
      currentMonth = 11;
      currentYear = year - 1;
    }
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear = year + 1;
    }
    this.monthNumber = currentMonth;
    this.month = this.showMonth(currentMonth);
    this.year = currentYear;
    this.set('datesArray', this.buildCalendarArr(currentMonth, currentYear));
  }

  navigateMultipleMonth(e) {
    let counter, month;
    counter = parseInt(e.target.dataset.counter,10);
    month = this.monthNumber + counter;
    if (month > 11) {
      month = 0;
      this.year = this.year + 1;
    }
    if (month < 0) {
      month = 11;
      this.year = this.year - 1;

    }
    this.monthNumber = month;
    this.allMonths = [];
    for (let i = 0; i < this.months; i++) {
      let marray;
      marray = this.buildCalendarArr(month + i, this.year);
      this.allMonths.push(marray);
    }
  }

  convertDate(dateInput) {
    let dateValue, splitDate;
    splitDate = dateInput.split(this.separator);
    if (this.format === 'MMDDYYYY') {
      dateValue = splitDate[2] + this.separator + splitDate[0] + this.separator + splitDate[1];
    } else if (this.format === 'DDMMYYYY') {
      dateValue = splitDate[2] + this.separator + splitDate[1] + this.separator + splitDate[0];
    } else {
      dateValue = splitDate[0] + this.separator + splitDate[1] + this.separator + splitDate[2];
    }
    return dateValue;
  }

  //Month display on click of input
  showCalendar(month, year) {
    let dateObj, displayMonth, currentMonth;
    // Date object with change in year and month
    dateObj = new Date(year, month);
    // read the current year
    this.year = dateObj.getFullYear();
    displayMonth = dateObj.getMonth();
    this.monthNumber = displayMonth;
    this.month = this.showMonth(displayMonth);
    currentMonth = month;
    if (this.months > 1) {
      this.range = true;
    }
    this.allMonths = [];
    for (let i = 0; i < this.months; i++) {
      let marray;
      marray = this.buildCalendarArr(currentMonth + i, year);
      this.allMonths.push(marray);
    }

  }

  //Display currrent month or user selected date month on click of input
  initiateCalendar() {
    if (this.scrollpicker) {
      return;
    }
    this.shadowRoot.querySelector('.month-list').style.display = 'none';
    this.shadowRoot.querySelector('.year-list').style.display = 'none';
    let dateInput, dt_object, month, year, monthYearArr;
    dateInput = this.value;
    dt_object = new Date();
    month = dt_object.getMonth();
    year = dt_object.getFullYear();
    if (dateInput !== '' && this.range) {
      let splitDateInput;
      splitDateInput = dateInput.split('-');
      this.fromDate = this.convertDate(splitDateInput[0]);
      this.toDate = this.convertDate(splitDateInput[1]);
      monthYearArr = this.splitMonthYear(splitDateInput[1]);
      month = monthYearArr[0];
      year = monthYearArr[1];
    }
    if (dateInput !== '' && !this.range) {
      monthYearArr = this.splitMonthYear(dateInput);
      month = monthYearArr[0];
      year = monthYearArr[1];
    }
    this.showCalendar(month, year);
  }
  _emptyObserver() {
    if (this.value === '') {
      this.classList.add('empty');
    } else {
      this.classList.remove('empty');
    }
  }
}
window.customElements.define(SHDatepicker.is, SHDatepicker);
