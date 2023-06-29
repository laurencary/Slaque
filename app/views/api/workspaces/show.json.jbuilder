workspace_user = @workspace[0].workspace_users.where("user_id = #{current_user.id}")[0]
# workspace_user = @workspace[0].workspace_users.where("user_id = 1")[0]

json.currentWorkspace do
    json.currentWorkspaceId @workspace[0].id
    json.workspace_subscription_id workspace_user.id
    json.subscribedChannels workspace_user.channels.map { |channel| channel.id }
end

json.workspaceUsers do 
    @workspace[0].workspace_users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :user_id, :full_name, :display_name, :title, :pronunciation
        end
    end
end

json.channels do
    @workspace[0].channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :name, :description, :owner_id
            json.createdAt channel.created_at.strftime("%B %d, %Y")
            json.workspaceUsers channel.workspace_users.map { |user| user.id }
            json.unreadMessages channel.has_unread_message?(workspace_user.id)
        end
    end
end

json.directMessages do    
    workspace_user.direct_messages.each do |dm|
        json.set! dm.id do 
            json.id dm.id
            json.name dm.getDirectMessageName(workspace_user.id)
            json.workspaceUsers dm.workspace_users.map { |user| user.id }
            json.unreadMessageCount dm.unread_message_count(workspace_user.id)
        end
    end
end

