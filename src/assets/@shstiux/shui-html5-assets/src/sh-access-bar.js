/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import './shared-styles.js';
class SHAccessBar extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        background: var(--base-0);
        transition: .2s all ease-in-out;
        box-shadow: var(--shadow-navigation);
        display: block;
        padding: 0px;
        z-index: 4;
        height: 72px;
      }

      .access-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        padding: 20px 16px;
        box-sizing: border-box;
      }

      .logo {
        height: 32px;
        width: 130px;
        margin-left: 8px;
        margin-right: 40px;
        background-size: cover;
      }

      .siemens {
        fill: var(--logo-2);
      }

      .healthineers {
        fill: var(--logo-1);
      }

      .label {
        max-width: 296px;
        margin-right: 40px;
        font: var(--header-1);
        color: var(--text-primary);
        line-height: 32px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        flex-direction: column;
        justify-content: center;
        font-size: 16px;
      }

      :host(:not([label])) .label {
        display: none;
      }

      :host([condensed]) .label {
        line-height: 24px;
      }

      .tabs-wrapper {
        margin: -20px 0;
        flex: 1;
        display: flex;
        flex-direction: row;
      }

      :host([condensed]) .tabs-wrapper {
        margin: -8px auto -8px 0;
      }

      .access-wrapper> ::slotted([slot="functions"]) {
        margin-left: 16px;
      }

      .access-wrapper> ::slotted(sh-user-identifier[slot="user"]) {
        margin-left: 24px;
      }

      /* native (window controls) */

      .window-controls {
        display: none;
        margin: -12px -8px 0px 16px;
      }

      :host([native]) .window-controls {
        display: inline-flex;
      }

      /* embedded */

      :host([embedded]) .logo {
        display: none;
      }

      /* condensed */

      :host([condensed]) {
        height: 40px;
      }

      :host([condensed]) .sh-access-wrapper,
      :host([condensed]) .access-wrapper {
        padding: 8px 16px;
      }

      :host([condensed]) .logo svg {
        height: 24px;
      }

      :host([condensed]) .logo {
        width: 98px;
      }

      :host([condensed]) .access-wrapper> ::slotted([slot="functions"]),
      :host([condensed]) .access-wrapper> ::slotted([slot="left"]),
      :host([condensed]) .access-wrapper> ::slotted([slot="right"]) {
        margin-top: -4px;
      }

      :host([condensed]) .window-controls {
        margin-top: 0px;
      }

      /* mobile */

      :host([mobile]) {
        height: 56px;
      }

      .access-wrapper> ::slotted([slot="left"]),
      .access-wrapper> ::slotted([slot="right"]),
      :host([mobile]) .logo,
      :host([mobile]) .access-wrapper> ::slotted([slot="user"]),
      :host([mobile]) .access-wrapper> ::slotted([slot="functions"]),
      :host([mobile]) .access-wrapper>.tabs-wrapper> ::slotted([slot="tabs"]) {
        display: none;
      }

      :host([mobile]) .tabs-wrapper {
        margin: 0px;
      }

      :host([mobile]) .access-wrapper> ::slotted([slot="left"]),
      :host([mobile]) .access-wrapper> ::slotted([slot="right"]) {
        display: flex;
      }

      :host([mobile]) .access-wrapper> ::slotted([slot="left"]) {
        margin-right: 16px;

      }
      :host([mobile]) .access-wrapper> ::slotted([slot="right"]) {
        margin-left: 16px;
      }

      :host([mobile]) .access-wrapper {
        justify-content: space-between;
        padding: 12px 16px;
      }

      :host([mobile]) .label {
        margin-right: 0;
        position: absolute;
        z-index: 5;
        left: 50%;
        transform: translateX(-50%);
        max-width: calc(100% - 128px);
      }

      /* small screens */

      @media only screen and (max-width: 767px) {
        :host {
          height: 56px;
        }

        .tabs-wrapper {
          margin: 0;
        }

        .access-wrapper> ::slotted([slot="left"]),
        .access-wrapper> ::slotted([slot="right"]) {
          display: flex;
        }

        .access-wrapper {
          justify-content: space-between;
          padding: 12px 16px;
        }

        .access-wrapper> ::slotted([slot="left"]) {
          margin-right: 16px;

        }
        .access-wrapper> ::slotted([slot="right"]) {
          margin-left: 16px;
        }

        .label {
          margin-right: 0;
          position: absolute;
          z-index: 5;
          left: 50%;
          transform: translateX(-50%);
          max-width: calc(100% - 128px);
        }

        .logo,
        .access-wrapper> ::slotted([slot="user"]),
        .access-wrapper> ::slotted([slot="functions"]),
        .access-wrapper>.tabs-wrapper> ::slotted([slot="tabs"])  {
          display: none;
        }
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

    <!--HTML-->
    <div class="access-wrapper">
      <div class="logo">
        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" viewBox="-1.24339497 -1.24339497 179.20878994 43.93328894">
          <path class="healthineers" d="m 146.66688,22.51125 c 0.23875,0.23875 0.55125,0.35875 0.865,0.35875 0.3125,0 0.62625,-0.12 0.86375,-0.35875 0.24,-0.23875 0.35875,-0.55125 0.35875,-0.865 0,-0.3125 -0.11875,-0.625 -0.35875,-0.865 -0.2375,-0.23875 -0.55125,-0.3575 -0.86375,-0.3575 -0.31375,0 -0.62625,0.11875 -0.865,0.3575 -0.23875,0.24 -0.35875,0.5525 -0.35875,0.865 0,0.31375 0.12,0.62625 0.35875,0.865 m 6.16875,-6.16863 c 0.31,0.31 0.71625,0.465 1.12375,0.465 0.40625,0 0.81374,-0.155 1.12375,-0.465 0.31125,-0.31 0.46499,-0.7175 0.46499,-1.12375 0,-0.4075 -0.15375,-0.81375 -0.46499,-1.12375 -0.31001,-0.31 -0.7175,-0.46625 -1.12375,-0.46625 -0.4075,0 -0.81375,0.15625 -1.12375,0.46625 -0.31001,0.31 -0.465,0.71625 -0.465,1.12375 0,0.40625 0.155,0.81375 0.465,1.12375 m -0.008,12.84888 c 0.31,0.31 0.71625,0.465 1.12375,0.465 0.40625,0 0.81375,-0.155 1.12375,-0.465 0.31125,-0.31 0.465,-0.7175 0.465,-1.12375 0,-0.4075 -0.15376,-0.81375 -0.465,-1.12375 -0.31,-0.31 -0.7175,-0.46625 -1.12375,-0.46625 -0.4075,0 -0.81375,0.15625 -1.12375,0.46625 -0.31,0.31 -0.465,0.71625 -0.465,1.12375 0,0.40625 0.155,0.81375 0.465,1.12375 m 6.09812,-18.93988 c 0.40375,0.40375 0.9325,0.605 1.46125,0.605 0.52875,0 1.0575,-0.20125 1.46125,-0.605 0.40375,-0.40375 0.605,-0.9325 0.605,-1.46125 0,-0.52875 -0.20125,-1.0575 -0.605,-1.46125 -0.40375,-0.40375 -0.9325,-0.605 -1.46125,-0.605 -0.52875,0 -1.0575,0.20125 -1.46125,0.605 -0.40375,0.40375 -0.605,0.9325 -0.605,1.46125 0,0.52875 0.20125,1.0575 0.605,1.46125 m -0.008,12.84875 c 0.40375,0.40375 0.9325,0.605 1.46125,0.605 0.52875,0 1.0575,-0.20125 1.46125,-0.605 0.40375,-0.40375 0.605,-0.9325 0.605,-1.46125 0,-0.52875 -0.20125,-1.0575 -0.605,-1.46125 -0.40375,-0.40375 -0.9325,-0.605 -1.46125,-0.605 -0.52875,0 -1.0575,0.20125 -1.46125,0.605 -0.40375,0.40375 -0.605,0.9325 -0.605,1.46125 0,0.52875 0.20125,1.0575 0.605,1.46125 m -0.007,12.84925 c 0.40375,0.40375 0.9325,0.605 1.46125,0.605 0.52875,0 1.0575,-0.20125 1.46125,-0.605 0.40375,-0.40375 0.605,-0.9325 0.605,-1.46125 0,-0.52875 -0.20125,-1.0575 -0.605,-1.46125 -0.40375,-0.40375 -0.9325,-0.605 -1.46125,-0.605 -0.52875,0 -1.0575,0.20125 -1.46125,0.605 -0.40375,0.40375 -0.605,0.9325 -0.605,1.46125 0,0.52875 0.20125,1.0575 0.605,1.46125 m 5.99688,-18.839 c 0.52375,0.525 1.21125,0.78625 1.89875,0.78625 0.68875,0 1.37625,-0.26125 1.90125,-0.78625 0.52375,-0.52375 0.78625,-1.21125 0.78625,-1.89875 0,-0.6875 -0.2625,-1.375 -0.7875,-1.9 -0.525,-0.525 -1.2125,-0.7875 -1.9,-0.7875 -0.6875,0 -1.375,0.2625 -1.89875,0.78625 -0.525,0.525 -0.7875,1.2125 -0.7875,1.9 0,0.68875 0.2625,1.37625 0.7875,1.9 m -0.006,12.84925 c 0.52375,0.525 1.21125,0.78625 1.89875,0.78625 0.68875,0 1.37625,-0.26125 1.90125,-0.78625 0.52375,-0.525 0.78625,-1.21125 0.78625,-1.89875 0,-0.6875 -0.2625,-1.375 -0.7875,-1.9 -0.525,-0.525 -1.2125,-0.7875 -1.9,-0.7875 -0.6875,0 -1.375,0.26125 -1.89875,0.78625 -0.525,0.525 -0.7875,1.2125 -0.7875,1.9 0,0.68875 0.2625,1.375 0.7875,1.9 m 5.85787,-5.858 c 0.6825,0.6825 1.575,1.02375 2.47,1.02375 0.89375,0 1.78625,-0.34125 2.46875,-1.02375 0.6825,-0.6825 1.02375,-1.57625 1.02375,-2.47 0,-0.89375 -0.34125,-1.78625 -1.02375,-2.46875 -0.6825,-0.6825 -1.575,-1.02375 -2.46875,-1.02375 -0.895,0 -1.7875,0.34125 -2.47,1.02375 -0.6825,0.6825 -1.02375,1.575 -1.02375,2.46875 0,0.89375 0.34125,1.7875 1.02375,2.47" style="fill-opacity:1;fill-rule:nonzero;stroke:none"></path>
          <path class="siemens" d="m 132.43,15.29 0,-3.0175 c 1.70125,0.54125 3.22125,0.81125 4.5575,0.81125 1.82375,0 2.73625,-0.48125 2.73625,-1.445 0,-0.36 -0.13,-0.66125 -0.3875,-0.90625 -0.2725,-0.26 -0.9725,-0.61875 -2.1,-1.07875 -2.0025,-0.82 -3.31625,-1.525 -3.93,-2.11375 -0.79,-0.76375 -1.18625,-1.7375 -1.18625,-2.92375 0,-1.5025 0.57375,-2.65 1.7275,-3.44 C 134.9825,0.3925 136.46625,0 138.295,0 c 1.02625,0 2.3575,0.16375 3.99,0.49125 l 0.3775,0.065 0,2.90125 c -1.41875,-0.56625 -2.7375,-0.84875 -3.96125,-0.84875 -1.705,0 -2.5575,0.47 -2.5575,1.41375 0,0.35125 0.1725,0.63875 0.51625,0.8625 0.27375,0.17125 1.07,0.5525 2.38375,1.14375 1.85,0.82625 3.08875,1.545 3.71125,2.1575 0.735,0.72625 1.1025,1.665 1.1025,2.8175 0,1.65375 -0.7175,2.91625 -2.1475,3.78625 -1.1725,0.70375 -2.68875,1.05625 -4.5425,1.05625 -1.56875,0 -3.14875,-0.185 -4.7375,-0.55625 m -6.0335,-15.02513 0,10.22375 -5.24375,-10.22375 -4.945,0 0,15.2725 3.005,0 0,-10.36 5.385,10.36 4.80375,0 0,-15.2725 -3.005,0 z m -24.11275,0 0,15.2725 11.1175,0 0,-2.91875 -7.00625,0 0,-3.62375 5.945,0 0,-2.51875 -5.945,0 0,-3.4475 6.82875,0 0,-2.76375 -10.94,0 z m -9.16475,0 -3.94,9.7575 -3.84125,-9.7575 -5.53125,0 0,15.2725 3.005,0 0,-10.8125 4.3925,10.96625 2.645,0 4.47875,-10.96625 0,10.8125 4.04375,0 0,-15.2725 -5.2525,0 z m -27.214,0 0,15.2725 11.11625,0 0,-2.91875 -7.005,0 0,-3.62375 5.94375,0 0,-2.51875 -5.94375,0 0,-3.4475 6.82875,0 0,-2.76375 -10.94,0 z m -8.1775,15.27163 2.1325,0 2.13375,0 0,-7.63625 0,-7.63625 -2.13375,0 -2.1325,0 0,7.63625 0,7.63625 z M 43.89188,15.29 l 0,-3.0175 c 1.71624,0.54125 3.23499,0.81125 4.55749,0.81125 1.82375,0 2.73626,-0.48125 2.73626,-1.445 0,-0.36 -0.13376,-0.66125 -0.39875,-0.90625 -0.27376,-0.26 -0.96875,-0.61875 -2.09001,-1.07875 C 46.68813,8.8275 45.37563,8.1225 44.76562,7.54 43.97812,6.77 43.58187,5.8 43.58187,4.62625 c 0,-1.50875 0.57625,-2.66 1.7275,-3.45 C 46.44563,0.3925 47.92813,0 49.75437,0 c 1.00751,0 2.46501,0.185 4.37,0.55625 l 0,2.90125 c -1.41749,-0.56625 -2.735,-0.84875 -3.95,-0.84875 -1.71375,0 -2.56999,0.47 -2.56999,1.41375 0,0.35125 0.17374,0.63875 0.51875,0.8625 0.28749,0.17875 1.07874,0.56 2.3725,1.14375 1.86249,0.82625 3.10499,1.545 3.72125,2.1575 0.73374,0.72625 1.10249,1.665 1.10249,2.8175 0,1.65375 -0.71999,2.91625 -2.15999,3.78625 -1.16375,0.70375 -2.67626,1.05625 -4.53125,1.05625 -1.5675,0 -3.14626,-0.185 -4.73625,-0.55625" style="fill-opacity:1;fill-rule:nonzero;stroke:none"></path>
          <path class="healthineers" d="m 56.56775,30.56875 3.44875,0 0,-2.87 -3.44875,0 0,-4.15875 -3.65875,0 0,4.16 -2.03,0 0,2.87 2.03,0 0,6.5 c 0,2.2125 0.21,4.37 4.00125,4.37 1.15875,0 2.5525,-0.34125 3.34375,-0.84125 l -0.79125,-2.45 c -0.5775,0.2375 -1.13125,0.4225 -1.60625,0.4225 -0.97375,0 -1.28875,-0.58 -1.28875,-2.0275 l 0,-5.975 z m 86.37162,-2.10438 0.01,-0.0312 c -1.165,-0.7625 -2.6925,-1.2225 -4.35875,-1.135 -2.705,0.14125 -4.83125,1.75375 -4.68375,4.54 0.14625,2.78875 2.17875,3.44625 4.17875,3.92125 1.14875,0.2825 2.10875,0.4975 2.1625,1.5225 0.0525,1 -0.6375,1.43125 -1.60875,1.4825 -1.19,0.0612 -2.695,-0.4675 -3.665,-0.96625 l -1.09126,2.51 c 0.76876,0.51375 2.74875,1.24625 5.08,1.125 3.04625,-0.16 5.04,-1.76375 4.885,-4.73625 -0.14375,-2.735 -2.33125,-3.3325 -4.28124,-3.8375 -1.20125,-0.305 -2.08625,-0.6025 -2.14125,-1.6275 -0.045,-0.86875 0.6475,-1.2475 1.515,-1.29375 0.89875,-0.0462 1.86625,0.3475 2.89375,1.0675 l 1.105,-2.54125 z m -14.82687,4.289 c 0.0525,-1.39375 0.895,-2.29 2.21125,-2.29 0.68375,0 1.3175,0.18375 1.8675,0.47375 L 132.85,27.77837 c -0.63125,-0.3425 -1.44625,-0.47375 -2.185,-0.47375 -1.23625,0 -2.52625,0.73625 -3.1575,2.29 l -0.3425,-1.89625 -2.975,0 0.26375,2.3175 0,11.02875 3.65875,0 0,-8.29125 z m -40.03688,8.29188 0,-8.555 c 0,-1.26375 0.89626,-2.36875 2.29001,-2.36875 1.39625,0 1.63124,1.07875 1.63124,2.52625 l 0,8.3975 3.65875,0 0,-9.10875 c 0,-3.1575 -1.57875,-4.6325 -4.18374,-4.6325 -1.76376,0 -3.08,0.73875 -3.97501,1.975 l -0.26375,-1.58 -3.05375,0 0.23751,2.475 0,10.87125 3.65874,0 z M 77.35125,23.52912 c 0,0.555 0.19375,1.025 0.53875,1.3575 0.345,0.33125 0.84125,0.525 1.4475,0.525 0.5925,0 1.09625,-0.19375 1.45,-0.525 0.355,-0.3325 0.56125,-0.8025 0.56125,-1.3575 0,-0.51625 -0.20625,-0.98625 -0.56125,-1.32875 -0.35375,-0.34125 -0.8575,-0.55375 -1.45,-0.55375 -0.59375,0 -1.09,0.2125 -1.4375,0.55375 -0.34875,0.3425 -0.54875,0.8125 -0.54875,1.32875 m 0.16812,17.5165 1.83001,0 1.82875,0 0,-6.6725 0,-6.67375 -1.82875,0 -1.83001,0 0,6.67375 0,6.6725 z m -10.8175,-3.7e-4 0,-8.6075 c 0,-1.2375 0.89501,-2.31625 2.2375,-2.31625 1.39501,0 1.68376,1.0525 1.68376,2.42125 l 0,8.5025 3.65875,0 0,-9.05375 c 0,-3.13375 -1.5,-4.6875 -4.26376,-4.6875 -1.29,0 -2.47375,0.47375 -3.31625,1.36875 l 0,-5.1325 -3.65874,0 0,17.505 3.65874,0 z m -22.82162,-17.4785 0,13.50375 c 0,2.21125 0.21,4.37 4.00125,4.37 1.15875,0 2.5525,-0.34125 3.3425,-0.8425 l -0.79,-2.44875 c -0.57875,0.2375 -1.13125,0.4225 -1.60375,0.4225 -0.97625,0 -1.29125,-0.58 -1.29125,-2.0275 l 0,-12.9775 -3.65875,0 z m -3.05338,17.4785 -0.26374,-2.6575 0,-10.11 c -2,-0.73625 -3.94876,-0.97375 -4.84375,-0.97375 -4.65751,0 -6.97501,3.0275 -6.97501,7.66125 0,3.5525 1.29001,6.44875 5.10625,6.44875 1.4225,0 2.7375,-0.52625 3.52751,-1.7375 l 0.1325,0.0275 0.18374,1.34125 3.1325,0 z M 36.93063,36.7815 c 0,0.97375 -0.78875,1.97375 -2.15751,1.97375 -1.94874,0 -2.39625,-1.86875 -2.39625,-4.00125 0,-2.58 0.7375,-4.7375 2.89625,-4.7375 0.68376,0 1.315,0.13125 1.65751,0.28875 l 0,6.47625 z M 9.13375,23.54075 l 0,6.975 -5.37,0 0,-6.975 -3.76375,0 0,17.505 3.76375,0 0,-7.23875 5.37,0 0,7.23875 3.765,0 0,-17.505 -3.765,0 z m 17.50512,7.60712 c 0,-2.5 -1.71125,-3.84375 -4.37,-3.84375 -4.31624,0 -6.55375,3.52875 -6.55375,7.3975 0,3.94875 1.79001,6.73875 6.26376,6.73875 2.65999,0 4.5025,-1.21125 4.8175,-1.47375 l -1.0525,-2.4475 c -0.73625,0.49875 -1.86875,1.13125 -3.29001,1.13125 -2.00124,0 -2.84375,-1.34375 -3.02749,-2.60625 3.185,-0.13125 7.21249,-0.9225 7.21249,-4.89625 m -3.21125,0.0275 c 0,1.815 -2.44874,2.23625 -4.15875,2.29 0.0775,-1.8175 1.02625,-3.58125 2.81626,-3.58125 0.815,0 1.34249,0.5 1.34249,1.29125 m 98.18325,-0.0275 c 0,-2.5 -1.71125,-3.84375 -4.37,-3.84375 -4.31624,0 -6.55375,3.52875 -6.55375,7.3975 0,3.94875 1.79,6.73875 6.26375,6.73875 2.66,0 4.5025,-1.21125 4.8175,-1.47375 l -1.05375,-2.4475 c -0.73625,0.49875 -1.8675,1.13125 -3.28874,1.13125 -2.00125,0 -2.8425,-1.34375 -3.02751,-2.60625 3.18625,-0.13125 7.2125,-0.9225 7.2125,-4.89625 m -3.21124,0.0275 c 0,1.815 -2.44875,2.23625 -4.15875,2.29 0.0775,-1.8175 1.02625,-3.58125 2.81625,-3.58125 0.815,0 1.3425,0.5 1.3425,1.29125 m -9.55525,-0.0275 c 0,-2.5 -1.71125,-3.84375 -4.37,-3.84375 -4.31625,0 -6.55376,3.52875 -6.55376,7.3975 0,3.94875 1.79,6.73875 6.26376,6.73875 2.66,0 4.5025,-1.21125 4.8175,-1.47375 l -1.0525,-2.4475 c -0.7375,0.49875 -1.86875,1.13125 -3.29,1.13125 -2.00125,0 -2.84375,-1.34375 -3.0275,-2.60625 3.18625,-0.13125 7.2125,-0.9225 7.2125,-4.89625 m -3.21125,0.0275 c 0,1.815 -2.44875,2.23625 -4.15875,2.29 0.0775,-1.8175 1.02625,-3.58125 2.81625,-3.58125 0.815,0 1.3425,0.5 1.3425,1.29125" style="fill-opacity:1;fill-rule:nonzero;stroke:none"></path>
        </svg>
      </div>
      <slot name="left" id="left-slot"></slot>
      <div class="label">[[label]]</div>
      <div class="tabs-wrapper">
        <slot name="tabs" id="tabsSlot"></slot>
      </div>
      <slot name="functions" id="functions-slot"></slot>
      <slot name="user" id="user-slot" tabindex="0"></slot>
      <div class="window-controls">
        <sh-icon button="" icon="minus" size="s"></sh-icon>
        <sh-icon button="" icon="stop" size="s"></sh-icon>
        <sh-icon button="" icon="cancel" size="s"></sh-icon>
      </div>
      <slot name="right" id="right-slot"></slot>
    </div>
`;
  }

  static get is() {
    return 'sh-access-bar';
  }
  static get properties() {
    return {
      label: {
        type: String,
        reflectToAttribute: true,
        notify:true
      },
      mobile: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify:true
      },
      condensed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify:true,
        observer: '_condensedChanged'
      },
      embedded: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify:true
      },
      native: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify:true
      }
    }
  }
  ready(){
    super.ready();
    if (!this.disabled && this.shadowRoot.querySelectorAll('sh-icon').length > 0) {
      for (let i = 0; i < this.shadowRoot.querySelectorAll('sh-icon').length; i++) {
        this.shadowRoot.querySelectorAll('sh-icon')[i].setAttribute('tabindex', '0');
      }
    }
    if (!this.disabled && this.querySelectorAll('sh-icon').length > 0) {
      for (let i = 0; i < this.querySelectorAll('sh-icon').length; i++) {
        this.querySelectorAll('sh-icon')[i].setAttribute('tabindex', '0');
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    // trigger access prop of tabs
    let tabs;
    tabs = this.querySelectorAll('sh-tabs');
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].accessContext = true;
    }
    // trigger access prop of user-identifier
    let userIdentifier;
    userIdentifier = this.querySelectorAll('sh-user-identifier');
    for (let i = 0; i < userIdentifier.length; i++) {
      userIdentifier[i].accessContext = true;
    }
    let accessBar, tabsNodes;
    accessBar = this;
    tabsNodes = this.$.tabsSlot.assignedNodes({
      flatten: true
    }).length;
    // collapse tabs at load
    if (document.body.clientWidth < 1025 && tabsNodes !== 0) {
      let tabs;
      tabs = accessBar.querySelector('sh-tabs');
      if (tabs.fixed === false) {
        tabs.setAttribute('collapsed', true);
      }
    }
    // collapse tabs on resize
    this.browserResize(tabsNodes);
  }

  browserResize (tabsNodes) {
    let tabNodes, accessBar;
    accessBar = this;
    tabNodes = tabsNodes;
    if (tabNodes !== 0) {
      window.addEventListener('resize', function () {
        if (document.body.clientWidth < 1025 && tabNodes !== 0) {
          let tabs;
          tabs = accessBar.querySelector('sh-tabs');
          if (tabs.fixed === false) {
            tabs.setAttribute('collapsed', true);
          }
        } else {
          accessBar.querySelector('sh-tabs').removeAttribute('collapsed');
        }
      });
    }
  }

  _condensedChanged() {
    let tabItems, tabs, userIdentifier;
    tabItems = this.querySelectorAll('sh-tab-item');
    tabs = this.querySelectorAll('sh-tabs');
    userIdentifier = this.querySelectorAll('sh-user-identifier');
    if (this.condensed === true) {
      for (let i = 0; i < tabItems.length; i++) {
        tabItems[i].condensed = true;
      }
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].condensed = true;
      }
      for (let i = 0; i < userIdentifier.length; i++) {
        userIdentifier[i].condensed = true;
      }
    } else {
      for (let i = 0; i < tabItems.length; i++) {
        tabItems[i].condensed = false;
      }
      for (let i = 0; i < userIdentifier.length; i++) {
        userIdentifier[i].condensed = false;
      }
    }
  }
}
window.customElements.define(SHAccessBar.is, SHAccessBar);
