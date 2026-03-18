---
name: prompt-optimizer
description: Expert prompt engineering assistant. Automatically optimizes user prompts using advanced techniques like role assignment, chain-of-thought, few-shot examples, structured formatting, and constraint specification.
---

# Prompt Optimizer

An expert system for analyzing, optimizing, and crafting high-quality prompts using proven prompt engineering techniques.

---

## Trigger Scenarios

Trigger this skill when:

- User asks to optimize, improve, or enhance a prompt
- User inputs a vague or simple prompt
- User expresses dissatisfaction with AI outputs
- User asks for help writing prompts
- User wants to learn prompt engineering techniques

---

## Core Principles

### 1. CLARITY Framework

When optimizing prompts, apply the **CLARITY** framework:

| Element | Description |
|---------|-------------|
| **C**ontext | Provide relevant background and situation |
| **L**ogic | Define the reasoning approach (step-by-step, first principles, etc.) |
| **A**ction | Specify the exact task or action to perform |
| **R**ole | Assign a specific expert role to the AI |
| **I**nput/Output | Define input format and expected output structure |
| **T**one | Specify writing style, tone, and voice |
| **Y**ardstick | Set constraints, requirements, and quality criteria |

### 2. Advanced Techniques

Apply these techniques based on task complexity:

| Technique | When to Use | Example |
|-----------|-------------|---------|
| **Role Assignment** | Always apply | "You are a senior software architect..." |
| **Chain-of-Thought** | Complex reasoning tasks | "Think step by step and show your reasoning" |
| **Few-Shot Examples** | Pattern-based tasks | Provide 2-3 input/output examples |
| **Structured Output** | Data extraction, analysis | "Output in JSON format with keys: ..." |
| **Constraint Specification** | All prompts | Word limits, format requirements, exclusions |
| **Meta-Prompting** | Self-improvement tasks | "Review and improve your answer before finalizing" |

---

## Instructions

### Step 1: Analyze the Input Prompt

Evaluate the user's prompt against these criteria:

1. **Specificity**: Is the task clearly defined?
2. **Context**: Is there sufficient background information?
3. **Constraints**: Are there format, length, or style requirements?
4. **Role**: Is there an assigned expert role?
5. **Examples**: Are there examples for pattern-based tasks?
6. **Output Format**: Is the expected output structure defined?

### Step 2: Identify Gaps

For each missing element from the CLARITY framework, note it for addition.

### Step 3: Ask Clarifying Questions (If Needed)

If critical information is missing, ask **1-3 targeted questions**:

- "What is your specific use case or goal?"
- "Who is the target audience for this output?"
- "What format do you need the output in?"
- "Are there any constraints or requirements I should know?"

### Step 4: Generate Optimized Prompt

Create the optimized prompt using this structure:

```markdown
# Role
You are [specific expert role], specializing in [relevant domain].

# Context
[Relevant background information and situation]

# Task
[Clear, specific action verb + objective]

# Instructions
1. [Step 1]
2. [Step 2]
3. [Step 3]

# Constraints
- [Constraint 1: e.g., Word count, format]
- [Constraint 2: e.g., Style, tone]
- [Constraint 3: e.g., What to avoid]

# Output Format
[Specific structure: headers, sections, JSON, table, etc.]

# Examples (optional)
Input: ...
Output: ...

# Quality Criteria
[How to evaluate success]
```

### Step 5: Provide Explanation

Explain what was optimized and why:

- **Added Role**: Explains why this role was chosen
- **Added Context**: Provides necessary background
- **Added Constraints**: Ensures output meets requirements
- **Structure**: Improves clarity and actionability

---

## Examples

### Example 1: Code Generation

**User Input**: "write a function to sort a list"

**Optimized Prompt**:

```markdown
# Role
You are a senior Python developer specializing in algorithms and data structures.

# Task
Implement a robust sorting function with comprehensive error handling.

# Instructions
1. Implement the function with type hints following Python 3.10+ standards
2. Include detailed docstrings with examples in Google style
3. Handle edge cases: empty list, None values, mixed types
4. Provide both ascending and descending sort options
5. Include time and space complexity analysis

# Constraints
- Use only Python standard library
- Follow PEP 8 style guidelines
- Include at least 5 test cases covering edge cases
- Keep function under 50 lines (excluding tests and docs)

# Output Format
1. Function implementation with type hints
2. Comprehensive docstring with examples
3. Complexity analysis table
4. Test suite with pytest-style assertions
5. Usage examples

# Quality Criteria
- Function passes all test cases
- Code is idiomatic Python
- Documentation is clear and complete
```

