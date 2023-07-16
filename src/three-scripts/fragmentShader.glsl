precision mediump float;

varying float vaRandom;

void main(){
    gl_FragColor = vec4(0.1 / ( vaRandom / 2.0), 0.5, 0.9, 1.0);
}

