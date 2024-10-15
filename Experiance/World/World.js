import * as THREE from 'three'
import Experiance from "../Experiance"
import Enviromet from './Enviromet'
import Floor from './Floor'
import Fox from './Fox'

export default class World{

    constructor(){
        this.experiance = new Experiance()
        this.scene = this.experiance.scene
        this.resorces = this.experiance.resources

        // test mesh 

        // const testMesh = new THREE.Mesh( 
        //     new THREE.BoxGeometry(),
        //     new THREE.MeshStandardMaterial({color: '#ffffff',})
        // )
        // testMesh.castShadow  = true

        // this.scene.add( testMesh )
        
        this.resorces.on( 'ready', ()=>{            
            this.floor  = new Floor()
            this.fox = new Fox()
            this.enviroment = new Enviromet()

        })

    }

    update(){
        if ( this.fox ){
            this.fox.update()
        }
    }
}