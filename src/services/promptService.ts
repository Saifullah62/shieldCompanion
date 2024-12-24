interface ReflectionPrompt {
  id: string;
  text: string;
  category: 'professional' | 'wellness' | 'achievement';
}

interface WellnessInsight {
  id: string;
  title: string;
  content: string;
  type: 'tip' | 'reminder' | 'affirmation';
}

class PromptService {
  private reflectionPrompts: ReflectionPrompt[] = [
    {
      id: '1',
      text: "What's one thing you handled particularly well today?",
      category: 'professional'
    },
    {
      id: '2',
      text: "How did you support a fellow officer today?",
      category: 'wellness'
    },
    {
      id: '3',
      text: "What's a skill you've improved recently?",
      category: 'achievement'
    },
    {
      id: '4',
      text: "Describe a positive interaction with the community today.",
      category: 'professional'
    },
    {
      id: '5',
      text: "What helped you stay focused during your shift?",
      category: 'wellness'
    }
  ];

  private wellnessInsights: WellnessInsight[] = [
    {
      id: '1',
      title: 'Quick Breathing Exercise',
      content: 'Take 3 deep breaths between calls to stay centered.',
      type: 'tip'
    },
    {
      id: '2',
      title: 'Stay Hydrated',
      content: "It's time for a water break. Staying hydrated helps maintain focus.",
      type: 'reminder'
    },
    {
      id: '3',
      title: 'Making a Difference',
      content: 'Your presence helps keep the community safe. You make a difference every day.',
      type: 'affirmation'
    },
    {
      id: '4',
      title: 'Physical Reset',
      content: 'Quick shoulder rolls and stretches can help release tension during your shift.',
      type: 'tip'
    },
    {
      id: '5',
      title: 'Connect with Peers',
      content: 'Consider reaching out to a colleague for a quick check-in.',
      type: 'reminder'
    }
  ];

  getRandomPrompt(category?: 'professional' | 'wellness' | 'achievement'): ReflectionPrompt {
    let availablePrompts = this.reflectionPrompts;
    if (category) {
      availablePrompts = this.reflectionPrompts.filter(p => p.category === category);
    }
    const randomIndex = Math.floor(Math.random() * availablePrompts.length);
    return availablePrompts[randomIndex];
  }

  getRandomInsight(type?: 'tip' | 'reminder' | 'affirmation'): WellnessInsight {
    let availableInsights = this.wellnessInsights;
    if (type) {
      availableInsights = this.wellnessInsights.filter(i => i.type === type);
    }
    const randomIndex = Math.floor(Math.random() * availableInsights.length);
    return availableInsights[randomIndex];
  }

  getDailyInsight(): WellnessInsight {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % this.wellnessInsights.length;
    return this.wellnessInsights[index];
  }
}

export const promptService = new PromptService();
export type { ReflectionPrompt, WellnessInsight };
