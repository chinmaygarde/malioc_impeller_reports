#version 100

struct FrameInfo
{
    mat4 mvp;
    vec2 sigma_uv;
    float src_factor;
    float inner_blur_factor;
    float outer_blur_factor;
};

uniform FrameInfo frame_info;

attribute vec2 vertices;
varying vec2 v_texture_coords;
attribute vec2 texture_coords;
varying vec2 v_sigma_uv;
varying float v_src_factor;
varying float v_inner_blur_factor;
varying float v_outer_blur_factor;

void main()
{
    gl_Position = frame_info.mvp * vec4(vertices, 0.0, 1.0);
    v_texture_coords = texture_coords;
    v_sigma_uv = frame_info.sigma_uv;
    v_src_factor = frame_info.src_factor;
    v_inner_blur_factor = frame_info.inner_blur_factor;
    v_outer_blur_factor = frame_info.outer_blur_factor;
    gl_Position.z = 2.0 * gl_Position.z - gl_Position.w;
}

