<template>
    <div class="component-wrapper">
        <div class="list-items">
            <AccordionItem :opened="isOpened1"></AccordionItem>
            <AccordionItem :opened="isOpened2"></AccordionItem>
        </div>
    </div>
</template>

<script>
    import AccordionItem from "./AccordionItem"
    export default {
        name: "Accordion",
        components: {
            AccordionItem
        },
        data: function() {
            return {

            }
        },
        props: {
            isOpened1: {
                type: Boolean,
                default: false
            },
            isOpened2: {
                type: Boolean,
                default: false
            }

        }

    };
</script>
