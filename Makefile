REPORTS:= doc/advanced_blend_exclusion.frag.report.txt      \
					doc/glyph_atlas.frag.report.txt                   \
					doc/advanced_blend_colordodge.frag.report.txt     \
					doc/solid_fill.vert.report.txt                    \
					doc/yuv_to_rgb_filter.frag.report.txt             \
					doc/border_mask_blur.vert.report.txt              \
					doc/blend.frag.report.txt                         \
					doc/color_matrix_color_filter.frag.report.txt     \
					doc/sweep_gradient_fill.frag.report.txt           \
					doc/srgb_to_linear_filter.vert.report.txt         \
					doc/atlas_fill.vert.report.txt                    \
					doc/gradient_fill.vert.report.txt                 \
					doc/advanced_blend_hue.frag.report.txt            \
					doc/advanced_blend_saturation.frag.report.txt     \
					doc/advanced_blend_luminosity.frag.report.txt     \
					doc/glyph_atlas_sdf.frag.report.txt               \
					doc/advanced_blend_multiply.frag.report.txt       \
					doc/texture_fill.vert.report.txt                  \
					doc/gaussian_blur.vert.report.txt                 \
					doc/advanced_blend_softlight.frag.report.txt      \
					doc/linear_to_srgb_filter.vert.report.txt         \
					doc/rrect_blur.frag.report.txt                    \
					doc/advanced_blend.vert.report.txt                \
					doc/tiled_texture_fill.frag.report.txt            \
					doc/morphology_filter.vert.report.txt             \
					doc/color_matrix_color_filter.vert.report.txt     \
					doc/blend.vert.report.txt                         \
					doc/position_uv.vert.report.txt                   \
					doc/vertices.frag.report.txt                      \
					doc/border_mask_blur.frag.report.txt              \
					doc/linear_gradient_fill.frag.report.txt          \
					doc/yuv_to_rgb_filter.vert.report.txt             \
					doc/advanced_blend_lighten.frag.report.txt        \
					doc/solid_fill.frag.report.txt                    \
					doc/glyph_atlas.vert.report.txt                   \
					doc/radial_gradient_fill.frag.report.txt          \
					doc/morphology_filter.frag.report.txt             \
					doc/tiled_texture_fill.vert.report.txt            \
					doc/advanced_blend_overlay.frag.report.txt        \
					doc/advanced_blend_difference.frag.report.txt     \
					doc/linear_to_srgb_filter.frag.report.txt         \
					doc/rrect_blur.vert.report.txt                    \
					doc/advanced_blend_hardlight.frag.report.txt      \
					doc/gaussian_blur.frag.report.txt                 \
					doc/runtime_effect.vert.report.txt                \
					doc/position_color.vert.report.txt                \
					doc/advanced_blend_color.frag.report.txt          \
					doc/glyph_atlas_sdf.vert.report.txt               \
					doc/texture_fill.frag.report.txt                  \
					doc/srgb_to_linear_filter.frag.report.txt         \
					doc/advanced_blend_colorburn.frag.report.txt      \
					doc/atlas_fill.frag.report.txt                    \
					doc/advanced_blend_screen.frag.report.txt         \
					doc/advanced_blend_darken.frag.report.txt         \
					doc/position.vert.report.txt                      \

main: gen_reports

gen_reports: $(REPORTS)

doc/%.report.txt: shaders/%
	mkdir -p doc
	malioc -o $@ $<

clean:
	rm -rf doc
