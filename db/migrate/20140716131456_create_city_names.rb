class CreateCityNames < ActiveRecord::Migration
  def change
    create_table :city_names do |t|
      t.references :city, index: true
      t.string :name
      t.string :lang

      t.timestamps
    end
  end
end
