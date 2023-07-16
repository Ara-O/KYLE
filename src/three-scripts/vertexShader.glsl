uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform float spikeLevel;

//Attributes are gotten from the geometry
attribute float aRandom;
attribute vec3 position;

//Random values created with points from geometry attriibutes
varying float vaRandom;

void main(){

    vec4 finishedModelMatrix = modelMatrix * vec4(position, 1.0);

    finishedModelMatrix.z += aRandom * spikeLevel;
    gl_Position = projectionMatrix * viewMatrix * finishedModelMatrix;
    vaRandom = aRandom;
}