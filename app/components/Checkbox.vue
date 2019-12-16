<template>
    <div class="component-wrapper">
        <input id="test" type="checkbox" :disabled="isDisabled" :checked="isCheck">
        <label for="test">{{label}}</label>
    </div>
</template>

<script>
    import Input from "./DataTable";
    export default {
        name: "Checkbox",
        components: {Input},
        data: function() {
            return {

            }
        },
        props: {
            label: {
                type: String
            },
            isDisabled: {
                type: Boolean
            },
            isCheck: {
                type: Boolean
            },

        }
    };
</script>
