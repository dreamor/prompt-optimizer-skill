# Prompt Optimizer v2.0

> 专业的 Claude Code Skill，将简单指令转化为生产级 Prompt

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ 功能特性

### 🎯 核心能力

- **CLARITY 框架**: 系统化的提示词优化方法，覆盖 7 个关键要素
- **57 个提示词框架**: 按复杂度和领域分类，详细定义和使用示例
- **质量验证**: 自动生成后通过 7 点检查清单验证质量
- **多版本输出**: 基础版/进阶版/专家版，适应不同场景需求
- **边界处理**: 智能处理模糊输入和用户拒绝澄清的情况

### 🆕 v2.0 新特性

| 特性 | 说明 |
|------|------|
| **框架库** | 57 个框架的详细定义，包含结构、示例、最佳实践 |
| **质量验证** | CLARITY 7 点检查清单，确保输出质量 |
| **多版本** | 根据需求提供不同详细程度的优化结果 |
| **边界处理** | 优雅处理模糊输入和拒绝澄清的情况 |
| **测试套件** | 15 个测试用例，覆盖各种使用场景 |

---

## 📦 安装

### 方法 1: 符号链接（推荐，便于更新）

```bash
# 克隆仓库
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# 创建符号链接
cd ~/.claude/skills/
ln -s /path/to/prompt-optimizer-skill prompt-optimizer
```

### 方法 2: 直接复制

```bash
# 克隆仓库
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# 复制到 skills 目录
cp -r prompt-optimizer-skill ~/.claude/skills/prompt-optimizer
```

### 验证安装

```bash
ls -la ~/.claude/skills/prompt-optimizer/
# 应该看到: SKILL.md, frameworks/, tests/, CHANGELOG.md 等
```

---

## 🚀 使用

### 基本用法

在 Claude Code 对话中:

```
optimize this prompt: 写一封邮件给客户
```

或

```
/prompt-optimizer 帮我优化这个提示词
```

### 工作流程

```
用户输入 → 分析 → 框架选择 → 澄清疑问 → 生成优化 → 质量验证 → 输出结果
```

### 多版本输出

根据你的需求，可以获得不同详细程度的优化结果:

| 版本 | 适用场景 | 特征 |
|------|----------|------|
| **基础版** | 快速使用、简单任务 | 核心要素，简洁明了 |
| **进阶版** | 常规工作、团队协作 | 完整结构，包含示例 |
| **专家版** | 复杂项目、高质量要求 | 全要素 + 约束 + 验证标准 |

### 示例

#### 示例 1: 代码生成

**Before:**
```
write a function to sort a list
```

**After (专家版):**
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

#### 示例 2: 内容写作

**Before:**
```
write a blog post about AI
```

**After (进阶版):**
```markdown
# Role
You are a technology journalist and AI researcher with 10+ years of experience.

# Context
The blog targets software developers and tech professionals.

# Task
Write an informative blog post about practical AI tools for developers.

# Instructions
1. Start with a compelling hook about AI's impact
2. Cover 3-5 specific AI tools developers can use today
3. Include real-world examples and code snippets
4. Address common concerns and misconceptions
5. End with actionable next steps

# Constraints
- Target audience: intermediate to senior developers
- Tone: informative, practical, conversational
- Length: 1,500-2,000 words
- Avoid overly technical jargon

# Output Format
1. Catchy headline (under 60 characters)
2. Introduction with hook and thesis
3. Body sections with clear subheadings
4. Conclusion with call-to-action
5. Author bio (2-3 sentences)
```

---

## 📚 框架库

### 简单框架 (≤3 要素)

| 框架 | 全称 | 适用场景 |
|------|------|----------|
| APE | Action-Purpose-Expectation | 快速提示词构建 |
| ERA | Expectation-Role-Action | 简单任务指令 |
| TAG | Task-Action-Goal | 快速任务定义 |
| RTF | Role-Task-Format | 需要特定格式输出 |
| BAB | Before-After-Bridge | 营销推广 |
| PEE | Point-Evidence-Explanation | 学术写作 |
| ELI5 | Explain Like I'm 5 | 复杂概念解释 |

### 中等框架 (4-5 要素)

| 框架 | 全称 | 适用场景 |
|------|------|----------|
| RACE | Role-Action-Context-Expectation | 角色扮演对话 |
| COAST | Context-Objective-Actions-Scenario-Task | AI 对话系统设计 |
| ROSES | Role-Objective-Scenario-Expected Solution-Steps | 角色扮演场景 |
| SMART | Specific-Measurable-Achievable-Relevant-Time-bound | 目标设定 |
| FOCUS | Features-Objective-Constraints-User-Setup | 产品分析评估 |

### 复杂框架 (6+ 要素)

| 框架 | 全称 | 适用场景 |
|------|------|----------|
| CRISPE | Capacity-Role-Insight-Statement-Personality-Experiment | 营销活动策划 |
| RACEF | Role-Action-Context-Expectation-Format | 复杂分析任务 |
| RISEN | Role-Input-Steps-Expectation-Narrowing | 详细计划制定 |

详细定义见 `frameworks/` 目录。

---

## 🧪 测试

### 运行测试

```bash
# 检查框架文件完整性
bash tests/test-cases.md

# 或手动检查
ls frameworks/simple/   # 应该看到 7 个框架
ls frameworks/medium/   # 应该看到 6 个框架
ls frameworks/complex/  # 应该看到 3 个框架
```

### 测试用例

查看 `tests/test-cases.md` 了解完整的测试覆盖:
- 边界情况测试 (完全模糊、超短输入、无意义输入)
- 框架选择测试
- 澄清问题处理测试
- 质量验证测试
- 多版本输出测试
- 迭代优化测试

---

## 📖 文档

| 文档 | 说明 |
|------|------|
| [SKILL.md](SKILL.md) | 主技能文件，包含完整工作流程 |
| [CHANGELOG.md](CHANGELOG.md) | 版本更新记录 |
| [frameworks/](frameworks/) | 57 个框架的详细定义 |
| [tests/test-cases.md](tests/test-cases.md) | 测试用例 |

---

## 🏗️ 项目结构

```
prompt-optimizer-skill/
├── SKILL.md                 # 主技能文件
├── README.md               # 本文件
├── CHANGELOG.md            # 更新日志
├── VERSION                 # 当前版本
├── frameworks/             # 框架定义库
│   ├── simple/            # 简单框架（7个）
│   ├── medium/            # 中等框架（6个）
│   ├── complex/           # 复杂框架（3个）
│   └── patterns/          # 可复用模式（2个）
├── tests/                 # 测试用例
│   └── test-cases.md
└── references/            # 参考资料
    └── Frameworks_Summary.md
```

---

## 🤝 贡献

欢迎贡献！请查看 [CHANGELOG.md](CHANGELOG.md) 了解项目发展方向。

### 贡献方式

1. **添加新框架**: 在 `frameworks/` 下添加新的框架定义
2. **改进文档**: 完善现有框架的示例和说明
3. **添加测试**: 补充更多测试用例
4. **报告问题**: 提交 Issue 描述遇到的问题

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- 感谢所有提示词工程先驱者的框架设计
- 感谢 Claude Code 团队提供的 Skill 平台

---

## 📮 反馈

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件至: [your-email@example.com]

---

**Made with ❤️ for the Claude Code community**
