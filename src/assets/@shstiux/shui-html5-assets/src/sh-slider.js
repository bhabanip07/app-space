/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

// thumb radius
//14px thumb width
// 6px tick
const THUMB_RADIUS = 7;
const TICK_RADIUS = 3;

class ShSlider extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        width: 100%;
        outline: 0;
        display: block;
      }
      :host([vertical]) {
        width:32px;
        height: 100%;
      }

      :host([vertical][right]) {
        float: right;
      }

      :host .vertical-wrapper,
      :host([show-range]) .outer-wrapper,
      :host([vertical]) .outer-wrapper,
      :host([show-range]) #inputText,
      :host .value-separator,
      :host #lowerInputText,
      :host #upperInputText,
      :host .lower-thumb,
      :host .upper-thumb,
      :host .range-wrapper{
        display: none;
      }
      :host([show-range][show-value]) #lowerInputText,
      :host([show-range][show-value]) #upperInputText,
      :host([show-range][show-value]) .value-separator,
      :host([show-range]) .lower-thumb,
      :host([show-range]) .upper-thumb,
      :host([show-range]) .range-wrapper{
        display:block;
      }
      :host([vertical]) .vertical-wrapper{
        display: flex;
        width: fit-content;
        height: inherit;
        flex-direction: column;
        align-items: center;
      }

      :host([vertical]) .vertical-slider-wrapper{
        display: flex;
        height: inherit;
        flex-direction: column;
        align-items: center;
      }

      :host .outer-wrapper{
        position: relative;
        display: block;
      }

      :host([show-range]) .range-wrapper,
      :host .sliderWrapper {
        position: relative;
        cursor: pointer;
        width: calc(100% - 16px);
        margin: 0 8px;
        height: 32px;
        outline: none;
        display: flex;
      }

      :host([vertical]) .verticalSliderWrapper{
        width: 32px;
        height: calc(100% - 24px);
        position: relative;
        cursor: pointer;
        display: flex;
      }

      :host([vertical]) #inputLabel input{
        width: 50% !important;
        background: transparent;
        border: none;
        text-align: right;
        font: var(--body-1);
        line-height: 16px;
        height: 16px;
        padding: 0 !important;
        outline: none;
        color: var(--text-secondary);
      }

      :host([vertical]) #inputLabel input:focus {
        width: 100% !important;
      }

      :host([vertical]) #inputLabel span {
        width: 50%;
        font: var(--body-1);
        line-height: 16px;
        height: 16px;
        color: rgba(var(--ui-1), var(--opacity-5));
        margin-left: 2px;
      }
      :host([show-range]) .range-track,
      :host .sliderTrack {
        width: calc(100% + 16px);
        margin-left: -8px;
        height: 2px;
        outline:0;
        background-color: rgba(var(--ui-1), var(--opacity-6));
        cursor: pointer;
        position: absolute;
        -moz-appearance: none;
        -webkit-appearance: none;
        margin-top: 15px;
      }

      :host([vertical]) .vertical-track{
        width: 2px;
        height: 100%;
        outline:0;
        background-color: rgba(var(--ui-1), var(--opacity-6));
        cursor: pointer;
        position: absolute;
        -moz-appearance: none;
        -webkit-appearance: none;
        margin: 0 auto;
        left: 0;
        right: 0;
      }

      :host([show-range]) .handle-track {
        height: 2px;
        background: rgba(var(--ui-5), var(--opacity-1));
        cursor: pointer;
        margin-top: 15px;
      }

      :host([vertical]) .vertical-thumb,
      :host([show-range]) .lower-thumb,
      :host([show-range]) .upper-thumb,
      :host .sliderThumb {
        width: 14px;
        height: 14px;
        cursor: pointer;
        border-radius: 50%;
        outline:0;
        background: rgba(var(--ui-5), var(--opacity-1));
        position: absolute;
        top: 8px;
        margin-left: -7px;
        -moz-appearance: none;
        -webkit-appearance: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }

      :host([vertical]) .vertical-thumb {
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        transition: top 100ms ease-out;
      }

      :host([vertical]) .vertical-thumb:hover ,
      :host([vertical]) .vertical-thumb:focus,
      :host([show-range]) .lower-thumb:hover ,
      :host([show-range]) .lower-thumb:focus,
      :host([show-range]) .upper-thumb:hover ,
      :host([show-range]) .upper-thumb:focus,
      :host .sliderThumb:hover ,
      :host .sliderThumb:focus,
      :host([show-range]) .handle-track.hover,
      :host([show-range]) .lower-thumb.hover,
      :host([show-range]) .upper-thumb.hover,
      :host .sliderThumb.hover,
      :host([show-range]) .handle-track.active,
      :host([show-range]) .lower-thumb.active,
      :host([show-range]) .upper-thumb.active,
      :host .sliderThumb.active {
        background: rgba(var(--ui-2), var(--opacity-1)) !important;
        position: absolute;
        left: 0;
        -moz-appearance: none;
        -webkit-appearance: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }
      :host([vertical]) .vertical-thumb:active {
        background: rgba(var(--ui-2), 1);
        -moz-appearance: none;
        -webkit-appearance: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;

      }

      :host([show-range]) .handle-track-wrapper:hover .handle-track,
      :host([show-range]) .handle-track-wrapper:active .handle-track,
      :host([show-range]) .handle-track-wrapper:focus .handle-track,
      :host([show-range]) .handle-track-wrapper:hover .lower-thumb,
      :host([show-range]) .handle-track-wrapper:active .lower-thumb,
      :host([show-range]) .handle-track-wrapper:focus .lower-thumb,
      :host([show-range]) .handle-track-wrapper:hover .upper-thumb,
      :host([show-range]) .handle-track-wrapper:active .upper-thumb,
      :host([show-range]) .handle-track-wrapper:focus .upper-thumb{
        background: rgba(var(--ui-2), var(--opacity-1));
      }

      .value-separator {
        height: 24px !important;
        width: 12px !important;
        text-align: center;
        line-height: 24px;
        color: rgba(var(--ui-5), var(--opacity-1));
      }

      /* common styles */
      .label-wrapper {
        display: flex;
      }

      .slider-label {
        flex: 1;
        font: var(--body-1);
        line-height: 24px !important;
        font-weight: normal;
        color: var(--text-secondary);
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: .2s all ease-in-out;
      }

      .label-wrapper input {
        display: none;
        outline: 0;
        border: none;
        width: 40px;
        height: 24px;
        font: var(--body-1);
        line-height: 24px !important;
        color: var(--text-secondary);
        background: rgba(var(--ui-1), var(--opacity-7));
        border-radius: 2px;
        box-sizing: border-box;
        padding: 4px;
        transition: .2s all ease-in-out;
        text-align: center;
      }
      .handle-track-wrapper {
        height: 32px;
        position:absolute
      }
      .vertical-control,
      .adjustment-control {
        display:none;
      }

      input::-webkit-inner-spin-button {
        display: none;
      }

      :host(:not([label])) .label-wrapper {
        display: none;
      }
      :host([show-value]) .label-wrapper input {
        display: inline-flex;
      }

      :host([show-value][vertical]) .label-wrapper input,
      :host([show-controls]) .label-wrapper input {
        display: none;
      }

      /* Disabled Styles */
      :host([disabled]) {
        pointer-events: none;
      }

      :host([disabled]) #verticalThumb,
      :host([disabled]) #upperThumb,
      :host([disabled]) #lowerThumb,
      :host([disabled]) #handleTrack,
      :host([disabled]) #thumb {
        background: rgba(var(--ui-6), var(--opacity-1));
      }
      :host([disabled]) #verticalTrack,
      :host([disabled]) #rangeTrack,
      :host([disabled]) #track {
        background: rgba(var(--ui-1), var(--opacity-7));
      }

      :host([disabled]) .slider-label,
      :host([disabled]) .label-wrapper input {
        color: var(--text-disabled);
      }

      :host([disabled]) .sh-thumb-item {
        background: rgba(var(--ui-1), var(--opacity-4));
      }


      /* Adjustment controls styles */
      :host([show-controls]) .sliderTrack {
        width: calc(100% - 36px);
      }

      :host([show-controls][vertical]) .vertical-wrapper {
        height: calc(100% - 24px);
      }

      :host([show-controls]) .adjustment-control {
        display:flex;
        position:absolute;
        right:-12px;
        top:-1px;
      }
      :host([show-controls][vertical]) .vertical-control{
        display: flex;
        flex-direction: column;
        min-height: 64px;
      }
      :host([disabled]) #plus,:host([disabled]) #minus {
        color:rgba(var(--ui-1),var(--opacity-5)) !important
      }

      /* Tooltip styles */

      :host([show-value]) #sliderTooltip {
        display: none !important;
      }

      #verticalTooltip,
      #lowerRangeTooltip,
      #upperRangeTooltip,
      #sliderTooltip {
        display: none;
        position: absolute;
        outline:0;
        top: -32px;
        left: -12px;
        width: 40px;
        height: 24px;
        font: var(--body-1);
        text-align: center;
        color: var(--text-secondary);
        background: var(--base-3);
        transition: .2s all ease-in-out;
        box-shadow: var(--shadow-raised);
        border-radius: 2px;
        box-sizing: border-box;
        padding: 4px;
        margin: -8% 1%;
        z-index: 5;
      }

      :host .sh-thumb-item {
        width: 1px;
        height: 1px;
        cursor: pointer;
        border-radius: 50%;
        outline:0;
        background: rgba(var(--ui-1), var(--opacity-1));
        margin-top: 10px;
        -moz-appearance: none;
        -webkit-appearance: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }
      .ticks-list{
        position: absolute;
        margin: 0;
        padding: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.2s ease-in-out;
      }
      .ticks-list li {
        height: 6px !important;
        width: 6px !important;
        -moz-user-select: none;
        -webkit-user-select: none;
        list-style: none !important;;
        position: absolute !important;;
        margin:0 !important;
        z-index: 0;
      }

      .ticks-list li:hover {
        height: 8px !important;
        width: 8px !important;
        background: var(--support-4) !important;
        -moz-user-select: none;
        -webkit-user-select: none;
        list-style: none !important;
        position: absolute !important;
        margin:0 !important;
        z-index: 0;
      }
      .ticks-list li:active {
        height: 6px !important;
        width: 6px !important;
        -moz-user-select: none;
        -webkit-user-select: none;
        list-style: none !important;;
        position: absolute !important;;
        margin:0 !important;
        z-index: 0;
      }
      :host(:not([show-value])) #inputLabel {
        display: none;
      }
      #inputLabel {
        background-color: rgba(var(--ui-1), var(--opacity-7));
        border-radius: 2px;
        margin: auto;
        margin-bottom: 16px;
        max-width: 72px;
        min-width: 56px;
        display: inline-flex;
        padding: 4px !important;
        box-sizing: border-box;
        vertical-align: middle !important;
      }

      #verticalTooltip {
        top: -8px;
        left: 24px;
      }

      :host([vertical][right]) #verticalTooltip {
        top: -6px;
        left: -50px;
      }

      :host([show-range]) .lower-thumb:active #lowerRangeTooltip,
      :host([show-range]) .lower-thumb:hover #lowerRangeTooltip,
      :host([show-range]) .lower-thumb:focus #lowerRangeTooltip,
      :host([show-range]) .lower-thumb.hover #lowerRangeTooltip,
      :host([show-range]) .lower-thumb.active #lowerRangeTooltip {
        z-index: 1;
      }

      .sliderThumb:active #sliderTooltip,
      :host(:hover) #sliderTooltip,
      #label-wrapper:hover #sliderTooltip,
      :host(.hover) #sliderTooltip,
      #label-wrapper.hover #sliderTooltip,
      .sliderThumb.active #sliderTooltip {
        display: block;
      }

      :host(.testing), :host(.testing) *,
      :host(.testing) *:before, :host(.testing) *:after,
      :host(.testing), :host(.testing) *,
      :host(.testing.hover), :host(.testing.hover) *,
      :host(.testing) *.hover *, :host(.testing) *.active *,
      :host(.testing.active), :host(.testing.active) *,
      :host(.testing) *.hover, :host(.testing) *.active {
        transition : 0s all linear !important;
      }
    </style>

    <div class="label-wrapper">
      <div class="slider-label">[[label]]</div>
      <input id="inputText" type="text" value="{{value::input}}" on-keyup="_validateInput" on-keydown="_incrementDecrement"  on-blur="_restoreValidation" maxlength="4">
      <input id="lowerInputText" type="text" on-keyup="_redirectValidateInput" on-blur="_restoreValidation" maxlength="4" on-keydown="_incrementDecrement">
      <span class="value-separator"> - </span>
      <input id="upperInputText" type="text" on-keyup="_redirectValidateInput" on-blur="_restoreValidation" maxlength="4" on-keydown="_incrementDecrement">
    </div>

    <!-- slider implementation with adjustment controls -->
    <div class="outer-wrapper">
      <div id="slider" class="sliderWrapper" min="[[min]]" max="[[max]]" label="[[label]]" step="[[step]]" on-touchstart="_moveThumbOnTrack" on-click="_moveThumbOnTrack">
        <div id="track" class="sliderTrack" on-click="_moveThumbOnTrack" on-touchstart="_moveThumbOnTrack"></div>
        <div id="thumb" class="sliderThumb" on-mousedown="_thumbDown" on-touchstart="_thumbDown">
          <div id="sliderTooltip">{{value}}</div>
        </div>
      </div>
      <div class="adjustment-control">
          <span><sh-icon id="minus" icon="left-s" button on-click="_handleMinus" on-touchstart="_handleMinus"></sh-icon></span>
          <span><sh-icon id="plus" icon="right-s" button on-click="_handlePlus" on-touchstart="_handlePlus"></sh-icon></span>
      </div>
    </div>

    <!-- range slider implementation -->
    <div id="range" class="range-wrapper" on-click="_moveThumbOnRangeTrack" on-touchstart="_moveThumbOnRangeTrack">
      <div id="rangeTrack" class="range-track" on-click="_moveThumbOnRangeTrack"  on-touchstart="_moveThumbOnRangeTrack"></div>
      <div id="handleTrackWrapper" class="handle-track-wrapper" on-mousedown="_thumbDown" on-touchstart="_thumbDown">
      <div id="handleTrack" class="handle-track" on-mousedown="_thumbDown" on-touchstart="_thumbDown"></div>
      </div>
      <div id="lowerThumb" class="lower-thumb" on-mousedown="_thumbDown" on-touchstart="_thumbDown">
        <div id="lowerRangeTooltip">{{lowerValue}}</div>
      </div>
      <div id="upperThumb" class="upper-thumb" on-mousedown="_thumbDown" on-touchstart="_thumbDown">
        <div id="upperRangeTooltip">{{upperValue}}</div>
      </div>
    </div>

    <!-- vertical slider implementation -->
    <div class="vertical-slider-wrapper">
    <div class="vertical-wrapper">
      <div id="inputLabel">
        <input id="verticalInput"  value="{{value::input}}" on-keyup="_validateInput" on-keydown="_incrementDecrement"  on-blur="_restoreValidation">
        <span id="verticalMax">/[[max]]</span>
      </div>
      <div id="verticalSlider" class="verticalSliderWrapper" min="[[min]]" max="[[max]]"
      label="[[label]]" step="[[step]]" on-click="_moveThumbOnTrack"  on-touchstart="_moveThumbOnTrack">
        <div id="verticalTrack" class="vertical-track" on-click="_moveThumbOnTrack"  on-touchstart="_moveThumbOnTrack">
          <ul id="ticks_list" class="ticks-list">
            <template class="ticksThumbWrapper" is="dom-repeat" items="{{rendered_ticks}}">
              <li class="sh-thumb-item" on-click="_handleClick" data-idx={{item.position}} style="{{item.style}}"></li>
            </template>
          </ul>
      </div>
        <div id="verticalThumb" class="vertical-thumb" on-mousedown="_thumbDown" on-touchstart="_thumbDown">
          <div id="verticalTooltip">{{value}}</div>
        </div>
      </div>
    </div>
    <div class="vertical-control">
          <span><sh-icon id="minus" icon="up-s" button on-click="_handleMinus" on-touchstart="_handleMinus"></sh-icon></span>
          <span><sh-icon id="plus" icon="down-s" button on-click="_handlePlus"  on-touchstart="_handlePlus"></sh-icon></span>
      </div>
    </div>
