class CreateDirectMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :direct_messages do |t|
      t.references :workspace, null: false, foreign_key: true

      t.timestamps
    end
  end
end
