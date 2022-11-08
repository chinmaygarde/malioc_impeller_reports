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
    highp vec2 _431 = v_dst_texture_coords;
    highp vec4 _1138 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _537 = _431.x < 0.0;
        bool _544 = false;
        if (!_537)
        {
            _544 = _431.x >= 1.0;
        }
        else
        {
            _544 = _537;
        }
        bool _565 = false;
        if (!_544)
        {
            bool _554 = _431.y < 0.0;
            bool _561 = false;
            if (!_554)
            {
                _561 = _431.y >= 1.0;
            }
            else
            {
                _561 = _554;
            }
            _565 = _561;
        }
        else
        {
            _565 = _544;
        }
        if (_565)
        {
            _1138 = vec4(0.0);
            break;
        }
        highp vec2 _1137 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _1086 = _431;
            _1086.y = 1.0 - _431.y;
            _1137 = _1086;
        }
        else
        {
            _1137 = _431;
        }
        _1138 = texture2D(texture_sampler_dst, _1137);
        break;
    }
    highp vec4 _441 = _1138 * blend_info.dst_input_alpha;
    highp vec4 _1139 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _678 = _441.w;
        if (_678 == 0.0)
        {
            _1139 = vec4(0.0);
            break;
        }
        _1139 = vec4(_441.xyz / vec3(_678), _678);
        break;
    }
    highp vec4 _1149 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _1149 = blend_info.color;
    }
    else
    {
        highp vec2 _463 = v_src_texture_coords;
        highp vec4 _1147 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _722 = _463.x < 0.0;
            bool _729 = false;
            if (!_722)
            {
                _729 = _463.x >= 1.0;
            }
            else
            {
                _729 = _722;
            }
            bool _750 = false;
            if (!_729)
            {
                bool _739 = _463.y < 0.0;
                bool _746 = false;
                if (!_739)
                {
                    _746 = _463.y >= 1.0;
                }
                else
                {
                    _746 = _739;
                }
                _750 = _746;
            }
            else
            {
                _750 = _729;
            }
            if (_750)
            {
                _1147 = vec4(0.0);
                break;
            }
            highp vec2 _1146 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _1098 = _463;
                _1098.y = 1.0 - _463.y;
                _1146 = _1098;
            }
            else
            {
                _1146 = _463;
            }
            _1147 = texture2D(texture_sampler_src, _1146);
            break;
        }
        highp vec4 _1148 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_1147.w == 0.0)
            {
                _1148 = vec4(0.0);
                break;
            }
            _1148 = vec4(_1147.xyz / vec3(_1147.w), _1147.w);
            break;
        }
        _1149 = _1148;
    }
    highp float _934 = min(min(_1139.x, _1139.y), _1139.z);
    highp float _942 = max(max(_1139.x, _1139.y), _1139.z);
    highp vec3 _1150 = vec3(0.0);
    if (_934 < _942)
    {
        _1150 = ((_1139.xyz - vec3(_934)) * (max(max(_1149.x, _1149.y), _1149.z) - min(min(_1149.x, _1149.y), _1149.z))) / vec3(_942 - _934);
    }
    else
    {
        _1150 = vec3(0.0);
    }
    highp vec3 _986 = _1150 + vec3((_1139.z * 0.10999999940395355224609375 + (_1139.x * 0.300000011920928955078125 + (_1139.y * 0.589999973773956298828125))) - (_1150.z * 0.10999999940395355224609375 + (_1150.x * 0.300000011920928955078125 + (_1150.y * 0.589999973773956298828125))));
    highp float _1068 = _986.x;
    highp float _1071 = _986.y;
    highp float _1075 = _986.z;
    highp float _1077 = _1075 * 0.10999999940395355224609375 + (_1068 * 0.300000011920928955078125 + (_1071 * 0.589999973773956298828125));
    highp float _1016 = min(min(_1068, _1071), _1075);
    highp float _1024 = max(max(_1068, _1071), _1075);
    highp vec3 _1151 = vec3(0.0);
    if (_1016 < 0.0)
    {
        highp vec3 _1031 = vec3(_1077);
        _1151 = _1031 + (((_986 - _1031) * _1077) / vec3((_1077 - _1016) + 9.9999999747524270787835121154785e-07));
    }
    else
    {
        _1151 = _986;
    }
    highp vec3 _1152 = vec3(0.0);
    if (_1024 > 1.0)
    {
        highp vec3 _1050 = vec3(_1077);
        _1152 = _1050 + (((_1151 - _1050) * (1.0 - _1077)) / vec3((_1024 - _1077) + 9.9999999747524270787835121154785e-07));
    }
    else
    {
        _1152 = _1151;
    }
    gl_FragData[0] = mix(_441, vec4(_1152, 1.0) * _1139.w, vec4(_1149.w));
}

