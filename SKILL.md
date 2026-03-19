---
name: prompt-optimizer
description: Prompt 优化助手。适用于用户想优化提示词、改进 AI 指令、为特定任务设计更好的 prompt，或需要选择合适提示框架时使用。会根据任务场景匹配合适框架，必要时先追问关键信息，再输出更清晰、更可执行的提示词版本。
---

# Prompt Optimizer

帮助用户基于具体任务场景，选择合适的提示词框架，并生成更清晰、更可执行的 prompt。

---

## 设计模式

本 skill 主要采用：
- **Reviewer**：先判断用户现有 prompt 或任务描述的问题
- **Inversion**：信息不足时，先追问目标、受众、约束和格式
- **Generator**：基于选定框架生成优化后的 prompt

## Gotchas

- 不要一上来就套框架，先判断任务是否真的需要复杂框架
- 不要为了显得专业而过度设计简单 prompt
- 如果用户只想快速润色一句 prompt，不要强行输出一整套长模板
- 如果目标、受众、输出格式不清楚，先补最小必要问题
- 说明为什么选这个框架，比堆很多框架名更重要

## Trigger Scenarios

Trigger this skill when:

- User asks to optimize, improve, or enhance a prompt
- User inputs a vague or simple prompt
- User expresses dissatisfaction with AI outputs
- User asks for help writing prompts
- User wants to learn prompt engineering techniques

---

## Workflow

Copy this checklist and track your progress:
- [ ] Step 1: Analyze User Input
- [ ] Step 2: Match Scenario and Select Framework
- [ ] Step 3: Load Framework Details
- [ ] Step 4: Clarify Ambiguities
- [ ] Step 5: Generate Optimized Prompt
- [ ] Step 6: Present and Iterate

### Step 1: Analyze User Input

Receive the user's request, which may be:
- A raw prompt that needs optimization
- A task description or requirement
- A vague idea that needs to be turned into a prompt

### Step 2: Match Scenario and Select Framework

Identify the user's scenario and match the most suitable framework(s) based on:
- Application scenario alignment
- Task complexity (simple/medium/complex)
- Domain category (marketing, decision analysis, education, etc.)

**Framework Selection Guide by Complexity:**

| Complexity | Recommended Frameworks |
|------------|----------------------|
| Simple (≤3 elements) | APE, ERA, TAG, RTF, BAB, PEE, ELI5 |
| Medium (4-5 elements) | RACE, CIDI, SPEAR, SPAR, FOCUS, SMART, GOPA, ORID, CARE, ROSE, PAUSE, TRACE, GRADE, TRACI, RODES |
| Complex (6+ elements) | RACEF, CRISPE, SCAMPER, Six Thinking Hats, ROSES, PROMPT, RISEN, RASCEF, Atomic Prompting |

**Framework Selection Guide by Domain:**

| Domain | Recommended Frameworks |
|--------|----------------------|
| Marketing Content | BAB, SPEAR, Challenge-Solution-Benefit, BLOG, PROMPT, RHODES |
| Decision Analysis | RICE, Pros and Cons, Six Thinking Hats, Tree of Thought, PAUSE, What If |
| Education & Training | Bloom's Taxonomy, ELI5, Socratic Method, PEE, Hamburger Model |
| Product Development | SCAMPER, HMW, CIDI, RELIC, 3Cs Model |
| AI Dialogue/Assistant | COAST, ROSES, TRACE, RACE, RASCEF |
| Writing & Creation | BLOG, 4S Method, Hamburger Model, Few-shot, RHODES, Chain of Destiny |
| Image Generation | Atomic Prompting |
| Quick Simple Tasks | Zero-shot, ERA, TAG, APE, RTF |
| Complex Reasoning | Chain of Thought, Tree of Thought |

### Step 3: Clarify Ambiguities

Before generating the final prompt, verify with the user:

1. **Goal Clarity**: Is the intended outcome clear?
2. **Target Audience**: Who will receive the AI's response?
3. **Context Completeness**: Is sufficient background information provided?
4. **Format Requirements**: Are there specific output format needs?
5. **Constraints**: Are there any limitations or restrictions?

Ask clarifying questions if any information is missing, ambiguous, incomplete, or contradictory.

Example clarifying questions:
- "What specific outcome are you hoping to achieve?"
- "Who is the target audience for this content?"
- "Are there any format or length requirements?"
- "What context should the AI consider?"

### Step 4: Generate Optimized Prompt

Apply the selected framework to create the final prompt:

1. Structure the prompt according to framework components
2. Incorporate all clarified information
3. Ensure clarity and specificity
4. Include relevant examples if the framework requires
5. Add any necessary constraints or guidelines

### Step 5: Present and Iterate

Present the optimized prompt to the user with:
1. The selected framework name and why it was chosen
2. The complete optimized prompt
3. Explanation of how each framework element was applied
4. Suggestions for potential variations or improvements

If the user requests changes, iterate on the prompt while maintaining framework structure.

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

## Prompt Templates

### Standard Template (基于 CLARITY 框架)

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

## Quick Reference: Framework Selection

| User Says | Recommended Framework |
|-----------|----------------------|
| "I need a simple prompt" | APE, ERA, TAG |
| "I want to persuade/sell" | BAB, SPEAR, Challenge-Solution-Benefit |
| "I need to analyze/decide" | RICE, Pros and Cons, Chain of Thought |
| "I want to teach/explain" | ELI5, Bloom's Taxonomy, Socratic Method |
| "I need creative ideas" | SCAMPER, HMW, SPARK, Imagine |
| "I want structured writing" | BLOG, 4S Method, Hamburger Model |
| "I need step-by-step reasoning" | Chain of Thought, Tree of Thought |
| "I'm generating images" | Atomic Prompting |
| "I need a detailed plan" | RISEN, RASCEF, CRISPE |

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

- Always preserve the user's original intent / 始终保留用户的原始意图
- Don't over-engineer simple prompts / 不要过度设计简单提示词
- Explain why each optimization was made / 解释每个优化的原因
- Offer multiple versions when appropriate (basic, enhanced, expert) / 适当时提供多个版本
- Encourage iterative refinement / 鼓励迭代优化

---

## References

Framework details can be found in:
- [Frameworks Summary](references/Frameworks_Summary.md) - 57 个框架的完整列表和应用场景
- Individual framework files in `references/frameworks/` directory