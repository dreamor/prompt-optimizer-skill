# Prompt Optimizer v2.1

> A professional Claude Code Skill that transforms simple instructions into production-ready prompts.  
> 专业的 Claude Code Skill，将简单的指令转化为生产级的高质量提示词。

[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ Features / 特性

### 🎯 Core Capabilities / 核心能力

- **CLARITY Framework**: A systematic prompt optimization method covering 7 key elements (Context, Logic, Action, Role, Input/Output, Tone, Yardstick).
  **CLARITY 框架**：系统化的提示词优化方法，覆盖 7 个关键要素（背景、逻辑、行动、角色、输入/输出、语气、标准）。
- **61 Prompt Frameworks**: Categorized by complexity and domain, with detailed definitions and examples.
  **61 种提示词框架**：按复杂度和领域分类，提供详细的定义和示例。
- **Quality Validation**: Automatic validation using a 7-point checklist after generation to ensure high-quality output.
  **质量验证**：生成后自动使用 7 点清单进行质量校验，确保高质量输出。
- **Multi-Version Output**: Provides Basic, Enhanced, and Expert versions for different scenarios.
  **多版本输出**：针对简单、常规、复杂场景提供基础、增强、专家三个版本。
- **Boundary Handling**: Intelligently handles vague inputs and situations where users refuse to clarify.
  **边界处理**：智能处理模糊输入和用户拒绝澄清的情况。
- **Multiple Installation Methods**: Supports Claude Marketplace, npx, and local installation.
  **多种安装方式**：支持 Claude Marketplace、npx 和本地安装。

### 🆕 New in v2.0 / v2.0 新特性

| Feature / 特性 | Description / 描述 |
| :--- | :--- |
| **Framework Library** / **框架库** | 61 detailed framework definitions with structure, examples, and best practices. <br> 61 个详细的框架定义，包含结构、示例和最佳实践。 |
| **Quality Validation** / **质量验证** | CLARITY 7-point checklist to ensure output quality. <br> CLARITY 7 点检查清单，确保输出质量。 |
| **Multi-Version** / **多版本输出** | Different optimization levels based on user needs. <br> 根据用户需求提供不同详细程度的优化结果。 |
| **Boundary Handling** / **边界处理** | Graceful handling of vague inputs and refusal to clarify. <br> 优雅处理模糊输入和拒绝澄清的用户行为。 |
| **Test Suite** / **测试套件** | 34 test cases covering various usage scenarios. <br> 34 个测试用例，覆盖各种使用场景。 |
| **Claude Plugin** / **Claude 插件** | Support for installation via Claude Code Marketplace. <br> 支持通过 Claude Code Marketplace 安装。 |
| **npx Support** / **npx 支持** | Use directly via npx without installation. <br> 无需安装，直接通过 npx 使用。 |

---

## 📦 Installation / 安装

### Method 1: Claude Code Marketplace (Recommended) / 方法一：Claude Code Marketplace（推荐）

Install directly from GitHub using the marketplace command:  
使用 marketplace 命令直接从 GitHub 安装：

```bash
/plugin marketplace add dreamor/prompt-optimizer-skill
/plugin install prompt-optimizer@prompt-optimizer-skill
/reload-plugins
```

### Method 2: npx Usage (No Installation Required) / 方法二：npx 使用（无需安装）

Use directly via npx without local installation:  
无需本地安装，直接通过 npx 使用：

```bash
# Optimize a prompt / 优化提示词
npx prompt-optimizer-skill optimize "Write an email to a customer"

# List all frameworks / 列出所有框架
npx prompt-optimizer-skill frameworks

# Run tests / 运行测试
npx prompt-optimizer-skill test

# View help / 查看帮助
npx prompt-optimizer-skill help
```

**Quick Commands / 快捷命令**:
```bash
# Use short alias / 使用短别名
npx pos "Write an email to a customer"

# Specify output version / 指定输出版本
npx prompt-optimizer-skill optimize "Write code" --basic      # Basic version / 基础版
npx prompt-optimizer-skill optimize "Write code" --enhanced   # Enhanced version (default) / 增强版（默认）
npx prompt-optimizer-skill optimize "Write code" --expert     # Expert version / 专家版
```

### Method 3: Symbolic Link (Development/Customization) / 方法三：符号链接（开发/自定义）

Suitable for users who need to modify or customize:  
适用于需要修改或自定义的用户：

```bash
# Clone the repository / 克隆仓库
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# Create symbolic link / 创建符号链接
cd ~/.claude/skills/
ln -s /path/to/prompt-optimizer-skill prompt-optimizer
```

### Verify Installation / 验证安装

```bash
# Claude Plugin method / Claude 插件方式
claude plugin list | grep prompt-optimizer

# npx method / npx 方式
npx prompt-optimizer-skill version

# Local installation method / 本地安装方式
ls -la ~/.claude/skills/prompt-optimizer/
# Should see: SKILL.md, frameworks/, tests/, CHANGELOG.md, etc.
```

---

## 🚀 Usage / 使用

### Method A: Use in Claude Code / 在 Claude Code 中使用

In Claude Code conversation:  
在 Claude Code 对话中：

```
optimize this prompt: Write an email to a customer
```

Or / 或者：

```
/prompt-optimizer help me optimize this prompt
```

### Method B: Use via npx Command Line / 通过 npx 命令行使用

No installation needed, use directly:  
无需安装，直接使用：

```bash
# Basic usage / 基本用法
npx prompt-optimizer-skill "Write an email to a customer"

# Specify output version / 指定输出版本
npx prompt-optimizer-skill "Write code" -b    # Basic version / 基础版
npx prompt-optimizer-skill "Write code" -e    # Enhanced version (default) / 增强版（默认）
npx prompt-optimizer-skill "Write code" -x    # Expert version / 专家版

# List all frameworks / 列出所有框架
npx prompt-optimizer-skill frameworks

# View help / 查看帮助
npx prompt-optimizer-skill help
```

### Workflow / 工作流程

```
User Input → Analysis → Framework Selection → Clarification → Optimization → Quality Validation → Output
用户输入 → 分析 → 框架选择 → 澄清 → 优化 → 质量验证 → 输出
```

### Multi-Version Output / 多版本输出

Based on your needs, you can get optimization results with different levels of detail:  
根据你的需求，你可以获得不同详细程度的优化结果：

| Version / 版本 | Use Case / 适用场景 | Characteristics / 特点 |
| :--- | :--- | :--- |
| **Basic** / **基础版** | Quick use, simple tasks / 快速使用，简单任务 | Core elements, concise and clear / 核心要素，简洁明了 |
| **Enhanced** / **增强版** | Regular work, team collaboration / 日常工作，团队协作 | Complete structure with examples / 完整结构，包含示例 |
| **Expert** / **专家版** | Complex projects, high-quality requirements / 复杂项目，高质量要求 | Full elements + constraints + validation criteria / 全要素 + 约束 + 验证标准 |

### Examples / 示例

#### Example 1: Code Generation / 示例 1：代码生成

**Before / 优化前:**
```
write a function to sort a list
```

**After (Expert Version) / 优化后（专家版）:**
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

#### Example 2: Content Writing / 示例 2：内容写作

**Before / 优化前:**
```
write a blog post about AI
```

**After (Enhanced Version) / 优化后（增强版）:**
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

## 📚 Framework Library / 框架库

### Simple Frameworks (≤3 Elements) / 简单框架（≤3 元素）

| Framework / 框架 | Full Name / 全称 | Use Case / 适用场景 |
| :--- | :--- | :--- |
| APE | Action-Purpose-Expectation | Quick prompt building / 快速构建提示词 |
| ERA | Expectation-Role-Action | Simple task instructions / 简单任务指令 |
| TAG | Task-Action-Goal | Quick task definition / 快速任务定义 |
| RTF | Role-Task-Format | Specific format output required / 需要特定格式输出 |
| BAB | Before-After-Bridge | Marketing promotion / 营销推广 |
| PEE | Point-Evidence-Explanation | Academic writing / 学术写作 |
| ELI5 | Explain Like I'm 5 | Complex concept explanation / 复杂概念解释 |

### Medium Frameworks (4-5 Elements) / 中等框架（4-5 元素）

| Framework / 框架 | Full Name / 全称 | Use Case / 适用场景 |
| :--- | :--- | :--- |
| RACE | Role-Action-Context-Expectation | Role-playing dialogue / 角色扮演对话 |
| COAST | Context-Objective-Actions-Scenario-Task | AI dialogue system design / AI 对话系统设计 |
| ROSES | Role-Objective-Scenario-Expected Solution-Steps | Role-playing scenarios / 角色扮演场景 |
| SMART | Specific-Measurable-Achievable-Relevant-Time-bound | Goal setting / 目标设定 |
| FOCUS | Features-Objective-Constraints-User-Setup | Product analysis and evaluation / 产品分析与评估 |

### Complex Frameworks (6+ Elements) / 复杂框架（6+ 元素）

| Framework / 框架 | Full Name / 全称 | Use Case / 适用场景 |
| :--- | :--- | :--- |
| CRISPE | Capacity-Role-Insight-Statement-Personality-Experiment | Marketing campaign planning / 营销活动策划 |
| RACEF | Role-Action-Context-Expectation-Format | Complex analysis tasks / 复杂分析任务 |
| RISEN | Role-Input-Steps-Expectation-Narrowing | Detailed plan formulation / 详细计划制定 |

Detailed definitions can be found in the `frameworks/` directory.  
详细定义请查看 `frameworks/` 目录。

---

## 🧪 Testing / 测试

### Run Tests / 运行测试

```bash
# Check framework file integrity / 检查框架文件完整性
bash tests/test-cases.md

# Or manually check / 或手动检查
ls frameworks/simple/   # Should see 16 frameworks / 应看到 16 个框架
ls frameworks/medium/   # Should see 33 frameworks / 应看到 33 个框架
ls frameworks/complex/  # Should see 9 frameworks / 应看到 9 个框架
```

### Test Cases / 测试用例

View `tests/test-cases.md` for complete test coverage:  
查看 `tests/test-cases.md` 获取完整的测试覆盖：
- Boundary condition tests (completely vague, ultra-short, meaningless inputs) / 边界条件测试（完全模糊、超短、无意义输入）
- Framework selection tests / 框架选择测试
- Clarification handling tests / 澄清处理测试
- Quality validation tests / 质量验证测试
- Multi-version output tests / 多版本输出测试
- Iterative optimization tests / 迭代优化测试

---

## 🏗️ Project Structure / 项目结构

```
prompt-optimizer-skill/
├── SKILL.md                 # Main skill file / 主技能文件
├── README.md                # This file / 本文件
├── CHANGELOG.md             # Changelog / 更新日志
├── LICENSE                  # MIT License / MIT 许可证
├── VERSION                  # Current version / 当前版本
├── claude.json              # Claude Plugin configuration / Claude 插件配置
├── package.json             # npm package manifest / npm 包清单
├── bin/                     # CLI tools / CLI 工具
│   └── prompt-optimizer.js  # CLI (template scaffolds + framework lookup) / CLI（模板脚手架 + 框架查找）
├── frameworks/              # Framework library (61 total) / 框架库（共 61 个）
│   ├── index.json           # Structured metadata (id, category, elements, domains) / 结构化元数据（ID、类别、元素、领域）
│   ├── simple/              # Simple frameworks (16) / 简单框架（16 个）
│   ├── medium/              # Medium frameworks (33) / 中等框架（33 个）
│   ├── complex/             # Complex frameworks (9) / 复杂框架（9 个）
│   └── patterns/            # Reusable patterns (3) / 可复用模式（3 个）
├── tests/                   # Test cases / 测试用例
│   └── test-cases.md
└── references/              # Reference materials / 参考资料
    └── Frameworks_Summary.md
```

---

## 🤝 Contributing / 贡献

Contributions are welcome! Please check [CHANGELOG.md](CHANGELOG.md) to understand the project's development direction.  
欢迎贡献！请查看 [CHANGELOG.md](CHANGELOG.md) 了解项目的开发方向。

### Ways to Contribute / 贡献方式

1. **Add New Frameworks**: Add new framework definitions under `frameworks/` / **添加新框架**：在 `frameworks/` 下添加新的框架定义
2. **Improve Documentation**: Enhance examples and descriptions for existing frameworks / **改进文档**：增强现有框架的示例和描述
3. **Add Tests**: Supplement with more test cases / **增加测试**：补充更多的测试用例
4. **Report Issues**: Submit issues describing problems encountered / **报告问题**：提交 Issue 描述你遇到的问题

---

## 📄 License / 许可证

MIT License - See [LICENSE](LICENSE) file for details.  
MIT License - 详见 [LICENSE](LICENSE) 文件。

---