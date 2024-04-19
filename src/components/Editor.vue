<template lang="pug">
splitpanes(max-size="100" class="split-panes")
	pane(max-size="50" class="left-pane")
		TrianglesPane
	pane(class="right-pane")
		div(ref='editor').editor-rel
			Toolbar

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toolbar from './Toolbar.vue'
import TrianglesPane from "./TrianglesPane.vue";
import { Splitpanes, Pane } from './Splitpanes/index'
import { editorStore, sceneManager } from '../managers.ts'
import {
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
	Color,
} from 'three'

export default defineComponent({
    name: 'editor',
    components: {
        Toolbar,
        Splitpanes,
	    TrianglesPane,
        Pane,
    },
    data() {
        return {}
    },
    created() {},
    mounted() {
        this.init()
    },
    methods: {
        init() {
            // const editor = this.$refs.editor
            // const width = window.innerWidth
            // const height = window.innerHeight
            // const renderer = new WebGLRenderer()
            // renderer.setSize(width, height)
            // editor.appendChild(renderer.domElement)

            // // создайте сцену и камеру
            // const scene = new Scene()
            // scene.background = new Color(0xF6F6F4)
            // const camera = new PerspectiveCamera(
            //     75, // угол обзора
            //     width / height, // соотношение сторон
            //     0.1, // ближняя граница отсечения
            //     1000 // дальняя граница отсечения
            // )
            // camera.position.z = 5

            // // создайте объект и добавьте его в сцену
            // const geometry = new BoxGeometry()
            // const material = new MeshBasicMaterial({ color: 0x00ff00 })
            // const cube = new Mesh(geometry, material)
            // scene.add(cube)

            // // выполните рендеринг
            // const animate = function () {
            //     requestAnimationFrame(animate)
            //     cube.rotation.x += 0.01
            //     cube.rotation.y += 0.01
            //     renderer.render(scene, camera)
            // }

            // animate()

            const renderManager = editorStore.getRenderManager('default')
            const editor = this.$refs.editor
            editor.appendChild(renderManager?.Renderer.domElement)
            sceneManager.scene.background = new Color(0xf6f6f4)
            renderManager?.animate()

            // let vertexShader = `
            //     attribute vec3 aPosition;
            //     attribute vec3 aNormal;
            //     attribute vec3 aColor;
            //     varying vec3 vNormal;
            //     varying vec3 vColor;

            //     void main() {
            //         vNormal = normalize(normalMatrix * aNormal);
            //         vColor = aColor;
            //         gl_Position = projectionMatrix * modelViewMatrix * vec4(aPosition, 1.0);
            //     }
            // `;

            // let fragmentShader = `
            //     varying vec3 vNormal;
            //     varying vec3 vColor;

            //     void main() {
            //     vec3 light = vec3(0.5, 0.7, 1.0);
            //     light = normalize(light);
            //     float dProd = dot(vNormal, light);
            //     vec4 color = vec4(vColor, 1.0);
            //     if(dProd > 0.5) {
            //         gl_FragColor = color + vec4(0.2, 0.2, 0.8, 1.0);
            //     } else {
            //         gl_FragColor = color;
            //     }
            //     }
            // `;

            // const geometry = new BoxGeometry();
            // // geometry.computeVertexNormals();

            // // const edgesGeometry = new EdgesGeometry(geometry);
            // // const colors = new Array(edgesGeometry.attributes.position.count).fill(new Color("blue"));
            // // edgesGeometry.setAttribute('color', new Float32BufferAttribute(colors.flat(), 3));

            // const material = new ShaderMaterial({
            //     vertexShader: vertexShader,
            //     fragmentShader: fragmentShader,
            // });
            // const cube = new Mesh(geometry, material)

            // // const mesh = new LineSegments(edgesGeometry, material);
            // sceneManager.scene.add(cube);

            const geometry = new BoxGeometry()
            geometry.computeBoundsTree()
            const material = new MeshBasicMaterial({ color: 0x00ff00 })

            const cube = new Mesh(geometry, material)

	        // const triangle1 = new ExtendedTriangle(
		    //     new Vector3(32.22699737548828, 1.2630000114440918, -11.8149995803833),
		    //     new Vector3(31.316997528076172, 1.2630000114440918, -11.739999771118164),
		    //     new Vector3(32.22699737548828, 1.2630000114440918, -11.739999771118164)
	        // )
	        // const triangle2 = new ExtendedTriangle(
		    //     new Vector3(31.316997528076172, 1.933000087738037, -7.585000038146973),
		    //     new Vector3(31.316997528076172, -0.8669999837875366, -7.295000076293945),
		    //     new Vector3(31.316997528076172, -0.8669999837875366, -7.585000038146973)
	        // )
	        //
	        // const bufferGeometryTriangle = new BufferGeometry().setFromPoints([vertex1, vertex2, vertex3])
	        // const materialTriangle = new MeshBasicMaterial({color: 0x00ff00})
	        // const meshTriangle = new Mesh(bufferGeometryTriangle, materialTriangle)
	        // sceneManager.scene.add(meshTriangle)

            sceneManager.scene.add(cube)
            console.log(renderManager)
        },
        animate() {}
    },
    computed: {
        rotate() {}
    }
})
</script>

<style lang="sass">
.left-pane
	width: 20%
//.container
//	display: flex
//	height: 100vh
//
//	.split-panes
//		flex: 1
//
//	.left-pane
//		padding: 20px
//
//	.input-group
//		margin-bottom: 10px
//
//	.right-pane
//		padding: 20px
//		overflow-y: auto
//
//	.right-pane ul
//		list-style: none
//		padding: 0
//
//	.right-pane li
//		margin-bottom: 5px
</style>
