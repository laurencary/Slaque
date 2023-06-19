class Api::SessionsController < ApplicationController
	def show
		if current_user
			@user = current_user
			render 'api/users/show'
		else
			render json: { user: nil, userWorkspaces: nil }
		end
	end

	def create
		puts params[:session]["email"]
		@user = User.find_by_credentials(params[:session][:email], params[:session][:password])
		if @user
			login!(@user)
			render 'api/users/show'
		else
			render json: { errors: ['The provided credentials were invalid.'] }, status: :unathorized 
		end
	end

	def destroy
		if current_user
			logout!
			render json: { message: 'success' }
		end
	end
end