`;
  }

  static get is() {
    return 'sh-slider';
  }
  static get properties() {
    return {
      value: {
        type: Number,
        value: 0,
        notify: true,
        reflectToAttribute: true,
        observer: '_calcLeft'
      },
      lowerValue: {
        type: Number,
        value: 0,
        notify: true,
        reflectToAttribute: true,
        observer: '_calcLeft'
      },
      upperValue: {
        type: Number,
        value: 0,
        notify: true,
        reflectToAttribute: true,
        observer: '_calcLeft'
      },
      min: {
        type: Number,
        value: 0,
        notify: true,
        reflectToAttribute: true
      },
      max: {
        type: Number,
        value: 100,
        notify: true,
        reflectToAttribute: true
      },
      step: {
        type: Number,
        value: 1,
        notify: true,
        reflectToAttribute: true
      },
      isDrag: {
        type: Boolean,
        value: false
      },
      label: {
        type: String,
        value: 'Label',
        notify: true,
        reflectToAttribute: true
      },
      showValue: {
        type: Boolean,
        value: false
      },
      showControls: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      showRange: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      role: {
        type: String,
        value: 'slider',
        reflectToAttribute: true
      },
      selectedThumb: {
        type: String,
        value: 'thumb'
      },
      vertical: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      right: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      ticks: {
        type: Array,
        notify: true,
        value() {
          return []
        },
        observer: '_renderTicks',
        reflectToAttribute: true
      },
      _browserResized: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true,
        observer: 'browserResizeObserver'
      }
    };
  }

  ready() {
    super.ready();
    if(this.value > 0 && !this.vertical) {
      this._calcLeft();
    }

    if(this.vertical && this.value > 0){
        this.selectedThumb='verticalThumb';
        this._calcLeft();
    }

    if(this.showRange){
        if (this.lowerValue > 0 ) {
        this.selectedThumb ='lowerThumb';
        this._calcLeft();
      }
      if( this.upperValue > 0){
        this.selectedThumb='upperThumb';
        this._calcLeft();
      }
    }
    if (this.step > 0) {
        this._calcStep(this.value);
    }
    if (!this.showValue) {
      this.addEventListener('mouseover', function () {
        if(this.vertical) {
          this.$.verticalTooltip.style.display = 'block';
        }
        if(!this.showRange) {
          this.$.sliderTooltip.style.display = 'block';
        }
        else {
          this.$.lowerRangeTooltip.style.display = 'block';
          this.$.upperRangeTooltip.style.display = 'block';
        }
      });
      this.addEventListener('mouseout', function () {
        if(this.vertical) {
          this.$.verticalTooltip.style.display = '';
        }
        if(!this.showRange) {
          this.$.sliderTooltip.style.display = 'none';
        }
        else {
          this.$.lowerRangeTooltip.style.display = '';
          this.$.upperRangeTooltip.style.display = '';
        }
      });
    }
    if(!this.disabled) {
      this.$.thumb.setAttribute('tabindex', 0);
    }
    if(this.disabled) {
      this.$.inputText.setAttribute('tabindex', '-1');
    }
    if(this.showRange) {
      this._handleTrack();
    }

      window.setTimeout(() => {
        this._renderTicks();
      }, 100);
      this.$.verticalInput.style.width = this.$.verticalInput.value.length + 1 + 'ch';
      this.$.verticalInput.style.paddingLeft = '4px';
  }

  constructor() {
    super();
    let self, lowStable, highStable, stableValue, zoom, _zoomSet;
    self = this;
    zoom = 1;
    _zoomSet = true;
    //binding the dom to have access to the polymer element
    this.boundMove = this._thumbMove.bind(this);
    this.boundUp = this._thumbUp.bind(this);

    let upevt, downevt, enterPress;
    upevt = new KeyboardEvent('keydown', {'keyCode':38, 'which':38});
    downevt = new KeyboardEvent('keydown', {'keyCode':40, 'which':40});
    enterPress = new KeyboardEvent('keyup', {'keyCode':13, 'which':13});

    let htmlDocument, config;
    // dynamic monitoring of zoom state of HTML Tag
    htmlDocument = document.documentElement;

    //   monitoring values
    config = { attributes: true};

    // Callback function to execute when mutations are observed
    let zoomCallback, attributeChangeCallback;
    zoomCallback = function(mutationList) {
      let mutation;
      for(mutation of mutationList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            self._calcStep(self.value);
            self._calcLeft();
            self._renderTicks();
            if(self.showRange) {
              setTimeout(function(){
                self.$.lowerInputText.dispatchEvent(enterPress);
                self.$.upperInputText.dispatchEvent(upevt);
                self.$.upperInputText.dispatchEvent(downevt);
                self.$.upperInputText.blur();

                clearTimeout();
              }, 200);
            }
            self._zoomSet = false;
        }
      }
    };
    attributeChangeCallback = function(mutationList) {
      let mutation;
      for(mutation of mutationList) {
        if (mutation.type === 'attributes') {
          self._calcStep(self.value);
          self._calcLeft();
          self._renderTicks();
        }
      }
    };
    let htmlZoomObserver, attributeObserver;
    htmlZoomObserver = new MutationObserver(zoomCallback);
    attributeObserver = new MutationObserver(attributeChangeCallback);
    htmlZoomObserver.observe(htmlDocument, config);
    attributeObserver.observe(self, config);
  }


  _renderTicks(){
    let container_height, max;
    container_height = this.$.verticalTrack.offsetHeight;
    max = this.max;
    // rendered_ticks is an array that holds style values (top position) for each tick rendered
    // this is used in the dom-repeat above to create ticks based on the passed top position for each tick.
    this.rendered_ticks = this.ticks.map(function(value){
      let current_position = value/max;
      current_position = Math.round(current_position*container_height) - TICK_RADIUS;
      let style;
      style = `top: ${current_position}px`;
      return {style, position: value };
    });
  }

  connectedCallback() {
    let self;
    self = this;
    //accessing the window events
    super.connectedCallback();
    if(getComputedStyle(document.documentElement).zoom !== 1 && getComputedStyle(document.documentElement).zoom !== undefined) {
      self._zoomSet = false;
    }
    window.addEventListener('mousemove', this.boundMove);
    window.addEventListener('mouseup', this.boundUp);
    this.addEventListener('touchmove', this.boundMove);
    this.addEventListener('touchend', this.boundUp);
    this.$.thumb.addEventListener('focus', function(){
      this.onkeyup =function(e){
        if(e.keyCode === 9){
          this.style.outline = '2px solid rgb(59, 153, 252)';
          self.$.sliderTooltip.style.display = 'block';
        }
        if(e.keyCode === 39){
          self._handlePlus();
        }
        if(e.keyCode === 37){
          self._handleMinus();
        }
      };
    });
    this.$.thumb.addEventListener('blur', function(){
      this.style.outline = '';
      self.$.sliderTooltip.style.display = '';
    });

    this.$.verticalThumb.addEventListener('focus', function(){
      this.onkeyup =function(e){
        if(e.keyCode === 9){
          this.style.outline = '2px solid rgb(59, 153, 252)';
          self.$.sliderTooltip.style.display = 'block';
        }
        if(e.keyCode === 39){
          self._handlePlus();
        }
        if(e.keyCode === 37){
          self._handleMinus();
        }
      };
    });

    window.addEventListener('resize', function(){
      self._browserResized = true;
      self._browserResized = false;
      self._calcLeft();
      if(self.showRange){
        if(self.selectedThumb === 'upperThumb') {
          self.selectedThumb = 'lowerThumb';
        }
        else {
          self.selectedThumb = 'upperThumb';
        }
        self._calcLeft();
      }
    });

    this.$.verticalTrack.addEventListener('mouseover', function(){
      self.$.lowerThumb.style.background = 'rgba(var(--ui-2), var(--opacity-1))';
      self.$.upperThumb.style.background = 'rgba(var(--ui-2), var(--opacity-1))';
    });
    this.$.handleTrackWrapper.addEventListener('mouseout', function(){
      self.$.lowerThumb.style.background = '';
      self.$.upperThumb.style.background = '';
    });

    this.$.verticalInput.addEventListener('click', function(){
      self.verticalInputClick();
    });
    this.$.verticalInput.addEventListener('focusout', function(){
      self.verticalInputFocusOut();
    });

    this.$.verticalMax.addEventListener('click', function(){
      self.verticalInputClick();
    });
    this.$.verticalMax.addEventListener('focusout', function(){
      self.verticalInputFocusOut();
    });

    if(this.showRange) {
      if(this.lowerValue <= this.upperValue && this.lowerValue >=this.min && this.lowerValue <= this.max && this.upperValue >= this.min && this.upperValue <= this.max){
        self.lowStable = this.lowerValue;
        self.highStable = this.upperValue;
      }
    }
    else {
      if(this.value >= this.min && this.value <= this.max) {
        self.stableValue = this.value;
      }
    }
    if(this.vertical){
        this.selectedThumb='verticalThumb';
        this._calcLeft();
    }
  }

  verticalInputClick(){
    this.$.verticalMax.style.visibility = 'hidden';
    this.$.verticalMax.style.width = '0%';
    this.$.verticalInput.style.textAlign = 'center';
    this.$.verticalInput.focus();
  }

  verticalInputFocusOut(){
    this.$.verticalInput.style.width = this.$.verticalInput.value.length + 'ch';
    this.$.verticalMax.style.visibility = 'visible';
    this.$.verticalInput.style.textAlign = 'right';
    this.$.verticalMax.style.width = '50%';
  }

  _moveThumbOnTrack(e) {
    if(e.touches) {
      e.preventDefault();
    }
    this._calcPosInTrack(e);
    if (!(this.selectedThumb === 'handleTrackWrapper' || this.selectedThumb === 'handleTrack')){
      this._calcValue();
    }
    else {
      this._adjustThumbPosToHandle(e);
    }

    // light up the ticks on overlap
    if (this.vertical){
      for( let i=0; i<this.ticks.length; i++){
        if (this.value === this.ticks[i]){
          this.$.verticalThumb.style.backgroundColor = 'var(--support-4)';
          this.$.ticks_list.children[i].style.backgroundColor = 'var(--support-4)';
          break;
        }
        else {
          this.$.verticalThumb.style.backgroundColor = 'rgba(var(--ui-5), var(--opacity-1))';
          this.$.ticks_list.children[i].style.backgroundColor = 'rgba(var(--ui-1), var(--opacity-1))';
        }
      }
    }
  }

  _moveThumbOnRangeTrack(e){
    if(e.touches) {
      e.preventDefault();
    }
    let self;
    self = this;
    if(self._zoomSet === false) {
     self.zoom = getComputedStyle(document.documentElement).zoom/ window.devicePixelRatio;
     if(Number.isNaN(self.zoom)) {
      self.zoom = Number(getComputedStyle(document.documentElement).msContentZoomLimitMin.toString().split('%')[0]) / window.devicePixelRatio;
     }
    }
    else{
      self.zoom = 1;
    }
    if(!this.isDrag){
      let moveFlag, offset, pointOnTrack, upPos, lowPos;
      moveFlag = false;
      offset = this.$.rangeTrack.getBoundingClientRect();
      pointOnTrack = e.clientX/self.zoom - offset.left;
      upPos = parseFloat(this.$.upperThumb.style.left.split('p')[0]);
      lowPos = parseFloat(this.$.lowerThumb.style.left.split('p')[0]);
      if(pointOnTrack > upPos ){
        moveFlag= true;
        this.selectedThumb = 'upperThumb';
      }
      if (pointOnTrack < lowPos ){
        moveFlag= true;
        this.selectedThumb = 'lowerThumb';
      }
      if(moveFlag) {
        this._moveThumbOnTrack(e);
      }
    }
  }

  _setThumbToPos(newThumbPos) {
    let thumbId, thumb;
    thumbId = this.selectedThumb;
    if (thumbId === 'handleTrack') {
        thumbId = 'handleTrackWrapper';
    }
    thumb = this.shadowRoot.querySelector('#'+thumbId);
    if (!this.vertical) {
      thumb.style.left = newThumbPos + 'px';
    }
    else {
      thumb.style.top = newThumbPos + 'px';
    }
  }

  _adjustThumbPosToHandle(){
    let thumbleftValues, newValues, trackWidth, handleLeft, handleWidth;
    thumbleftValues = [];
    newValues = [];
    trackWidth = window.getComputedStyle(this.$.rangeTrack).width.split('p')[0] - THUMB_RADIUS;
    handleLeft = this.$.handleTrackWrapper.style.left.split('p')[0];
    handleWidth = this.$.handleTrackWrapper.style.width.split('p')[0];

    this.$.lowerThumb.style.left = parseFloat(handleLeft) + 'px' ;
    this.$.upperThumb.style.left = parseFloat(handleLeft) + parseFloat(handleWidth) + 'px';

    thumbleftValues.push(this.$.lowerThumb.style.left.split('p')[0]);
    thumbleftValues.push(this.$.upperThumb.style.left.split('p')[0]);
    for(let i=0;i<thumbleftValues.length;i++){
      let posVal;
      posVal = Math.round(thumbleftValues[i] / trackWidth * 100);
      newValues.push(Math.round(posVal * (this.max - this.min) / 100 + this.min));
    }
    this.lowerValue = newValues[0];
    this.upperValue = newValues[1];
    this.$.lowerInputText.value = this.lowerValue;
    this.$.upperInputText.value = this.upperValue;
    if (this.step > 0) {
      this._calcStep(this.value);
    }
  }

  _calcValue() {
    let divisor;
    if(!this.showRange) {
      divisor = window.getComputedStyle(this.$.track).width.split('p')[0];
    }
    else {
      divisor = window.getComputedStyle(this.$.rangeTrack).width.split('p')[0];
    }

    let thumbId, thumb, dividend;
    thumbId = this.selectedThumb;
    thumb = this.shadowRoot.querySelector('#'+thumbId);
    dividend = parseFloat(thumb.style.left.split('p')[0]);

    //changing the values of dividend and divisor to calculate value for vertical slider changes
    if(this.vertical){
      divisor = window.getComputedStyle(this.$.verticalTrack).height.split('p')[0];
      dividend = parseFloat(thumb.style.top.split('p')[0]);
    }
    let posValue, tempVal;
    posValue = Math.round(dividend / divisor * 100);
    tempVal = Math.round(posValue * (this.max - this.min) / 100 + this.min);


    if(this.selectedThumb === 'lowerThumb') {
      if(tempVal <=this.upperValue) {
        this.lowerValue = tempVal;
      }
      else {
        this.lowerValue = this.upperValue;
      }
    }
    if(this.selectedThumb === 'upperThumb') {
      if(tempVal >= this.lowerValue) {
        this.upperValue = tempVal;
      }
      else {
        this.upperValue = this.lowerValue;
      }
    }
    if (this.step > 0) {
      this._calcStep(tempVal);
    }
    if(this.showRange){
      this._handleTrack();
    }
    else{
      this.value = this.value;
    }
  }

  _handleTrack() {
    let lowerLeft, upperLeft, lower, upper;
    lowerLeft = this.$.lowerThumb.style.left;
    upperLeft = this.$.upperThumb.style.left;
    lower = this.$.lowerThumb.style.left.split('p')[0];
    upper = this.$.upperThumb.style.left.split('p')[0];

    if(this.showRange){
      if(Number.isNaN(lower) || lower === null || lower === '' ) {
        lower = 0;
      }
      if(Number.isNaN(upper) || upper === null || upper === '') {
        upper = 0;
      }
      if(lowerLeft !== '' || upperLeft !== '' ){
        this.$.handleTrackWrapper.style.left = lowerLeft;
        if(parseFloat(upper) === parseFloat(lower) || this.upperValue === this.lowerValue){
          this.$.handleTrackWrapper.style.width= '0px';
        }
        else {
          this.$.handleTrackWrapper.style.width = parseFloat(upper) - parseFloat(lower) + 'px';
        }
      }
    }
  }

  _calcLeft() {
    if(!(this.selectedThumb === 'handleTrackWrapper' || this.selectedThumb === 'handleTrack')){
      let posVal;
      posVal = (this.value - this.min) * 100 / (this.max - this.min);
      if(!this.showRange){
        if(this.value>this.max){
          this.value = this.max;
        }
        if(this.value<this.min){
          this.value = this.min;
        }
      }
      if(this.selectedThumb === 'lowerThumb') {
         posVal = (this.lowerValue - this.min) * 100 / (this.max - this.min);
      }
      if(this.selectedThumb === 'upperThumb') {
        posVal = (this.upperValue - this.min) * 100 / (this.max - this.min);
      }
      if(this.vertical) {
        if (posVal > 100) {
        posVal = 100;
      }
      if (posVal < 0) {
        posVal = 0;
      }
    }
      let track;
      if (!this.showRange) {
          track = window.getComputedStyle(this.$.track).width.split('p')[0];
      }
      else {
          track = window.getComputedStyle(this.$.rangeTrack).width.split('p')[0];
        }
      if (this.vertical) {
          track = window.getComputedStyle(this.$.verticalTrack).height.split('p')[0];
        }
        //constant is added so that the thumb does not fall off the track
      let newPosVal;
      newPosVal = posVal / 100 * parseFloat(track);
      newPosVal -= THUMB_RADIUS;
      this._setThumbToPos(newPosVal);
      if (this.showRange) {
        this._handleTrack();
      }
    }
    if (this.showRange) {
      if (this.selectedThumb === 'lowerThumb') {
        this.$.lowerInputText.value = this.lowerValue;
      }
      if (this.selectedThumb === 'upperThumb') {
        this.$.upperInputText.value = this.upperValue;
      }
    }
  }

  _calcStep(tempVal) {
    if (!this.showRange) {
      let diff, newVal, times, halfStep;
      diff = tempVal % this.step;
      times = Math.floor(tempVal / this.step);
      halfStep = this.step / 2;
      if(diff > halfStep) {
        newVal = this.step * (times + 1);
      }
      else {
        newVal = this.step * (times);
      }
      this.value = newVal;
    }
    else {
      let lowDiff, newlowVal, updiff, newUpVal;
      lowDiff = this.lowerValue % this.step;
      newlowVal = Math.round(this.lowerValue - lowDiff);
      updiff = this.upperValue % this.step;
      newUpVal = Math.round(this.upperValue - updiff);
      if(this.selectedThumb === 'lowerThumb') {
        this.lowerValue = newlowVal;
      }
      if(this.selectedThumb === 'upperThumb') {
        this.upperValue = newUpVal;
      }
      if(this.selectedThumb === 'handleTrackWrapper' || this.selectedThumb === 'handleTrack') {
        this.lowerValue = newlowVal;
        this.upperValue = newUpVal;
      }
    }
    this._calcLeft();
  }

  _calcPosInTrack(e) {
    let self;
    self = this;
    if(self._zoomSet === false) {
     self.zoom = getComputedStyle(document.documentElement).zoom/ window.devicePixelRatio;
     if(Number.isNaN(self.zoom)) {
      self.zoom = Number(getComputedStyle(document.documentElement).msContentZoomLimitMin.toString().split('%')[0]) / window.devicePixelRatio;
     }
    }
    else {
      self.zoom = 1;
    }
    let offset, maxLength;
    if(!this.showRange){
      offset = this.$.track.getBoundingClientRect();
      maxLength = window.getComputedStyle(this.$.track).width.split('p')[0] ;
    }
    else{
      offset = this.$.rangeTrack.getBoundingClientRect();
      maxLength = window.getComputedStyle(this.$.rangeTrack).width.split('p')[0] ;
    }
    if(this.vertical){
      offset = this.$.verticalTrack.getBoundingClientRect();
      maxLength = window.getComputedStyle(this.$.verticalTrack).height.split('p')[0] ;
    }
    let newThumbPos;
    if(!this.vertical){
      newThumbPos = e.clientX/self.zoom - offset.left;
      //check for touch input
      if (e.touches !== undefined) {
        newThumbPos = e.touches[0].clientX / self.zoom - offset.left;
      }
    }
    if(this.vertical){
      newThumbPos = e.clientY / self.zoom - offset.top;
      if (e.touches !== undefined) {
        newThumbPos = e.touches[0].clientY / self.zoom - offset.top;
      }
    }
    if(this.selectedThumb === 'handleTrackWrapper' || this.selectedThumb === 'handleTrack') {
      maxLength -= this.$.handleTrackWrapper.style.width.split('p')[0];
      maxLength -=THUMB_RADIUS;
      newThumbPos -= this.$.handleTrackWrapper.style.width.split('p')[0]/2;
    }
    //update the thumb position
    switch (newThumbPos != null) {
      case newThumbPos < 0:
        this._setThumbToPos(0);
        break;
      case newThumbPos > maxLength:
        this._setThumbToPos(maxLength);
        break;
      case newThumbPos >= 0 && newThumbPos <= maxLength:
        this._setThumbToPos(newThumbPos);
        break;
      default:
        console.log('error adjusting thumb');
    }
  }

  _thumbDown(e) {
    e.preventDefault();
    this.isDrag = true;
    document.body.style.msUserSelect = 'none';
    this.selectedThumb = e.path[0].id;
  }

  _thumbUp(e) {
    e.preventDefault();
    let self;
    self = this;
    self.isDrag = false;
    document.body.style.msUserSelect = '';
    this.$.lowerThumb.style.background = '';
    this.$.upperThumb.style.background = '';
    this.$.thumb.style.background = '';
    if(this.showRange){
      this.$.lowerRangeTooltip.style.display = '';
      this.$.upperRangeTooltip.style.display = '';
    }
    else {
        this.$.sliderTooltip.style.display = '';
    }
  }

  _thumbMove(e) {
    if (this.isDrag) {
        this._moveThumbOnTrack(e);
        if(this.selectedThumb === 'thumb'){
          this.$.thumb.style.background = 'rgba(var(--ui-2), var(--opacity-1))';
        }
        if(this.selectedThumb === 'upperThumb'){
          this.$.upperThumb.style.background = 'rgba(var(--ui-2), var(--opacity-1))';
        }
        if(this.selectedThumb === 'lowerThumb'){
          this.$.lowerThumb.style.background = 'rgba(var(--ui-2), var(--opacity-1))';
        }
        if(this.selectedThumb === 'handleTrackWrapper' || this.selectedThumb === 'handleTrack'){
          this.$.upperThumb.style.background = 'rgba(var(--ui-2), var(--opacity-1))';
          this.$.lowerThumb.style.background = 'rgba(var(--ui-2), var(--opacity-1))';
        }
          if(!this.showValue){
            if(this.showRange){
              this.$.lowerRangeTooltip.style.display = 'block';
              this.$.upperRangeTooltip.style.display = 'block';
            }
            else {
              this.$.sliderTooltip.style.display = 'block';
            }
          }
      }
  }

  _redirectValidateInput(e) {
    let self;
    self = this;
    self._validateInput(e);
  }

  /*Code block to support two way binding using on-keyup event*/
  _validateInput(e) {
    let self, input, val;
    self = this;
    input = this.$.inputText;
    if(this.vertical){
      input = this.$.verticalInput;
    }
    if(this.showRange){
      if(e.path[0].id ==='lowerInputText'){
        this.selectedThumb = 'lowerThumb';
        input = this.$.lowerInputText;
      }
      if(e.path[0].id === 'upperInputText'){
        this.selectedThumb = 'upperThumb';
        input = this.$.upperInputText;
      }
    }
    val= input.value;
    if(val[val.length-1] === '-' && val.length>1 || val.split('-').length-1>=2){
      this.value = this.min;
    }
    if (e.keyCode !== 189 && e.keyCode !== 190 && e.keyCode !== 8) {
      if (input.value !== '' || input.value !== undefined) {
        if(input.value>this.max){
          input.value=this.max;
        }
        if(input.value<this.min){
          input.value=this.min;
        }
        let len, pattern, result, control;
        len = input.value.length;
        pattern = /[0-9]/g;
        result = pattern.test(input.value[len - 1]);
        control = e.path[0];
        if (!result) {
          this.value = input.value;
          if (control.id === 'lowerInputText') {
            this.lowerValue = self.lowStable !== undefined ? self.lowStable : this.min ? this.min: 0;
            input.value = this.lowerValue;
          }
          if (control.id === 'upperInputText') {
            this.upperValue = self.highStable !== undefined ? self.highStable : this.max ? this.max: 100;
            input.value = this.upperValue;
          }
        }
      }
    }
    // If user press ENTER, then do validation
    if(e.keyCode === 13) {
      this._restoreValidation(e);
    }
  }
  _incrementDecrement(e) {
    let input = this.$.inputText;
    if(this.vertical){
      input = this.$.verticalInput;
    }
    if(this.showRange){
      if(e.path[0].id ==='lowerInputText'){
        this.selectedThumb = 'lowerThumb';
        input = this.$.lowerInputText;
      }
      if(e.path[0].id === 'upperInputText'){
        this.selectedThumb = 'upperThumb';
        input = this.$.upperInputText;
      }
    }
    if(e.keyCode === 38) {
      input.value = parseFloat(input.value) + parseFloat(this.step);
      input.blur();
      input.focus();
    }
    if(e.keyCode === 40) {
      input.value = parseFloat(input.value) - parseFloat(this.step);
      input.blur();
      input.focus();
    }
  }
  // on blur of input, do the validation, so that users will have ample time to think and enter data
  _restoreValidation(e) {
    let self;
    self = this;
    if(this.showRange) {
      let inputControl, inputControlId;
      inputControl = e.path[0];
      if(inputControl.id === 'lowerInputText') {
        inputControlId =  'lowerInputText';
      }
      else {
        inputControlId =  'upperInputText';
      }
      // Check if the input's value is in allowed range (min <= x <= max)
      if(inputControl.value >= this.min && inputControl.value <= this.max) {

        // If lower input control is greater than upper value (l > h)
        if(inputControlId === 'lowerInputText' && parseFloat(inputControl.value) > this.upperValue) {
          inputControl.value = self.lowStable !== undefined ? self.lowStable : this.min ? this.min: 0;
        }

        // If upper input control is lesser than lower value (h < l)
        if(inputControlId === 'upperInputText' && parseFloat(inputControl.value) < this.lowerValue) {
          inputControl.value = self.highStable !== undefined ? self.highStable : this.max ? this.max: 100;
        }

      }

      // If lower input control < minimum or > maximum
      if(inputControlId === 'lowerInputText' && (parseFloat(inputControl.value) < this.min || parseFloat(inputControl.value) > this.max)) {
        inputControl.value = self.lowStable !== undefined ? self.lowStable : this.min ? this.min: 0;
      }

      // If upper input control > maximum or < minimum
      if(inputControlId === 'upperInputText' && (parseFloat(inputControl.value) > this.max || parseFloat(inputControl.value) < this.min)) {
        inputControl.value = self.highStable !== undefined ? self.highStable : this.max ? this.max: 100;
      }
      // If upper input control is empty
      if(inputControlId === 'upperInputText' && inputControl.value === '') {
        if(this.max) {
         inputControl.value = this.max;
        }
        else {
        inputControl.value = 100;
        }
      }
      // If lower input control is empty
      if(inputControlId === 'lowerInputText' && inputControl.value === '') {
        if(this.min) {
          inputControl.value = this.min;
        }
        else {
          inputControl.value = 0;
        }
      }
      // update lower-value and upper-value attributes
      if(inputControlId === 'lowerInputText') {
        this.lowerValue = inputControl.value;
      }
      else {
        this.upperValue = inputControl.value;
      }

      // update lower and upper values with the values in input box
      let lowerValue, higherValue;
      lowerValue = this.$.lowerInputText.value;
      higherValue = this.$.upperInputText.value;

      // If l <= h and min <= l <= max and min <= h <= max, then l and h are stable
      if(parseFloat(lowerValue) <= parseFloat(higherValue) && parseFloat(lowerValue) >= this.min && parseFloat(lowerValue) <= this.max && parseFloat(higherValue) >= this.min && parseFloat(higherValue) <= this.max) {
        self.lowStable = parseFloat(this.lowerValue);
        self.highStable = parseFloat(this.upperValue);
      }
      // If computed number is not a number, then replace with stable values
      if(inputControlId === 'upperInputText') {
        inputControl.value = !Number.isNaN(inputControl.value) ? self.highStable : this.max ? this.max: 100;
      }
      if(inputControlId === 'lowerInputText') {
        inputControl.value = !Number.isNaN(inputControl.value) ? self.lowStable : this.min ? this.min: 0;
      }

      // Update the lower value and upper value with stable values
      this.lowerValue = this.$.lowerInputText.value;
      this.upperValue = this.$.upperInputText.value;
    }
    // If the input is a single slider
    else {
      let inputControl;
      inputControl = e.path[0];
      // If input value is less than minimum or greater than maximum (x < min or x > max)
      if(parseFloat(inputControl.value) < this.min || parseFloat(inputControl.value) > this.max) {
        inputControl.value = self.stableValue !== undefined ? self.stableValue : this.min ? this.min: 0;
      }
      // If input control value is empty
      if(inputControl.value === '') {
        if(this.min) {
          inputControl.value = this.min;
        }
        else {
          inputControl.value =  0;
        }
      }
      // Update the value attribute
      let value;
      value= inputControl.value;
      // If value is in range, (min <= x <= max), then value is stable
      if(parseFloat(value) >= this.min && parseFloat(value) <= this.max) {
        self.stableValue = parseFloat(value);
      }
      //If value is not a number, then replace input with stable values
      inputControl.value = !Number.isNaN(inputControl.value) ? self.stableValue : this.min ? this.min: 0;
      // Update the value attribute with the input value
      this.value = inputControl.value;

    }
  }

  _restoreValue(e){
    if(e.path[0].id === 'lowerInputText'){
     if(this.$.lowerInputText.value ==='' || this.$.lowerInputText.value === null || this.$.lowerInputText.value === undefined){
       this.$.lowerInputText.value = this.lowerValue;
     }
    }
    if(e.path[0].id ==='upperInputText'){
      if(this.$.upperInputText.value ==='' || this.$.upperInputText.value === null || this.$.upperInputText.value === undefined){
        this.$.upperInputText.value = this.upperValue;
      }
    }
  }

  _handleMinus(){
    if(this.value !== this.min) {
      this.value=parseFloat(this.value)-parseFloat(this.step);
    }
    if (!this.vertical) {
        this.$.thumb.focus();
      } else {
        this.$.verticalThumb.focus();
        this.checkTickThumbCollision();
      }
  }

  _handlePlus(){
    if(this.value !== this.max) {
      this.value= parseFloat(this.value)+parseFloat(this.step);
    }
      if (!this.vertical){
        this.$.thumb.focus();
      } else {
        this.$.verticalThumb.focus();
        this.checkTickThumbCollision();
      }
  }

  checkTickThumbCollision(){
     // Colour the tick in petrol color if the thumb lands on the tick
    for (let i=0; i<this.$.ticks_list.childElementCount-1;i++){
      this.$.ticks_list.children[i].style.backgroundColor = 'rgba(var(--ui-1), var(--opacity-1))';
      this.$.verticalThumb.style.backgroundColor = 'rgba(var(--ui-5), var(--opacity-1))';
    }

    for (let i=0; i<this.$.ticks_list.childElementCount-1;i++){
      if(this.value === this.ticks[i] ){
        this.$.verticalThumb.style.backgroundColor = 'var(--support-4)';
        this.$.ticks_list.children[i].style.backgroundColor = 'var(--support-4)';
        break;
      }
    }
  }

  _handleClick(ev){
    ev.stopPropagation();
    let percent, value;
    percent = (parseFloat(ev.target.style.top)+TICK_RADIUS)/this.$.verticalTrack.offsetHeight;
    value = Math.round(percent*100);
    this.value = value;
    this._calcLeft();

    this.$.verticalThumb.style.backgroundColor = 'var(--support-4)';
    for (let i=0; i<this.$.ticks_list.childElementCount-1;i++){
      this.$.ticks_list.children[i].style.backgroundColor = 'rgba(var(--ui-1), var(--opacity-1))';
    }
    ev.target.style.backgroundColor = 'var(--support-4)';
  }

  browserResizeObserver(newValue) {
    let self;
    self = this;
    if(newValue === true) {
      self.zoom = 1;
      self._zoomSet = true;
    }
  }
}
window.customElements.define(ShSlider.is, ShSlider);
