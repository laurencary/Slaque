class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.references :owner, null: false, foreign_key: {to_table: :users}
      t.references :workspace, null: false, foreign_key: true
      t.string :name, null: false
      t.string :description

      t.timestamps
    end

    add_index :channels, [:workspace_id, :name]
  end
end
