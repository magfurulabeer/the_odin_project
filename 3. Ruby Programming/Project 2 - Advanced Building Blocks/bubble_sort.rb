def bubble_sort(arr)
	(2..arr.length-1).each do |n|
		(0..arr.length-n).each do |i|
			arr[i], arr[i+1] = arr[i+1], arr[i] if arr[i] > arr[i+1]
		end
	end

	arr
end

def bubble_sort_by(arr)
	(2..arr.length-1).each do |n|
		(0..arr.length-n).each do |i|
			arr[i], arr[i+1] = arr[i+1], arr[i] if (yield arr[i], arr[i+1]) < 0 

		end
	end

	arr
end #Issue: If you add 'h' to end, it isnt sorted to the beginning


bubble_sort([4,3,78,2,0,2])
#    => [0,2,2,3,4,78]

bubble_sort_by(["hi","hello","hey"]) do |left,right|
	left.length - right.length
end
#    => ["hi", "hey", "hello"]