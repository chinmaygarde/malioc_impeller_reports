#version 100

struct VertInfo
{
    mat4 mvp;
    vec4 color;
};

uniform VertInfo vert_info;

attribute vec2 position;
varying vec4 v_color;

void main()
{
    gl_Position = vert_info.mvp * vec4(position, 0.0, 1.0);
    v_color = vert_info.color;
    gl_Position.z = 2.0 * gl_Position.z - gl_Position.w;
}

