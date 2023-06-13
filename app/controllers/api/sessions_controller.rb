class Api::SessionsController < ApplicationController
	def show
		render json: { user: current_user }
	end

	def create
		puts params[:session]["email"]
		@user = User.find_by_credentials(params[:session][:email], params[:session][:password])
		if @user
			login!(@user)
			render json: { user: current_user }
		else
			render json: { errors: ['The provided credentials were invalid.'], status: :unathorized }
		end
	end

	def destroy
		if current_user
			logout!
			render json: { message: 'success' }
		end
	end
end


# loginRequestOptions = {
#     method: 'POST',
#     headers: { 'Content-Type': 'application/json' },
#     body: JSON.stringify({ email: 'usr@email.io', password: 'starwars' })
#   }