<template lang="pug">
.triangles
	h2 Input Triangle Coordinates
		.input-group
			n-input(type="text" label="A" v-model="aPointString")
			n-input(type="text" label="B" v-model="bPointString")
			n-input(type="text" label="C" v-model="cPointString")
		n-button(@click="addTriangle") Add Triangle
		n-button(@click="loadFromFile") Load Triangles from File
	h2 Triangles List
		ul
			li(v-for="[key, triangle] in triangles" :key="triangle.id") {{ triangle.a }} - {{ triangle.b }} - {{ triangle.c }}
				n-button(@click="removeTriangle(key)") Show plane
				n-button(@click="removeTriangle(key)") Show points
				n-button(@click="removeTriangle(key)") Remove

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NInput, NButton } from 'naive-ui'

type Vector3Type = {
	x: number
	y: number
	z: number
}
type Triangle3Type = {
	id: number
	a: Vector3Type
	b: Vector3Type
	c: Vector3Type
}

export default defineComponent({
	name: 'triangles-pane',
	components: {
		NInput,
		NButton,
	},
	setup(props, ctx) {
	    return {
		    aPointString: "0,0,0",
		    bPointString: "0,0,0",
		    cPointString: "0,0,0",
	    }
	},
	data() {
		return {

			triangles: new Map<number, Triangle3Type>()
		}
	},
	created() {},
	mounted() {
	},
	methods: {
		addTriangle(){
			const a = this.parsePoint(this.aPointString)
			const b = this.parsePoint(this.bPointString)
			const c = this.parsePoint(this.cPointString)

			if (!a || !b || !c) {
				// this.setError('Invalid input format (expected: "x,y")')
				return
			}

			const id = this.triangles.size
			this.triangles.set(id, { id, a, b, c } as Triangle3Type)

		},
		removeTriangle(id: number){
			this.triangles.delete(id)
		},
		parsePoint(pointString: string): Vector3Type | null {
			const parts = pointString.split(',')
			if (parts.length !== 3) {
				// this.setError(`Invalid point format for "${pointString}" (expected: "x,y")`)
				return null
			}

			const x = parseFloat(parts[0])
			const y = parseFloat(parts[1])
			const z = parseFloat(parts[2])

			if (isNaN(x) || isNaN(y) || isNaN(z)) {
				// this.setError(`Invalid point format for "${pointString}" (expected numbers)`)
				return null
			}

			return { x: x, y: y, z: z} as Vector3Type
		},
		loadFromFile() {
			const input = document.createElement('input')
			input.type = 'file'
			input.accept = '.txt' // Allow only text files

			input.onchange = (event) => {
				const file = event.target.files?.[0]
				if (!file) return

				const reader = new FileReader()
				reader.onload = (e) => {
					const text = e.target?.result?.toString() || ''
					this.parseFileContent(text)
				}
				reader.readAsText(file)
			}

			input.click()
		},
	},
	computed: {
		rotate() {}
	}
})
</script>

<style lang="sass">

</style>