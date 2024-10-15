import * as THREE from 'three'
import Experiance from "../Experiance";


export default class Enviromet{

    constructor(){
        this.experiance = new Experiance()
        this.scene = this.experiance.scene
        this.resources = this.experiance.resources
        this.debug = this.experiance.debug


        this.setSunLight()
        this.setEnvirometMap()

        if( this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Enviromet')

            this.debugFolder.add( this.sunLight, 'intensity' ).name('lightIntensity').min(0).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'x' ).name('lightPositionX').min(-10).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'y' ).name('lightPositionY').min(-10).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'z' ).name('lightPositionZ').min(-10).max(10).step( 0.001)
            
            this.debugFolder.add( this.envirometMap, 'intensity' ).name('envMapIntensity').min(0).max(4).step( 0.001).onChange( this.envirometMap.updataeMaterial)

        }

    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set( 1024 , 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set( 3.5, 2, -1.25)
        this.scene.add( this.sunLight )
    }
    
    setEnvirometMap(){
        this.envirometMap = {}
        this.envirometMap.intensity = 0.4
        this.envirometMap.texture = this.resources.item.envirometMapTexture
        this.scene.environment = this.envirometMap.texture
        this.envirometMap.updataeMaterial = () => {
            this.scene.traverse( (child) => {
                if ( child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    child.material.envMap = this.envirometMap.texture
                    child.material.envMapIntensity = this.envirometMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.envirometMap.updataeMaterial()

    }
}