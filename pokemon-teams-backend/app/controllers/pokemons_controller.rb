class PokemonsController < ApplicationController
    def show 
        pokemon = Pokemon.find_by_id(params[:id])
        render json: pokemon
    end

    def create 
        poke = Pokemon.create(nickname: params["pokemon"]["nickname"], species: params["pokemon"]["species"], trainer_id: params["pokemon"]["trainer_id"])
        redirect_to poke
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        pokemon.delete
        
    end

    def random 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        poke = Pokemon.new(nickname: name, species: species)
        render json: poke
    end
end
