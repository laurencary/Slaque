workspace_user = @workspace[0].workspace_users.where("user_id = #{current_user.id}")[0]
# workspace_user = @workspace[0].workspace_users.where("user_id = 3")[0]

json.currentWorkspace do
    json.currentWorkspaceId @workspace[0].id
    json.workspace_subscription_id workspace_user.id
end

json.workspaceUsers do 
    @workspace[0].workspace_users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :user_id, :full_name, :display_name, :title, :pronunciation
        end
    end
end

json.channels do
    workspace_user.channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :name, :description
            json.unreadMessages channel.has_unread_message?(workspace_user.id)
        end
    end
end

# json.ChannelSubscriptions do

# end

# json.directMessages do
# end

