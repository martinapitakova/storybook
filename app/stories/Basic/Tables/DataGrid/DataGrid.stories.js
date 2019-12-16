import { storiesOf } from '@storybook/vue/dist/client/index';
import { action } from '@storybook/addon-actions/dist/index';
import { withKnobs, text, boolean, select, array, object } from '@storybook/addon-knobs/dist/index';
import { withA11y } from '@storybook/addon-a11y/dist/index';

//import doc notes
import markdownNotes from '../../../../notes/Basic/Tables/DataGrid/DataGrid-default.md';

//import vuex store
import store from "../../../../store";
import { mapState } from 'vuex'

//import vue component
import DataGrid from '../../../../components/DataGrid';

//init  stories for component
const stories = storiesOf('Basic|Tables/DataGrid', module);

//add stories decorators
stories.addDecorator(withKnobs);
stories.addDecorator(withA11y);


//declare stories
stories.add('default', () => ({
    components: { DataGrid },
    template: `<dataGrid :items="data.default" :headTitles="headTitles.default" :filters="filters.default"/>`,
    computed: {
        ...mapState(["headTitles"]),
        ...mapState(["data"]),
        ...mapState(["filters"]),
    },
    props: {},
	store
	}),

	//notes
	{ notes:  {markdown: markdownNotes} }
);

