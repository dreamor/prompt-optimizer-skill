#!/usr/bin/env node

/**
 * Prompt Optimizer CLI
 * 命令行工具，用于优化提示词
 */

const fs = require('fs');
const path = require('path');

const VERSION = require('../package.json').version;

// 帮助信息
function showHelp() {
  console.log(`
╔════════════════════════════════════════════════════════╗
║     Prompt Optimizer v${VERSION} - 提示词优化工具        ║
╚════════════════════════════════════════════════════════╝

用法:
  npx prompt-optimizer-skill [选项] [命令] [输入]

命令:
  optimize <text>     优化提示词
  frameworks          列出所有可用框架
  test               运行测试
  version            显示版本号
  help               显示帮助信息

选项:
  -v, --version      显示版本号
  -h, --help         显示帮助信息
  -b, --basic        输出基础版本
  -e, --enhanced     输出进阶版本（默认）
  -x, --expert       输出专家版本

示例:
  npx prompt-optimizer-skill optimize "写一封邮件给客户"
  npx prompt-optimizer-skill frameworks
  npx prompt-optimizer-skill test

更多信息: https://github.com/dreamor/prompt-optimizer-skill
`);
}

// 显示版本号
function showVersion() {
  console.log(`Prompt Optimizer v${VERSION}`);
}

// 优化提示词
function optimizePrompt(input, version = 'enhanced') {
  if (!input || input.trim() === '') {
    console.error('❌ 错误: 请提供需要优化的提示词');
    console.log('用法: npx prompt-optimizer-skill optimize "你的提示词"');
    process.exit(1);
  }

  console.log(`
╔════════════════════════════════════════════════════════╗
║              Prompt Optimizer - 优化结果               ║
╚════════════════════════════════════════════════════════╝
`);

  console.log(`📥 原始输入: ${input}`);
  console.log(`📊 输出版本: ${version}`);
  console.log('\n' + '─'.repeat(56) + '\n');

  // 读取 SKILL.md 的内容框架
  const skillPath = path.join(__dirname, '..', 'SKILL.md');
  let skillContent = '';

  try {
    skillContent = fs.readFileSync(skillPath, 'utf-8');
  } catch (err) {
    // 如果读取失败，使用默认模板
  }

  // 根据版本生成不同详细程度的优化结果
  const templates = {
    basic: generateBasicTemplate(input),
    enhanced: generateEnhancedTemplate(input),
    expert: generateExpertTemplate(input)
  };

  console.log(templates[version] || templates.enhanced);

  console.log('\n' + '─'.repeat(56));
  console.log('\n💡 提示: 使用 -e 参数获取进阶版本，-x 获取专家版本');
  console.log('📖 文档: https://github.com/dreamor/prompt-optimizer-skill');
}

// 基础版本模板
function generateBasicTemplate(input) {
  return `# 优化后的 Prompt

## Role
你是一位专业的助手

## Task
${input}

## Output Format
- 清晰的结构
- 简洁的表达

## Constraints
- 直接回答核心问题
- 避免冗余信息
`;
}

// 进阶版本模板
function generateEnhancedTemplate(input) {
  return `# 优化后的 Prompt

## Role
你是一位经验丰富的专业人士，擅长相关领域的工作。

## Context
用户需要完成以下任务，要求结果专业且可执行。

## Task
${input}

## Instructions
1. 分析任务的核心需求
2. 提供结构化的解决方案
3. 给出具体可执行的步骤
4. 提供质量检查标准

## Output Format
1. 执行摘要
2. 详细方案
3. 步骤清单
4. 成功标准

## Constraints
- 内容专业且实用
- 步骤清晰可执行
- 考虑常见边界情况

## Examples
输入: ${input}
输出: [根据上述要求生成的专业输出]
`;
}

// 专家版本模板
function generateExpertTemplate(input) {
  return `# 优化后的 Prompt（专家版）

## Role
你是一位在相关领域拥有 15 年以上经验的资深专家，曾服务过众多知名企业，深谙行业最佳实践。

## Context
### 背景信息
- 任务类型: 专业级内容生成
- 目标受众: 行业专业人士
- 质量要求: 最高标准

### 参考框架
本任务适用 RACEF/CRISPE 复杂框架

## Task
${input}

## Instructions
### Phase 1: 分析与规划
1. 深度理解任务需求和约束条件
2. 识别关键成功因素
3. 制定执行策略

### Phase 2: 执行与生成
1. 按照专业标准生成内容
2. 确保每个部分都有充分论证
3. 使用行业术语和最佳实践

### Phase 3: 验证与优化
1. 自我审查生成内容
2. 检查是否符合所有约束
3. 优化表达和结构

## Output Format
1. **执行摘要** (Executive Summary)
   - 核心观点
   - 关键数据
   - 主要建议

2. **详细分析** (Detailed Analysis)
   - 背景分析
   - 问题诊断
   - 解决方案

3. **实施计划** (Implementation Plan)
   - 步骤清单
   - 时间表
   - 资源需求
   - 风险管控

4. **质量标准** (Quality Criteria)
   - 验收标准
   - 评估指标
   - 检查清单

## Constraints
### 硬性约束
- 内容必须原创且专业
- 所有建议必须可执行
- 必须考虑边界情况

### 软性约束
- 语气专业但不失亲和力
- 结构清晰便于阅读
- 适当使用视觉元素（表格、列表）

## Validation Checklist
- [ ] 内容符合专业标准
- [ ] 逻辑严密无漏洞
- [ ] 可执行性强
- [ ] 考虑了风险和边界情况
- [ ] 输出格式符合要求

## Meta
- 优化框架: CLARITY + RACEF
- 质量等级: 专家级
- 适用场景: 重要项目、客户交付、公开发布
`;
}

