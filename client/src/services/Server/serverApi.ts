import { apiInstance } from "./axiosConfig";

export const searchTracks = async (name: string): Promise<TrackObject[]> => {
	const resData = (await apiInstance.get(`search?q=${name}&type=track`)).data;
	const tracks = resData.tracks.items;

	return tracks;
}