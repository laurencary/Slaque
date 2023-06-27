workspace_user = @direct_message[0].workspace.workspace_users.where("user_id = #{current_user.id}")[0]

@direct_message[0].messages.each do |message|
    json.set! message.id do
        json.extract! message, :id, :workspace_author_id, :content, :edited
        json.createdAt message.created_at
        json.displayTime message.get_display_time
        json.author_name message.workspace_author.full_name
        json.unread message.unread_by_workspace_users.has_key?(workspace_user.id.to_s)
    end
end


