class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :name, unique: true, index: true, null: false

      t.timestamps
    end
  end
end
