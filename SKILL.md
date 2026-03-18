---
name: prompt-optimizer
description: Optimize user prompts. Triggers when user asks to optimize prompts, improve prompts, write prompts, or inputs simple prompts. Analyzes and enhances prompts based on model capabilities, asks clarifying questions when user input is vague.
---

# Prompt Optimizer

Optimizes simple user prompts based on model capabilities to generate clearer, more specific, and more effective prompts. Actively asks clarifying questions in steps when user input is vague.

---

## Trigger Scenarios

Trigger this skill when user has the following intents:

- Explicitly asks to optimize prompts: "optimize this prompt", "improve this prompt", "make this better"
- Asks to write a prompt: "help me write a prompt", "give me a prompt"
- Expects improvement after inputting a simple prompt
- Expresses dissatisfaction with prompt results: "the output is not good", "not what I expected"

---

## Instructions

When detecting that user needs to optimize prompts, execute the following steps:

### 1. Analyze User Prompt

First analyze the user's prompt and check for the following issues:

- **Unclear objective**: No description of expected output or result
- **Missing context**: Lacks necessary background information
- **Missing constraints**: No constraints on format, length, style, etc.
- **Missing role**: No role specified for the AI
- **Missing examples**: Complex tasks lack example demonstrations

### 2. Determine if Clarification is Needed

**If user prompt is clear enough**, proceed directly to optimization.

**If user prompt is vague or incomplete**, ask clarifying questions in steps. Based on understanding of the prompt, ask **1-3** most critical questions:

Example clarifying questions:

- "Who is your target audience? (e.g., beginners, professionals, students)"
- "What is your expected output format? (e.g., code, article, list, table)"
- "Are there any specific constraints? (e.g., word limit, style requirements, must-include points)"
- "What scenario is this prompt for? (e.g., code generation, copywriting, data analysis, tutoring)"

**Note**: Don't ask too many questions at once. Focus on the 1-3 most critical questions.

### 3. Optimize Prompt

Based on user feedback and the original prompt, optimize using the following framework:

#### Prompt Optimization Framework

```markdown
# Role
You are a [specific role], skilled in [relevant skills]

# Task
[Clearly describe the task objective]

# Context
[Necessary background information]

# Constraints
- [Constraint 1]
- [Constraint 2]
- ...

# Output Format
[Desired output format and structure]

# Examples (optional)
Input example: ...
Expected output: ...
```

### 4. Provide Optimized Versions

Provide **1-2** optimized versions:

- **Standard version**: Generic, balanced optimization
- **Advanced version** (optional): Version with more detailed constraints and examples

Each version should:

- Preserve user's original intent
- Add necessary context and constraints
- Use clear structured format
- Be ready to use directly

### 5. Explain Optimizations

Briefly explain what optimizations were made and why:

- What elements were added
- Why these changes were made
- What the expected effects are

---

## Examples

### Example 1: Simple Prompt Optimization

**User input**: "optimize this: write a python function"

**Agent response**:
```
I'll help you optimize this prompt. Currently it's quite brief and I need more information:

1. What functionality should the function implement? (e.g., data processing, file operations, API calls)
2. What are the inputs and outputs?
3. Any specific requirements or constraints? (e.g., performance, error handling, code style)

Please provide these details and I'll generate a more complete prompt.
```

### Example 2: Medium Prompt Optimization

**User input**: "optimize: write a product description"

**Agent optimizes directly after analysis**:

```markdown
## Optimized Prompt (Standard Version)

You are a professional e-commerce copywriter, skilled in highlighting product selling points with concise and powerful language.

Please write a product description for the following:

- Product name: [Fill in]
- Target audience: [Fill in]
- Core features/selling points: [Fill in]

Requirements:
1. Highlight the core advantages and differentiating features
2. Use vivid, specific language, avoid empty adjectives
3. Include usage scenario descriptions to create user immersion
4. Keep word count between 150-200 characters

Output format:
- Title (within 15 characters, eye-catching)
- Body (3-4 selling points, 1-2 sentences each)
- Call to action (guide to purchase)
```

### Example 3: Code Generation Prompt Optimization

**User input**: "write a quicksort"

**Agent optimization**:

```markdown
I'll help you optimize this prompt to generate higher quality code:

## Optimized Prompt

You are a senior Python engineer, skilled in algorithm implementation and code teaching.

Please implement the quicksort algorithm in Python with the following requirements:

1. Implement a complete quicksort function with necessary parameter and return type annotations
2. Add detailed comments explaining key steps and algorithm principles
3. Handle edge cases (empty list, single element, duplicate elements, etc.)
4. Provide time and space complexity analysis
5. Include 2-3 usage examples

Output format:
- Algorithm principle introduction (1-2 sentences)
- Complete code implementation (with type annotations and comments)
- Complexity analysis
- Usage examples
```

---

## Best Practices

- **Keep it conversational**: Communicate with users in a friendly tone, not stiff
- **Step by step**: Complex prompts can be optimized iteratively over multiple rounds
- **Explain why**: Tell users why changes were made to help them learn
- **Preserve intent**: Optimization is not rewriting, stay faithful to user's original intent
- **Be flexible**: Adjust optimization strategy based on user feedback

---

## Notes

- If user explicitly wants a simple prompt, don't over-optimize
- For technical prompts, ensure terminology accuracy
- For creative prompts, leave enough room for creativity
- Always provide complete prompts ready to use directly