class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        options = {
            include: {
                pokemons: {
                    only: [:nickname, :species, :id]
                }
            }
        }
        render json: TrainerSerializer.new(trainers).to_serialized_json(options)
    end
end
