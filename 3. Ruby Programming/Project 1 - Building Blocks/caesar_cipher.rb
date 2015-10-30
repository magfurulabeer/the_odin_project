def caesar_cipher(string, num)

	alphanumeral = Hash.new
	('a'..'z').each do |x|
		place = alphanumeral.length + 1
		alphanumeral[x] = place
	end

	letters = string.chars

	letters.map! do |x|
		if /\W/ === x || /\d/ === x
			x = x
		else 
			position = alphanumeral[x.downcase].to_i
			position += num
			position -= 26 if position > 26
			x == x.downcase ? x = alphanumeral.key(position) : x = alphanumeral.key(position).upcase
		end
	end

	letters.join
end

# TEST

caesar_cipher("What a string!", 5)				# => "Bmfy f xywnsl!"