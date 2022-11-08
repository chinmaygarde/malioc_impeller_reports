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
    highp vec2 _250 = v_dst_texture_coords;
    highp vec4 _750 = vec4(0.0);
    for (int spvDummy69 = 0; spvDummy69 < 1; spvDummy69++)
    {
        bool _357 = _250.x < 0.0;
        bool _364 = false;
        if (!_357)
        {
            _364 = _250.x >= 1.0;
        }
        else
        {
            _364 = _357;
        }
        bool _385 = false;
        if (!_364)
        {
            bool _374 = _250.y < 0.0;
            bool _381 = false;
            if (!_374)
            {
                _381 = _250.y >= 1.0;
            }
            else
            {
                _381 = _374;
            }
            _385 = _381;
        }
        else
        {
            _385 = _364;
        }
        if (_385)
        {
            _750 = vec4(0.0);
            break;
        }
        highp vec2 _749 = vec2(0.0);
        if (blend_info.dst_y_coord_scale < 0.0)
        {
            highp vec2 _725 = _250;
            _725.y = 1.0 - _250.y;
            _749 = _725;
        }
        else
        {
            _749 = _250;
        }
        _750 = texture2D(texture_sampler_dst, _749);
        break;
    }
    highp vec4 _260 = _750 * blend_info.dst_input_alpha;
    highp vec4 _751 = vec4(0.0);
    for (int spvDummy188 = 0; spvDummy188 < 1; spvDummy188++)
    {
        highp float _498 = _260.w;
        if (_498 == 0.0)
        {
            _751 = vec4(0.0);
            break;
        }
        _751 = vec4(_260.xyz / vec3(_498), _498);
        break;
    }
    highp vec4 _761 = vec4(0.0);
    if (blend_info.color_factor > 0.0)
    {
        _761 = blend_info.color;
    }
    else
    {
        highp vec2 _282 = v_src_texture_coords;
        highp vec4 _759 = vec4(0.0);
        for (int spvDummy235 = 0; spvDummy235 < 1; spvDummy235++)
        {
            bool _542 = _282.x < 0.0;
            bool _549 = false;
            if (!_542)
            {
                _549 = _282.x >= 1.0;
            }
            else
            {
                _549 = _542;
            }
            bool _570 = false;
            if (!_549)
            {
                bool _559 = _282.y < 0.0;
                bool _566 = false;
                if (!_559)
                {
                    _566 = _282.y >= 1.0;
                }
                else
                {
                    _566 = _559;
                }
                _570 = _566;
            }
            else
            {
                _570 = _549;
            }
            if (_570)
            {
                _759 = vec4(0.0);
                break;
            }
            highp vec2 _758 = vec2(0.0);
            if (blend_info.src_y_coord_scale < 0.0)
            {
                highp vec2 _737 = _282;
                _737.y = 1.0 - _282.y;
                _758 = _737;
            }
            else
            {
                _758 = _282;
            }
            _759 = texture2D(texture_sampler_src, _758);
            break;
        }
        highp vec4 _760 = vec4(0.0);
        for (int spvDummy351 = 0; spvDummy351 < 1; spvDummy351++)
        {
            if (_759.w == 0.0)
            {
                _760 = vec4(0.0);
                break;
            }
            _760 = vec4(_759.xyz / vec3(_759.w), _759.w);
            break;
        }
        _761 = _760;
    }
    gl_FragData[0] = mix(_260, vec4((-_751.xyz) * _761.xyz + (_751.xyz + _761.xyz), 1.0) * _751.w, vec4(_761.w));
}

