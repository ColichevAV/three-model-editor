import {
    BufferGeometry,
    Mesh,
    PerspectiveCamera,
    Raycaster,
    Scene,
    Vector2,
    WebGLRenderer
} from 'three'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'
import { OrbitControls } from './extensions/orbit'
import { SceneManager } from './SceneManager'

// Add the extension functions
BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
Mesh.prototype.raycast = acceleratedRaycast

export class RenderManager {
    private _sceneManager: SceneManager
    private _camera: PerspectiveCamera
    private _renderer: WebGLRenderer
    private _controls: OrbitControls
    private _width: number
    private _height: number
    private _name: string
    /** Is view devise is touch device. */
    public readonly IsTouchDevice: boolean = false
    /**Mouse coordinates with screen origin and screen boundary. */
    mousePointer = new Vector2()
    /**Mouse coordinates with center origin and boundary range from -1 to 1. */
    mouse = new Vector2()

    constructor(
        name: string,
        sceneManager: SceneManager,
        options: { width: number; height: number }
    ) {
        this._name = name
        this._sceneManager = sceneManager

        this.IsTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

        if (this.IsTouchDevice) console.log('Touch device detected.')

        this._renderer = new WebGLRenderer()
        this._width = options.width || window.innerWidth
        this._height = options.height || window.innerHeight
        // this._camera = new PerspectiveCamera(75, undefined, 0.1, 1000)
        // this._camera.position.z = 5
        this._camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
        this._camera.position.set(0, 20, 100)

        this._controls = new OrbitControls(this._camera, this._renderer.domElement)

        // How far you can orbit vertically, upper and lower limits.
        this._controls.minPolarAngle = 0
        this._controls.maxPolarAngle = Math.PI

        // How far you can dolly in and out ( PerspectiveCamera only )
        this._controls.minDistance = 0
        this._controls.maxDistance = Infinity

        // this.enableZoom = true; // Set to false to disable zooming
        // this.zoomSpeed = 1.0;

        this._controls.enablePan = true // Set to false to disable panning (ie vertical and horizontal translations)

        this._controls.enableDamping = true // Set to false to disable damping (ie inertia)
        this._controls.dampingFactor = 0.25
        // this._controls = new OrbitControl(this._camera, this._renderer.domElement)
        // //controls.update() must be called after any manual changes to the camera's transform

        // this._controls = new OrbitControl(this._camera, this._renderer.domElement)
        // this._controls.update()
        this.initEvents()
        this.updateSize()
    }

    get Renderer(): WebGLRenderer {
        return this._renderer
    }

    updateSize() {
        this._renderer.setSize(this._width, this._height)
        this._camera.aspect = this._width / this._height
        this._camera.updateProjectionMatrix()
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this._controls.update()
        this._renderer.render(this._sceneManager.scene, this._camera)
    }

    resize(width: number, height: number) {
        this._width = width
        this._height = height

        this.updateSize()
    }

    private onMouseMove(event: MouseEvent) {
        let x, y

        const width = this.Renderer.domElement.offsetWidth
        const height = this.Renderer.domElement.offsetHeight

        if (event instanceof TouchEvent && event.changedTouches) {
            x = event.changedTouches[0].pageX
            y = event.changedTouches[0].pageY
        } else {
            x = event.offsetX
            y = event.offsetY
        }

        this.mousePointer.x = x
        this.mousePointer.y = y

        this.mouse.x = (x / width) * 2 - 1
        this.mouse.y = -(y / height) * 2 + 1

        // this.requestUpdate(false)
    }

