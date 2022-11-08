#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp vec4 color;
};

uniform FragInfo frag_info;

void main()
{
    gl_FragData[0] = frag_info.color;
}

