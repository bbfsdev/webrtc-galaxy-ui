class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.references :addr, index: true
      t.references :role, index: true, null: false, default: 0

      t.timestamps
    end
  end
end
