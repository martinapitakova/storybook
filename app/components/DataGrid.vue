<template>
    <div class="component-wrapper">
        <button type="button" @click="showFilters">Filtre</button>
        <button type="button" @click="showColumns">Columny</button>
        <div class="row">

            <div class="col-filters" v-if="showfilter">

                <h3>Dostupne filtre</h3>

                <draggable class="list-group" :list="filters" group="filters">
                    <div class="list-group-item" v-for="(element, index) in filters" :key="element.id"
                         @drag="hoverAreas" @dragend="unhoverAreas">
                        <span class="filter-name">{{ element.title }}</span> <span class="filter-type">Type: {{ element.type }}</span>
                    </div>
                </draggable>

                <h3>Pouzite filtre</h3>
                <draggable class="list-group" :list="usedFilters" group="filters">
                    <div class="list-group-item" v-for="(element, index) in usedFilters" :key="element.name"
                         @drag="hoverAreas" @dragend="unhoverAreas">

                        <div class="input" v-if="element.type == 'text'">
                            <label>{{element.title}}:</label>
                            <input type="text" @keyup="filterTable2" :id="'filter-'+index">
                        </div>

                        <div class="select" v-if="element.type == 'select'">
                            <label>{{element.title}}</label>
                            <select name="filter" :id="'filter-'+index" @change="filterTable2">
                                <option value="">---</option>
                                <option :value="option" v-for="(option, indexOption) in getOptions(element.column)">
                                    {{option}}
                                </option>
                            </select>
                        </div>

                        <div class="input-checkbox" v-if="element.type == 'checkbox'">
                            <label>{{element.title}}</label>
                            <input type="checkbox" @click="filterTable2" :id="'filter-'+index" value="1">
                        </div>

                    </div>
                </draggable>


            </div>
            <div class="col-columns" v-if="showcolumns">

                <h3>Dostupne headre</h3>

                <draggable class="list-group" :list="headers" group="people">
                    <div class="list-group-item" v-for="(element, index) in headers" :key="element.id">
                        <span class="filter-name">{{ element.columnTitle }}</span>
                    </div>
                </draggable>

            </div>
            <div class="col-content">
                <h3>Draggable table</h3>

                <table class="table table-striped">
                    <thead class="thead-dark">
                        <draggable tag="tr" :list="usedHeaders" group="people">
                            <th v-for="(header, headerIndex) in usedHeaders" :key="header.id" scope="col" @click="clickEvent(header.column, header.id)">
                                <span :id="'edit-header-'+header.id">{{ header.columnTitle }}</span>
                                <div class="input-group hidden" :id="'edit-title-'+header.id">
                                    <input type="text" :value="header.columnTitle" :id="'edit-title-input-'+header.id">
                                    <input type="submit" value="Save" @click="changeHeaderTitle(header.id)">
                                </div>
                            </th>
                        </draggable>
                    </thead>
                    <tbody>
                        <tr v-for="item in filteredProducts" :key="item.id">
                            <td v-for="(header, headerIndex) in usedHeaders" :key="headerIndex">{{ item[header.column] }}</td>
                        </tr>
                    </tbody>

                </table>


            </div>
        </div>
    </div>
</template>

