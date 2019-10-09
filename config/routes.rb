Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  resources :sessions, only: :create
  resources :registrations, only: :create

  delete :logout, to: "sesions#logout"
  get :logged_in, to: "sesions#logged_in"
end
