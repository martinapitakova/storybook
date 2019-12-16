<template>
    <div class="accordion-item">
        <div class="header" @click="changeVisibility">
            header
        </div>
        <div class="content" :class="{hidden: !isHidden}">
            content
            {{opened}}
        </div>
    </div>
</template>

<script>
	export default {
		name: "AccordionItem",
		props: {
			opened: {
				type: Boolean,
				default: false
			}
		},
		data: function () {
			return {
				isHidden: this.opened
			}
		},
		methods: {
			changeVisibility: function () {
				this.isHidden = !this.isHidden;
			}
		},
		watch: {
			opened: function (newVal, oldVal) { // watch it
				this.isHidden = newVal;
			}
		}
	};
</script>

<style scoped>
    .accordion-item {
        font-family: arial;
    }

    .hidden {
        display: none;
    }

    .header {
        cursor: pointer;
        padding: 5px;
        border: 1px solid #ddd;
        background: #eee;
        color: #333333;
        font-weight: bold;
        border-bottom: none;
    }

    .content {
        padding: 20px;
        border: 1px solid #ddd;
        border-top: none;
    }
</style>