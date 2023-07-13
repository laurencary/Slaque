json.user do
    json.extract! @user, :id, :email, :created_at, :updated_at
end

@workspace_user_subscriptions = WorkspaceUserSubscription.where("user_id = #{current_user.id}").includes(:workspace)


json.userWorkspaces do 
    @workspace_user_subscriptions.each do |userWorkspace|
        json.set! userWorkspace.workspace_id.to_i do
            json.id userWorkspace.workspace_id
            json.name userWorkspace.workspace.name
            json.owner userWorkspace.workspace.owner_id == current_user.id
            json.memberCount userWorkspace.workspace.workspace_users.count
        end
    end
end

json.otherWorkspaces do
    Workspace.where("id not in (?)", @workspace_user_subscriptions.pluck(:workspace_id)).each do |otherWorkspace|
        json.set! otherWorkspace.id.to_i do
            json.id otherWorkspace.id
            json.name otherWorkspace.name
            json.memberCount otherWorkspace.workspace_users.count
        end
    end
end
