export const DateTimeFormat = (data) => {
    
    if (isNaN(new Date(data).getTime())) {
        console.log('Invalid date');
        return;
    }
    const now = new Date(data)
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const date = ("0" + now.getDate()).slice(-2);
    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);

    const dateTimeLocal = `${year}-${month}-${date}T${hours}:${minutes}`;
    return dateTimeLocal;
}