class Api::MessagesController < ApplicationController
	wrap_parameters :message, include: Message.attribute_names + ["workspaceAuthorId", "unreadByWorkspaceUsers","messageableId","messageableType"]

	def create
		@message = Message.new(message_params)
		@message.unread_by_workspace_users = params[:message][:unread_by_workspace_users]

		if @message.save
			if @message.messageable_type == "channel"
				ChannelsChannel.broadcast_to(@message.messageble, @message)
			else
				DirectMessagesChannel.broadcast_to(@message.messageble, @message)
			end
			render :show
		else
			# debugger
			render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity 
		end
	end

	def update
		@message = Message.find(params[:id])

		if @message.update
			render :show
		else
			debugger
			render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity 
		end
	end

	private
	def message_params
		params.require(:message).permit(:workspace_author_id, :content, :edited, :unread_by_workspace_users, :messageable_id, :messageable_type)
	end
end
