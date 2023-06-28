workspace_user = @channel.workspace.workspace_users.where("user_id = #{current_user.id}")[0]

json.messages do
    @channel.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :workspace_author_id, :content, :edited
            json.createdAt message.created_at
            json.displayTime message.get_display_time
            json.author_name message.workspace_author.full_name
            json.unread message.unread_by_workspace_users.has_key?(workspace_user.id.to_s)
        end
    end
end

json.channel do
    json.extract! @channel, :id, :name, :description, :owner_id
    json.createdAt @channel.created_at.strftime("%B %d, %Y")
    json.workspaceUsers @channel.workspace_users.map { |user| user.id }
    json.unreadMessages @channel.has_unread_message?(workspace_user.id)
end