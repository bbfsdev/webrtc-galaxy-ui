class CreateAddrs < ActiveRecord::Migration
  def change
    create_table :addrs do |t|
      t.references :city, index: true, null: false
      t.string :local
      t.string :contacts
      t.references :user, null: false
      t.timestamps
    end
  end
end
