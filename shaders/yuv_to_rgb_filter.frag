#version 100
precision mediump float;
precision highp int;

struct FragInfo
{
    highp float texture_sampler_y_coord_scale;
    highp mat4 matrix;
    highp float yuv_color_space;
};

uniform FragInfo frag_info;

uniform highp sampler2D y_texture;
uniform highp sampler2D uv_texture;

varying highp vec2 v_position;

void main()
{
    highp vec3 _159 = vec3(0.0);
    if (frag_info.yuv_color_space == 0.0)
    {
        highp vec3 _138 = vec3(0.0, 0.5, 0.5);
        _138.x = 0.062745101749897003173828125;
        _159 = _138;
    }
    else
    {
        _159 = vec3(0.0, 0.5, 0.5);
    }
    highp vec2 _70 = v_position;
    bool _114 = frag_info.texture_sampler_y_coord_scale < 0.0;
    highp vec2 _151 = vec2(0.0);
    if (_114)
    {
        highp vec2 _141 = _70;
        _141.y = 1.0 - _70.y;
        _151 = _141;
    }
    else
    {
        _151 = _70;
    }
    highp vec4 _123 = texture2D(y_texture, _151);
    highp vec2 _155 = vec2(0.0);
    if (_114)
    {
        highp vec2 _146 = _70;
        _146.y = 1.0 - _70.y;
        _155 = _146;
    }
    else
    {
        _155 = _70;
    }
    gl_FragData[0] = frag_info.matrix * vec4(vec3(_123.x, texture2D(uv_texture, _155).xy) - _159, 1.0);
}

