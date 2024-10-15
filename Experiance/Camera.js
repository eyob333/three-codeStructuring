import Experiance from "./Experiance.js"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera{

    constructor( ){

        // this.experiance = window.experiance
        this.experiance = new Experiance()
        this.scene = this.experiance.scene
        this.sizes = this.experiance.sizes
        this.canvas = this.experiance.canvas
        this.setInstance()
        this.orbitControls()
    }
    
    setInstance(){
        this.instance = new THREE.PerspectiveCamera( 35, this.sizes.width/ this.sizes.height, 0.1, 100)
        this.instance.position.set(6, 4, 8 )
        this.scene.add( this.instance )
    }

    orbitControls(){
        this.controls = new OrbitControls( this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.sizes.width/ this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.controls.update()
    }
}