
module Player
  class PlayerClass
    attr_reader :name
    attr_accessor :score

    def initialize(i,dice)
      @name = "Player "+i.to_s
      @dice = dice
      @score = 0
    end

    def play(num_of_dices)
      values = @dice.roll(num_of_dices)
    end
  

  end
end  
      

    
