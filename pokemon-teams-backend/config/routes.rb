Rails.application.routes.draw do
  resources :pokemons, only: [:show, :create, :destroy]
  get '/pokemon/random', to: 'pokemons#random'
  resources :trainers, only: [:index, :show] 
  #   resources :pokemon, only: [:create]
  # end
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
