<template>
    <div class="component-wrapper">
        <div class="content">
            <label for="input">{{label}}</label>
            <div :class="(prefix ? 'input-group prefix' : '') + ' ' + (suffix ? 'input-group suffix' : '') + ' ' + (!suffix && !prefix ? 'input-group-basic' : '')">
                <span class="input-group-addon" v-if="prefix">{{textOfAddon}}</span>
                <input type="text" name="input" :placeholder="placeholder" @keyup="$emit('textChanged')" id="input" :class="type" v-model="inputVal" :maxlength="max">
                <span class="input-group-addon" v-if="suffix">{{textOfAddon}}</span>

                <span class="character-counter" v-if="counterEnabled">{{inputValLength}} / {{max}}</span>

            </div>
            <span v-if="additionalText != ''" class="additional-text">{{additionalText}}</span>
            <span v-if="inputValLength >= max && counterEnabled" class="reach-limit">You reached text limit</span>
        </div>
    </div>
</template>

<script>
	export default {
		name: "Input",
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
			prefix: {
				type: Boolean,
				default: false
			},
			suffix: {
				type: Boolean,
				default: false
			},
			textOfAddon: {
				type: String,
				default: 'text'
			},
			additionalText: {
				type: String
			},
			type: {
				type: String
			},
			max: {
				type: Number
			}
		},
		data: function () {
			return {
				characters: 0,
				inputVal: this.inputValue
			}
		},
		watch: {
			inputValue: function (val) {
				this.characters = this.inputVal.length
				this.inputVal = this.inputValue
			},
		},
		computed: {
			counterEnabled: function () {
				return this.max != '' && this.max != null;
			},
			inputValLength: function () {
				return this.inputVal.length;
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
    }

    input::placeholder {
        color: #D8DBDC;
    }

    .additional-text {
        color: #9D9FA0;
        font-size: 12px;
        display: inline-block;
        margin-top: 5px;
    }

    .character-counter {
        width: auto;
        display: inline-block;
        min-width: 60px;
    }

    .input-error {
        border-color: #E74C3C;
    }

    .input-warning {
        border-color: #F1C40F;
    }

    .input-success {
        border-color: #2ECC71;
    }

    .reach-limit {
        color: #E74C3C;
        margin-top: 5px;
        display: inline-block;
    }

    .input-group-addon {
        padding: 7px 12px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1;
        color: #555;
        text-align: center;
        background-color: #eee;
        border: 1px solid #ccc;
        width: 1%;
        white-space: nowrap;
        vertical-align: middle;

    }

    .suffix input {
        border-radius: 4px 0px 0px 4px;
    }

    .suffix .input-group-addon {
        border-left: 0;
        border-radius: 0px 4px 4px 0px;
        width: auto;
        margin-right: 10px;
    }

    .prefix input {
        border-radius: 0px 4px 4px 0px;
    }

    .prefix .input-group-addon {
        border-right: 0;
        width: auto;
        border-radius: 4px 0px 0px 4px;
    }

    .input-group-addon.prefix {
        border-radius: 4px 0px 0px 4px;
        border-right: 0;
    }

    .input-group-addon.suffix {
        border-radius: 0px 4px 4px 0px;
        border-left: 0;
    }

    .input-group,
    .input-group-basic {
        position: relative;
        display: flex;
        align-items: center;
    }

    .input-group-basic input {
        margin-right: 10px;
    }

    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>