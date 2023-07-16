precision mediump float;

varying float vaRandom;

uniform float angerLevel;


void main(){
    // 0.1 max red, 1 min red
    // vec4(0.0, 0.4, 0.9, 1.0)
    if(angerLevel < 0.5){
        gl_FragColor = vec4(0.0, 0.4, 0.9, 1.0);
    }else{
        gl_FragColor = vec4(1.0 + vaRandom, 0.15 - vaRandom, 0.2* vaRandom, vaRandom);
    }
}

