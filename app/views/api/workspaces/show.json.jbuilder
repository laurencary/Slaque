json.currentWorkspace do
    json.currentWorkspaceId @workspace[0].id
    json.workspace_subscription_id @workspace[0].workspace_users.find(current_user.id).id
end

json.workspaceUsers do 
    @workspace[0].workspace_users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :user_id, :full_name, :display_name, :title, :pronunciation
        end
    end
end