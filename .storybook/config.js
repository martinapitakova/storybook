import { configure } from '@storybook/vue';
//import { mapState } from "vuex/types";

//styles
import '../css/tailwind.css';
import '../dist/build.min.css'; //minified css

const path = require('path');

// automatically import all files ending in *.stories.js
configure(require.context('../app', true, /\.stories\.js$/), module);

