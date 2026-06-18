[English](./README.md) | 简体中文

# Prompt Optimizer v2.1

> 专业的 Claude Code Skill，将简单的指令转化为生产级的高质量提示词。

[![Version](https://img.shields.io/badge/version-2.1.12-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ 特性

### 🎯 核心能力

- **CLARITY 框架**：系统化的提示词优化方法，覆盖 7 个关键要素（背景、逻辑、行动、角色、输入/输出、语气、标准）。
- **61 种提示词框架**：按复杂度和领域分类，提供详细的定义和示例。
- **质量验证**：生成后自动使用 7 点清单进行质量校验，确保高质量输出。
- **多版本输出**：针对简单、常规、复杂场景提供基础、增强、专家三个版本。
- **边界处理**：智能处理模糊输入和用户拒绝澄清的情况。
- **多种安装方式**：支持 Claude Marketplace、npx 和本地安装。

### 🆕 v2.1 新特性

| 特性 | 描述 |
| :--- | :--- |
| **结构化框架索引** | `frameworks/index.json` 为全部 61 个框架提供 id、类别、元素、领域、用例的结构化元数据。 |
| **CLARITY 评分标准** | 每个字母有明确标准的二值通过/失败检查清单，跨运行可复现评分。 |
| **CLI `template` 命令** | 从 `optimize` 重命名，明确 CLI 输出静态脚手架；`optimize`/`o` 仍为别名。 |
| **CLI 框架查询** | 支持 `--json`、`--filter <领域>`、`--category <类别>` 结构化查询框架。 |
| **工作流追踪** | 步骤 1 现在使用 `TaskCreate` 追踪 7 个步骤，替代纯文本清单。 |
| **去重测试** | 29 个唯一测试用例（原 34 个含重复），附带 bash 完整性检查脚本。 |

### 📦 v2.0 特性

| 特性 | 描述 |
| :--- | :--- |
| **框架库** | 61 个详细的框架定义，包含结构、示例和最佳实践。 |
| **质量验证** | CLARITY 7 点检查清单，确保输出质量。 |
| **多版本输出** | 根据用户需求提供不同详细程度的优化结果。 |
| **边界处理** | 优雅处理模糊输入和拒绝澄清的用户行为。 |
| **测试套件** | 29 个测试用例，覆盖各种使用场景。 |
| **Claude 插件** | 支持通过 Claude Code Marketplace 安装。 |
| **npx 支持** | 无需安装，直接通过 npx 使用。 |

---

## 📦 安装

### 方法一：Claude Code Marketplace（推荐）

使用 marketplace 命令直接从 GitHub 安装：

```bash
/plugin marketplace add dreamor/prompt-optimizer-skill
/plugin install prompt-optimizer@prompt-optimizer-skill
/reload-plugins
```

### 方法二：npm 安装

通过 npm 全局或本地安装：

```bash
# 全局安装
npm install -g prompt-optimizer-skill

# 或作为项目依赖安装
npm install prompt-optimizer-skill
```

全局安装后，可直接使用 CLI 命令：

```bash
prompt-optimizer-skill template "Write an email to a customer"
prompt-optimizer-skill frameworks
prompt-optimizer-skill version
```

### 方法三：npx 使用（无需安装）

无需本地安装，直接通过 npx 使用：

```bash
# 生成提示词模板（静态脚手架）
npx prompt-optimizer-skill template "Write an email to a customer"

# 列出所有框架
npx prompt-optimizer-skill frameworks

# 按领域或类别查询框架
npx prompt-optimizer-skill frameworks --filter marketing
npx prompt-optimizer-skill frameworks --category medium

# 以 JSON 格式输出框架
npx prompt-optimizer-skill frameworks --json

# 运行测试
npx prompt-optimizer-skill test

# 查看帮助
npx prompt-optimizer-skill help
```

**快捷命令**：
```bash
# 使用短别名
npx pos "Write an email to a customer"
npx prompt-optimizer-skill optimize "Write code"   # template 的别名

# 指定输出版本
npx prompt-optimizer-skill template "Write code" --basic      # 基础版
npx prompt-optimizer-skill template "Write code" --enhanced   # 增强版（默认）
npx prompt-optimizer-skill template "Write code" --expert     # 专家版
```

### 方法四：符号链接（开发/自定义）

适用于需要修改或自定义的用户：

```bash
# 克隆仓库
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# 创建符号链接
cd ~/.claude/skills/
ln -s /path/to/prompt-optimizer-skill prompt-optimizer
```

### 验证安装

```bash
# Claude 插件方式
claude plugin list | grep prompt-optimizer

# npm 全局安装方式
prompt-optimizer-skill version

# npx 方式
npx prompt-optimizer-skill version

# 符号链接方式
ls -la ~/.claude/skills/prompt-optimizer/
# 应看到：SKILL.md, frameworks/, tests/, CHANGELOG.md 等
```

---

## 🚀 使用

### 方法 A：在 Claude Code 中使用

在 Claude Code 对话中：

```
optimize this prompt: Write an email to a customer
```

或者：

```
/prompt-optimizer help me optimize this prompt
```

### 方法 B：通过 npx 命令行使用

无需安装，直接使用：

```bash
# 基本用法
npx prompt-optimizer-skill "Write an email to a customer"

# 指定输出版本
npx prompt-optimizer-skill "Write code" -b    # 基础版
npx prompt-optimizer-skill "Write code" -e    # 增强版（默认）
npx prompt-optimizer-skill "Write code" -x    # 专家版

# 列出所有框架
npx prompt-optimizer-skill frameworks

# 查看帮助
npx prompt-optimizer-skill help
```

### 工作流程

```
用户输入 → 分析 → 框架选择 → 澄清 → 优化 → 质量验证 → 输出
```

### 多版本输出

根据你的需求，你可以获得不同详细程度的优化结果：

| 版本 | 适用场景 | 特点 |
| :--- | :--- | :--- |
| **基础版** | 快速使用，简单任务 | 核心要素，简洁明了 |
| **增强版** | 日常工作，团队协作 | 完整结构，包含示例 |
| **专家版** | 复杂项目，高质量要求 | 全要素 + 约束 + 验证标准 |

### 示例

#### 示例 1：代码生成

**优化前：**
```
write a function to sort a list
```

**优化后（专家版）：**
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

#### 示例 2：内容写作

**优化前：**
```
write a blog post about AI
```

**优化后（增强版）：**
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

### 简单框架（≤3 元素）

| 框架 | 全称 | 适用场景 |
| :--- | :--- | :--- |
| APE | Action-Purpose-Expectation | 快速构建提示词 |
| ERA | Expectation-Role-Action | 简单任务指令 |
| TAG | Task-Action-Goal | 快速任务定义 |
| RTF | Role-Task-Format | 需要特定格式输出 |
| BAB | Before-After-Bridge | 营销推广 |
| PEE | Point-Evidence-Explanation | 学术写作 |
| ELI5 | Explain Like I'm 5 | 复杂概念解释 |

### 中等框架（4-5 元素）

| 框架 | 全称 | 适用场景 |
| :--- | :--- | :--- |
| RACE | Role-Action-Context-Expectation | 角色扮演对话 |
| COAST | Context-Objective-Actions-Scenario-Task | AI 对话系统设计 |
| ROSES | Role-Objective-Scenario-Expected Solution-Steps | 角色扮演场景 |
| SMART | Specific-Measurable-Achievable-Relevant-Time-bound | 目标设定 |
| FOCUS | Features-Objective-Constraints-User-Setup | 产品分析与评估 |

### 复杂框架（6+ 元素）

| 框架 | 全称 | 适用场景 |
| :--- | :--- | :--- |
| CRISPE | Capacity-Role-Insight-Statement-Personality-Experiment | 营销活动策划 |
| RACEF | Role-Action-Context-Expectation-Format | 复杂分析任务 |
| RISEN | Role-Input-Steps-Expectation-Narrowing | 详细计划制定 |

详细定义请查看 `frameworks/` 目录。

---

## 🧪 测试

### 运行测试

```bash
# 运行完整测试套件
node tests/run-tests.js

# 或手动检查
ls frameworks/simple/   # 应看到 16 个框架
ls frameworks/medium/   # 应看到 33 个框架
ls frameworks/complex/  # 应看到 9 个框架
```

### 测试用例

查看 `tests/test-cases.md` 获取完整的测试覆盖：
- 边界条件测试（完全模糊、超短、无意义输入）
- 框架选择测试
- 澄清处理测试
- 质量验证测试
- 多版本输出测试
- 迭代优化测试

---

## 🏗️ 项目结构

```
prompt-optimizer-skill/
├── SKILL.md                 # 主技能文件
├── README.md                # 英文 README
├── README_zh.md             # 本文件（中文 README）
├── CHANGELOG.md             # 更新日志
├── LICENSE                  # MIT 许可证
├── VERSION                  # 当前版本
├── index.js                 # 模块入口
├── claude.json              # Claude 插件配置
├── package.json             # npm 包清单
├── bin/                     # CLI 工具
│   └── prompt-optimizer.js  # CLI（模板脚手架 + 框架查找）
├── frameworks/              # 框架库（共 61 个）
│   ├── index.json           # 结构化元数据（ID、类别、元素、领域）
│   ├── simple/              # 简单框架（16 个）
│   ├── medium/              # 中等框架（33 个）
│   ├── complex/             # 复杂框架（9 个）
│   └── patterns/            # 可复用模式（3 个）
├── tests/                   # 测试用例
│   └── test-cases.md
├── references/              # 参考资料
│   ├── Frameworks_Summary.md
│   ├── Quick_Reference.md
│   └── Decision_Tables.md
├── scripts/                 # 构建与发布脚本
│   ├── postversion.js
│   └── extract-changelog.js
└── .claude-plugin/          # Claude Plugin 市场元数据
    └── marketplace.json
```

---

## 🤝 贡献

欢迎贡献！请查看 [CHANGELOG.md](CHANGELOG.md) 了解项目的开发方向。

### 贡献方式

1. **添加新框架**：在 `frameworks/` 下添加新的框架定义
2. **改进文档**：增强现有框架的示例和描述
3. **增加测试**：补充更多的测试用例
4. **报告问题**：提交 Issue 描述你遇到的问题

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。
