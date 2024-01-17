import apiService from ".";

export const GetFireStatus = async () => {
    try {
        const res = await apiService.get('/fire-status');
        const status = res.data.map((item) => {
            return {label:item.status, value:item.id}
        })
        return status;
    } catch (error) {
        console.log(error);
    }
}