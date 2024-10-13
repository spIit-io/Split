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

export const parseReceipt = async (receiptFile: File): Promise<number>  => {
	const formData = new FormData();
	formData.append("receiptFile", receiptFile);

	const res = await apiInstance.post('parseReceipt', formData);
	
	return res.data.final_total;
}