import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';

export class AIAdvisor {
  private chat: ChatOpenAI;

  constructor() {
    this.chat = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4',
      temperature: 0.7
    });
  }

  async getStrategicAdvice(
    context: {
      hcpProfile: any;
      recentInteractions: any[];
      marketData: any;
      salesGoals: any;
    }
  ): Promise<string> {
    const systemPrompt = new SystemMessage({
      content: `You are an AI advisor for pharmaceutical sales representatives. 
      Analyze the provided context and suggest strategic actions.
      Consider: HCP preferences, recent interactions, market trends, and sales targets.`
    });

    const userPrompt = new HumanMessage({
      content: JSON.stringify(context)
    });

    const response = await this.chat.call([systemPrompt, userPrompt]);
    return response.content;
  }

  async generateMeetingSummary(
    meetingNotes: string,
    hcpProfile: any
  ): Promise<{
    summary: string;
    keyPoints: string[];
    followUpActions: string[];
  }> {
    const systemPrompt = new SystemMessage({
      content: `Analyze the meeting notes and generate a structured summary.
      Focus on: Key discussion points, HCP's interests/concerns, and required follow-up actions.`
    });

    const userPrompt = new HumanMessage({
      content: `Meeting Notes: ${meetingNotes}\nHCP Profile: ${JSON.stringify(hcpProfile)}`
    });

    const response = await this.chat.call([systemPrompt, userPrompt]);
    const analysis = JSON.parse(response.content);

    return {
      summary: analysis.summary,
      keyPoints: analysis.keyPoints,
      followUpActions: analysis.followUpActions
    };
  }
}

export const aiAdvisor = new AIAdvisor();