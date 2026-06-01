# Zero-Shot Prompting Framework

## Name
Zero-Shot Prompting Framework

## Structure
- **Task**: Directly describe the task
- **Instructions**: Clear execution instructions
- **Format**: Output format requirements (optional)

## Use Cases
- Rapid prototyping and testing
- General knowledge queries
- Simple task execution
- Creative generation
- Text summarization
- Basic classification tasks

## Example
**Input**: "Summarize this news article"

**Optimized**:
```
Task: Summarize the main points of the following news article

Instructions:
1. Extract the core event of the article
2. Identify key people and locations
3. Summarize the impact and significance of the event
4. Remain objective — do not add personal opinions

Format:
- Headline: [One-sentence summary]
- Key points: 3-5 bullet points
- Impact: [Potential impact of the event]

News content:
[Paste news content here]
```

## Usage Tips
- No examples need to be provided
- Best suited for tasks the LLM already has the capability to handle
- Keep instructions clear and specific
