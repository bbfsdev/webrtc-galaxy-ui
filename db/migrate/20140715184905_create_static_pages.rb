class CreateStaticPages < ActiveRecord::Migration
  def change
    create_table :static_pages do |t|
      t.string :title
      t.text :body
      t.text :html_cache

      t.timestamps
    end
  end
end
