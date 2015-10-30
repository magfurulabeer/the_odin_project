module Enumerable
	def my_each
		i = 0
		while i < self.size
			yield self[i]
			i += 1
		end
	end

	def my_each_with_index
		i = 0
		while i < self.size
			yield self[i], i
			i += 1
		end
	end

	def my_select
	end

	def my_all?
		i = 0
		all = true
		while i < self.size
			unless yield self[i]
				all = false
				break
			else
				i += 1
			end
			
		end
		all
	end

	def my_none?
		i = 0
		none = true
		while i < self.size
			if yield self[i]
				none = false
				break
			else
				i += 1
			end
			
		end
		none
	end

	def my_count(query = nil)
		count = 0
		i = 0
		if block_given?
			while i < self.size
				count += 1 if yield self[i]
				i += 1
			end			
		elsif query != nil
			while i < self.size
				count += 1 if self[i] == query
				i += 1
			end
		else
			while i < self.size
				count += 1
				i += 1
			end
		end
		count
	end

	def my_map
		arr = self if self == array
		i = 0
		while i < arr.size
			arr[i] = yield arr [i]
			i += 1
		end	
		arr	
	end

	def my_map!
		i = 0
		while i < self.size
			self[i] = yield self [i]
			i += 1
		end	
		self	
	end

	def my_inject(initial = nil, sym = nil)
		result = 0
		if block_given?
			if (initial != nil) && (initial.is_a? Numeric)
				result = initial
				i = 0
				while i < self.size
					yield result, self[i]
					i += 1
				end
			else
				result = self[0]
				i = 1
				while i < self.size
					yield result, self[i]
					i += 1
				end
			end
		elsif (initial.is_a? Symbol) && sym == nil
			result = self[0]
			i = 1
			while i < self.size
				initial.to_proc.call result, self[i]
				i += 1
			end
		elsif (initial.is_a? Numeric) && (sym.is_a? Symbol)
			sym.to_proc
			result = initial
			i = 0
			while i < self.size
				sym.call result, self[i]
				i += 1
			end
		end
		result
	end


end