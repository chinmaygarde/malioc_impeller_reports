#version 100

struct VertInfo
{
    mat4 mvp;
};

uniform VertInfo vert_info;

attribute vec2 position;

void main()
{
    gl_Position = vert_info.mvp * vec4(position, 0.0, 1.0);
    gl_Position.z = 2.0 * gl_Position.z - gl_Position.w;
}

