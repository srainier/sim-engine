import { Buffers } from "./types";

function initPositionBuffer(gl: WebGLRenderingContext): WebGLBuffer | null {
    // Create a buffer for the square's positions.
    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
        alert("Couldn't create buffer");
        return null;
    }
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the square.
    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
  
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
    return positionBuffer;
}

function initColorBuffer(gl: WebGLRenderingContext): WebGLBuffer | null {
    const colors = [
        1.0,
        1.0,
        1.0,
        1.0, // white
        1.0,
        0.0,
        0.0,
        1.0, // red
        0.0,
        1.0,
        0.0,
        1.0, // green
        0.0,
        0.0,
        1.0,
        1.0, // blue
    ];

    const colorBuffer: WebGLBuffer = gl.createBuffer();
    if (!colorBuffer) {
        alert("Couldn't create buffer");
        return null;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}


function initBuffers(gl: WebGLRenderingContext): Buffers | null {
    const positionBuffer = initPositionBuffer(gl);
    if (!positionBuffer) {
        alert("Couldn't initialize buffers");
        return null;
    }

    const colorBuffer = initColorBuffer(gl);
    if (!colorBuffer) {
        alert("Couldn't initialize buffers");
        return null;
    }
  
    return {
      position: positionBuffer,
      color: colorBuffer,
    };
}

export { initBuffers };