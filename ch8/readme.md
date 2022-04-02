# Recursion

Recursion is when a function calls itself, and that call does the same and this
cycle continues until a base condition is satisfied.


Binary recursion is when a function calls itself recursively twice, ie in two different places.

Mutual recursion is when two or more functions recursively call one another. ie, 
one function calls the other and that function calls the function that calls it etc
until a base condition is reached.

Proper tail calls allow for tail call optimization. Proper tail calls require that
the next function being called is called at the return value of the function doing the calling.

Continuation Passing Style is when we provide a callback as argument that is to be called by a function when
it finishes its work.

