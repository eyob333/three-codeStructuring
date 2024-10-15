import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter{

    constructor(sources){
        super()
        this.sources = sources
        
        //set up
        this.item = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()

    }

    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeLoader = new THREE.CubeTextureLoader()
    }

    startLoading(){
        this.sources.forEach( source => {
            if( source.type === 'gltfModel'){
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded( source, file)
                    }
                )
            } 

            else if( source.type === 'cubeTexture'){
                this.loaders.cubeLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded( source, file)
                    },
                    () => {console.log('progress')},
                    () => {console.log('faild')}
                )
            }

            else if ( source.type === 'texture'){
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded( source, file)
                    },
                    () => {console.log('progress')},
                    () => {console.log('faild')}
                )
            }
        });
    }

    sourceLoaded(source, file){
        this.item[source.name] = file
        this.loaded++ 
        if (this.loaded === this.toLoad ){
            console.log( 'ready' )
            this.trigger('ready')
        }
    }
}