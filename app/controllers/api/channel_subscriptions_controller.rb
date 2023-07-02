class Api::ChannelSubscriptionsController < ApplicationController
    wrap_parameters :channel_subscription, include: ChannelSubscription.attribute_names + ["workspaceUserId", "channelId"]

    def create
        @channel_subscription = ChannelSubscription.new(channel_subscription_params)
        @channel = Channel.find(channel_subscription_params[:channel_id])
        if @channel_subscription.save
            render '/api/channels/show'
        end
    end

    def destroy
        # debugger
        @channel_subscription = ChannelSubscription.where(workspace_user_id: params[:workspace_user_id], channel_id: params[:channel_id])[0]
        @channel_subscription.destroy
    end

    private
    def channel_subscription_params
        params.require(:channel_subscription).permit(:workspace_user_id, :channel_id)
    end
end
