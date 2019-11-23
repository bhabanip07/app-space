/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import Chart from 'chart.js';

class SHChart extends PolymerElement {
  static get template() {
    return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
      }
      .chart-parent {
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        display: flex;
        flex: 1;
        position: relative;
      }
    </style>

    <!--HTML-->
    <div class="chart-parent">
      <canvas id="chart-wrapper" width="0" height="0"></canvas>
    </div>
`;
  }

  static get is() {
    return 'sh-chart';
  }
  static get properties() {
    return {
      type: {
        type: String,
        value: 'line',
        observer: '_createChart',
        reflectToAttribute: true,
        notify: true
      },
      legend: {
        type: Boolean,
        value: false,
        observer: '_createChart',
        reflectToAttribute: true,
        notify: true
      },
      data: {
        type: Object,
        observer: '_createChart',
        reflectToAttribute: true,
        notify: true
      },
      chartData: {
        type: Object
      }
    }
  }

  ready() {
    super.ready();

    // resize chart once on load
    setTimeout(function(){
      let id;
      for (id in Chart.instances) {
        if(Chart.instances.hasOwnProperty(id)) {
           Chart.instances[id].resize();
        }
      }
    }, 1);

    this._createChart();
  }

  _setChart() {
    // set default attributes on load
    let _this, sets;
    _this = this;
    if(this.data === null || this.data === undefined) {
      return;
    }
    sets = this.data.datasets.length;
    for (let i = 0; i < sets; i++) {
      // default values for customizable dataset attributes
      if (_this.data.datasets[i].label === undefined) {
        _this.data.datasets[i].label = 'Dataset Label';
      }
      if (_this.data.datasets[i].color === undefined) {
        if (_this.type !== 'pie' && _this.type !== 'doughnut' && sets > 1) {
          if (i === 0) {_this.data.datasets[i].color = 'rgba(50,158,188,1)'; }
          if (i === 1) {_this.data.datasets[i].color = 'rgba(139,50,188,.8)'; }
          if (i === 2) {_this.data.datasets[i].color = 'rgba(50,188,77,.8)'; }
          if (i === 3) {_this.data.datasets[i].color = 'rgba(50,188,167,.8)'; }
          if (i === 4) {_this.data.datasets[i].color = 'rgba(50,144,188,.8)'; }
          if (i === 5) {_this.data.datasets[i].color = 'rgba(188,50,115,.8)'; }
        } else {
          _this.data.datasets[i].color = ['rgba(50,158,188,.8)', 'rgba(139,50,188,.8)', 'rgba(50,188,77,.8)', 'rgba(50,188,167,.8)', 'rgba(50,144,188,.8)', 'rgba(188,50,115,.8)'];
        }
      }
      if (_this.data.datasets[i].fill === undefined) {
        _this.data.datasets[i].fill = false;
      }
      // default values for fixed dataset attributes
      this.data.datasets[i].lineTension = 0.4
      this.data.datasets[i].pointBorderColor = 'transparent';
      this.data.datasets[i].pointRadius = 4;
      this.data.datasets[i].pointHoverRadius = 8;
      this.data.datasets[i].pointHitRadius = 4;
      this.data.datasets[i].backgroundColor = this.data.datasets[i].color;
      this.data.datasets[i].hoverBackgroundColor = this.data.datasets[i].color;
      this.data.datasets[i].pointBackgroundColor = this.data.datasets[i].color;
      this.data.datasets[i].pointHoverBackgroundColor = this.data.datasets[i].color;
      this.data.datasets[i].borderColor = this.data.datasets[i].color;

      if (this.type === 'line' || this.type === 'radar' || this.type === 'pie' || this.type === 'doughnut') {
        this.data.datasets[i].borderWidth = 2;
        if(this.type === 'pie' || this.type === 'doughnut') {
          this.data.datasets[i].borderColor = 'white';
        }
      } else {
        this.data.datasets[i].borderWidth = 0;
      }

      if (this.type === 'radar') {
        this.data.datasets[i].lineTension = 0;
      }
    }
  }

  _createChart() {
    if (this.chartData !== undefined && this.chartData !== null) {
      this.chartData.destroy();
    }
    this._setChart();
    // resize chart on every window resive event
    window.addEventListener('resize', function () {
      let id;
      for (id in Chart.instances) {
        if(Chart.instances.hasOwnProperty(id)) {
          Chart.instances[id].resize();
        }
      }
    })

    Chart.defaults.global.defaultFontColor = 'rgba(0,0,0,.6)';
    Chart.defaults.global.defaultFontFamily = 'siemens sans';
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.legend.labels.fontSize = 12;
    Chart.defaults.global.legend.labels.fontColor = 'rgba(0,0,0,.9)';
    Chart.defaults.global.legend.labels.padding = 16;
    Chart.defaults.global.legend.labels.usePointStyle = true;

    this.ctx = this.shadowRoot.querySelector('#chart-wrapper').getContext('2d');
    this.chartData = new Chart(this.ctx, {
      type: this.type,
      data: this.data,
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: 'rgb(255,255,255)',
          titleFontColor: 'rgba(0,0,0,.9)',
          bodyFontColor: 'rgba(0,0,0,.9)',
          titleSpacing: 8,
          bodySpacing: 4,
          footerSpacing: 4,
          xPadding: 8,
          yPadding: 8,
          cornerRadius: 2,
          multiKeyBackground: 'transparent',
          caretSize: 0,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,.2)',
          displayColors: false
        },
        legend: {
          display: this.legend,
          onClick: null
        }
      }
    });

    if (this.type === 'line') {
      this.borderWidth = 2;
    }
  }
}

window.customElements.define(SHChart.is, SHChart);
