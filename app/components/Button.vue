<template>
    <div>
        <button type="button" :class="'btn ' + type + ' ' + size + ' ' +  (disabled ? 'btn-disabled' : '' ) + ' ' + (outline ? 'btn-outline' : '' ) " :disabled="disabled" :outline="outline" @click="$emit('clicked')" >{{this.title}}</button>
    </div>
</template>

<script>
    export default {
        name: "Button",
        props: {
            size: {
                type: String
            },
            type: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean
            },
            title: {
                type: String,
                default: 'Button'
            },
            outline: {
                type: Boolean
            }
        },
        data: function() {
            return {
            }
        },
        methods: {
        	onClick: function () {
				this.$emit('clicked');
			}
        }

    };
</script>


<!--<template>-->
<!--    <div>-->
<!--       <button type="button" :class="'btn ' + type + ' ' + (large ? 'btn-large' : '') + ' ' + (uppercase ? 'btn-uppercase' : '') + ' ' + (disabled ? 'btn-disabled' : '')" :style="'background:'+bg+'; color:'+color+';'"  :disabled="disabled"  @click="$emit('clicked')" >{{this.title}}</button>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "Button",-->
<!--        props: {-->
<!--            bg: {-->
<!--                type: String,-->
<!--                default: '#e74c3c'-->
<!--            },-->
<!--            color: {-->
<!--                type: String,-->
<!--                default: '#fff'-->
<!--            },-->
<!--            type: {-->
<!--                type: String,-->
<!--                default: ''-->
<!--            },-->
<!--            disabled: {-->
<!--                type: Boolean,-->
<!--                default: false-->
<!--            },-->
<!--            large: {-->
<!--                type: Boolean,-->
<!--                default: false-->
<!--            },-->
<!--            title: {-->
<!--                type: String,-->
<!--                default: 'Button'-->
<!--            },-->
<!--            uppercase: {-->
<!--                type: Boolean,-->
<!--                default: false-->
<!--            }-->
<!--        },-->
<!--        data: function() {-->
<!--            return {-->
<!--            }-->
<!--        },-->

<!--    };-->
<!--</script>-->
