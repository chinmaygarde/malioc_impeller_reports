#version 100
precision mediump float;
precision highp int;

struct BlendInfo
{
    highp float dst_input_alpha;
    highp float dst_y_coord_scale;
    highp float src_y_coord_scale;
    highp float color_factor;
    highp vec4 color;
};

uniform BlendInfo blend_info;

uniform highp sampler2D texture_sampler_dst;
uniform highp sampler2D texture_sampler_src;

varying highp vec2 v_dst_texture_coords;
varying highp vec2 v_src_texture_coords;

void main()
{
    highp vec2 _247 = v_dst_texture_coords;
    highp vec4 _744 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _354 = _247.x < 0.0;
        bool _361 = false;
        if (!_354)
        {
            _361 = _247.x >= 1.0;
        }
        else
        {
            _361 = _354;
        }
        bool _382 = false;
        if (!_361)
        {
            bool _371 = _247.y < 0.0;
            bool _378 = false;
            if (!_371)
            {
                _378 = _247.y >= 1.0;
            }
            else
            {
                _378 = _371;
            }
            _382 = _378;
        }
        else
        {
            _382 = _361;
        }
        if (_382)
        {
            _744 = vec4(0.0);
            break;
        }
        highp vec2 _743 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _719 = _247;
            _719.y = 1.0 - _247.y;
            _743 = _719;
        }
        else
        {
            _743 = _247;
        }
        _744 = texture2D(texture_sampler_dst, _743);
        break;
    }
    highp vec4 _257 = _744 * blend_info.dst_input_alpha;
    highp vec4 _745 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _495 = _257.w;
        if (_495 == 0.0)
        {
            _745 = vec4(0.0);
            break;
        }
        _745 = vec4(_257.xyz / vec3(_495), _495);
        break;
    }
    highp vec4 _755 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _755 = blend_info.color;
    }
    else
    {
        highp vec2 _279 = v_src_texture_coords;
        highp vec4 _753 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _539 = _279.x < 0.0;
            bool _546 = false;
            if (!_539)
            {
                _546 = _279.x >= 1.0;
            }
            else
            {
                _546 = _539;
            }
            bool _567 = false;
            if (!_546)
            {
                bool _556 = _279.y < 0.0;
                bool _563 = false;
                if (!_556)
                {
                    _563 = _279.y >= 1.0;
                }
                else
                {
                    _563 = _556;
                }
                _567 = _563;
            }
            else
            {
                _567 = _546;
            }
            if (_567)
            {
                _753 = vec4(0.0);
                break;
            }
            highp vec2 _752 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _731 = _279;
                _731.y = 1.0 - _279.y;
                _752 = _731;
            }
            else
            {
                _752 = _279;
            }
            _753 = texture2D(texture_sampler_src, _752);
            break;
        }
        highp vec4 _754 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_753.w == 0.0)
            {
                _754 = vec4(0.0);
                break;
            }
            _754 = vec4(_753.xyz / vec3(_753.w), _753.w);
            break;
        }
        _755 = _754;
    }
    gl_FragData[0] = mix(_257, vec4(abs(_745.xyz - _755.xyz), 1.0) * _745.w, vec4(_755.w));
}

