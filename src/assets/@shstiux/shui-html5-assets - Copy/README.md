# SHUI Baukasten

## Disclaimer

Every business line is responsible for the validity of their application.
This includes the verification of standard specifications (norms) and guidelines (e.g. manual).
PLM-UX is keeper of the style and communal metaphors only.
The code shared here serves as a reference implementation and shall in no way depict a fixed technology decision.
It shall be shared internally as well as contributed by all developers in Siemens Healthineers.
Sharing to external resources needs to be discussed with PLM-UX.

## Setup

Install npm, node and bower

```sh
npm i                                                 # will call bower i -
npm start                                             # runs devserver with online documentation
npm run build                                         # creates a shui.js in dist/ that is self-contained EXCEPT for webcomponents polyfills
```

After this, copy the `dist` folder under your web app base, and include `shui.js` and `shui-styles.css` in your application:

```html
<!-- if deploying offline, change path of the webcomponentsjs folder -->
<script type="text/javascript">
    var webcomponentsjsBase = "./bower_components/webcomponentsjs/";
</script>
<!-- import SHUI components -->
<script type="text/javascript" charset="utf-8" src="./dist/shui.js"></script>
<!-- import SHUI styles -->
<link rel="stylesheet" type="text/css" href="./dist/shui-styles.css">
```

Use the tags in your templates.

```html
<sh-... prop="value"></sh-...>