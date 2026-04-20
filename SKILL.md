---
name: prompt-optimizer
version: 2.0.0
description: Prompt 优化助手。适用于用户想优化提示词、改进 AI 指令、为特定任务设计更好的 prompt，或需要选择合适提示框架时使用。会根据任务场景匹配合适框架，必要时先追问关键信息，再输出更清晰、更可执行的提示词版本。
---

# Prompt Optimizer v2.0

帮助用户基于具体任务场景，选择合适的提示词框架，并生成更清晰、更可执行的 prompt。

---

## 设计模式

本 skill 主要采用：
- **Reviewer**: 先判断用户现有 prompt 或任务描述的问题
- **Inversion**: 信息不足时，先追问目标、受众、约束和格式
- **Generator**: 基于选定框架生成优化后的 prompt
- **Validator**: 验证优化结果是否符合质量标准

## Gotchas

- 不要一上来就套框架，先判断任务是否真的需要复杂框架
- 不要为了显得专业而过度设计简单 prompt
- 如果用户只想快速润色一句 prompt，不要强行输出一整套长模板
- 如果目标、受众、输出格式不清楚，先补最小必要问题
- 说明为什么选这个框架，比堆很多框架名更重要
- **边界情况处理**: 如果用户输入完全无法理解，提供示例引导
- **拒绝处理**: 如果用户拒绝回答澄清问题，使用默认值继续

---

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
- [ ] Step 6: Quality Validation
- [ ] Step 7: Present Results

### Step 1: Analyze User Input

Receive the user's request, which may be:
- A raw prompt that needs optimization
- A task description or requirement
- A vague idea that needs to be turned into a prompt

**Boundary Handling - 边界处理:**

| 情况 | 判断标准 | 处理方式 |
|------|----------|----------|
| **完全模糊** | 少于 5 个词，无明确动作或主题 | 提供 3 个示例引导用户 |
| **部分清晰** | 有主题但无具体要求 | 进入 Step 4 追问关键信息 |
| **完全清晰** | 包含任务、目标、场景 | 直接进入 Step 2 |

**完全模糊输入示例处理:**
```
用户输入: "帮我写点东西"

处理: "我可以帮您写多种类型的内容。请告诉我：
1. 您需要什么类型的内容？（邮件/报告/代码/文案/其他）
2. 主题或目标是什么？
3. 有什么特殊要求吗？

或者您可以选择一个示例：
- A: 写一封商务合作邮件
- B: 写一个 Python 数据处理函数
- C: 写一份产品需求文档"
```

---

### Step 2: Match Scenario and Select Framework

Identify the user's scenario and match the most suitable framework(s) based on:
- Application scenario alignment
- Task complexity (simple/medium/complex)
- Domain category (marketing, decision analysis, education, etc.)

**Framework Selection Guide by Complexity:**

| Complexity | Recommended Frameworks |
|------------|----------------------|
| Simple (≤3 elements) | APE, ERA, TAG, RTF, BAB, PEE, ELI5 |
| Medium (4-5 elements) | RACE, COAST, ROSES, Chain-of-Thought, SMART, FOCUS |
| Complex (6+ elements) | RACEF, CRISPE, RISEN |

**Framework Selection Guide by Domain:**

| Domain | Recommended Frameworks |
|--------|----------------------|
| Marketing Content | BAB, SMART, FOCUS |
| Decision Analysis | Chain-of-Thought, SMART, RACEF |
| Education & Training | ELI5, PEE |
| Product Development | SMART, FOCUS, RACEF |
| AI Dialogue/Assistant | COAST, ROSES, RACE |
| Writing & Creation | APE, ERA, TAG |
| Complex Reasoning | Chain-of-Thought, RACEF, CRISPE |

**Framework Selection Explanation - 选择解释:**

