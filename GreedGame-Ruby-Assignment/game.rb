
require './player'
include Player

require './dice'
include Dice

module Game
  class GameClass
  
    def initialize(num_players)
      @players = []
      @player_score = {}
      @dice = DiceClass.new
      count = 1
      num_players.times { 
        p = PlayerClass.new(count,@dice)
        @players << p
        @player_score[p] = 0
        count += 1
      }
    end

    #scoring method for every roll
    def score(dice_values=nil)
      curr_score = 0
      v = dice_values || @dice.values
      counts = Hash.new(0)
      v.each do |value|
        counts[value] += 1
      end
      
      counts.each do |item,numFound|
        # 1,1,1 = 1000 points
        if item == 1 && numFound >= 3 then
          curr_score += 1000
          numFound -= 3
        end
        
        # any number other than 1, found 3 times is that number times 
        # 2,2,2 = 2*100 = 200 etc
        if item != 1 && numFound >= 3 then
          curr_score += item * 100
          numFound -= 3
        end
        
        # 1 (not part of set) = 100 points for each found
        if item == 1 && numFound <= 2 then 
          curr_score += 100 * numFound
        end
        
        # 5 (not part of set) = 50 points for each found
        if item == 5 && numFound <=2 then
          curr_score += 50 * numFound
        end
      end
  
      curr_score
    end

    def take_input_to_play_again(player,cur_num)
      print "Do you want to roll the non-scoring #{cur_num} dice? (y/n): "
      choice = gets.chomp.downcase
    end

    def get_nonscoring_num
      count = 0
      v = @dice.values.sort
      i = 0
      while i < v.length
        if v[i] == v[i+1] && v[i+1] == v[i+2]
          i += 3
        elsif (v[i] != 1  && v[i] != 5)
          i += 1
          count += 1
        else
          i += 1
        end
      end
      count = 5 if count == 0
      count
    end

    def play_turn(player)
      player.play(5)
      sleep 1
      cur_score = score
      print "#{player.name} rolls: " + @dice.to_s+"\n"
      print "Score in this round: #{score} \n"
      print "Total score: #{@player_score[player]}\n"
      if cur_score != 0
        loop do
          n = get_nonscoring_num
          choice = take_input_to_play_again(player,n)
          if choice == 'y'
            player.play(n)
            print "#{player.name} rolls: " + @dice.to_s + "\n"
            new_score = score
            if new_score == 0
              cur_score = 0
              print "Score in this round: #{new_score} \n"
              print "Total score: #{@player_score[player]}\n"
              break
            end
            cur_score += new_score
            print "Score in this round: #{new_score} \n"
            print "Total score: #{@player_score[player]}\n"
          else 
            if (@player_score[player] >= 300 || cur_score >=300) 
              @player_score[player] += cur_score
            end
            break
          end
        end
      end
    end        
    
    def final_round?
      @player_score.each_value { |x| 
        return true if x >= 3000
      }
      return false
    end

    def get_winner
      m = -1
      winner = nil
      @player_score.each { |k,v| 
        if m < v
          m = v
          winner = k
        end
      }
      winner
    end

    def print_scores
       print "############################################################\n"
       @player_score.each { |k,v|
         puts "#{k.name}'s score at the end of this round is .. #{v}"
       }
       print "############################################################\n"
    end

    def play
      turn = 1
      loop do
        print "Turn #{turn}\n"
        print "------------\n"
        @players.each { |x|
          play_turn(x)
          print "\n"
        }
        turn += 1
        break if final_round? 
      end

      print "Final round\n"
      print "-----------\n"
      @players. each { |x|
        if @player_score[x] < 3000
          play_turn(x)
        end
      }
      winner = get_winner
      print "winner is #{winner.name} .. score is " + @player_score[winner].to_s + "\n"
    end
  end
end       
