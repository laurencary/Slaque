class Api::WorkspacesController < ApplicationController
	def index
	end

	def show
		@workspace = Workspace.where("id = #{params[:id]}").includes(:workspace_users, :channels, :direct_messages,)
		# debugger
		render :show
	end

	def create
	end

	def update
	end

	def delete
	end

	private
	def workspace_params
		params.permit(:id, :name, :owner_id)
	end
end
