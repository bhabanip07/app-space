/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class SHIcon extends PolymerElement {
    static get template() {
        return html `
    <!--CSS-->
    <style include="shared-styles">
      :host {
        display: flex;
        max-width: fit-content;
        max-width: -ms-fit-content;
        max-width: -moz-fit-content;
        color: var(--text-primary);
        transition: .2s all ease-in-out;
        outline: 0;
        position: relative;
      }

      :host(:not([icon])) {
        display: none;
      }

      :host([size="xs"]) {
        font-size: 16px;
        line-height: 16px;
        max-height: 16px;
        min-height: 16px;
        min-width: 16px;
      }

      :host([size="s"]) {
        font-size: 24px;
        line-height: 24px;
        max-height: 24px;
        min-height: 24px;
        min-width: 24px;
      }

      :host([size="m"]) {
        font-size: 32px;
        line-height: 32px;
        max-height: 32px;
        min-height: 32px;
        min-width: 32px;
      }

      :host([size="l"]) {
        font-size: 48px;
        line-height: 48px;
        max-height: 48px;
        min-height: 48px;
        min-width: 48px;
      }

      :host([disabled]) {
        pointer-events: none;
        cursor: default;
      }

      :host([disabled]) .icon-wrapper {
        opacity: var(--opacity-5) !important;
      }

      :host(:not([badge])) .badge {
        display: none;
      }

      .badge {
        position: absolute;
        top: -4px;
        right: -4px;
        height: 16px;
        width: 16px;
        padding: 4px 0px;
        background-color: rgb(var(--ui-0));
        font: var(--title-2);
        font-size: 10px;
        color: white;
        text-align: center;
        line-height: 8px;
        border-radius: 50%;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        pointer-events: none;
      }

      .badge[badge=""] {
        top: 0px;
        right: 0px;
        height: 8px;
        width: 8px;
      }

      .icon-wrapper {
        font-weight: normal;
        font-style: normal;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
        vertical-align: middle;
        display: flex;
        justify-content: center;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: 'liga';
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        min-width: 100%;
        font-family: 'sh-icons' !important;
      }

      :host([button]) .icon-wrapper {
        opacity: var(--opacity-3);
        cursor: pointer;
      }

      .icon-wrapper {
        position: relative;
        transition: .2s all ease-in-out;
      }

      .first,
      .second,
      .third,
      .fourth,
      .fifth {
        position: absolute;
        top: 0px;
        left: 0px;
      }

      /* hover */

      :host([button]:hover:not(.no-hovermq)) .icon-wrapper,
      :host([button].no-hovermq):hover .icon-wrapper {
        opacity: var(--opacity-2);
      }

      /* press (active) */
      :host([button].active:not(.no-hovermq)) .icon-wrapper,
      :host([button].no-hovermq).active .icon-wrapper {
        opacity: var(--opacity-3);
      }
      
      /*--css testing--*/
      :host(.testing), :host(.testing) *,
      :host(.testing) *:before :host(.testing) *:after,
      :host(.testing), :host(.testing) *,                         
      :host(.testing.hover), :host(.testing.hover) *,
      :host(.testing) *.hover *, :host(.testing) *.active *,
      :host(.testing.active), :host(.testing.active) *,
      :host(.testing) *.hover, :host(.testing) *.active  {
        transition : 0s all linear !important;
      }

      .icon-wrapper {
        position: relative;
      }

      /* native icons */
      .calculate .first:before { content: "\\E000"; }
      .calendar .first:before { content: "\\E001"; }
      .cancel .first:before { content: "\\E002"; }
      .edit .first:before { content: "\\E003"; }
      .export .first:before { content: "\\E004"; }
      .favorite .first:before { content: "\\E005"; }
      .filter .first:before { content: "\\E006"; }
      .help .first:before { content: "\\E007"; }
      .home .first:before { content: "\\E008"; }
      .import .first:before { content: "\\E009"; }
      .layout-1x1 .first:before { content: "\\E00A"; }
      .layout-2x1 .first:before { content: "\\E00B"; }
      .layout-2x2 .first:before { content: "\\E00C"; }
      .layout-3x2 .first:before { content: "\\E00D"; }
      .layout-4x4 .first:before { content: "\\E00E"; }
      .lock .first:before { content: "\\E00F"; }
      .marker .first:before { content: "\\E010"; }
      .minus .first:before { content: "\\E011"; }
      .open .first:before { content: "\\E012"; }
      .pan .first:before { content: "\\E013"; }
      .patient .first:before { content: "\\E014"; }
      .patient-browser .first:before { content: "\\E015"; }
      .patient-scheduler .first:before { content: "\\E016"; }
      .pause .first:before { content: "\\E017"; }
      .play .first:before { content: "\\E018"; }
      .plus .first:before { content: "\\E019"; }
      .print .first:before { content: "\\E01A"; }
      .radiation .first:before { content: "\\E01B"; }
      .redo .first:before { content: "\\E01C"; }
      .rotate-2d .first:before { content: "\\E01D"; }
      .rotate-3d .first:before { content: "\\E01E"; }
      .save .first:before { content: "\\E01F"; }
      .save-as .first:before { content: "\\E020"; }
      .scanner .first:before { content: "\\E021"; }
      .search .first:before { content: "\\E022"; }
      .settings .first:before { content: "\\E023"; }
      .skip-backward .first:before { content: "\\E024"; }
      .skip-forward .first:before { content: "\\E025"; }
      .snapshot .first:before { content: "\\E026"; }
      .stop .first:before { content: "\\E027"; }
      .studies .first:before { content: "\\E028"; }
      .text .first:before { content: "\\E029"; }
      .undo .first:before { content: "\\E02A"; }
      .unlock .first:before { content: "\\E02B"; }
      .up .first:before { content: "\\E02C"; }
      .windowing .first:before { content: "\\E02D"; }
      .zoom .first:before { content: "\\E02E"; }
      .zoom-minus .first:before { content: "\\E02F"; }
      .zoom-plus .first:before { content: "\\E030"; }
      .menu .first:before { content: "\\E035"; }
      .left-s .first:before,
      .arrow-face-left-s .first:before { content: "\\E036"; }
      .right-s .first:before,
      .arrow-face-right-s .first:before { content: "\\E037"; }
      .up-s .first:before,
      .arrow-face-up-s .first:before { content: "\\E038"; }
      .arrow-down-s .first:before,
      .arrow-line-down-s .first:before { content: "\\E039"; }
      .arrow-left-s .first:before,
      .arrow-line-left-s .first:before { content: "\\E03A"; }
      .arrow-right-s .first:before,
      .arrow-line-right-s .first:before { content: "\\E03B"; }
      .arrow-up-s .first:before,
      .arrow-line-up-s .first:before { content: "\\E03C"; }
      .down-s .first:before,
      .arrow-face-down-s .first:before { content: "\\E03D"; }
      .chapter .first:before { content: "\\E03E"; }
      .document .first:before { content: "\\E0F6"; }
      .page .first:before { content: "\\E040"; }
      .pdf .first:before { content: "\\E041"; }
      .more .first:before { content: "\\E042"; }
      .grid-3d .first:before { content: "\\E043"; }
      .backward-4d .first:before { content: "\\E044"; }
      .data-correct-4d .first:before { content: "\\E045"; }
      .forward-4d .first:before { content: "\\E046"; }
      .series-create-4d .first:before { content: "\\E047"; }
      .series-split-4d .first:before { content: "\\E048"; }
      .ablation-catheter-settings .first:before { content: "\\E049"; }
      .ablation-catheter-connection-settings .first:before { content: "\\E04A"; }
      .acquisition-note .first:before { content: "\\E04B"; }
      .acquisition-time .first:before { content: "\\E04C"; }
      .acquisition-wizard .first:before { content: "\\E04D"; }
      .action-failed .first:before { content: "\\E04E"; }
      .add-circle .first:before { content: "\\E04F"; }
      .add-line .first:before { content: "\\E050"; }
      .add-needle .first:before { content: "\\E051"; }
      .add-polygon .first:before { content: "\\E052"; }
      .add-rectangle .first:before { content: "\\E053"; }
      .add-snapshot .first:before { content: "\\E054"; }
      .addin-info .first:before { content: "\\E055"; }
      .addin-warning .first:before { content: "\\E056"; }
      .adjust-c-arm .first:before { content: "\\E057"; }
      .adjust-gamma-level .first:before { content: "\\E058"; }
      .adjust-needle .first:before { content: "\\E059"; }
      .adjust-objects .first:before { content: "\\E05A"; }
      .adjust-virtual-stent .first:before { content: "\\E05B"; }
      .adjustment-volume-hide .first:before { content: "\\E05C"; }
      .airways-measurement .first:before { content: "\\E05D"; }
      .algorithm-parameters-default .first:before { content: "\\E05E"; }
      .anatomical-background .first:before { content: "\\E05F"; }
      .angio-view .first:before { content: "\\E060"; }
      .annulus-plane .first:before { content: "\\E061"; }
      .aorta-reference-region .first:before { content: "\\E062"; }
      .aortic-valve-plane .first:before { content: "\\E063"; }
      .apply-segment-orientation .first:before { content: "\\E064"; }
      .arrow-down-2 .first:before { content: "\\E065"; }
      .arrow-left-2 .first:before { content: "\\E066"; }
      .arrow-right-2 .first:before { content: "\\E067"; }
      .arrow-up-2 .first:before { content: "\\E068"; }
      .auto-align-scout-failed .first:before { content: "\\E069"; }
      .auto-iso .first:before { content: "\\E06A"; }
      .auto-map-image .first:before { content: "\\E06B"; }
      .auto-pixelshift .first:before { content: "\\E06C"; }
      .auto-segmentation .first:before { content: "\\E06D"; }
      .c-arm .first:before { content: "\\E06E"; }
      .auto-tod .first:before { content: "\\E06F"; }
      .arrow-down .first:before,
      .arrow-line-down-l .first:before { content: "\\E070"; }
      .arrow .first:before { content: "\\E071"; }
      .angle .first:before { content: "\\E072"; }
      .arrow-up .first:before ,
      .arrow-line-up-l .first:before { content: "\\E073"; }
      .arrow-right .first:before,
      .arrow-line-right-l .first:before { content: "\\E074"; }
      .arrow-left .first:before,
      .arrow-line-left-l .first:before { content: "\\E075"; }
      .three-point-mode .first:before { content: "\\E076"; }
      .artery-define .first:before { content: "\\E077"; }
      .balance-out-pressure .first:before { content: "\\E078"; }
      .battery-1-vertical .first:before { content: "\\E079"; }
      .battery-2-vertical .first:before { content: "\\E07A"; }
      .battery-3-horizontal .first:before { content: "\\E07B"; }
      .battery-3-vertical .first:before { content: "\\E07C"; }
      .battery-4-vertical .first:before { content: "\\E07D"; }
      .battery-charging .first:before { content: "\\E07E"; }
      .battery-empty-horizontal .first:before { content: "\\E07F"; }
      .battery-full-horizontal .first:before { content: "\\E080"; }
      .battery-full-vertical .first:before { content: "\\E081"; }
      .battery-low-horizontal .first:before { content: "\\E082"; }
      .bd-vessel-align .first:before { content: "\\E083"; }
      .black-box .first:before { content: "\\E084"; }
      .blood-lv-edit .first:before { content: "\\E085"; }
      .blood-removal .first:before { content: "\\E086"; }
      .blood-volume .first:before { content: "\\E087"; }
      .bold .first:before { content: "\\E088"; }
      .bone-cad-active .first:before { content: "\\E089"; }
      .bone-cad-display .first:before { content: "\\E08A"; }
      .bone-removal .first:before { content: "\\E08B"; }
      .bone-removal-auto .first:before { content: "\\E08C"; }
      .bone-removal-body .first:before { content: "\\E08D"; }
      .bone-removal-body-de .first:before { content: "\\E08E"; }
      .bone-removal-edit .first:before { content: "\\E08F"; }
      .bone-removal-head .first:before { content: "\\E090"; }
      .bone-removal-head-de .first:before { content: "\\E091"; }
      .bone-removal-leg .first:before { content: "\\E092"; }
      .bone-removal-structure-isolation .first:before { content: "\\E093"; }
      .bone-removal-tools .first:before { content: "\\E094"; }
      .bones-hide .first:before { content: "\\E095"; }
      .bones-show .first:before { content: "\\E096"; }
      .bookmark-add .first:before { content: "\\E097"; }
      .bookmark-segment .first:before { content: "\\E098"; }
      .brain .first:before { content: "\\E099"; }
      .breast-biopsy .first:before { content: "\\E09A"; }
      .breast-lesion-marker .first:before { content: "\\E09B"; }
      .brightness-decrease .first:before { content: "\\E09C"; }
      .brightness-increase .first:before { content: "\\E09D"; }
      .broad-worklist-query .first:before { content: "\\E09E"; }
      .bullets .first:before { content: "\\E09F"; }
      .cable-winder .first:before { content: "\\E0A0"; }
      .calcium-remove .first:before { content: "\\E0A1"; }
      .calculation-cancel .first:before { content: "\\E0A2"; }
      .caliper-measurement .first:before { content: "\\E0A3"; }
      .cardiac-layout-edit .first:before { content: "\\E0A4"; }
      .cardiac-mask-edit .first:before { content: "\\E0A5"; }
      .cardiac-output .first:before { content: "\\E0A6"; }
      .care-position .first:before { content: "\\E0A7"; }
      .cascoring-show-original .first:before { content: "\\E0A8"; }
      .catheter-pullback .first:before { content: "\\E0A9"; }
      .cava-calculate .first:before { content: "\\E0AA"; }
      .cava-prepare .first:before { content: "\\E0AB"; }
      .chamber-left .first:before { content: "\\E0AC"; }
      .chamber-middle .first:before { content: "\\E0AD"; }
      .chamber-right .first:before { content: "\\E0AE"; }
      .change-view .first:before { content: "\\E0AF"; }
      .cinematic-vrt .first:before { content: "\\E0B0"; }
      .close-patient .first:before { content: "\\E0B1"; }
      .coil-information .first:before { content: "\\E0B2"; }
      .coils-hide .first:before { content: "\\E0B3"; }
      .colon-show-marked .first:before { content: "\\E0B4"; }
      .colon-solid-view .first:before { content: "\\E0B5"; }
      .combine .first:before { content: "\\E0B6"; }
      .compare-protocols .first:before { content: "\\E0B7"; }
      .compute-maps .first:before { content: "\\E0B8"; }
      .configurations-sync .first:before { content: "\\E0B9"; }
      .confirmation .first:before { content: "\\E0BA"; }
      .contour-copy .first:before { content: "\\E0BB"; }
      .contour-delete-all .first:before { content: "\\E0BC"; }
      .contour-delete-single .first:before { content: "\\E0BD"; }
      .contour-draw-new .first:before { content: "\\E0BE"; }
      .contour-edit .first:before { content: "\\E0BF"; }
      .contour-edit-slices .first:before { content: "\\E0C0"; }
      .contour-preview .first:before { content: "\\E0C1"; }
      .contour-redraw .first:before { content: "\\E0C2"; }
      .contour-reflect .first:before { content: "\\E0C3"; }
      .contour-rv-edit .first:before { content: "\\E0C4"; }
      .contour-threshold .first:before { content: "\\E0C5"; }
      .contour-undo .first:before { content: "\\E0C6"; }
      .contours-compute .first:before { content: "\\E0C7"; }
      .contours-edit .first:before { content: "\\E0C8"; }
      .contours-reset .first:before { content: "\\E0C9"; }
      .contours-show .first:before { content: "\\E0CA"; }
      .contrast-agent-administration-applied .first:before { content: "\\E0CB"; }
      .contrast-decrease .first:before { content: "\\E0CC"; }
      .contrast-increase .first:before { content: "\\E0CD"; }
      .contrast-optimum .first:before { content: "\\E0CE"; }
      .control-panel .first:before { content: "\\E0CF"; }
      .convert-to .first:before { content: "\\E0D0"; }
      .copy-and-go .first:before { content: "\\E0D1"; }
      .copy-image-to-clipboard .first:before { content: "\\E0D2"; }
      .copy-paste .first:before { content: "\\E0D3"; }
      .copy-reference-new .first:before { content: "\\E0D4"; }
      .copy-reference-source .first:before { content: "\\E0D5"; }
      .copy-reference-target .first:before { content: "\\E0D6"; }
      .copy-reference-target-busy .first:before { content: "\\E0D7"; }
      .copy-reference-target-error .first:before { content: "\\E0D8"; }
      .copy-reference-target-warning .first:before { content: "\\E0D9"; }
      .coronary-tree .first:before { content: "\\E0DA"; }
      .correlated-cursors .first:before { content: "\\E0DB"; }
      .create-view-catheter-lab .first:before { content: "\\E0DC"; }
      .csi-matrix-interpolated .first:before { content: "\\E0DD"; }
      .csi-matrix-scan .first:before { content: "\\E0DE"; }
      .ct-laser-zero .first:before { content: "\\E0DF"; }
      .cut .first:before { content: "\\E0E0"; }
      .cutline-3d-draw .first:before { content: "\\E0E1"; }
      .cutline-smooth .first:before { content: "\\E0E2"; }
      .down .first:before { content: "\\E0E3"; }
      .distance-line .first:before { content: "\\E0E4"; }
      .delete .first:before { content: "\\E0E5"; }
      .checkmark .first:before { content: "\\E0E6"; }
      .contrast-administration .first:before { content: "\\E0E7"; }
      .scheduled .first:before,
      .time .first:before { content: "\\E0E8"; }
      .patient-scan .first:before { content: "\\E0E9"; }
      .reconstruction-running .first:before { content: "\\E0EA"; }
      .circle-filled .first:before { content: "\\E0EB"; }
      .circle-half .first:before { content: "\\E0EC"; }
      .circle-outline .first:before { content: "\\E0ED"; }
      .apps .first:before { content: "\\E0EE"; }
      .camera .first:before { content: "\\E0EF"; }
      .library .first:before { content: "\\E0F0"; }
      .upload-partner .first:before { content: "\\E0F7"; }
      .upload-user .first:before { content: "\\E0F9"; }
      .reject .first:before { content: "\\E0F3"; }
      .sort-custom .first:before { content: "\\E0F4"; }
      .standby .first:before { content: "\\E0F5"; }
      .user-avatar .first:before { content: "\\E0F8"; }
      .show .first:before { content: "\\E101"; }
      .pause-circle .first:before { content: "\\E121"; }
      .gantry-tilt-zero .first:before { content: "\\E127"; }
      .go-to-console .first:before { content: "\\E128"; }
      .table-height .first:before { content: "\\E12B"; }
      .table-in .first:before { content: "\\E12C"; }
      .table-longitudinal .first:before { content: "\\E12D"; }
      .table-out .first:before { content: "\\E12E"; }
      .voice-command-record .first:before { content: "\\E12F"; }
      .heart-bodypart .first:before { content: "\\E131"; }
      .image .first:before { content: "\\E132"; }
      .shopping-cart .first:before { content: "\\E134"; }
      .notification-center .first:before { content: "\\E135"; }
      .edit-partner .first:before { content: "\\E136"; }
      .edit-user .first:before { content: "\\E137"; }
      .logoff .first:before { content: "\\E138"; }
      .invert .first:before { content: "\\E145"; }
      .image-text-custom .first:before { content: "\\E141"; }
      .image-text-configuration .first:before { content: "\\E140"; }
      .image-text-full .first:before { content: "\\E142"; }
      .rotate-left .first:before { content: "\\E14B"; }
      .rotate-right .first:before { content: "\\E14E"; }
      .finding-add .first:before { content: "\\E139"; }
      .finding-add .first:before { content: "\\E139"; }
      .mip .first:before { content: "\\E152"; }
      .roi-circle .first:before { content: "\\E153"; }
      .roi-ellipsis .first:before { content: "\\E154"; }
      .roi-freehand .first:before { content: "\\E155"; }
      .roi-polygonal .first:before { content: "\\E156"; }
      .roi-rectangle .first:before { content: "\\E157"; }
      .scroll .first:before { content: "\\E15A"; }
      .vrt .first:before { content: "\\E158"; }
      .delete-number .first:before { content: "\\E901"; }
      .compass-direction .first:before { content: "\\E900"; }
      .speakers-off .first:before { content: "\\E904"; }
      .speakers-on .first:before { content: "\\E905"; }
      .workstation-free-fd .first:before { content: "\\E933"; }
      .timer .first:before { content: "\\E92f"; }
      .switch-monitor .first:before { content: "\\E92e"; }
      .signal-strength-5 .first:before { content: "\\E92C"; }
      .signal-strength-0 .first:before { content: "\\E92C"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .show-all-monitors .first:before { content: "\\E923"; }
      .reset .first:before { content: "\\E91E"; }
      .patient-size-small .first:before { content: "\\E91B"; }
      .patient-size-large .first:before { content: "\\E91A"; }
      .open-chat .first:before { content: "\\E919"; }
      .focus-small .first:before { content: "\\E914"; }
      .focus-big .first:before { content: "\\E913"; }
      .fluoroscopy-control .first:before { content: "\\E912"; }
      .exposure-time-increase .first:before { content: "\\E911"; }
      .exposure-time-decrease .first:before { content: "\\E910"; }
      .expert-i .first:before { content: "\\E90F"; }
      .dual-monitor-mode .first:before { content: "\\E90E"; }
      .channel-3 .first:before { content: "\\E909"; }
      .channel-2 .first:before { content: "\\E908"; }
      .channel-1 .first:before { content: "\\E907"; }
      .balance-out-pressure .first:before { content: "\\E906"; }
      .like .first:before { content: "\\E93D"; }
      .dislike .first:before { content: "\\E939"; }
      .double-arrow-face-up-s .first:before { content: "\\E941"; }
      .double-arrow-face-down-s .first:before { content: "\\E93E"; }
      .double-arrow-face-left-s .first:before { content: "\\E93F"; }
      .double-arrow-face-right-s .first:before { content: "\\E940"; }
      .sync-on .first:before { content: "\\E94B"; }
      .share .first:before { content: "\\E948"; }
      .laser .first:before { content: "\\E943"; }
      .monitors .first:before { content: "\\E942"; }
      .positive-negative .first:before { content: "\\E94E"; }
      .connected-tablet-0 .first:before { content: "\\E95C"; }
      .connected-tablet-1 .first:before { content: "\\E95D"; }
      .connected-tablet-2 .first:before { content: "\\E95E"; }
      .connected-tablet-3 .first:before { content: "\\E95F"; }
      .connected-tablet-4 .first:before { content: "\\E960"; }
      .connected-tablet-5 .first:before { content: "\\E961"; }
      .send-rating-feedback .first:before,
      .rating .first:before { content: "\\E922"; }
      .delivery .first:before { content: "\\E962"; }
      .envelope .first:before { content: "\\E963"; }
      .eraser .first:before { content: "\\E964"; }
      .financial-value .first:before { content: "\\E965"; }
      .image-quality-check .first:before { content: "\\E966"; }
      .refresh .first:before { content: "\\E96F"; }
      .scanner-settings .first:before { content: "\\E970"; }
      .series .first:before { content: "\\E971"; }
      .upload .first:before { content: "\\E974"; }
      .colon-solid-view .first:before { content: "\\E975"; }
      .drug-pharmaceutical .first:before { content: "\\E976"; }
      .liver .first:before { content: "\\E979"; }
      .mark-left .first:before { content: "\\E97C"; }
      .mark-right .first:before { content: "\\E97D"; }
      .surgery .first:before { content: "\\E97E"; }
      .light-all .first:before { content: "\\E985"; }

      :host([size="xs"]) .information .first:before { content: "\\E950"; }
      :host([size="xs"]) .information .second:before { content: "\\E032"; color: rgba(var(--ui-7), var(--opacity-1)) }
      :host([size="s"]) .information .first:before { content: "\\E957"; }
      :host([size="s"]) .information .second:before { content: "\\E959"; color: rgba(var(--ui-7), var(--opacity-1)) }
      :host([size="m"]) .information .first:before { content: "\\E94F"; }
      :host([size="m"]) .information .second:before { content: "\\E952"; color: rgba(var(--ui-7), var(--opacity-1)) }

      :host([size="xs"]) .error .first:before { content: "\\E950"; color: rgba(var(--functional-red), var(--opacity-1)) }
      :host([size="xs"]) .error .second:before { content: "\\E031"; color: white }
      :host([size="s"]) .error .first:before { content: "\\E957"; color: rgba(var(--functional-red), var(--opacity-1)) }
      :host([size="s"]) .error .second:before { content: "\\E958"; color: white }
      :host([size="m"]) .error .first:before { content: "\\E94F"; color: rgba(var(--functional-red), var(--opacity-1)) }
      :host([size="m"]) .error .second:before { content: "\\E951"; color: white }

      :host([size="xs"]) .success .first:before { content: "\\E950"; color: rgba(var(--functional-green), var(--opacity-1)) }
      :host([size="xs"]) .success .second:before { content: "\\E033"; color: white }
      :host([size="s"]) .success .first:before { content: "\\E957"; color: rgba(var(--functional-green), var(--opacity-1)) }
      :host([size="s"]) .success .second:before { content: "\\E95A"; color: white }
      :host([size="m"]) .success .first:before { content: "\\E94F"; color: rgba(var(--functional-green), var(--opacity-1)) }
      :host([size="m"]) .success .second:before { content: "\\E953"; color: white }

      :host([size="xs"]) .warning .first:before { content: "\\E950"; color: rgba(var(--functional-yellow), var(--opacity-1)) }
      :host([size="xs"]) .warning .second:before { content: "\\E034"; color: black }
      :host([size="s"]) .warning .first:before { content: "\\E957"; color: rgba(var(--functional-yellow), var(--opacity-1)) }
      :host([size="s"]) .warning .second:before { content: "\\E95B"; color: black }
      :host([size="m"]) .warning .first:before { content: "\\E94F"; color: rgba(var(--functional-yellow), var(--opacity-1)) }
      :host([size="m"]) .warning .second:before { content: "\\E954"; color: black }

      .two-d-view .first:before { content: "\\E14F"; }
      .two-d-view .second:before { content: "\\E151"; color: rgba(var(--ui-1), var(--opacity-5)) }
      .airways-analyse .first:before { content: "\\E0FE"; }
      .airways-analyse .second:before { content: "\\E0FD"; color: rgba(var(--ui-1), var(--opacity-5)) }
      .hide .first:before { content: "\\E100"; }
      .hide .second:before { content: "\\E0FF"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .head-first-supine .first:before { content: "\\E102"; }
      .head-first-supine .second:before { content: "\\E103"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .head-first-left-lateral .first:before { content: "\\E104"; }
      .head-first-left-lateral .second:before { content: "\\E105"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .head-first-right-lateral .first:before { content: "\\E106"; }
      .head-first-right-lateral .second:before { content: "\\E107"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .head-first-prone .first:before { content: "\\E108"; }
      .head-first-prone .second:before { content: "\\E109"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .feet-first-supine .first:before { content: "\\E10A"; }
      .feet-first-supine .second:before { content: "\\E10B"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .feet-first-left-lateral .first:before { content: "\\E10A"; }
      .feet-first-left-lateral .second:before { content: "\\E10C"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .feet-first-right-lateral .first:before { content: "\\E10A"; }
      .feet-first-right-lateral .second:before { content: "\\E10D"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .head-left-supine .first:before { content: "\\E10F"; }
      .head-left-supine .second:before { content: "\\E110"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .head-left-prone .first:before { content: "\\E111"; }
      .head-left-prone .second:before { content: "\\E112"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .head-right-supine .first:before { content: "\\E113"; }
      .head-right-supine .second:before { content: "\\E114"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .head-right-prone .first:before { content: "\\E115"; }
      .head-right-prone .second:before { content: "\\E116"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .upright .first:before { content: "\\E117"; }
      .upright .second:before { content: "\\E118"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .position-undefined .first:before { content: "\\E10A"; }
      .position-undefined .second:before { content: "\\E119"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .plantar .first:before { content: "\\E10A"; }
      .plantar .second:before { content: "\\E11A"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .superman-supine-wrist .first:before { content: "\\E11F"; }
      .superman-supine-wrist .second:before { content: "\\E11C"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .superman-prone-wrist .first:before { content: "\\E11D"; }
      .superman-prone-wrist .second:before { content: "\\E11E"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .superman-supine-elbow .first:before { content: "\\E11B"; }
      .superman-supine-elbow .second:before { content: "\\E11C"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .superman-prone-elbow .first:before { content: "\\E120"; }
      .superman-prone-elbow .second:before { content: "\\E11E"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .gantry-tilt .first:before { content: "\\E130"; }
      .gantry-tilt .second:before { content: "\\E122"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .gantry-tilt-left .first:before { content: "\\E123"; }
      .gantry-tilt-left .second:before { content: "\\E124"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .gantry-tilt-right .first:before { content: "\\E126"; }
      .gantry-tilt-right .second:before { content: "\\E125"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .image-hide .first:before { content: "\\E12A"; }
      .image-hide .second:before { content: "\\E129"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .image-text-hide .first:before { content: "\\E144"; }
      .image-text-hide .second:before { content: "\\E143"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .rotate-cw-90 .first:before { content: "\\E149"; }
      .rotate-cw-90 .second:before { content: "\\E14A"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .rotate-ccw-90 .first:before { content: "\\E147"; }
      .rotate-ccw-90 .second:before { content: "\\E148"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .pixel-lens .first:before { content: "\\E146"; }
      .pixel-lens .second:before { content: "\\E150"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .rotate-perpendicular .first:before { content: "\\E14C"; }
      .rotate-perpendicular .second:before { content: "\\E14D"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .flip-horizontal .first:before { content: "\\E13B"; }
      .flip-horizontal .second:before { content: "\\E13A"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .flip-vertical .first:before { content: "\\E13F"; }
      .flip-vertical .second:before { content: "\\E13E"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .flip-popup .first:before { content: "\\E13D"; }
      .flip-popup .second:before { content: "\\E13C"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .ecg-connection-state .first:before { content: "\\E902"; }
      .ecg-connection-state .second:before { content: "\\E903"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .signal-strength-4 .first:before { content: "\\E92A"; }
      .signal-strength-4 .second:before { content: "\\E92B"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .signal-strength-3 .first:before { content: "\\E928"; }
      .signal-strength-3 .second:before { content: "\\E929"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .signal-strength-2 .first:before { content: "\\E926"; }
      .signal-strength-2 .second:before { content: "\\E927"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .signal-strength-1 .first:before { content: "\\E924"; }
      .signal-strength-1 .second:before { content: "\\E925"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .select-monitor .first:before { content: "\\E920"; }
      .select-monitor .second:before { content: "\\E91F"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .patient-table .first:before { content: "\\E91D"; }
      .patient-table .second:before { content: "\\E91C"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .intervention-layout-switch .first:before { content: "\\E916"; }
      .intervention-layout-switch .second:before { content: "\\E915"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .connection-quality-low .first:before { content: "\\E90C"; }
      .connection-quality-low .second:before { content: "\\E90D"; color: rgba(var(--ui-1), var(--opacity-4)) }
      .compass-direction-w .first:before { content: "\\E90B"; color: #000000}
      .compass-direction-w .second:before { content: "\\E90A"; color: rgba(var(--functional-yellow), var(--opacity-1)) }
      .show-breathing-curve .first:before { content: "\\E949";}
      .show-breathing-curve .second:before { content: "\\E94A";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .relative-zero-position .first:before { content: "\\E946";}
      .relative-zero-position .second:before { content: "\\E947";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .patient-mark .first:before { content: "\\E944";}
      .patient-mark .second:before { content: "\\E945";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .physician .first:before { content: "\\E94C";}
      .physician .second:before { content: "\\E94D";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .table-removal .first:before { content: "\\E972";}
      .table-removal .second:before { content: "\\E973";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .mdt-ready .first:before { content: "\\E96D";}
      .mdt-ready .second:before { content: "\\E96E";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .kidneys .first:before { content: "\\E977";}
      .kidneys .second:before { content: "\\E978";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .lung .first:before { content: "\\E97A";}
      .lung .second:before { content: "\\E97B";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .light-funnel .first:before { content: "\\E986";}
      .light-funnel .second:before { content: "\\E987";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .light-ring .first:before { content: "\\E988";}
      .light-ring .second:before { content: "\\E989";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .rt-laser-switch .first:before { content: "\\E98B";}
      .rt-laser-switch .second:before { content: "\\E98A";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .rt-laser-zero .first:before { content: "\\E991"; color: #009A38 }
      .rt-laser-zero .second:before { content: "\\E992"; color: #ffffff  }
      .rt-laser-not-zero .first:before { content: "\\E993"; color: #FFD200 }
      .rt-laser-not-zero .second:before { content: "\\E994"; color: #000000  }
      .show-laser-crosshair .first:before { content: "\\E99A";}
      .show-laser-crosshair .second:before { content: "\\E99B";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .user-position-left .first:before { content: "\\E99C";}
      .user-position-left .second:before { content: "\\E99D";  color: rgba(var(--ui-1), var(--opacity-4)) }
      .user-position-right .first:before { content: "\\E99E";}
      .user-position-right .second:before { content: "\\E99F";  color: rgba(var(--ui-1), var(--opacity-4)) }

      .connection-quality-medium .first:before { content: "\\E93C"; }
      .connection-quality-medium .second:before { content: "\\E93B"; color: rgba(var(--ui-1), var(--opacity-3)) }
      .connection-quality-medium .third:before { content: "\\E93A";  color: rgba(var(--ui-1), var(--opacity-4))}
      .feet-first-prone .first:before { content: "\\E10A"; }
      .feet-first-prone .second:before { content: "\\E10E"; }
      .feet-first-prone .third:before { content: "\\E921"; color: rgba(var(--ui-1), var(--opacity-4)) }

      .connection-quality-high .first:before { content: "\\E93C"; }
      .connection-quality-high .second:before { content: "\\E937";  color: rgba(var(--ui-1), var(--opacity-2))}
      .connection-quality-high .third:before { content: "\\E938";  color: rgba(var(--ui-1), var(--opacity-3))}
      .connection-quality-high .fourth:before { content: "\\E935";  color: rgba(var(--ui-1), var(--opacity-4))}
      .connection-quality-high .fifth:before { content: "\\E936";  color: rgba(var(--ui-1), var(--opacity-5))}

      /* WIP */
      :host(:not([color])) .lines-show .first:before { content: "\\E917"; color: rgba(var(--ui-1), var(--opacity-4)) }
      :host([color]) .lines-show .first:before { content: "\\E917"; color: rgba(var(--ui-1), var(--opacity-1)) }
      .lines-show .second:before { content: "\\E918"; }

      .show-hide-metal .first:before { content: "\\E956"; color: rgba(var(--ui-1), var(--opacity-1)) }
      .show-hide-metal .second:before { content: "\\E955"; }

      .topogram .first:before { content: "\\E931"; color: rgba(var(--ui-1), var(--opacity-1)) }
      .topogram .second:before { content: "\\E932";  }

      .mdt-postponed .first:before { content: "\\E96A"; color: rgba(var(--ui-1), var(--opacity-1)) }
      .mdt-postponed .second:before { content: "\\E96B";  }
      :host(:not([color])) .mdt-postponed .third:before { content: "\\E96C"; color: rgba(var(--ui-1), 0) }
      :host([color]) .mdt-postponed .third:before { content: "\\E96C"; color:#000000 }

      .mdt-done .first:before { content: "\\E967"; color: rgba(var(--ui-1), var(--opacity-1))}
      .mdt-done .second:before { content: "\\E968"; }
      :host(:not([color])) .mdt-done .third:before { content: "\\E969"; color: rgba(var(--ui-1), 0) }
      :host([color]) .mdt-done .third:before { content: "\\E969"; color: #ffffff }

      .trend-up .first:before { content: "\\E982";  }
      :host(:not([color])) .trend-up .second:before { content: "\\E983"; color: rgba(var(--ui-1), 0) }
      :host([color]) .trend-up .second:before { content: "\\E983"; color: #ffffff }

      .trend-stable .first:before { content: "\\E981";  }
      :host(:not([color])) .trend-stable .second:before { content: "\\E984"; color: rgba(var(--ui-1), 0) }
      :host([color]) .trend-stable .second:before { content: "\\E984"; color: #000000 }

      .trend-down .first:before { content: "\\E97F";  }
      :host(:not([color])) .trend-down .second:before { content: "\\E980"; color: rgba(var(--ui-1), 0) }
      :host([color]) .trend-down .second:before { content: "\\E980"; color: #ffffff }

    </style>

    <!--HTML-->
    <div class$="icon-wrapper [[icon]]">
      <div class="first"></div>
      <div class="second"></div>
      <div class="third"></div>
      <div class="fourth"></div>
      <div class="fifth"></div>
    </div>
    <div class="badge" badge$="[[badge]]">[[badge]]</div>
`;
    }

    static get is() {
        return 'sh-icon';
    }
    static get properties() {
        return {
            icon: {
                type: String,
                notify: true,
                reflectToAttribute: true,
                observer: 'updateIcon'
            },
            button: {
                type: Boolean,
                value: false
            },
            color: {
                type: String,
                reflectToAttribute: true,
                notify: true,
                observer: 'updateColor'
            },
            disabled: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                notify: true
            },
            size: {
                type: String,
                value: 'm',
                reflectToAttribute: true,
                notify: true
            },
            href: {
                type: String,
                reflectToAttribute: true
            },
            badge: {
                type: String,
                value: undefined,
                reflectToAttribute: true,
                notify: true
            }
        }
    }

    ready() {
        super.ready();
        this.updateIcon();
        this.updateColor();
        if (!Modernizr.hovermq) {
            this.classList.add('no-hovermq');
        }
        this.addEventListener("click", function(e) {
            if (this.href !== undefined) {
                window.location.href = this.href;
            }
            if(this.disabled){
              e.stopImmediatePropagation();
            }
            
        });
        this.addEventListener('mousedown', function() {
            this.addActiveClass();
        })
        this.addEventListener('mouseup', function() {
            this.removeActiveClass();
        })

    }
    addActiveClass() {
        this.classList.add('active');
    }
    removeActiveClass() {
        this.classList.remove('active');
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('focus', function(e) {
            this.onkeyup = function(e) {
                if (e.keyCode == 9) {
                    this.style.outline = '2px solid rgb(59, 153, 252)';
                    this.style.outlineOffset = '-2px';
                }

                if (e.keyCode === 13 || e.keyCode === 32) {
                    this.click();
                }
            }
        })
        this.addEventListener('blur', function(e) {
            this.style.outline = '';
            this.style.outlineOffset = '';
        })
    }
    updateIcon() {
        if (this.icon && this.icon.indexOf('url') >= 0) {
            this.shadowRoot.querySelector('.icon-wrapper').style.backgroundImage = this.icon;
        }
    }
    updateColor() {
        if (this.color !== undefined) {
            this.style.color = this.color;
        }
    }
}
window.customElements.define(SHIcon.is, SHIcon);