    private initEvents() {
        const raycaster = new Raycaster()
        const mouse = new Vector2()

        const onMouseClick = (event: MouseEvent) => {
            var mouse = this.mouse.clone()

            raycaster.firstHitOnly = true
            raycaster.setFromCamera(mouse, this._camera)

            const intersects = raycaster.intersectObjects(this._sceneManager.scene.children)
            console.log(intersects)

            if (intersects.length > 0) {
                intersects[0].object.material.color.set(0xff0000);
            }
        }

        //Dispatch click event only for mouse devices
        if (!this.IsTouchDevice)
            this.Renderer.domElement.addEventListener(
                'click',
                async (e) => {
                    onMouseClick(e)
                    console.log('click')
                    // if (!this.isSelectionLocked)
                    // this.sceneManager.updateSelection([this.hoveredElNum], e.ctrlKey);
                    // this.dispatchEvent(RenderEventsFactory.click);
                    // this.requestUpdate(false);
                },
                true
            )

        //Dispatch double click event only for mouse devices
        if (!this.IsTouchDevice)
            this.Renderer.domElement.addEventListener('dblclick', () => {
                console.log('dblclick')
                // if (this.sceneManager.selBox != undefined) {
                // 	this.zoomCameraToSelection();
                // 	this.dispatchEvent(RenderEventsFactory.dblclick);
                // 	this.requestUpdate();
                // }
            })

        this.Renderer.domElement.addEventListener(
            'pointermove',
            (event) => {
                // console.log('pointermove')
                this.onMouseMove(event)
                // this.dispatchEvent(new RenderEventsFactory.move(event));
            },
            false
        )

        // //Dispatch down event for touch devices
        // this.viewerElement.addEventListener("pointerdown", (event: TouchEvent | PointerEvent) => {
        // 		if (this.isTouchDevice) {
        // 			this.startPointerTime = new Date().getTime();
        // 		}

        // 		let x = 0, y = 0;

        // 		if (event instanceof TouchEvent && event.changedTouches) {
        // 			x = event.changedTouches[0].pageX;
        // 			y = event.changedTouches[0].pageY;
        // 		} else if (event instanceof PointerEvent) {
        // 			x = event.offsetX;
        // 			y = event.offsetY;
        // 		}

        // 		this.startMousePointer.x = x;
        // 		this.startMousePointer.y = y;

        // 		this.isNavigation = true;
        // 		this.dispatchEvent(RenderEventsFactory.down);
        // 	}, true
        // );

        // //Dispatch click or double click event for touch devices
        // this.viewerElement.addEventListener("pointerup", (e) => {

        // 	if (this.isTouchDevice) {
        // 		this.endPointerTime = new Date().getTime();
        // 		const delta = this.endPointerTime - this.startPointerTime;

        // 		const isClick = (!this.isFirstClick && delta < 130) || (this.isFirstClick && delta < 130);

        // 		if (isClick) {
        // 			if (!this.isFirstClick) {
        // 				//first click checked
        // 				this.isFirstClick = true;
        // 				this.isNavigation = false;
        // 				this.onMouseMove(e);

        // 				if (!this.isSelectionLocked)
        // 					this.sceneManager.updateSelection([this.hoveredElNum], false);

        // 				this.dispatchEvent(RenderEventsFactory.click);
        // 				this.requestUpdate(true);

        // 				setTimeout(() => {
        // 					if (this.isFirstClick) {
        // 						//first click processing
        // 						this.isFirstClick = false;
        // 					}
        // 				}, 250)
        // 			} else {
        // 				//double click
        // 				this.isFirstClick = false;

        // 				if (this.sceneManager.selBox != undefined) {
        // 					this.zoomCameraToSelection();
        // 					this.dispatchEvent(RenderEventsFactory.dblclick);
        // 					this.requestUpdate();
        // 				}
        // 			}
        // 		}

        // 	}

        // 	this.dispatchEvent(RenderEventsFactory.up);
        // 	this.isNavigation = false
        // });

        // //Dispatch move event
        // this.viewerElement.addEventListener("pointermove", (event) => {
        // 	this.onMouseMove(event);
        // 	this.dispatchEvent(new RenderEventsFactory.move(event));
        // }, false);

        // this.viewerElement.addEventListener("wheel", () => {
        // 	this.dispatchEvent(RenderEventsFactory.wheel);
        // 	this.sceneManager.undegradeScene();
        // 	this.requestUpdate(true)
        // }, {passive: true});
    }
}