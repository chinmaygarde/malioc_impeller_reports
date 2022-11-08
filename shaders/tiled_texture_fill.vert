#version 100

struct VertInfo
{
    mat4 mvp;
    mat4 matrix;
    vec2 texture_size;
};

uniform VertInfo vert_info;

attribute vec2 position;
varying vec2 v_texture_coords;

void main()
{
    vec4 _58 = vec4(position, 0.0, 1.0);
    gl_Position = vert_info.mvp * _58;
    vec4 _86 = vert_info.matrix * _58;
    v_texture_coords = (_86.xy / vec2(_86.w)) / vert_info.texture_size;
    gl_Position.z = 2.0 * gl_Position.z - gl_Position.w;
}

