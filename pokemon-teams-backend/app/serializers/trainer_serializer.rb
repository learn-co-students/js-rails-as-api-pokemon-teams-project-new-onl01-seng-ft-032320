class TrainerSerializer
    def initialize(trainer_object)
        @trainer = trainer_object
    end

    def to_serialized_json(options)
        @trainer.to_json(options)
    end
end
