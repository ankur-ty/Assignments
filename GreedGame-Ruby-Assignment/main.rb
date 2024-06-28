
require './game'
include Game

print "Enter number of players: "
num_players = gets.chomp
game = GameClass.new(num_players.to_i)
game.play

