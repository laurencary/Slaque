class Api::WorkspaceUserSubscriptionsController < ApplicationController
	wrap_parameters :message, include: Message.attribute_names + ["fullName", "displayName","workspaceUser"]

	def index
		@workspace_user_subscriptions = WorkspaceUserSubscription.where("user_id = #{current_user.id}").includes(:workspace)
		render :index
	end

	def create
	end

	def update
		debugger
		@workspace_user_subscription = WorkspaceUserSubscription.find(params[:id])
		# debugger
		if @workspace_user_subscription.update(wus_params)
			render :show
		else
			render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity 
		end
	end

	private
	def wus_params
		params.require(:workspace_user).permit(
		:id,
		:user_id, 
		:workspace_id, 
		:full_name, 
		:display_name,
		:title,
		:pronunciation
		)
	end
end
