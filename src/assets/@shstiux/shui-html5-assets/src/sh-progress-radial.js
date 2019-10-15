/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SHProgressRadial extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">

      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
      }
      :host([overlay]) {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(var(--ui-7), var(--opacity-3));
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .progress-label,
      .progress-info {
        color: var(--text-secondary);
        font: var(--body-1);
        font-size: 14px;
        font-family: siemens sans, sans-serif;
        text-align: center;
        display: none;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }
      .progress-label p{
        margin:0;
      }
      .progress-label {
        font: var(--title-1);
        color: var(--text-primary);
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        margin: auto;
      }
      :host([label]) .progress-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      :host([info]) .progress-info {
        display: block;
        margin-top: 8px;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }
      .progress-ring__circle {
        stroke: rgba(var(--ui-2), var(--opacity-1));
        z-index: 1;
      }
      .progress-ring__background,
      .progress-ring__circle {
        stroke-width: 8px;
        fill: transparent;
        cx: 50%;
        cy: 50%;
      }
      .progress-ring__background{
        stroke: rgba(var(--ui-1), var(--opacity-6));
      }
      /* sizes */
      :host([size="s"]) .progress-label {
        display: none;
      }
      .progress-radial-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        height: fit-content;
        height: -ms-fit-content;
        height: -moz-fit-content;
        flex-direction:column;
        align-items:center;
      }
      .progress-info {
        line-height: 16px;
        justify-content: center;
        align-items: center;
        margin-bottom: 12px !important;
      }
      :host([header]) .progress-header {
        display: block;
        font: var(--header-2);
        color: var(--text-primary);
        margin-bottom: 12px;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }
      :host([header]) .progress-header p{
        margin: 0;
        padding: 0;
        line-height: 20px;
      }
      :host([size="m"]) .progress-label p{
        width: 40px;
        line-height: 16px;
      }
      :host([size="l"]) .progress-label {
        font-size: 28px;
        line-height: 30px;
      }
      :host([size="l"]) .progress-label p{
        width: 80px;
        line-height: 32px;
      }
      :host([size="xl"]) .progress-label {
        font-size: 56px;
      }
      :host([size="xl"]) .progress-label p{
        width: 156px;
        line-height: 60px;
      }
      .progress-ring__background,
      .progress-ring__circle{
        stroke-width: 8px;
      }
      :host([size="xl"]) .progress-ring__background,
      :host([size="xl"]) .progress-ring__circle{
        stroke-width: 12px;
      }
    </style>
    <div class="progress-header"><p>[[header]]</p></div>
    <div style$="width:{{width}}px;height: {{width}}px;" class="progress-radial-wrapper">
      <svg class="progress-ring" style="width: {{width}}px; height: {{width}}px;">
        <path class="progress-ring__background" stroke-dasharray$="{{circumference}},{{circumference}}" d$="{{circlePath}}"/>
        <path class="progress-ring__circle" stroke-dasharray$="{{strokeDashArray}}" d$="{{circlePath}}" style$="stroke: {{color}}"/>
      </svg>
      <div class="progress-label">
        <p>[[label]]</p>
      </div>
    </div>
    <div class="progress-info">[[info]]</div>
`;
  }

  static get is() {
    return 'sh-progress-radial';
  }
  static get properties() {
    return {
      value: {
        type: Number,
        value: 0,
        reflectToAttribute: true,
        notify: true,
        observer: 'valueChanged'
      },
      label: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      info: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      role: {
        type: String,
        value: 'progressbar',
        reflectToAttribute: true,
        notify: true
      },
      size: {
        type: String,
        value: 'm',
        reflectToAttribute: true,
        notify: true,
        observer: 'sizeChanged'
      },
      width: {
        type: Number,
        value: 64
      },
      circlePath: {
        type: String,
        notify: true,
        value: ''
      },
      strokeDashArray: {
        type: String,
        notify: true,
        value: ''
      },
      circumference: {
        type: String,
        notify: true,
        value: ''
      },
      header: {
        type: String,
        notify: true,
        reflectToAttribute: true
      },
      color: {
        type: String,
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  // helper function to get circle path coordinates
  // A circle path is basically description how to build a circle from lines
  getCirclePath(diameter) {
    const radius = diameter / 2;
    if (diameter === 256) {
      return 'M' + radius + ' 6' +
        ' a ' + (radius - 6) + ' ' + (radius - 6) + ' 0 0 1 0 ' + (diameter - 12) +
        ' a ' + (radius - 6) + ' ' + (radius - 6) + ' 0 0 1 0 ' + (12 - diameter);
    }
    else {
      return 'M' + radius + ' 4' +
        ' a ' + (radius - 4) + ' ' + (radius - 4) + ' 0 0 1 0 ' + (diameter - 8) +
        ' a ' + (radius - 4) + ' ' + (radius - 4) + ' 0 0 1 0 ' + (8 - diameter);
    }
  }

  // returns circumference from a diameter
  getCircumference(diameter) {
    const circumference = Math.round((diameter - 8) * 3.14159);
    return String(circumference);
  }

  // returns stroke dasharray
  // stroke dasharray contains dash value (think of it as percentage of area covered) and offset(over a total area)
  // but since the user enters value form 0-100 we need to convert that to relative value as percentage area covered and then
  // return that as string here. That's what we are doing below.
  getStrokeDashArray(value, circumference) {
    const dasharray = value / 100 * circumference;
    return dasharray + ', ' + circumference;
  }

  sizeChanged() {
    if (this.size === 's') {
      this.width = 32;
    }
    if (this.size === 'm') {
      this.width = 64;
    }
    if (this.size === 'l') {
      this.width = 128;
    }
    if (this.size === 'xl') {
      this.width = 256;
    }
    this.valueChanged(this.value);
  }


  valueChanged(newVal) {
    this.circlePath = this.getCirclePath(this.width);
    this.circumference = this.getCircumference(this.width);
    this.strokeDashArray = this.getStrokeDashArray(newVal, this.circumference);

    // IE fallback
    // IE updates the values but doesn't redraw svg based on new values
    // This block forces it to redraw svg
    this.shadowRoot.querySelector('.progress-ring__background').setAttribute('d', this.circlePath);
    this.shadowRoot.querySelector('.progress-ring__background').setAttribute('stroke-array', '' + this.circumference + ', ' + this.circumference);
    this.shadowRoot.querySelector('.progress-ring__circle').setAttribute('stroke-array', this.strokeDashArray);
  }

  ready() {
    super.ready();

    // calcuate circle path and draw it.

    // builds circle path
    this.circlePath = this.getCirclePath(this.width);
    // set circumference (needed to calculate current path value and total path value)
    this.circumference = this.getCircumference(this.width);
    // this generates values needed for stroke dash array
    this.strokeDashArray = this.getStrokeDashArray(this.value, this.circumference);
  }

}
window.customElements.define(SHProgressRadial.is, SHProgressRadial);
