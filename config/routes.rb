Rails.application.routes.draw do
  devise_for :users
  root to: 'messages#index'
  resources :users, only: [:edit, :update]
  resoureces :groups, only: [:new, :create, :edit, :update]
    resources :messages, only: [:index, :create]
end
