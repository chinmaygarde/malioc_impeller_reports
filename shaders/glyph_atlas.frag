#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp vec2 atlas_size;
    highp vec4 text_color;
};

uniform FragInfo frag_info;

uniform highp sampler2D glyph_atlas_sampler;

varying highp vec2 v_atlas_glyph_size;
varying highp vec2 v_atlas_position;
varying highp float v_color_glyph;
varying highp vec2 v_unit_vertex;

void main()
{
    highp vec2 _23 = v_atlas_glyph_size / frag_info.atlas_size;
    highp vec2 _29 = v_atlas_position / frag_info.atlas_size;
    if (v_color_glyph == 1.0)
    {
        gl_FragData[0] = texture2D(glyph_atlas_sampler, v_unit_vertex * _23 + _29);
    }
    else
    {
        gl_FragData[0] = texture2D(glyph_atlas_sampler, v_unit_vertex * _23 + _29).wwww * frag_info.text_color;
    }
}

