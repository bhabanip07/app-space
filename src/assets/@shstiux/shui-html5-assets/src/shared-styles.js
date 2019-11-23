/* -------------------------------------------------------------------------------------------------
Restricted - Copyright (C) Siemens Healthcare GmbH/Siemens Medical Solutions USA, Inc., 2019. All rights reserved
------------------------------------------------------------------------------------------------- */
import './global-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
        visibility: hidden;
      }

      ::-webkit-scrollbar-thumb {
        background-color: rgba(var(--ui-1), var(--opacity-6));
        border-radius: 8px;
      }

      ::-webkit-scrollbar-thumb:active,
      ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(var(--ui-1), var(--opacity-4))
      }

      ::-webkit-scrollbar-track {
        background-color: rgba(var(--ui-1), var(--opacity-7));
        border-radius: 8px;
      }

      *:active::-webkit-scrollbar-track:active {
        width: 16px;
      }

      sh-nav-bar::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        background-color: transparent !important;
        box-shadow: 0px !important;
      }

      @media (any-pointer:fine) {
        /*
          at least one input is "fine" - show arrows
          Up/Left arrow on the scrollbar button
          By default, only implemented for vertical scrollbar
          For specific styles for vertical scrollbar, use
          :vertical pseudo class. For horizontal scrollbar use
          :horizontal pseudo class
        */
        *:hover::-webkit-scrollbar-button:single-button:decrement {
          border-top-left-radius: 50%;
          border-top-right-radius: 50%;
          background-repeat: no-repeat;
          background-image: var(--arrow-up);
          background-position: center;
          background-size: contain;
          /* This scales the image to fit correctly, even when scrollbar is 8px wide */
          display: block;
          height: 16px;
          opacity: .1;
        }
        /*
          Down/Right arrow on the scrollbar button
          By default, only implemented for vertical scrollbar
          For specific styles for vertical scrollbar, use
          :vertical pseudo class. For horizontal scrollbar use
          :horizontal pseudo class
        */
        *:hover::-webkit-scrollbar-button:single-button:increment {
          border-bottom-left-radius: 50%;
          border-bottom-right-radius: 50%;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          background-image: var(--arrow-down);
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          display: block;
          height: 16px;
        }
        *:hover::-webkit-scrollbar-button:single-button:horizontal:decrement {
          background-image: var(--arrow-left);
     }
        *:hover::-webkit-scrollbar-button:single-button:horizontal:increment {
            background-image: var(--arrow-right);
          }
      }
      @media (any-pointer:coarse){
        ::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 2px;
        }
      }

      *[hidden] {
        display: none !important;
      }

      /* hr spacer */

      hr {
        border: none;
        -webkit-margin-before: 8px;
        -webkit-margin-after: 8px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
