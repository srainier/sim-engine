/*
 * Buffers type
 */
export interface Buffers {
    position: WebGLBuffer;
    color: WebGLBuffer;
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