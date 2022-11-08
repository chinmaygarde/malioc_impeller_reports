#version 100

struct FrameInfo
{
    mat4 mvp;
    mat4 matrix;
};

uniform FrameInfo frame_info;

attribute vec2 position;
varying vec2 v_position;

void main()
{
    vec4 _58 = vec4(position, 0.0, 1.0);
    gl_Position = frame_info.mvp * _58;
    vec4 _79 = frame_info.matrix * _58;
    v_position = _79.xy / vec2(_79.w);
    gl_Position.z = 2.0 * gl_Position.z - gl_Position.w;
}

