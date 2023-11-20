/*
    * removed from the shader code:
    attribute vec4 aVertexColor;
    varying lowp vec4 vColor;
    vColor = aVertexColor;
    */
let vertexShaderSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
`;

// Create a fragment shader program
let fragmentShaderSource = `
    void main(void) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

export { vertexShaderSource, fragmentShaderSource };