import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            const response = await axios.get('/api/campaigns');
            setCampaigns(response.data);
        };
        fetchCampaigns();
    }, []);

    return (
        <div>
            {campaigns.map((campaign) => (
                <div key={campaign.id}>
                    <h3>{campaign.name}</h3>
                    <p>From: {campaign.from}</p>
                    <p>To: {campaign.to}</p>
                    <p>Daily Budget: ${campaign.daily_budget}</p>
                    <p>Total Budget: ${campaign.total_budget}</p>
                    <button onClick={() => alert('Preview functionality here')}>Preview Creatives</button>
                </div>
            ))}
        </div>
    );
};

export default CampaignList;
