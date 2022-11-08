task :default => [:generate_reports]

shaders = [
  "advanced_blend_exclusion.frag",
  "glyph_atlas.frag",
  "advanced_blend_colordodge.frag",
  "solid_fill.vert",
  "yuv_to_rgb_filter.frag",
  "border_mask_blur.vert",
  "blend.frag",
  "color_matrix_color_filter.frag",
  "sweep_gradient_fill.frag",
  "srgb_to_linear_filter.vert",
  "atlas_fill.vert",
  "gradient_fill.vert",
  "advanced_blend_hue.frag",
  "advanced_blend_saturation.frag",
  "advanced_blend_luminosity.frag",
  "glyph_atlas_sdf.frag",
  "advanced_blend_multiply.frag",
  "texture_fill.vert",
  "gaussian_blur.vert",
  "advanced_blend_softlight.frag",
  "linear_to_srgb_filter.vert",
  "rrect_blur.frag",
  "advanced_blend.vert",
  "tiled_texture_fill.frag",
  "morphology_filter.vert",
  "color_matrix_color_filter.vert",
  "blend.vert",
  "position_uv.vert",
  "vertices.frag",
  "border_mask_blur.frag",
  "linear_gradient_fill.frag",
  "yuv_to_rgb_filter.vert",
  "advanced_blend_lighten.frag",
  "solid_fill.frag",
  "glyph_atlas.vert",
  "radial_gradient_fill.frag",
  "morphology_filter.frag",
  "tiled_texture_fill.vert",
  "advanced_blend_overlay.frag",
  "advanced_blend_difference.frag",
  "linear_to_srgb_filter.frag",
  "rrect_blur.vert",
  "advanced_blend_hardlight.frag",
  "gaussian_blur.frag",
  "runtime_effect.vert",
  "position_color.vert",
  "advanced_blend_color.frag",
  "glyph_atlas_sdf.vert",
  "texture_fill.frag",
  "srgb_to_linear_filter.frag",
  "advanced_blend_colorburn.frag",
  "atlas_fill.frag",
  "advanced_blend_screen.frag",
  "advanced_blend_darken.frag",
  "position.vert",
]

cores = [
  "Immortalis-G715",
  "Mali-G715",
  "Mali-G710",
  "Mali-G615",
  "Mali-G610",
  "Mali-G510",
  "Mali-G310",
  "Mali-G78AE",
  "Mali-G78",
  "Mali-G77",
  "Mali-G68",
  "Mali-G57",
  "Mali-G76",
  "Mali-G72",
  "Mali-G71",
  "Mali-G52",
  "Mali-G51",
  "Mali-G31",
  "Mali-T880",
  "Mali-T860",
  "Mali-T830",
  "Mali-T820",
  "Mali-T760",
  "Mali-T720",
]

def malioc(shader, core)
  dir = File.extname(shader).gsub(".", "")
  FileUtils.mkdir_p("reports/#{core}/#{dir}")
  sh "malioc -c #{core} -o reports/#{core}/#{dir}/#{shader}.txt shaders/#{shader}"
end

task :generate_reports => [:clean] do
  cores.each do |core|
    shaders.each do |shader|
      malioc(shader, core)
    end
  end
end

task :clean do
  FileUtils.rm_r("reports", :force => true)
end
