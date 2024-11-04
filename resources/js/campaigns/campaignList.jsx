import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/list.css';

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [previewCreatives, setPreviewCreatives] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Load campaigns from localStorage
        const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        setCampaigns(storedCampaigns);
    }, []);

    const handlePreview = (creatives) => {
        setPreviewCreatives(creatives);
    };

    return (
        <div>
            <h1>Campaign List</h1>
            <button className="back-button" onClick={() => navigate('/')}>Back to Create Campaign</button>
            <div className="campaign-list">
                {campaigns.length > 0 ? (
                    campaigns.map((campaign, index) => (
                        <div className="campaign-card" key={index}>
                            <h3>{campaign.name}</h3>
                            <p>From: {campaign.from}</p>
                            <p>To: {campaign.to}</p>
                            <p>Daily Budget: ${campaign.daily_budget}</p>
                            <p>Total Budget: ${campaign.total_budget}</p>
                            <button onClick={() => handlePreview(campaign.creatives)}>Preview Creatives</button>
                        </div>
                    ))
                ) : (
                    <p>No campaigns found. Please create a campaign first.</p>
                )}
            </div>

            {previewCreatives && (
                <>
                    <div className="overlay" onClick={() => setPreviewCreatives(null)}></div>
                    <div className="preview-popup">
                        <h3>Creative Preview</h3>
                        {previewCreatives.length > 0 ? (
                            previewCreatives.map((creative, index) => (
                                <img
                                    key={index}
                                    src={`/uploads/${creative}`}
                                    alt={`Creative ${index + 1}`}
                                    className="creative-img"
                                />
                            ))
                        ) : (
                            <p>No creatives available for preview.</p>
                        )}
                        <button onClick={() => setPreviewCreatives(null)}>Close</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CampaignList;
