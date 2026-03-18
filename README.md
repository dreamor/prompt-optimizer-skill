# Prompt Optimizer Skill

Claude Code 提示词优化技能 - 基于模型能力优化用户输入的简单提示词。

Claude Code Prompt Optimization Skill - Optimizes simple user prompts based on model capabilities.

---

## 功能特点 | Features

- **智能分析**：检查提示词是否缺少目标、上下文、约束、角色等元素
- **Intelligent Analysis**: Checks for missing objectives, context, constraints, roles, and other elements
- **分步澄清**：如果信息不足，只问 1-3 个最关键的问题
- **Step-by-step Clarification**: Asks only 1-3 most critical questions when information is insufficient
- **结构化优化**：使用 Role/Task/Context/Constraints/Output 框架优化
- **Structured Optimization**: Uses Role/Task/Context/Constraints/Output framework
- **多版本提供**：提供标准版和进阶版（可选）
- **Multiple Versions**: Provides standard and advanced versions (optional)
- **解释优化点**：说明做了哪些改进及原因
- **Explanation**: Explains what improvements were made and why

---

## 安装 | Installation

```bash
# 克隆仓库到本地 | Clone repository locally
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# 在 Claude Code 中安装 | Install in Claude Code
cd ~/.claude/skills/
ln -s /path/to/prompt-optimizer-skill prompt-optimizer
```

---

## 使用方法 | Usage

在 Claude Code 对话中：

In Claude Code conversation:

- 直接说「优化这个提示词：xxx」
- Simply say "optimize this prompt: xxx"
- 或「帮我改进这个 prompt」
- Or "improve this prompt"
- 或使用 `/prompt-optimizer` 命令
- Or use the `/prompt-optimizer` command

---

## 示例 | Examples

### 输入 | Input
```
写个快排
Write a quicksort
```

### 优化后 | Optimized

```markdown
你是一位资深 Python 工程师，擅长算法实现和代码教学。
You are a senior Python engineer, skilled in algorithm implementation and code teaching.

请用 Python 实现快速排序算法，要求：
Please implement the quicksort algorithm in Python with the following requirements:

1. 实现完整的快速排序函数，包含必要的参数和返回值类型注解
   Implement a complete quicksort function with necessary parameter and return type annotations
2. 添加详细的注释，解释关键步骤和算法原理
   Add detailed comments explaining key steps and algorithm principles
3. 处理边界情况（空列表、单元素、重复元素等）
   Handle edge cases (empty list, single element, duplicate elements, etc.)
4. 提供时间复杂度和空间复杂度分析
   Provide time and space complexity analysis
5. 包含 2-3 个使用示例
   Include 2-3 usage examples

输出格式 | Output format:
- 算法原理简介（1-2 句话） | Algorithm principle introduction (1-2 sentences)
- 完整代码实现（带类型注解和注释） | Complete code implementation (with type annotations and comments)
- 复杂度分析 | Complexity analysis
- 使用示例 | Usage examples
```

---

## 触发场景 | Trigger Scenarios

当用户有以下意图时，会自动触发此技能：

This skill is automatically triggered when user has the following intents:

- 明确要求优化提示词：「优化这个 prompt」、「帮我改进提示词」
- Explicitly asks to optimize prompts: "optimize this prompt", "improve this prompt"
- 要求写提示词：「帮我写个提示词」、「给我一个 prompt」
- Asks to write a prompt: "help me write a prompt", "give me a prompt"
- 输入简单提示词后期望改进
- Expects improvement after inputting a simple prompt
- 表达对提示词效果不满意：「效果不好」、「生成的内容不够好」
- Expresses dissatisfaction with prompt results: "the output is not good", "not what I expected"

---

## License

MIT