class Api::MessagesController < ApplicationController
	wrap_parameters :message, include: Message.attribute_names + ["workspaceAuthorId", "unreadByWorkspaceUsers","messageableId","messageableType"]

	def create
		@message = Message.new(message_params)
		@message.unread_by_workspace_users = params[:message][:unread_by_workspace_users]

		if @message.save
			if @message.messageable_type == "Channel"
				ChannelsChannel.broadcast_to(@message.messageable, 
					from_template('api/messages/show', message: @message))
			else
				DirectMessagesChannel.broadcast_to(@message.messageable, 
					from_template('api/messages/show', message: @message))
			end
		else
			# debugger
			render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity 
		end
	end

	def mark_read
		@message = Message.find(params[:id])
		unreads = @message.unread_by_workspace_users
		# debugger
		unreads.delete(current_user.id.to_s)
		@message.update(unread_by_workspace_users: unreads == nil ? {} : unreads)
		render json: {}, status: 200
	end


	def update
		@message = Message.find(params[:id])

		if @message.update
			if @message.messageable_type == "Channel"
				ChannelsChannel.broadcast_to(@message.messageable, 
					from_template('api/messages/show', message: @message))
			else
				DirectMessagesChannel.broadcast_to(@message.messageable, 
					from_template('api/messages/show', message: @message))
			end
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
