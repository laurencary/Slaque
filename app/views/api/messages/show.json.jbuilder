json.set! @message.id do
    json.extract! @message, :id, :workspace_author_id, :content, :edited
    json.createdAt @message.get_display_time
    json.author_name @message.workspace_author.full_name
    json.unread @message.unread_by_workspace_users.has_key?(current_user.id.to_s)
    # json.unread message.unread_by_workspace_users.has_key?("4")
end