class Api::WorkspaceUserSubscriptionsController < ApplicationController
	wrap_parameters :message, include: Message.attribute_names + ["fullName", "displayName","workspaceUser","workspaceId","userId"]

	def index
		@workspace_user_subscriptions = WorkspaceUserSubscription.where("user_id = #{current_user.id}").includes(:workspace)
		render :index
	end

	def create
		@workspace_user_subscription = WorkspaceUserSubscription.new(wus_params)
		if @workspace_user_subscription.save
			@workspace = Workspace.where("id = #{params[:workspace_id]}").includes(:workspace_users, :channels, :direct_messages)
			render 'api/workspaces/show'
		else
			render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity 
		end
	end

	def update
		# debugger
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
