
export interface BufferLayout {
    numComponents: number,
    type: number, // = gl.FLOAT; // the data in the buffer is 32bit floats
    normalize: boolean, // = false; // don't normalize
    stride: number, // = 0; // how many bytes to get from one set of values to the next
    offset: number // = 0; // how many bytes inside the buffer to start from
}

// could have some helper methods that create default buffer layouts for 
// different types of buffers - vertex, color, texture, etc.

export function createVertexLayout(gl: WebGLRenderingContext): BufferLayout {
    return {
        numComponents: 3,
        type: gl.FLOAT,
        normalize: false,
        stride: 0,
        offset: 0,
    };
}

export function createColorLayout(gl: WebGLRenderingContext): BufferLayout {
    return {
        numComponents: 4,
        type: gl.FLOAT,
        normalize: false,
        stride: 0,
        offset: 0,
    };
}

export function createSmallMeshLayout(gl: WebGLRenderingContext): BufferLayout {
    return {
        numComponents: 3,
        type: gl.UNSIGNED_SHORT,
        normalize: false,
        stride: 0,
        offset: 0,
    };
}

export function createLargeMeshLayout(gl: WebGLRenderingContext): BufferLayout {
    return {
        numComponents: 3,
        type: gl.UNSIGNED_INT,
        normalize: false,
        stride: 0,
        offset: 0,
    };
}

/*
 * Buffers type
 */
export interface Buffers {
    vertexBuffer: WebGLBuffer; // TODO: this may include texture coordinates.
    vertexBufferLayout: BufferLayout;
    meshBuffer: WebGLBuffer;
    colorBuffer: WebGLBuffer;
    colorBufferLayout: BufferLayout;
}

/*
 * ProgramInfo type
 */
export interface ProgramInfo {
    program: WebGLProgram;
    attribLocations: {
        vertexPosition: number;
        vertexColor: number;
    };
    uniformLocations: {
        projectionMatrix: WebGLUniformLocation;
        modelViewMatrix: WebGLUniformLocation;
    };
}