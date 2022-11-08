#version 100
precision mediump float;
precision highp int;

struct GradientInfo
{
    highp vec2 center;
    highp float radius;
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
    highp float _242 = length(v_position - gradient_info.center) / gradient_info.radius;
    highp vec4 _509 = vec4(0.0);
    for (int spvDummy68 = 0; spvDummy68 < 1; spvDummy68++)
    {
        bool _318 = gradient_info.tile_mode == 3.0;
        bool _331 = false;
        if (_318)
        {
            bool _322 = _242 < 0.0;
            bool _329 = false;
            if (!_322)
            {
                _329 = _242 >= 1.0;
            }
            else
            {
                _329 = _322;
            }
            _331 = _329;
        }
        else
        {
            _331 = _318;
        }
        bool _350 = false;
        if (!_331)
        {
            _350 = _318 ? false : _318;
        }
        else
        {
            _350 = _331;
        }
        if (_350)
        {
            _509 = vec4(0.0);
            break;
        }
        bool _382 = gradient_info.tile_mode == 0.0;
        highp float _502 = 0.0;
        if (_382)
        {
            _502 = clamp(_242, 0.0, 1.0);
        }
        else
        {
            highp float _503 = 0.0;
            if (gradient_info.tile_mode == 1.0)
            {
                _503 = fract(_242);
            }
            else
            {
                highp float _504 = 0.0;
                if (gradient_info.tile_mode == 2.0)
                {
                    highp float _397 = _242 - 1.0;
                    _504 = abs(((-2.0) * floor(_397 * 0.5) + _397) - 1.0);
                }
                else
                {
                    _504 = _242;
                }
                _503 = _504;
            }
            _502 = _503;
        }
        highp float _505 = 0.0;
        if (_382)
        {
            _505 = 0.5;
        }
        else
        {
            highp float _506 = 0.0;
            if (gradient_info.tile_mode == 1.0)
            {
                highp float _425 = fract(0.5);
                _506 = _425;
            }
            else
            {
                highp float _507 = 0.0;
                if (gradient_info.tile_mode == 2.0)
                {
                    highp float _435 = floor(-0.25);
                    _507 = abs(((-2.0) * _435 + (-0.5)) - 1.0);
                }
                else
                {
                    _507 = 0.5;
                }
                _506 = _507;
            }
            _505 = _506;
        }
        highp float _465 = mix(gradient_info.half_texel.y, 1.0 - gradient_info.half_texel.y, _505);
        highp vec2 _516 = vec2(mix(gradient_info.half_texel.x, 1.0 - gradient_info.half_texel.x, _502), _465);
        highp vec2 _508 = vec2(0.0);
        if (gradient_info.texture_sampler_y_coord_scale < 0.0)
        {
            highp vec2 _501 = _516;
            _501.y = 1.0 - _465;
            _508 = _501;
        }
        else
        {
            _508 = _516;
        }
        _509 = texture2D(texture_sampler, _508);
        break;
    }
    gl_FragData[0] = _509;
    gl_FragData[0] = vec4(gl_FragData[0].xyz * gl_FragData[0].w, gl_FragData[0].w) * gradient_info.alpha;
}

