<template lang="pug">
	Editor
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Editor from '../components/Editor.vue'
import Toolbar from '../components/Toolbar.vue'

export default defineComponent({
	name: 'three-editor-model',
	components: {
		Editor,
		Toolbar
	}
})
</script>