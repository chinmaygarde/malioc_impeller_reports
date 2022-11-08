#version 100

struct VertInfo
{
    mat4 mvp;
};

uniform VertInfo vert_info;

attribute vec2 position;
varying vec2 v_uv;
attribute vec2 uv;
varying vec2 v_position;

void main()
{
    vec4 _59 = vert_info.mvp * vec4(position, 0.0, 1.0);
    gl_Position = _59;
    v_uv = uv;
    v_position = _59.xy / vec2(_59.w);
    gl_Position.z = 2.0 * gl_Position.z - gl_Position.w;
}