<script>

    //checkbox search

    import store from "../store";

    import draggable from "vuedraggable";

    export default {
        name: "Datagrid",
        display: "Table Column",
        order: 9,
        components: {
            draggable
        },
        props: {
            headTitles: {
                type: Array,
                default: function () {
                    return ['Title 1', 'Title 2', 'Title 3'];
                }
            },
            items: {
                type: Array,
                default: function () {
                    return [
                        {id: 1, name: "Abby", sport: "basket"},
                        {id: 2, name: "Brooke", sport: "foot"},
                        {id: 3, name: "Courtenay", sport: "volley"},
                        {id: 4, name: "David", sport: "rugby"}
                    ];
                }
            },
            filters: {
                type: Array,
                default: function () {
                    return [];
                }
            },
        },
        data() {
            return {
                headers: this.headTitles,
                usedHeaders: [
                    { id: 1, column: "firstname", columnTitle: "Customers firstname" },
                    { id: 2, column: "lastname", columnTitle: "Customers lastname" },
                ],
                list: this.items,
                dragging: false,
                searchKey: '',
                sortBy: '',
                direction: 'asc',
                filtered: [],
                delay: 300,
                clicks: 0,
                timer: null,
                usedFilters: [],

                //for testing
                showfilter: 0,
                showcolumns: 1,
            };
        },
        filters: {
            capitalize: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
            }
        },
        watch: {
            headTitles: function (newVal) {
                this.headers = newVal;
            },
            items: function (newVal) {
                this.list = newVal;
            }
        },
        methods: {
            showFilters: function () {
                this.showfilter = !this.showfilter;
            },
            showColumns: function () {
                this.showcolumns = !this.showcolumns;
            },
            getOptions: function (column) {
                var options = [];
                var i;
                for (i = 0; i < this.list.length; i++) {
                    if (options.indexOf(this.list[i][column]) == -1) {
                        options.push(this.list[i][column]);
                    }
                }
                return options;
            },
            hoverAreas: function () {
                var lists = document.getElementsByClassName("list-group");
                var i;
                for (i = 0; i < lists.length; i++) {
                    lists[i].classList.add('hovered');
                }
            },
            unhoverAreas: function () {
                var lists = document.getElementsByClassName("list-group");
                var i;
                for (i = 0; i < lists.length; i++) {
                    lists[i].classList.remove('hovered');
                }
            },
            clickEvent: function (columnName, index) {
                this.clicks++;
                this.cName = columnName;
                if (this.clicks === 1) {
                    if (!document.getElementById('edit-header-' + index).classList.contains('hidden')) {
                        var self = this;
                        let cN = columnName;
                        this.timer = setTimeout(function () {
                            self.sortByColumn(self.cName);
                            self.clicks = 0
                        }, this.delay);
                    }

                } else {
                    clearTimeout(this.timer);
                    this.showEditColumn(index);
                    this.clicks = 0;
                }
            },
            showEditColumn: function (index) {
                document.getElementById('edit-header-' + index).classList.add('hidden');
                document.getElementById('edit-title-' + index).classList.remove('hidden');
            },
            changeHeaderTitle: function (index) {

				let indexOfObject = this.usedHeaders.find(o => o.id === index).id;
				var columnTitle = document.getElementById('edit-title-input-' + index).value;

				this.usedHeaders.find(o => o.id === index).columnTitle = document.getElementById('edit-title-input-' + index).value;

                // store.dispatch('changeTitle', {
                //     id: indexOfObject,
                //     text: columnTitle,
                // });

				document.getElementById('edit-header-' + index).classList.remove('hidden');
				document.getElementById('edit-title-' + index).classList.add('hidden');

            },
            sortByColumn: function (columnName) {
                if (this.sortBy == columnName) {
                    this.direction = (this.direction == 'asc') ? 'desc' : 'asc';
                } else {
                    this.sortBy = columnName;
                    this.direction = 'asc';
                }
            },
            getValueOfFiler: function (id) {
                var e = document.getElementById("filter-" + id);
                if (e) {
                    if (e.tagName == "SELECT") {
                        return e.options[e.selectedIndex].value;
                    } else if (e.tagName == "INPUT") {
                        return e.value;
                    }
                }

                return false;
            },
            filterTable: function () {
                this.filtered = [];
                if (this.filter.length > 0) {
                    for (var i = 0; i < this.list.length; i++) {
                        for (var j = 0; j < this.filter.length; j++) {
                            var error = false;
                            if (this.filter[j].type == 'select') {
                                if (this.list[i][this.filter[j].column] != this.getValueOfFiler(j) && this.getValueOfFiler(j) != '') {
                                    error = true;
                                    break;
                                }
                            } else if (this.filter[j].type == 'text') {
                                if (this.list[i][this.filter[j].column].indexOf(this.getValueOfFiler(j)) == -1 && this.getValueOfFiler(j) != '') {
                                    error = true;
                                    break;
                                }
                            }
                        }
                        if (this.filtered.indexOf(this.filtered[i]) == -1 && !error) {
                            this.filtered.push(this.list[i]);
                        }
                    }
                } else {
                    this.filtered = this.list;
                }

                return this.filtered.filter((item) => {
                    return this.searchKey == '' || item.firstname.indexOf(this.searchKey) !== -1;

                }).sort((a, b) => {
                    if (this.direction == 'asc') {
                        return (a[this.sortBy] < b[this.sortBy]) ? -1 : 1;
                    } else {
                        return (b[this.sortBy] < a[this.sortBy] ? -1 : 1);
                    }
                });
            },
            filterTable2: function () {
                this.filtered = [];
                if (this.usedFilters.length > 0) {
                    for (var i = 0; i < this.list.length; i++) {
                        for (var j = 0; j < this.usedFilters.length; j++) {
                            var error = false;
                            if (this.usedFilters[j].type == 'select') {
                                if (this.list[i][this.usedFilters[j].column] != this.getValueOfFiler(j) && this.getValueOfFiler(j) != '') {
                                    error = true;
                                    break;
                                }
                            } else if (this.usedFilters[j].type == 'text') {
                                if (this.list[i][this.usedFilters[j].column].indexOf(this.getValueOfFiler(j)) == -1 && this.getValueOfFiler(j) != '') {
                                    error = true;
                                    break;
                                }
                            } else if (this.usedFilters[j].type == 'checkbox') {
                                if (this.list[i][this.usedFilters[j].column] != this.getValueOfFiler(j)) {
                                    error = true;
                                    break;
                                }
                            }
                        }
                        if (this.filtered.indexOf(this.filtered[i]) == -1 && !error) {
                            this.filtered.push(this.list[i]);
                        }
                    }
                } else {
                    this.filtered = this.list;
                }

                return this.filtered.filter((item) => {
                    return true;
                }).sort((a, b) => {
                    if (this.direction == 'asc') {
                        return (a[this.sortBy] < b[this.sortBy]) ? -1 : 1;
                    } else {
                        return (b[this.sortBy] < a[this.sortBy] ? -1 : 1);
                    }
                });
            },
        },
        computed: {
            filteredProducts: function () {

                return this.filterTable2();

            },
        },
        mounted() {
            this.filterTable2();
        },
        watch: {
            searchKey: function (newQuestion, oldQuestion) {
                this.filterTable();
            }
        },

    };