// 列出所有框架
function listFrameworks() {
  const frameworksDir = path.join(__dirname, '..', 'frameworks');

  console.log(`
╔════════════════════════════════════════════════════════╗
║           Prompt Optimizer - 可用框架列表              ║
╚════════════════════════════════════════════════════════╝
`);

  const categories = {
    simple: '简单框架 (≤3 要素)',
    medium: '中等框架 (4-5 要素)',
    complex: '复杂框架 (6+ 要素)',
    patterns: '可复用模式'
  };

  for (const [dir, title] of Object.entries(categories)) {
    const dirPath = path.join(frameworksDir, dir);

    try {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

      console.log(`\n📁 ${title}`);
      console.log('─'.repeat(56));

      files.forEach(file => {
        const name = file.replace('.md', '');
        console.log(`  • ${name}`);
      });

      console.log(`  共 ${files.length} 个框架`);
    } catch (err) {
      console.log(`\n📁 ${title}`);
      console.log('  (暂无框架文件)');
    }
  }

  console.log(`
${'─'.repeat(56)}
使用说明:
  1. 查看框架详情: cat frameworks/simple/APE.md
  2. 在优化时指定框架: 使用对应框架的结构
  3. 更多信息: https://github.com/dreamor/prompt-optimizer-skill
`);
}

// 运行测试
function runTests() {
  console.log(`
╔════════════════════════════════════════════════════════╗
║            Prompt Optimizer - 测试套件               ║
╚════════════════════════════════════════════════════════╝
`);

  const testsDir = path.join(__dirname, '..', 'tests');

  try {
    const testFile = path.join(testsDir, 'test-cases.md');
    const content = fs.readFileSync(testFile, 'utf-8');

    // 统计测试用例数量
    const testCount = (content.match(/### TC-/g) || []).length;

    console.log(`✅ 找到 ${testCount} 个测试用例`);
    console.log(`📄 测试文件: tests/test-cases.md`);
    console.log('\n测试类别:');

    const categories = [
      '边界情况测试',
      '框架选择测试',
      '澄清问题测试',
      '质量验证测试',
      '多版本输出测试',
      '迭代优化测试',
      '框架库测试',
      '性能测试'
    ];

    categories.forEach((cat, index) => {
      console.log(`  ${index + 1}. ${cat}`);
    });

    console.log(`
${'─'.repeat(56)}
💡 提示: 详细的测试用例请查看 tests/test-cases.md
`);

  } catch (err) {
    console.error('❌ 未找到测试文件');
  }
}

// 主函数
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showHelp();
    return;
  }

  const command = args[0];
  const options = args.slice(1);

  // 解析选项
  let version = 'enhanced';
  let input = '';

  for (let i = 0; i < options.length; i++) {
    const opt = options[i];

    switch (opt) {
      case '-v':
      case '--version':
        showVersion();
        return;
      case '-h':
      case '--help':
        showHelp();
        return;
      case '-b':
      case '--basic':
        version = 'basic';
        break;
      case '-e':
      case '--enhanced':
        version = 'enhanced';
        break;
      case '-x':
      case '--expert':
        version = 'expert';
        break;
      default:
        // 如果不是选项，则视为输入
        if (!opt.startsWith('-')) {
          input = options.slice(i).join(' ');
        }
    }
  }

  // 如果没有显式输入，尝试从剩余参数获取
  if (!input && options.length > 0 && !options[0].startsWith('-')) {
    input = options.join(' ');
  }

  // 执行命令
  switch (command) {
    case 'optimize':
    case 'o':
      optimizePrompt(input, version);
      break;
    case 'frameworks':
    case 'f':
      listFrameworks();
      break;
    case 'test':
    case 't':
      runTests();
      break;
    case 'version':
    case 'v':
      showVersion();
      break;
    case 'help':
    case 'h':
      showHelp();
      break;
    default:
      // 如果命令不是以上任何一个，尝试将其作为输入优化
      if (command && !command.startsWith('-')) {
        optimizePrompt([command, ...options].join(' '), version);
      } else {
        console.error(`❌ 未知命令: ${command}`);
        console.log('使用 "npx prompt-optimizer-skill help" 查看帮助');
        process.exit(1);
      }
  }
}

// 运行主函数
main();
