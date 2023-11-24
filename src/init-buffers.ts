import { BufferLayout, Buffers } from "./types";
import { createVertexLayout, createColorLayout, createSmallMeshLayout, createLargeMeshLayout } from "./types";

// WebGL2RenderingContext ??????
function initBuffer(gl: WebGLRenderingContext, bufferID: number, bufferData: Float32Array | Uint16Array): WebGLBuffer | null {
    const buffer = gl.createBuffer();
    if (!buffer) {
        alert("Couldn't create buffer");
        return null;
    }

    gl.bindBuffer(bufferID, buffer);
    gl.bufferData(bufferID, bufferData, gl.STATIC_DRAW);

    return buffer;
}

function initPositionBuffer(gl: WebGLRenderingContext, vertexPositions: number[]): WebGLBuffer | null {
    return initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vertexPositions));
}

function initIndexBuffer(gl: WebGLRenderingContext, meshIndices: number[]): WebGLBuffer | null {
    return initBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshIndices));
}

function initColorBuffer(gl: WebGLRenderingContext, vertexColors: number[]): WebGLBuffer | null {
    return initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vertexColors));
}


function initBuffers(gl: WebGLRenderingContext,
                     vertexPositions: number[],
                     meshIndices: number[],
                     vertexColors: number[] ): Buffers | null {
    const vertexBuffer = initPositionBuffer(gl, vertexPositions);
    if (!vertexBuffer) {
        alert("Couldn't initialize buffers");
        return null;
    }

    const meshBuffer = initIndexBuffer(gl, meshIndices);
    if (!meshBuffer) {
        alert("Couldn't initialize buffers");
        return null;
    }

    const colorBuffer = initColorBuffer(gl, vertexColors);
    if (!colorBuffer) {
        alert("Couldn't initialize buffers");
        return null;
    }
  
    // this internalizes assumptions about the layout of the buffers, which is bad.
    return {
      vertexBuffer: vertexBuffer,
      vertexBufferLayout: createVertexLayout(gl),
      meshBuffer: meshBuffer,
      colorBuffer: colorBuffer,
      colorBufferLayout: createColorLayout(gl),
    };
}

export { initBuffers };