选择框架后，必须说明：
1. **为什么选这个框架**: 匹配用户的什么需求
2. **置信度评分**: 1-10 分，表示匹配确定程度
3. **备选方案**: 如果置信度 < 7，提供 1-2 个备选框架

示例：
```
选择框架: RACE (Role-Action-Context-Expectation)
理由: 用户需要角色扮演对话，且提供了较详细的背景信息，RACE 的 Context 和 Expectation 要素能很好地组织这些信息
置信度: 8/10
备选: COAST（如果用户需要更强调交互步骤）
```

---

### Step 3: Load Framework Details

从 `frameworks/` 目录加载选定框架的详细定义：
- 简单框架: `frameworks/simple/{framework}.md`
- 中等框架: `frameworks/medium/{framework}.md`
- 复杂框架: `frameworks/complex/{framework}.md`
- 模式: `frameworks/patterns/{pattern}.md`

框架文件包含：
1. 完整结构说明
2. 适用场景
3. 使用示例
4. 最佳实践

---

### Step 4: Clarify Ambiguities

Before generating the final prompt, verify with the user:

1. **Goal Clarity**: Is the intended outcome clear?
2. **Target Audience**: Who will receive the AI's response?
3. **Context Completeness**: Is sufficient background information provided?
4. **Format Requirements**: Are there specific output format needs?
5. **Constraints**: Are there any limitations or restrictions?

**Clarifying Questions Template:**
```
为了生成最适合您的 prompt，我需要了解以下信息：

1. **目标**: 您希望达成什么具体结果？
   例如："获得一份可直接发布的文案" vs "获得创意灵感"

2. **受众**: 谁将阅读 AI 的输出？
   例如："技术专家" vs "普通消费者"

3. **格式**: 需要什么输出格式？
   例如：" bullet points" vs "完整段落" vs "表格"

4. **约束**: 有什么限制条件？
   例如：字数限制、风格要求、必须包含/排除的内容

请回答以上问题，或直接说"默认"使用常规设置。
```

**Refusal Handling - 拒绝处理:**

如果用户拒绝回答澄清问题：

| 用户回应 | 处理方式 |
|----------|----------|
| "直接生成" / "默认" | 使用智能默认值继续 |
| "别问了" / "就按我说的做" | 礼貌说明默认值，继续生成 |
| 完全无回应 | 等待 1 轮后使用默认值 |

**智能默认值:**
- 目标: "提供高质量、可直接使用的内容"
- 受众: "一般专业人士"
- 格式: "结构化文本，包含标题和 bullet points"
- 约束: "无特殊限制"

---

### Step 5: Generate Optimized Prompt

Apply the selected framework to create the final prompt:

1. Structure the prompt according to framework components
2. Incorporate all clarified information
3. Ensure clarity and specificity
4. Include relevant examples if the framework requires
5. Add any necessary constraints or guidelines

**Multi-Version Output - 多版本输出:**

根据用户需求，提供 1-3 个版本：

| 版本 | 适用场景 | 特征 |
|------|----------|------|
| **基础版** | 快速使用、简单任务 | 核心要素，简洁明了 |
| **进阶版** | 常规工作、团队协作 | 完整结构，包含示例 |
| **专家版** | 复杂项目、高质量要求 | 全要素 + 约束 + 验证标准 |

**版本选择指南:**
- 用户说"简单点"/"快速": 提供基础版
- 用户说"详细点"/"完整": 提供进阶版
- 用户说"最好的"/"专业": 提供专家版
- 无明确偏好: 提供进阶版 + 说明可升级/降级

---

### Step 6: Quality Validation

**CRITICAL STEP - 关键步骤**

使用 **CLARITY Checklist** 验证优化后的 prompt：

| 检查项 | 标准 | 状态 |
|--------|------|------|
| **C**ontext | 包含足够的背景信息 | ☐ |
| **L**ogic | 推理方法清晰 | ☐ |
| **A**ction | 具体行动明确 | ☐ |
| **R**ole | 角色定义清晰 | ☐ |
| **I**nput/Output | 输入输出格式定义 | ☐ |
| **T**one | 语气风格明确 | ☐ |
| **Y**ardstick | 质量标准或约束 | ☐ |

