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
    highp vec2 _339 = v_dst_texture_coords;
    highp vec4 _926 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _446 = _339.x < 0.0;
        bool _453 = false;
        if (!_446)
        {
            _453 = _339.x >= 1.0;
        }
        else
        {
            _453 = _446;
        }
        bool _474 = false;
        if (!_453)
        {
            bool _463 = _339.y < 0.0;
            bool _470 = false;
            if (!_463)
            {
                _470 = _339.y >= 1.0;
            }
            else
            {
                _470 = _463;
            }
            _474 = _470;
        }
        else
        {
            _474 = _453;
        }
        if (_474)
        {
            _926 = vec4(0.0);
            break;
        }
        highp vec2 _925 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _901 = _339;
            _901.y = 1.0 - _339.y;
            _925 = _901;
        }
        else
        {
            _925 = _339;
        }
        _926 = texture2D(texture_sampler_dst, _925);
        break;
    }
    highp vec4 _349 = _926 * blend_info.dst_input_alpha;
    highp vec4 _927 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _587 = _349.w;
        if (_587 == 0.0)
        {
            _927 = vec4(0.0);
            break;
        }
        _927 = vec4(_349.xyz / vec3(_587), _587);
        break;
    }
    highp vec4 _937 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _937 = blend_info.color;
    }
    else
    {
        highp vec2 _371 = v_src_texture_coords;
        highp vec4 _935 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _631 = _371.x < 0.0;
            bool _638 = false;
            if (!_631)
            {
                _638 = _371.x >= 1.0;
            }
            else
            {
                _638 = _631;
            }
            bool _659 = false;
            if (!_638)
            {
                bool _648 = _371.y < 0.0;
                bool _655 = false;
                if (!_648)
                {
                    _655 = _371.y >= 1.0;
                }
                else
                {
                    _655 = _648;
                }
                _659 = _655;
            }
            else
            {
                _659 = _638;
            }
            if (_659)
            {
                _935 = vec4(0.0);
                break;
            }
            highp vec2 _934 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _913 = _371;
                _913.y = 1.0 - _371.y;
                _934 = _913;
            }
            else
            {
                _934 = _371;
            }
            _935 = texture2D(texture_sampler_src, _934);
            break;
        }
        highp vec4 _936 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_935.w == 0.0)
            {
                _936 = vec4(0.0);
                break;
            }
            _936 = vec4(_935.xyz / vec3(_935.w), _935.w);
            break;
        }
        _937 = _936;
    }
    highp vec3 _823 = _937.xyz * 2.0;
    gl_FragData[0] = mix(_349, vec4(mix((-((vec3(1.0) - _823) * _927.xyz)) * (vec3(1.0) - _927.xyz) + _927.xyz, (_823 - vec3(1.0)) * (mix((((_927.xyz * 16.0) - vec3(12.0)) * _927.xyz + vec3(4.0)) * _927.xyz, sqrt(_927.xyz), max(sign(_927.xyz - vec3(0.25)), vec3(0.0))) - _927.xyz) + _927.xyz, max(sign(_937.xyz - vec3(0.5)), vec3(0.0))), 1.0) * _927.w, vec4(_937.w));
}

