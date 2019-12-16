<template>
    <div class="component-wrapper">
        <div class="content">
            <label for="input">{{label}}</label>

            <div class="input-group-basic">
<!--                <span class="input-group-addon" v-if="prefix">{{textOfAddon}}</span>-->
                <input type="text" name="input" :placeholder="placeholder" @keyup="$emit('textChanged')" id="input" v-model="inputVal" >
<!--                <span class="input-group-addon" v-if="suffix">{{textOfAddon}}</span>-->
                <div class="input-group-addon" v-if="selector">
                    <div class="select-style">
                        <select name="order">
                            <option value="" disabled>Select Order</option>
                            <option value="a" selected>A</option>
                            <option value="b">B</option>
                        </select>
                    </div>
                </div>
                <div class="counter-container" v-if="counter">
                    <button type="button" @click="increase()">+</button>
                    <button type="button" @click="decrease()">-</button>
                </div>

            </div>

<!--            <span v-if="additionalText != ''" class="additional-text">{{additionalText}}</span>-->
<!--            <span v-if="inputValLength >= max && counterEnabled" class="reach-limit">You reached text limit</span>-->

        </div>
    </div>
</template>

<script>
    export default {
        name: "InputGroup",
        props: {
			label: {
				type: String,
				default: ''
			},
			inputValue: {
				type: String,
				default: ''
			},
            placeholder: {
                type: String,
                default: ''
            },
			selector: {
            	type: Boolean
            },
			counter: {
				type: Boolean
			}
        },
        data: function() {
            return {
                inputVal: 0
            }
        },
        watch: {

		},
        methods: {
			increase: function () {
				this.inputVal++;
            },
			decrease: function () {
				this.inputVal--;
			}
        }

    };
</script>

<style scoped>
    .content {
        width: 900px;
        font-family: "Arial", arial;
    }
    label {
        margin-bottom: 5px;
        display: inline-block;
        font-weight: bold;
        color: #34495E;
    }
    input {
        border: 1px solid #ECF0F1;
        box-shadow: none;
        padding: 5px 10px;
        height: 30px;
        font-size: 16px;
        width: 100%;
        border-radius: 3px;
        position: relative;
        z-index: 2;
        float: left;
        margin-bottom: 0;
        display: table-cell;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
    }

     input::placeholder {
         color: #D8DBDC;
     }

     .counter-container {
         display: flex;
         flex-direction: column;
     }

    .counter-container button {
        font-size: 10px;
        background: #eee;
        padding: 0.8px 9px;
    }

    .counter-container button:focus {
        outline: none;
    }

    .counter-container button:first-child {
        border-top-right-radius: 3px;
        border-bottom: none;
    }

    .counter-container button:last-child {
        border-bottom-right-radius: 3px;
    }

    .select-style {
        width: auto;
        margin: 0;
        padding: 5px 10px;
        border: 1px solid #eee;
        display: inline-block;
        vertical-align: middle;
        background: url("http://grumbletum.com/places/arrowdown.gif") no-repeat 80% center;
    }
    .select-style select {
        width: 100%;
        padding: 0;
        margin: 0;
        background-color: transparent;
        background-image: none;
        border: none;
        box-shadow: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    .input-group,
    .input-group-basic {
        position: relative;
        display: flex;
        align-items: center;
    }

    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>