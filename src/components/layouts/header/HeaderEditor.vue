<template lang="pug">
header.header-abs.night.flex.flex-row.h-20
    .flex.gap-2.text-2xl
        a(href="editor") Editor
        a(href="about") About
        a(href="home") Home
        a Features
        a Pricing
        a End
//- .flex.h-20
//-     p Editor Plus
//-     p Editor Plus
//- header.h-20 
//-     a(href="editor") Editor
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'header-editor',
    components: {},
    data: function () {
        return {}
    },
    created: function () {},
    mounted: function () {},
    methods: {},
    computed: {}
})
</script>
