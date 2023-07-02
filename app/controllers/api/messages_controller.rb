class Api::MessagesController < ApplicationController
	wrap_parameters :message, include: Message.attribute_names + ["workspaceAuthorId", "unreadByWorkspaceUsers","messageableId","messageableType"]

	def create
		@message = Message.new(message_params)
		@message.unread_by_workspace_users = params[:message][:unread_by_workspace_users]

		if @message.save
			if @message.messageable_type == "Channel"
				ChannelsChannel.broadcast_to(@message.messageable, 
					type: 'RECEIVE_MESSAGE',
					**from_template('api/messages/show', message: @message))
			else
				DirectMessagesChannel.broadcast_to(@message.messageable, 
					type: 'RECEIVE_MESSAGE',
					**from_template('api/messages/show', message: @message))
			end
		else
			# debugger
			render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity 
		end
	end

	def mark_read
		@message = Message.find(params[:id])
		unreads = @message.unread_by_workspace_users
		unreads.delete(@message.messageable.workspace_users.where(user_id: current_user.id)[0].id.to_s)
		# debugger
		@message.update(unread_by_workspace_users: unreads == nil ? {} : unreads)
		render json: {}, status: 200
	end


	def update
		@message = Message.find(params[:id])

		if @message.update(message_params)
			if @message.messageable_type == "Channel"
				ChannelsChannel.broadcast_to(@message.messageable, 
					type: 'RECEIVE_MESSAGE',
					**from_template('api/messages/show', message: @message))
			else
				DirectMessagesChannel.broadcast_to(@message.messageable, 
					type: 'RECEIVE_MESSAGE',
					**from_template('api/messages/show', message: @message))
			end
		else
			# debugger
			render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity 
		end
	end

	def destroy
		@message = Message.find(params[:id])
		@message.destroy
		if @message.messageable_type == "Channel"
			ChannelsChannel.broadcast_to(@message.messageable, 
				type: 'DESTROY_MESSAGE',
				id: @message.id)
		else
			DirectMessagesChannel.broadcast_to(@message.messageable, 
				type: 'DESTROY_MESSAGE',
				id: @message.id)
		end
	end

	private
	def message_params
		params.require(:message).permit(:workspace_author_id, :content, :edited, :unread_by_workspace_users, :messageable_id, :messageable_type)
	end
end
