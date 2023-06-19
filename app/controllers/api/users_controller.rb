class Api::UsersController < ApplicationController
	# Since this automatic nesting occurs before the params object ever reaches 
	# your controllers, if you ever want automatic nesting of attributes that are 
	# camelCased in the request body, you must include them explicitly, just as 
	# you did above for password.
	wrap_parameters include: User.attribute_names + ['password']

	def show
		@user = User.find(params[:id])
		render :show
	end

	def create
		@user = User.new(user_params)
		if @user.save
			login!(@user)
			render :show
		else
			render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity 
		end
	end

	private

	def user_params
		params.require(:user).permit(:email, :password)
	end
end
