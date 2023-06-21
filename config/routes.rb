Rails.application.routes.draw do
	# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

	# Defines the root path route ("/")
	# root "articles#index"

	# post 'api/test', to: 'application#test'

	namespace :api, defaults: { format: :json } do
		resources :users, only: [:create, :show]
		resources :workspaces, only: [:index ,:show ,:create ,:update ,:delete]
		resources :workspace_user_subscriptions, only: [:index ,:show ,:create ,:update ,:delete]
		resources :channels, only: [:create, :index, :show, :update]
		resources :direct_messages, only: [:create, :index, :show, :update]
		resources :messages, only: [:create, :index, :show, :update]
		resource :session, only: [:show, :create, :destroy]

	end
	get '*path', to: "static_pages#frontend_index"
end
