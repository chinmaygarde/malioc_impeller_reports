#version 100

struct FrameInfo
{
    mat4 mvp;
};

uniform FrameInfo frame_info;

attribute vec2 unit_vertex;
attribute vec2 glyph_position;
attribute vec2 glyph_size;
varying vec2 v_unit_vertex;
varying vec2 v_atlas_position;
attribute vec2 atlas_position;
varying vec2 v_atlas_glyph_size;
attribute vec2 atlas_glyph_size;
varying float v_color_glyph;
attribute float color_glyph;

void main()
{
    gl_Position = mat4(frame_info.mvp[0], frame_info.mvp[1], frame_info.mvp[2], vec4((((frame_info.mvp[0] * glyph_position.x) + (frame_info.mvp[1] * glyph_position.y)) + frame_info.mvp[3]).xyz, frame_info.mvp[3].w)) * vec4(unit_vertex.x * glyph_size.x, unit_vertex.y * glyph_size.y, 0.0, 1.0);
    v_unit_vertex = unit_vertex;
    v_atlas_position = atlas_position;
    v_atlas_glyph_size = atlas_glyph_size;
    v_color_glyph = color_glyph;
    gl_Position.z = 2.0 * gl_Position.z - gl_Position.w;
}

