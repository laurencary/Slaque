class Api::ChannelSubcriptionsController < ApplicationController
    def create
    end

    def destroy
        @channel_subscription = ChannelSubscription.where(workspace_user_id: params[:workspace_user_id], channel_id: params[:channel_id])
        @channel_subscription.destroy
    end

    private
    def channel_subscription_params
        params.require(:channel_subscription).permit(:workspace_user_id, :channel_id)
    end
end
