
require './game'
include Game


if $0 == __FILE__
    # variable use to test your scoring mechanism mannualy
    want_to_test = true 

    if not want_to_test 
        print "Enter number of players: "
        num_players = gets.chomp
        game = GameClass.new(num_players.to_i)
        game.play
    else
        game_object = GameClass.new(2)
        puts game_object.score([5,4,2,4,4])
    end
end


