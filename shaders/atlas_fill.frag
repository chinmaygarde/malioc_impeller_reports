#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp float texture_sampler_y_coord_scale;
    highp float has_vertex_color;
    highp float alpha;
};

uniform FragInfo frag_info;

uniform highp sampler2D texture_sampler;

varying highp vec2 v_texture_coords;
varying highp vec4 v_color;

void main()
{
    highp vec2 _54 = v_texture_coords;
    highp vec2 _105 = vec2(0.0);
    if (frag_info.texture_sampler_y_coord_scale < 0.0)
    {
        highp vec2 _104 = _54;
        _104.y = 1.0 - _54.y;
        _105 = _104;
    }
    else
    {
        _105 = _54;
    }
    highp vec4 _101 = texture2D(texture_sampler, _105);
    if (frag_info.has_vertex_color == 1.0)
    {
        gl_FragData[0] = (_101.wwww * v_color) * frag_info.alpha;
    }
    else
    {
        gl_FragData[0] = _101 * frag_info.alpha;
    }
}

