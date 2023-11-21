import { Buffers, ProgramInfo } from "./types";
import { initBuffers } from "./init-buffers";
import { drawScene } from "./draw-scene";
import { vertexShaderSource, fragmentShaderSource } from "./shader-source";

// This function creates a shader of the given type, uploads the source and compiles it.
function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
    let vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    if (!vertexShader) {
        alert("Couldn't create vertex shader");
        return null;
    }
    let fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!fragmentShader) {
        alert("Couldn't create fragment shader");
        return null;
    }

    // Create the shader program
    let shaderProgram = gl.createProgram();
    if (!shaderProgram) {
        alert("Couldn't create shader");
        return null;
    }
    // attach the vertext shader
    gl.attachShader(shaderProgram, vertexShader);
    // attach the fragment shader
    gl.attachShader(shaderProgram, fragmentShader);
    // link the program
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
        return null;
    }

    return shaderProgram;
}

// create a shader of a type
function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    let shader = gl.createShader(type);
    if (!shader) {
        alert("Couldn't create shader");
        return null;
    }

    // Send the source to the shader object
    gl.shaderSource(shader, source);
    // Compile the shader program
    gl.compileShader(shader);
    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(`An error occurred`);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

let squareRotation = 0.0;
let deltaTime = 0;

/* main function */
function main(vsSource: string, fsSource: string) {
    let canvas = document.getElementById("glcanvas");
    if (!canvas) {
        alert("Couldn't find canvas element");
        return;
    }
    let glcanvas = <HTMLCanvasElement>canvas;
    // Initialize the GL context
    let gl = glcanvas.getContext("webgl");
    // Only continue if WebGL is available and working
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    // Set the clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Create a vertex shader program
    // Initialize a shader program
    let shaderProgram = initShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!shaderProgram) {
        alert("Couldn't initialize shader program");
        return;
    }

    // Collect all the info needed to use the shader program.
    // Look up which attribute our shader program is using
    // for aVertexPosition and look up uniform locations.
    const programInfo: ProgramInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
            vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        },
    };

    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    const buffers = initBuffers(gl);

    // Hey, it's the render loop!

    // Draw the scene
    let then: number = 0;

    // draw the scene repeatedly
    function render(now: number) {
        now *= 0.001; // convert to seconds
        deltaTime = now - then;
        then = now;

        drawScene(gl, buffers, programInfo, squareRotation);
        squareRotation += deltaTime;

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main(vertexShaderSource, fragmentShaderSource);