/*
 * Buffers type
 */
export interface Buffers {
    position: WebGLBuffer;
}

/*
 * ProgramInfo type
 */
export interface ProgramInfo {
    program: WebGLProgram;
    attribLocations: {
        vertexPosition: number;
    };
    uniformLocations: {
        projectionMatrix: WebGLUniformLocation;
        modelViewMatrix: WebGLUniformLocation;
    };
}