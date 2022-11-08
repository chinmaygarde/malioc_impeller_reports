#version 100
precision mediump float;
precision highp int;

struct GradientInfo
{
    highp vec2 center;
    highp float bias;
    highp float scale;
    highp float tile_mode;
    highp float texture_sampler_y_coord_scale;
    highp float alpha;
    highp vec2 half_texel;
};

uniform GradientInfo gradient_info;

uniform highp sampler2D texture_sampler;

varying highp vec2 v_position;

void main()
{
    highp vec2 _234 = v_position - gradient_info.center;
    highp float _252 = (atan(-_234.y, -_234.x) * 0.15915493667125701904296875 + 0.5) + gradient_info.bias;
    highp float _256 = _252 * gradient_info.scale;
    highp vec4 _524 = vec4(0.0);
    for (int spvDummy80 = 0; spvDummy80 < 1; spvDummy80++)
    {
        bool _331 = gradient_info.tile_mode == 3.0;
        bool _344 = false;
        if (_331)
        {
            bool _335 = _256 < 0.0;
            bool _342 = false;
            if (!_335)
            {
                _342 = _256 >= 1.0;
            }
            else
            {
                _342 = _335;
            }
            _344 = _342;
        }
        else
        {
            _344 = _331;
        }
        bool _363 = false;
        if (!_344)
        {
            _363 = _331 ? false : _331;
        }
        else
        {
            _363 = _344;
        }
        if (_363)
        {
            _524 = vec4(0.0);
            break;
        }
        bool _395 = gradient_info.tile_mode == 0.0;
        highp float _517 = 0.0;
        if (_395)
        {
            _517 = clamp(_256, 0.0, 1.0);
        }
        else
        {
            highp float _518 = 0.0;
            if (gradient_info.tile_mode == 1.0)
            {
                _518 = fract(_256);
            }
            else
            {
                highp float _519 = 0.0;
                if (gradient_info.tile_mode == 2.0)
                {
                    highp float _410 = _252 * gradient_info.scale + (-1.0);
                    _519 = abs(((-2.0) * floor(_410 * 0.5) + _410) - 1.0);
                }
                else
                {
                    _519 = _256;
                }
                _518 = _519;
            }
            _517 = _518;
        }
        highp float _520 = 0.0;
        if (_395)
        {
            _520 = 0.5;
        }
        else
        {
            highp float _521 = 0.0;
            if (gradient_info.tile_mode == 1.0)
            {
                highp float _438 = fract(0.5);
                _521 = _438;
            }
            else
            {
                highp float _522 = 0.0;
                if (gradient_info.tile_mode == 2.0)
                {
                    highp float _448 = floor(-0.25);
                    _522 = abs(((-2.0) * _448 + (-0.5)) - 1.0);
                }
                else
                {
                    _522 = 0.5;
                }
                _521 = _522;
            }
            _520 = _521;
        }
        highp float _478 = mix(gradient_info.half_texel.y, 1.0 - gradient_info.half_texel.y, _520);
        highp vec2 _532 = vec2(mix(gradient_info.half_texel.x, 1.0 - gradient_info.half_texel.x, _517), _478);
        highp vec2 _523 = vec2(0.0);
        if (gradient_info.texture_sampler_y_coord_scale < 0.0)
        {
            highp vec2 _516 = _532;
            _516.y = 1.0 - _478;
            _523 = _516;
        }
        else
        {
            _523 = _532;
        }
        _524 = texture2D(texture_sampler, _523);
        break;
    }
    gl_FragData[0] = _524;
    gl_FragData[0] = vec4(gl_FragData[0].xyz * gl_FragData[0].w, gl_FragData[0].w) * gradient_info.alpha;
}

