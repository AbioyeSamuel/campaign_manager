import React, { useState, useEffect } from 'react';
import '../../css/styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configure Axios to include CSRF token
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

const CampaignForm = () => {
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        from: '',
        to: '',
        total_budget: '',
        daily_budget: '',
        creatives: [],
    });

    const [campaigns, setCampaigns] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [previewCampaign, setPreviewCampaign] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        setCampaigns(storedCampaigns);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, creatives: e.target.files });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const updatedCampaign = { ...formData };
        if (formData.creatives.length > 0) {
            updatedCampaign.creatives = Array.from(formData.creatives).map(file => file.name);
        }
    
        if (editMode) {
            // Only update the campaign whose ID matches
            const updatedCampaigns = campaigns.map(campaign =>
                campaign.id === formData.id ? { ...campaign, ...updatedCampaign } : campaign
            );
            setCampaigns(updatedCampaigns);
            localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
            alert('Campaign updated successfully');
            setEditMode(false);
        } else {
            // Create a new campaign
            updatedCampaign.id = Date.now(); // Assign a unique ID
            const newCampaigns = [...campaigns, updatedCampaign];
            setCampaigns(newCampaigns);
            localStorage.setItem('campaigns', JSON.stringify(newCampaigns));
            alert('Campaign created successfully');
        }
    
        // Reset form
        setFormData({
            id: null,
            name: '',
            from: '',
            to: '',
            total_budget: '',
            daily_budget: '',
            creatives: [],
        });
    };
    
    const handleEdit = (campaign) => {
        setFormData(campaign);
        setEditMode(true);
    };

    const handlePreview = (campaign) => {
        setPreviewCampaign(campaign);
    };

    

    const handleDelete = (id) => {
        const updatedCampaigns = campaigns.filter(campaign => campaign.id !== id);
        setCampaigns(updatedCampaigns);
        localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
        alert('Campaign deleted successfully');
    };

    return (
        <div>
            <h1>Campaign Manager</h1>
            <button className="view-campaigns-btn" onClick={() => navigate('/campaigns')}>
                View All Campaigns
            </button>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} placeholder="Campaign Name" onChange={handleChange} required />
                <input type="date" name="from" value={formData.from} onChange={handleChange} required />
                <input type="date" name="to" value={formData.to} onChange={handleChange} required />
                <input type="number" step="0.01" name="total_budget" value={formData.total_budget} placeholder="Total Budget" onChange={handleChange} required />
                <input type="number" step="0.01" name="daily_budget" value={formData.daily_budget} placeholder="Daily Budget" onChange={handleChange} required />
                <input type="file" name="creatives" multiple onChange={handleFileChange} />
                <button type="submit">{editMode ? 'Update Campaign' : 'Create Campaign'}</button>
            </form>

            <div className="campaigns-container">
            {campaigns.map((campaign, index) => (
                <div className="campaign-card" key={campaign.id}>
                    <h4>{campaign.name}</h4>
                    <p>From: {campaign.from}</p>
                    <p>To: {campaign.to}</p>
                    <p>Budget: ${campaign.daily_budget} / ${campaign.total_budget}</p>
                    <button onClick={() => handlePreview(campaign)}>Preview</button>
                    <button onClick={() => handleEdit(campaign)}>Edit</button>
                    <button onClick={() => handleDelete(campaign.id)}>Delete</button> 
                </div>
            ))}
            </div>

            {previewCampaign && (
                <div className="preview-overlay">
                    <div className="preview-popup">
                        <h3>{previewCampaign.name}</h3>
                        <p>From: {previewCampaign.from}</p>
                        <p>To: {previewCampaign.to}</p>
                        <p>Daily Budget: ${previewCampaign.daily_budget}</p>
                        <p>Total Budget: ${previewCampaign.total_budget}</p>
                        <div>
                            <h4>Creatives:</h4>
                            {previewCampaign.creatives.length > 0 ? (
                                previewCampaign.creatives.map((creative, index) => (
                                    <img key={index} src={`/uploads/${creative}`} alt={`Creative ${index + 1}`} className="creative-img" />
                                ))
                            ) : (
                                <p>No creatives uploaded.</p>
                            )}
                        </div>
                        <button onClick={() => setPreviewCampaign(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignForm;
