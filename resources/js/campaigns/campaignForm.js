import React, { useState } from 'react';
import axios from 'axios';

const CampaignForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        from: '',
        to: '',
        total_budget: '',
        daily_budget: '',
        creatives: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, creatives: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        for (let key in formData) {
            if (key === 'creatives') {
                Array.from(formData.creatives).forEach(file => form.append('creatives[]', file));
            } else {
                form.append(key, formData[key]);
            }
        }

        try {
            await axios.post('/api/campaigns', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Campaign created successfully');
        } catch (error) {
            console.error(error);
            alert('Error creating campaign');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Campaign Name" onChange={handleChange} required />
            <input type="date" name="from" onChange={handleChange} required />
            <input type="date" name="to" onChange={handleChange} required />
            <input type="number" step="0.01" name="total_budget" placeholder="Total Budget" onChange={handleChange} required />
            <input type="number" step="0.01" name="daily_budget" placeholder="Daily Budget" onChange={handleChange} required />
            <input type="file" name="creatives" multiple onChange={handleFileChange} />
            <button type="submit">Create Campaign</button>
        </form>
    );
};

export default CampaignForm;
