# RISE Framework

## Name
Reflect-Inquire-Suggest-Elevate

## Structure
- **Reflect**: Reflect/summarize the current situation
- **Inquire**: Ask/explore the problem
- **Suggest**: Suggest/provide solutions
- **Elevate**: Elevate/encourage improvement

## Use Cases
- Giving feedback
- Performance review communication
- Mentoring and coaching
- Code review
- Work critique
- Constructive criticism

## Example
**Input**: "Code review feedback for a team member"

**Optimized**:
```
Reflect:
I reviewed the shopping cart module code you submitted. The overall structure is clear, the functionality is complete, and test coverage reaches 85%. I especially appreciate your handling of edge cases — scenarios like an empty cart and insufficient inventory are all accounted for.

Inquire:
I noticed a few areas I'd like to discuss with you:
1. The nested loop on line 45 — have you considered the performance impact? What would happen if the cart had 1,000 items?
2. The error handling section uses a generic Exception — are there more specific exception types that could be used?
3. Could the variable names `tmp` and `data` be more descriptive?

Suggest:
Based on the above, I have the following suggestions:
1. Performance optimization:
   - Consider using generators instead of lists
   - Add pagination to handle large batches of items
   - Add performance test cases

2. Error handling:
   - Create custom exception classes (e.g., InsufficientStockException)
   - Add error codes to facilitate frontend handling
   - Log detailed error information

3. Code readability:
   - `tmp` → `cartItem`
   - `data` → `productDetails`
   - Add function docstrings

Elevate:
Your code quality has been steadily improving, and the design patterns used this time are excellent. Once these issues are fixed, this will be a great code example. I suggest we organize a team sharing session after you complete the revisions so others can learn from your implementation approach.

Looking forward to your revised version!
```

## Usage Tips
- Reflect should be sincere and specific, not hollow
- Inquire using questions rather than accusations
- Suggest should be actionable
- Elevate should inspire confidence and motivation
