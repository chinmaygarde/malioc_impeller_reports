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
    highp vec2 _330 = v_dst_texture_coords;
    highp vec4 _885 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _437 = _330.x < 0.0;
        bool _444 = false;
        if (!_437)
        {
            _444 = _330.x >= 1.0;
        }
        else
        {
            _444 = _437;
        }
        bool _465 = false;
        if (!_444)
        {
            bool _454 = _330.y < 0.0;
            bool _461 = false;
            if (!_454)
            {
                _461 = _330.y >= 1.0;
            }
            else
            {
                _461 = _454;
            }
            _465 = _461;
        }
        else
        {
            _465 = _444;
        }
        if (_465)
        {
            _885 = vec4(0.0);
            break;
        }
        highp vec2 _884 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _860 = _330;
            _860.y = 1.0 - _330.y;
            _884 = _860;
        }
        else
        {
            _884 = _330;
        }
        _885 = texture2D(texture_sampler_dst, _884);
        break;
    }
    highp vec4 _340 = _885 * blend_info.dst_input_alpha;
    highp vec4 _886 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _578 = _340.w;
        if (_578 == 0.0)
        {
            _886 = vec4(0.0);
            break;
        }
        _886 = vec4(_340.xyz / vec3(_578), _578);
        break;
    }
    highp vec4 _896 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _896 = blend_info.color;
    }
    else
    {
        highp vec2 _362 = v_src_texture_coords;
        highp vec4 _894 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _622 = _362.x < 0.0;
            bool _629 = false;
            if (!_622)
            {
                _629 = _362.x >= 1.0;
            }
            else
            {
                _629 = _622;
            }
            bool _650 = false;
            if (!_629)
            {
                bool _639 = _362.y < 0.0;
                bool _646 = false;
                if (!_639)
                {
                    _646 = _362.y >= 1.0;
                }
                else
                {
                    _646 = _639;
                }
                _650 = _646;
            }
            else
            {
                _650 = _629;
            }
            if (_650)
            {
                _894 = vec4(0.0);
                break;
            }
            highp vec2 _893 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _872 = _362;
                _872.y = 1.0 - _362.y;
                _893 = _872;
            }
            else
            {
                _893 = _362;
            }
            _894 = texture2D(texture_sampler_src, _893);
            break;
        }
        highp vec4 _895 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_894.w == 0.0)
            {
                _895 = vec4(0.0);
                break;
            }
            _895 = vec4(_894.xyz / vec3(_894.w), _894.w);
            break;
        }
        _896 = _895;
    }
    highp vec3 _804 = _886.xyz * 2.0;
    highp vec3 _809 = _804 - vec3(1.0);
    gl_FragData[0] = mix(_340, vec4(mix(_896.xyz * _804, (-_896.xyz) * _809 + (_896.xyz + _809), max(sign(_886.xyz - vec3(0.5)), vec3(0.0))), 1.0) * _886.w, vec4(_896.w));
}

