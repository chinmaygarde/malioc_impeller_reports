#version 100
#extension GL_OES_standard_derivatives : require
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
varying highp vec2 v_unit_vertex;

void main()
{
    highp vec4 _45 = texture2D(glyph_atlas_sampler, v_unit_vertex * (v_atlas_glyph_size / frag_info.atlas_size) + (v_atlas_position / frag_info.atlas_size));
    highp float _48 = _45.w;
    highp float _55 = length(vec2(dFdx(_48), dFdy(_48)));
    gl_FragData[0] = frag_info.text_color * smoothstep(0.5 - _55, 0.5 + _55, _48);
}

