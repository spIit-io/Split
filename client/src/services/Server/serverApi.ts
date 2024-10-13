import { apiInstance } from "./axiosConfig";

export const getTransactions = async (): Promise<any> => {
	return await apiInstance.get('transactions');
}

export const addPayment = async (username: string, amount: Number, description: string): Promise<any> => {
	return await apiInstance.post('transactions', {
		username: username,
		amount: amount,
		description: description
	});
}

export const resolvePayment = async (paymentId: string) => {
	return await apiInstance.put(`transactions/${paymentId}`, {
		resolved: true
	});
}

export const parseReceipt = async (receiptFile: File): Promise<Number>  => {
	const formData = new FormData();
	formData.append("receiptFile", receiptFile);
	
	return (await apiInstance.post('parseReceipt', formData)).data.final_total;
}