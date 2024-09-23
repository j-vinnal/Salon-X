export function toFormData<T extends object>(data: T): FormData {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        const value = (data as any)[key];

        if (value instanceof File) {
            // Directly append the File object to FormData
            formData.append(key, value);
        } else if (value instanceof FileList) {
            // If it's a FileList (array of files), append each file
            Array.from(value).forEach(file => {
                formData.append(key, file);
            });
        } else if (Array.isArray(value)) {
            // Handle arrays (but not FileLists) normally
            value.forEach(item => formData.append(key, item));
        } else if (value !== null && value !== undefined) {
            // Append other non-null, non-undefined values
            formData.append(key, value);
        }
    });

    return formData;
}
