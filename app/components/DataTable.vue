<template>
    <div class="component-wrapper">
        <table :class="'draggable'" id="default-table">
            <thead>
                <tr>
                    <th v-for="row in headTitles">{{row}}</th>
                </tr>
            </thead>
            <tbody>
                <dataTableRow v-for="item in items" v-bind:key="item.id" :data="item"></dataTableRow>
            </tbody>
        </table>
    </div>
</template>

<script>
    import DataTableRow from './DataTabeRow'

    export default {
        name: "Input",
        components: {
            DataTableRow
        },
        props: {
            headTitles: {
                type: Array,
                default: function() {
                    return ['Title 1', 'Title 2', 'Title 3'];
                }
            },
            items: {
                type: Array,
                default: function() {
                    return [
                        { id: 1, cells: ['Cell 1', 'Cell 2', 'Cell 3'] },
                        { id: 2, cells: ['Cell 4', 'Cell 5', 'Cell 6'] },
                        { id: 3, cells: ['Cell 7', 'Cell 8', 'Cell 0'] },
                    ];
                }
            },
            isStriped: {
                type: Boolean,
                default: false
            }

        },
        data: function() {
            return {
            }
        },
        mounted() {

        }

    };

</script>
<style>
    table {
        border-collapse: separate;
        border-spacing: 0;
        font-family: "Arial";
    }
    table tr th,
    table tr td {
        border-right: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
    }
    table tr th:first-child,
    table tr td:first-child {
        border-left: 1px solid #bbb;
    }
    table tr th {
        border-top: 1px solid #bbb;
    }

    /* top-left border-radius */
    table tr:first-child th:first-child {
        border-top-left-radius: 3px;
    }

    /* top-right border-radius */
    table tr:first-child th:last-child {
        border-top-right-radius: 3px;
    }

    /* bottom-left border-radius */
    table tr:last-child td:first-child {
        border-bottom-left-radius: 3px;
    }

    /* bottom-right border-radius */
    table tr:last-child td:last-child {
        border-bottom-right-radius: 3px;
    }
    th, td{
        padding: 8px 20px;
    }
    th{
        background: #eee;
        color: #111;
    }
    td{
        box-shadow: none;
    }

    .striped tr:nth-child(even) {
        background-color: #f2f2f2
    }
</style>