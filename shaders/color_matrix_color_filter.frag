#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp mat4 color_m;
    highp vec4 color_v;
    highp float texture_sampler_y_coord_scale;
    highp float input_alpha;
};

uniform FragInfo frag_info;

uniform highp sampler2D input_texture;

varying highp vec2 v_position;

void main()
{
    highp vec2 _83 = v_position;
    highp vec2 _184 = vec2(0.0);
    if (frag_info.texture_sampler_y_coord_scale < 0.0)
    {
        highp vec2 _178 = _83;
        _178.y = 1.0 - _83.y;
        _184 = _178;
    }
    else
    {
        _184 = _83;
    }
    highp vec4 _151 = texture2D(input_texture, _184);
    highp vec4 _92 = _151 * frag_info.input_alpha;
    highp vec4 _185 = vec4(0.0);
    for (int spvDummy88 = 0; spvDummy88 < 1; spvDummy88++)
    {
        highp float _158 = _92.w;
        if (_158 == 0.0)
        {
            _185 = vec4(0.0);
            break;
        }
        _185 = vec4(_92.xyz / vec3(_158), _158);
        break;
    }
    highp vec4 _110 = clamp((frag_info.color_m * _185) + frag_info.color_v, vec4(0.0), vec4(1.0));
    highp float _116 = _110.w;
    gl_FragData[0] = vec4(_110.xyz * _116, _116);
}