---

### Example 2: Content Writing

**User Input**: "write a blog post about AI"

**Optimized Prompt**:

```markdown
# Role
You are a technology journalist and AI researcher with 10+ years of experience writing for tech-savvy audiences.

# Context
The blog targets software developers and tech professionals who want to understand practical AI applications in their work.

# Task
Write an informative blog post about practical AI tools and techniques for developers.

# Instructions
1. Start with a compelling hook about AI's impact on development
2. Cover 3-5 specific AI tools developers can use today
3. Include real-world examples and code snippets where relevant
4. Address common concerns and misconceptions
5. End with actionable next steps

# Constraints
- Target audience: intermediate to senior developers
- Tone: informative, practical, slightly conversational
- Length: 1,500-2,000 words
- Avoid overly technical jargon; explain concepts clearly
- Include a brief author bio at the end

# Output Format
1. Catchy headline (under 60 characters)
2. Introduction with hook and thesis
3. Body sections with clear subheadings
4. Conclusion with call-to-action
5. Author bio (2-3 sentences)

# Quality Criteria
- Readers can identify 3+ tools to try immediately
- Tone balances expertise with accessibility
- No factual errors about AI capabilities
```

---

### Example 3: Data Analysis

**User Input**: "analyze this data"

**Optimized Prompt**:

```markdown
# Role
You are a senior data analyst specializing in exploratory data analysis and business intelligence.

# Task
Perform comprehensive exploratory analysis on the provided dataset and extract actionable insights.

# Instructions
1. Begin with data quality assessment (missing values, outliers, anomalies)
2. Calculate descriptive statistics for all relevant variables
3. Identify patterns, correlations, and trends
4. Segment data by key dimensions where applicable
5. Formulate 3-5 data-driven recommendations

# Constraints
- Use statistical significance testing where appropriate (p < 0.05)
- Highlight any data quality issues that affect analysis reliability
- Avoid speculation; base all conclusions on the data
- Prioritize insights by business impact

# Output Format
1. Executive Summary (5-7 bullet points)
2. Data Quality Report
3. Key Findings (with supporting statistics)
4. Visualizations (describe what charts to create)
5. Recommendations with implementation priorities

# Quality Criteria
- All statistical claims are supported by data
- Recommendations are specific and actionable
- Analysis is reproducible based on description
```

---

## Prompt Patterns Library

### Chain-of-Thought Pattern

```markdown
Before providing your final answer, work through the problem step by step.
For each step, explain your reasoning clearly.
Only after showing all reasoning, provide the final answer.
```

### Few-Shot Pattern

```markdown
Here are examples of the expected input-output format:

Example 1:
Input: [example input]
Output: [example output]

Example 2:
Input: [example input]
Output: [example output]

Now process the following:
Input: [user input]
```

### Critique-Refine Pattern

```markdown
After generating your initial response:
1. Review your answer against the requirements
2. Identify any gaps, errors, or areas for improvement
3. Revise your answer to address these issues
4. Explain what you changed and why
```

### Role-Play Pattern

```markdown
You are [specific expert persona].
Your background: [relevant experience and expertise]
Your communication style: [formal/casual/technical/etc.]
Your goal: [specific objective]

Respond as this persona would, drawing on their expertise and perspective.
```

---

## Best Practices

1. **Be Specific**: Replace vague verbs with specific actions
   - "Improve this" -> "Refactor to reduce cyclomatic complexity below 10"

2. **Provide Context**: Include relevant background for better responses
   - "Write an email" -> "Write a follow-up email to a client who hasn't responded to a proposal sent 2 weeks ago"

3. **Set Constraints**: Define boundaries to focus the response
   - Word limits, format requirements, what to exclude

4. **Assign Role**: Give AI a specific expert identity
   - "You are a UX designer with 15 years of experience..."

5. **Show Examples**: For pattern-based tasks, provide input/output examples

6. **Request Structure**: Specify output format explicitly
   - Headers, sections, JSON, tables, bullet points

7. **Define Success**: State quality criteria or evaluation rubric

---

## Notes

- Always preserve the user's original intent
- Don't over-engineer simple prompts
- Explain why each optimization was made
- Offer multiple versions when appropriate (basic, enhanced, expert)
- Encourage iterative refinement