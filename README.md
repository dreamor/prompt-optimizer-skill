# Prompt Optimizer Skill

Claude Code 提示词优化技能 - 基于模型能力优化用户输入的简单提示词。

## 功能特点

- **智能分析**：检查提示词是否缺少目标、上下文、约束、角色等元素
- **分步澄清**：如果信息不足，只问 1-3 个最关键的问题
- **结构化优化**：使用 Role/Task/Context/Constraints/Output 框架优化
- **多版本提供**：提供标准版和进阶版（可选）
- **解释优化点**：说明做了哪些改进及原因

## 安装

```bash
# 克隆仓库到本地
git clone https://github.com/dreamor/prompt-optimizer-skill.git

# 在 Claude Code 中安装
cd ~/.claude/skills/
ln -s /path/to/prompt-optimizer-skill prompt-optimizer
```

## 使用方法

在 Claude Code 对话中：
- 直接说「优化这个提示词：xxx」
- 或「帮我改进这个 prompt」
- 或使用 `/prompt-optimizer` 命令

## 示例

### 输入
```
写个快排
```

### 优化后
```markdown
你是一位资深 Python 工程师，擅长算法实现和代码教学。

请用 Python 实现快速排序算法，要求：

1. 实现完整的快速排序函数，包含必要的参数和返回值类型注解
2. 添加详细的注释，解释关键步骤和算法原理
3. 处理边界情况（空列表、单元素、重复元素等）
4. 提供时间复杂度和空间复杂度分析
5. 包含 2-3 个使用示例

输出格式：
- 算法原理简介（1-2 句话）
- 完整代码实现（带类型注解和注释）
- 复杂度分析
- 使用示例
```

## 触发场景

当用户有以下意图时，会自动触发此技能：
- 明确要求优化提示词：「优化这个 prompt」、「帮我改进提示词」
- 要求写提示词：「帮我写个提示词」、「给我一个 prompt」
- 输入简单提示词后期望改进
- 表达对提示词效果不满意：「效果不好」、「生成的内容不够好」

## License

MIT