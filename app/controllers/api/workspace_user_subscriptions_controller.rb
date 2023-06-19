class Api::WorkspaceUserSubscriptionsController < ApplicationController
	def index
		@workspace_user_subscriptions = WorkspaceUserSubscription.where("user_id = #{current_user.id}").includes(:workspace)
		render :index
	end

	def show
	end

	def create
	end

	def update
	end

	def delete
	end

	private
	def wus_params
		params.require(:workspace_user_subscriptions).permit(
		:user_id, 
		:workspace_id, 
		:full_name, 
		:display_name,
		:title,
		:pronunciation
		)
	end
end
