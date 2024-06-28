module Dice
  class DiceClass
    attr_reader :values
 
    def initialize
      @values = []
    end

   def to_s
     st = ""
     @values.each { |x| 
       st += "#{x}, "
     }
     st = st.chomp(", ")
   end

    def roll(n)
      @values = []
      n.times { @values << rand(1..6) }
    end
  end
end