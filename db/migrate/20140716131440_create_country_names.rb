class CreateCountryNames < ActiveRecord::Migration
  def change
    create_table :country_names do |t|
      t.references :country, index: true
      t.string :name
      t.string :lang

      t.timestamps
    end
  end
end
