class ChangeNullableColumn < ActiveRecord::Migration[7.0]
  def change
    change_column_null :workspace_user_subscriptions, :full_name, false
  end
end
