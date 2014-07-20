class CreateUiPresets < ActiveRecord::Migration
  def change
    create_table :ui_presets do |t|
      t.string :name, null: false, index: true
      t.json :attrs

      t.timestamps
    end
    create_table :ui_presets_users, id: false do |t|
      t.references :ui_preset, null: false
      t.references :user, null: false
    end
    add_index :ui_presets_users, [:ui_preset_id, :user_id]
  end
end
