uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

//Attributes are gotten from the geometry
attribute float aRandom;
attribute vec3 position;

void main(){

    vec4 finishedModelMatrix = modelMatrix * vec4(position, 1.0);
    finishedModelMatrix.z += aRandom;
    gl_Position = projectionMatrix * viewMatrix * finishedModelMatrix;
}