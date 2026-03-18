---
name: prompt-optimizer
description: 优化用户的提示词 | Optimize user prompts. Triggers when user asks to optimize prompts, improve prompts, write prompts, or inputs simple prompts. Analyzes and enhances prompts based on model capabilities, asks clarifying questions when user input is vague.
---

# 提示词优化器 | Prompt Optimizer

基于模型能力对用户输入的简单提示词进行优化，生成更清晰、更具体、更有效的提示词。如果用户描述不够清楚，会主动分步与用户澄清。

Optimizes simple user prompts based on model capabilities to generate clearer, more specific, and more effective prompts. Actively asks clarifying questions in steps when user input is vague.

---

## 触发场景 | Trigger Scenarios

当用户有以下意图时，应触发此技能：

Trigger this skill when user has the following intents:

- 明确要求优化提示词：「优化这个 prompt」、「帮我改进提示词」、「优化一下这句话」
- Explicitly asks to optimize prompts: "optimize this prompt", "improve this prompt", "make this better"
- 要求写提示词：「帮我写个提示词」、「给我一个 prompt」
- Asks to write a prompt: "help me write a prompt", "give me a prompt"
- 输入简单提示词后期望改进
- Expects improvement after inputting a simple prompt
- 表达对提示词效果不满意：「效果不好」、「生成的内容不够好」
- Expresses dissatisfaction with prompt results: "the output is not good", "not what I expected"

---

## Instructions

当检测到用户需要优化提示词时，按以下步骤执行：

When detecting that user needs to optimize prompts, execute the following steps:

### 1. 分析用户提示词 | Analyze User Prompt

首先分析用户输入的提示词，检查是否存在以下问题：

First analyze the user's prompt and check for the following issues:

- **目标不明确**：没有说明期望的输出或结果
- **Unclear objective**: No description of expected output or result
- **缺少上下文**：缺少必要的背景信息
- **Missing context**: Lacks necessary background information
- **缺少约束**：没有格式、长度、风格等约束
- **Missing constraints**: No constraints on format, length, style, etc.
- **角色缺失**：没有指定 AI 应该扮演的角色
- **Missing role**: No role specified for the AI
- **示例缺失**：复杂任务缺少示例说明
- **Missing examples**: Complex tasks lack example demonstrations

### 2. 判断是否需要澄清 | Determine if Clarification is Needed

**如果用户提示词足够清晰**，直接进入优化步骤。

**If user prompt is clear enough**, proceed directly to optimization.

**如果用户提示词模糊或不完整**，需要分步澄清。根据对提示词的理解，提出 **1-3 个** 最关键的问题：

**If user prompt is vague or incomplete**, ask clarifying questions in steps. Based on understanding of the prompt, ask **1-3** most critical questions:

澄清问题示例：

Example clarifying questions:

- 「请问你的目标受众是谁？（如：初学者、专业人士、学生）」
- "Who is your target audience? (e.g., beginners, professionals, students)"
- 「你期望的输出格式是什么？（如：代码、文章、列表、表格）」
- "What is your expected output format? (e.g., code, article, list, table)"
- 「有哪些特定的约束条件？（如：字数限制、风格要求、必须包含的要点）」
- "Are there any specific constraints? (e.g., word limit, style requirements, must-include points)"
- 「这个提示词用于什么场景？（如：代码生成、文案创作、数据分析、学习辅导）」
- "What scenario is this prompt for? (e.g., code generation, copywriting, data analysis, tutoring)"

**注意**：不要一次性问太多问题，聚焦在最关键的 1-3 个问题上。

**Note**: Don't ask too many questions at once. Focus on the 1-3 most critical questions.

### 3. 优化提示词 | Optimize Prompt

基于用户反馈和原始提示词，使用以下框架进行优化：

Based on user feedback and the original prompt, optimize using the following framework:

#### 提示词优化框架 | Prompt Optimization Framework

```markdown
# Role (角色)
你是一位 [具体角色]，擅长 [相关技能]
You are a [specific role], skilled in [relevant skills]

# Task (任务)
[清晰描述任务目标]
[Clearly describe the task objective]

# Context (背景)
[必要的上下文信息]
[Necessary background information]

# Constraints (约束)
- [约束条件 1]
- [约束条件 2]
- ...

# Output Format (输出格式)
[期望的输出格式和结构]
[Desired output format and structure]

# Examples (示例，可选)
输入示例：...
期望输出：...
Input example: ...
Expected output: ...
```

### 4. 提供优化版本 | Provide Optimized Versions

