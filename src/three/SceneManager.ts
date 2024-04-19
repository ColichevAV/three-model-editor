import { Scene } from 'three'

export class SceneManager {
    public scene: Scene

    constructor(scene?: Scene) {
        this.scene = scene === undefined ? new Scene() : scene
    }

    traverseElements() {}
}