import { EditorStore } from './EditorStore'
import { SceneManager } from './three/SceneManager'

export const sceneManager = new SceneManager()
export let editorStore = new EditorStore()
export const renderManager = editorStore.createRenderManager('default', sceneManager)!