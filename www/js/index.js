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

        // Lock Device orientation on portrait (the cordova plugin is deprecated)
        screen.orientation.lock('portrait').then(function success() {
        console.log("Successfully locked the orientation");
        },function error(errMsg) {
        console.log("Error locking the orientation :: " + errMsg);
        });
        
        // Show Navigator splashscreen
        navigator.splashscreen.show();

        // STARTING THREE.JS CODE HERE
        //
        // Creating the Scene and the camera
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.x = 0;
        camera.position.y = 2;
        camera.position.z = 3;

        // Creating Normal and Base materials
        var material = new THREE.MeshNormalMaterial({wireframe: false, side: THREE.DoubleSide} );
        var baseMaterial = new THREE.MeshBasicMaterial({ color:0x2979ff, wireframe: false, side: THREE.DoubleSide} );

        // Custom Model imported from Blender
        //
        // Instantiate a loader
        var loader = new THREE.GLTFLoader();

        // Load a glTF resource
        loader.load(
        // resource URL
        'res/exports/armGroup.gltf',
        // called when the resource is loaded
            function ( gltf ) {
                scene.add( gltf.scene );

                // Setting Normal Shader on all the parts(muscles) of the Model
                gltf.scene.children.forEach(element => {
                    element.material = material;
                });

                gltf.scene.children[7].material = baseMaterial;
                renderer.render( scene, camera );
            
            /*
            **************************************************************************
            CONTROLS START
            **************************************************************************
            */

            // Muscles variables
            var showBiceps = document.getElementById('controls--biceps');
            var showTriceps = document.getElementById('controls--triceps');
            var showBrachialis = document.getElementById('controls--brachialis');
            var showExtensorSupinator = document.getElementById('controls--extensorSupinator');
            var showFlexorPronator = document.getElementById('controls--flexorPronator');
            var showDeltoid = document.getElementById('controls--deltoid');

            // Muscles events
            showBiceps.addEventListener('click', showElement);
            showTriceps.addEventListener('click', showElement);
            showBrachialis.addEventListener('click', showElement);
            showExtensorSupinator.addEventListener('click', showElement);
            showFlexorPronator.addEventListener('click', showElement);
            showDeltoid.addEventListener('click', showElement);

            function showElement() {
                muscleId = event.target.id;
                btnTarget = event.target;

                // Show or Hide the Muscle on the mesh
                function toggleVisibility(i) {
                    if (gltf.scene.children[i].visible === true) {
                        gltf.scene.children[i].visible = false;
                        // Disable Style for buttons
                        btnTarget.style.background = '#333';
                        btnTarget.style.color = '#777';
                    } else {
                        gltf.scene.children[i].visible = true;
                        // Enable Style for buttons
                        btnTarget.style.background = '#2979ff';
                        btnTarget.style.color = '#fff';
                    }
                }
                
                // Switch for the muscles parts
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
            /*
            **************************************************************************
            CONTROLS END
            **************************************************************************
            */
            // Deactivate Splashscreen
            navigator.splashscreen.hide();
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
        var canvas = document.getElementById('canvasBox');
        canvas.appendChild( renderer.domElement );

        // Controls
        var controls = new THREE.OrbitControls( camera );
        renderer.render( scene, camera );

        // Rendering
        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        animate();


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        console.log('Received Event: ' + id);
    }
};