**Validation Rules:**
- 简单任务: 至少满足 4/7 项
- 中等任务: 至少满足 5/7 项
- 复杂任务: 必须满足 6/7 项以上

**If Validation Fails:**
1. 列出未通过的检查项
2. 针对性补充缺失要素
3. 重新验证直到通过

**Additional Quality Checks:**

| 检查项 | 通过标准 |
|--------|----------|
| 清晰度 | 无模糊词汇（如"改进""优化"） |
| 具体性 | 包含可衡量的指标或标准 |
| 完整性 | 覆盖用户需求的所有方面 |
| 可行性 | AI 能够实际执行 |
| 安全性 | 无有害或不当内容 |

---

### Step 7: Present Results

Present the optimized prompt to the user with:

1. **Framework Selection Summary**: 选择的框架及理由
2. **Quality Validation Result**: CLARITY 检查通过情况
3. **The Optimized Prompt**: 完整的优化后 prompt
4. **Version Options**: 基础/进阶/专家版（如适用）
5. **Usage Tips**: 如何根据实际效果调整

**Presentation Template:**
```
## 优化结果

### 框架选择
- 使用框架: {framework}
- 选择理由: {reasoning}
- 置信度: {score}/10

### 质量验证
- CLARITY 检查: {X}/7 项通过
- 质量等级: {优秀/良好/需改进}

### 优化后的 Prompt
```
{optimized_prompt}
```

### 版本选择
- [ ] 基础版（当前显示）
- [ ] 进阶版（包含更多示例）
- [ ] 专家版（包含完整约束和验证标准）

### 使用建议
- 如果结果太泛，添加更多约束条件
- 如果结果太窄，放宽某些限制
- 如需迭代优化，请告诉我具体调整方向
```

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

## Quick Reference: Framework Selection

| User Says | Recommended Framework | Version |
|-----------|----------------------|---------|
| "I need a simple prompt" | APE, ERA, TAG | 基础版 |
| "I want to persuade/sell" | BAB | 进阶版 |
| "I need to analyze/decide" | Chain-of-Thought, RACEF | 进阶/专家版 |
| "I want to teach/explain" | ELI5, PEE | 基础/进阶版 |
| "I need creative ideas" | COAST, ROSES | 进阶版 |
| "I want structured writing" | APE, RACE | 进阶版 |
| "I need step-by-step reasoning" | Chain-of-Thought | 进阶版 |
| "I'm generating images" | Few-Shot | 基础版 |
| "I need a detailed plan" | RISEN, RACEF | 专家版 |

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
- Handle edge cases gracefully / 优雅处理边界情况
- Validate output quality before presenting / 展示前验证输出质量

---

## References

Framework details can be found in:
- `frameworks/simple/` - 简单框架（3 要素以内）
- `frameworks/medium/` - 中等框架（4-5 要素）
- `frameworks/complex/` - 复杂框架（6+ 要素）
- `frameworks/patterns/` - 可复用模式
- [Frameworks Summary](references/Frameworks_Summary.md) - 57 个框架的完整列表

---

## Changelog

### v2.0.0 (2024-04-20)
- ✨ 新增框架详细定义文件（57 个框架）
- ✨ 新增 Step 6: 质量验证环节
- ✨ 新增多版本输出（基础/进阶/专家版）
- ✨ 新增边界情况处理策略
- ✨ 新增用户拒绝澄清时的默认处理
- ✨ 新增框架选择解释和置信度评分
- 🔧 重构 SKILL.md 结构，更清晰的工作流
- 📝 添加完整的使用示例和模板

### v1.0.0
- 🎉 初始版本
- 基础 CLARITY 框架
- 57 个框架列表
