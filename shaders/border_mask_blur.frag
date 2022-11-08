#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp float texture_sampler_y_coord_scale;
};

uniform FragInfo frag_info;

uniform highp sampler2D texture_sampler;

varying highp vec2 v_sigma_uv;
varying highp vec2 v_texture_coords;
varying highp float v_inner_blur_factor;
varying highp float v_src_factor;
varying highp float v_outer_blur_factor;

void main()
{
    highp vec2 _151 = v_texture_coords;
    highp vec2 _427 = vec2(0.0);
    if (frag_info.texture_sampler_y_coord_scale < 0.0)
    {
        highp vec2 _422 = _151;
        _422.y = 1.0 - _151.y;
        _427 = _422;
    }
    else
    {
        _427 = _151;
    }
    highp vec4 _228 = texture2D(texture_sampler, _427);
    highp float _269 = 0.707106769084930419921875 / v_sigma_uv.x;
    highp float _270 = _151.x * _269;
    highp float _279 = abs(_270);
    highp float _290 = (((0.07810799777507781982421875 * _279) * _279 + 0.23038899898529052734375) * _279 + 0.2783930003643035888671875) * _279 + 1.0;
    highp float _308 = 0.707106769084930419921875 / v_sigma_uv.y;
    highp float _309 = _151.y * _308;
    highp float _318 = abs(_309);
    highp float _329 = (((0.07810799777507781982421875 * _318) * _318 + 0.23038899898529052734375) * _318 + 0.2783930003643035888671875) * _318 + 1.0;
    highp float _348 = (1.0 - _151.x) * _269;
    highp float _357 = abs(_348);
    highp float _368 = (((0.07810799777507781982421875 * _357) * _357 + 0.23038899898529052734375) * _357 + 0.2783930003643035888671875) * _357 + 1.0;
    highp float _387 = (1.0 - _151.y) * _308;
    highp float _396 = abs(_387);
    highp float _407 = (((0.07810799777507781982421875 * _396) * _396 + 0.23038899898529052734375) * _396 + 0.2783930003643035888671875) * _396 + 1.0;
    highp float _263 = (((0.535000026226043701171875 * (sign(_270) * (1.0 - (1.0 / (((_290 * _290) * _290) * _290)))) + 0.4650000035762786865234375) * (0.535000026226043701171875 * (sign(_309) * (1.0 - (1.0 / (((_329 * _329) * _329) * _329)))) + 0.4650000035762786865234375)) * (0.535000026226043701171875 * (sign(_348) * (1.0 - (1.0 / (((_368 * _368) * _368) * _368)))) + 0.4650000035762786865234375)) * (0.535000026226043701171875 * (sign(_387) * (1.0 - (1.0 / (((_407 * _407) * _407) * _407)))) + 0.4650000035762786865234375);
    bool _164 = v_texture_coords.x >= 0.0;
    bool _170 = false;
    if (_164)
    {
        _170 = v_texture_coords.y >= 0.0;
    }
    else
    {
        _170 = _164;
    }
    bool _176 = false;
    if (_170)
    {
        _176 = v_texture_coords.x < 1.0;
    }
    else
    {
        _176 = _170;
    }
    bool _182 = false;
    if (_176)
    {
        _182 = v_texture_coords.y < 1.0;
    }
    else
    {
        _182 = _176;
    }
    highp float _183 = float(_182);
    gl_FragData[0] = _228 * ((v_inner_blur_factor * _263 + v_src_factor) * _183 + ((v_outer_blur_factor * _263) * (1.0 - _183)));
}

