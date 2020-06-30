class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
  #   options = {
  #     include: [:pokemons]
  # }
    # render json: TrainerSerializer.new(trainers, options).serializable_hash
    render json: trainers.to_json(:include => {
      :pokemons => {:only => [:id,:nickname, :species, :trainer_id], :except => [:created_at, :updated_at]}
    }, except: [:created_at, :updated_at])
  end

  def show
    trainer = Trainer.find(params[:id])

    options = {
        include: [:pokemons]
    }
    render json: TrainerSerializer.new(trainer, options)
  end

end
