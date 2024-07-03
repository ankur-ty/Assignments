require 'rspec'
require './game'
include Game

require './player'
include Player

require './dice'
include Dice

RSpec.describe Game::GameClass do
  let(:num_players) { 3 }  # Change the number of players as needed
  let(:game) { Game::GameClass.new(num_players) }
  let(:dice) { instance_double(DiceClass) }  # Using instance_double for the DiceClass
  let(:num_players) { 3 }
  let(:game) { Game::GameClass.new(num_players) }
  let(:player1) { instance_double(Player::PlayerClass, name: "Player 1") }
  let(:player2) { instance_double(Player::PlayerClass, name: "Player 2") }
  let(:player3) { instance_double(Player::PlayerClass, name: "Player 3") }

  
  before do
    allow(DiceClass).to receive(:new).and_return(dice)
    allow(dice).to receive(:roll).and_return([1, 2, 3, 4, 5])  # Example roll result for testing
    allow(player1).to receive(:play)
    allow(player2).to receive(:play)
    allow(player3).to receive(:play)
    allow(game).to receive(:play_turn)  # Stub play_turn to avoid actual execution
    allow(game).to receive(:print_scores)  # Stub print_scores to avoid actual output
  end

  describe '#initialize' do
    it 'initializes with the correct number of players' do
      expect(game.instance_variable_get(:@players).size).to eq(num_players)
    end

    it 'initializes with players having scores initialized to 0' do
      game.instance_variable_get(:@players).each do |player|
        expect(game.instance_variable_get(:@player_score)[player]).to eq(0)
      end
    end
  end

  describe '#score' do
    it 'calculates score correctly based on dice values' do
      allow(dice).to receive(:values).and_return([1, 1, 1, 2, 3])
      expect(game.score).to eq(1000)
    end
  end

  describe '#get_nonscoring_num' do
    it 'returns the correct number of non-scoring dice' do
      allow(dice).to receive(:values).and_return([2, 2, 2, 4, 5])
      expect(game.get_nonscoring_num).to eq(1)
    end
  end

  describe '#final_round?' do
  it 'returns true if any player has 3000 points' do
    game.instance_variable_set(:@player_score, {
      player1 => 2500,
      player2 => 3100,
      player3 => 2800
    })

    expect(game.final_round?).to be true
  end

  it 'returns false if no player has 3000 points' do
    game.instance_variable_set(:@player_score, {
      player1 => 2500,
      player2 => 2800,
      player3 => 2700
    })

    expect(game.final_round?).to be false
  end
end

  describe '#get_winner' do
    it 'returns the player with the highest score' do
      player1 = game.instance_variable_get(:@players)[0]
      player2 = game.instance_variable_get(:@players)[1]
      game.instance_variable_get(:@player_score)[player1] = 2500
      game.instance_variable_get(:@player_score)[player2] = 3000
      expect(game.get_winner).to eq(player2)
    end
  end
end
