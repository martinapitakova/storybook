import { storiesOf } from '@storybook/vue/dist/client/index';
import { action } from '@storybook/addon-actions/dist/index';
import { withKnobs, text, boolean, select, array, object } from '@storybook/addon-knobs/dist/index';

import DataTable from '../../../../components/DataTable'

//import doc notes
import markdownNotesDefault from '../../../../notes/Basic/Tables/Table/Table-default.md';


const stories = storiesOf('Basic|Tables/Table', module);
stories.addDecorator(withKnobs);

export const methods = {
    textChanged: action('textChanged'),
};

stories.add('default', () => ({
    components: { DataTable },
    template: `<dataTable :items="data" :headTitles="headTitles"/>`,
    data: function() {
        return {
        }
    },
    props: {
        headTitles: {
            default: array('Head Titles',
                ['item1', 'item2', 'item3', 'item4', 'item5']
            )
        },
        data: {
            default: object('data',
                [
                    {
                        id: 1,
                        cells: ['Load Balancer 11', 'HTTP', '80', 'Round Robin', 'Maureen’s VM Groups']
                    },
                    {
                        id: 2,
                        cells: ['Load Balancer 4', 'HTTP', '81', 'Round Robin', 'Maureen’s VM Groups']
                    },
                    {
                        id: 3,
                        cells: ['Load Balancer 4', 'HTTP', '83', 'Round Robin', 'Maureen’s VM Groups']
                    }
                ]
            )
        }
    },
    methods
	}),
	//notes
	{ notes:  {markdown: markdownNotesDefault} }
)
.add('striped', () => ({
    components: { DataTable },
    template: `<dataTable :items="items" :headTitles="headTitles" :isStriped="true"/>`,
    data: function() {
        return {
            headTitles: ['item1', 'item2', 'item3', 'item3'],
            items: [
                { id: 1, cells: ['Foo', 'foo2', 'foo3', 'foo3'] },
                { id: 2, cells: ['xx', 'xx', 'xx', 'foo3'] },
                { id: 3, cells: ['bar', 'bar', 'bar', 'foo3'] },
                { id: 4, cells: ['cell', 'cell', 'cell', 'foo3'] }
            ],
        }
    },
    methods
	}),
	//notes
	{ notes:  {markdown: markdownNotesDefault} }
);