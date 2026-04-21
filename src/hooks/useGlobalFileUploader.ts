/**
 * Global multipart/form-data uploader
 * Barcha modullar uchun ishlatiladigan - rasm, video, fayl va boshqa field bilan bir vaqtda yuborish
 */
export function useGlobalFileUploader() {
  
  function prepareFormData(values: any, excludeFieldsIfString: string[] = []): FormData {
    const formData = new FormData();

    // Barcha field larni iteratsiya qilish
    Object.entries(values).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return; // Skip null/undefined
      }

      // Agar File bo'lsa - qo'sh
      if (value instanceof File) {
        formData.append(key, value);
      }
      // Agar string bo'lsa
      else if (typeof value === 'string') {
        // Agar excludeFieldsIfString da bo'lsa va str bo'lsa, qo'shma (tahrirlashda eski field)
        if (!excludeFieldsIfString.includes(key)) {
          formData.append(key, value);
        }
      }
      // Agar number bo'lsa
      else if (typeof value === 'number') {
        formData.append(key, String(value));
      }
      // Agar array bo'lsa / object bo'lsa - JSON
      else if (Array.isArray(value) || typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      }
    });

    return formData;
  }

  return { prepareFormData };
}

/**
 * Murakkab fieldlar uchun variant (tarjima, translations kabi)
 */
export function useFormDataWithTranslations() {
  function prepareFormData(values: any): FormData {
    const formData = new FormData();

    // File fieldlar
    if (values.photo instanceof File) {
      formData.append('photo', values.photo);
    }

    // Raqam va string fieldlar
    if (values.day !== undefined) formData.append('day', String(values.day));
    if (values.month !== undefined) formData.append('month', String(values.month));
    if (values.region) formData.append('region', values.region);
    if (values.thumbnail) formData.append('thumbnail', values.thumbnail);

    // Tarjimalar/translations - JSON
    if (values.translations?.length) {
      const translations = values.translations.map((t: any) => ({
        language: t.language,
        name: t.name,
        ...(t.id && { id: t.id }),
      }));
      formData.append('translations', JSON.stringify(translations));
    }

    return formData;
  }

  return { prepareFormData };
}
