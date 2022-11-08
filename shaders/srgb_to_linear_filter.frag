#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp float texture_sampler_y_coord_scale;
    highp float input_alpha;
};

uniform FragInfo frag_info;

uniform highp sampler2D input_texture;

varying highp vec2 v_position;

void main()
{
    highp vec2 _98 = v_position;
    highp vec2 _228 = vec2(0.0);
    if (frag_info.texture_sampler_y_coord_scale < 0.0)
    {
        highp vec2 _222 = _98;
        _222.y = 1.0 - _98.y;
        _228 = _222;
    }
    else
    {
        _228 = _98;
    }
    highp vec4 _182 = texture2D(input_texture, _228);
    highp vec4 _107 = _182 * frag_info.input_alpha;
    highp vec4 _229 = vec4(0.0);
    for (int spvDummy76 = 0; spvDummy76 < 1; spvDummy76++)
    {
        highp float _189 = _107.w;
        if (_189 == 0.0)
        {
            _229 = vec4(0.0);
            break;
        }
        _229 = vec4(_107.xyz / vec3(_189), _189);
        break;
    }
    highp vec4 color = _229;
    for (int _230 = 0; _230 < 3; _230++)
    {
        if (color[_230] <= 0.040449999272823333740234375)
        {
            color[_230] *= 0.077399380505084991455078125;
        }
        else
        {
            color[_230] = pow((color[_230] + 0.054999999701976776123046875) * 0.947867333889007568359375, 2.400000095367431640625);
        }
    }
    gl_FragData[0] = vec4(color.xyz * color.w, color.w);
}

