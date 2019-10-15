/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHButton extends PolymerElement {
  static get template() {
    return html`
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: inline-flex;
        height: 32px;
        padding: 4px 16px;
        transition: .2s all ease-in-out;
        display: flex;
        flex-direction: row;
        border-radius: 16px;
        cursor: pointer;
        box-sizing: border-box;
        outline : 0;
      }

      .button-label {
        text-align: center;
        width: fit-content;
        line-height: 23px !important;
        font: var(--title-1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        ;
        font-weight: bold;
        width: 100%;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        -moz-user-select: none;
        -webkit-user-select: none;
      }

      :host sh-icon {
        /* color: var(--text-primary); */
        margin: auto;
      }

      /* shape='pill - large' */

      :host([shape="pill-s"]) {
        width: 96px !important;
      }

      /* shape='pill - medium' */

      :host([shape="pill-m"]) {
        width: 152px !important;
      }

      /* shape='pill - small' */

      :host([shape="pill-l"]) {
        width: 184px !important;
      }

      :host([shape="pill-l"]) sh-icon,
      :host([shape="pill-m"]) sh-icon,
      :host([shape="pill-s"]) sh-icon {
        display: none;
      }

      /* shape='circle' */

      :host([shape="circle"]) {
        position: relative;
        width: 48px;
        height: 48px;
        padding: 8px;
        border-radius: 50%;
      }

      :host([shape="circle"]) .button-label {
        display: none;
      }

      /* color='primary' */

      :host([color="primary"]) {
        background-color: rgba(var(--ui-3), var(--opacity-1));
      }

      :host([color="primary"]:hover) {
        background-color: rgba(var(--ui-2), var(--opacity-1));
      }

      :host([color="primary"]:active) {
        background-color: rgba(var(--ui-4), var(--opacity-1));
      }

      :host([color="primary"]) .button-label {
        color: var(--text-white);
      }

      /* color='secondary' */

      :host([color="secondary"]) {
        background-color: rgba(var(--ui-1), var(--opacity-6));
      }

      :host([color="secondary"]:hover) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([color="secondary"]:active) {
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }

      :host([color="secondary"]) .button-label {
        color: var(--text-primary);
      }

      /* color='tertiary' */

      :host([shape="pill-l"][color="tertiary"]),
      :host([shape="pill-m"][color="tertiary"]),
      :host([shape="pill-s"][color="tertiary"]) {
        padding: 4px 16px;
        border: 1px solid rgba(var(--ui-1), var(--opacity-6));
        color: var(--text-primary);
      }

      :host([shape="pill-l"][color="tertiary"]:hover),
      :host([shape="pill-m"][color="tertiary"]:hover),
      :host([shape="pill-s"][color="tertiary"]:hover) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([shape="pill-l"][color="tertiary"]:active),
      :host([shape="pill-m"][color="tertiary"]:active),
      :host([shape="pill-s"][color="tertiary"]:active) {
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }

      :host([color="tertiary"]) {
        background-color: transparent;
      }

      :host([shape="circle"][color="tertiary"]) sh-icon {
        color:rgba(var(--ui-1),var(--opacity-3)) !important;
      }

      :host([color="tertiary"]:hover) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([shape="circle"][color="tertiary"]:hover) {
        background-color: transparent;
      }

      :host([shape="circle"][color="tertiary"]:hover) sh-icon {
        color:rgba(var(--ui-1),var(--opacity-2)) !important;
      }

      :host([color="tertiary"]:active) {
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }

      :host([color="tertiary"]) .button-label {
        color: var(--text-primary);
      }

      /* disabled */

      :host([disabled]) {
        pointer-events: none;
        cursor: not-allowed;
      }

      :host([color="primary"][disabled]) {
        background-color: rgba(var(--ui-3), var(--opacity-5)) !important;
      }

      :host([color="secondary"][disabled]) {
        background-color: rgba(var(--ui-1), var(--opacity-7)) !important;
      }

      :host([color="primary"][disabled]) sh-icon {
        color: var(--text-white-disabled) !important
      }

      :host([color="secondary"][disabled]) sh-icon,
      :host([color="tertiary"][disabled]) sh-icon,
      :host([color="secondary"][disabled]) .button-label,
      :host([color="tertiary"][disabled]) .button-label {
        color:rgba(var(--ui-1), var(--opacity-5)) !important;
      }

      :host([color="primary"][disabled]) .button-label {
        color: var(--text-white-disabled) !important;
      }

      :host([shape="pill-l"][color="tertiary"][disabled]),
      :host([shape="pill-m"][color="tertiary"][disabled]),
      :host([shape="pill-s"][color="tertiary"][disabled]){
        border: 1px solid rgba(var(--ui-1), var(--opacity-7)) !important;
      }

      /* Touch Styles */
      :host-context([touch]):host([color="primary"]) {
        background-color: rgba(var(--ui-3), var(--opacity-1));
      }

      :host-context([touch]):host([color="primary"]:hover) {
        background-color: rgba(var(--ui-3), var(--opacity-1));
      }

      :host-context([touch]):host([color="secondary"]:hover) {
        background-color: rgba(var(--ui-1), var(--opacity-6));
      }

      :host-context([touch]):host([shape="pill-l"][color="tertiary"]:hover),
      :host-context([touch]):host([shape="pill-m"][color="tertiary"]:hover),
      :host-context([touch]):host([shape="pill-s"][color="tertiary"]:hover) {
        background-color: rgba(var(--ui-1), var(--opacity-6));
      }

      :host-context([touch]):host([color="tertiary"]:hover) {
        background-color: transparent;
      }

      :host-context([touch]):host([shape="circle"][color="tertiary"]:hover) sh-icon {
        opacity: var(--opacity-3);
      }

      .button-label {
        text-align: center;
        width: fit-content;
        width: -ms-fit-content;
        width: -moz-fit-content;
        line-height: 23px !important;
        font: var(--title-1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        ;
        font-weight: bold;
        width: 100%;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
      }

      :host sh-icon {
        margin: auto;
      }

      /* shape='pill - large' */

      :host([shape="pill-s"]) {
        width: 96px !important;
      }

      /* shape='pill - medium' */

      :host([shape="pill-m"]) {
        width: 152px !important;
      }

      /* shape='pill - small' */

      :host([shape="pill-l"]) {
        width: 184px !important;
      }

      :host([shape="pill-l"]) sh-icon,
      :host([shape="pill-m"]) sh-icon,
      :host([shape="pill-s"]) sh-icon {
        display: none;
      }

      /* shape='circle' */

      :host([shape="circle"]) {
        position: relative;
        width: 48px;
        height: 48px;
        padding: 8px;
        border-radius: 50%;
      }

      :host([shape="circle"]) .button-label {
        display: none;
      }

      /* color='primary' */

      :host([color="primary"]) sh-icon {
        color: var(--text-white);
      }

      :host([color="primary"]:active),
      :host([color="primary"].active) {
        background-color: rgba(var(--ui-4), var(--opacity-1)) !important;
      }

      :host([color="primary"]) .button-label {
        color: var(--text-white);
      }

      /* color='secondary' */

      :host([color="secondary"]) {
        background-color: rgba(var(--ui-1), var(--opacity-6));
      }

      :host([color="secondary"]:active),
      :host([color="secondary"].active) {
        background-color: rgba(var(--ui-1), var(--opacity-7)) !important;
      }

      :host([color="secondary"]) .button-label {
        color: var(--text-primary);
      }

      /* color='tertiary' */

      :host([shape="pill-l"][color="tertiary"]),
      :host([shape="pill-m"][color="tertiary"]),
      :host([shape="pill-s"][color="tertiary"]) {
        padding: 4px 16px;
        border: 1px solid rgba(var(--ui-1), var(--opacity-5));
        color: var(--text-primary);
      }

      :host([shape="pill-l"][color="tertiary"]:active),
      :host([shape="pill-l"][color="tertiary"].active),
      :host([shape="pill-m"][color="tertiary"]:active),
      :host([shape="pill-m"][color="tertiary"].active),
      :host([shape="pill-s"][color="tertiary"]:active),
      :host([shape="pill-s"][color="tertiary"].active) {
        background-color: rgba(var(--ui-1), var(--opacity-7)) !important;
      }

      :host([color="tertiary"]) {
        background-color: transparent;
      }

      :host([color="tertiary"]:active),
      :host([color="tertiary"].active) {
        background-color: rgba(var(--ui-1), var(--opacity-7)) !important;
      }

      :host([color="tertiary"]) .button-label {
        color: var(--text-primary);
      }

      /* tooltip */

      .tooltip {
        display: none;
        text-overflow: inherit;
        z-index: 2;
        ;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width:240px;
      }

      :host([shape="circle"]) .right.tooltip,
      :host([shape="circle"]) .left.tooltip,
      :host([shape="circle"]) .top.tooltip,
      :host([shape="circle"]) .bottom.tooltip {
        display: block;
        line-height: 24px;
        padding: 0 8px;
        position: absolute;
        opacity: 0;
        visibility: hidden;
        color: var(--text-primary);
        background-color: var(--base-3);
        width: fit-content;
        width: -ms-fit-content;
        width: -moz-fit-content;
        height: 24px;
        box-sizing: border-box;
        transition: .2s all ease-in-out .4s;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
        -moz-osx-font-smoothing: grayscale !important;
      }

      /* top tooltip */

      .top.tooltip {
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        margin-top: -24px;
      }

      /* bottom tooltip */

      .bottom.tooltip {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 0px;
      }

      /* left tooltip */

      .left.tooltip {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
      }

      /* right tooltip */

      .right.tooltip {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
      }

      /* touch */

      :host([color="primary"]:hover.hovermq),
      :host([color="primary"].hover.hovermq),
      :host([color="primary"]:hover:not(.no-hovermq)),
      :host([color="primary"].hover:not(.no-hovermq)) {
        background-color: rgba(var(--ui-2), var(--opacity-1));
      }

      :host([color="secondary"]:hover.hovermq),
      :host([color="secondary"].hover.hovermq),
      :host([color="secondary"]:hover:not(.no-hovermq)),
      :host([color="secondary"].hover:not(.no-hovermq)) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([shape="pill-l"][color="tertiary"]:hover.no-hovermq),
      :host([shape="pill-l"][color="tertiary"].hover.no-hovermq),
      :host([shape="pill-m"][color="tertiary"]:hover.no-hovermq),
      :host([shape="pill-m"][color="tertiary"].hover.no-hovermq),
      :host([shape="pill-s"][color="tertiary"]:hover.no-hovermq),
      :host([shape="pill-s"][color="tertiary"].hover.no-hovermq),
      :host([shape="pill-l"][color="tertiary"]:hover:not(.no-hovermq)),
      :host([shape="pill-l"][color="tertiary"].hover:not(.no-hovermq)),
      :host([shape="pill-m"][color="tertiary"]:hover:not(.no-hovermq)),
      :host([shape="pill-m"][color="tertiary"].hover:not(.no-hovermq)),
      :host([shape="pill-s"][color="tertiary"]:hover:not(.no-hovermq)),
      :host([shape="pill-s"][color="tertiary"].hover:not(.no-hovermq)) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([color="tertiary"]:hover.no-hovermq),
      :host([color="tertiary"].hover.no-hovermq),
      :host([color="tertiary"]:hover:not(.no-hovermq)),
      :host([color="tertiary"].hover:not(.no-hovermq)) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([shape="square"]:hover:not(.no-hovermq)) {
        background: rgba(var(--ui-1), var(--opacity-5)) !important;
      }

      :host([shape="circle"][color="tertiary"]:hover.no-hovermq),
      :host([shape="circle"][color="tertiary"].hover.no-hovermq),
      :host([shape="circle"][color="tertiary"]:hover:not(.no-hovermq)),
      :host([shape="circle"][color="tertiary"].hover:not(.no-hovermq)) {
        background-color: transparent;
      }

      :host([shape="circle"][color="tertiary"]:hover.no-hovermq) sh-icon,
      :host([shape="circle"][color="tertiary"].hover.no-hovermq) sh-icon,
      :host([shape="circle"][color="tertiary"]:hover:not(.no-hovermq)) sh-icon,
      :host([shape="circle"][color="tertiary"].hover:not(.no-hovermq)) sh-icon {
        color: rgba(var(--ui-1),var(--opacity-2)) !important;
      }

      :host(:hover.no-hovermq) .right.tooltip,
      :host(.hover.no-hovermq) .right.tooltip,
      :host(:hover.no-hovermq) .left.tooltip,
      :host(.hover.no-hovermq) .left.tooltip,
      :host(:hover.no-hovermq) .top.tooltip,
      :host(.hover.no-hovermq) .top.tooltip,
      :host(:hover.no-hovermq) .bottom.tooltip,
      :host(.hover.no-hovermq) .bottom.tooltip,
      :host(:hover:not(.no-hovermq)) .right.tooltip,
      :host(.hover:not(.no-hovermq)) .right.tooltip,
      :host(:hover:not(.no-hovermq)) .left.tooltip,
      :host(.hover:not(.no-hovermq)) .left.tooltip,
      :host(:hover:not(.no-hovermq)) .top.tooltip,
      :host(.hover:not(.no-hovermq)) .top.tooltip,
      :host(:hover:not(.no-hovermq)) .bottom.tooltip,
      :host(.hover:not(.no-hovermq)) .bottom.tooltip {
        opacity: 1;
        visibility: visible;
      }

      :host(:hover.no-hovermq) .top.tooltip,
      :host(.hover.no-hovermq) .top.tooltip,
      :host(:hover:not(.no-hovermq)) .top.tooltip,
      :host(.hover:not(.no-hovermq)) .top.tooltip {
        margin-top: -28px;
      }

      :host(:hover.no-hovermq) .bottom.tooltip,
      :host(.hover.no-hovermq) .bottom.tooltip,
      :host(:hover:not(.no-hovermq)) .bottom.tooltip,
      :host(.hover:not(.no-hovermq)) .bottom.tooltip {
        margin-top: 4px;
      }

      :host(:hover.no-hovermq) .left.tooltip,
      :host(.hover.no-hovermq) .left.tooltip,
      :host(:hover:not(.no-hovermq)) .left.tooltip,
      :host(.hover:not(.no-hovermq)) .left.tooltip {
        margin-right: 4px;
      }

      :host(:hover.no-hovermq) .right.tooltip,
      :host(.hover.no-hovermq) .right.tooltip,
      :host(:hover:not(.no-hovermq)) .right.tooltip,
      :host(.hover:not(.no-hovermq)) .right.tooltip {
        margin-left: 4px;
      }

      /*css testing*/
      :host(.testing), :host(.testing) * {
        transition: all 0s linear;
      }
      :host([color="primary"].hover) {
        background-color: rgba(var(--ui-2), var(--opacity-1));
      }
      :host([color="secondary"].hover) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }
      :host([shape="pill-l"][color="tertiary"].hover),
      :host([shape="pill-m"][color="tertiary"].hover),
      :host([shape="pill-s"][color="tertiary"].hover) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }
      :host([color="tertiary"].hover) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([shape="circle"][color="tertiary"].hover) {
        background-color: transparent;
      }

      :host([shape="circle"][color="tertiary"].hover) sh-icon {
        opacity: var(--opacity-2);
      }
      :host-context([touch]):host([color="primary"].hover) {
        background-color: rgba(var(--ui-3), var(--opacity-1));
      }

      :host-context([touch]):host([color="secondary"].hover) {
        background-color: rgba(var(--ui-1), var(--opacity-6));
      }

      :host-context([touch]):host([shape="pill-l"][color="tertiary"].hover),
      :host-context([touch]):host([shape="pill-m"][color="tertiary"].hover),
      :host-context([touch]):host([shape="pill-s"][color="tertiary"].hover) {
        background-color: rgba(var(--ui-1), var(--opacity-6));
      }

      :host-context([touch]):host([color="tertiary"].hover) {
        background-color: transparent;
      }

      :host-context([touch]):host([shape="circle"][color="tertiary"].hover) sh-icon {
        opacity: var(--opacity-3);
      }
      :host([color="primary"].hover.hovermq),
      :host([color="primary"].hover.hovermq),
      :host([color="primary"].hover:not(.no-hovermq)),
      :host([color="primary"].hover:not(.no-hovermq)) {
        background-color: rgba(var(--ui-2), var(--opacity-1));
      }

      :host([color="secondary"].hover.hovermq),
      :host([color="secondary"].hover.hovermq),
      :host([color="secondary"].hover:not(.no-hovermq)),
      :host([color="secondary"].hover:not(.no-hovermq)) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([shape="pill-l"][color="tertiary"].hover.no-hovermq),
      :host([shape="pill-l"][color="tertiary"].hover.no-hovermq),
      :host([shape="pill-m"][color="tertiary"].hover.no-hovermq),
      :host([shape="pill-m"][color="tertiary"].hover.no-hovermq),
      :host([shape="pill-s"][color="tertiary"].hover.no-hovermq),
      :host([shape="pill-s"][color="tertiary"].hover.no-hovermq),
      :host([shape="pill-l"][color="tertiary"].hover:not(.no-hovermq)),
      :host([shape="pill-l"][color="tertiary"].hover:not(.no-hovermq)),
      :host([shape="pill-m"][color="tertiary"].hover:not(.no-hovermq)),
      :host([shape="pill-m"][color="tertiary"].hover:not(.no-hovermq)),
      :host([shape="pill-s"][color="tertiary"].hover:not(.no-hovermq)),
      :host([shape="pill-s"][color="tertiary"].hover:not(.no-hovermq)) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([color="tertiary"].hover.no-hovermq),
      :host([color="tertiary"].hover.no-hovermq),
      :host([color="tertiary"].hover:not(.no-hovermq)),
      :host([color="tertiary"].hover:not(.no-hovermq)) {
        background-color: rgba(var(--ui-1), var(--opacity-5));
      }

      :host([shape="square"].hover:not(.no-hovermq)) {
        background: rgba(var(--ui-1), var(--opacity-5)) !important;
      }

      :host([shape="circle"][color="tertiary"].hover.no-hovermq),
      :host([shape="circle"][color="tertiary"].hover.no-hovermq),
      :host([shape="circle"][color="tertiary"].hover:not(.no-hovermq)),
      :host([shape="circle"][color="tertiary"].hover:not(.no-hovermq)) {
        background-color: transparent;
      }

      :host([shape="circle"][color="tertiary"].hover.no-hovermq) sh-icon,
      :host([shape="circle"][color="tertiary"].hover.no-hovermq) sh-icon,
      :host([shape="circle"][color="tertiary"].hover:not(.no-hovermq)) sh-icon,
      :host([shape="circle"][color="tertiary"].hover:not(.no-hovermq)) sh-icon {
        opacity: var(--opacity-2);
      }

      :host(.hover.no-hovermq) .right.tooltip,
      :host(.hover.no-hovermq) .right.tooltip,
      :host(.hover.no-hovermq) .left.tooltip,
      :host(.hover.no-hovermq) .left.tooltip,
      :host(.hover.no-hovermq) .top.tooltip,
      :host(.hover.no-hovermq) .top.tooltip,
      :host(.hover.no-hovermq) .bottom.tooltip,
      :host(.hover.no-hovermq) .bottom.tooltip,
      :host(.hover:not(.no-hovermq)) .right.tooltip,
      :host(.hover:not(.no-hovermq)) .right.tooltip,
      :host(.hover:not(.no-hovermq)) .left.tooltip,
      :host(.hover:not(.no-hovermq)) .left.tooltip,
      :host(.hover:not(.no-hovermq)) .top.tooltip,
      :host(.hover:not(.no-hovermq)) .top.tooltip,
      :host(.hover:not(.no-hovermq)) .bottom.tooltip,
      :host(.hover:not(.no-hovermq)) .bottom.tooltip {
        opacity: 1;
        visibility: visible;
      }

      :host(.hover.no-hovermq) .top.tooltip,
      :host(.hover.no-hovermq) .top.tooltip,
      :host(.hover:not(.no-hovermq)) .top.tooltip,
      :host(.hover:not(.no-hovermq)) .top.tooltip {
        margin-top: -28px;
      }

      :host(.hover.no-hovermq) .bottom.tooltip,
      :host(.hover.no-hovermq) .bottom.tooltip,
      :host(.hover:not(.no-hovermq)) .bottom.tooltip,
      :host(.hover:not(.no-hovermq)) .bottom.tooltip {
        margin-top: 4px;
      }

      :host(.hover.no-hovermq) .left.tooltip,
      :host(.hover.no-hovermq) .left.tooltip,
      :host(.hover:not(.no-hovermq)) .left.tooltip,
      :host(.hover:not(.no-hovermq)) .left.tooltip {
        margin-right: 4px;
      }

      :host(.hover.no-hovermq) .right.tooltip,
      :host(.hover.no-hovermq) .right.tooltip,
      :host(.hover:not(.no-hovermq)) .right.tooltip,
      :host(.hover:not(.no-hovermq)) .right.tooltip {
        margin-left: 4px;
      }

      :host([color="primary"].active) {
        background-color: rgba(var(--ui-4), var(--opacity-1));
      }
      :host([color="secondary"].active) {
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }
      :host([shape="pill-l"][color="tertiary"].active),
      :host([shape="pill-m"][color="tertiary"].active),
      :host([shape="pill-s"][color="tertiary"].active) {
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }
      :host([color="tertiary"].active) {
        background-color: rgba(var(--ui-1), var(--opacity-7));
      }
      :host([color="primary"].active),
      :host([color="primary"].active) {
        background-color: rgba(var(--ui-4), var(--opacity-1)) !important;
      }
      :host([color="secondary"].active),
      :host([color="secondary"].active) {
        background-color: rgba(var(--ui-1), var(--opacity-7)) !important;
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
    <sh-icon icon$="[[icon]]"></sh-icon>
    <div class="button-label">[[label]]</div>
    <div id="tooltip" class$="tooltip [[tooltip]]">[[label]]</div>
`;
  }

  static get is() {
    return 'sh-button';
  }
  static get properties() {
    return {
      icon: {
        type: String,
        value: 'save',
        reflectToAttribute: true,
        notify: true
      },
      label: {
        type: String,
        value: 'label',
        reflectToAttribute: true,
        notify: true
      },
      shape: {
        type: String,
        value: 'pill-s',
        reflectToAttribute: true,
        notify: true
      },
      color: {
        type: String,
        value: 'primary',
        reflectToAttribute: true,
        notify: true
      },
      tooltip: {
        type: String,
        value: ''
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      role: {
        type: String,
        value: 'button',
        reflectToAttribute: true
      },
      href: {
        type: String,
        reflectToAttribute: true,
        notify: true
      }
    }
  }

  ready() {
    super.ready();
    if (!Modernizr.hovermq) {
      this.classList.add('no-hovermq');
    }
    this.addEventListener('click', function () {
      if (this.href !== undefined) {
        window.location.href = this.href;
      }
    });
    if(this.parentElement && this.parentElement.tagName!=='SH-MODAL' && !this.disabled){
      this.setAttribute('tabindex', '0');
    }
  }

  connectedCallback(){
    super.connectedCallback();
    this.addEventListener('focus', function(){
      this.onkeyup = function(e) {
        if(e.keyCode === 13){
          this.click();
        }
        if(e.keyCode === 9){
          this.style.outline = '2px solid rgb(59, 153, 252)';
          this.style.outlineOffset= '-2px';
          this.$.tooltip.style.opacity = 1;
          this.$.tooltip.style.visibility= 'visible';
        }
      }
    });
    this.addEventListener('blur', function(){
      this.style.outline = '';
      this.style.outlineOffset = '';
      this.$.tooltip.style.opacity = '';
      this.$.tooltip.style.visibility = '';
    });
  }

}
window.customElements.define(SHButton.is, SHButton);
