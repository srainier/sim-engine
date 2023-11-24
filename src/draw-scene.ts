import { mat4 } from "gl-matrix";
import { Buffers, ProgramInfo } from "./types";

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
function setPositionAttribute(gl: WebGLRenderingContext, buffers: Buffers, programInfo: ProgramInfo) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexBuffer);

    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        buffers.vertexBufferLayout.numComponents,
        buffers.vertexBufferLayout.type,
        buffers.vertexBufferLayout.normalize,
        buffers.vertexBufferLayout.stride,
        buffers.vertexBufferLayout.offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

// Tell WebGL how to pull out the colors from the color buffer
// into the vertexColor attribute.
function setColorAttribute(gl: WebGLRenderingContext, buffers: Buffers, programInfo: ProgramInfo) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.colorBuffer);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        buffers.colorBufferLayout.numComponents,
        buffers.colorBufferLayout.type,
        buffers.colorBufferLayout.normalize,
        buffers.colorBufferLayout.stride,
        buffers.colorBufferLayout.offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

function setMeshAttribute(gl: WebGLRenderingContext, buffers: Buffers, programInfo: ProgramInfo) {
    // Maybe this is all that's needed for now?
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.meshBuffer);
}

function drawScene(gl: WebGLRenderingContext, buffers: Buffers, programInfo: ProgramInfo, cubeRotation: number) {
    // set the clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // set the clear depth to clear everything
    gl.clearDepth(1.0);
    // enable depth testing
    gl.enable(gl.DEPTH_TEST);
    // set a depth function such that near things are shown over far things
    gl.depthFunc(gl.LEQUAL);
    
    // clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // create the perspective  matrix
    const fieldOfView = (45 * Math.PI) / 180; // in radians
    const aspect = gl.canvas.width / gl.canvas.height;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    // NOTE: drawing center is (0, 0, -6), with the camera at (0, 0, 0)
    // and the back of the scene at z=-100.
    mat4.translate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [-0.0, 0.0, -6.0], // amount to translate
    ); 

    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        cubeRotation, // amount to rotate in radians
        [0, 0, 1],
    ); // axis to rotate around (Z)
    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        cubeRotation * 0.7, // amount to rotate in radians
        [0, 1, 0],
    ); // axis to rotate around (Y)
    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        cubeRotation * 0.3, // amount to rotate in radians
        [1, 0, 0],
    ); // axis to rotate around (X)

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    setPositionAttribute(gl, buffers, programInfo);

    setMeshAttribute(gl, buffers, programInfo);

    // Tell WebGL how to pull out the colors from the color buffer
    setColorAttribute(gl, buffers, programInfo);

    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);

    // Set projection matrix uniform
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix,
    );

    // Set the model view matrix uniform
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix,
    );

    // This is weird, but I get it allows for the enclosing scope
    // to have consts? anyway, draw the arrays.
    {
        // NOTE: this assumes we're drawing a cube, and isn't generalized
        // for any size of mesh. also assumes small mesh.
        gl.drawElements(
            gl.TRIANGLES,
            36,
            gl.UNSIGNED_SHORT,
            0);
    }

}

export { drawScene };