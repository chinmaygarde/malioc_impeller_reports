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
    highp vec2 _251 = v_dst_texture_coords;
    highp vec4 _752 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _358 = _251.x < 0.0;
        bool _365 = false;
        if (!_358)
        {
            _365 = _251.x >= 1.0;
        }
        else
        {
            _365 = _358;
        }
        bool _386 = false;
        if (!_365)
        {
            bool _375 = _251.y < 0.0;
            bool _382 = false;
            if (!_375)
            {
                _382 = _251.y >= 1.0;
            }
            else
            {
                _382 = _375;
            }
            _386 = _382;
        }
        else
        {
            _386 = _365;
        }
        if (_386)
        {
            _752 = vec4(0.0);
            break;
        }
        highp vec2 _751 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _727 = _251;
            _727.y = 1.0 - _251.y;
            _751 = _727;
        }
        else
        {
            _751 = _251;
        }
        _752 = texture2D(texture_sampler_dst, _751);
        break;
    }
    highp vec4 _261 = _752 * blend_info.dst_input_alpha;
    highp vec4 _753 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _499 = _261.w;
        if (_499 == 0.0)
        {
            _753 = vec4(0.0);
            break;
        }
        _753 = vec4(_261.xyz / vec3(_499), _499);
        break;
    }
    highp vec4 _763 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _763 = blend_info.color;
    }
    else
    {
        highp vec2 _283 = v_src_texture_coords;
        highp vec4 _761 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _543 = _283.x < 0.0;
            bool _550 = false;
            if (!_543)
            {
                _550 = _283.x >= 1.0;
            }
            else
            {
                _550 = _543;
            }
            bool _571 = false;
            if (!_550)
            {
                bool _560 = _283.y < 0.0;
                bool _567 = false;
                if (!_560)
                {
                    _567 = _283.y >= 1.0;
                }
                else
                {
                    _567 = _560;
                }
                _571 = _567;
            }
            else
            {
                _571 = _550;
            }
            if (_571)
            {
                _761 = vec4(0.0);
                break;
            }
            highp vec2 _760 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _739 = _283;
                _739.y = 1.0 - _283.y;
                _760 = _739;
            }
            else
            {
                _760 = _283;
            }
            _761 = texture2D(texture_sampler_src, _760);
            break;
        }
        highp vec4 _762 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_761.w == 0.0)
            {
                _762 = vec4(0.0);
                break;
            }
            _762 = vec4(_761.xyz / vec3(_761.w), _761.w);
            break;
        }
        _763 = _762;
    }
    gl_FragData[0] = mix(_261, vec4((-(_753.xyz * 2.0)) * _763.xyz + (_753.xyz + _763.xyz), 1.0) * _753.w, vec4(_763.w));
}

