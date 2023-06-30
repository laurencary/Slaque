class Api::DirectMessagesController < ApplicationController
	wrap_parameters :message, include: Message.attribute_names + ["workspaceId", "workspaceUserIds"]

    def show
        @direct_message = DirectMessage.where("id = #{params[:id]}").includes(messages: :workspace_author)[0]
        render 'api/direct_messages/show'
    end

    def create
        @direct_message = DirectMessage.new(workspace_id: params[:workspace_id])
        @user_ids = params[:workspace_user_ids]
        if @direct_message.save
            @user_ids.each do |user_id|
                DirectMessageSubscription.create(workspace_user_id: user_id, direct_message_id: @direct_message.id)
            end
            render 'api/direct_messages/show'
        else
			render json: { errors: @direct_message.errors.full_messages }, status: :unprocessable_entity 
		end

    end

    def destroy
        @direct_message = DirectMessage.find(params[:id])
		@direct_message.destroy
    end


    private
    def direct_message_params
        params.require[:direct_message].permit(:workspace_id, :workspace_user_ids) 
    end
end
