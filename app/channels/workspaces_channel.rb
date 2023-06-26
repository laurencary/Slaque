class WorkspacesChannel < ApplicationCable::Channel
    def subscribed
        @workspace = Workspace.find_by(id: params[:id])
        stream_for @workspace
    end
end