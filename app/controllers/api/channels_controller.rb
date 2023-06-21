class Api::ChannelsController < ApplicationController
    def create
	end

	def index
	end

	def show
		@channel = Channel.where("id = #{params[:id]}").includes(:messages)
		render :show
	end

	def update
	end

	private
	def channel_params 
		params.require(:id).permit(:name, :description)
	end
end

