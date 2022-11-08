#version 100

struct FrameInfo
{
    mat4 mvp;
};

uniform FrameInfo frame_info;

attribute vec2 vertices;
varying vec2 v_texture_coords;
attribute vec2 texture_coords;
varying vec2 v_src_texture_coords;
attribute vec2 src_texture_coords;

void main()
{
    gl_Position = frame_info.mvp * vec4(vertices, 0.0, 1.0);
    v_texture_coords = texture_coords;
    v_src_texture_coords = src_texture_coords;
    gl_Position.z = 2.0 * gl_Position.z - gl_Position.w;
}

