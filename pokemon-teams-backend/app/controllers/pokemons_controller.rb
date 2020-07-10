class PokemonsController < ApplicationController

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: { id: params[:id], message: "delete success!"}
    end

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        new_pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)

        render json: new_pokemon
    end
end
