class Api::DirectMessageSubscriptionsController < ApplicationController
    wrap_parameters :direct_message, include: DirectMessage.attribute_names + ["workspaceUserId", "directMessageId"]

    def create
        @direct_message_subscription = DirectMessageSubscription.new(direct_message_subscription_params)
        @direct_message = DirectMessage.find(direct_message_subscription_params[:direct_message_id])
        if @direct_message_subscription.save
            render '/api/direct_messages/show'
        end
    end


    private
    def direct_message_subscription_params
        params.require(:direct_message).permit(:workspace_user_id, :direct_message_id)
    end
end


