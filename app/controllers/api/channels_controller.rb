class Api::ChannelsController < ApplicationController
	wrap_parameters :channel, include: Channel.attribute_names + ["workspaceId", "ownerId"]
    
	def create
		@channel = Channel.new(channel_params)
		if @channel.save	
			ChannelSubscription.create(workspace_user_id: @channel.owner_id, channel_id: @channel.id)
			render 'api/channels/show'
		end
	end
	
	def index
	end

	def show
		@channel = Channel.where("id = #{params[:id]}").includes(:messages)[0]
		render :show
	end

	def update
	end

	private
	def channel_params 
		params.require(:channel).permit(:name, :description, :owner_id, :workspace_id)
	end
end

