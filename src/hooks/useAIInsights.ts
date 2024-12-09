import { useState, useEffect } from 'react';
import { predictiveAnalytics } from '../services/ai/predictiveAnalytics';
import { contentAnalyzer } from '../services/ai/contentAnalyzer';
import { aiAdvisor } from '../services/ai/chatbot';

export function useAIInsights(context: {
  hcpProfile?: any;
  interactions?: any[];
  marketData?: any;
  content?: string;
}) {
  const [insights, setInsights] = useState<{
    nextBestActions?: string[];
    contentAnalysis?: {
      compliance: boolean;
      suggestions: string[];
      riskScore: number;
    };
    strategicAdvice?: string;
    loading: boolean;
    error?: string;
  }>({
    loading: true
  });

  useEffect(() => {
    async function generateInsights() {
      try {
        const results = await Promise.all([
          // Get next best actions if HCP context is available
          context.hcpProfile && context.interactions && context.marketData
            ? predictiveAnalytics.suggestNextBestAction(
                context.hcpProfile,
                context.interactions,
                context.marketData
              )
            : Promise.resolve(undefined),

          // Analyze content if provided
          context.content
            ? contentAnalyzer.analyzeContent(context.content)
            : Promise.resolve(undefined),

          // Get strategic advice if full context is available
          context.hcpProfile && context.interactions && context.marketData
            ? aiAdvisor.getStrategicAdvice({
                hcpProfile: context.hcpProfile,
                recentInteractions: context.interactions,
                marketData: context.marketData,
                salesGoals: { target: 1000000, achieved: 750000 }
              })
            : Promise.resolve(undefined)
        ]);

        setInsights({
          nextBestActions: results[0],
          contentAnalysis: results[1],
          strategicAdvice: results[2],
          loading: false
        });
      } catch (error) {
        setInsights({
          loading: false,
          error: 'Failed to generate AI insights'
        });
      }
    }

    generateInsights();
  }, [context]);

  return insights;
}