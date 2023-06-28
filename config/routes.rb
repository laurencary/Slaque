Rails.application.routes.draw do
	# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

	# Defines the root path route ("/")
	# root "articles#index"

	# post 'api/test', to: 'application#test'

	mount ActionCable.server => '/cable'

	namespace :api, defaults: { format: :json } do
		resources :users, only: [:create, :show]
		resources :workspaces, only: [:index ,:show ,:create ,:update ,:destroy]
		resources :workspace_user_subscriptions, only: [:index ,:show ,:create ,:update ,:destroy]
		resources :channels, only: [:create, :index, :show, :update, :destroy]
		resources :direct_messages, only: [:create, :index, :show, :update]
		resources :messages, only: [:create, :index, :show, :update, :destroy]
		resources :channel_subscriptions, only: [:create, :destroy]

		patch '/messages/:id/mark_read', :to => 'messages#mark_read'

		resource :session, only: [:show, :create, :destroy]

	end
	get '*path', to: "static_pages#frontend_index"
end
