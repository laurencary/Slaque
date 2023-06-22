class Api::MessagesController < ApplicationController
	def create
		@message = Message.new(message_params)

		if @message.save
			render: 'api/'
	end

	def update
	end

	private
	def message_params
		params.require(:id).permit(:workspace_author_id, :content, :edited, :unread_by_workspace_users, :messageable_id, :messageable_type)
	end
end
