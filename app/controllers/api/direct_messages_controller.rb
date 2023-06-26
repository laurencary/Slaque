class Api::DirectMessagesController < ApplicationController
    def show
        @direct_message = DirectMessage.where("id = #{params[:id]}").includes(:messages)
        render 'api/direct_messages/show'
    end

    def create
        @direct_message = DirectMessage.new(direct_message_params)

        if @direct_message.save
            show 'api/direct_messages/show'
        else
			debugger
			render json: { errors: @direct_message.errors.full_messages }, status: :unprocessable_entity 
		end

    end

    private
    def direct_message_params
        params.require[:direct_message].permit(:workspace_id)
    end
end
