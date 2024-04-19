<template lang="pug">
.toolbar.flex.flex-row
    n-button(size="tiny") Toolbar
    n-button Toolbar
    n-button Toolbar
    n-button Toolbar
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton } from 'naive-ui'

export default defineComponent({
    components: {
        NButton
    },
    props: {
        ext: {}
    },
    setup(props) {},
    data() {
        return {}
    },
    computed: {},
    mounted() {}
})
</script>

<style lang="sass">
.n-button
    --n-ripple-color: var(#D3BA81)
</style>
