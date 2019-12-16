<template>
    <tr>
        <td v-for="cell in data.cells">{{cell}}</td>
    </tr>
</template>

<script>
    export default {
        name: "DataTableRow",
        props: {
            data: {
                type: Object,
                default: function() {
                    return ['Cell 1', 'Cell 2', 'Cell 3']
                }
            },
        },
        data: function() {
            return {
            }
        },

    };
</script>
<style>

</style>