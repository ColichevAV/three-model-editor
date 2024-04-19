<template lang="pug">
	header-editor
	footer-editor
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderEditor from '../components/layouts/header/HeaderEditor.vue'
import FooterEditor from '../components/layouts/footer/FooterEditor.vue'

export default defineComponent({
	components: {
		HeaderEditor,
		FooterEditor
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