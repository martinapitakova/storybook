import { configure } from '@storybook/vue';
import { addParameters } from '@storybook/vue';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addParameters({
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
});
//import { mapState } from "vuex/types";

//styles
import '../css/tailwind.css';
import '../dist/build.min.css'; //minified sass

const path = require('path');

// automatically import all files ending in *.stories.js
configure(require.context('../app', true, /\.stories\.js$/), module);

