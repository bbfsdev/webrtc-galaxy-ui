class CreateRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.string :name, unique: true, null: false, index: true

      t.timestamps
    end
  end
end
