#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp vec4 color;
    highp float blur_sigma;
    highp vec2 rect_size;
    highp float corner_radius;
};

uniform FragInfo frag_info;

varying highp vec2 v_position;

void main()
{
    gl_FragData[0] = frag_info.color;
    highp vec2 _284 = frag_info.rect_size * 0.5;
    highp vec2 _290 = v_position - _284;
    if (frag_info.blur_sigma > 0.0)
    {
        highp float _333 = _290.y;
        highp float _335 = _284.y;
        highp float _337 = max(frag_info.blur_sigma * (-3.0), _333 - _335);
        highp float _348 = (min(frag_info.blur_sigma * 3.0, _333 + _335) - _337) * 0.20000000298023223876953125;
        highp float _535 = 0.0;
        _535 = 0.0;
        highp float _360 = 0.0;
        highp float _378 = 0.0;
        highp float _400 = 0.0;
        highp float _417 = 0.0;
        highp vec2 _440 = vec2(0.0);
        highp vec2 _444 = vec2(0.0);
        highp vec2 _450 = vec2(0.0);
        highp vec2 _464 = vec2(0.0);
        for (int _534 = 0; _534 < 5; _360 = _348 * (float(_534) + 0.5) + _337, _400 = min(0.0, (_335 - frag_info.corner_radius) - abs(_333 - _360)), _417 = (_284.x - frag_info.corner_radius) + sqrt(max(0.0, frag_info.corner_radius * frag_info.corner_radius + (-(_400 * _400)))), _440 = (vec2(_290.x) + vec2(-_417, _417)) * (0.707106769084930419921875 / frag_info.blur_sigma), _450 = abs(_440), _464 = (((_450 * 0.07810799777507781982421875) * _450 + vec2(0.23038899898529052734375)) * _450 + vec2(0.2783930003643035888671875)) * _450 + vec2(1.0), _444 = ((sign(_440) * (vec2(1.0) - (vec2(1.0) / (((_464 * _464) * _464) * _464)))) * 0.535000026226043701171875) + vec2(0.4650000035762786865234375), _378 = ((_444.y - _444.x) * (exp((((-0.5) * _360) * _360) / (frag_info.blur_sigma * frag_info.blur_sigma)) / (2.5066282749176025390625 * frag_info.blur_sigma))) * _348 + _535, _535 = _378, _534++)
        {
        }
        gl_FragData[0] *= _535;
    }
    else
    {
        highp vec2 _505 = (abs(_290) - _284) + vec2(frag_info.corner_radius);
        gl_FragData[0] *= (-((length(max(_505, vec2(0.0))) + min(max(_505.x, _505.y), 0.0)) - frag_info.corner_radius));
    }
}

