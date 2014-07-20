json.array!(@ui_presets) do |ui_preset|
  json.extract! ui_preset, :id
  json.url ui_preset_url(ui_preset, format: :json)
end
