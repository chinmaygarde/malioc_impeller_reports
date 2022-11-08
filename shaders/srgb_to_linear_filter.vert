#version 100

struct FrameInfo
{
    mat4 mvp;
};

uniform FrameInfo frame_info;

varying vec2 v_position;
attribute vec2 position;

void main()
{
    v_position = position;
    gl_Position = frame_info.mvp * vec4(position, 0.0, 1.0);
    gl_Position.z = 2.0 * gl_Position.z - gl_Position.w;
}

