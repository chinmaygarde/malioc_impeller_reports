#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp float texture_sampler_y_coord_scale;
    highp vec2 texture_size;
    highp vec2 direction;
    highp float radius;
    highp float morph_type;
};

uniform FragInfo frag_info;

uniform highp sampler2D texture_sampler;

varying highp vec2 v_texture_coords;

void main()
{
    bool _194 = frag_info.morph_type == 0.0;
    bvec4 _197 = bvec4(_194);
    highp vec2 _207 = frag_info.direction / frag_info.texture_size;
    highp float _212 = -frag_info.radius;
    highp vec4 _440 = vec4(0.0);
    _440 = vec4(_197.x ? vec4(0.0).x : vec4(1.0).x, _197.y ? vec4(0.0).y : vec4(1.0).y, _197.z ? vec4(0.0).z : vec4(1.0).z, _197.w ? vec4(0.0).w : vec4(1.0).w);
    highp vec4 _476 = vec4(0.0);
    for (highp float _439 = _212; _439 <= frag_info.radius; _440 = _476, _439 += 1.0)
    {
        highp vec2 _229 = v_texture_coords + (_207 * _439);
        highp vec4 _448 = vec4(0.0);
        for (int spvDummy94 = 0; spvDummy94 < 1; spvDummy94++)
        {
            highp float _294 = _229.x;
            bool _295 = _294 < 0.0;
            bool _302 = false;
            if (!_295)
            {
                _302 = _294 >= 1.0;
            }
            else
            {
                _302 = _295;
            }
            bool _323 = false;
            if (!_302)
            {
                highp float _311 = _229.y;
                bool _312 = _311 < 0.0;
                bool _319 = false;
                if (!_312)
                {
                    _319 = _311 >= 1.0;
                }
                else
                {
                    _319 = _312;
                }
                _323 = _319;
            }
            else
            {
                _323 = _302;
            }
            if (_323)
            {
                _448 = vec4(0.0);
                break;
            }
            highp vec2 _447 = vec2(0.0);
            if (frag_info.texture_sampler_y_coord_scale < 0.0)
            {
                highp vec2 _438 = _229;
                _438.y = 1.0 - _229.y;
                _447 = _438;
            }
            else
            {
                _447 = _229;
            }
            _448 = texture2D(texture_sampler, _447);
            break;
        }
        if (_194)
        {
            _476 = max(_448, _440);
        }
        else
        {
            _476 = min(_448, _440);
        }
    }
    gl_FragData[0] = _440;
}

