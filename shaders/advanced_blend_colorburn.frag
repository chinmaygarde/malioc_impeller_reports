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
    highp vec2 _295 = v_dst_texture_coords;
    highp vec4 _854 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _401 = _295.x < 0.0;
        bool _408 = false;
        if (!_401)
        {
            _408 = _295.x >= 1.0;
        }
        else
        {
            _408 = _401;
        }
        bool _429 = false;
        if (!_408)
        {
            bool _418 = _295.y < 0.0;
            bool _425 = false;
            if (!_418)
            {
                _425 = _295.y >= 1.0;
            }
            else
            {
                _425 = _418;
            }
            _429 = _425;
        }
        else
        {
            _429 = _408;
        }
        if (_429)
        {
            _854 = vec4(0.0);
            break;
        }
        highp vec2 _853 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _811 = _295;
            _811.y = 1.0 - _295.y;
            _853 = _811;
        }
        else
        {
            _853 = _295;
        }
        _854 = texture2D(texture_sampler_dst, _853);
        break;
    }
    highp vec4 _305 = _854 * blend_info.dst_input_alpha;
    highp vec4 _855 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _542 = _305.w;
        if (_542 == 0.0)
        {
            _855 = vec4(0.0);
            break;
        }
        _855 = vec4(_305.xyz / vec3(_542), _542);
        break;
    }
    highp vec4 _865 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _865 = blend_info.color;
    }
    else
    {
        highp vec2 _327 = v_src_texture_coords;
        highp vec4 _863 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _586 = _327.x < 0.0;
            bool _593 = false;
            if (!_586)
            {
                _593 = _327.x >= 1.0;
            }
            else
            {
                _593 = _586;
            }
            bool _614 = false;
            if (!_593)
            {
                bool _603 = _327.y < 0.0;
                bool _610 = false;
                if (!_603)
                {
                    _610 = _327.y >= 1.0;
                }
                else
                {
                    _610 = _603;
                }
                _614 = _610;
            }
            else
            {
                _614 = _593;
            }
            if (_614)
            {
                _863 = vec4(0.0);
                break;
            }
            highp vec2 _862 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _823 = _327;
                _823.y = 1.0 - _327.y;
                _862 = _823;
            }
            else
            {
                _862 = _327;
            }
            _863 = texture2D(texture_sampler_src, _862);
            break;
        }
        highp vec4 _864 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_863.w == 0.0)
            {
                _864 = vec4(0.0);
                break;
            }
            _864 = vec4(_863.xyz / vec3(_863.w), _863.w);
            break;
        }
        _865 = _864;
    }
    highp vec3 _762 = vec3(1.0) - min(vec3(1.0), (vec3(1.0) - _855.xyz) / _865.xyz);
    highp vec3 _866 = vec3(0.0);
    if ((1.0 - _855.x) < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _829 = _762;
        _829.x = 1.0;
        _866 = _829;
    }
    else
    {
        _866 = _762;
    }
    highp vec3 _867 = vec3(0.0);
    if ((1.0 - _855.y) < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _832 = _866;
        _832.y = 1.0;
        _867 = _832;
    }
    else
    {
        _867 = _866;
    }
    highp vec3 _868 = vec3(0.0);
    if ((1.0 - _855.z) < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _835 = _867;
        _835.z = 1.0;
        _868 = _835;
    }
    else
    {
        _868 = _867;
    }
    highp vec3 _869 = vec3(0.0);
    if (_865.x < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _838 = _868;
        _838.x = 0.0;
        _869 = _838;
    }
    else
    {
        _869 = _868;
    }
    highp vec3 _870 = vec3(0.0);
    if (_865.y < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _841 = _869;
        _841.y = 0.0;
        _870 = _841;
    }
    else
    {
        _870 = _869;
    }
    highp vec3 _871 = vec3(0.0);
    if (_865.z < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _844 = _870;
        _844.z = 0.0;
        _871 = _844;
    }
    else
    {
        _871 = _870;
    }
    gl_FragData[0] = mix(_305, vec4(_871, 1.0) * _855.w, vec4(_865.w));
}

