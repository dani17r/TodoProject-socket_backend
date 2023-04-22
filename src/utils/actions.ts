export const removeProperty = (data: Object, field:string) => {
    return data[field] = undefined;
}