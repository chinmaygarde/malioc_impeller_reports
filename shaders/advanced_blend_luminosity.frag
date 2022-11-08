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
    highp vec2 _359 = v_dst_texture_coords;
    highp vec4 _990 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _465 = _359.x < 0.0;
        bool _472 = false;
        if (!_465)
        {
            _472 = _359.x >= 1.0;
        }
        else
        {
            _472 = _465;
        }
        bool _493 = false;
        if (!_472)
        {
            bool _482 = _359.y < 0.0;
            bool _489 = false;
            if (!_482)
            {
                _489 = _359.y >= 1.0;
            }
            else
            {
                _489 = _482;
            }
            _493 = _489;
        }
        else
        {
            _493 = _472;
        }
        if (_493)
        {
            _990 = vec4(0.0);
            break;
        }
        highp vec2 _989 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _950 = _359;
            _950.y = 1.0 - _359.y;
            _989 = _950;
        }
        else
        {
            _989 = _359;
        }
        _990 = texture2D(texture_sampler_dst, _989);
        break;
    }
    highp vec4 _369 = _990 * blend_info.dst_input_alpha;
    highp vec4 _991 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _606 = _369.w;
        if (_606 == 0.0)
        {
            _991 = vec4(0.0);
            break;
        }
        _991 = vec4(_369.xyz / vec3(_606), _606);
        break;
    }
    highp vec4 _1001 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _1001 = blend_info.color;
    }
    else
    {
        highp vec2 _391 = v_src_texture_coords;
        highp vec4 _999 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _650 = _391.x < 0.0;
            bool _657 = false;
            if (!_650)
            {
                _657 = _391.x >= 1.0;
            }
            else
            {
                _657 = _650;
            }
            bool _678 = false;
            if (!_657)
            {
                bool _667 = _391.y < 0.0;
                bool _674 = false;
                if (!_667)
                {
                    _674 = _391.y >= 1.0;
                }
                else
                {
                    _674 = _667;
                }
                _678 = _674;
            }
            else
            {
                _678 = _657;
            }
            if (_678)
            {
                _999 = vec4(0.0);
                break;
            }
            highp vec2 _998 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _962 = _391;
                _962.y = 1.0 - _391.y;
                _998 = _962;
            }
            else
            {
                _998 = _391;
            }
            _999 = texture2D(texture_sampler_src, _998);
            break;
        }
        highp vec4 _1000 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_999.w == 0.0)
            {
                _1000 = vec4(0.0);
                break;
            }
            _1000 = vec4(_999.xyz / vec3(_999.w), _999.w);
            break;
        }
        _1001 = _1000;
    }
    highp vec3 _850 = _991.xyz + vec3((_1001.z * 0.10999999940395355224609375 + (_1001.x * 0.300000011920928955078125 + (_1001.y * 0.589999973773956298828125))) - (_991.z * 0.10999999940395355224609375 + (_991.x * 0.300000011920928955078125 + (_991.y * 0.589999973773956298828125))));
    highp float _932 = _850.x;
    highp float _935 = _850.y;
    highp float _939 = _850.z;
    highp float _941 = _939 * 0.10999999940395355224609375 + (_932 * 0.300000011920928955078125 + (_935 * 0.589999973773956298828125));
    highp float _880 = min(min(_932, _935), _939);
    highp float _888 = max(max(_932, _935), _939);
    highp vec3 _1002 = vec3(0.0);
    if (_880 < 0.0)
    {
        highp vec3 _895 = vec3(_941);
        _1002 = _895 + (((_850 - _895) * _941) / vec3((_941 - _880) + 9.9999999747524270787835121154785e-07));
    }
    else
    {
        _1002 = _850;
    }
    highp vec3 _1003 = vec3(0.0);
    if (_888 > 1.0)
    {
        highp vec3 _914 = vec3(_941);
        _1003 = _914 + (((_1002 - _914) * (1.0 - _941)) / vec3((_888 - _941) + 9.9999999747524270787835121154785e-07));
    }
    else
    {
        _1003 = _1002;
    }
    gl_FragData[0] = mix(_369, vec4(_1003, 1.0) * _991.w, vec4(_1001.w));
}

