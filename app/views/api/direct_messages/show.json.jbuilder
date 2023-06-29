workspace_user = @direct_message.workspace.workspace_users.where("user_id = #{current_user.id}")[0]

json.messages do 
    @direct_message.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :workspace_author_id, :content, :edited
            json.createdAt message.created_at
            json.displayTime message.get_display_time
            json.author_name message.workspace_author.full_name
            json.unread message.unread_by_workspace_users.has_key?(workspace_user.id.to_s)
        end
    end
end

json.directMessage do    
    json.id @direct_message.id
    json.name @direct_message.getDirectMessageName(workspace_user.id)
    json.workspaceUsers @direct_message.workspace_users.map { |user| user.id }
    json.unreadMessageCount @direct_message.unread_message_count(workspace_user.id)
end