</script>
<style>
    .filter-name {
        font-weight: bold;
        text-transform: uppercase;
        display: block;
    }

    .filter-type {
        color: #aaa;
        font-size: 11px;
    }

    .list-group.hovered {
        background: #eee;
        min-height: 60px;
    }

    .list-group-item {
        background: #eee;
        padding: 5px;
        border: 1px solid #ddd;
        cursor: move;
        margin-bottom: 5px;
    }

    .row {
        width: 100%;
        display: flex;
        font-family: arial;
    }

    .col-filters {
        width: 15%;
        padding-right: 30px;
    }

    .col-columns {
        width: 15%;
        padding-right: 30px;
    }

    .col-content {
        flex: 1;
    }

    .hidden {
        display: none;
    }

    .d-block {
        display: block;
    }

    .filters div {
        width: 20%;
        display: inline;
        margin-right: 10px;
    }

    .filters label {
        margin-bottom: 10px;
    }

    .search {
        margin-bottom: 10px;
    }

    .search input {
        border-radius: 3px;
        box-shadow: none;
        border: 1px solid #ddd;
        height: 20px;
    }

    table {
        margin-top: 20px;
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
        cursor: move;
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

    th, td {
        padding: 8px 20px;
    }

    th {
        background: #eee;
        color: #111;
    }

    td {
        box-shadow: none;
    }

    .striped tr:nth-child(even) {
        background-color: #f2f2f2
    }
</style>