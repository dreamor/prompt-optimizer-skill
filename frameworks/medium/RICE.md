# RICE Framework

## 名称
Reach-Impact-Confidence-Effort

## 结构
- **Reach**: 影响范围（多少用户）
- **Impact**: 影响程度（多重要）
- **Confidence**: 信心指数（多确定）
- **Effort**: 投入成本（多少资源）
- **RICE Score**: (Reach × Impact × Confidence) / Effort

## 适用场景
- SaaS 产品功能优先级排序
- 营销活动规划
- 内容创作策略
- 产品发布规划
- 客户支持改进
- 社交媒体策略
- 预算分配决策

## 示例
**输入**: "确定下一个迭代的功能优先级"

**优化后**:
```
候选功能列表:

功能 A:  dark mode 暗黑模式
- Reach: 80% 用户（所有用户都可用）
- Impact: 3（中等，提升体验但不影响核心功能）
- Confidence: 90%（用户明确需求）
- Effort: 2 周
- RICE Score: (80 × 3 × 0.9) / 2 = 108

功能 B: AI 智能推荐
- Reach: 100% 用户
- Impact: 5（高，显著提升转化率）
- Confidence: 50%（不确定效果）
- Effort: 8 周
- RICE Score: (100 × 5 × 0.5) / 8 = 31.25

功能 C: 批量导出功能
- Reach: 20% 用户（主要是企业用户）
- Impact: 4（高，解决痛点）
- Confidence: 95%（用户强烈要求）
- Effort: 1 周
- RICE Score: (20 × 4 × 0.95) / 1 = 76

功能 D: 性能优化
- Reach: 100% 用户
- Impact: 4（高，提升体验）
- Confidence: 80%
- Effort: 4 周
- RICE Score: (100 × 4 × 0.8) / 4 = 80

优先级排序:
1. 功能 A (108) - 高价值，低投入
2. 功能 D (80) - 影响大，投入中等
3. 功能 C (76) - 解决痛点，快速交付
4. 功能 B (31.25) - 投入大，风险高，暂缓

注意事项:
- RICE 是参考，不是绝对标准
- 考虑战略对齐和依赖关系
- 高风险项目需要额外评估
```

## 使用提示
- Reach 用具体数字（用户数、百分比）
- Impact 用 0.25-3 的倍数
- Confidence 用百分比
- Effort 用人月或人周
- 定期重新评估优先级
