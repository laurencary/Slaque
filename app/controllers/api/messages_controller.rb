class Api::MessagesController < ApplicationController
	wrap_parameters :message, include: Message.attribute_names + ["workspaceAuthorId", "unreadByWorkspaceUsers","messageableId","messageableType"]

	def create
		@message = Message.new(message_params)
		@message.unread_by_workspace_users = params[:message][:unread_by_workspace_users]

		if @message.save
			render :show
		else
			debugger
			render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity 
		end
	end

	def update
	end

	private
	def message_params
		params.require(:message).permit(:workspace_author_id, :content, :edited, :unread_by_workspace_users, :messageable_id, :messageable_type)
	end
end
