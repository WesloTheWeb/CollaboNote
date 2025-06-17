export const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
        return new Date(date).toLocaleDateString();
    };
    
    return date.toLocaleDateString();
};