import * as THREE from 'three'
import Experiance from '../Experiance'

export default class Floor{

    constructor(){
        this.experiance = new Experiance()
        this.scene = this.experiance.scene
        this.resources = this.experiance.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry(){
        this.geomety = new THREE.CircleGeometry( 5, 64)
        
    }
    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
        
    }
    setMesh(){
        this.mesh = new THREE.Mesh( this.geomety, this.material)
        this.mesh.receiveShadow = true
        this.mesh.rotation.x = - Math.PI * 0.5       
        this.scene.add( this.mesh )
        
    }
    setTextures(){
        this.textures = {}
        this.textures.color = this.resources.item.grassColorTexture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.item.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
        
    }


}