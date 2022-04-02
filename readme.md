# Functional programming

From reading Functional-Light JS, it seems to me that functional programming is about these points:

- Function purity. Do not have side-effects/side-causes in your functions
- Treat values as immutable. Do not mutate objects such as records and arrays but instead return new objects whose values are different.
- Know how to use list operations mainly map, filter and reduce.
- Avoid using impure functions such as array.push that mutate the object they work on.