def stock_picker(arr)
	a,b,max = 0,0,0;

	arr.each_index do |x|
		(x+1..arr.length-1).each do |y|
			difference = arr[y] - arr[x]
			if difference > max  
				max = difference
				a = x
				b = y
			end
		end
	end

	[a,b]
end

stock_picker([17,3,6,9,15,8,6,1,10])			#=> [1,4]