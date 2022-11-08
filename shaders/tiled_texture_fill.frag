#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp float texture_sampler_y_coord_scale;
    highp float x_tile_mode;
    highp float y_tile_mode;
    highp float alpha;
};

uniform FragInfo frag_info;

uniform highp sampler2D texture_sampler;

varying highp vec2 v_texture_coords;

void main()
{
    highp vec4 _374 = vec4(0.0);
    for (int spvDummy53 = 0; spvDummy53 < 1; spvDummy53++)
    {
        bool _219 = frag_info.x_tile_mode == 3.0;
        bool _232 = false;
        if (_219)
        {
            bool _223 = v_texture_coords.x < 0.0;
            bool _230 = false;
            if (!_223)
            {
                _230 = v_texture_coords.x >= 1.0;
            }
            else
            {
                _230 = _223;
            }
            _232 = _230;
        }
        else
        {
            _232 = _219;
        }
        bool _251 = false;
        if (!_232)
        {
            bool _236 = frag_info.y_tile_mode == 3.0;
            bool _249 = false;
            if (_236)
            {
                bool _240 = v_texture_coords.y < 0.0;
                bool _247 = false;
                if (!_240)
                {
                    _247 = v_texture_coords.y >= 1.0;
                }
                else
                {
                    _247 = _240;
                }
                _249 = _247;
            }
            else
            {
                _249 = _236;
            }
            _251 = _249;
        }
        else
        {
            _251 = _232;
        }
        if (_251)
        {
            _374 = vec4(0.0);
            break;
        }
        highp float _367 = 0.0;
        if (frag_info.x_tile_mode == 0.0)
        {
            _367 = clamp(v_texture_coords.x, 0.0, 1.0);
        }
        else
        {
            highp float _368 = 0.0;
            if (frag_info.x_tile_mode == 1.0)
            {
                _368 = fract(v_texture_coords.x);
            }
            else
            {
                highp float _369 = 0.0;
                if (frag_info.x_tile_mode == 2.0)
                {
                    highp float _297 = v_texture_coords.x - 1.0;
                    _369 = abs(((-2.0) * floor(_297 * 0.5) + _297) - 1.0);
                }
                else
                {
                    _369 = v_texture_coords.x;
                }
                _368 = _369;
            }
            _367 = _368;
        }
        highp float _370 = 0.0;
        if (frag_info.y_tile_mode == 0.0)
        {
            _370 = clamp(v_texture_coords.y, 0.0, 1.0);
        }
        else
        {
            highp float _371 = 0.0;
            if (frag_info.y_tile_mode == 1.0)
            {
                _371 = fract(v_texture_coords.y);
            }
            else
            {
                highp float _372 = 0.0;
                if (frag_info.y_tile_mode == 2.0)
                {
                    highp float _331 = v_texture_coords.y - 1.0;
                    _372 = abs(((-2.0) * floor(_331 * 0.5) + _331) - 1.0);
                }
                else
                {
                    _372 = v_texture_coords.y;
                }
                _371 = _372;
            }
            _370 = _371;
        }
        highp vec2 _276 = vec2(_367, _370);
        highp vec2 _373 = vec2(0.0);
        if (frag_info.texture_sampler_y_coord_scale < 0.0)
        {
            highp vec2 _366 = _276;
            _366.y = 1.0 - _370;
            _373 = _366;
        }
        else
        {
            _373 = _276;
        }
        _374 = texture2D(texture_sampler, _373);
        break;
    }
    gl_FragData[0] = _374 * frag_info.alpha;
}

