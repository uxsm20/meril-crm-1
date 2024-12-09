import * as tf from '@tensorflow/tfjs';
import { SimpleLinearRegression } from 'ml-regression';

export class PredictiveAnalytics {
  private model: tf.Sequential;

  constructor() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
      ]
    });
  }

  async predictDealProbability(dealFeatures: number[]): Promise<number> {
    const tensor = tf.tensor2d([dealFeatures], [1, dealFeatures.length]);
    const prediction = this.model.predict(tensor) as tf.Tensor;
    const probability = await prediction.data();
    return probability[0];
  }

  predictRevenueGrowth(historicalData: { date: string; revenue: number }[]): number[] {
    const x = historicalData.map((_, index) => index);
    const y = historicalData.map(d => d.revenue);
    
    const regression = new SimpleLinearRegression(x, y);
    return x.map(point => regression.predict(point));
  }

  async suggestNextBestAction(
    hcpProfile: any,
    interactions: any[],
    marketTrends: any
  ): Promise<string[]> {
    // Analyze patterns and suggest actions
    const suggestions: string[] = [];
    
    // Engagement pattern analysis
    const recentEngagement = interactions
      .slice(-3)
      .map(i => i.engagementScore)
      .reduce((a, b) => a + b, 0) / 3;

    if (recentEngagement > 0.7) {
      suggestions.push('High engagement detected - Consider proposing strategic partnership');
    }

    // Product interest analysis
    const productInterests = interactions
      .flatMap(i => i.discussedProducts)
      .reduce((acc, product) => {
        acc[product] = (acc[product] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const topProduct = Object.entries(productInterests)
      .sort(([,a], [,b]) => b - a)[0];

    if (topProduct) {
      suggestions.push(`Strong interest in ${topProduct[0]} - Share latest clinical data`);
    }

    // Market opportunity analysis
    const relevantTrends = marketTrends
      .filter(t => t.specialty === hcpProfile.specialty);

    if (relevantTrends.length > 0) {
      suggestions.push(
        `Market trend alert: ${relevantTrends[0].insight} - Discuss implications`
      );
    }

    return suggestions;
  }
}

export const predictiveAnalytics = new PredictiveAnalytics();