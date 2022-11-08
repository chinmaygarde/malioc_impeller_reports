#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp float texture_sampler_y_coord_scale;
    highp float alpha;
};

uniform FragInfo frag_info;

uniform highp sampler2D texture_sampler;

varying highp vec2 v_texture_coords;

void main()
{
    highp vec2 _54 = v_texture_coords;
    highp vec2 _89 = vec2(0.0);
    if (frag_info.texture_sampler_y_coord_scale < 0.0)
    {
        highp vec2 _88 = _54;
        _88.y = 1.0 - _54.y;
        _89 = _88;
    }
    else
    {
        _89 = _54;
    }
    gl_FragData[0] = texture2D(texture_sampler, _89) * frag_info.alpha;
}

