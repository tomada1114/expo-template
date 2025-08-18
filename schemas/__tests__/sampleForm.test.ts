import { sampleFormSchema, type SampleFormData } from '../sampleForm';

describe('sampleFormSchema', () => {
  describe('valid data', () => {
    it('should validate correct form data', () => {
      const validData: SampleFormData = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 50,
        category: 'fruits',
        option: 'optionA',
        preferences: ['reading', 'music'],
        selectedDate: '2024-01-01',
        comments: 'Optional comment',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should validate data without optional comments field', () => {
      const validData = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 50,
        category: 'colors',
        option: 'optionB',
        preferences: ['sports'],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept boundary values for sampleNumber', () => {
      const minValue = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 1,
        category: 'animals',
        option: 'optionC',
        preferences: ['cooking'],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const maxValue = {
        ...minValue,
        sampleNumber: 100,
      };

      expect(sampleFormSchema.safeParse(minValue).success).toBe(true);
      expect(sampleFormSchema.safeParse(maxValue).success).toBe(true);
    });
  });

  describe('invalid data', () => {
    it('should reject short sampleText', () => {
      const invalidData = {
        sampleText: 'ab',
        email: 'test@example.com',
        sampleNumber: 50,
        category: 'fruits',
        option: 'optionA',
        preferences: ['reading'],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('sampleText');
      }
    });

    it('should reject long sampleText', () => {
      const invalidData = {
        sampleText: 'a'.repeat(51),
        email: 'test@example.com',
        sampleNumber: 50,
        category: 'fruits',
        option: 'optionA',
        preferences: ['reading'],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('sampleText');
      }
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        sampleText: 'Valid text',
        email: 'invalid-email',
        sampleNumber: 50,
        category: 'fruits',
        option: 'optionA',
        preferences: ['reading'],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('email');
      }
    });

    it('should reject sampleNumber below minimum', () => {
      const invalidData = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 0,
        category: 'fruits',
        option: 'optionA',
        preferences: ['reading'],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('sampleNumber');
      }
    });

    it('should reject sampleNumber above maximum', () => {
      const invalidData = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 101,
        category: 'fruits',
        option: 'optionA',
        preferences: ['reading'],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('sampleNumber');
      }
    });

    it('should reject invalid category', () => {
      const invalidData = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 50,
        category: 'invalid-category',
        option: 'optionA',
        preferences: ['reading'],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('category');
      }
    });

    it('should reject invalid option', () => {
      const invalidData = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 50,
        category: 'fruits',
        option: 'invalidOption',
        preferences: ['reading'],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('option');
      }
    });

    it('should reject empty preferences array', () => {
      const invalidData = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 50,
        category: 'fruits',
        option: 'optionA',
        preferences: [],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('preferences');
      }
    });

    it('should accept any string values in preferences array', () => {
      const validData = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 50,
        category: 'fruits',
        option: 'optionA',
        preferences: ['reading', 'music', 'sports', 'cooking'],
        selectedDate: '2024-01-01',
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject comments longer than 500 characters', () => {
      const invalidData = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 50,
        category: 'fruits',
        option: 'optionA',
        preferences: ['reading'],
        selectedDate: '2024-01-01',
        comments: 'a'.repeat(501),
        agreement: true,
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('comments');
      }
    });

    it('should reject when agreement is false', () => {
      const invalidData = {
        sampleText: 'Valid text',
        email: 'test@example.com',
        sampleNumber: 50,
        category: 'fruits',
        option: 'optionA',
        preferences: ['reading'],
        selectedDate: '2024-01-01',
        agreement: false,
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('agreement');
      }
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        sampleText: 'Valid text',
      };

      const result = sampleFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
