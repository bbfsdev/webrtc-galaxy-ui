class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.string :name
      t.string :at_when
      t.references :room, index: true

      t.timestamps
    end
  end
end
