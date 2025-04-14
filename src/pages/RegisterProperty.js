import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import PropertyRegistry from '../contracts/PropertyRegistry.json';

function RegisterProperty() {
  const { account, library } = useWeb3React();
  const [formData, setFormData] = useState({
    propertyId: '',
    location: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const signer = library.getSigner();
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        PropertyRegistry.abi,
        signer
      );

      const priceInWei = ethers.utils.parseEther(formData.price);
      const tx = await contract.registerProperty(
        formData.propertyId,
        formData.location,
        priceInWei
      );

      await tx.wait();
      setSuccess('Property registered successfully!');
      setFormData({ propertyId: '', location: '', price: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!account) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Please Connect Your Wallet</h2>
        <p>You need to connect your wallet to register a property.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Register New Property</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property ID
          </label>
          <input
            type="text"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (ETH)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.000000000000000001"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register Property'}
        </button>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}

        {success && (
          <div className="text-green-500 text-sm mt-2">{success}</div>
        )}
      </form>
    </div>
  );
}

export default RegisterProperty; 