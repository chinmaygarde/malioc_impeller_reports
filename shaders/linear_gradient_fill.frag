#version 100
precision mediump float;
precision highp int;

struct GradientInfo
{
    highp vec2 start_point;
    highp vec2 end_point;
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
    highp vec2 _234 = gradient_info.end_point - gradient_info.start_point;
    highp float _235 = length(_234);
    highp float _254 = dot(v_position - gradient_info.start_point, _234) / (_235 * _235);
    highp vec4 _522 = vec4(0.0);
    for (int spvDummy74 = 0; spvDummy74 < 1; spvDummy74++)
    {
        bool _331 = gradient_info.tile_mode == 3.0;
        bool _344 = false;
        if (_331)
        {
            bool _335 = _254 < 0.0;
            bool _342 = false;
            if (!_335)
            {
                _342 = _254 >= 1.0;
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
            _522 = vec4(0.0);
            break;
        }
        bool _395 = gradient_info.tile_mode == 0.0;
        highp float _515 = 0.0;
        if (_395)
        {
            _515 = clamp(_254, 0.0, 1.0);
        }
        else
        {
            highp float _516 = 0.0;
            if (gradient_info.tile_mode == 1.0)
            {
                _516 = fract(_254);
            }
            else
            {
                highp float _517 = 0.0;
                if (gradient_info.tile_mode == 2.0)
                {
                    highp float _410 = _254 - 1.0;
                    _517 = abs(((-2.0) * floor(_410 * 0.5) + _410) - 1.0);
                }
                else
                {
                    _517 = _254;
                }
                _516 = _517;
            }
            _515 = _516;
        }
        highp float _518 = 0.0;
        if (_395)
        {
            _518 = 0.5;
        }
        else
        {
            highp float _519 = 0.0;
            if (gradient_info.tile_mode == 1.0)
            {
                highp float _438 = fract(0.5);
                _519 = _438;
            }
            else
            {
                highp float _520 = 0.0;
                if (gradient_info.tile_mode == 2.0)
                {
                    highp float _448 = floor(-0.25);
                    _520 = abs(((-2.0) * _448 + (-0.5)) - 1.0);
                }
                else
                {
                    _520 = 0.5;
                }
                _519 = _520;
            }
            _518 = _519;
        }
        highp float _478 = mix(gradient_info.half_texel.y, 1.0 - gradient_info.half_texel.y, _518);
        highp vec2 _529 = vec2(mix(gradient_info.half_texel.x, 1.0 - gradient_info.half_texel.x, _515), _478);
        highp vec2 _521 = vec2(0.0);
        if (gradient_info.texture_sampler_y_coord_scale < 0.0)
        {
            highp vec2 _514 = _529;
            _514.y = 1.0 - _478;
            _521 = _514;
        }
        else
        {
            _521 = _529;
        }
        _522 = texture2D(texture_sampler, _521);
        break;
    }
    gl_FragData[0] = _522;
    gl_FragData[0] = vec4(gl_FragData[0].xyz * gl_FragData[0].w, gl_FragData[0].w) * gradient_info.alpha;
}

