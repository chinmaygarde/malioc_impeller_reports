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
    highp vec2 _293 = v_dst_texture_coords;
    highp vec4 _850 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _399 = _293.x < 0.0;
        bool _406 = false;
        if (!_399)
        {
            _406 = _293.x >= 1.0;
        }
        else
        {
            _406 = _399;
        }
        bool _427 = false;
        if (!_406)
        {
            bool _416 = _293.y < 0.0;
            bool _423 = false;
            if (!_416)
            {
                _423 = _293.y >= 1.0;
            }
            else
            {
                _423 = _416;
            }
            _427 = _423;
        }
        else
        {
            _427 = _406;
        }
        if (_427)
        {
            _850 = vec4(0.0);
            break;
        }
        highp vec2 _849 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _807 = _293;
            _807.y = 1.0 - _293.y;
            _849 = _807;
        }
        else
        {
            _849 = _293;
        }
        _850 = texture2D(texture_sampler_dst, _849);
        break;
    }
    highp vec4 _303 = _850 * blend_info.dst_input_alpha;
    highp vec4 _851 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _540 = _303.w;
        if (_540 == 0.0)
        {
            _851 = vec4(0.0);
            break;
        }
        _851 = vec4(_303.xyz / vec3(_540), _540);
        break;
    }
    highp vec4 _861 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _861 = blend_info.color;
    }
    else
    {
        highp vec2 _325 = v_src_texture_coords;
        highp vec4 _859 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _584 = _325.x < 0.0;
            bool _591 = false;
            if (!_584)
            {
                _591 = _325.x >= 1.0;
            }
            else
            {
                _591 = _584;
            }
            bool _612 = false;
            if (!_591)
            {
                bool _601 = _325.y < 0.0;
                bool _608 = false;
                if (!_601)
                {
                    _608 = _325.y >= 1.0;
                }
                else
                {
                    _608 = _601;
                }
                _612 = _608;
            }
            else
            {
                _612 = _591;
            }
            if (_612)
            {
                _859 = vec4(0.0);
                break;
            }
            highp vec2 _858 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _819 = _325;
                _819.y = 1.0 - _325.y;
                _858 = _819;
            }
            else
            {
                _858 = _325;
            }
            _859 = texture2D(texture_sampler_src, _858);
            break;
        }
        highp vec4 _860 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_859.w == 0.0)
            {
                _860 = vec4(0.0);
                break;
            }
            _860 = vec4(_859.xyz / vec3(_859.w), _859.w);
            break;
        }
        _861 = _860;
    }
    highp vec3 _758 = min(vec3(1.0), _851.xyz / (vec3(1.0) - _861.xyz));
    highp vec3 _862 = vec3(0.0);
    if (_851.x < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _825 = _758;
        _825.x = 0.0;
        _862 = _825;
    }
    else
    {
        _862 = _758;
    }
    highp vec3 _863 = vec3(0.0);
    if (_851.y < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _828 = _862;
        _828.y = 0.0;
        _863 = _828;
    }
    else
    {
        _863 = _862;
    }
    highp vec3 _864 = vec3(0.0);
    if (_851.z < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _831 = _863;
        _831.z = 0.0;
        _864 = _831;
    }
    else
    {
        _864 = _863;
    }
    highp vec3 _865 = vec3(0.0);
    if ((1.0 - _861.x) < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _834 = _864;
        _834.x = 1.0;
        _865 = _834;
    }
    else
    {
        _865 = _864;
    }
    highp vec3 _866 = vec3(0.0);
    if ((1.0 - _861.y) < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _837 = _865;
        _837.y = 1.0;
        _866 = _837;
    }
    else
    {
        _866 = _865;
    }
    highp vec3 _867 = vec3(0.0);
    if ((1.0 - _861.z) < 9.9999999747524270787835121154785e-07)
    {
        highp vec3 _840 = _866;
        _840.z = 1.0;
        _867 = _840;
    }
    else
    {
        _867 = _866;
    }
    gl_FragData[0] = mix(_303, vec4(_867, 1.0) * _851.w, vec4(_861.w));
}

