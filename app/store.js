import Vue from 'vue';
import Vuex from 'vuex';
import {object} from "@storybook/addon-knobs";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        headTitles: {
            default: object('Head Titles',
                [
                    { id: 1, column: "firstname", columnTitle: "Customers firstname" },
                    { id: 2, column: "lastname", columnTitle: "Customers lastname" },
                    { id: 3, column: "age", columnTitle: "Customers age" },
                    { id: 4, column: "gender", columnTitle: "Gender" },
                    { id: 5, column: "paid", columnTitle: "Paid" },
                    { id: 6, column: "hiddenProperty", columnTitle: "Test" },
                ]
            )
        },
        data: {
            default: object('data',
                [
                    { id: 1, firstname: "Peter", lastname: "Doe", age: "14", gender: "M", hiddenProperty: "test1", paid: 1 },
                    { id: 2, firstname: "Phoebe", lastname: "Blue", age: "25", gender: "W", hiddenProperty: "test2", paid: 1 },
                    { id: 3, firstname: "John", lastname: "Nice", age: "40", gender: "M", hiddenProperty: "test3", paid: 0 },
                    { id: 4, firstname: "David", lastname: "Testing", age: "40", gender: "M", hiddenProperty: "test3", paid: 1 },
                    { id: 5, firstname: "Jane", lastname: "Testovic", age: "28", gender: "W", hiddenProperty: "test4", paid: 0 },
                    { id: 6, firstname: "Patrick", lastname: "Dohner", age: "28", gender: "M", hiddenProperty: "test4" , paid: 1 },
                    { id: 7, firstname: "Tobias", lastname: "Paul", age: "14", gender: "M", hiddenProperty: "test2", paid: 0 },
                    { id: 8, firstname: "Alicia", lastname: "Blue", age: "21", gender: "W", hiddenProperty: "test2", paid: 0 },
                    { id: 9, firstname: "Peter", lastname: "Doe", age: "28", gender: "M", hiddenProperty: "test1", paid: 1 }
                ]
            )

        },
        filters: {
            default: object('filtre',
                [
                    {id: 1, type: 'text', title: 'Firstname', column: 'firstname'},
                    {id: 2, type: 'text', title: 'Lastname', column: 'lastname'},
                    {id: 3, type: 'select', title: 'Hidden property', column: 'hiddenProperty'},
                    {id: 4, type: 'checkbox', title: 'Paid', column: 'paid'}
                ]
            )
        }
    },
    mutations: {
        CHANGE_COLUMN_TITLE(state, values) {

        }
    },
    actions: {
        changeTitle({ commit }, values) {
            commit('CHANGE_COLUMN_TITLE', values);
        }
    },
});