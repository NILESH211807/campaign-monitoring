import { api } from "./api"

export const fetchInsights = async () => {
    const { data } = await api.get('/campaigns/insights');
    return data;
}

export const fetchCampaigns = async () => {
    const { data } = await api.get('/campaigns');
    return data;
}

export const fetchCampaignById = async (id: string | null) => {
    if(!id) return;
    const { data } = await api.get(`/campaigns/${id}`);
    return data;
}

export const fetchCampaignInsights = async (id: string | null) => {
    if(!id) return;
    const { data } = await api.get(`campaigns/${id}/insights`);
    return data;
}