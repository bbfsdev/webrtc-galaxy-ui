class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :name
      t.json :attrs

      t.timestamps
    end
  end
end
