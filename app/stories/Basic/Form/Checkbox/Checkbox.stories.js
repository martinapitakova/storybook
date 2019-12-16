import { storiesOf } from '@storybook/vue/dist/client/index';
import { action } from '@storybook/addon-actions/dist/index';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/dist/index';

import Checkbox from '../../../../components/Checkbox';

//import doc notes
import markdownNotesDefault from '../../../../notes/Basic/Form/Checkbox/Checkbox-default.md';

const stories = storiesOf('Basic|Form/Checkbox', module);
stories.addDecorator(withKnobs);

stories.add('Checkbox', () => ({
    components: { Checkbox },
    props: {
        label: {
            default: text('Label', 'Test')
        },
        disabled: {
            default: boolean("Disabled", false)
        },
        check: {
            default: boolean("Checked", false)
        }
    },
    template: `<checkbox :label="label" :isDisabled="disabled" :isCheck="check"/>`
}),
	//notes
	{ notes:  {markdown: markdownNotesDefault} }
);
