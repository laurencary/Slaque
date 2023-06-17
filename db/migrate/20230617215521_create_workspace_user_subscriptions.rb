class CreateWorkspaceUserSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :workspace_user_subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :workspace, null: false, foreign_key: true
      t.string :full_name
      t.string :display_name
      t.string :title
      t.string :pronunciation
      t.string :time_zone

      t.timestamps
    end
  end
end
