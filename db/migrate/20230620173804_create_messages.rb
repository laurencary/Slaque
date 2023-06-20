class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :workspace_author, null: false, foreign_key: { to_table: :workspace_user_subscriptions }
      t.text :content, null: false
      t.references :messageable, null: false, polymorchic:true
      t.boolean :edited, null: false, default: false
      t.jsonb :read_by_workspace_users, default: {}

      t.timestamps
    end
  end
end
