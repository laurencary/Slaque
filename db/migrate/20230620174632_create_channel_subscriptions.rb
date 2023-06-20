class CreateChannelSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :channel_subscriptions do |t|
      t.references :workspace_user, null: false, foreign_key: {to_table: :workspace_user_subscriptions}
      t.references :channel, null: false, foreign_key: true

      t.timestamps
    end
  end
end
