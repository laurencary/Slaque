class UpdateMessagesReadToUnread < ActiveRecord::Migration[7.0]
  def change
    rename_column :messages, :read_by_workspace_users, :unread_by_workspace_users
  end
end
