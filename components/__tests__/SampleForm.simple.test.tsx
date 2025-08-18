import { sampleFormSchema } from '../../schemas/sampleForm';

describe('SampleForm schema validation', () => {
  it('should validate required fields', () => {
    const invalidData = {
      sampleText: '',
      email: '',
      sampleNumber: 0,
    };

    const result = sampleFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should validate email format', () => {
    const data = {
      sampleText: 'Valid text',
      email: 'invalid-email',
      sampleNumber: 50,
      category: 'fruits',
      option: 'optionA',
      preferences: ['reading'],
      selectedDate: '2024-01-01',
      agreement: true,
    };

    const result = sampleFormSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('should pass with valid data', () => {
    const validData = {
      sampleText: 'Valid text',
      email: 'test@example.com',
      sampleNumber: 50,
      category: 'fruits',
      option: 'optionA',
      preferences: ['reading'],
      selectedDate: '2024-01-01',
      agreement: true,
    };

    const result = sampleFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
