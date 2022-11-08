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
    highp vec2 _319 = v_dst_texture_coords;
    highp vec4 _867 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _426 = _319.x < 0.0;
        bool _433 = false;
        if (!_426)
        {
            _433 = _319.x >= 1.0;
        }
        else
        {
            _433 = _426;
        }
        bool _454 = false;
        if (!_433)
        {
            bool _443 = _319.y < 0.0;
            bool _450 = false;
            if (!_443)
            {
                _450 = _319.y >= 1.0;
            }
            else
            {
                _450 = _443;
            }
            _454 = _450;
        }
        else
        {
            _454 = _433;
        }
        if (_454)
        {
            _867 = vec4(0.0);
            break;
        }
        highp vec2 _866 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _842 = _319;
            _842.y = 1.0 - _319.y;
            _866 = _842;
        }
        else
        {
            _866 = _319;
        }
        _867 = texture2D(texture_sampler_dst, _866);
        break;
    }
    highp vec4 _329 = _867 * blend_info.dst_input_alpha;
    highp vec4 _868 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _567 = _329.w;
        if (_567 == 0.0)
        {
            _868 = vec4(0.0);
            break;
        }
        _868 = vec4(_329.xyz / vec3(_567), _567);
        break;
    }
    highp vec4 _878 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _878 = blend_info.color;
    }
    else
    {
        highp vec2 _351 = v_src_texture_coords;
        highp vec4 _876 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _611 = _351.x < 0.0;
            bool _618 = false;
            if (!_611)
            {
                _618 = _351.x >= 1.0;
            }
            else
            {
                _618 = _611;
            }
            bool _639 = false;
            if (!_618)
            {
                bool _628 = _351.y < 0.0;
                bool _635 = false;
                if (!_628)
                {
                    _635 = _351.y >= 1.0;
                }
                else
                {
                    _635 = _628;
                }
                _639 = _635;
            }
            else
            {
                _639 = _618;
            }
            if (_639)
            {
                _876 = vec4(0.0);
                break;
            }
            highp vec2 _875 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _854 = _351;
                _854.y = 1.0 - _351.y;
                _875 = _854;
            }
            else
            {
                _875 = _351;
            }
            _876 = texture2D(texture_sampler_src, _875);
            break;
        }
        highp vec4 _877 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_876.w == 0.0)
            {
                _877 = vec4(0.0);
                break;
            }
            _877 = vec4(_876.xyz / vec3(_876.w), _876.w);
            break;
        }
        _878 = _877;
    }
    highp vec3 _786 = _878.xyz * 2.0;
    highp vec3 _791 = _786 - vec3(1.0);
    gl_FragData[0] = mix(_329, vec4(mix(_868.xyz * _786, (-_868.xyz) * _791 + (_868.xyz + _791), max(sign(_878.xyz - vec3(0.5)), vec3(0.0))), 1.0) * _868.w, vec4(_878.w));
}

