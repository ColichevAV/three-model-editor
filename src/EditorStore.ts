import { RenderManager } from './three/RenderManager'
import { SceneManager } from './three/SceneManager'

export class EditorStore {
    /**Active RenderManager instances*/
    readonly renderMans = new Map<string, RenderManager>()

    createRenderManager(name: string, sceneManager: SceneManager): RenderManager {
        if (!this.renderMans.has(name)) {
            const renderManager = new RenderManager(name, sceneManager, {
                width: undefined,
                height: undefined
            })
            this.renderMans.set(name, renderManager)
            return renderManager
        } else return this.renderMans.get(name) as RenderManager
    }

    addRenderManager(name: string, threeMan: RenderManager) {
        if (!this.renderMans.has(name)) {
            this.renderMans.set(name, threeMan)
        }
    }

    getRenderManager(name: string = 'default'): RenderManager | undefined {
        if (this.renderMans.has(name)) return this.renderMans.get(name)

        return undefined
    }
}