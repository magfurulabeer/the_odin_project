dictionary = ["below","down","go","going","horn","how","howdy","it","i","low","own","part","partner","sit"]

def substrings(str, arr)
	matches = Hash.new
	arr.each do |x|
		
		if str.downcase.include?(x)
			count = 0
			string = str.downcase
			while string.include?(x)
				string.sub!(x, "")
				count += 1
			end

			matches[x] = count
		end
	end

	matches
end

substrings("Howdy partner, sit down! How's it going?", dictionary)
#=> {"down"=>1, "how"=>2, "howdy"=>1,"go"=>1, "going"=>1, "it"=>2, "i"=> 3, "own"=>1,"part"=>1,"partner"=>1,"sit"=>1}