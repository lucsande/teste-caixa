Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  resources :sessions, only: :create
  resources :registrations, only: :create

  post '/users/find', to: 'users#find'
  patch '/users', to: 'users#update'
  delete '/users', to: 'users#destroy'

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
end

