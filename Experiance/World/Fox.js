import Experiance from "../Experiance";
import * as THREE  from 'three'

export default class Fox{
    
    constructor(){
        this.experiance = new Experiance()
        this.scene = this.experiance.scene
        this.resources = this.experiance.resources
        this.time = this.experiance.time

        this.resource = this.resources.item.foxModel
        this.debug = this.experiance.debug
        
        if ( this.debug.active){

            this.debugFolder = this.debug.ui.addFolder('Fox')
        }

        this.setModel()
        this.setAnimation()
    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set( 0.02, 0.02, 0.02)
        this.model.traverse( child =>{
            if ( child instanceof THREE.Mesh){
                child.castShadow = true
            }
        })
        this.scene.add( this.model )
    }
    setAnimation(){
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        // this.animation.action = this.animation.mixer.clipAction( this.resource.animations[0])

        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction( this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction( this.resource.animations[1]) 
        this.animation.actions.running = this.animation.mixer.clipAction( this.resource.animations[2])
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play =  name => {
            const newAction = this.animation.actions[name]
            const prevAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(prevAction, 5)

            this.animation.actions.current = newAction
            
        }

        // debug 
        
        if (this.debug.active){
            const debugObject = {
            idle: ()=> { this. animation.play('idle')},
            walking: () => { this.animation.play('walking')},
            running: () => { this.animation.play( 'running')} 
            }

            this.debugFolder.add( debugObject,  'idle')
            this.debugFolder.add( debugObject,  'walking')
            this.debugFolder.add( debugObject,  'running')
       }}

    update(){
        this.animation.mixer.update( this.time.delta * 0.001 )
    }
}