提供 **1-2 个** 优化版本：

Provide **1-2** optimized versions:

- **标准版**：通用、平衡的优化版本
- **Standard version**: Generic, balanced optimization
- **进阶版**（可选）：包含更详细约束和示例的版本
- **Advanced version** (optional): Version with more detailed constraints and examples

每个版本都应该：

Each version should:

- 保留用户原始意图
- Preserve user's original intent
- 添加必要的上下文和约束
- Add necessary context and constraints
- 使用清晰的结构化格式
- Use clear structured format
- 便于直接使用
- Be ready to use directly

### 5. 解释优化点 | Explain Optimizations

简要说明做了哪些优化以及为什么：

Briefly explain what optimizations were made and why:

- 添加了什么元素
- What elements were added
- 为什么这样改
- Why these changes were made
- 预期效果是什么
- What the expected effects are

---

## 示例 | Examples

### 示例 1：简单提示词优化 | Example 1: Simple Prompt Optimization

**用户输入 | User input**：「优化这个：写一个 python 函数」

**Agent 回应 | Agent response**：
```
我来帮你优化这个提示词。目前这个提示词比较简略，我需要了解更多信息：

1. 这个函数要实现什么功能？（如：数据处理、文件操作、API 调用等）
2. 输入和输出是什么？
3. 有没有特定的要求或约束？（如：性能要求、错误处理、代码风格）

请告诉我这些信息，我会帮你生成一个更完整的提示词。
```

### 示例 2：中等提示词优化 | Example 2: Medium Prompt Optimization

**用户输入 | User input**：「优化：帮我写一个产品描述」

**Agent 分析后直接优化 | Agent optimizes directly after analysis**：

```markdown
## 优化后的提示词（标准版）| Optimized Prompt (Standard Version)

你是一位专业的电商文案撰写人，擅长用简洁有力的语言突出产品卖点。
You are a professional e-commerce copywriter, skilled in highlighting product selling points with concise and powerful language.

请为以下产品撰写产品描述：
Please write a product description for the following:

- 产品名称 | Product name: [填写 | Fill in]
- 目标受众 | Target audience: [填写 | Fill in]
- 核心功能/卖点 | Core features/selling points: [填写 | Fill in]

要求 | Requirements:
1. 突出产品的核心优势和差异化特点
   Highlight the core advantages and differentiating features
2. 使用生动、具体的语言，避免空洞的形容词
   Use vivid, specific language, avoid empty adjectives
3. 包含使用场景描述，让用户产生代入感
   Include usage scenario descriptions to create user immersion
4. 字数控制在 150-200 字
   Keep word count between 150-200 characters

输出格式 | Output format:
- 标题（15 字以内，吸引眼球） | Title (within 15 characters, eye-catching)
- 正文（3-4 个卖点，每个卖点 1-2 句话） | Body (3-4 selling points, 1-2 sentences each)
- 行动号召（引导购买） | Call to action (guide to purchase)
```

### 示例 3：代码生成提示词优化 | Example 3: Code Generation Prompt Optimization

**用户输入 | User input**：「写个快排」

**Agent 优化 | Agent optimization**：

```markdown
我来帮你优化这个提示词，让它能生成更高质量的代码：
I'll help you optimize this prompt to generate higher quality code:

## 优化后的提示词 | Optimized Prompt

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

## 最佳实践 | Best Practices

- **保持对话式**：用友好的语气与用户交流，不要生硬
- **Keep it conversational**: Communicate with users in a friendly tone, not stiff
- **循序渐进**：复杂提示词可以分多轮迭代优化
- **Step by step**: Complex prompts can be optimized iteratively over multiple rounds
- **解释原因**：告诉用户为什么要这样改，帮助用户学习
- **Explain why**: Tell users why changes were made to help them learn
- **保留原意**：优化不是重写，要忠实于用户的原始意图
- **Preserve intent**: Optimization is not rewriting, stay faithful to user's original intent
- **灵活应变**：根据用户的反馈调整优化策略
- **Be flexible**: Adjust optimization strategy based on user feedback

---

## 注意事项 | Notes

- 如果用户明确表示就是想要简单的提示词，不要过度优化
- If user explicitly wants a simple prompt, don't over-optimize
- 对于技术类提示词，确保术语准确
- For technical prompts, ensure terminology accuracy
- 对于创意类提示词，保留足够的发挥空间
- For creative prompts, leave enough room for creativity
- 始终提供可以直接使用的完整提示词
- Always provide complete prompts ready to use directly