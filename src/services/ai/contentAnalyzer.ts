import { Configuration, OpenAIApi } from 'openai';

export class ContentAnalyzer {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.openai = new OpenAIApi(configuration);
  }

  async analyzeContent(content: string): Promise<{
    compliance: boolean;
    suggestions: string[];
    riskScore: number;
  }> {
    try {
      const response = await this.openai.createCompletion({
        model: "gpt-4",
        messages: [{
          role: "system",
          content: "Analyze the following medical content for compliance and provide suggestions:"
        }, {
          role: "user",
          content
        }]
      });

      // Process AI response
      const analysis = response.data.choices[0].message?.content || '';
      
      return {
        compliance: !analysis.includes('non-compliant'),
        suggestions: this.extractSuggestions(analysis),
        riskScore: this.calculateRiskScore(analysis)
      };
    } catch (error) {
      console.error('Content analysis failed:', error);
      return {
        compliance: false,
        suggestions: ['Analysis failed - please review manually'],
        riskScore: 1
      };
    }
  }

  private extractSuggestions(analysis: string): string[] {
    // Extract suggestion points from AI response
    return analysis
      .split('\n')
      .filter(line => line.startsWith('-'))
      .map(line => line.slice(2));
  }

  private calculateRiskScore(analysis: string): number {
    // Calculate risk score based on key phrases
    const riskPhrases = [
      'regulatory concern',
      'compliance issue',
      'unsubstantiated claim',
      'missing disclaimer'
    ];

    const riskCount = riskPhrases.reduce((count, phrase) => 
      count + (analysis.toLowerCase().includes(phrase) ? 1 : 0), 0
    );

    return riskCount / riskPhrases.length;
  }
}

export const contentAnalyzer = new ContentAnalyzer();