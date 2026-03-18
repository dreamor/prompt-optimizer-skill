# Prompt Engineering Expert

Expert prompt engineering assistant for Claude Code. Automatically optimizes user prompts using advanced techniques like role assignment, chain-of-thought, few-shot examples, and structured formatting.

---

## Features

- **CLARITY Framework**: Systematic approach covering Context, Logic, Action, Role, Input/Output, Tone, and Yardstick
- **Advanced Techniques**: Chain-of-thought, few-shot examples, structured output, constraint specification
- **Pattern Library**: Reusable patterns for common scenarios
- **Multi-Domain Support**: Code generation, content writing, data analysis, and more
- **Educational**: Explains why each optimization was made

---

## Installation

```bash
# Clone repository locally
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# Install in Claude Code
cd ~/.claude/skills/
ln -s /path/to/prompt-optimizer-skill prompt-engineering-expert
```

---

## Usage

In Claude Code conversation:

- Say "optimize this prompt: [your prompt]"
- Or "improve this: [your prompt]"
- Or use `/prompt-engineering-expert` command

---

## The CLARITY Framework

| Element | Description |
|---------|-------------|
| **C**ontext | Provide relevant background and situation |
| **L**ogic | Define the reasoning approach |
| **A**ction | Specify the exact task or action |
| **R**ole | Assign a specific expert role |
| **I**nput/Output | Define input format and expected output |
| **T**one | Specify writing style, tone, and voice |
| **Y**ardstick | Set constraints, requirements, and quality criteria |

---

## Example

### Before
```
write a function to sort a list
```

### After
```markdown
# Role
You are a senior Python developer specializing in algorithms and data structures.

# Task
Implement a robust sorting function with comprehensive error handling.

# Instructions
1. Implement with type hints following Python 3.10+ standards
2. Include detailed docstrings with examples in Google style
3. Handle edge cases: empty list, None values, mixed types
4. Provide both ascending and descending sort options
5. Include time and space complexity analysis

# Constraints
- Use only Python standard library
- Follow PEP 8 style guidelines
- Include at least 5 test cases
- Keep function under 50 lines (excluding tests)

# Output Format
1. Function implementation with type hints
2. Comprehensive docstring with examples
3. Complexity analysis table
4. Test suite with pytest-style assertions
5. Usage examples
```

---

## Prompt Patterns

### Chain-of-Thought
```markdown
Think step by step and show your reasoning before providing the final answer.
```

### Few-Shot Examples
```markdown
Example 1:
Input: ...
Output: ...

Now process: [user input]
```

### Critique-Refine
```markdown
After generating your answer, review it for gaps and improve before finalizing.
```

---

## License

MIT