/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        // Prevent scrolling on everything

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');


        

        // Starting THREE.JS CODE here

        // Scene
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.x = 1;
        camera.position.y = 6;
        camera.position.z = 6;

        // Meshs
        var material = new THREE.MeshNormalMaterial({wireframe: false, side: THREE.DoubleSide} );

        // Custom Model

        // Instantiate a loader
        var loader = new THREE.GLTFLoader();



        // Load a glTF resource
        loader.load(
        // resource URL
        'res/exports/armGroup.gltf',
        // called when the resource is loaded
            function ( gltf ) {
                console.log(gltf.scene.children)
                scene.add( gltf.scene );

                gltf.scene.children[1].material.emissive.r = 0.25;
                

                // Setting Normal Shader on all the parts of the mesh
                gltf.scene.children.forEach(element => {
                    element.material = material;
                });


                gltfExport = gltf.scene.children[0];

                renderer.render( scene, camera );
            
            /* ///////////////////////////////////////////////////////////////////////

                                        CONTROLS

            */ ///////////////////////////////////////////////////////////////////////

            var showMuscles = document.getElementById('controls--muscles');
            var showBones = document.getElementById('controls--bones');
            // Muscles variables
            var showBiceps = document.getElementById('controls--biceps');
            var showTriceps = document.getElementById('controls--triceps');
            var showBrachialis = document.getElementById('controls--brachialis');
            var showExtensorSupinator = document.getElementById('controls--extensorSupinator');
            var showFlexorPronator = document.getElementById('controls--flexorPronator');
            var showDeltoid = document.getElementById('controls--deltoid');
            
            // showMuscles.addEventListener('click', toggleMuscles);
            // showBones.addEventListener('click', toggleBones);
            // Muscles events
            showBiceps.addEventListener('click', showElement);
            showTriceps.addEventListener('click', showElement);
            showBrachialis.addEventListener('click', showElement);
            showExtensorSupinator.addEventListener('click', showElement);
            showFlexorPronator.addEventListener('click', showElement);
            showDeltoid.addEventListener('click', showElement);

            function showElement() {
                console.log(event.target.id);
                muscleId = event.target.id;

                function toggleVisibility(i) {
                    if (gltf.scene.children[i].visible === true) {
                        gltf.scene.children[i].visible = false;
                    } else {
                        gltf.scene.children[i].visible = true;
                    }
                }

                switch(muscleId) {
                    
                    case 'controls--biceps':
                        console.log(gltf.scene.children[5]);
                        toggleVisibility(5);
                        break;
                    case 'controls--deltoid':
                        console.log(gltf.scene.children[4]);
                        toggleVisibility(4);
                        break;
                    case 'controls--triceps':
                        console.log(gltf.scene.children[3]);
                        toggleVisibility(3);
                        break;
                    case 'controls--brachialis':
                        console.log(gltf.scene.children[2]);
                        toggleVisibility(2);
                        break;
                    case 'controls--extensorSupinator':
                        console.log(gltf.scene.children[1]);
                        toggleVisibility(1);
                        break;
                    case 'controls--flexorPronator':
                        console.log(gltf.scene.children[0]);
                        toggleVisibility(0);
                        break;
                    default:
                        console.log('null');
                }
            }


            // TOGGLE VISIBILITY
            


            function toggleMuscles() {
                if (gltf.scene.children[1].visible === true) {
                    gltf.scene.children[1].visible = false;
                } else {
                    gltf.scene.children[1].visible = true;
                }
            }


            // CONTROLS END

            },
            
        );

        // Lights
        var light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
        light.position.set( 0, 1, 0 );
        light.castShadow = true;
        scene.add( light );

        var light2 = new THREE.AmbientLight( 0xffffff, 0.5 );
        light.position.set( 0, 1, 0 );
        scene.add( light2 );

        // Renderer
        var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        var canvas = document.getElementById('canvasBox');
        canvas.appendChild( renderer.domElement );

        var controls = new THREE.OrbitControls( camera );
        renderer.render( scene, camera );




        // Rendering
        function animate() {
            requestAnimationFrame( animate );
            
            // Animating the cube
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;

            // cube.position.x += 0.001;
            // cube.position.y += 0.001;
            // cube.position.z += 0.002;
            // controls.update();
            renderer.render( scene, camera );
        }
        animate();


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');


        console.log('Received Event: ' + id);

        
    }
};
