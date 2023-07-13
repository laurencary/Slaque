json.userWorksapces do
    @workspace_user_subscriptions.each do |userWorkspace|
        json.set! userWorkspace.workspace_id.to_i do
            json.id userWorkspace.workspace_id
            json.name userWorkspace.workspace.name
            json.owner userWorkspace.workspace.owner_id == current_user.id
            json.memberCount userWorkspace.workspace.workspace_users.count
        end
    end
end

