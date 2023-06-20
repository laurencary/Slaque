class CreateDirectMessageSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :direct_message_subscriptions do |t|
      t.references :workspace_user, null: false, foreign_key: {to_table: :workspace_user_subscriptions}
      t.references :direct_message, null: false, foreign_key: true

      t.timestamps
    end
  end
end
