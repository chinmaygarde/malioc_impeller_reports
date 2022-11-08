#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp float texture_sampler_y_coord_scale;
    highp float alpha_mask_sampler_y_coord_scale;
    highp vec2 texture_size;
    highp vec2 blur_direction;
    highp float tile_mode;
    highp float blur_sigma;
    highp float blur_radius;
    highp float src_factor;
    highp float inner_blur_factor;
    highp float outer_blur_factor;
};

uniform FragInfo frag_info;

uniform highp sampler2D texture_sampler;
uniform highp sampler2D alpha_mask_sampler;

varying highp vec2 v_texture_coords;
varying highp vec2 v_src_texture_coords;

void main()
{
    highp vec2 _222 = frag_info.blur_direction / frag_info.texture_size;
    highp float _228 = -frag_info.blur_radius;
    highp vec4 _691 = vec4(0.0);
    highp float _692 = 0.0;
    _692 = 0.0;
    _691 = vec4(0.0);
    highp float _248 = 0.0;
    highp vec4 _270 = vec4(0.0);
    for (highp float _690 = _228; _690 <= frag_info.blur_radius; _692 = _248, _691 = _270, _690 += 1.0)
    {
        highp float _347 = exp((((-0.5) * _690) * _690) / (frag_info.blur_sigma * frag_info.blur_sigma)) / (2.5066282749176025390625 * frag_info.blur_sigma);
        _248 = _692 + _347;
        highp vec2 _257 = v_texture_coords + (_222 * _690);
        highp vec4 _708 = vec4(0.0);
        for (int spvDummy144 = 0; spvDummy144 < 1; spvDummy144++)
        {
            bool _370 = frag_info.tile_mode == 3.0;
            bool _383 = false;
            if (_370)
            {
                highp float _373 = _257.x;
                bool _374 = _373 < 0.0;
                bool _381 = false;
                if (!_374)
                {
                    _381 = _373 >= 1.0;
                }
                else
                {
                    _381 = _374;
                }
                _383 = _381;
            }
            else
            {
                _383 = _370;
            }
            bool _402 = false;
            if (!_383)
            {
                bool _400 = false;
                if (_370)
                {
                    highp float _390 = _257.y;
                    bool _391 = _390 < 0.0;
                    bool _398 = false;
                    if (!_391)
                    {
                        _398 = _390 >= 1.0;
                    }
                    else
                    {
                        _398 = _391;
                    }
                    _400 = _398;
                }
                else
                {
                    _400 = _370;
                }
                _402 = _400;
            }
            else
            {
                _402 = _383;
            }
            if (_402)
            {
                _708 = vec4(0.0);
                break;
            }
            highp float _420 = _257.x;
            bool _433 = frag_info.tile_mode == 0.0;
            highp float _701 = 0.0;
            if (_433)
            {
                _701 = clamp(_420, 0.0, 1.0);
            }
            else
            {
                highp float _702 = 0.0;
                if (frag_info.tile_mode == 1.0)
                {
                    _702 = fract(_420);
                }
                else
                {
                    highp float _703 = 0.0;
                    if (frag_info.tile_mode == 2.0)
                    {
                        highp float _448 = _420 - 1.0;
                        _703 = abs(((-2.0) * floor(_448 * 0.5) + _448) - 1.0);
                    }
                    else
                    {
                        _703 = _420;
                    }
                    _702 = _703;
                }
                _701 = _702;
            }
            highp float _424 = _257.y;
            highp float _704 = 0.0;
            if (_433)
            {
                _704 = clamp(_424, 0.0, 1.0);
            }
            else
            {
                highp float _705 = 0.0;
                if (frag_info.tile_mode == 1.0)
                {
                    _705 = fract(_424);
                }
                else
                {
                    highp float _706 = 0.0;
                    if (frag_info.tile_mode == 2.0)
                    {
                        highp float _482 = _424 - 1.0;
                        _706 = abs(((-2.0) * floor(_482 * 0.5) + _482) - 1.0);
                    }
                    else
                    {
                        _706 = _424;
                    }
                    _705 = _706;
                }
                _704 = _705;
            }
            highp vec2 _427 = vec2(_701, _704);
            highp vec2 _707 = vec2(0.0);
            if (frag_info.texture_sampler_y_coord_scale < 0.0)
            {
                highp vec2 _678 = _427;
                _678.y = 1.0 - _704;
                _707 = _678;
            }
            else
            {
                _707 = _427;
            }
            _708 = texture2D(texture_sampler, _707);
            break;
        }
        _270 = _691 + (_708 * _347);
    }
    highp vec4 _700 = vec4(0.0);
    for (int spvDummy443 = 0; spvDummy443 < 1; spvDummy443++)
    {
        bool _531 = frag_info.tile_mode == 3.0;
        bool _544 = false;
        if (_531)
        {
            bool _535 = v_src_texture_coords.x < 0.0;
            bool _542 = false;
            if (!_535)
            {
                _542 = v_src_texture_coords.x >= 1.0;
            }
            else
            {
                _542 = _535;
            }
            _544 = _542;
        }
        else
        {
            _544 = _531;
        }
        bool _563 = false;
        if (!_544)
        {
            bool _561 = false;
            if (_531)
            {
                bool _552 = v_src_texture_coords.y < 0.0;
                bool _559 = false;
                if (!_552)
                {
                    _559 = v_src_texture_coords.y >= 1.0;
                }
                else
                {
                    _559 = _552;
                }
                _561 = _559;
            }
            else
            {
                _561 = _531;
            }
            _563 = _561;
        }
        else
        {
            _563 = _544;
        }
        if (_563)
        {
            _700 = vec4(0.0);
            break;
        }
        bool _594 = frag_info.tile_mode == 0.0;
        highp float _693 = 0.0;
        if (_594)
        {
            _693 = clamp(v_src_texture_coords.x, 0.0, 1.0);
        }
        else
        {
            highp float _694 = 0.0;
            if (frag_info.tile_mode == 1.0)
            {
                _694 = fract(v_src_texture_coords.x);
            }
            else
            {
                highp float _695 = 0.0;
                if (frag_info.tile_mode == 2.0)
                {
                    highp float _609 = v_src_texture_coords.x - 1.0;
                    _695 = abs(((-2.0) * floor(_609 * 0.5) + _609) - 1.0);
                }
                else
                {
                    _695 = v_src_texture_coords.x;
                }
                _694 = _695;
            }
            _693 = _694;
        }
        highp float _696 = 0.0;
        if (_594)
        {
            _696 = clamp(v_src_texture_coords.y, 0.0, 1.0);
        }
        else
        {
            highp float _697 = 0.0;
            if (frag_info.tile_mode == 1.0)
            {
                _697 = fract(v_src_texture_coords.y);
            }
            else
            {
                highp float _698 = 0.0;
                if (frag_info.tile_mode == 2.0)
                {
                    highp float _643 = v_src_texture_coords.y - 1.0;
                    _698 = abs(((-2.0) * floor(_643 * 0.5) + _643) - 1.0);
                }
                else
                {
                    _698 = v_src_texture_coords.y;
                }
                _697 = _698;
            }
            _696 = _697;
        }
        highp vec2 _588 = vec2(_693, _696);
        highp vec2 _699 = vec2(0.0);
        if (frag_info.alpha_mask_sampler_y_coord_scale < 0.0)
        {
            highp vec2 _687 = _588;
            _687.y = 1.0 - _696;
            _699 = _687;
        }
        else
        {
            _699 = _588;
        }
        _700 = texture2D(alpha_mask_sampler, _699);
        break;
    }
    gl_FragData[0] = ((_691 / vec4(_692)) * (frag_info.inner_blur_factor * float(_700.w > 0.0) + (frag_info.outer_blur_factor * float(_700.w == 0.0)))) + (_700 * frag_info.src_factor);
}

