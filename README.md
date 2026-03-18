# Prompt Optimizer Skill

Claude Code Prompt Optimization Skill - Optimizes simple user prompts based on model capabilities.

---

## Features

- **Intelligent Analysis**: Checks for missing objectives, context, constraints, roles, and other elements
- **Step-by-step Clarification**: Asks only 1-3 most critical questions when information is insufficient
- **Structured Optimization**: Uses Role/Task/Context/Constraints/Output framework
- **Multiple Versions**: Provides standard and advanced versions (optional)
- **Explanation**: Explains what improvements were made and why

---

## Installation

```bash
# Clone repository locally
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# Install in Claude Code
cd ~/.claude/skills/
ln -s /path/to/prompt-optimizer-skill prompt-optimizer
```

---

## Usage

In Claude Code conversation:

- Simply say "optimize this prompt: xxx"
- Or "improve this prompt"
- Or use the `/prompt-optimizer` command

---

## Examples

### Input
```
write a quicksort
```

### Optimized

```markdown
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

## Trigger Scenarios

This skill is automatically triggered when user has the following intents:

- Explicitly asks to optimize prompts: "optimize this prompt", "improve this prompt"
- Asks to write a prompt: "help me write a prompt", "give me a prompt"
- Expects improvement after inputting a simple prompt
- Expresses dissatisfaction with prompt results: "the output is not good", "not what I expected"

---

## License

MIT