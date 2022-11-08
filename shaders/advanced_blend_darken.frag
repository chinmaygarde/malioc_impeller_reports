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
    highp vec2 _246 = v_dst_texture_coords;
    highp vec4 _742 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _353 = _246.x < 0.0;
        bool _360 = false;
        if (!_353)
        {
            _360 = _246.x >= 1.0;
        }
        else
        {
            _360 = _353;
        }
        bool _381 = false;
        if (!_360)
        {
            bool _370 = _246.y < 0.0;
            bool _377 = false;
            if (!_370)
            {
                _377 = _246.y >= 1.0;
            }
            else
            {
                _377 = _370;
            }
            _381 = _377;
        }
        else
        {
            _381 = _360;
        }
        if (_381)
        {
            _742 = vec4(0.0);
            break;
        }
        highp vec2 _741 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _717 = _246;
            _717.y = 1.0 - _246.y;
            _741 = _717;
        }
        else
        {
            _741 = _246;
        }
        _742 = texture2D(texture_sampler_dst, _741);
        break;
    }
    highp vec4 _256 = _742 * blend_info.dst_input_alpha;
    highp vec4 _743 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _494 = _256.w;
        if (_494 == 0.0)
        {
            _743 = vec4(0.0);
            break;
        }
        _743 = vec4(_256.xyz / vec3(_494), _494);
        break;
    }
    highp vec4 _753 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _753 = blend_info.color;
    }
    else
    {
        highp vec2 _278 = v_src_texture_coords;
        highp vec4 _751 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _538 = _278.x < 0.0;
            bool _545 = false;
            if (!_538)
            {
                _545 = _278.x >= 1.0;
            }
            else
            {
                _545 = _538;
            }
            bool _566 = false;
            if (!_545)
            {
                bool _555 = _278.y < 0.0;
                bool _562 = false;
                if (!_555)
                {
                    _562 = _278.y >= 1.0;
                }
                else
                {
                    _562 = _555;
                }
                _566 = _562;
            }
            else
            {
                _566 = _545;
            }
            if (_566)
            {
                _751 = vec4(0.0);
                break;
            }
            highp vec2 _750 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _729 = _278;
                _729.y = 1.0 - _278.y;
                _750 = _729;
            }
            else
            {
                _750 = _278;
            }
            _751 = texture2D(texture_sampler_src, _750);
            break;
        }
        highp vec4 _752 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_751.w == 0.0)
            {
                _752 = vec4(0.0);
                break;
            }
            _752 = vec4(_751.xyz / vec3(_751.w), _751.w);
            break;
        }
        _753 = _752;
    }
    gl_FragData[0] = mix(_256, vec4(min(_743.xyz, _753.xyz), 1.0) * _743.w, vec4(_753.w));
}

