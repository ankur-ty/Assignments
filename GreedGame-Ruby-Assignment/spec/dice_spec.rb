require 'rspec'
require './dice'
include Dice

RSpec.describe 'DiceClass' do
    before(:each) do
      @dice = DiceClass.new
    end
    
    describe '#initialize' do
      it 'initializes with an empty array of values' do
        expect(@dice.values).to eq([])
      end
    end
    
    describe '#roll' do
      it 'rolls the dice and updates the values' do
        @dice.roll(5)
        expect(@dice.values.length).to eq(5)
        @dice.values.each do |value|
          expect(value).to be_between(1, 6).inclusive
        end
      end
      
      it 'clears previous values and rolls new values' do
        @dice.roll(3)
        initial_values = @dice.values.dup
        
        @dice.roll(3)
        new_values = @dice.values
        
        expect(new_values).not_to eq(initial_values)
      end
    end
    
    describe '#to_s' do
      it 'returns a string representation of dice values' do
        @dice.roll(4)
        expect(@dice.to_s).to match(/^\d, \d, \d, \d$/)
      end
      
      it 'returns an empty string if no values are present' do
        expect(@dice.to_s).to eq("")
      end
    end
  end

