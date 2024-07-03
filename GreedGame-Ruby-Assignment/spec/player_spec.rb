require 'rspec'
require './player'
include Player

RSpec.describe Player::PlayerClass do
    let(:dice) { double("dice") }  # test double for the Dice object
    
    describe '#initialize' do
      it 'initializes with a name and score' do
        player = Player::PlayerClass.new(1, dice)
        expect(player.name).to eq("Player 1")
        expect(player.score).to eq(0)
      end
    end
    
    describe '#play' do
      it 'calls roll on dice with the correct number of dice' do
        expect(dice).to receive(:roll).with(5)  # Assuming 5 dice for this test
        player = Player::PlayerClass.new(1, dice)
        player.play(5)
      end
    end
    
  end
